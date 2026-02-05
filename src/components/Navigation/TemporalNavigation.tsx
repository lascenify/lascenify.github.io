import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '@/hooks/usePortfolio';
import { useTranslation } from 'react-i18next';
import { TIMELINES } from '@/utils/constants';
import type { Timeline } from '@/types/portfolio.types';

const timelineIcons = {
  past: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  present: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  future: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
};

export const TemporalNavigation: React.FC = () => {
  const { timeline, setTimeline } = usePortfolio();
  const { t } = useTranslation();

  const currentIndex = TIMELINES.indexOf(timeline);

  return (
    <div className="relative w-full px-4">
      {/* Timeline Container */}
      <div className="relative">
        {/* Background Line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 dark:bg-gray-600 -translate-y-1/2 rounded-full" />

        {/* Animated Active Line */}
        <motion.div
          className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 -translate-y-1/2 rounded-full"
          initial={false}
          animate={{
            width: currentIndex === 0 ? '0%' : currentIndex === 1 ? '50%' : '100%',
          }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />

        {/* Timeline Nodes */}
        <div className="relative flex justify-between items-center">
          {TIMELINES.map((time, index) => {
            const isActive = timeline === time;
            const isPassed = index < currentIndex;

            return (
              <motion.button
                key={time}
                onClick={() => setTimeline(time as Timeline)}
                className="relative flex flex-col items-center group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Node Circle */}
                <motion.div
                  className={`relative z-10 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all ${
                    isActive
                      ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white scale-110 shadow-2xl'
                      : isPassed
                      ? 'bg-blue-400 dark:bg-blue-500 text-white'
                      : 'bg-white dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                  }`}
                  animate={{
                    scale: isActive ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Inner Pulse for Active */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-blue-400"
                      initial={{ scale: 1, opacity: 0.5 }}
                      animate={{ scale: 1.3, opacity: 0 }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeOut',
                      }}
                    />
                  )}

                  {/* Icon */}
                  <div className="relative z-10">
                    {timelineIcons[time]}
                  </div>
                </motion.div>

                {/* Label */}
                <motion.div
                  className="mt-4 text-center"
                  animate={{
                    y: isActive ? -5 : 0,
                  }}
                >
                  <p
                    className={`text-sm font-semibold uppercase tracking-wider transition-colors ${
                      isActive
                        ? 'text-primary-light dark:text-primary-dark'
                        : 'text-text-secondary-light dark:text-text-secondary-dark'
                    }`}
                  >
                    {t(`nav.${time}`)}
                  </p>
                </motion.div>

                {/* Hover Tooltip */}
                <div className="absolute -bottom-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="px-3 py-1 bg-black dark:bg-white text-white dark:text-black text-xs rounded-md whitespace-nowrap">
                    {t(`nav.${time}`)}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Mobile Helper Text */}
      <div className="mt-6 text-center md:hidden">
        <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
          {t(`nav.${timeline}`)}
        </p>
      </div>
    </div>
  );
};
