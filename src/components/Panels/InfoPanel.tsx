import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePortfolio } from '@/hooks/usePortfolio';
import { panelVariants } from '@/utils/animations';
import { WorkPanel } from './WorkPanel';
import { ProjectsPanel } from './ProjectsPanel';
import { LeisurePanel } from './LeisurePanel';
import type { Timeline } from '@/types/portfolio.types';

interface InfoPanelProps {
  timeline: Timeline;
}

export const InfoPanel: React.FC<InfoPanelProps> = ({ timeline }) => {
  const { contexts } = usePortfolio();
  const context = contexts[timeline];

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
