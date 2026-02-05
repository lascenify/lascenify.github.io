import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePortfolio } from '@/hooks/usePortfolio';
import { panelVariants } from '@/utils/animations';
import { WorkPanel } from './WorkPanel';
import { ProjectsPanel } from './ProjectsPanel';
import { LeisurePanel } from './LeisurePanel';

export const InfoPanel: React.FC = () => {
  const { timeline, context } = usePortfolio();

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={`${context}-${timeline}`}
          variants={panelVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {context === 'work' && <WorkPanel timeline={timeline} />}
          {context === 'projects' && <ProjectsPanel timeline={timeline} />}
          {context === 'leisure' && <LeisurePanel timeline={timeline} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
