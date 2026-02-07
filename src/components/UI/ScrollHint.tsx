import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const ScrollHint: React.FC = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Show hint after a brief delay
    const showTimer = setTimeout(() => {
      setShow(true);
    }, 2000);

    // Hide hint after scroll or after 8 seconds
    const hideTimer = setTimeout(() => {
      setShow(false);
    }, 10000);

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShow(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 bottom-8 z-40 flex justify-center pointer-events-none">
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-2"
          >
          {/* Text hint */}
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark"
          >
            {t('scrollHint.text')}
          </motion.p>

          {/* Animated arrow */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-8 h-8"
          >
            <svg
              className="w-full h-full text-primary-light dark:text-primary-dark"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>

          {/* Glow effect */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 blur-xl opacity-30 rounded-full"
          />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
