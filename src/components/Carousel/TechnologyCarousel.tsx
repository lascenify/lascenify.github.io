import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { technologies } from '@/data/technologies.data';

export const TechnologyCarousel: React.FC = () => {
  const { t } = useTranslation();
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filtrar tecnologías según la búsqueda
  const filteredTechnologies = technologies.filter(tech =>
    tech.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Duplicate technologies for seamless loop solo si hay resultados
  const duplicatedTechnologies = searchTerm ? filteredTechnologies : [...technologies, ...technologies, ...technologies];
  
  const itemWidth = 100;
  const gap = 24;
  const totalWidth = duplicatedTechnologies.length * (itemWidth + gap);
  const singleLoopWidth = technologies.length * (itemWidth + gap);

  // Auto-scroll animation
  useEffect(() => {
    if (!isPaused && !isDragging && !searchTerm) {
      controls.start({
        x: -singleLoopWidth,
        transition: {
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 30,
            ease: 'linear',
          },
        },
      });
    } else {
      controls.stop();
    }
  }, [isPaused, isDragging, searchTerm, controls, singleLoopWidth]);

  const handleDragStart = () => {
    setIsDragging(true);
    controls.stop();
  };

  const handleDragEnd = async () => {
    setIsDragging(false);
    
    await controls.start({
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    });
    
    if (!isPaused && !searchTerm) {
      controls.start({
        x: -singleLoopWidth,
        transition: {
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 30,
            ease: 'linear',
          },
        },
      });
    }
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
    if (isPaused) {
      controls.start({
        x: -singleLoopWidth,
        transition: {
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 30,
            ease: 'linear',
          },
        },
      });
    } else {
      controls.stop();
    }
  };

  return (
    <div 
      className="w-full overflow-hidden bg-surface-light dark:bg-surface-dark py-10 my-12 rounded-xl shadow-lg relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => !isDragging && setIsPaused(false)}
    >
      {/* Header with search and pause button */}
      <div className="flex flex-col items-center justify-center gap-4 mb-8 px-4">
        <div className="flex items-center justify-center gap-4">
          <h3 className="text-2xl md:text-3xl font-bold text-center">
            {t('technologies.title') || 'Tecnologías'}
          </h3>
          <motion.button
            onClick={togglePause}
            className="p-2 rounded-full bg-primary-light/10 dark:bg-primary-dark/10 hover:bg-primary-light/20 dark:hover:bg-primary-dark/20 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={isPaused ? 'Play' : 'Pause'}
          >
            {isPaused ? (
              <svg className="w-5 h-5 text-primary-light dark:text-primary-dark" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-primary-light dark:text-primary-dark" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            )}
          </motion.button>
        </div>
        
        {/* Search input */}
        <div className="relative w-full max-w-md">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('technologies.searchPlaceholder') || 'Buscar tecnología...'}
            className="w-full px-4 py-2 pl-10 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-text-primary-light dark:text-text-primary-dark focus:outline-none focus:border-primary-light dark:focus:border-primary-dark transition-colors"
          />
          <svg 
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="relative px-4" ref={containerRef}>
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-surface-light dark:from-surface-dark to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-surface-light dark:from-surface-dark to-transparent z-10 pointer-events-none" />

        {filteredTechnologies.length === 0 ? (
          // Mensaje cuando no se encuentra ninguna tecnología
          <div
            className="flex flex-col items-center justify-center py-12 px-4 text-center"
          >
            <span className="text-4xl mb-4">😉</span>
            <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark">
              {t('technologies.notFound') || 'Ups! no he trabajado con esta tecnología, pero aprendo rápido 😉'}
            </p>
          </div>
        ) : (
          <motion.div
            className={`flex gap-6 md:gap-8 ${!searchTerm ? 'cursor-grab active:cursor-grabbing' : 'flex-wrap justify-center'}`}
            animate={controls}
            drag={!searchTerm ? "x" : false}
            dragConstraints={{
              left: -totalWidth + (containerRef.current?.offsetWidth || 800),
              right: 0,
            }}
            dragElastic={0.1}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            {duplicatedTechnologies.map((tech, index) => (
              <motion.div
                key={`${tech.name}-${index}`}
                className="flex flex-col items-center justify-center min-w-[100px] md:min-w-[120px] group cursor-pointer"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.1, y: -5 }}
              >
                {/* Icon container */}
                <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-white dark:bg-gray-800 rounded-xl shadow-lg group-hover:shadow-2xl transition-all duration-300 p-3 md:p-4 border-2 border-transparent group-hover:border-primary-light dark:group-hover:border-primary-dark">
                  {tech.color && (
                    <div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                      style={{ backgroundColor: tech.color }}
                    />
                  )}

                  <img
                    src={tech.icon}
                    alt={tech.name}
                    className="relative w-full h-full object-contain filter drop-shadow-sm"
                    loading="lazy"
                    draggable={false}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        const fallback = document.createElement('span');
                        fallback.className = 'text-2xl font-bold text-primary-light dark:text-primary-dark';
                        fallback.textContent = tech.name.charAt(0);
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                </div>

                {/* Tech name */}
                <p className="mt-3 text-xs md:text-sm font-semibold text-center text-text-secondary-light dark:text-text-secondary-dark group-hover:text-text-primary-light dark:group-hover:text-text-primary-dark transition-colors">
                  {tech.name}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Drag hint */}
      {!searchTerm && filteredTechnologies.length > 0 && (
        <p className="text-center text-xs text-text-secondary-light dark:text-text-secondary-dark mt-4 opacity-60">
          {isPaused ? 'Arrastra para explorar' : 'Pasa el cursor o arrastra para explorar'}
        </p>
      )}
    </div>
  );
};
