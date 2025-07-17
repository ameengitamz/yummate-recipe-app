/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./wireframes.html",
  ],
  theme: {
    extend: {
      colors: {
        // YumMate Brand Colors (Updated to match wireframes)
        'yum-primary': '#55cfc7',        // Primary teal
        'yum-primary-light': '#caffde',   // Light mint
        'yum-secondary': '#02a08a',       // Dark teal
        'yum-accent': '#7388c6',          // Steel blue
        'yum-accent-light': '#a8b8e6',    // Light steel blue
        'yum-purple': '#dda0dd',          // Light purple
        'yum-green': '#90ee90',           // Light green
        'yum-green-light': '#98fb98',     // Very light green
        
        // Background gradients (Enhanced)
        'yum-bg-start': '#f4f4f4',        // Light gray
        'yum-bg-end': '#caffde',          // Light mint
        'yum-bg-secondary': '#f9fce3',    // Light yellow-green (from wireframes)
        
        // Card backgrounds (Improved)
        'yum-card': '#fdfefe',            // Pure white
        'yum-card-hover': '#f8fcfb',      // Subtle tint
        
        // States and variants (Fixed opacity values)
        'yum-primary-ec': '#46afadec',    // Primary with opacity (from wireframes)
        'yum-secondary-ec': '#02ecd4ec',  // Secondary variant (from wireframes)
        
        // Additional utility colors for better combinations
        'yum-text-primary': '#2c5f5d',    // Darker teal for better contrast
        'yum-text-secondary': '#4a7c59',  // Dark green for secondary text
        'yum-border-light': '#e0f2f1',    // Very light teal for borders
        'yum-shadow-primary': 'rgba(85, 207, 199, 0.1)', // Primary shadow color
        'yum-shadow-accent': 'rgba(115, 136, 198, 0.3)',  // Accent shadow color
      },
      fontFamily: {
        'inter': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      backgroundImage: {
        'yum-gradient': 'linear-gradient(135deg, #f4f4f4 0%, #f9fce3 100%)',
        'yum-gradient-primary': 'linear-gradient(135deg, #55cfc7 0%, #7388c6 100%)',
        'yum-gradient-accent': 'linear-gradient(135deg, #7388c6 0%, #a8b8e6 100%)',
        'yum-gradient-accent-hover': 'linear-gradient(135deg, #5f7bc0 0%, #9bb0e0 100%)',
        'yum-gradient-purple': 'linear-gradient(135deg, #dda0dd 0%, #f0e6ff 100%)',
        'yum-gradient-green': 'linear-gradient(135deg, #90ee90 0%, #98fb98 100%)',
        'yum-card-gradient': 'linear-gradient(135deg, #ffffff 0%, #f8fcfb 100%)',
      },
      boxShadow: {
        'yum-primary': '0 8px 32px rgba(85, 207, 199, 0.1), 0 4px 16px rgba(85, 207, 199, 0.05)',
        'yum-accent': '0 4px 12px rgba(115, 136, 198, 0.3)',
        'yum-accent-hover': '0 8px 20px rgba(115, 136, 198, 0.4)',
        'yum-card': '0 4px 20px rgba(0, 0, 0, 0.05), 0 1px 4px rgba(0, 0, 0, 0.1)',
        'yum-card-hover': '0 8px 30px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-soft': 'pulse 3s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
