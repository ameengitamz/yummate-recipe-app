import React from 'react';

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'fullscreen' | 'inline';
  message?: string;
  subtitle?: string;
  showIcon?: boolean;
  showDots?: boolean;
  className?: string;
}

const sizeConfig = {
  sm: {
    container: 'w-12 h-12',
    icon: 'text-lg',
    title: 'text-sm',
    subtitle: 'text-xs',
    dots: 'w-1 h-1'
  },
  md: {
    container: 'w-16 h-16',
    icon: 'text-xl',
    title: 'text-base',
    subtitle: 'text-sm',
    dots: 'w-1.5 h-1.5'
  },
  lg: {
    container: 'w-20 h-20',
    icon: 'text-2xl',
    title: 'text-lg',
    subtitle: 'text-base',
    dots: 'w-2 h-2'
  },
  xl: {
    container: 'w-24 h-24',
    icon: 'text-3xl',
    title: 'text-2xl',
    subtitle: 'text-lg',
    dots: 'w-2 h-2'
  }
};

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'lg',
  variant = 'default',
  message = 'Loading...',
  subtitle,
  showIcon = true,
  showDots = true,
  className = ''
}) => {
  const config = sizeConfig[size];

  const SpinnerAnimation = () => (
    <div className={`${config.container} mx-auto relative`}>
      {/* Outer spinning ring */}
      <div className="absolute inset-0 rounded-full border-4 border-yum-primary/20"></div>
      <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-yum-primary border-r-yum-secondary animate-spin"></div>
      
      {/* Inner spinning ring */}
      <div className="absolute inset-2 rounded-full border-3 border-yum-secondary/20"></div>
      <div className="absolute inset-2 rounded-full border-3 border-transparent border-b-yum-secondary border-l-yum-primary animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
      
      {/* Center icon */}
      {showIcon && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`${config.icon} animate-pulse`}>🍽️</div>
        </div>
      )}
    </div>
  );

  const LoadingText = () => (
    <div className="space-y-2">
      <h3 className={`${config.title} font-bold text-yum-primary-ec`}>{message}</h3>
      {subtitle && (
        <p className={`${config.subtitle} text-yum-text-secondary`}>{subtitle}</p>
      )}
      
      {/* Animated dots */}
      {showDots && (
        <div className="flex justify-center space-x-1 mt-4">
          <div className={`${config.dots} bg-yum-primary rounded-full animate-bounce`} style={{ animationDelay: '0ms' }}></div>
          <div className={`${config.dots} bg-yum-secondary rounded-full animate-bounce`} style={{ animationDelay: '150ms' }}></div>
          <div className={`${config.dots} bg-yum-accent rounded-full animate-bounce`} style={{ animationDelay: '300ms' }}></div>
        </div>
      )}
    </div>
  );

  const SpinnerContent = () => (
    <div className="text-center">
      <div className="relative mb-6">
        <SpinnerAnimation />
      </div>
      <LoadingText />
    </div>
  );

  // Fullscreen overlay variant
  if (variant === 'fullscreen') {
    return (
      <div className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-yum-primary/10 via-white to-yum-secondary/10 backdrop-blur-sm ${className}`}>
        <SpinnerContent />
      </div>
    );
  }

  // Inline variant (just the spinner animation, no text)
  if (variant === 'inline') {
    return (
      <div className={`flex justify-center items-center ${className}`}>
        <SpinnerAnimation />
      </div>
    );
  }

  // Default variant (centered in container with full content)
  return (
    <div className={`w-full flex items-center justify-center py-20 ${className}`}>
      <SpinnerContent />
    </div>
  );
};
