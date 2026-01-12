import type { DisplayCardVariant, LayerStyle, MetricSize } from './types'

/**
 * DisplayCard Configuration
 *
 * Variants, constants, and style utilities.
 */

// =============================================================================
// CONSTANTS
// =============================================================================

/** Fixed border radius for outer card (16px) */
export const BORDER_RADIUS_OUTER = 16

/** Inner border radius is derived: outer - padding */
export const getInnerBorderRadius = (padding: number): number =>
  Math.max(0, BORDER_RADIUS_OUTER - padding)

/** Default inner content padding */
export const INNER_CONTENT_PADDING = 20

// =============================================================================
// DEFAULT LAYER STYLES
// =============================================================================

const DEFAULT_OUTER: LayerStyle = {
  background: 'secondary',
  shine: '0',
  shineIntensity: 'normal',
  shineShadow: 'none',
  depth: '10',
  depthColor: 'primary',
  depthDirection: 'bottom',
}

const DEFAULT_INNER: LayerStyle = {
  background: 'primary',
  shine: '1',
  shineIntensity: 'normal',
  shineShadow: 'xs',
  depth: 'none',
  depthColor: 'primary',
  depthDirection: 'bottom',
}

// =============================================================================
// VARIANTS
// =============================================================================

export const DISPLAY_CARD_VARIANTS: DisplayCardVariant[] = [
  {
    id: 'default',
    name: 'Default',
    outer: DEFAULT_OUTER,
    inner: DEFAULT_INNER,
    padding: 4,
  },
  {
    id: 'metric',
    name: 'Metric',
    outer: {
      ...DEFAULT_OUTER,
      depth: '10',
    },
    inner: {
      ...DEFAULT_INNER,
      shine: '1',
      shineShadow: 'xs',
    },
    padding: 4,
  },
  {
    id: 'subtle',
    name: 'Subtle',
    outer: {
      ...DEFAULT_OUTER,
      shine: 'none',
      depth: 'none',
    },
    inner: {
      ...DEFAULT_INNER,
      shine: '0',
      shineIntensity: 'subtle',
      shineShadow: 'none',
    },
    padding: 4,
  },
  {
    id: 'elevated',
    name: 'Elevated',
    outer: {
      ...DEFAULT_OUTER,
      shine: '1',
      depth: '20',
    },
    inner: {
      ...DEFAULT_INNER,
      shine: '2',
      shineShadow: 'sm',
    },
    padding: 4,
  },
  {
    id: 'brand',
    name: 'Brand',
    outer: {
      ...DEFAULT_OUTER,
      shine: 'brand',
      shineIntensity: 'subtle',
      depth: '20',
      depthColor: 'brand',
    },
    inner: {
      ...DEFAULT_INNER,
      shine: '1',
      shineShadow: 'xs',
    },
    padding: 4,
  },
  {
    id: 'flat',
    name: 'Flat',
    outer: {
      ...DEFAULT_OUTER,
      shine: 'none',
      depth: 'none',
    },
    inner: {
      ...DEFAULT_INNER,
      shine: 'none',
      shineShadow: 'none',
      depth: 'none',
    },
    padding: 4,
  },
]

/** Get variant by ID, falls back to 'default' */
export const getVariant = (id: string): DisplayCardVariant => {
  const variant = DISPLAY_CARD_VARIANTS.find((v) => v.id === id)
  return variant ?? DISPLAY_CARD_VARIANTS[0]!
}

/** Get all variant IDs */
export const VARIANT_IDS = DISPLAY_CARD_VARIANTS.map((v) => v.id) as [string, ...string[]]

// =============================================================================
// STYLE MAPPINGS
// =============================================================================

export const backgroundStyles: Record<string, string> = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  tertiary: 'bg-tertiary',
  quaternary: 'bg-quaternary',
  'brand-primary': 'bg-brand-primary',
  'brand-secondary': 'bg-brand-secondary',
}

// =============================================================================
// METRIC SIZE CONFIG
// =============================================================================

export interface MetricSizeConfig {
  value: string
  label: string
  trend: string
  icon: number
}

export const metricSizeStyles: Record<MetricSize, MetricSizeConfig> = {
  sm: {
    value: 'text-xl font-semibold',
    label: 'text-xs',
    trend: 'text-xs',
    icon: 12,
  },
  md: {
    value: 'text-2xl font-semibold',
    label: 'text-sm',
    trend: 'text-sm',
    icon: 14,
  },
  lg: {
    value: 'text-3xl font-bold',
    label: 'text-base',
    trend: 'text-base',
    icon: 16,
  },
}

export const trendStyles = {
  up: 'text-success-primary',
  down: 'text-error-primary',
  neutral: 'text-tertiary',
}
