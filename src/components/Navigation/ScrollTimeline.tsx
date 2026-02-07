import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
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

interface ScrollTimelineProps {
  activeTimeline: Timeline;
  onTimelineClick: (timeline: Timeline) => void;
}

export const ScrollTimeline: React.FC<ScrollTimelineProps> = ({
  activeTimeline,
  onTimelineClick
}) => {
  const { t } = useTranslation();
  const [hoveredItem, setHoveredItem] = useState<Timeline | null>(null);
  const [pressedItem, setPressedItem] = useState<Timeline | null>(null);

  const timelineItems: Timeline[] = ['past', 'present', 'future'];

  const scrollToSection = (timeline: Timeline) => {
    let targetElement: HTMLElement | null = null;

    // Select specific target based on timeline
    if (timeline === 'past') {
      // For past, scroll to the section (top)
      targetElement = document.getElementById(`timeline-${timeline}`);
    } else if (timeline === 'present') {
      // For present, scroll to the context carousel
      targetElement = document.getElementById(`${timeline}-context`);
    } else if (timeline === 'future') {
      // For future, scroll to the avatar
      targetElement = document.getElementById(`${timeline}-avatar`);
    }

    if (targetElement) {
      // Calculate offset based on screen size and timeline
      const baseOffset =  110;

      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - baseOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
    onTimelineClick(timeline);
  };

  return (
    <>
      {/* Desktop: Vertical timeline on the left */}
      <div className="hidden lg:block fixed left-8 top-1/2 -translate-y-1/2 z-40">
        <div className="flex flex-col items-center gap-8">
          {timelineItems.map((item, index) => {
            const isActive = activeTimeline === item;
            const isHovered = hoveredItem === item;

            return (
              <div key={item} className="relative flex items-center gap-4">
                {/* Timeline line */}
                {index < timelineItems.length - 1 && (
                  <div className="absolute top-12 left-1/2 -translate-x-1/2 w-0.5 h-16 bg-gradient-to-b from-primary-light/50 to-primary-light/20 dark:from-primary-dark/50 dark:to-primary-dark/20" />
                )}

                {/* Timeline point */}
                <motion.button
                  onClick={() => scrollToSection(item)}
                  onMouseEnter={() => setHoveredItem(item)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="relative group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Outer ring */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/50'
                        : 'bg-surface-light dark:bg-surface-dark text-text-secondary-light dark:text-text-secondary-dark border-2 border-gray-300 dark:border-gray-600 hover:border-primary-light dark:hover:border-primary-dark'
                    }`}
                  >
                    {timelineIcons[item]}
                  </div>

                  {/* Label tooltip */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{
                      opacity: isHovered || isActive ? 1 : 0,
                      x: isHovered || isActive ? 0 : -10,
                    }}
                    className="absolute left-16 top-1/2 -translate-y-1/2 whitespace-nowrap"
                  >
                    <div className="bg-surface-light dark:bg-surface-dark px-3 py-1.5 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                      <span className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
                        {t(`timeline.${item}`)}
                      </span>
                    </div>
                  </motion.div>

                  {/* Active indicator pulse */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600"
                      initial={{ scale: 1, opacity: 0.5 }}
                      animate={{ scale: 1.4, opacity: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </motion.button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile: Vertical mini timeline on the left (floating) */}
      <div className="lg:hidden fixed left-2 top-1/2 -translate-y-1/2 z-40">
        <div className="flex flex-col items-center gap-6">
          {timelineItems.map((item, index) => {
            const isActive = activeTimeline === item;

            return (
              <div key={item} className="relative flex items-center gap-2">
                {/* Timeline line */}
                {index < timelineItems.length - 1 && (
                  <div className="absolute top-9 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-gradient-to-b from-primary-light/30 to-primary-light/10 dark:from-primary-dark/30 dark:to-primary-dark/10" />
                )}

                {/* Timeline point - mini when inactive */}
                <motion.button
                  onClick={() => scrollToSection(item)}
                  onTouchStart={() => setPressedItem(item)}
                  onTouchEnd={() => setPressedItem(null)}
                  className="relative group"
                  whileTap={{ scale: 0.9 }}
                  animate={{
                    scale: isActive ? 1 : 0.75,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Outer glow when active */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 opacity-50 blur-md"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.3, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  )}

                  {/* Icon circle */}
                  <div
                    className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/50'
                        : 'bg-surface-light/80 dark:bg-surface-dark/80 text-text-secondary-light/60 dark:text-text-secondary-dark/60 backdrop-blur-sm border border-gray-300/50 dark:border-gray-600/50'
                    }`}
                  >
                    <div className={isActive ? 'scale-100' : 'scale-75'}>
                      {timelineIcons[item]}
                    </div>
                  </div>

                  {/* Label tooltip - only shows when pressed */}
                  <motion.div
                    initial={{ opacity: 0, x: -10, scale: 0.8 }}
                    animate={{
                      opacity: pressedItem === item ? 1 : 0,
                      x: pressedItem === item ? 0 : -10,
                      scale: pressedItem === item ? 1 : 0.8,
                    }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-12 top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none"
                  >
                    <div className="bg-surface-light dark:bg-surface-dark px-2.5 py-1 rounded-md shadow-lg border border-gray-200 dark:border-gray-700">
                      <span className="text-xs font-medium text-text-primary-light dark:text-text-primary-dark">
                        {t(`timeline.${item}`)}
                      </span>
                    </div>
                  </motion.div>
                </motion.button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
