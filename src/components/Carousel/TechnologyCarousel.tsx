import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { technologies } from '@/data/technologies.data';

export const TechnologyCarousel: React.FC = () => {
  const { t } = useTranslation();

  // Duplicate technologies for seamless loop
  const duplicatedTechnologies = [...technologies, ...technologies];

  return (
    <div className="w-full overflow-hidden bg-surface-light dark:bg-surface-dark py-10 my-12 rounded-xl shadow-lg">
      <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
        {t('technologies.title') || 'Tecnologías'}
      </h3>

      <div className="relative px-4">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-surface-light dark:from-surface-dark to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-surface-light dark:from-surface-dark to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-6 md:gap-8"
          animate={{
            x: ['0%', '-50%'],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 30,
              ease: 'linear',
            },
          }}
        >
          {duplicatedTechnologies.map((tech, index) => (
            <motion.div
              key={`${tech.name}-${index}`}
              className="flex flex-col items-center justify-center min-w-[100px] md:min-w-[120px] group cursor-pointer"
              whileHover={{ scale: 1.1, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              {/* Icon container */}
              <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-white dark:bg-gray-800 rounded-xl shadow-lg group-hover:shadow-2xl transition-all duration-300 p-3 md:p-4 border-2 border-transparent group-hover:border-primary-light dark:group-hover:border-primary-dark">
                {/* Subtle color background */}
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
                  onError={(e) => {
                    // Fallback to text if image doesn't load
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
      </div>
    </div>
  );
};
