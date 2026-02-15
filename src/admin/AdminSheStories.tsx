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
import { Loader2, Plus, Pencil, Trash2, AlertCircle, Upload } from 'lucide-react';

const EMPTY_FORM: Omit<SheStory, 'id'> = {
  title: '',
  name: '',
  content: '',
  changeAchieved: [''],
  quotes: [''],
  photo: '',
  photoCaption: '',
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
    });
  }, []);

  const handleNew = useCallback(() => {
    setEditingId(null);
    setForm(EMPTY_FORM);
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
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="flex flex-col">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">She Stories</h2>
            <button
              type="button"
              onClick={handleNew}
              className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-3 py-2 text-sm font-medium text-white hover:bg-violet-700"
            >
              <Plus className="h-4 w-4" />
              Add She Story
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
                  <button type="button" onClick={refetch} className="mt-2 text-sm font-medium text-amber-800 underline">
                    Retry
                  </button>
                </div>
              </div>
            </div>
          ) : stories.length === 0 ? (
            <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50/50 py-8 text-center text-slate-500">
              No She Stories yet. Add one with the form.
            </p>
          ) : (
            <ul className="space-y-2">
              {stories.map((s) => (
                <li
                  key={s.id}
                  className={`flex items-center justify-between gap-3 rounded-xl border bg-white px-4 py-3 shadow-sm ${
                    editingId === s.id ? 'border-violet-300 ring-2 ring-violet-200' : 'border-slate-200'
                  }`}
                >
                  <span className="min-w-0 flex-1 truncate font-medium text-slate-900">{s.title}</span>
                  <span className="text-sm text-slate-500">{s.name}</span>
                  <div className="flex shrink-0 items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleEdit(s)}
                      className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
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

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            {editingId !== null ? 'Edit She Story' : 'New She Story'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => updateForm('title', e.target.value)}
                required
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => updateForm('name', e.target.value)}
                required
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Content</label>
              <textarea
                value={form.content}
                onChange={(e) => updateForm('content', e.target.value)}
                rows={6}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Change achieved (one per line)</label>
              <div className="space-y-2">
                {(form.changeAchieved || ['']).map((item, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => updateChangeAchieved(i, e.target.value)}
                      className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                    />
                    <button
                      type="button"
                      onClick={() => removeChangeItem(i)}
                      className="p-2 text-slate-400 hover:text-red-600 rounded"
                      aria-label="Remove"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addChangeItem}
                  className="text-sm text-violet-600 hover:text-violet-700 font-medium"
                >
                  + Add another point
                </button>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Quotes (testimonials)</label>
              <div className="space-y-2">
                {(Array.isArray(form.quotes) ? form.quotes : form.quotes ? [form.quotes] : ['']).map((q, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      type="text"
                      value={typeof q === 'string' ? q : ''}
                      onChange={(e) => updateQuotes(i, e.target.value)}
                      placeholder="Quote or testimonial"
                      className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                    />
                    <button
                      type="button"
                      onClick={() => removeQuote(i)}
                      className="p-2 text-slate-400 hover:text-red-600 rounded shrink-0"
                      aria-label="Remove quote"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addQuote}
                  className="text-sm text-violet-600 hover:text-violet-700 font-medium"
                >
                  + Add Quote
                </button>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Photo</label>
              <div className="flex gap-2 flex-wrap">
                <label className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 cursor-pointer">
                  <Upload className="h-4 w-4" />
                  {uploading ? 'Uploading…' : 'Upload file'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={uploading}
                    className="sr-only"
                  />
                </label>
                <span className="text-slate-500 text-sm self-center">or</span>
                <input
                  type="url"
                  value={form.photo}
                  onChange={(e) => updateForm('photo', e.target.value)}
                  placeholder="Image URL"
                  className="flex-1 min-w-0 rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                />
              </div>
              {form.photo && (
                <p className="mt-1 text-xs text-slate-500 truncate">Current: {form.photo}</p>
              )}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Photo caption</label>
              <input
                type="text"
                value={form.photoCaption}
                onChange={(e) => updateForm('photoCaption', e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
              />
            </div>
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
                'Update She Story'
              ) : (
                'Add She Story'
              )}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
