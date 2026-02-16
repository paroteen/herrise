import { supabase } from '@/lib/supabase';
import type { ImpactStoryRow } from '@/types/database';
import { impactStories, type ImpactStory } from '@/data/impactStories';

const BUCKET = 'impact-stories';

function rowToStory(row: ImpactStoryRow): ImpactStory {
  return {
    id: Number(row.id),
    title: row.title,
    excerpt: row.excerpt,
    image: row.image,
    date: row.date,
    readTime: row.read_time,
    location: row.location,
    category: row.category,
    author: row.author,
    authorRole: row.author_role,
    content: row.content,
    isFeatured: row.is_featured ?? false,
  };
}

/** Fetch from DB only (no static fallback). Returns [] when empty or on error. Use in admin for true empty state. */
export async function fetchStoriesFromDB(): Promise<ImpactStory[]> {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from('impact_stories')
      .select('*')
      .order('id', { ascending: false });
    if (error) return [];
    return (data ?? []).map((row) => rowToStory(row as ImpactStoryRow));
  } catch {
    return [];
  }
}

/** Fetch all impact stories. Single source of truth: DB when non-empty, else static fallback for public display. */
export async function fetchStories(): Promise<ImpactStory[]> {
  if (!supabase) return impactStories;
  try {
    const { data, error } = await supabase
      .from('impact_stories')
      .select('*')
      .order('id', { ascending: false });
    if (error) return impactStories;
    const list = (data ?? []).map(rowToStory);
    return list.length > 0 ? list : impactStories;
  } catch {
    return impactStories;
  }
}

/** Fetch one story by id (Supabase if configured, else static). Falls back to static if not in DB. */
export async function fetchStory(id: number): Promise<ImpactStory | null> {
  const fromStatic = impactStories.find((s) => s.id === id) ?? null;
  if (!supabase) return fromStatic;
  const { data, error } = await supabase
    .from('impact_stories')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error || !data) return fromStatic;
  return rowToStory(data);
}

/** Upload image to storage; returns public URL. Requires auth. Create bucket "impact-stories" in Supabase Dashboard (public) if missing. */
export async function uploadImpactStoryImage(file: File): Promise<string> {
  if (!supabase) throw new Error('Supabase not configured');
  const ext = file.name.split('.').pop() || 'jpg';
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}.${ext}`;
  const { data, error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  });
  if (error) throw new Error(error.message);
  const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(data.path);
  return urlData.publicUrl;
}

/** Create story (Supabase only; requires auth). */
export async function createStory(story: Omit<ImpactStory, 'id'>): Promise<ImpactStory> {
  if (!supabase) throw new Error('Supabase not configured');
  const row = {
    title: story.title,
    excerpt: story.excerpt,
    image: story.image,
    date: story.date,
    read_time: story.readTime,
    location: story.location,
    category: story.category,
    author: story.author,
    author_role: story.authorRole,
    content: story.content,
    is_featured: story.isFeatured ?? false,
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await supabase.from('impact_stories').insert(row as any).select('*').maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throw new Error('Create succeeded but no row returned (check RLS or triggers)');
  return rowToStory(data as ImpactStoryRow);
}

/** Update story (Supabase only; requires auth). */
export async function updateStory(id: number, story: Partial<Omit<ImpactStory, 'id'>>): Promise<ImpactStory> {
  if (!supabase) throw new Error('Supabase not configured');
  // Build payload with exact snake_case column names; omit undefined so we don't send them.
  const update: Record<string, string | boolean> = {};
  if (story.title !== undefined) update.title = story.title;
  if (story.excerpt !== undefined) update.excerpt = story.excerpt;
  if (story.image !== undefined) update.image = story.image;
  if (story.date !== undefined) update.date = story.date;
  if (story.readTime !== undefined) update.read_time = story.readTime;
  if (story.location !== undefined) update.location = story.location;
  if (story.category !== undefined) update.category = story.category;
  if (story.author !== undefined) update.author = story.author;
  if (story.authorRole !== undefined) update.author_role = story.authorRole;
  if (story.content !== undefined) update.content = story.content;
  if (story.isFeatured !== undefined) update.is_featured = story.isFeatured;
  if (Object.keys(update).length === 0) {
    const existing = await fetchStory(id);
    if (existing) return existing;
    throw new Error('No fields to update');
  }

  // Supabase typed client can resolve to never if Database types don't match; payload is correct at runtime.
  // @ts-expect-error - update payload matches impact_stories columns (snake_case)
  const { data, error } = await supabase.from('impact_stories').update(update).eq('id', id).select('*').maybeSingle();
  if (error) throw new Error(error.message + (error.details ? ` (${error.details})` : ''));
  if (!data) throw new Error('Story not found or update had no effect. The story may have been deleted or the id may be wrong.');
  return rowToStory(data as ImpactStoryRow);
}

/** Delete story (Supabase only; requires auth). */
export async function deleteStory(id: number): Promise<void> {
  if (!supabase) throw new Error('Supabase not configured');
  const { error } = await supabase.from('impact_stories').delete().eq('id', id);
  if (error) throw new Error(error.message);
}

/** Legacy static stories (IDs 1–5). Used for seed and fallback. */
const legacyStories = impactStories;

/**
 * Seed impact_stories with the legacy static array. Inserts rows without id so the DB assigns ids.
 * Returns the created stories with database-generated ids (avoids ID mismatch on edit).
 * Requires Supabase and authenticated user.
 */
export async function seedInitialStories(): Promise<ImpactStory[]> {
  if (!supabase) throw new Error('Supabase not configured');
  const rows = legacyStories.map((s) => ({
    title: s.title,
    excerpt: s.excerpt,
    image: s.image,
    date: s.date,
    read_time: s.readTime,
    location: s.location,
    category: s.category,
    author: s.author,
    author_role: s.authorRole,
    content: s.content,
  }));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await supabase.from('impact_stories').insert(rows as any).select('*');
  if (error) throw new Error(error.message);
  return (data ?? []).map((row) => rowToStory(row as ImpactStoryRow));
}
