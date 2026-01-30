/**
 * MetricCard Utilities
 *
 * Helper functions for building styles and formatting values.
 *
 * @module metric-card/utils
 */

import { cn } from '@/lib/utils'

import {
  BACKGROUND_CLASSES,
  FONT_FAMILY_CLASSES,
  FONT_SIZE_CLASSES,
  FONT_WEIGHT_CLASSES,
  TEXT_COLOR_CLASSES,
} from './config'

import type {
  DepthColor,
  DepthDirection,
  DepthIntensity,
  FormattedValueParts,
  HoverAnimation,
  LayerStyle,
  SectionStyle,
  ShineIntensity,
  ShineShadow,
  ShineType,
  ValueFormatConfig,
} from './types'

// =============================================================================
// SHINE & DEPTH CLASS BUILDERS
// =============================================================================

export const buildShineClass = (
  type: ShineType,
  intensity: ShineIntensity,
  shadow: ShineShadow
): string => {
  if (type === 'none') return ''
  let className = `shine-${type}`
  if (intensity !== 'normal') className += `-${intensity}`
  if (shadow !== 'none') className += `-shadow-${shadow}`
  return className
}

export const buildDepthClass = (
  intensity: DepthIntensity,
  color: DepthColor,
  direction: DepthDirection
): string => {
  if (intensity === 'none') return ''
  let className = `subtle-depth-${intensity}-${color}`
  if (direction !== 'bottom') className += `-${direction}`
  return className
}

// =============================================================================
// LAYER & SECTION CLASS BUILDERS
// =============================================================================

export const buildLayerClasses = (style: LayerStyle, borderRadius: number): string => {
  const bgClass = BACKGROUND_CLASSES[style.background]
  const shineClass = buildShineClass(style.shine, style.shineIntensity, style.shineShadow)
  const depthClass = buildDepthClass(style.depth, style.depthColor, style.depthDirection)
  const cornerClass = borderRadius > 0 ? 'corner-squircle' : ''

  return cn(bgClass, depthClass, cornerClass, shineClass)
}

export const buildSectionClasses = (style: SectionStyle): string => {
  return cn(
    TEXT_COLOR_CLASSES[style.color],
    FONT_FAMILY_CLASSES[style.fontFamily],
    FONT_SIZE_CLASSES[style.fontSize],
    FONT_WEIGHT_CLASSES[style.fontWeight]
  )
}

// =============================================================================
// ANIMATION CLASSES
// =============================================================================

export const getHoverAnimationClasses = (animation: HoverAnimation): string => {
  switch (animation) {
    case 'lift':
      return 'hover:-translate-y-0.5 hover:shadow-lg'
    case 'glow':
      return 'hover:shadow-lg hover:shadow-brand-primary/20'
    case 'fade':
      return 'hover:opacity-80 active:opacity-70'
    default:
      return ''
  }
}

// =============================================================================
// STYLE MERGING
// =============================================================================

export const mergeLayerStyles = (base: LayerStyle, override?: Partial<LayerStyle>): LayerStyle => {
  if (!override) return base
  return { ...base, ...override }
}

export const mergeSectionStyles = (base: SectionStyle, override?: Partial<SectionStyle>): SectionStyle => {
  if (!override) return base
  return { ...base, ...override }
}

// =============================================================================
// VALUE FORMATTING
// =============================================================================

/**
 * Formats a value string with compact notation (k, M, B suffixes)
 * Uses maxDigits to determine total significant figures displayed
 * Returns parts separately for individual styling
 */
export const formatCompactValue = (
  value: string,
  config: ValueFormatConfig
): FormattedValueParts => {
  // Extract prefix (like $) and numeric part
  const match = value.match(/^([^0-9-]*)(-?[\d,]+(?:\.\d+)?)(.*)$/)

  if (!match) {
    return { prefix: '', number: value, suffix: '' }
  }

  const [, prefix = '', numericPart = '', originalSuffix = ''] = match

  if (!config.compact) {
    return { prefix, number: numericPart + originalSuffix, suffix: '' }
  }

  const num = parseFloat(numericPart.replace(/,/g, ''))

  if (isNaN(num)) {
    return { prefix, number: numericPart + originalSuffix, suffix: '' }
  }

  const absNum = Math.abs(num)
  const sign = num < 0 ? '-' : ''

  // Determine suffix and divisor
  let compactSuffix = ''
  let divisor = 1

  if (absNum >= 1_000_000_000) {
    compactSuffix = 'B'
    divisor = 1_000_000_000
  } else if (absNum >= 1_000_000) {
    compactSuffix = 'M'
    divisor = 1_000_000
  } else if (absNum >= 1_000) {
    compactSuffix = 'k'
    divisor = 1_000
  }

  // If no compacting needed, return with original format
  if (divisor === 1) {
    return { prefix, number: numericPart + originalSuffix, suffix: '' }
  }

  const compactNum = absNum / divisor

  // Calculate how many digits are before the decimal
  const integerPart = Math.floor(compactNum)
  const integerDigits = integerPart === 0 ? 1 : Math.floor(Math.log10(integerPart)) + 1

  // Remaining digits can be used for decimals
  const decimalPlaces = Math.max(0, config.maxDigits - integerDigits)

  // Format with calculated precision
  const formatted = compactNum.toFixed(decimalPlaces)
  // Remove trailing zeros after decimal (but keep at least the integer part)
  const cleanFormatted = formatted.replace(/\.?0+$/, '')

  return {
    prefix,
    number: `${sign}${cleanFormatted}`,
    suffix: compactSuffix + originalSuffix,
  }
}
