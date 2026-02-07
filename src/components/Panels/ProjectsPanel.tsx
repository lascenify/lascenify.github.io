import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/UI/Card';
import { ImageGallery } from '@/components/Gallery/ImageGallery';
import { getPortfolioData } from '@/data/portfolio.i18n';
import type { Timeline } from '@/types/portfolio.types';

interface ProjectsPanelProps {
  timeline: Timeline;
}

export const ProjectsPanel: React.FC<ProjectsPanelProps> = ({ timeline }) => {
  const { t, i18n } = useTranslation();
  const portfolioData = getPortfolioData(i18n.language as 'es' | 'en');
  const projects = portfolioData[timeline].projects;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [galleryState, setGalleryState] = useState<{
    isOpen: boolean;
    images: string[];
    projectName: string;
  }>({
    isOpen: false,
    images: [],
    projectName: '',
  });

  const openGallery = (images: string[], projectName: string) => {
    setGalleryState({ isOpen: true, images, projectName });
  };

  const closeGallery = () => {
    setGalleryState({ isOpen: false, images: [], projectName: '' });
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects!.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + projects!.length) % projects!.length);
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  // Si no hay datos de projects para este timeline, no renderizar nada
  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-center mb-8">
          {t('projects.title')}
        </h2>

        {/* Desktop: Grid layout */}
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <Card key={project.id} index={index}>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-primary-light dark:text-primary-dark">
                {project.name}
              </h3>

              <p className="text-text-primary-light dark:text-text-primary-dark">
                {project.description}
              </p>

              <div>
                <h4 className="font-semibold mb-2 text-sm">{t('projects.technologies')}</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-primary-light/10 dark:bg-primary-dark/10 text-primary-light dark:text-primary-dark rounded-full text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2 flex-wrap">
                {project.gallery && project.gallery.length > 0 && (
                  <button
                    onClick={() => openGallery(project.gallery!, project.name)}
                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {t('projects.viewGallery')}
                  </button>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-primary-light dark:bg-primary-dark text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
                  >
                    {t('projects.viewProject')}
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border-2 border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark rounded-lg text-sm font-semibold hover:bg-primary-light/10 dark:hover:bg-primary-dark/10 transition-colors"
                  >
                    {t('projects.viewCode')}
                  </a>
                )}
              </div>
            </div>
          </Card>
        ))}
        </div>

        {/* Mobile: Horizontal carousel */}
        <div className="lg:hidden relative">
          {/* Navigation arrows */}
          {projects!.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-2 rounded-full bg-surface-light dark:bg-surface-dark border-2 border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark shadow-lg hover:scale-110 transition-transform"
                aria-label="Previous"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-2 rounded-full bg-surface-light dark:bg-surface-dark border-2 border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark shadow-lg hover:scale-110 transition-transform"
                aria-label="Next"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Carousel content */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
              >
                <Card index={currentIndex}>
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-primary-light dark:text-primary-dark">
                      {projects![currentIndex].name}
                    </h3>

                    <p className="text-text-primary-light dark:text-text-primary-dark">
                      {projects![currentIndex].description}
                    </p>

                    <div>
                      <h4 className="font-semibold mb-2 text-sm">{t('projects.technologies')}</h4>
                      <div className="flex flex-wrap gap-2">
                        {projects![currentIndex].technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-primary-light/10 dark:bg-primary-dark/10 text-primary-light dark:text-primary-dark rounded-full text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2 flex-wrap">
                      {projects![currentIndex].gallery && projects![currentIndex].gallery!.length > 0 && (
                        <button
                          onClick={() => openGallery(projects![currentIndex].gallery!, projects![currentIndex].name)}
                          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {t('projects.viewGallery')}
                        </button>
                      )}
                      {projects![currentIndex].link && (
                        <a
                          href={projects![currentIndex].link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-primary-light dark:bg-primary-dark text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
                        >
                          {t('projects.viewProject')}
                        </a>
                      )}
                      {projects![currentIndex].github && (
                        <a
                          href={projects![currentIndex].github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 border-2 border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark rounded-lg text-sm font-semibold hover:bg-primary-light/10 dark:hover:bg-primary-dark/10 transition-colors"
                        >
                          {t('projects.viewCode')}
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots indicator */}
          {projects!.length > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {projects!.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-primary-light dark:bg-primary-dark w-8'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <ImageGallery
        images={galleryState.images}
        projectName={galleryState.projectName}
        isOpen={galleryState.isOpen}
        onClose={closeGallery}
      />
    </>
  );
};
