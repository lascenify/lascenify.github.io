import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
