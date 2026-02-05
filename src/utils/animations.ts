import type { Variants } from 'framer-motion';

// Transición del Avatar
export const avatarVariants: Variants = {
  initial: { opacity: 0, scale: 0.8, rotate: -10 },
  animate: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    rotate: 10,
    transition: { duration: 0.3 }
  },
};

// Transición de Paneles
export const panelVariants: Variants = {
  initial: { opacity: 0, x: 100 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: 'easeOut' }
  },
  exit: {
    opacity: 0,
    x: -100,
    transition: { duration: 0.3 }
  },
};

// Cards (lista de experiencias)
export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: 'easeOut' },
  }),
};

// Botones y elementos interactivos
export const buttonHoverVariants: Variants = {
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.95 },
};

// Fade in animation
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 }
  },
};

// Slide up animation
export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  },
};
