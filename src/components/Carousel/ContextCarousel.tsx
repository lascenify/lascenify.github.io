import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '@/hooks/usePortfolio';
import { useTranslation } from 'react-i18next';
import { CONTEXTS, CONTEXT_ICONS } from '@/utils/constants';
import type { Timeline, Context } from '@/types/portfolio.types';

interface ContextCarouselProps {
  timeline: Timeline;
}

export const ContextCarousel: React.FC<ContextCarouselProps> = ({ timeline }) => {
  const { contexts, setContext } = usePortfolio();
  const { t } = useTranslation();
  const context = contexts[timeline];

  const handleContextChange = (newContext: Context) => {
    setContext(timeline, newContext);
  };

  return (
    <div className="relative">
      {/* Context Buttons */}
      <div className="flex items-center justify-center gap-2 md:gap-3">
        {CONTEXTS.map((ctx, index) => {
          const isActive = context === ctx;

          return (
            <motion.button
              key={ctx}
              onClick={() => handleContextChange(ctx)}
              className={`relative flex flex-col items-center justify-center w-fit min-w-24 h-24 p-3 md:p-4 rounded-xl transition-all border-2 ${
                isActive
                  ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-2xl border-transparent'
                  : 'bg-surface-light dark:bg-surface-dark hover:bg-gray-200 dark:hover:bg-gray-600 border-gray-300 dark:border-gray-600 hover:border-primary-light dark:hover:border-primary-dark'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: isActive ? 1.05 : 1,
              }}
              transition={{
                duration: 0.3,
                delay: index * 0.1,
                type: 'spring',
                stiffness: 260,
                damping: 20,
              }}
              whileHover={{
                scale: isActive ? 1.05 : 1.08,
                y: -5,
              }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Active Indicator */}
              {isActive && (
                <motion.div
                  className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </motion.div>
              )}

              {/* Emoji Icon */}
              <motion.span
                className="text-4xl md:text-5xl mb-2"
                animate={{
                  rotate: isActive ? [0, -10, 10, -10, 0] : 0
                }}
                transition={{ duration: 0.5 }}
              >
                {CONTEXT_ICONS[ctx]}
              </motion.span>

              {/* Label */}
              <span className="text-xs md:text-sm font-bold uppercase tracking-wider">
                {t(`contexts.${ctx}`)}
              </span>

              {/* Glow effect for active */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 opacity-20 blur-xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.3, 0.2],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
