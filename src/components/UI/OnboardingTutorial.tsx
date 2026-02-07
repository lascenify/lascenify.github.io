import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const ONBOARDING_KEY = 'portfolio-onboarding-seen';

export const OnboardingTutorial: React.FC = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Check if user has seen the tutorial
    const hasSeenTutorial = localStorage.getItem(ONBOARDING_KEY);
    if (!hasSeenTutorial) {
      // Show tutorial after a brief delay
      setTimeout(() => {
        setShow(true);
      }, 1000);
    }
  }, []);

  const handleClose = () => {
    setShow(false);
    localStorage.setItem(ONBOARDING_KEY, 'true');
  };

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      handleClose();
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const steps = [
    {
      title: t('onboarding.step1.title'),
      description: t('onboarding.step1.description'),
      icon: t('onboarding.step1.icon'),
    },
    {
      title: t('onboarding.step2.title'),
      description: t('onboarding.step2.description'),
      icon: t('onboarding.step2.icon'),
    },
    {
      title: t('onboarding.step3.title'),
      description: t('onboarding.step3.description'),
      icon: t('onboarding.step3.icon'),
    },
    {
      title: t('onboarding.step4.title'),
      description: t('onboarding.step4.description'),
      icon: t('onboarding.step4.icon'),
    },
  ];

  const currentStep = steps[step];

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
            onClick={handleClose}
          />

          {/* Tutorial Modal */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="w-full max-w-md"
            >
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Header with icon */}
              <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 p-8 text-center">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-6xl mb-4"
                >
                  {currentStep.icon}
                </motion.div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {currentStep.title}
                </h2>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-text-primary-light dark:text-text-primary-dark text-center mb-6">
                  {currentStep.description}
                </p>

                {/* Step indicators */}
                <div className="flex justify-center gap-2 mb-6">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 rounded-full transition-all ${
                        index === step
                          ? 'w-8 bg-gradient-to-r from-blue-500 to-purple-600'
                          : 'w-2 bg-gray-300 dark:bg-gray-600'
                      }`}
                    />
                  ))}
                </div>

                {/* Navigation buttons */}
                <div className="flex gap-3">
                  {step > 0 && (
                    <button
                      onClick={handlePrevious}
                      className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-semibold"
                    >
                      {t('onboarding.buttons.previous')}
                    </button>
                  )}
                  <button
                    onClick={handleNext}
                    className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:shadow-lg transition-all hover:scale-105 active:scale-95"
                  >
                    {step < steps.length - 1 ? t('onboarding.buttons.next') : t('onboarding.buttons.start')}
                  </button>
                </div>

                {/* Skip button */}
                <button
                  onClick={handleClose}
                  className="w-full mt-4 text-sm text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark transition-colors"
                >
                  {t('onboarding.buttons.skip')}
                </button>
              </div>
            </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
