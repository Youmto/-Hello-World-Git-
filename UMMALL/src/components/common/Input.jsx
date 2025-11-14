// ============================================
// FICHIER 2: src/components/common/Input.jsx
// ============================================

import React, { forwardRef } from 'react';

const Input = forwardRef(({ 
  label,
  error,
  icon: Icon,
  type = 'text',
  placeholder,
  className = '',
  fullWidth = true,
  ...props 
}, ref) => {
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <div className={`${widthClass}`}>
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Icon className="w-5 h-5" />
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={`
            w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary
            ${Icon ? 'pl-10' : ''}
            ${error ? 'border-red-500' : 'border-gray-300'}
            ${className}
          `}
          {...props}
        />
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;