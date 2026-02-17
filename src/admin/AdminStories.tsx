import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStories } from '@/hooks/useStories';
import { supabase } from '@/lib/supabase';
import { createStory, updateStory, deleteStory, seedInitialStories, uploadImpactStoryImage } from '@/services/storiesApi';
import type { ImpactStory } from '@/data/impactStories';
import { useToast } from './ToastContext';
import { AdminLayout } from './AdminLayout';
import { Loader2, Plus, Pencil, Trash2, AlertCircle, Database, Upload, Star, X, ArrowLeft } from 'lucide-react';

const EMPTY_FORM: Omit<ImpactStory, 'id'> = {
  title: '',
  excerpt: '',
  image: '',
  date: '',
  readTime: '',
  location: '',
  category: '',
  author: '',
  authorRole: '',
  content: '',
  isFeatured: false,
};

const FORM_FIELDS: { key: keyof Omit<ImpactStory, 'id'>; label: string; type?: string; rows?: number; placeholder?: string; isDate?: boolean }[] = [
  { key: 'title', label: 'Story Title', placeholder: 'Enter a compelling title for this impact story' },
  { key: 'excerpt', label: 'Story Excerpt', placeholder: 'A brief summary (2-3 sentences)', rows: 3 },
  { key: 'image', label: 'Featured Image', type: 'url', placeholder: 'Upload or paste image URL' },
  { key: 'date', label: 'Publication Date', isDate: true, placeholder: 'DD MMM YYYY (e.g. 15 Jun 2024)' },
  { key: 'readTime', label: 'Read Time', placeholder: 'e.g. 5 min read' },
  { key: 'location', label: 'Location', placeholder: 'e.g. Kabare, Uganda' },
  { key: 'category', label: 'Category', placeholder: 'e.g. Economic Empowerment, Health Support' },
  { key: 'author', label: 'Author Name', placeholder: 'Full name of the author' },
  { key: 'authorRole', label: 'Author Role', placeholder: 'e.g. Economic Development Officer' },
  { key: 'content', label: 'Full Story Content', placeholder: 'Write the complete story here...', rows: 16 },
];

export function AdminStories() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { stories, loading, error, refetch } = useStories({ fromDBOnly: true });
  const [authChecked, setAuthChecked] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<ImpactStory, 'id'>>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const [togglingFeaturedId, setTogglingFeaturedId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!supabase) {
      setAuthChecked(true);
      return;
    }
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate('/admin/login', { replace: true });
      setAuthChecked(true);
    });
  }, [navigate]);

  const handleEdit = useCallback((s: ImpactStory) => {
    setEditingId(s.id);
    setForm({
      title: s.title,
      excerpt: s.excerpt,
      image: s.image,
      date: s.date,
      readTime: s.readTime,
      location: s.location,
      category: s.category,
      author: s.author,
      authorRole: s.authorRole,
      content: s.content,
      isFeatured: s.isFeatured ?? false,
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !supabase) return;
    setUploading(true);
    try {
      const url = await uploadImpactStoryImage(file);
      setForm((f) => ({ ...f, image: url }));
      toast('Image uploaded successfully', 'success');
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Upload failed', 'error');
    } finally {
      setUploading(false);
    }
  }, [toast]);

  const handleToggleFeatured = useCallback(async (id: number, currentStatus: boolean) => {
    if (!supabase) return;
    setTogglingFeaturedId(id);
    try {
      await updateStory(id, { isFeatured: !currentStatus });
      toast('Featured status updated', 'success');
      await refetch();
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Failed to update featured status', 'error');
    } finally {
      setTogglingFeaturedId(null);
    }
  }, [refetch, toast]);

  const handleNew = useCallback(() => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleCancelEdit = useCallback(() => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setShowForm(false);
  }, []);

  const handleSeedInitialStories = async () => {
    if (!supabase) return;
    setSeeding(true);
    try {
      const created = await seedInitialStories();
      toast(`Seeded ${created.length} initial stories. They now use database IDs.`, 'success');
      await refetch();
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Seed failed', 'error');
    } finally {
      setSeeding(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setSaving(true);
    try {
      if (editingId !== null) {
        try {
          await updateStory(editingId, form);
          toast('Story updated.', 'success');
        } catch (updateErr) {
          const msg = updateErr instanceof Error ? updateErr.message : '';
          if (msg.includes('Story not found') || msg.includes('no effect')) {
            await createStory(form);
            toast('Story was not in the database; created as new story.', 'success');
          } else {
            throw updateErr;
          }
        }
      } else {
        await createStory(form);
        toast('Story created.', 'success');
      }
      setForm(EMPTY_FORM);
      setEditingId(null);
      setShowForm(false);
      await refetch();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Save failed';
      toast(message, 'error');
      if (typeof message === 'string' && (message.includes('schema cache') || message.includes('author_role'))) {
        console.warn('HerRise admin: If update fails with "schema cache" or "author_role", run in Supabase SQL Editor: NOTIFY pgrst, \'reload schema\';');
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!supabase || !window.confirm('Delete this story? This cannot be undone.')) return;
    setDeletingId(id);
    try {
      await deleteStory(id);
      toast('Story deleted.', 'success');
      if (editingId === id) {
        setEditingId(null);
        setForm(EMPTY_FORM);
      }
      await refetch();
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Delete failed', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  const handleSignOut = async () => {
    await supabase?.auth.signOut();
    navigate('/admin/login', { replace: true });
  };

  if (!authChecked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3 text-slate-500">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p>Loading…</p>
        </div>
      </div>
    );
  }

  if (!supabase) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-semibold text-slate-900">Admin</h1>
          <p className="mt-2 text-slate-600">
            Set <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm">VITE_SUPABASE_URL</code> and{' '}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm">VITE_SUPABASE_ANON_KEY</code> in your
            environment to manage stories.
          </p>
          <Link to="/" className="mt-6 inline-block text-sm font-medium text-violet-600 hover:underline">
            Back to site
          </Link>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout title="HerRise Admin" onSignOut={handleSignOut}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Impact Stories</h1>
            <p className="mt-1 text-slate-600">Manage and publish stories of change and empowerment</p>
          </div>
          {!showForm && (
            <button
              type="button"
              onClick={handleNew}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 transition-all hover:scale-105"
            >
              <Plus className="h-5 w-5" />
              New Story
            </button>
          )}
        </div>

        {/* Form View */}
        {showForm && (
          <div className="mb-8 rounded-2xl border-2 border-slate-200 bg-white shadow-xl">
            <div className="border-b border-slate-200 bg-gradient-to-r from-violet-50 to-purple-50 px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {editingId !== null ? 'Edit Impact Story' : 'Create New Impact Story'}
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">
                    {editingId !== null ? 'Update the story details below' : 'Fill in the details to publish a new story'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="rounded-full p-2 text-slate-400 hover:bg-white hover:text-slate-600 transition-colors"
                  aria-label="Close form"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              {FORM_FIELDS.map(({ key, label, type = 'text', rows, placeholder, isDate }) => (
                <div key={key}>
                  <label className="mb-2 block text-base font-semibold text-slate-900">{label}</label>
                  {key === 'image' ? (
                    <div className="space-y-3">
                      <input
                        type={type}
                        value={form[key]}
                        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                        required
                        placeholder={placeholder}
                        className="w-full rounded-xl border-2 border-slate-300 px-5 py-4 text-base text-slate-900 transition-all focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20 hover:border-slate-400"
                      />
                      <label className="flex items-center justify-center gap-3 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-5 text-base font-medium text-slate-700 cursor-pointer hover:bg-violet-50 hover:border-violet-400 transition-all">
                        <Upload className="h-5 w-5" />
                        {uploading ? 'Uploading…' : 'Upload Image File'}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={uploading}
                          className="hidden"
                        />
                      </label>
                      {form.image && (
                        <img
                          src={form.image}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-xl border-2 border-slate-200 shadow-sm"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      )}
                    </div>
                  ) : rows ? (
                    <textarea
                      value={form[key]}
                      onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                      required
                      rows={rows}
                      placeholder={placeholder}
                      className="w-full rounded-xl border-2 border-slate-300 px-5 py-4 text-base text-slate-900 transition-all focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20 hover:border-slate-400 resize-y"
                    />
                  ) : (
                    <input
                      type={isDate ? 'text' : type}
                      value={form[key]}
                      onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                      required
                      placeholder={placeholder}
                      className="w-full rounded-xl border-2 border-slate-300 px-5 py-4 text-base text-slate-900 transition-all focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20 hover:border-slate-400"
                    />
                  )}
                  {isDate && (
                    <p className="mt-1.5 text-sm text-slate-500">Format: DD MMM YYYY (e.g., 15 Jun 2024)</p>
                  )}
                </div>
              ))}

              {/* Featured Toggle */}
              <div className="rounded-xl border-2 border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50 p-5">
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    id="featured-checkbox"
                    checked={form.isFeatured ?? false}
                    onChange={(e) => setForm((f) => ({ ...f, isFeatured: e.target.checked }))}
                    className="h-5 w-5 rounded border-emerald-300 text-emerald-600 focus:ring-2 focus:ring-emerald-500"
                  />
                  <label htmlFor="featured-checkbox" className="flex items-center gap-2.5 text-base font-semibold text-slate-900 cursor-pointer">
                    <Star className="h-5 w-5 text-emerald-600" fill={form.isFeatured ? 'currentColor' : 'none'} />
                    Mark as Featured Story
                  </label>
                </div>
                <p className="mt-2 ml-9 text-sm text-slate-600">Featured stories appear at the top with special visual treatment</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="flex items-center justify-center gap-2 rounded-xl border-2 border-slate-300 bg-white px-8 py-4 text-base font-semibold text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-400"
                >
                  <ArrowLeft className="h-5 w-5" />
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-violet-500/30 transition-all hover:shadow-xl hover:shadow-violet-500/40 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Saving…
                    </>
                  ) : editingId !== null ? (
                    'Update Story'
                  ) : (
                    'Publish Story'
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Story List */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-slate-900">Published Stories ({stories.length})</h2>
          </div>
          
          <div className="p-4">
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-20 animate-pulse rounded-xl bg-slate-100" />
                ))}
              </div>
            ) : error ? (
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 m-2">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 shrink-0 text-amber-600" />
                  <div>
                    <p className="font-medium text-amber-800">{error}</p>
                    {(error.toLowerCase().includes('does not exist') || error.toLowerCase().includes('relation')) && (
                      <p className="mt-1 text-sm text-amber-700">
                        Run the SQL in <code className="rounded bg-amber-100 px-1">supabase/migrations/</code> in your
                        Supabase project SQL Editor.
                      </p>
                    )}
                    <button type="button" onClick={refetch} className="mt-2 text-sm font-medium text-amber-800 underline">
                      Retry
                    </button>
                  </div>
                </div>
              </div>
            ) : stories.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/50 p-12 text-center m-2">
                <AlertCircle className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-slate-900 mb-2">No stories yet</p>
                <p className="text-sm text-slate-500 mb-6">
                  Seed initial stories or create your first one using the form above
                </p>
                {supabase && (
                  <button
                    type="button"
                    onClick={handleSeedInitialStories}
                    disabled={seeding}
                    className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-50 shadow-sm"
                  >
                    {seeding ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Seeding…
                      </>
                    ) : (
                      <>
                        <Database className="h-4 w-4" />
                        Seed Initial Stories
                      </>
                    )}
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                {stories.map((s) => (
                  <div
                    key={s.id}
                    className={`group flex items-center justify-between gap-4 rounded-xl border bg-gradient-to-r p-4 transition-all hover:shadow-md ${
                      editingId === s.id 
                        ? 'border-violet-400 from-violet-50 to-purple-50 ring-2 ring-violet-200' 
                        : s.isFeatured
                        ? 'border-emerald-300 from-emerald-50 to-green-50'
                        : 'border-slate-200 from-white to-slate-50 hover:border-slate-300'
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="truncate font-semibold text-slate-900 text-base">{s.title}</h3>
                        {s.isFeatured && (
                          <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-emerald-700 bg-emerald-100 rounded-full">
                            <Star size={12} fill="currentColor" />
                            Featured
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-slate-600">
                        <span>{s.date}</span>
                        <span>•</span>
                        <span>{s.category}</span>
                        <span>•</span>
                        <span>{s.author}</span>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleToggleFeatured(s.id, s.isFeatured ?? false)}
                        disabled={togglingFeaturedId === s.id}
                        className={`rounded-lg p-2.5 transition-all ${
                          s.isFeatured
                            ? 'text-emerald-600 hover:bg-emerald-100'
                            : 'text-slate-400 hover:bg-emerald-50 hover:text-emerald-600'
                        } disabled:opacity-50`}
                        aria-label="Toggle featured"
                        title={s.isFeatured ? 'Remove featured status' : 'Mark as featured'}
                      >
                        {togglingFeaturedId === s.id ? (
                          <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                          <Star className="h-5 w-5" fill={s.isFeatured ? 'currentColor' : 'none'} />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleEdit(s)}
                        className="rounded-lg p-2.5 text-slate-500 hover:bg-violet-50 hover:text-violet-700 transition-colors"
                        aria-label="Edit story"
                      >
                        <Pencil className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(s.id)}
                        disabled={deletingId === s.id}
                        className="rounded-lg p-2.5 text-slate-500 hover:bg-red-50 hover:text-red-600 disabled:opacity-50 transition-colors"
                        aria-label="Delete story"
                      >
                        {deletingId === s.id ? <Loader2 className="h-5 w-5 animate-spin" /> : <Trash2 className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
