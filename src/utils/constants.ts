import type { Timeline, Context } from '@/types/portfolio.types';

export const TIMELINES: Timeline[] = ['past', 'present', 'future'];
export const CONTEXTS: Context[] = ['work', 'projects', 'leisure'];

export const CONTEXT_ICONS = {
  work: '💼',
  projects: '🚀',
  leisure: '🎨',
} as const;

export const TIMELINE_LABELS = {
  es: {
    past: 'Pasado',
    present: 'Presente',
    future: 'Futuro',
  },
  en: {
    past: 'Past',
    present: 'Present',
    future: 'Future',
  },
} as const;
