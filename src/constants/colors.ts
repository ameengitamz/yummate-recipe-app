/**
 * YumMate Brand Color Palette
 * 
 * This file contains all the brand colors used throughout the YumMate application.
 * These colors are defined in tailwind.config.ts for Tailwind CSS v3 compatibility.
 */

export const YUMMATE_COLORS = {
  // Primary colors
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
  // States and variants
  'yum-primary-ec': '#46afadec',
  'yum-secondary-ec': '#02ecd4ec',
  // Neutral
  'yum-neutral-light': '#e5e7eb',
  'yum-neutral': '#6b7280',
} as const;

// Organized color groups for better structure
export const BRAND_COLORS = {
  primary: YUMMATE_COLORS['yum-primary'],
  primaryLight: YUMMATE_COLORS['yum-primary-light'],
  secondary: YUMMATE_COLORS['yum-secondary'],
  accent: YUMMATE_COLORS['yum-accent'],
  accentLight: YUMMATE_COLORS['yum-accent-light'],
} as const;

export const BACKGROUND_COLORS = {
  bgStart: YUMMATE_COLORS['yum-bg-start'],
  bgEnd: YUMMATE_COLORS['yum-bg-end'],
  card: YUMMATE_COLORS['yum-card'],
  cardHover: YUMMATE_COLORS['yum-card-hover'],
} as const;

export const THEME_COLORS = {
  purple: YUMMATE_COLORS['yum-purple'],
  green: YUMMATE_COLORS['yum-green'],
  greenLight: YUMMATE_COLORS['yum-green-light'],
  neutralLight: YUMMATE_COLORS['yum-neutral-light'],
  neutral: YUMMATE_COLORS['yum-neutral'],
} as const;

export const GRADIENTS = {
  main: `linear-gradient(135deg, ${BACKGROUND_COLORS.bgStart} 0%, ${BACKGROUND_COLORS.bgEnd} 100%)`,
} as const;

// Type definitions for better TypeScript support
export type YummateColorKey = keyof typeof YUMMATE_COLORS;
export type BrandColorKey = keyof typeof BRAND_COLORS;
export type ThemeColorKey = keyof typeof THEME_COLORS;
export type BackgroundColorKey = keyof typeof BACKGROUND_COLORS;

// Usage Examples:
// Tailwind classes: text-yum-primary-ec, bg-yum-card, border-yum-primary
// JavaScript: YUMMATE_COLORS['yum-primary-ec']
// TypeScript: BRAND_COLORS.primary
