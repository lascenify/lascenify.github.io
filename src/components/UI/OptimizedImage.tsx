import React, { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean; // Para imágenes above-the-fold
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  priority = false,
  onError,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Convertir .png a .webp para la versión optimizada
  const webpSrc = src.replace(/\.png$/, '.webp');

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setHasError(true);
    if (onError) {
      onError(e);
    }
  };

  // Placeholder mientras carga
  const placeholderSvg = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="800"%3E%3Crect fill="%23f0f0f0" width="800" height="800"/%3E%3C/svg%3E`;

  return (
    <picture>
      {/* Intentar WebP primero (mucho más pequeño) */}
      {!hasError && (
        <source srcSet={webpSrc} type="image/webp" />
      )}

      {/* Fallback a PNG */}
      <img
        src={src}
        alt={alt}
        className={`${className} transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          backgroundImage: `url("${placeholderSvg}")`,
          backgroundSize: 'cover',
        }}
      />
    </picture>
  );
};
