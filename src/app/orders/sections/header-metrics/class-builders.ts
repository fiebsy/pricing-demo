/**
 * Orders Page - Summary Card Class Builders
 *
 * Utility functions to build Tailwind class strings from config values.
 */

import type {
  SummaryCardConfig,
  TextColor,
  BackgroundColor,
  BorderColor,
  FontSize,
  ShineType,
  ShineIntensity,
  ShadowSize,
} from '../../types'

// =============================================================================
// TEXT CLASS BUILDERS
// =============================================================================

export function getTextColorClass(color: TextColor): string {
  return `text-${color}`
}

export function getOpacityStyle(opacity: number): React.CSSProperties {
  if (opacity >= 100) return {}
  return { opacity: opacity / 100 }
}

export function getFontWeightClass(weight: string): string {
  const weightMap: Record<string, string> = {
    '300': 'font-light',
    '400': 'font-normal',
    '500': 'font-medium',
    '600': 'font-semibold',
    '700': 'font-bold',
  }
  return weightMap[weight] || 'font-normal'
}

export function getFontSizeClass(size: FontSize): string {
  return `text-${size}`
}

// =============================================================================
// BACKGROUND CLASS BUILDERS
// =============================================================================

export function getBackgroundColorClass(color: BackgroundColor, _opacity: number = 100): string {
  if (color === 'transparent') return ''
  return `bg-${color}`
}

// =============================================================================
// BORDER CLASS BUILDERS
// =============================================================================

export function getBorderClasses(
  show: boolean,
  color: BorderColor,
  width: number,
  opacity: number
): string {
  if (!show) return ''

  const colorClass = opacity < 100 ? `border-${color}/${opacity}` : `border-${color}`
  const widthClass = width === 1 ? 'border' : `border-${width}`

  return `${widthClass} ${colorClass}`
}

// =============================================================================
// SHINE CLASS BUILDERS
// =============================================================================

export function getShineClass(
  type: ShineType,
  intensity: ShineIntensity = 'normal'
): string {
  if (type === 'none') return ''

  const baseClass = `shine-${type}`

  if (intensity === 'subtle') return `${baseClass}-subtle`
  if (intensity === 'intense') return `${baseClass}-intense`
  return baseClass
}

export function getShadowClass(size: ShadowSize): string {
  if (size === 'none') return ''
  return `shadow-${size}`
}

export function getShineWithShadow(
  type: ShineType,
  intensity: ShineIntensity,
  shadow: ShadowSize
): string {
  const shineClass = getShineClass(type, intensity)
  const shadowClass = getShadowClass(shadow)
  return [shineClass, shadowClass].filter(Boolean).join(' ')
}

// =============================================================================
// CORNER CLASS BUILDERS
// =============================================================================

export function getCornerSquircleClass(enabled: boolean): string {
  return enabled ? 'corner-squircle' : ''
}

// =============================================================================
// GAP CLASS BUILDERS
// =============================================================================

export function getGapStyle(gap: number): React.CSSProperties {
  return { gap: `${gap}px` }
}

// =============================================================================
// CONTAINER CLASS BUILDER
// =============================================================================

export function buildContainerClasses(config: SummaryCardConfig): string {
  const classes: string[] = []

  // Background
  const bgClass = getBackgroundColorClass(config.backgroundColor, config.backgroundOpacity)
  if (bgClass) classes.push(bgClass)

  // Border
  const borderClasses = getBorderClasses(
    config.showBorder,
    config.borderColor,
    config.borderWidth,
    config.borderOpacity
  )
  if (borderClasses) classes.push(borderClasses)

  // Shine and Shadow
  const shineClasses = getShineWithShadow(
    config.shineType,
    config.shineIntensity,
    config.shineShadow
  )
  if (shineClasses) classes.push(shineClasses)

  // Corner squircle
  if (config.cornerSquircle) classes.push('corner-squircle')

  return classes.join(' ')
}

export function buildContainerStyles(config: SummaryCardConfig): React.CSSProperties {
  return {
    width: config.containerWidth,
    minHeight: config.containerHeight > 0 ? config.containerHeight : undefined,
    paddingTop: config.paddingTop,
    paddingRight: config.paddingRight,
    paddingBottom: config.paddingBottom,
    paddingLeft: config.paddingLeft,
    borderRadius: config.borderRadius,
  }
}

// =============================================================================
// TEXT ELEMENT CLASS BUILDERS
// =============================================================================

export function buildValueClasses(config: SummaryCardConfig): string {
  return [
    getFontWeightClass(config.valueFontWeight),
    getFontSizeClass(config.valueFontSize),
    getTextColorClass(config.valueColor),
  ].join(' ')
}

export function buildValueStyles(config: SummaryCardConfig): React.CSSProperties {
  return getOpacityStyle(config.valueOpacity)
}

export function buildSubtext1Classes(config: SummaryCardConfig): string {
  return [
    getFontWeightClass(config.subtext1FontWeight),
    getFontSizeClass(config.subtext1FontSize),
    getTextColorClass(config.subtext1Color),
  ].join(' ')
}

export function buildSubtext1Styles(config: SummaryCardConfig): React.CSSProperties {
  return getOpacityStyle(config.subtext1Opacity)
}

export function buildSubtext2Classes(config: SummaryCardConfig): string {
  return [
    getFontWeightClass(config.subtext2FontWeight),
    getFontSizeClass(config.subtext2FontSize),
    getTextColorClass(config.subtext2Color),
  ].join(' ')
}

export function buildSubtext2Styles(config: SummaryCardConfig): React.CSSProperties {
  return getOpacityStyle(config.subtext2Opacity)
}

// =============================================================================
// SHADY CONTAINER CLASS BUILDERS
// =============================================================================

export function buildShadyContainerClasses(config: SummaryCardConfig): string {
  if (!config.showShadyContainer) return ''

  const classes: string[] = []

  // Background
  const bgClass = getBackgroundColorClass(config.shadyBackground, config.shadyOpacity)
  if (bgClass) classes.push(bgClass)

  // Shine
  const shineClass = getShineClass(config.shadyShine, config.shadyShineIntensity)
  if (shineClass) classes.push(shineClass)

  return classes.join(' ')
}

export function buildShadyContainerStyles(config: SummaryCardConfig): React.CSSProperties {
  if (!config.showShadyContainer) return {}

  return {
    padding: config.shadyPadding,
    borderRadius: config.shadyRadius,
  }
}
