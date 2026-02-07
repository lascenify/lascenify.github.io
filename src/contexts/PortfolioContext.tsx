import React, { createContext, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import type { Timeline, Context, Language, PortfolioState } from '@/types/portfolio.types';

interface PortfolioContextValue extends PortfolioState {
  setTimeline: (timeline: Timeline) => void;
  setContext: (timeline: Timeline, context: Context) => void;
  setLanguage: (language: Language) => void;
}

export const PortfolioContext = createContext<PortfolioContextValue | undefined>(undefined);

interface PortfolioProviderProps {
  children: React.ReactNode;
}

export const PortfolioProvider: React.FC<PortfolioProviderProps> = ({ children }) => {
  const { i18n } = useTranslation();
  const [timeline, setTimelineState] = useState<Timeline>('present');
  const [contexts, setContexts] = useState<Record<Timeline, Context>>({
    past: 'work',
    present: 'work',
    future: 'work',
  });
  // Default language is Spanish
  const [language, setLanguageState] = useState<Language>('es');

  const setLanguage = useCallback((newLanguage: Language) => {
    setLanguageState(newLanguage);
    i18n.changeLanguage(newLanguage);
  }, [i18n]);

  const setTimeline = useCallback((newTimeline: Timeline) => {
    setTimelineState(newTimeline);
  }, []);

  const setContext = useCallback((timeline: Timeline, context: Context) => {
    setContexts(prev => ({
      ...prev,
      [timeline]: context,
    }));
  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        timeline,
        contexts,
        language,
        setTimeline,
        setContext,
        setLanguage,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};
