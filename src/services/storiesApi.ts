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

/** Fetch all impact stories (Supabase if configured, else static). */
export async function fetchStories(): Promise<ImpactStory[]> {
  if (!supabase) return impactStories;
  const { data, error } = await supabase
    .from('impact_stories')
    .select('*')
    .order('id', { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []).map(rowToStory);
}

/** Fetch one story by id (Supabase if configured, else static). */
export async function fetchStory(id: number): Promise<ImpactStory | null> {
  if (!supabase) return impactStories.find((s) => s.id === id) ?? null;
  const { data, error } = await supabase
    .from('impact_stories')
    .select('*')
    .eq('id', id)
    .single();
  if (error || !data) return null;
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
