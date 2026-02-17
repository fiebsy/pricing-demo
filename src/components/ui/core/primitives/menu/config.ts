/**
 * Menu - Configuration
 *
 * Default values, styling utilities, and animation configuration.
 * Shared by Menu and all derivative components (FilterMenu, etc.)
 *
 * @module prod/base/menu/config
 */

import type { Variants } from 'motion/react'
import type {
  MenuAppearance,
  AnimationConfig,
  BorderRadius,
  Shadow,
  Background,
  SpringPreset,
  MenuFeatures,
  MenuSide,
} from './types'

// ============================================================================
// Z-Index Scale
// ============================================================================

/**
 * Z-index values for menu layering.
 * Centralized here for easy adjustment of stacking contexts.
 */
export const Z_INDEX = {
  /** Menu positioner layer */
  MENU_POSITIONER: 9999,
  /** Menu popup layer */
  MENU_POPUP: 9999,
} as const

// ============================================================================
// Animation Constants
// ============================================================================

/** Expo ease-out for smooth deceleration (used in reveal animation) */
export const EASING_EXPO_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)'

// ============================================================================
// Spring Presets
// ============================================================================

/**
 * Spring presets for physics-based animations.
 * Each preset defines stiffness, damping, and mass values.
 *
 * Curated based on Motion.dev spring visualization:
 * - default: Balanced, minimal overshoot - reliable for most UI
 * - snappy: Quick response with subtle bounce - responsive feel
 * - smooth: Gentle, relaxed - elegant transitions
 * - bouncy: Playful with visible overshoot - fun interactions
 */
export const SPRING_PRESETS: Record<Exclude<SpringPreset, 'custom'>, { stiffness: number; damping: number; mass: number }> = {
  default: { stiffness: 650, damping: 38, mass: 0.9 },
  snappy: { stiffness: 700, damping: 28, mass: 0.8 },
  smooth: { stiffness: 400, damping: 30, mass: 1 },
  bouncy: { stiffness: 600, damping: 20, mass: 1 },
} as const

/**
 * Get spring configuration from preset or custom values.
 */
export function getSpringConfig(animation: AnimationConfig): { stiffness: number; damping: number; mass: number } {
  if (animation.springPreset && animation.springPreset !== 'custom') {
    return SPRING_PRESETS[animation.springPreset]
  }
  return {
    stiffness: animation.springStiffness ?? 650,
    damping: animation.springDamping ?? 38,
    mass: animation.springMass ?? 0.9,
  }
}

/**
 * Approximate spring settling time based on damping.
 * Higher damping = faster settling.
 * Used for syncing opacity to spring duration.
 */
export function getSpringSettlingTime(damping: number): number {
  // Empirical formula: ~8000 / damping gives reasonable approximation
  // damping=30 → ~267ms, damping=15 → ~533ms, damping=45 → ~178ms
  return Math.round(8000 / damping)
}

/**
 * Default animation configuration.
 *
 * Uses spring physics for panel transitions with crossfade opacity:
 * - Spring preset: 'default' (stiffness: 650, damping: 38, mass: 0.9)
 * - Opacity: 220ms incoming, 80ms outgoing (asymmetric crossfade)
 */
export const DEFAULT_ANIMATION: Required<AnimationConfig> = {
  // Spring settings
  springPreset: 'default',
  springStiffness: 650,
  springDamping: 38,
  springMass: 0.9,

  // Crossfade timing
  opacityDuration: 220,
  quickOutDuration: 80,

  // Options
  animateHeight: true,
  syncOpacityToSpring: true,
  slowMoEnabled: false,

  // Blur effect
  blurOnFade: true,
  blurAmount: 4,

  // Reveal animation
  revealDuration: 200,
  revealScale: 0.4,
  revealSlideRatio: 0.5,
  animateOnClose: true,
}

/**
 * Default feature toggles.
 */
export const DEFAULT_FEATURES: Required<MenuFeatures> = {
  submenu: true,
  animateHeight: true,
  revealAnimation: true,
  unifiedHover: false,
}

/**
 * Default unified hover configuration.
 * Snappy, responsive spring for smooth indicator gliding.
 */
export const DEFAULT_UNIFIED_HOVER = {
  enabled: false,
  stiffness: 550,
  damping: 34,
  mass: 0.8,
  background: 'tertiary',
  borderRadius: 12,
} as const

// ============================================================================
// Appearance Defaults
// ============================================================================

/** Default appearance configuration (hardened from menu-variants playground) */
export const DEFAULT_APPEARANCE: Required<MenuAppearance> = {
  borderRadius: '2xl',
  shadow: '2xl',
  shine: 'shine-2-subtle',
  background: 'primary',
  gradient: 'subtle-depth-md',
  gradientColor: 'tertiary',
  squircle: true,
}

/** Default menu dimensions */
export const DEFAULT_MENU_WIDTH = 240
export const DEFAULT_SIDE_OFFSET = 6

// ============================================================================
// CSS Class Maps
// ============================================================================

export const BORDER_RADIUS_CLASSES: Record<BorderRadius, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
}

export const SHADOW_CLASSES: Record<Shadow, string> = {
  none: 'shadow-none',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  '2xl': 'shadow-2xl',
}

export const BACKGROUND_CLASSES: Record<Background, string> = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  tertiary: 'bg-tertiary',
  quaternary: 'bg-quaternary',
}

/** Combined shine + shadow classes (both use box-shadow) */
const SHINE_SHADOW_MAP: Record<string, Record<string, string>> = {
  'shine-0': { none: 'shine-0', sm: 'shine-0-shadow-sm', md: 'shine-0-shadow-md', lg: 'shine-0-shadow-lg' },
  'shine-0-subtle': { none: 'shine-0-subtle', sm: 'shine-0-subtle-shadow-sm', md: 'shine-0-subtle-shadow-md', lg: 'shine-0-subtle-shadow-lg' },
  'shine-0-intense': { none: 'shine-0-intense', sm: 'shine-0-intense-shadow-sm', md: 'shine-0-intense-shadow-md', lg: 'shine-0-intense-shadow-lg' },
  'shine-1': { none: 'shine-1', sm: 'shine-1-shadow-sm', md: 'shine-1-shadow-md', lg: 'shine-1-shadow-lg' },
  'shine-1-subtle': { none: 'shine-1-subtle', sm: 'shine-1-subtle-shadow-sm', md: 'shine-1-subtle-shadow-md', lg: 'shine-1-subtle-shadow-lg' },
  'shine-1-intense': { none: 'shine-1-intense', sm: 'shine-1-intense-shadow-sm', md: 'shine-1-intense-shadow-md', lg: 'shine-1-intense-shadow-lg' },
  'shine-2': { none: 'shine-2', sm: 'shine-2-shadow-sm', md: 'shine-2-shadow-md', lg: 'shine-2-shadow-lg' },
  'shine-2-subtle': { none: 'shine-2-subtle', sm: 'shine-2-subtle-shadow-sm', md: 'shine-2-subtle-shadow-md', lg: 'shine-2-subtle-shadow-lg' },
  'shine-2-intense': { none: 'shine-2-intense', sm: 'shine-2-intense-shadow-sm', md: 'shine-2-intense-shadow-md', lg: 'shine-2-intense-shadow-lg' },
  'shine-3': { none: 'shine-3', sm: 'shine-3-shadow-sm', md: 'shine-3-shadow-md', lg: 'shine-3-shadow-lg' },
  'shine-3-subtle': { none: 'shine-3-subtle', sm: 'shine-3-subtle-shadow-sm', md: 'shine-3-subtle-shadow-md', lg: 'shine-3-subtle-shadow-lg' },
  'shine-3-intense': { none: 'shine-3-intense', sm: 'shine-3-intense-shadow-sm', md: 'shine-3-intense-shadow-md', lg: 'shine-3-intense-shadow-lg' },
  'shine-brand': { none: 'shine-brand', sm: 'shine-brand-shadow-sm', md: 'shine-brand-shadow-md', lg: 'shine-brand-shadow-lg' },
  'shine-brand-subtle': { none: 'shine-brand-subtle', sm: 'shine-brand-subtle-shadow-sm', md: 'shine-brand-subtle-shadow-md', lg: 'shine-brand-subtle-shadow-lg' },
  'shine-brand-intense': { none: 'shine-brand-intense', sm: 'shine-brand-intense-shadow-sm', md: 'shine-brand-intense-shadow-md', lg: 'shine-brand-intense-shadow-lg' },
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Generate popup classes from appearance config
 */
export function getPopupClasses(appearance: MenuAppearance): string {
  const merged = { ...DEFAULT_APPEARANCE, ...appearance }
  const classes: string[] = []

  // Background
  classes.push(BACKGROUND_CLASSES[merged.background])

  // Border radius
  classes.push(BORDER_RADIUS_CLASSES[merged.borderRadius])

  // Squircle corners
  if (merged.squircle) {
    classes.push('corner-squircle')
  }

  // Handle shine + shadow combination (both use box-shadow CSS property)
  const hasShine = merged.shine !== 'none'
  const hasShadow = merged.shadow !== 'none'

  if (hasShine && hasShadow) {
    const shineCombos = SHINE_SHADOW_MAP[merged.shine]
    // Map xl/2xl to lg since combined classes only go up to lg
    const shadowKey = merged.shadow === 'xl' || merged.shadow === '2xl' ? 'lg' : merged.shadow
    if (shineCombos?.[shadowKey]) {
      classes.push(shineCombos[shadowKey])
    } else {
      classes.push(merged.shine)
    }
  } else if (hasShine) {
    classes.push(merged.shine)
  } else if (hasShadow) {
    classes.push(SHADOW_CLASSES[merged.shadow])
  }

  return classes.filter(Boolean).join(' ')
}

/**
 * Generate inline gradient styles
 * Creates a subtle depth effect by adding a tinted gradient overlay
 */
export function getGradientStyles(
  appearance: MenuAppearance,
  options?: { confidenceLevel?: number | null }
): React.CSSProperties {
  const merged = { ...DEFAULT_APPEARANCE, ...appearance }
  const confidenceLevel = options?.confidenceLevel

  // Check for low confidence (0 or very low) - apply error gradient
  const isLowConfidence = confidenceLevel !== null && confidenceLevel !== undefined && confidenceLevel <= 0.1

  if (merged.gradient === 'none' && !isLowConfidence) {
    return {}
  }

  // Base RGB values for each gradient color
  // These create depth by adding a subtle tint at the bottom
  const colorRgbMap: Record<string, string> = {
    brand: '124, 58, 237',      // Purple brand color
    primary: '0, 0, 0',         // Black for neutral depth
    secondary: '0, 0, 0',       // Black for neutral depth
    tertiary: '100, 100, 100',  // Gray
    gray: '100, 116, 139',      // Slate gray
    'gray-light': '148, 163, 184', // Light gray
    error: '239, 68, 68',       // Red for low confidence
  }

  // Opacity values for different intensities
  const opacityMap: Record<string, number> = {
    sm: 0.03,
    md: 0.06,
    lg: 0.10,
    xl: 0.15,
  }

  // For low confidence, use error color with subtle gradient
  if (isLowConfidence) {
    const errorRgb = colorRgbMap.error
    // Subtle error gradient from top to bottom
    return {
      backgroundImage: `linear-gradient(to bottom, rgba(${errorRgb}, 0.04) 0%, rgba(${errorRgb}, 0.12) 100%)`,
    }
  }

  const intensity = merged.gradient.replace('subtle-depth-', '')
  const endOpacity = opacityMap[intensity] ?? opacityMap.sm
  const rgb = colorRgbMap[merged.gradientColor ?? 'primary'] ?? colorRgbMap.primary

  // Gradient from transparent at top to tinted at bottom
  return {
    backgroundImage: `linear-gradient(to bottom, transparent 0%, rgba(${rgb}, ${endOpacity}) 100%)`,
  }
}

// ============================================================================
// Item Radius Calculation
// ============================================================================

const BORDER_RADIUS_PX: Record<BorderRadius, number> = {
  none: 0,
  sm: 2,
  md: 6,
  lg: 8,
  xl: 12,
  '2xl': 16,
}

const CONTAINER_PADDING = 4 // px

/**
 * Calculate item border radius based on container radius
 * Formula: item radius = container radius - padding
 */
export function getItemRadius(containerRadius: BorderRadius): number {
  const radiusPx = BORDER_RADIUS_PX[containerRadius]
  return Math.max(0, radiusPx - CONTAINER_PADDING)
}

// ============================================================================
// Reveal Animation Config
// ============================================================================

/** Reveal animation settings for menu open (default values) */
export const REVEAL_ANIMATION = {
  /** Animation duration in ms */
  duration: 200,
  /** Starting scale (0.4 = 40% of final size) */
  scaleStart: 0.4,
  /** Ending scale */
  scaleEnd: 1,
  /** Slide offset multiplier (0.5 = half of sideOffset) */
  slideOffsetRatio: 0.5,
} as const

/** Expo-out easing as array format for Motion */
export const REVEAL_EASING = [0.16, 1, 0.3, 1] as const

/** Motion-compatible transition (expo-out as array format) */
export const REVEAL_TRANSITION = {
  duration: REVEAL_ANIMATION.duration / 1000, // 0.2s
  ease: REVEAL_EASING,
}

/** Configuration for reveal variants */
export interface RevealVariantConfig {
  /** Menu side position */
  side: MenuSide
  /** Offset from trigger in pixels */
  sideOffset: number
  /** Starting scale (0-1), default 0.4 */
  scale?: number
  /** Slide offset ratio (0-1), default 0.5 */
  slideRatio?: number
  /** Enable exit animation, default true */
  animateOnClose?: boolean
}

/**
 * Factory for direction-aware reveal variants.
 * Creates scale + slide animation based on menu side.
 */
export function createRevealVariants(config: RevealVariantConfig): Variants {
  const {
    side,
    sideOffset,
    scale = REVEAL_ANIMATION.scaleStart,
    slideRatio = REVEAL_ANIMATION.slideOffsetRatio,
    animateOnClose = true,
  } = config

  const slideOffset = Math.round(sideOffset * slideRatio)
  // bottom = menu appears below trigger, animates upward (-1)
  // top = menu appears above trigger, animates downward (+1)
  const slideDirection = side === 'bottom' ? -1 : 1

  const hidden = {
    opacity: 0,
    scale,
    y: slideDirection * slideOffset,
  }

  const visible = {
    opacity: 1,
    scale: REVEAL_ANIMATION.scaleEnd,
    y: 0,
  }

  // Exit can be disabled (instant disappear) or mirror hidden state
  const exit = animateOnClose
    ? { opacity: 0, scale, y: slideDirection * slideOffset }
    : { opacity: 0 } // Instant fade for disabled exit

  return { hidden, visible, exit }
}

/**
 * Reduced motion variants - instant fade only, no scale/translate.
 */
export function createReducedMotionVariants(animateOnClose = true): Variants {
  return {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: animateOnClose ? { opacity: 0 } : { opacity: 0 },
  }
}

/**
 * Create reveal transition with custom duration.
 */
export function createRevealTransition(durationMs: number, slowMoScale = 1) {
  return {
    duration: (durationMs / 1000) * slowMoScale,
    ease: REVEAL_EASING,
  }
}

// ============================================================================
// Menu Item Styling
// ============================================================================

/**
 * Core menu item styles - used by all interactive menu items.
 * These ensure consistent alignment between header, back button, and list items.
 *
 * Hardened from menu-variants playground:
 * - iconGap: 8px (gap-2) - standardized for all menu types
 * - iconOpacity: 60% - "subtle" preset default
 */
export const MENU_ITEM_STYLES = {
  /** Horizontal padding for icon alignment (10px) */
  paddingX: 'px-2.5',
  /** Minimum height for consistent rows (36px) */
  minHeight: 'min-h-9',
  /** Gap between icon and text (8px) */
  iconGap: 'gap-2',
  /** Icon size in pixels */
  iconSize: 16,
  /** Icon stroke width */
  iconStrokeWidth: 2,
  /** Icon color class */
  iconColor: 'text-fg-tertiary',
  /** Icon opacity (60% = subtle preset) */
  iconOpacity: 'opacity-60',
  /** Text size */
  textSize: 'text-sm',
  /** Text weight */
  textWeight: 'font-medium',
} as const

/**
 * Small menu item styles - compact variant for tighter menus.
 */
export const MENU_ITEM_STYLES_SMALL = {
  /** Horizontal padding (8px) */
  paddingX: 'px-2',
  /** Minimum height for compact rows (28px) */
  minHeight: 'min-h-7',
  /** Gap between icon and text (6px) */
  iconGap: 'gap-1.5',
  /** Icon size in pixels */
  iconSize: 14,
  /** Icon stroke width */
  iconStrokeWidth: 2,
  /** Icon color class */
  iconColor: 'text-fg-tertiary',
  /** Icon opacity (60% = subtle preset) */
  iconOpacity: 'opacity-60',
  /** Text size */
  textSize: 'text-xs',
  /** Text weight */
  textWeight: 'font-medium',
} as const

// ============================================================================
// Separator Styling
// ============================================================================

/**
 * Separator styling configuration.
 *
 * IMPORTANT: There are two separator contexts:
 * 1. Header/Back separators: Include vertical margin (my-1) since they're outside gap container
 * 2. List item separators: NO vertical margin - parent gap-1 provides spacing
 */
export const SEPARATOR_STYLES = {
  /** Base separator classes (shared by all separators) */
  base: 'border-t border-primary opacity-50',
  /** Negative margin to span full width (compensates for container p-1) */
  fullWidth: '-mx-1',
  /** Vertical margin for header/back separators ONLY */
  headerMargin: 'my-1',
} as const

/**
 * Get separator classes based on context
 */
export function getSeparatorClasses(context: 'header' | 'list'): string {
  const base = `${SEPARATOR_STYLES.base} ${SEPARATOR_STYLES.fullWidth}`
  return context === 'header'
    ? `${base} ${SEPARATOR_STYLES.headerMargin}`
    : base
}

// ============================================================================
// Hover/Interactive States
// ============================================================================

export const INTERACTIVE_STATES = {
  /** Hover background - Base UI uses data-highlighted for Menu.Item hover states */
  hover: 'hover:bg-tertiary data-[highlighted]:bg-tertiary',
  /** Focus visible background */
  focusVisible: 'focus-visible:bg-tertiary',
  /** Active/pressed background */
  active: 'active:bg-quaternary',
  /** Disabled state */
  disabled: 'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
} as const
