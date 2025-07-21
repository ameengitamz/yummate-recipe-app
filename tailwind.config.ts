import type { Config } from 'tailwindcss'

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
        'yum-primary': '#55cfc7',
        'yum-primary-light': '#f9fce3',
        'yum-secondary': '#02a08a',
        'yum-accent': '#7388c6',
        'yum-accent-light': '#a8b8e6',
        'yum-purple': '#dda0dd',
        'yum-green': '#90ee90',
        'yum-green-light': '#98fb98',
        // Background colors
        'yum-bg-start': '#f4f4f4',
        'yum-bg-end': '#f9fce3',
        'yum-card': '#fdfefe',
        'yum-card-hover': '#f8fcfb',
        // States and variants with opacity
        'yum-primary-ec': '#46afadec',
        'yum-secondary-ec': '#02ecd4ec',
        // Neutral
        'yum-neutral-light': '#e5e7eb',
        'yum-neutral': '#6b7280',
      },
      height: {
        '17': '4.25rem', // 68px - navigation header height
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
} satisfies Config

