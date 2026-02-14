import { supabase } from '@/lib/supabase';
import type { SheStoryRow } from '@/types/database';
import { sheStories as legacyStories, type SheStory } from '@/data/sheStories';

const BUCKET = 'she-stories';

function rowToStory(row: SheStoryRow): SheStory {
  const changeAchieved = Array.isArray(row.change_achieved) ? row.change_achieved : [];
  return {
    id: Number(row.id),
    title: row.title,
    name: row.name,
    content: row.content ?? '',
    changeAchieved: changeAchieved,
    quotes: row.quote ?? '',
    photo: row.image_url ?? '',
    photoCaption: row.image_caption ?? '',
  };
}

/** Fetch from DB only (no legacy fallback). For admin. */
export async function fetchSheStoriesFromDB(): Promise<SheStory[]> {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from('she_stories')
      .select('*')
      .order('id', { ascending: false });
    if (error) return [];
    return (data ?? []).map((r) => rowToStory(r as SheStoryRow));
  } catch {
    return [];
  }
}

/** Fetch all She Stories (Supabase if configured, else static). For public. */
export async function fetchSheStories(): Promise<SheStory[]> {
  if (!supabase) return legacyStories;
  try {
    const { data, error } = await supabase
      .from('she_stories')
      .select('*')
      .order('id', { ascending: false });
    if (error) return legacyStories;
    const list = (data ?? []).map((r) => rowToStory(r as SheStoryRow));
    return list.length > 0 ? list : legacyStories;
  } catch {
    return legacyStories;
  }
}

/** Fetch one She Story by id. */
export async function fetchSheStory(id: number): Promise<SheStory | null> {
  const fromLegacy = legacyStories.find((s) => s.id === id) ?? null;
  if (!supabase) return fromLegacy;
  const { data, error } = await supabase
    .from('she_stories')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error || !data) return fromLegacy;
  return rowToStory(data as SheStoryRow);
}

/** Upload image to storage; returns public URL. Requires auth. Create bucket "she-stories" in Supabase Dashboard (public) if missing. */
export async function uploadSheStoryImage(file: File): Promise<string> {
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

/** Create She Story. Requires auth. */
export async function createSheStory(story: Omit<SheStory, 'id'>): Promise<SheStory> {
  if (!supabase) throw new Error('Supabase not configured');
  const row = {
    title: story.title,
    name: story.name,
    content: story.content ?? '',
    change_achieved: story.changeAchieved ?? [],
    quote: story.quotes ?? '',
    image_url: story.photo ?? '',
    image_caption: story.photoCaption ?? '',
  };
  const { data, error } = await supabase.from('she_stories').insert(row as never).select('*').maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throw new Error('Create succeeded but no row returned');
  return rowToStory(data as SheStoryRow);
}

/** Update She Story. Requires auth. */
export async function updateSheStory(id: number, story: Partial<Omit<SheStory, 'id'>>): Promise<SheStory> {
  if (!supabase) throw new Error('Supabase not configured');
  const update: Record<string, unknown> = {};
  if (story.title !== undefined) update.title = story.title;
  if (story.name !== undefined) update.name = story.name;
  if (story.content !== undefined) update.content = story.content;
  if (story.changeAchieved !== undefined) update.change_achieved = story.changeAchieved;
  if (story.quotes !== undefined) update.quote = story.quotes;
  if (story.photo !== undefined) update.image_url = story.photo;
  if (story.photoCaption !== undefined) update.image_caption = story.photoCaption;
  if (Object.keys(update).length === 0) {
    const existing = await fetchSheStory(id);
    if (existing) return existing;
    throw new Error('No fields to update');
  }
  const { data, error } = await supabase
    .from('she_stories')
    .update(update as never)
    .eq('id', id)
    .select('*')
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throw new Error('Story not found or update had no effect');
  return rowToStory(data as SheStoryRow);
}

/** Delete She Story. Requires auth. */
export async function deleteSheStory(id: number): Promise<void> {
  if (!supabase) throw new Error('Supabase not configured');
  const { error } = await supabase.from('she_stories').delete().eq('id', id);
  if (error) throw new Error(error.message);
}
