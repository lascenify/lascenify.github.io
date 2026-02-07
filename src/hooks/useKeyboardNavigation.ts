import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { Timeline } from '@/types/portfolio.types';

interface UseKeyboardNavigationProps {
  activeTimeline: Timeline;
  onTimelineChange: (timeline: Timeline) => void;
}

const TIMELINES: Timeline[] = ['past', 'present', 'future'];

export const useKeyboardNavigation = ({
  activeTimeline,
  onTimelineChange,
}: UseKeyboardNavigationProps) => {
  const { t } = useTranslation();
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input/textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      const currentIndex = TIMELINES.indexOf(activeTimeline);

      switch (e.key) {
        case 'ArrowUp':
        case 'ArrowLeft':
          e.preventDefault();
          // Navigate to previous timeline
          if (currentIndex > 0) {
            const prevTimeline = TIMELINES[currentIndex - 1];
            scrollToTimeline(prevTimeline);
            onTimelineChange(prevTimeline);
          }
          break;

        case 'ArrowDown':
        case 'ArrowRight':
          e.preventDefault();
          // Navigate to next timeline
          if (currentIndex < TIMELINES.length - 1) {
            const nextTimeline = TIMELINES[currentIndex + 1];
            scrollToTimeline(nextTimeline);
            onTimelineChange(nextTimeline);
          }
          break;

        case 'Home':
          e.preventDefault();
          // Go to first timeline
          scrollToTimeline('past');
          onTimelineChange('past');
          break;

        case 'End':
          e.preventDefault();
          // Go to last timeline
          scrollToTimeline('future');
          onTimelineChange('future');
          break;

        case '1':
          e.preventDefault();
          scrollToTimeline('past');
          onTimelineChange('past');
          break;

        case '2':
          e.preventDefault();
          scrollToTimeline('present');
          onTimelineChange('present');
          break;

        case '3':
          e.preventDefault();
          scrollToTimeline('future');
          onTimelineChange('future');
          break;

        case '?':
          // Show keyboard shortcuts help
          showKeyboardHelp(t);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeTimeline, onTimelineChange, t]);
};

const scrollToTimeline = (timeline: Timeline) => {
  const targetElement = document.getElementById(`timeline-${timeline}`);

  if (targetElement) {
    const offset = 110;
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
};

const showKeyboardHelp = (t: any) => {
  // Create a simple toast notification
  const toast = document.createElement('div');
  toast.className = 'fixed bottom-4 right-4 bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-2xl z-[100] max-w-sm';
  toast.innerHTML = `
    <h3 class="font-bold text-lg mb-2 text-text-primary-light dark:text-text-primary-dark">${t('keyboard.help.title')}</h3>
    <ul class="text-sm space-y-1 text-text-secondary-light dark:text-text-secondary-dark">
      <li><kbd class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">↑/←</kbd> ${t('keyboard.help.previousTimeline')}</li>
      <li><kbd class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">↓/→</kbd> ${t('keyboard.help.nextTimeline')}</li>
      <li><kbd class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">1/2/3</kbd> ${t('keyboard.help.goToTimeline')}</li>
      <li><kbd class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">Home</kbd> ${t('keyboard.help.goToStart')}</li>
      <li><kbd class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">End</kbd> ${t('keyboard.help.goToEnd')}</li>
      <li><kbd class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">?</kbd> ${t('keyboard.help.showHelp')}</li>
    </ul>
  `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.3s';
    toast.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 5000);
};
