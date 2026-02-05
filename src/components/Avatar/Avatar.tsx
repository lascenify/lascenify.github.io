import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { avatarVariants } from '@/utils/animations';
import { getAvatarUrl } from '@/data/avatars.data';
import type { Timeline, Context } from '@/types/portfolio.types';

interface AvatarProps {
  timeline: Timeline;
  context: Context;
}

export const Avatar: React.FC<AvatarProps> = ({ timeline, context }) => {
  const avatarUrl = getAvatarUrl(timeline, context);

  // El avatar inicial se carga con prioridad (está preloaded en index.html)
  const isPriority = timeline === 'present' && context === 'work';

  return (
    <div className="flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={`${timeline}-${context}`}
          variants={avatarVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="relative"
        >
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-primary-light dark:border-primary-dark shadow-2xl bg-surface-light dark:bg-surface-dark flex items-center justify-center">
            <img
              src={avatarUrl}
              alt={`Avatar - ${context} ${timeline}`}
              className="w-full h-full object-cover"
              loading={isPriority ? 'eager' : 'lazy'}
              decoding={isPriority ? 'sync' : 'async'}
              onError={(e) => {
                // Fallback to placeholder if image doesn't exist
                const target = e.target as HTMLImageElement;
                target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ddd" width="200" height="200"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-size="40"%3EAvatar%3C/text%3E%3C/svg%3E';
              }}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
