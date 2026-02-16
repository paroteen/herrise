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
  is_featured: boolean | null;
  created_at: string | null;
  updated_at: string | null;
};

export type ImpactStoryInsert = Omit<ImpactStoryRow, 'id' | 'created_at' | 'updated_at'> & {
  id?: number;
  created_at?: string | null;
  updated_at?: string | null;
};

export type ImpactStoryUpdate = Partial<Omit<ImpactStoryRow, 'id'>>;

export type SheStoryRow = {
  id: number;
  title: string;
  name: string;
  content: string;
  change_achieved: string[];
  quote?: string;
  quotes: string[];
  image_url: string;
  image_caption: string;
  is_featured: boolean | null;
  created_at: string | null;
  updated_at: string | null;
};

export type SheStoryInsert = Omit<SheStoryRow, 'id' | 'created_at' | 'updated_at'> & {
  id?: number;
  created_at?: string | null;
  updated_at?: string | null;
};

export type SheStoryUpdate = Partial<Omit<SheStoryRow, 'id'>>;

export interface Database {
  public: {
    Tables: {
      impact_stories: {
        Row: ImpactStoryRow;
        Insert: ImpactStoryInsert;
        Update: ImpactStoryUpdate;
      };
      she_stories: {
        Row: SheStoryRow;
        Insert: SheStoryInsert;
        Update: SheStoryUpdate;
      };
    };
  };
}
