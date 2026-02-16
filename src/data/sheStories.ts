import type { SheStory } from '@/types';

/** Default She Stories (local/CMS can replace). Change Achieved is a list; Quotes is a single statement. */
export const sheStories: SheStory[] = [
  {
    id: 1,
    title: 'From Market Stall to Business Owner',
    name: 'Grace N.',
    content: 'Grace joined our microfinance program with a dream to grow her market stall into a real business. Today she runs a small retail shop and employs two other women from her community.',
    changeAchieved: [
      'Started a small retail business with microfinance support',
      'Hired two other women from her community',
      'Now sends all three children to school',
    ],
    quotes: ['I used to think business was for men. HerRise showed me I could lead.'],
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
    photoCaption: 'Grace at her shop in Kabare.',
    isFeatured: false,
  },
  {
    id: 2,
    title: 'Back to School at 30',
    name: 'Prossy M.',
    content: 'Prossy returned to education through our adult literacy program and went on to vocational training in tailoring. She now runs her own workshop and trains other women.',
    changeAchieved: [
      'Completed adult literacy classes',
      'Enrolled in vocational training',
      'Now runs a tailoring workshop and trains others',
    ],
    quotes: ['Education has no age. I am proof that it is never too late to learn.'],
    photo: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80',
    photoCaption: 'Prossy in her tailoring workshop.',
    isFeatured: false,
  },
];
