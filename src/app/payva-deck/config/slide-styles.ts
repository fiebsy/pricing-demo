/**
 * Centralized style configuration for all slide elements.
 * Single source of truth for typography, spacing, and theming.
 */

import type { SlideTheme, SlideVariant } from './types'

/**
 * Typography styles mapped by semantic purpose
 */
export const TYPOGRAPHY = {
  // Hero/Impact text
  hero: {
    title: 'font-display text-display-2xl font-semibold',
    subtitle: 'font-display text-display-md font-medium',
    description: 'text-lg',
  },
  
  // Section headers
  section: {
    title: 'font-display text-display-lg font-semibold',
    subtitle: 'text-sm font-medium tracking-wide',
    label: 'text-xs font-bold tracking-wide bg-secondary px-2 py-1 rounded',
  },
  
  // Body content
  body: {
    text: 'text-lg leading-relaxed',
    bold: 'font-medium',
    supporting: 'text-sm',
  },
  
  // Stats
  stat: {
    value: 'font-display text-display-2xl',
    valueMedium: 'font-display text-display-lg font-semibold',
    valueSmall: 'font-display text-display-md',
    label: 'text-lg',
    labelSmall: 'text-base',
    subtext: 'text-sm opacity-50',
  },
  
  // Cards
  card: {
    title: 'text-xl font-medium',
    titleSmall: 'text-base font-medium',
    role: 'text-xs',
  },
  
  // Chart
  chart: {
    value: 'text-lg font-medium',
    label: 'text-base',
    context: 'text-sm',
  },
}

/**
 * Spacing configuration
 */
export const SPACING = {
  // Layout gaps
  layout: {
    twoColumn: 'gap-16',
    stacked: 'gap-8',
    grid: 'gap-6',
    tight: 'gap-4',
  },
  
  // Card padding
  padding: {
    large: 'px-12 py-10',
    medium: 'px-8 py-8',
    default: 'px-8 py-6',
    compact: 'px-6 py-5',
    team: 'px-4 py-6',
    chart: 'px-12 pt-14 pb-6',
    logo: 'px-6 py-10',
  },
  
  // Margins
  margin: {
    supportingTop: 'mt-20',
    sectionTop: 'mt-12',
    elementTop: 'mt-8',
    itemTop: 'mt-4',
    subtextTop: 'mt-1',
    chartContext: 'mt-4',
    ctaTop: 'mt-12',
  },
  
  // Fixed dimensions
  dimensions: {
    teamCard: 'w-[240px]',
    statCard: 'min-w-[320px]',
    chartBar: 'w-24',
  },
}

/**
 * Color themes mapped to slide themes
 */
export const THEME_COLORS: Record<SlideTheme, {
  primary: string
  secondary: string
  tertiary: string
  accent?: string
}> = {
  impact: {
    primary: 'text-primary',
    secondary: 'text-secondary',
    tertiary: 'text-tertiary',
  },
  insight: {
    primary: 'text-primary',
    secondary: 'text-secondary',
    tertiary: 'text-tertiary',
  },
  evidence: {
    primary: 'text-primary',
    secondary: 'text-secondary',
    tertiary: 'text-tertiary',
  },
  punchline: {
    primary: 'text-primary',
    secondary: 'text-secondary',
    tertiary: 'text-quaternary',
    accent: 'text-brand',
  },
  professional: {
    primary: 'text-primary',
    secondary: 'text-secondary',
    tertiary: 'text-tertiary',
  },
}

/**
 * Background variants
 */
export const VARIANT_BACKGROUNDS: Record<SlideVariant, string> = {
  light: 'bg-transparent',
  dark: 'bg-primary text-white',
  bordered: 'bg-transparent border-2 border-secondary',
}

/**
 * Animation configurations
 */
export const ANIMATIONS = {
  // Delays (in seconds)
  delays: {
    title: 0.1,
    subtitle: 0.15,
    content: 0.2,
    bullets: 0.3,
    stat: 0.3,
    card: 0.25,
    supporting: 0.4,
  },
  
  // Transitions
  transitions: {
    slide: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 30,
    },
    element: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  
  // Variants for motion components
  variants: {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  },
}

/**
 * Get complete style set for a slide theme
 */
export function getThemeStyles(theme: SlideTheme = 'professional') {
  const colors = THEME_COLORS[theme]
  
  return {
    title: `${TYPOGRAPHY.section.title} ${colors.primary}`,
    subtitle: `${TYPOGRAPHY.section.subtitle} ${colors.tertiary}`,
    body: `${TYPOGRAPHY.body.text} ${colors.tertiary}`,
    bodyBold: `${TYPOGRAPHY.body.bold} ${colors.secondary}`,
    supporting: `${TYPOGRAPHY.body.supporting} ${colors.tertiary}`,
    stat: {
      value: `${TYPOGRAPHY.stat.value} ${colors.primary}`,
      label: `${TYPOGRAPHY.stat.label} ${colors.secondary}`,
      subtext: `${TYPOGRAPHY.stat.subtext}`,
    },
    card: {
      title: `${TYPOGRAPHY.card.title} ${colors.primary}`,
      role: `${TYPOGRAPHY.card.role} ${colors.tertiary}`,
    },
  }
}

/**
 * Get styles for specific layout + theme combination
 */
export function getLayoutThemeStyles(layout: string, theme: SlideTheme = 'professional') {
  const baseStyles = getThemeStyles(theme)
  
  // Layout-specific overrides
  const layoutOverrides: Record<string, any> = {
    hero: {
      title: `${TYPOGRAPHY.hero.title} ${THEME_COLORS[theme].primary}`,
      subtitle: `${TYPOGRAPHY.hero.subtitle} ${THEME_COLORS[theme].secondary}`,
      description: `${TYPOGRAPHY.hero.description} ${THEME_COLORS[theme].secondary}`,
    },
    'centered-stat': {
      stat: {
        value: `${TYPOGRAPHY.stat.value} ${THEME_COLORS[theme].primary}`,
        label: `${TYPOGRAPHY.stat.label} ${THEME_COLORS[theme].secondary}`,
      },
    },
    'two-column-stats': {
      stat: {
        value: `${TYPOGRAPHY.stat.valueMedium} ${THEME_COLORS[theme].primary}`,
        label: `${TYPOGRAPHY.stat.label} ${THEME_COLORS[theme].secondary}`,
      },
    },
  }
  
  return {
    ...baseStyles,
    ...layoutOverrides[layout],
  }
}

/**
 * Get animation delay for element type
 */
export function getAnimationDelay(elementType: keyof typeof ANIMATIONS.delays, index: number = 0): number {
  const baseDelay = ANIMATIONS.delays[elementType]
  return baseDelay + (index * 0.1)
}

/**
 * Style presets for quick configuration
 */
export const STYLE_PRESETS = {
  minimal: {
    typography: 'clean',
    spacing: 'comfortable',
    animations: 'subtle',
  },
  bold: {
    typography: 'strong',
    spacing: 'generous',
    animations: 'dynamic',
  },
  compact: {
    typography: 'efficient',
    spacing: 'tight',
    animations: 'quick',
  },
}

/**
 * Export everything as a single config object
 */
export const SLIDE_STYLES = {
  typography: TYPOGRAPHY,
  spacing: SPACING,
  themes: THEME_COLORS,
  variants: VARIANT_BACKGROUNDS,
  animations: ANIMATIONS,
  presets: STYLE_PRESETS,
  // Helper functions
  getThemeStyles,
  getLayoutThemeStyles,
  getAnimationDelay,
}