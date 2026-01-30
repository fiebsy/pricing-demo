/**
 * MetricCard Configuration
 *
 * Constants, defaults, style mappings, and presets for MetricCard.
 *
 * @module metric-card/config
 */

import type {
  BackgroundColor,
  FontFamily,
  FontSize,
  FontWeight,
  IconSize,
  LayerStyle,
  MetricCardConfig,
  TextColor,
  TrendDirection,
  TrendStyle,
  ValueFormatConfig,
} from './types'

// =============================================================================
// CONSTANTS
// =============================================================================

export const BORDER_RADIUS_DEFAULT = 16

export const ICON_SIZE_OPTIONS: IconSize[] = [10, 12, 14, 16, 18, 20, 24]

// =============================================================================
// STYLE MAPPINGS
// =============================================================================

export const BACKGROUND_CLASSES: Record<BackgroundColor, string> = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  tertiary: 'bg-tertiary',
  quaternary: 'bg-quaternary',
  'brand-primary': 'bg-brand-primary',
  'brand-secondary': 'bg-brand-secondary',
}

export const TEXT_COLOR_CLASSES: Record<TextColor, string> = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  tertiary: 'text-tertiary',
  quaternary: 'text-quaternary',
  'brand-primary': 'text-brand-primary',
  'brand-secondary': 'text-brand-secondary',
}

export const FONT_FAMILY_CLASSES: Record<FontFamily, string> = {
  text: 'font-sans',
  display: 'font-display',
}

export const FONT_SIZE_CLASSES: Record<FontSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
}

export const FONT_WEIGHT_CLASSES: Record<FontWeight, string> = {
  thin: 'font-thin',
  extralight: 'font-extralight',
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  black: 'font-black',
}

export const TREND_COLORS: Record<TrendDirection, string> = {
  up: 'text-success-primary',
  down: 'text-error-primary',
  neutral: 'text-tertiary',
}

// =============================================================================
// DEFAULT STYLES
// =============================================================================

export const DEFAULT_LAYER_STYLE: LayerStyle = {
  background: 'secondary',
  shine: '0',
  shineIntensity: 'subtle',
  shineShadow: 'none',
  depth: 'none',
  depthColor: 'primary',
  depthDirection: 'bottom',
  opacity: 100,
}

export const DEFAULT_INNER_LAYER_STYLE: LayerStyle = {
  background: 'primary',
  shine: '0',
  shineIntensity: 'subtle',
  shineShadow: 'none',
  depth: 'none',
  depthColor: 'primary',
  depthDirection: 'bottom',
  opacity: 100,
}

export const DEFAULT_TREND_STYLE: TrendStyle = {
  fontSize: 'xs',
  fontWeight: 'medium',
  iconSize: 12,
  useDirectionalColors: true,
  color: 'tertiary',
  alignment: 'center',
}

export const DEFAULT_VALUE_FORMAT: ValueFormatConfig = {
  compact: false,
  maxDigits: 4,
  prefixOpacity: 50,
  suffixOpacity: 50,
}

// =============================================================================
// DEFAULT CONFIGURATION
// =============================================================================

export const DEFAULT_METRIC_CARD_CONFIG: MetricCardConfig = {
  // Layout
  sectionOrder: ['label', 'value', 'count'],
  gap: 4,
  minWidth: 180,

  // Layer styles
  outer: DEFAULT_LAYER_STYLE,
  inner: DEFAULT_INNER_LAYER_STYLE,
  outerPadding: 4,
  innerPadding: 16,
  borderRadius: BORDER_RADIUS_DEFAULT,

  // Section styles
  labelStyle: { color: 'tertiary', fontFamily: 'text', fontSize: 'sm', fontWeight: 'normal' },
  valueStyle: { color: 'primary', fontFamily: 'text', fontSize: '2xl', fontWeight: 'semibold' },
  countStyle: { color: 'quaternary', fontFamily: 'text', fontSize: 'xs', fontWeight: 'normal' },
  trendStyle: DEFAULT_TREND_STYLE,

  // Animation
  hoverAnimation: 'none',
  transitionDuration: 200,

  // Hover overrides
  hoverOuter: undefined,
  hoverInner: { depth: '10' },

  // Active overrides
  activeOuter: { shine: '1', depth: '20' },
  activeInner: { shine: '2', shineIntensity: 'normal', shineShadow: 'sm' },
}

// =============================================================================
// PRESET CONFIGURATIONS
// =============================================================================

/** Flat card - outer hidden, reveals on active */
export const METRIC_CARD_PRESET_FLAT: MetricCardConfig = {
  sectionOrder: ['value', 'label', 'count'],
  gap: 12,
  gap1: 0,
  gap2: 16,
  minWidth: 150,
  outer: {
    background: 'secondary',
    shine: '0',
    shineIntensity: 'normal',
    shineShadow: 'none',
    depth: 'none',
    depthColor: 'secondary',
    depthDirection: 'bottom',
    opacity: 0,
  },
  inner: {
    background: 'primary',
    shine: '0',
    shineIntensity: 'subtle',
    shineShadow: 'none',
    depth: 'none',
    depthColor: 'primary',
    depthDirection: 'bottom',
    opacity: 100,
  },
  outerPadding: 4,
  innerPadding: 16,
  borderRadius: 16,
  labelStyle: { color: 'quaternary', fontFamily: 'text', fontSize: 'sm', fontWeight: 'medium', opacity: 80 },
  valueStyle: { color: 'secondary', fontFamily: 'display', fontSize: '3xl', fontWeight: 'medium', opacity: 100 },
  countStyle: { color: 'quaternary', fontFamily: 'text', fontSize: 'xs', fontWeight: 'normal', opacity: 70 },
  trendStyle: { fontSize: 'xs', fontWeight: 'medium', iconSize: 12, useDirectionalColors: true, color: 'tertiary', alignment: 'center' },
  hoverAnimation: 'none',
  transitionDuration: 100,
  hoverOuter: { opacity: 0 },
  hoverInner: { depth: '10' },
  activeOuter: { shine: '1', depth: '20', opacity: 100 },
  activeInner: { shine: '2', shineIntensity: 'normal', shineShadow: 'sm' },
  activeValueStyle: { color: 'primary' },
  activeLabelStyle: { opacity: 90 },
  labelSuffixStyle: { opacity: 50 },
}

export const METRIC_CARD_PRESETS = {
  default: DEFAULT_METRIC_CARD_CONFIG,
  flat: METRIC_CARD_PRESET_FLAT,
} as const

export type MetricCardPresetId = keyof typeof METRIC_CARD_PRESETS
