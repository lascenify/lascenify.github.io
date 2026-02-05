import type { Language, Timeline, TimelineData } from '@/types/portfolio.types';
import { portfolioDataES } from './portfolio.es';
import { portfolioDataEN } from './portfolio.en';

export const portfolioDataMap: Record<Language, Record<Timeline, TimelineData>> = {
  es: portfolioDataES,
  en: portfolioDataEN,
};

export function getPortfolioData(language: Language): Record<Timeline, TimelineData> {
  return portfolioDataMap[language] || portfolioDataES;
}

// Mantener compatibilidad hacia atrás - por defecto en español
export const portfolioData = portfolioDataES;
