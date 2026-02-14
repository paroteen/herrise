import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStories } from '@/hooks/useStories';
import { supabase } from '@/lib/supabase';
import { createStory, updateStory, deleteStory } from '@/services/storiesApi';
import type { ImpactStory } from '@/data/impactStories';
import { useToast } from './ToastContext';
import { AdminLayout } from './AdminLayout';
import { Loader2, Plus, Pencil, Trash2, AlertCircle } from 'lucide-react';

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
};

const FORM_FIELDS: { key: keyof Omit<ImpactStory, 'id'>; label: string; type?: string; rows?: number }[] = [
  { key: 'title', label: 'Title' },
  { key: 'excerpt', label: 'Excerpt' },
  { key: 'image', label: 'Image URL', type: 'url' },
  { key: 'date', label: 'Date' },
  { key: 'readTime', label: 'Read time' },
  { key: 'location', label: 'Location' },
  { key: 'category', label: 'Category' },
  { key: 'author', label: 'Author' },
  { key: 'authorRole', label: 'Author role' },
  { key: 'content', label: 'Content', rows: 10 },
];

export function AdminStories() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { stories, loading, error, refetch } = useStories();
  const [authChecked, setAuthChecked] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<ImpactStory, 'id'>>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

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
    });
  }, []);

  const handleNew = useCallback(() => {
    setEditingId(null);
    setForm(EMPTY_FORM);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setSaving(true);
    try {
      if (editingId !== null) {
        await updateStory(editingId, form);
        toast('Story updated.', 'success');
      } else {
        await createStory(form);
        toast('Story created.', 'success');
      }
      setForm(EMPTY_FORM);
      setEditingId(null);
      await refetch();
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Save failed', 'error');
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
      <div className="grid gap-8 lg:grid-cols-2">
        {/* List */}
        <div className="flex flex-col">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Impact Stories</h2>
            <button
              type="button"
              onClick={handleNew}
              className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-3 py-2 text-sm font-medium text-white hover:bg-violet-700"
            >
              <Plus className="h-4 w-4" />
              New story
            </button>
          </div>

          {loading ? (
            <ul className="space-y-2">
              {[1, 2, 3].map((i) => (
                <li key={i} className="h-14 animate-pulse rounded-xl bg-slate-200" />
              ))}
            </ul>
          ) : error ? (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
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
            <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50/50 py-8 text-center text-slate-500">
              No stories yet. Create one with the form.
            </p>
          ) : (
            <ul className="space-y-2">
              {stories.map((s) => (
                <li
                  key={s.id}
                  className={`flex items-center justify-between gap-3 rounded-xl border bg-white px-4 py-3 shadow-sm transition ${
                    editingId === s.id ? 'border-violet-300 ring-2 ring-violet-200' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span className="min-w-0 flex-1 truncate font-medium text-slate-900">{s.title}</span>
                  <div className="flex shrink-0 items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleEdit(s)}
                      className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                      aria-label="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(s.id)}
                      disabled={deletingId === s.id}
                      className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                      aria-label="Delete"
                    >
                      {deletingId === s.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Form */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            {editingId !== null ? 'Edit story' : 'New story'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {FORM_FIELDS.map(({ key, label, type = 'text', rows }) => (
              <div key={key}>
                <label className="mb-1 block text-sm font-medium text-slate-700">{label}</label>
                {rows ? (
                  <textarea
                    value={form[key]}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                    required
                    rows={rows}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                  />
                ) : (
                  <input
                    type={type}
                    value={form[key]}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                    required
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                  />
                )}
              </div>
            ))}
            <button
              type="submit"
              disabled={saving}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-violet-600 py-2.5 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving…
                </>
              ) : editingId !== null ? (
                'Update story'
              ) : (
                'Create story'
              )}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
