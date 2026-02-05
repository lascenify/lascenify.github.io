import { ThemeProvider } from '@/contexts/ThemeContext';
import { PortfolioProvider } from '@/contexts/PortfolioContext';
import { MainLayout } from '@/components/Layout/MainLayout';
import { AvatarContainer } from '@/components/Avatar/AvatarContainer';
import { InfoPanel } from '@/components/Panels/InfoPanel';
import { TechnologyCarousel } from '@/components/Carousel/TechnologyCarousel';
import { ContactInfo } from '@/components/ContactForm/ContactInfo';

function App() {
  return (
    <ThemeProvider>
      <PortfolioProvider>
        <MainLayout>
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(400px,500px)_1fr] gap-8 lg:gap-12 mb-16">
            {/* Left Column: Avatar Container */}
            <div className="flex justify-center lg:justify-end">
              <AvatarContainer />
            </div>

            {/* Right Column: Info Panel */}
            <div className="flex items-start">
              <InfoPanel />
            </div>
          </div>

          {/* Full Width Sections Below */}
          <TechnologyCarousel />
          <ContactInfo />
        </MainLayout>
      </PortfolioProvider>
    </ThemeProvider>
  );
}

export default App;
