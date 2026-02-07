import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Avatar } from '@/components/Avatar/Avatar';
import { ContextCarousel } from '@/components/Carousel/ContextCarousel';
import { InfoPanel } from '@/components/Panels/InfoPanel';
import { usePortfolio } from '@/hooks/usePortfolio';
import type { Timeline } from '@/types/portfolio.types';

interface TimelineSectionProps {
  timeline: Timeline;
  registerSection: (timeline: Timeline, element: HTMLElement | null) => void;
}

const timelineLabels: Record<Timeline, { es: string; en: string }> = {
  past: { es: 'Pasado', en: 'Past' },
  present: { es: 'Presente', en: 'Present' },
  future: { es: 'Futuro', en: 'Future' },
};

export const TimelineSection: React.FC<TimelineSectionProps> = ({
  timeline,
  registerSection,
}) => {
  const { i18n } = useTranslation();
  const { contexts } = usePortfolio();
  const context = contexts[timeline];
  const sectionRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerSection(timeline, sectionRef.current);
  }, [timeline, registerSection]);

  const label = timelineLabels[timeline][i18n.language as 'es' | 'en'];

  return (
    <section
      ref={sectionRef}
      id={`timeline-${timeline}`}
      data-timeline={timeline}
      className="min-h-screen pt-20 pb-16 lg:py-24"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 lg:mb-16"
        >
          <h2 className="text-2xl lg:text-5xl font-bold mb-3 lg:mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            {label}
          </h2>
          <div className="w-16 lg:w-24 h-0.5 lg:h-1 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" />
        </motion.div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(350px,450px)_1fr] gap-8 lg:gap-12">
          {/* Left Column: Avatar and Context (if applicable) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center gap-8 lg:sticky lg:top-32 lg:self-start"
          >
            {/* Context Carousel - Only for past and present */}
            {timeline !== 'future' && (
              <div id={`${timeline}-context`} className="w-full flex justify-center scroll-mt-20">
                <ContextCarousel timeline={timeline} />
              </div>
            )}

            {/* Avatar */}
            <div id={`${timeline}-avatar`} className="w-full max-w-md scroll-mt-24">
              <Avatar timeline={timeline} context={context} />
            </div>

            {/* Timeline indicator decoration */}
            <div className="hidden lg:block w-0.5 h-32 bg-gradient-to-b from-primary-light/50 to-transparent dark:from-primary-dark/50" />
          </motion.div>

          {/* Right Column: Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-start"
          >
            <div className="w-full">
              <InfoPanel timeline={timeline} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Section divider */}
      {timeline !== 'future' && (
        <div className="container mx-auto px-4 mt-16 lg:mt-24">
          <div className="flex items-center justify-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-primary-light/50 dark:bg-primary-dark/50 animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-primary-light/50 dark:bg-primary-dark/50 animate-pulse delay-100" />
              <div className="w-2 h-2 rounded-full bg-primary-light/50 dark:bg-primary-dark/50 animate-pulse delay-200" />
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
          </div>
        </div>
      )}
    </section>
  );
};
