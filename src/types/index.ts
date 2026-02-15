import type { ReactNode } from 'react';

export interface NavItem {
  label: string;
  path: string;
}

export interface Programme {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  impact: string;
  image: string;
}

export interface Stat {
  label: string;
  value: string;
  description: string;
}

export interface Project {
  title: string;
  timeline: string;
  status: 'Planned' | 'In Progress' | 'Completed';
  focusArea: string;
  description: string;
}

/** She Stories: short, personal stories with content, change achieved, and quotes (array). */
export interface SheStory {
  id: number;
  title: string;
  name: string;
  content: string;
  changeAchieved: string[];
  quotes: string[];
  photo: string;
  photoCaption: string;
}

export * from './database';
