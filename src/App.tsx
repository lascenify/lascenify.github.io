import { useEffect, useState, useRef } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { PortfolioProvider } from '@/contexts/PortfolioContext';
import { MainLayout } from '@/components/Layout/MainLayout';
import { ScrollTimeline } from '@/components/Navigation/ScrollTimeline';
import { TimelineSection } from '@/components/Layout/TimelineSection';
import { TimelineIndicator } from '@/components/Navigation/TimelineIndicator';
import { ScrollHint } from '@/components/UI/ScrollHint';
import { ScrollProgress } from '@/components/UI/ScrollProgress';
import { OnboardingTutorial } from '@/components/UI/OnboardingTutorial';
import { TechnologyCarousel } from '@/components/Carousel/TechnologyCarousel';
import { ContactInfo } from '@/components/ContactForm/ContactInfo';
import { usePortfolio } from '@/hooks/usePortfolio';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import type { Timeline } from '@/types/portfolio.types';

function AppContent() {
  const { setTimeline } = usePortfolio();
  const [activeTimeline, setActiveTimeline] = useState<Timeline>('present');
  const [showIndicator, setShowIndicator] = useState(true);
  const sectionsRef = useRef<Map<Timeline, HTMLElement>>(new Map());
  const technologySectionRef = useRef<HTMLDivElement>(null);
  const contactSectionRef = useRef<HTMLDivElement>(null);

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

  // Observer to hide indicator when past future section
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px',
      threshold: 0,
    };

    // Track which final sections are visible
    const visibleSections = new Set<string>();

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const sectionId = entry.target.id;
        if (entry.isIntersecting) {
          visibleSections.add(sectionId);
        } else {
          visibleSections.delete(sectionId);
        }

        // Hide indicator if any final section is visible
        setShowIndicator(visibleSections.size === 0);
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (technologySectionRef.current) {
      observer.observe(technologySectionRef.current);
    }
    if (contactSectionRef.current) {
      observer.observe(contactSectionRef.current);
    }

    return () => {
      if (technologySectionRef.current) {
        observer.unobserve(technologySectionRef.current);
      }
      if (contactSectionRef.current) {
        observer.unobserve(contactSectionRef.current);
      }
    };
  }, []);

  const handleTimelineClick = (newTimeline: Timeline) => {
    setActiveTimeline(newTimeline);
    setTimeline(newTimeline);
  };

  // Enable keyboard navigation
  useKeyboardNavigation({
    activeTimeline,
    onTimelineChange: handleTimelineClick,
  });

  const registerSection = (timeline: Timeline, element: HTMLElement | null) => {
    if (element) {
      sectionsRef.current.set(timeline, element);
    }
  };

  return (
    <MainLayout>
      <ScrollProgress />
      <OnboardingTutorial />
      <ScrollHint />
      <ScrollTimeline
        activeTimeline={activeTimeline}
        onTimelineClick={handleTimelineClick}
      />
      <TimelineIndicator activeTimeline={activeTimeline} show={showIndicator} />

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
      <div ref={technologySectionRef} id="technology-section">
        <TechnologyCarousel />
      </div>
      <div ref={contactSectionRef} id="contact-section">
        <ContactInfo />
      </div>
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
