export interface NavItem {
  label: string;
  path: string;
}

export interface Programme {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
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