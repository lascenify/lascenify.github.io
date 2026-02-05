import type { Timeline, Context } from '@/types/portfolio.types';

export const getAvatarUrl = (timeline: Timeline, context: Context): string => {
  // Solo en 'present' hay múltiples contextos (work, projects, leisure)
  // En 'past' y 'future' solo hay un avatar
  if (timeline === 'present') {
    return `/avatars/present-${context}.webp`;
  }

  // Para past y future, solo hay un avatar
  return `/avatars/${timeline}.webp`;
};
