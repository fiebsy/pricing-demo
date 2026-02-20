/**
 * Landing Hero Class Builders
 *
 * Maps configuration values to Tailwind classes and inline styles
 */

import type { LandingHeroConfig, ShineType, ShineIntensity, ShadowSize, BackdropBlur, GlowColor, GlowShape } from '../config/types'

// ============================================================================
// Shine Class Builder
// ============================================================================

// Full class mappings to ensure Tailwind includes them in the bundle
const SHINE_CLASS_MAP: Record<ShineType, Record<ShineIntensity, string>> = {
  none: { '': '', '-extra-subtle': '', '-subtle': '', '-intense': '' },
  'shine-0': { '': 'shine-0', '-extra-subtle': 'shine-0-subtle', '-subtle': 'shine-0-subtle', '-intense': 'shine-0-intense' },
  'shine-1': { '': 'shine-1', '-extra-subtle': 'shine-1-subtle', '-subtle': 'shine-1-subtle', '-intense': 'shine-1-intense' },
  'shine-2': { '': 'shine-2', '-extra-subtle': 'shine-2-subtle', '-subtle': 'shine-2-subtle', '-intense': 'shine-2-intense' },
  'shine-3': { '': 'shine-3', '-extra-subtle': 'shine-3-subtle', '-subtle': 'shine-3-subtle', '-intense': 'shine-3-intense' },
  'shine-brand': { '': 'shine-brand', '-extra-subtle': 'shine-brand-extra-subtle', '-subtle': 'shine-brand-subtle', '-intense': 'shine-brand-intense' },
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
// Glow Color to CSS Variable
// ============================================================================

export function getGlowColorVar(color: GlowColor): string {
  const colorMap: Record<GlowColor, string> = {
    'brand-solid': 'var(--color-bg-brand-solid)',
    'brand': 'var(--color-bg-brand)',
    'success': 'var(--color-bg-success)',
    'warning': 'var(--color-bg-warning)',
    'error': 'var(--color-bg-error)',
    'info': 'var(--color-bg-info)',
    'gray': 'var(--color-utility-gray-500)',
  }
  return colorMap[color]
}

// ============================================================================
// Glow Shape Border Radius
// ============================================================================

export function getGlowShapeBorderRadius(shape: GlowShape): string {
  const shapeMap: Record<GlowShape, string> = {
    'circle': '50%',
    'blob': '60% 40% 30% 70% / 60% 30% 70% 40%',
    'blob-2': '40% 60% 70% 30% / 40% 50% 50% 60%',
    'blob-3': '70% 30% 50% 50% / 30% 40% 60% 70%',
  }
  return shapeMap[shape]
}

// ============================================================================
// Glow Style (radial gradient)
// ============================================================================

export function getGlowStyle(
  color: GlowColor,
  size: number,
  opacity: number,
  spread: number,
  shape: GlowShape,
  blur: number = 0
): React.CSSProperties {
  const colorVar = getGlowColorVar(color)
  return {
    width: size,
    height: size,
    background: `radial-gradient(circle, ${colorVar} 0%, transparent ${spread}%)`,
    opacity,
    borderRadius: getGlowShapeBorderRadius(shape),
    filter: blur > 0 ? `blur(${blur}px)` : undefined,
  }
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

  // Shine - use first layer for CSS-based shine (non-video mode)
  const firstShine = config.image.shines[0]
  if (firstShine && firstShine.type !== 'none') {
    const shineClass = getShineClass(firstShine.type, firstShine.intensity)
    if (shineClass) {
      classes.push(shineClass)
    }

    // Hover shine
    if (config.interaction.hoverShineIntense) {
      const hoverClass = getShineHoverClass(firstShine.type)
      if (hoverClass) {
        classes.push(hoverClass)
      }
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
