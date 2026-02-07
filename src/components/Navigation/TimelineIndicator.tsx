import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import type { Timeline } from '@/types/portfolio.types';

interface TimelineIndicatorProps {
  activeTimeline: Timeline;
  show: boolean;
}

const timelineConfig = {
  past: {
    gradient: 'from-amber-500 to-orange-600',
    bgGradient: 'from-amber-500/10 to-orange-600/10',
    icon: '🕐',
  },
  present: {
    gradient: 'from-blue-500 to-purple-600',
    bgGradient: 'from-blue-500/10 to-purple-600/10',
    icon: '⚡',
  },
  future: {
    gradient: 'from-purple-500 to-pink-600',
    bgGradient: 'from-purple-500/10 to-pink-600/10',
    icon: '✨',
  },
};

export const TimelineIndicator: React.FC<TimelineIndicatorProps> = ({ activeTimeline, show }) => {
  const { t } = useTranslation();
  const config = timelineConfig[activeTimeline];

  if (!show) return null;

  return (
    <div className="lg:hidden fixed top-28 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTimeline}
          initial={{ opacity: 0, y: -20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.8 }}
          transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 25 }}
          className="relative"
        >
          {/* Main chip */}
          <div
            className={`
              relative overflow-hidden
              px-4 py-2 rounded-full
              bg-gradient-to-r ${config.bgGradient}
              backdrop-blur-md
              border border-white/20 dark:border-white/10
              shadow-lg
            `}
          >
            {/* Animated gradient background */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-r ${config.gradient} opacity-20`}
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
            />

            {/* Content */}
            <div className="relative flex items-center gap-2">
              {/* Icon */}
              <motion.span
                className="text-lg"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.2,
                }}
              >
                {config.icon}
              </motion.span>

              {/* Text */}
              <span
                className={`
                  text-sm font-bold uppercase tracking-wider
                  bg-gradient-to-r ${config.gradient}
                  bg-clip-text text-transparent
                `}
              >
                {t(`timeline.${activeTimeline}`)}
              </span>
            </div>

            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              initial={{ x: '-100%' }}
              animate={{ x: '200%' }}
              transition={{
                duration: 1.5,
                delay: 0.3,
                ease: 'easeInOut',
              }}
            />
          </div>

          {/* Glow effect */}
          <motion.div
            className={`absolute inset-0 rounded-full bg-gradient-to-r ${config.gradient} blur-xl opacity-30`}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
