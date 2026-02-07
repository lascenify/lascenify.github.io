import React from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeToggle } from '@/components/Navigation/ThemeToggle';
import { LanguageToggle } from '@/components/Navigation/LanguageToggle';

export const Header: React.FC = () => {
  const { t } = useTranslation();

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-section');

    if (contactSection) {
      const headerOffset = 100;

      const elementPosition = contactSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 pt-1">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Ascen Salmerón
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={scrollToContact}
              className="group relative px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
              aria-label={t('contact.cta')}
            >
              <span className="hidden md:inline">{t('contact.cta')}</span>
              <span className="md:hidden">{t('contact.ctaShort')}</span>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </button>
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};
