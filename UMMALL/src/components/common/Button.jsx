// ============================================
// BUTTON SYSTEM v2.0 - COMPLET
// Toutes les variantes pour un design cohérent
// Inspirations: Material Design 3, Apple HIG
// ============================================

import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Button Component Premium
 * 
 * @param {Object} props
 * @param {'primary'|'secondary'|'outline'|'ghost'|'danger'|'success'} props.variant
 * @param {'sm'|'md'|'lg'|'xl'} props.size
 * @param {boolean} props.loading
 * @param {boolean} props.disabled
 * @param {boolean} props.fullWidth
 * @param {React.ReactNode} props.leftIcon
 * @param {React.ReactNode} props.rightIcon
 * @param {string} props.className
 */

function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon = null,
  rightIcon = null,
  className = '',
  onClick,
  type = 'button',
  ...props
}) {
  
  // Base styles
  const baseStyles = `
    inline-flex items-center justify-center gap-2
    font-semibold rounded-xl
    transition-all duration-300 ease-out
    focus:outline-none focus:ring-4
    disabled:opacity-50 disabled:cursor-not-allowed
    ${fullWidth ? 'w-full' : ''}
  `;

  // Size variants
  const sizeStyles = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
    xl: 'px-10 py-5 text-lg'
  };

  // Variant styles
  const variantStyles = {
    primary: `
      bg-gradient-to-r from-primary-500 to-primary-600
      hover:from-primary-600 hover:to-primary-700
      text-white shadow-lg shadow-primary-500/30
      hover:shadow-xl hover:shadow-primary-500/40
      focus:ring-primary-500/50
      active:scale-[0.98]
      disabled:hover:from-primary-500 disabled:hover:to-primary-600
      disabled:shadow-none
    `,
    
    secondary: `
      bg-gradient-to-r from-secondary-500 to-secondary-600
      hover:from-secondary-600 hover:to-secondary-700
      text-neutral-900 shadow-lg shadow-secondary-500/30
      hover:shadow-xl hover:shadow-secondary-500/40
      focus:ring-secondary-500/50
      active:scale-[0.98]
      disabled:hover:from-secondary-500 disabled:hover:to-secondary-600
      disabled:shadow-none
    `,
    
    outline: `
      bg-transparent border-2 border-neutral-300
      hover:border-primary-500 hover:bg-primary-50
      text-neutral-700 hover:text-primary-600
      focus:ring-primary-500/30
      active:scale-[0.98]
      disabled:hover:border-neutral-300 disabled:hover:bg-transparent
    `,
    
    ghost: `
      bg-transparent hover:bg-neutral-100
      text-neutral-700 hover:text-neutral-900
      focus:ring-neutral-500/30
      active:scale-[0.98]
      disabled:hover:bg-transparent
    `,
    
    danger: `
      bg-gradient-to-r from-red-500 to-red-600
      hover:from-red-600 hover:to-red-700
      text-white shadow-lg shadow-red-500/30
      hover:shadow-xl hover:shadow-red-500/40
      focus:ring-red-500/50
      active:scale-[0.98]
      disabled:hover:from-red-500 disabled:hover:to-red-600
      disabled:shadow-none
    `,
    
    success: `
      bg-gradient-to-r from-green-500 to-green-600
      hover:from-green-600 hover:to-green-700
      text-white shadow-lg shadow-green-500/30
      hover:shadow-xl hover:shadow-green-500/40
      focus:ring-green-500/50
      active:scale-[0.98]
      disabled:hover:from-green-500 disabled:hover:to-green-600
      disabled:shadow-none
    `,
  };

  // Icon size based on button size
  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
    xl: 'w-6 h-6'
  };

  const combinedClassName = `
    ${baseStyles}
    ${sizeStyles[size]}
    ${variantStyles[variant]}
    ${className}
  `.trim();

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={combinedClassName}
      {...props}
    >
      {/* Left Icon */}
      {leftIcon && !loading && (
        <span className={iconSizes[size]}>
          {leftIcon}
        </span>
      )}

      {/* Loading Spinner */}
      {loading && (
        <Loader2 className={`${iconSizes[size]} animate-spin`} />
      )}

      {/* Children */}
      <span>{children}</span>

      {/* Right Icon */}
      {rightIcon && !loading && (
        <span className={iconSizes[size]}>
          {rightIcon}
        </span>
      )}
    </button>
  );
}

// ============================================
// BUTTON VARIANTS - Export individuels
// ============================================

export function PrimaryButton(props) {
  return <Button variant="primary" {...props} />;
}

export function SecondaryButton(props) {
  return <Button variant="secondary" {...props} />;
}

export function OutlineButton(props) {
  return <Button variant="outline" {...props} />;
}

export function GhostButton(props) {
  return <Button variant="ghost" {...props} />;
}

export function DangerButton(props) {
  return <Button variant="danger" {...props} />;
}

export function SuccessButton(props) {
  return <Button variant="success" {...props} />;
}

// ============================================
// ICON BUTTON - Bouton avec icône uniquement
// ============================================

export function IconButton({
  icon,
  size = 'md',
  variant = 'ghost',
  rounded = 'xl',
  className = '',
  ...props
}) {
  const sizeStyles = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-14 h-14'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7'
  };

  const roundedStyles = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full'
  };

  return (
    <Button
      variant={variant}
      className={`
        ${sizeStyles[size]}
        ${roundedStyles[rounded]}
        p-0
        ${className}
      `}
      {...props}
    >
      <span className={iconSizes[size]}>
        {icon}
      </span>
    </Button>
  );
}

// ============================================
// BUTTON GROUP - Groupe de boutons
// ============================================

export function ButtonGroup({ children, className = '' }) {
  return (
    <div className={`inline-flex rounded-xl overflow-hidden shadow-sm ${className}`}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;
        
        return React.cloneElement(child, {
          className: `
            ${child.props.className || ''}
            rounded-none
            ${index !== 0 ? 'border-l-0' : ''}
          `.trim()
        });
      })}
    </div>
  );
}

// ============================================
// FLOATING ACTION BUTTON (FAB)
// ============================================

export function FAB({
  icon,
  label,
  position = 'bottom-right',
  size = 'lg',
  className = '',
  ...props
}) {
  const positions = {
    'bottom-right': 'fixed bottom-8 right-8',
    'bottom-left': 'fixed bottom-8 left-8',
    'top-right': 'fixed top-24 right-8',
    'top-left': 'fixed top-24 left-8'
  };

  const sizeStyles = {
    md: 'w-14 h-14',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  return (
    <button
      className={`
        ${positions[position]}
        ${sizeStyles[size]}
        z-50 rounded-full
        bg-gradient-to-br from-primary-500 to-pink-500
        hover:from-primary-600 hover:to-pink-600
        text-white shadow-2xl shadow-primary-500/50
        hover:shadow-3xl hover:scale-110
        transition-all duration-300
        flex items-center justify-center
        group
        ${className}
      `}
      {...props}
    >
      <span className="w-7 h-7 group-hover:scale-110 transition-transform">
        {icon}
      </span>
      
      {/* Tooltip Label */}
      {label && (
        <span className="absolute right-full mr-4 px-4 py-2 bg-neutral-900 text-white text-sm font-semibold rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-xl">
          {label}
        </span>
      )}
    </button>
  );
}

// ============================================
// SOCIAL BUTTON - Boutons réseaux sociaux
// ============================================

export function SocialButton({
  provider, // 'google' | 'facebook' | 'apple' | 'twitter'
  children,
  className = '',
  ...props
}) {
  const providerStyles = {
    google: 'bg-white hover:bg-neutral-50 text-neutral-700 border-2 border-neutral-300',
    facebook: 'bg-[#1877F2] hover:bg-[#166FE5] text-white',
    apple: 'bg-black hover:bg-neutral-900 text-white',
    twitter: 'bg-[#1DA1F2] hover:bg-[#1A8CD8] text-white'
  };

  return (
    <Button
      variant="ghost"
      className={`
        ${providerStyles[provider]}
        shadow-md hover:shadow-lg
        ${className}
      `}
      {...props}
    >
      {children}
    </Button>
  );
}

export default Button;