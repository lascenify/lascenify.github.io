import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % experiences.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + experiences.length) % experiences.length);
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center mb-8">
        {t('work.title')}
      </h2>

      {/* Desktop: Vertical list */}
      <div className="hidden lg:block space-y-6">
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

      {/* Mobile: Horizontal carousel */}
      <div className="lg:hidden relative">
        {/* Navigation arrows */}
        {experiences.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-2 rounded-full bg-surface-light dark:bg-surface-dark border-2 border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark shadow-lg hover:scale-110 transition-transform"
              aria-label="Previous"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-2 rounded-full bg-surface-light dark:bg-surface-dark border-2 border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark shadow-lg hover:scale-110 transition-transform"
              aria-label="Next"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Carousel content */}
        <div className="overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <Card index={currentIndex}>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-primary-light dark:text-primary-dark">
                      {experiences[currentIndex].title}
                    </h3>
                    {experiences[currentIndex].company && (
                      <p className="text-text-secondary-light dark:text-text-secondary-dark">
                        {experiences[currentIndex].company}
                      </p>
                    )}
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-1">
                      {experiences[currentIndex].period}
                    </p>
                  </div>

                  <p className="text-text-primary-light dark:text-text-primary-dark">
                    {experiences[currentIndex].description}
                  </p>

                  <div>
                    <h4 className="font-semibold mb-2">{t('work.technologies')}</h4>
                    <div className="flex flex-wrap gap-2">
                      {experiences[currentIndex].technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-primary-light/10 dark:bg-primary-dark/10 text-primary-light dark:text-primary-dark rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {experiences[currentIndex].highlights && experiences[currentIndex].highlights!.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">{t('work.highlights')}</h4>
                      <ul className="list-disc list-inside space-y-1 text-text-secondary-light dark:text-text-secondary-dark">
                        {experiences[currentIndex].highlights!.map((highlight, idx) => (
                          <li key={idx}>{highlight}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots indicator */}
        {experiences.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {experiences.map((_, index) => (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-primary-light dark:bg-primary-dark w-8'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
