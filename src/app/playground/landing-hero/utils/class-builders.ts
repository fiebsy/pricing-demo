/**
 * Landing Hero Class Builders
 *
 * Maps configuration values to Tailwind classes and inline styles
 */

import type { LandingHeroConfig, ShineType, ShineIntensity, ShadowSize, BackdropBlur, BlurCircleColor } from '../config/types'

// ============================================================================
// Shine Class Builder
// ============================================================================

// Full class mappings to ensure Tailwind includes them in the bundle
const SHINE_CLASS_MAP: Record<ShineType, Record<ShineIntensity, string>> = {
  none: { '': '', '-subtle': '', '-intense': '' },
  'shine-0': { '': 'shine-0', '-subtle': 'shine-0-subtle', '-intense': 'shine-0-intense' },
  'shine-1': { '': 'shine-1', '-subtle': 'shine-1-subtle', '-intense': 'shine-1-intense' },
  'shine-2': { '': 'shine-2', '-subtle': 'shine-2-subtle', '-intense': 'shine-2-intense' },
  'shine-3': { '': 'shine-3', '-subtle': 'shine-3-subtle', '-intense': 'shine-3-intense' },
  'shine-brand': { '': 'shine-brand', '-subtle': 'shine-brand-subtle', '-intense': 'shine-brand-intense' },
}

const SHINE_HOVER_MAP: Record<ShineType, string> = {
  none: '',
  'shine-0': 'hover:shine-0-intense',
  'shine-1': 'hover:shine-1-intense',
  'shine-2': 'hover:shine-2-intense',
  'shine-3': 'hover:shine-3-intense',
  'shine-brand': 'hover:shine-brand-intense',
}

export function getShineClass(shine: ShineType, intensity: ShineIntensity): string {
  return SHINE_CLASS_MAP[shine][intensity]
}

export function getShineHoverClass(shine: ShineType): string {
  return SHINE_HOVER_MAP[shine]
}

// ============================================================================
// Shadow Class Builder
// ============================================================================

const SHADOW_CLASS_MAP: Record<ShadowSize, string> = {
  none: '',
  xs: 'shadow-xs',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  '2xl': 'shadow-2xl',
}

export function getShadowClass(shadow: ShadowSize): string {
  return SHADOW_CLASS_MAP[shadow]
}

// ============================================================================
// Backdrop Blur Class Builder
// ============================================================================

const BACKDROP_BLUR_CLASS_MAP: Record<BackdropBlur, string> = {
  none: '',
  sm: 'backdrop-blur-sm',
  md: 'backdrop-blur-md',
  lg: 'backdrop-blur-lg',
}

export function getBackdropBlurClass(blur: BackdropBlur): string {
  return BACKDROP_BLUR_CLASS_MAP[blur]
}

// ============================================================================
// Blur Circle Color to CSS Variable
// ============================================================================

export function getBlurCircleColorVar(color: BlurCircleColor): string {
  const colorMap: Record<BlurCircleColor, string> = {
    'brand-solid': 'var(--color-bg-brand-solid)',
    'brand': 'var(--color-bg-brand)',
    'success': 'var(--color-bg-success)',
    'warning': 'var(--color-bg-warning)',
    'error': 'var(--color-bg-error)',
    'info': 'var(--color-bg-info)',
  }
  return colorMap[color]
}

// ============================================================================
// Outer Container Classes
// ============================================================================

export function getOuterContainerClasses(config: LandingHeroConfig): string {
  // Visual container: background, shine, corners (no transitions - those are on parent)
  const classes: string[] = ['bg-primary']

  // Corner style
  if (config.image.outerCorner === 'squircle') {
    classes.push('corner-squircle')
  }

  // Shine
  const shineClass = getShineClass(config.image.shine, config.image.shineIntensity)
  if (shineClass) {
    classes.push(shineClass)
  }

  // Hover shine
  if (config.interaction.hoverShineIntense && config.image.shine !== 'none') {
    const hoverClass = getShineHoverClass(config.image.shine)
    if (hoverClass) {
      classes.push(hoverClass)
    }
  }

  // Note: Shadow and interaction states are on the parent button wrapper

  return classes.join(' ')
}

// ============================================================================
// Outer Container Styles
// ============================================================================

export function getOuterContainerStyles(config: LandingHeroConfig): React.CSSProperties {
  return {
    borderRadius: `${config.image.outerBorderRadius}px`,
    padding: `${config.image.padding}px`,
  }
}

// ============================================================================
// Inner Container Classes
// ============================================================================

export function getInnerContainerClasses(config: LandingHeroConfig): string {
  const classes: string[] = ['overflow-hidden']

  // Corner style
  if (config.image.outerCorner === 'squircle') {
    classes.push('corner-squircle')
  }

  // Backdrop blur
  const blurClass = getBackdropBlurClass(config.image.backdropBlur)
  if (blurClass) {
    classes.push(blurClass)
  }

  return classes.join(' ')
}

// ============================================================================
// Inner Container Styles
// ============================================================================

export function getInnerContainerStyles(config: LandingHeroConfig): React.CSSProperties {
  return {
    borderRadius: `${config.image.innerBorderRadius}px`,
  }
}

// ============================================================================
// Active Scale Style
// ============================================================================

// Use inline style for arbitrary scale values since Tailwind JIT
// won't include dynamic arbitrary values like active:scale-[0.87]
export function getActiveScaleStyle(scaleOnClick: number): React.CSSProperties {
  if (scaleOnClick >= 1) return {}
  return {} // Active state handled via CSS
}

// Map common scale values to Tailwind classes, with arbitrary value support
const SCALE_CLASS_MAP: Record<number, string> = {
  0.8: 'active:scale-[0.80]',
  0.85: 'active:scale-[0.85]',
  0.9: 'active:scale-90',
  0.95: 'active:scale-95',
  1: '',
}

export function getActiveScaleClass(scaleOnClick: number): string {
  // Use mapped class if available
  if (scaleOnClick in SCALE_CLASS_MAP) {
    return SCALE_CLASS_MAP[scaleOnClick]
  }
  // For values not in the map, we'll need to handle via inline style
  // or add a safelist. For now, return closest match.
  if (scaleOnClick < 0.85) return 'active:scale-[0.80]'
  if (scaleOnClick < 0.9) return 'active:scale-[0.85]'
  if (scaleOnClick < 0.95) return 'active:scale-90'
  if (scaleOnClick < 1) return 'active:scale-95'
  return ''
}
