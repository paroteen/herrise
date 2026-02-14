import React from 'react';
import { fetchStories, fetchStoriesFromDB, fetchStory } from '@/services/storiesApi';
import type { ImpactStory } from '@/data/impactStories';

export type UseStoriesOptions = {
  /** When true, fetch only from DB (no static fallback). Use in admin for true empty state + seed. */
  fromDBOnly?: boolean;
};

export function useStories(options?: UseStoriesOptions): {
  stories: ImpactStory[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
} {
  const fromDBOnly = options?.fromDBOnly ?? false;
  const [stories, setStories] = React.useState<ImpactStory[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = fromDBOnly ? await fetchStoriesFromDB() : await fetchStories();
      setStories(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load stories');
      setStories([]);
    } finally {
      setLoading(false);
    }
  }, [fromDBOnly]);

  React.useEffect(() => {
    load();
  }, [load]);

  return { stories, loading, error, refetch: load };
}

export function useStory(id: number | null): {
  story: ImpactStory | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
} {
  const [story, setStory] = React.useState<ImpactStory | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    if (id == null) {
      setStory(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await fetchStory(id);
      setStory(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load story');
      setStory(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  React.useEffect(() => {
    load();
  }, [load]);

  return { story, loading, error, refetch: load };
}
