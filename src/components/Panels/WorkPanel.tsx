import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/UI/Card';
import { getPortfolioData } from '@/data/portfolio.i18n';
import type { Timeline } from '@/types/portfolio.types';

interface WorkPanelProps {
  timeline: Timeline;
}

export const WorkPanel: React.FC<WorkPanelProps> = ({ timeline }) => {
  const { t, i18n } = useTranslation();
  const portfolioData = getPortfolioData(i18n.language as 'es' | 'en');
  const experiences = portfolioData[timeline].work;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center mb-8">
        {t('work.title')}
      </h2>

      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <Card key={exp.id} index={index}>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-primary-light dark:text-primary-dark">
                  {exp.title}
                </h3>
                {exp.company && (
                  <p className="text-text-secondary-light dark:text-text-secondary-dark">
                    {exp.company}
                  </p>
                )}
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-1">
                  {exp.period}
                </p>
              </div>

              <p className="text-text-primary-light dark:text-text-primary-dark">
                {exp.description}
              </p>

              <div>
                <h4 className="font-semibold mb-2">{t('work.technologies')}</h4>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-primary-light/10 dark:bg-primary-dark/10 text-primary-light dark:text-primary-dark rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {exp.highlights && exp.highlights.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">{t('work.highlights')}</h4>
                  <ul className="list-disc list-inside space-y-1 text-text-secondary-light dark:text-text-secondary-dark">
                    {exp.highlights.map((highlight, idx) => (
                      <li key={idx}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
