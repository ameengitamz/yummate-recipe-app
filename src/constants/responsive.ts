/**
 * Simple Responsive Design System
 * Clean, professional approach for responsive design
 */

/**
 * Common responsive patterns as simple string constants
 * Use these directly in className props for clean, readable code
 */
export const responsive = {
  // Text sizes - Mobile-first approach
  text: {
    hero: "text-3xl sm:text-4xl lg:text-6xl",
    heading: "text-2xl sm:text-3xl lg:text-4xl", 
    subheading: "text-lg sm:text-xl lg:text-2xl",
    body: "text-sm sm:text-base lg:text-lg",
    small: "text-xs sm:text-sm",
  },
  
  // Spacing - Consistent and scalable
  padding: {
    page: "px-3 sm:px-6 lg:px-8",
    section: "py-6 sm:py-10 lg:py-16",
    card: "p-3 sm:p-4 lg:p-6",
    mobile: "px-3 py-4",
    desktop: "px-6 py-8",
  },
  
  margin: {
    section: "mb-6 sm:mb-10 lg:mb-16",
    element: "mb-3 sm:mb-4 lg:mb-6",
    small: "mb-2 sm:mb-3 lg:mb-4",
  },
  
  // Layout containers - Optimized max-widths
  container: {
    narrow: "max-w-2xl mx-auto px-3 sm:px-4",
    normal: "max-w-4xl mx-auto px-3 sm:px-4", 
    wide: "max-w-6xl mx-auto px-3 sm:px-4",
    full: "max-w-7xl mx-auto px-3 sm:px-4",
  },
  
  // Grid systems - Responsive breakpoints
  grid: {
    cards: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6",
    features: "grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6",
    auto: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
  },
  
  // Component sizes - Consistent button and input sizing
  button: {
    padding: "px-4 sm:px-6 lg:px-8 py-2 sm:py-3",
    text: "text-sm sm:text-base",
  },
  
  // Heights - Optimal viewport usage
  hero: "min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]",
  card: "h-64 sm:h-72 lg:h-80",
  
  // Additional utilities
  flex: {
    center: "flex items-center justify-center",
    between: "flex items-center justify-between",
    col: "flex flex-col",
  },
} as const;
