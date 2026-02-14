import React from 'react';
import { fetchSheStories, fetchSheStoriesFromDB } from '@/services/sheStoriesApi';
import type { SheStory } from '@/types';

export type UseSheStoriesOptions = { fromDBOnly?: boolean };

export function useSheStories(options?: UseSheStoriesOptions): {
  stories: SheStory[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
} {
  const fromDBOnly = options?.fromDBOnly ?? false;
  const [stories, setStories] = React.useState<SheStory[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = fromDBOnly ? await fetchSheStoriesFromDB() : await fetchSheStories();
      setStories(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load She Stories');
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
