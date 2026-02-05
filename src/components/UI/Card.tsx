import React from 'react';
import { motion } from 'framer-motion';
import { cardVariants } from '@/utils/animations';

interface CardProps {
  children: React.ReactNode;
  index?: number;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, index = 0, className = '' }) => {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className={`p-6 rounded-xl bg-surface-light dark:bg-surface-dark shadow-lg hover:shadow-xl transition-shadow ${className}`}
    >
      {children}
    </motion.div>
  );
};
