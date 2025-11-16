// ============================================
// FICHIER: src/components/checkout/ProgressStepper.jsx
// Design Premium - Stepper processus checkout
// ============================================

import React from 'react';
import { Check } from 'lucide-react';

function ProgressStepper({ currentStep, steps }) {
  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      
      {/* Desktop - Horizontal */}
      <div className="hidden md:block">
        <div className="relative">
          
          {/* Progress Line */}
          <div className="absolute top-10 left-0 right-0 h-1 bg-neutral-200 -z-10">
            <div
              className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-500 ease-out"
              style={{
                width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
              }}
            />
          </div>

          {/* Steps */}
          <div className="flex justify-between">
            {steps.map((step, index) => {
              const stepNumber = index + 1;
              const isCompleted = stepNumber < currentStep;
              const isCurrent = stepNumber === currentStep;
              const isFuture = stepNumber > currentStep;

              const Icon = step.icon;

              return (
                <div
                  key={step.id}
                  className="flex flex-col items-center"
                  style={{ width: `${100 / steps.length}%` }}
                >
                  
                  {/* Circle */}
                  <div
                    className={`
                      relative w-20 h-20 rounded-full flex items-center justify-center
                      transition-all duration-500 ease-out
                      ${isCompleted
                        ? 'bg-gradient-to-br from-success-500 to-success-600 shadow-lg shadow-success-500/30 scale-100'
                        : isCurrent
                        ? 'bg-gradient-to-br from-primary-500 to-secondary-500 shadow-xl shadow-primary-500/40 scale-110'
                        : 'bg-neutral-200 scale-90'
                      }
                    `}
                  >
                    {/* Pulse animation sur current */}
                    {isCurrent && (
                      <div className="absolute inset-0 rounded-full bg-primary-400 animate-ping opacity-30" />
                    )}

                    {/* Icon ou Check */}
                    {isCompleted ? (
                      <Check className="w-10 h-10 text-white relative z-10" strokeWidth={3} />
                    ) : (
                      <Icon
                        className={`
                          w-10 h-10 relative z-10
                          ${isCurrent ? 'text-white' : 'text-neutral-500'}
                        `}
                        strokeWidth={isCurrent ? 2.5 : 2}
                      />
                    )}
                  </div>

                  {/* Label */}
                  <div className="mt-4 text-center">
                    <div
                      className={`
                        text-sm font-bold transition-colors duration-300
                        ${isCompleted || isCurrent
                          ? 'text-neutral-900'
                          : 'text-neutral-500'
                        }
                      `}
                    >
                      {step.label}
                    </div>
                    
                    {step.description && (
                      <div className="text-xs text-neutral-600 mt-1">
                        {step.description}
                      </div>
                    )}
                  </div>

                  {/* Step number badge */}
                  <div
                    className={`
                      absolute -top-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                      transition-all duration-300
                      ${isCompleted
                        ? 'bg-success-600 text-white'
                        : isCurrent
                        ? 'bg-primary-600 text-white scale-110'
                        : 'bg-neutral-300 text-neutral-600'
                      }
                    `}
                  >
                    {stepNumber}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile - Vertical Compact */}
      <div className="block md:hidden">
        <div className="bg-white rounded-xl border border-neutral-200 p-4">
          <div className="flex items-center gap-4">
            
            {/* Progress circle */}
            <div className="relative w-16 h-16 shrink-0">
              {/* Background circle */}
              <svg className="w-16 h-16 transform -rotate-90">
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  className="text-neutral-200"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray="176"
                  strokeDashoffset={176 - (176 * ((currentStep - 1) / (steps.length - 1)))}
                  className="text-primary-500 transition-all duration-500"
                  strokeLinecap="round"
                />
              </svg>

              {/* Current step number */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-neutral-900">
                  {currentStep}/{steps.length}
                </span>
              </div>
            </div>

            {/* Current step info */}
            <div className="flex-1">
              <div className="text-xs text-neutral-600 mb-1">
                Étape {currentStep} sur {steps.length}
              </div>
              <div className="text-lg font-bold text-neutral-900">
                {steps[currentStep - 1]?.label}
              </div>
              {steps[currentStep - 1]?.description && (
                <div className="text-sm text-neutral-600 mt-0.5">
                  {steps[currentStep - 1].description}
                </div>
              )}
            </div>

            {/* Icon */}
            <div className="shrink-0">
              {React.createElement(steps[currentStep - 1]?.icon, {
                className: 'w-8 h-8 text-primary-500',
              })}
            </div>
          </div>

          {/* Mini steps list */}
          <div className="flex gap-2 mt-4">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`
                  flex-1 h-1.5 rounded-full transition-all duration-300
                  ${index + 1 <= currentStep
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500'
                    : 'bg-neutral-200'
                  }
                `}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressStepper;