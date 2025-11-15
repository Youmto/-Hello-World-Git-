// ============================================
// FICHIER 1: src/components/checkout/ProgressStepper.jsx
// Stepper visuel pour suivre la progression
// ============================================

import React from 'react';
import { Check } from 'lucide-react';

function ProgressStepper({ steps, currentStep }) {
  return (
    <div className="flex items-center justify-between max-w-3xl mx-auto">
      {steps.map((step, index) => {
        const isCompleted = currentStep > step.id;
        const isCurrent = currentStep === step.id;
        const isUpcoming = currentStep < step.id;

        return (
          <React.Fragment key={step.id}>
            {/* Step item */}
            <div className="flex flex-col items-center flex-1">
              {/* Circle */}
              <div
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all
                  ${isCompleted ? 'bg-green-500 text-white' : ''}
                  ${isCurrent ? 'bg-primary text-white ring-4 ring-orange-200' : ''}
                  ${isUpcoming ? 'bg-gray-200 text-gray-500' : ''}
                `}
              >
                {isCompleted ? (
                  <Check className="w-6 h-6" />
                ) : (
                  <step.icon className="w-6 h-6" />
                )}
              </div>

              {/* Label */}
              <span
                className={`
                  mt-2 text-xs sm:text-sm font-semibold text-center
                  ${isCurrent ? 'text-primary' : ''}
                  ${isCompleted ? 'text-green-600' : ''}
                  ${isUpcoming ? 'text-gray-500' : ''}
                `}
              >
                {step.title}
              </span>
            </div>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div
                className={`
                  flex-1 h-1 mx-2 rounded transition-all -mt-6
                  ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}
                `}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default ProgressStepper;