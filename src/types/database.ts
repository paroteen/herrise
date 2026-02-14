/**
 * Supabase database types for type-safe client usage.
 * Matches the public.impact_stories table schema.
 */

export type ImpactStoryRow = {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  read_time: string;
  location: string;
  category: string;
  author: string;
  author_role: string;
  content: string;
  created_at: string | null;
  updated_at: string | null;
};

export type ImpactStoryInsert = Omit<ImpactStoryRow, 'id' | 'created_at' | 'updated_at'> & {
  id?: number;
  created_at?: string | null;
  updated_at?: string | null;
};

export type ImpactStoryUpdate = Partial<Omit<ImpactStoryRow, 'id'>>;

export interface Database {
  public: {
    Tables: {
      impact_stories: {
        Row: ImpactStoryRow;
        Insert: ImpactStoryInsert;
        Update: ImpactStoryUpdate;
      };
    };
  };
}
