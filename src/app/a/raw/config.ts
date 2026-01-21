/**
 * AI Profile Raw - Hardcoded Configuration
 *
 * Fixed visual values extracted from the AI Playground.
 * This serves as the source/reference implementation.
 */

import type { ProfileFormData } from '../playground/types'

// =============================================================================
// CONFIG
// =============================================================================

export const config = {
  // Layout
  topPadding: 112,
  contentMaxWidth: 640,

  // Page Background
  pageBackground: 'secondary' as const,

  // Gradient
  gradientEnabled: true,
  gradientOpacity: 100,

  // Gradient - Colors (semantic)
  gradientSurfaceColor: 'bg-primary',
  gradientShadowColor: 'fg-secondary',
  gradientHighlightColor: 'bg-inverted-primary',

  // Gradient - Potency (master intensity)
  gradientPotency: 20,

  // Gradient - Shadow
  gradientShadowBlur: 90,
  gradientShadowSpread: 40,
  gradientShadowOpacity: 23,

  // Gradient - Highlight (inset shadow)
  gradientHighlightSize: 4,
  gradientHighlightOpacity: 25,

  // Gradient - Top Edge Glow
  gradientEdgeGlowEnabled: true,
  gradientEdgeGlowHeight: 170,
  gradientEdgeGlowOpacity: 20,

  // Gradient - Shape
  gradientFadeDistance: 390,
  gradientBorderRadius: 72,
  gradientHeight: 340,

  // Shine Border (disabled)
  shineEnabled: false,

  // Content Area
  contentTextColor: 'secondary' as const,
  contentBackgroundOpacity: 0,

  // Questions Card
  questionsTextColor: 'secondary' as const,
  questionsBackground: 'quaternary' as const,
  questionsBackgroundOpacity: 10,
  questionsSectionPaddingX: 8,
  questionsSectionPaddingY: 24,
  questionsHeaderPaddingX: 16,
  questionsHeaderPaddingY: 12,
  questionsItemsInset: 0,
  questionsItemsPaddingX: 16,
  questionsItemsPaddingY: 12,
  questionsItemsBorderRadius: 20,
} as const

// =============================================================================
// MOCK DATA
// =============================================================================

export const initialProfileData: ProfileFormData = {
  name: 'Order 12345',
  organization: {
    name: 'Payva',
    logo: '/org-logo.png',
    role: '',
  },
  headline: '1 on 1 Mentorship',
  bio: "Welcome to my mentorship profile where I help professionals accelerate their career growth through personalized guidance and strategic advice. Each session is tailored to your unique goals, whether you are navigating a career transition, building leadership skills, or seeking industry insights. I bring years of hands-on experience across multiple domains and a genuine passion for helping others succeed. Together we will identify your strengths, address challenges, and create actionable plans that drive real results in your professional journey.",
  questions: [
    'How has your experience co-founding Pickaxe.it shaped your approach to design?',
    'What types of projects do you focus on as a design engineer at Payva?',
    'How old are you?',
    'What inspired you to transition from product management to design engineering?',
    'Hello',
  ],
  socialLinks: ['linkedin.com/in/derickfiebiger', 'fiebsy.medium.com/'],
}

// =============================================================================
// STYLE HELPERS
// =============================================================================

// Gradient color mappings - semantic tokens that adapt to light/dark mode
export const gradientSurfaceColorVars: Record<string, string> = {
  'bg-primary': 'var(--color-bg-primary)',
  'bg-secondary': 'var(--color-bg-secondary)',
  'bg-tertiary': 'var(--color-bg-tertiary)',
  'bg-quaternary': 'var(--color-bg-quaternary)',
  'bg-brand-primary': 'var(--color-bg-brand-primary)',
  'bg-brand-secondary': 'var(--color-bg-brand-secondary)',
  'bg-brand-solid': 'var(--color-bg-brand-solid)',
  'bg-inverted-primary': 'var(--color-bg-inverted-primary)',
  'bg-inverted-secondary': 'var(--color-bg-inverted-secondary)',
}

export const gradientShadowColorVars: Record<string, string> = {
  'alpha-black': 'var(--color-alpha-black)',
  'fg-primary': 'var(--color-fg-primary)',
  'fg-secondary': 'var(--color-fg-secondary)',
  'fg-tertiary': 'var(--color-fg-tertiary)',
  'fg-brand-primary': 'var(--color-fg-brand-primary)',
  'border-primary': 'var(--color-border-primary)',
  'border-secondary': 'var(--color-border-secondary)',
  'border-brand': 'var(--color-border-brand)',
}

export const gradientHighlightColorVars: Record<string, string> = {
  'alpha-white': 'var(--color-alpha-white)',
  'bg-inverted-primary': 'var(--color-bg-inverted-primary)',
  'bg-inverted-secondary': 'var(--color-bg-inverted-secondary)',
  'fg-primary': 'var(--color-fg-primary)',
  'fg-brand-secondary': 'var(--color-fg-brand-secondary)',
  'border-brand': 'var(--color-border-brand)',
}

export const bgColorVars: Record<string, string> = {
  primary: 'var(--color-bg-primary)',
  secondary: 'var(--color-bg-secondary)',
  tertiary: 'var(--color-bg-tertiary)',
  quaternary: 'var(--color-bg-quaternary)',
}
