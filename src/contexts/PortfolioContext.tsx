import React, { createContext, useState, useCallback } from 'react';
import type { Timeline, Context, Language, PortfolioState } from '@/types/portfolio.types';

interface PortfolioContextValue extends PortfolioState {
  setTimeline: (timeline: Timeline) => void;
  setContext: (context: Context) => void;
  setLanguage: (language: Language) => void;
}

export const PortfolioContext = createContext<PortfolioContextValue | undefined>(undefined);

interface PortfolioProviderProps {
  children: React.ReactNode;
}

export const PortfolioProvider: React.FC<PortfolioProviderProps> = ({ children }) => {
  const [timeline, setTimelineState] = useState<Timeline>('present');
  const [context, setContext] = useState<Context>('work');
  const [language, setLanguage] = useState<Language>('es');

  // Wrapper para setTimeline que resetea el contexto a 'work' si sales de 'present'
  const setTimeline = useCallback((newTimeline: Timeline) => {
    setTimelineState(newTimeline);

    // Si el timeline no es 'present', resetear el contexto a 'work'
    // porque past y future solo tienen la sección work
    if (newTimeline !== 'present') {
      setContext('work');
    }
  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        timeline,
        context,
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
