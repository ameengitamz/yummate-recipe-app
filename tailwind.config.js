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
        // YumMate Brand Colors
        'yum-primary': '#55cfc7',        // Primary teal
        'yum-primary-light': '#caffde',   // Light mint
        'yum-secondary': '#02a08a',       // Dark teal
        'yum-accent': '#7388c6',          // Steel blue
        'yum-accent-light': '#a8b8e6',    // Light steel blue
        'yum-purple': '#dda0dd',          // Light purple
        'yum-green': '#90ee90',           // Light green
        'yum-green-light': '#98fb98',     // Very light green
        
        // Background gradients
        'yum-bg-start': '#f4f4f4',        // Light gray
        'yum-bg-end': '#caffde',          // Light mint
        
        // Card backgrounds
        'yum-card': '#fdfefe',            // Pure white
        'yum-card-hover': '#f8fcfb',      // Subtle tint
        
        // States and variants
        'yum-primary-ec': '#55cfc7ec',    // Primary with opacity
        'yum-secondary-ec': '#02ecd4ec',  // Secondary variant
      },
      gradientColorStops: {
        'yum-bg': ['#f4f4f4', '#caffde'],
        'yum-primary-gradient': ['#55cfc7', '#7388c6', '#dda0dd'],
        'yum-accent-gradient': ['#7388c6', '#a8b8e6'],
        'yum-green-gradient': ['#90ee90', '#98fb98'],
      }
    },
  },
  plugins: [],
}
