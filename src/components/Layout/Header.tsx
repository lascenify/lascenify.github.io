import React from 'react';
import { ThemeToggle } from '@/components/Navigation/ThemeToggle';
import { LanguageToggle } from '@/components/Navigation/LanguageToggle';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Ascen Salmerón
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};
