import { supabase } from '@/lib/supabase';
import type { ImpactStoryRow } from '@/types/database';
import { impactStories, type ImpactStory } from '@/data/impactStories';

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
  };
}

/** Fetch all impact stories (Supabase if configured, else static). Falls back to static list if DB is empty or request fails. */
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
    .single();
  if (error || !data) return fromStatic;
  return rowToStory(data);
}

/** Create story (Supabase only; requires auth). */
export async function createStory(story: Omit<ImpactStory, 'id'>): Promise<ImpactStory> {
  if (!supabase) throw new Error('Supabase not configured');
  const { data, error } = await supabase
    .from('impact_stories')
    .insert({
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
    })
    .select('*')
    .single();
  if (error) throw new Error(error.message);
  return rowToStory(data);
}

/** Update story (Supabase only; requires auth). */
export async function updateStory(id: number, story: Partial<Omit<ImpactStory, 'id'>>): Promise<ImpactStory> {
  if (!supabase) throw new Error('Supabase not configured');
  const update: Record<string, unknown> = {};
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
  const { data, error } = await supabase
    .from('impact_stories')
    .update(update)
    .eq('id', id)
    .select('*')
    .single();
  if (error) throw new Error(error.message);
  return rowToStory(data);
}

/** Delete story (Supabase only; requires auth). */
export async function deleteStory(id: number): Promise<void> {
  if (!supabase) throw new Error('Supabase not configured');
  const { error } = await supabase.from('impact_stories').delete().eq('id', id);
  if (error) throw new Error(error.message);
}
