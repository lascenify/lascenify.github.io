import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePortfolio } from '@/hooks/usePortfolio';
import { Avatar } from './Avatar';
import { TemporalNavigation } from '@/components/Navigation/TemporalNavigation';
import { ContextCarousel } from '@/components/Carousel/ContextCarousel';

export const AvatarContainer: React.FC = () => {
  const { timeline, contexts } = usePortfolio();
  const context = contexts[timeline];

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-lg sticky top-24">
      {/* Temporal Navigation - Top */}
      <TemporalNavigation />

      {/* Context Carousel - Only visible in present */}
      <AnimatePresence mode="wait">
        {timeline !== 'future' && (
          <motion.div
            key="context-carousel"
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="w-full flex justify-center"
          >
            <ContextCarousel timeline={timeline} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Avatar - Center */}
      <Avatar timeline={timeline} context={context} />
    </div>
  );
};
