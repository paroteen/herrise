import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSheStories } from '@/hooks/useSheStories';
import { supabase } from '@/lib/supabase';
import {
  createSheStory,
  updateSheStory,
  deleteSheStory,
  uploadSheStoryImage,
} from '@/services/sheStoriesApi';
import type { SheStory } from '@/types';
import { useToast } from './ToastContext';
import { AdminLayout } from './AdminLayout';
import { Loader2, Plus, Pencil, Trash2, AlertCircle, Upload, Star, X, ArrowLeft } from 'lucide-react';

const EMPTY_FORM: Omit<SheStory, 'id'> = {
  title: '',
  name: '',
  content: '',
  changeAchieved: [''],
  quotes: [''],
  photo: '',
  photoCaption: '',
  isFeatured: false,
};

export function AdminSheStories() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { stories, loading, error, refetch } = useSheStories({ fromDBOnly: true });
  const [authChecked, setAuthChecked] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<SheStory, 'id'>>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
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

  const handleEdit = useCallback((s: SheStory) => {
    setEditingId(s.id);
    const quotes = Array.isArray(s.quotes) ? s.quotes : s.quotes ? [s.quotes] : [''];
    setForm({
      title: s.title,
      name: s.name,
      content: s.content ?? '',
      changeAchieved: s.changeAchieved?.length ? s.changeAchieved : [''],
      quotes: quotes.length ? quotes : [''],
      photo: s.photo ?? '',
      photoCaption: s.photoCaption ?? '',
      isFeatured: s.isFeatured ?? false,
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleToggleFeatured = useCallback(async (id: number, currentStatus: boolean) => {
    if (!supabase) return;
    setTogglingFeaturedId(id);
    try {
      await updateSheStory(id, { isFeatured: !currentStatus });
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

  const updateForm = useCallback(<K extends keyof Omit<SheStory, 'id'>>(key: K, value: SheStory[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  }, []);

  const updateChangeAchieved = useCallback((index: number, value: string) => {
    setForm((prev) => {
      const next = [...(prev.changeAchieved || [''])];
      next[index] = value;
      return { ...prev, changeAchieved: next };
    });
  }, []);

  const addChangeItem = useCallback(() => {
    setForm((prev) => ({
      ...prev,
      changeAchieved: [...(prev.changeAchieved || []), ''],
    }));
  }, []);

  const removeChangeItem = useCallback((index: number) => {
    setForm((prev) => {
      const next = (prev.changeAchieved || []).filter((_, i) => i !== index);
      return { ...prev, changeAchieved: next.length ? next : [''] };
    });
  }, []);

  const updateQuotes = useCallback((index: number, value: string) => {
    setForm((prev) => {
      const next = [...(Array.isArray(prev.quotes) ? prev.quotes : prev.quotes ? [prev.quotes] : [''])];
      next[index] = value;
      return { ...prev, quotes: next };
    });
  }, []);

  const addQuote = useCallback(() => {
    setForm((prev) => ({
      ...prev,
      quotes: [...(Array.isArray(prev.quotes) ? prev.quotes : prev.quotes ? [prev.quotes] : ['']), ''],
    }));
  }, []);

  const removeQuote = useCallback((index: number) => {
    setForm((prev) => {
      const next = (Array.isArray(prev.quotes) ? prev.quotes : prev.quotes ? [prev.quotes] : ['']).filter(
        (_, i) => i !== index
      );
      return { ...prev, quotes: next.length ? next : [''] };
    });
  }, []);

  const handleFileUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !supabase) return;
      setUploading(true);
      try {
        const url = await uploadSheStoryImage(file);
        updateForm('photo', url);
        toast('Photo uploaded.', 'success');
      } catch (err) {
        toast(err instanceof Error ? err.message : 'Upload failed', 'error');
      } finally {
        setUploading(false);
        e.target.value = '';
      }
    },
    [toast, updateForm]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setSaving(true);
    try {
      const changeAchieved = (form.changeAchieved || [''])
        .map((s) => s.trim())
        .filter(Boolean);
      const quotes = (Array.isArray(form.quotes) ? form.quotes : form.quotes ? [form.quotes] : [])
        .map((s) => (typeof s === 'string' ? s : '').trim())
        .filter(Boolean);
      const payload = {
        ...form,
        changeAchieved: changeAchieved.length ? changeAchieved : [],
        quotes: quotes.length ? quotes : [],
      };
      if (editingId !== null) {
        try {
          await updateSheStory(editingId, payload);
          toast('She Story updated.', 'success');
        } catch (updateErr) {
          const msg = updateErr instanceof Error ? updateErr.message : '';
          if (msg.includes('not found') || msg.includes('no effect')) {
            await createSheStory(payload);
            toast('Story was not in the database; created as new.', 'success');
          } else {
            throw updateErr;
          }
        }
      } else {
        await createSheStory(payload);
        toast('She Story created.', 'success');
      }
      setForm(EMPTY_FORM);
      setEditingId(null);
      setShowForm(false);
      await refetch();
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Save failed', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!supabase || !window.confirm('Delete this She Story? This cannot be undone.')) return;
    setDeletingId(id);
    try {
      await deleteSheStory(id);
      toast('She Story deleted.', 'success');
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
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center">
          <h1 className="text-xl font-semibold text-slate-900">Admin</h1>
          <p className="mt-2 text-slate-600">
            Configure Supabase (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY) to manage She Stories.
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
            <h1 className="text-3xl font-bold text-slate-900">She Stories</h1>
            <p className="mt-1 text-slate-600">Share powerful narratives of women's empowerment and transformation</p>
          </div>
          {!showForm && (
            <button
              type="button"
              onClick={handleNew}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 transition-all hover:scale-105"
            >
              <Plus className="h-5 w-5" />
              New She Story
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
                    {editingId !== null ? 'Edit She Story' : 'Create New She Story'}
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">
                    {editingId !== null ? 'Update the story details below' : 'Share a powerful story of transformation'}
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
              {/* Title */}
              <div>
                <label className="mb-2 block text-base font-semibold text-slate-900">Story Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => updateForm('title', e.target.value)}
                  required
                  placeholder="Enter a compelling title for this She Story"
                  className="w-full rounded-xl border-2 border-slate-300 px-5 py-4 text-base text-slate-900 transition-all focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20 hover:border-slate-400"
                />
              </div>

              {/* Name */}
              <div>
                <label className="mb-2 block text-base font-semibold text-slate-900">Woman's Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => updateForm('name', e.target.value)}
                  required
                  placeholder="Full name of the woman featured in this story"
                  className="w-full rounded-xl border-2 border-slate-300 px-5 py-4 text-base text-slate-900 transition-all focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20 hover:border-slate-400"
                />
              </div>

              {/* Content */}
              <div>
                <label className="mb-2 block text-base font-semibold text-slate-900">Full Story Content</label>
                <textarea
                  value={form.content}
                  onChange={(e) => updateForm('content', e.target.value)}
                  rows={12}
                  placeholder="Write the complete narrative of transformation, challenges overcome, and achievements..."
                  className="w-full rounded-xl border-2 border-slate-300 px-5 py-4 text-base text-slate-900 transition-all focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20 hover:border-slate-400 resize-y"
                />
              </div>

              {/* Change Achieved */}
              <div>
                <label className="mb-2 block text-base font-semibold text-slate-900">Changes Achieved</label>
                <p className="mb-3 text-sm text-slate-600">List specific, measurable impacts and transformations</p>
                <div className="space-y-3">
                  {(form.changeAchieved || ['']).map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => updateChangeAchieved(i, e.target.value)}
                        placeholder={`Achievement #${i + 1}`}
                        className="flex-1 rounded-xl border-2 border-slate-300 px-5 py-3.5 text-base text-slate-900 transition-all focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20 hover:border-slate-400"
                      />
                      {form.changeAchieved && form.changeAchieved.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeChangeItem(i)}
                          className="rounded-xl p-3 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                          aria-label="Remove achievement"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addChangeItem}
                    className="inline-flex items-center gap-2 text-base font-medium text-violet-600 hover:text-violet-700 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    Add Another Achievement
                  </button>
                </div>
              </div>

              {/* Quotes */}
              <div>
                <label className="mb-2 block text-base font-semibold text-slate-900">Quotes & Testimonials</label>
                <p className="mb-3 text-sm text-slate-600">Powerful quotes from the story subject or testimonials</p>
                <div className="space-y-3">
                  {(Array.isArray(form.quotes) ? form.quotes : form.quotes ? [form.quotes] : ['']).map((q, i) => (
                    <div key={i} className="flex gap-3">
                      <input
                        type="text"
                        value={typeof q === 'string' ? q : ''}
                        onChange={(e) => updateQuotes(i, e.target.value)}
                        placeholder={`"Quote or testimonial #${i + 1}"`}
                        className="flex-1 rounded-xl border-2 border-slate-300 px-5 py-3.5 text-base text-slate-900 transition-all focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20 hover:border-slate-400"
                      />
                      {Array.isArray(form.quotes) && form.quotes.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeQuote(i)}
                          className="rounded-xl p-3 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                          aria-label="Remove quote"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addQuote}
                    className="inline-flex items-center gap-2 text-base font-medium text-violet-600 hover:text-violet-700 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    Add Another Quote
                  </button>
                </div>
              </div>

              {/* Photo */}
              <div>
                <label className="mb-2 block text-base font-semibold text-slate-900">Featured Photo</label>
                <div className="space-y-3">
                  <label className="flex items-center justify-center gap-3 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-5 text-base font-medium text-slate-700 cursor-pointer hover:bg-violet-50 hover:border-violet-400 transition-all">
                    <Upload className="h-5 w-5" />
                    {uploading ? 'Uploading Photo…' : 'Upload Photo File'}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      disabled={uploading}
                      className="sr-only"
                    />
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="h-px flex-1 bg-slate-200"></div>
                    <span className="text-sm text-slate-500">or paste URL</span>
                    <div className="h-px flex-1 bg-slate-200"></div>
                  </div>
                  <input
                    type="url"
                    value={form.photo}
                    onChange={(e) => updateForm('photo', e.target.value)}
                    placeholder="https://example.com/photo.jpg"
                    className="w-full rounded-xl border-2 border-slate-300 px-5 py-4 text-base text-slate-900 transition-all focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20 hover:border-slate-400"
                  />
                  {form.photo && (
                    <img
                      src={form.photo}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-xl border-2 border-slate-200 shadow-sm"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  )}
                </div>
              </div>

              {/* Photo Caption */}
              <div>
                <label className="mb-2 block text-base font-semibold text-slate-900">Photo Caption</label>
                <input
                  type="text"
                  value={form.photoCaption}
                  onChange={(e) => updateForm('photoCaption', e.target.value)}
                  placeholder="Brief description of the photo"
                  className="w-full rounded-xl border-2 border-slate-300 px-5 py-4 text-base text-slate-900 transition-all focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20 hover:border-slate-400"
                />
              </div>

              {/* Featured Toggle */}
              <div className="rounded-xl border-2 border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-5">
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    id="isFeatured-she"
                    checked={form.isFeatured ?? false}
                    onChange={(e) => updateForm('isFeatured', e.target.checked)}
                    className="h-5 w-5 rounded border-amber-300 text-amber-600 focus:ring-2 focus:ring-amber-500"
                  />
                  <label htmlFor="isFeatured-she" className="flex items-center gap-2.5 text-base font-semibold text-slate-900 cursor-pointer">
                    <Star className="h-5 w-5 text-amber-500" fill={form.isFeatured ? 'currentColor' : 'none'} />
                    Mark as Featured Story
                  </label>
                </div>
                <p className="mt-2 ml-9 text-sm text-slate-600">Featured stories appear at the top of the gallery with special styling</p>
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
                    'Update She Story'
                  ) : (
                    'Publish She Story'
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Story List */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-slate-900">Published She Stories ({stories.length})</h2>
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
                    <button type="button" onClick={refetch} className="mt-2 text-sm font-medium text-amber-800 underline">
                      Retry
                    </button>
                  </div>
                </div>
              </div>
            ) : stories.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/50 p-12 text-center m-2">
                <AlertCircle className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-slate-900 mb-2">No She Stories yet</p>
                <p className="text-sm text-slate-500">Create your first story using the form above</p>
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
                        ? 'border-amber-300 from-amber-50 to-yellow-50'
                        : 'border-slate-200 from-white to-slate-50 hover:border-slate-300'
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="truncate font-semibold text-slate-900 text-base">{s.title}</h3>
                        {s.isFeatured && (
                          <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-amber-700 bg-amber-100 rounded-full">
                            <Star size={12} fill="currentColor" />
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-600">{s.name}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleToggleFeatured(s.id, s.isFeatured ?? false)}
                        disabled={togglingFeaturedId === s.id}
                        className={`rounded-lg p-2.5 transition-all ${
                          s.isFeatured 
                            ? 'text-amber-500 hover:bg-amber-100' 
                            : 'text-slate-400 hover:bg-amber-50 hover:text-amber-500'
                        } disabled:opacity-50`}
                        aria-label="Toggle featured"
                        title={s.isFeatured ? 'Remove from featured' : 'Mark as featured'}
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
                        aria-label="Edit"
                      >
                        <Pencil className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(s.id)}
                        disabled={deletingId === s.id}
                        className="rounded-lg p-2.5 text-slate-500 hover:bg-red-50 hover:text-red-600 disabled:opacity-50 transition-colors"
                        aria-label="Delete"
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
