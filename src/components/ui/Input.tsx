import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'default' | 'search' | 'rounded';
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helper,
  leftIcon,
  rightIcon,
  variant = 'default',
  className = '',
  ...props
}) => {
  const baseClasses = 'w-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yum-primary/50 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    default: 'border-2 border-yum-primary/20 rounded-xl px-4 py-3 bg-white/90 text-yum-secondary focus:border-yum-primary focus:bg-white/95',
    search: 'border-2 border-yum-primary/20 rounded-2xl px-6 py-4 bg-white/90 text-yum-secondary focus:border-yum-primary focus:bg-white/95 text-lg',
    rounded: 'border border-yum-primary/20 rounded-full px-6 py-3 bg-white/90 text-yum-secondary focus:border-yum-primary focus:bg-white/95'
  };
  
  const errorClasses = error ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500' : '';
  
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-yum-secondary mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-yum-primary/60">
            {leftIcon}
          </div>
        )}
        
        <input
          className={`
            ${baseClasses} 
            ${variantClasses[variant]} 
            ${errorClasses}
            ${leftIcon ? 'pl-10' : ''} 
            ${rightIcon ? 'pr-10' : ''}
            ${className}
          `}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-yum-primary/60">
            {rightIcon}
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
      
      {helper && !error && (
        <p className="mt-2 text-sm text-yum-secondary/70">{helper}</p>
      )}
    </div>
  );
};
