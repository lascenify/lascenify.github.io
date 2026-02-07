import { useEffect, useState, useRef } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { PortfolioProvider } from '@/contexts/PortfolioContext';
import { MainLayout } from '@/components/Layout/MainLayout';
import { ScrollTimeline } from '@/components/Navigation/ScrollTimeline';
import { TimelineSection } from '@/components/Layout/TimelineSection';
import { TechnologyCarousel } from '@/components/Carousel/TechnologyCarousel';
import { ContactInfo } from '@/components/ContactForm/ContactInfo';
import { usePortfolio } from '@/hooks/usePortfolio';
import type { Timeline } from '@/types/portfolio.types';

function AppContent() {
  const { setTimeline } = usePortfolio();
  const [activeTimeline, setActiveTimeline] = useState<Timeline>('present');
  const sectionsRef = useRef<Map<Timeline, HTMLElement>>(new Map());

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionTimeline = entry.target.getAttribute('data-timeline') as Timeline;
          if (sectionTimeline) {
            setActiveTimeline(sectionTimeline);
            setTimeline(sectionTimeline);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    sectionsRef.current.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, [setTimeline]);

  const handleTimelineClick = (newTimeline: Timeline) => {
    setActiveTimeline(newTimeline);
    setTimeline(newTimeline);
  };

  const registerSection = (timeline: Timeline, element: HTMLElement | null) => {
    if (element) {
      sectionsRef.current.set(timeline, element);
    }
  };

  return (
    <MainLayout>
      <ScrollTimeline
        activeTimeline={activeTimeline}
        onTimelineClick={handleTimelineClick}
      />

      {/* Timeline Sections */}
      <div className="space-y-0">
        <TimelineSection
          timeline="past"
          registerSection={registerSection}
        />
        <TimelineSection
          timeline="present"
          registerSection={registerSection}
        />
        <TimelineSection
          timeline="future"
          registerSection={registerSection}
        />
      </div>

      {/* Full Width Sections Below */}
      <TechnologyCarousel />
      <ContactInfo />
    </MainLayout>
  );
}

function App() {
  return (
    <ThemeProvider>
      <PortfolioProvider>
        <AppContent />
      </PortfolioProvider>
    </ThemeProvider>
  );
}

export default App;
