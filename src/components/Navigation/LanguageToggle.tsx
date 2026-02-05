import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { usePortfolio } from '@/hooks/usePortfolio';
import type { Language } from '@/types/portfolio.types';

export const LanguageToggle: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { language, setLanguage } = usePortfolio();

  const toggleLanguage = () => {
    const newLang: Language = language === 'es' ? 'en' : 'es';
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  return (
    <motion.button
      onClick={toggleLanguage}
      className="px-4 py-2 rounded-lg bg-surface-light dark:bg-surface-dark hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-semibold"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={t('accessibility.toggleLanguage')}
    >
      {language.toUpperCase()}
    </motion.button>
  );
};
