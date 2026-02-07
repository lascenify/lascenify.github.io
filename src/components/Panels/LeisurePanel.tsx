import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/UI/Card';
import { getPortfolioData } from '@/data/portfolio.i18n';
import type { Timeline } from '@/types/portfolio.types';

interface LeisurePanelProps {
  timeline: Timeline;
}

export const LeisurePanel: React.FC<LeisurePanelProps> = ({ timeline }) => {
  const { t, i18n } = useTranslation();
  const portfolioData = getPortfolioData(i18n.language as 'es' | 'en');
  const hobbies = portfolioData[timeline].leisure;

  // Si no hay datos de leisure para este timeline, no renderizar nada
  if (!hobbies || hobbies.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center mb-8">
        {t('leisure.title')}
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {hobbies.map((hobby, index) => (
          <Card key={hobby.id} index={index}>
            <div className="flex flex-col items-center text-center space-y-3">
              <span className="text-6xl">{hobby.icon}</span>
              <h3 className="text-xl font-bold text-primary-light dark:text-primary-dark">
                {hobby.name}
              </h3>
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                {hobby.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
