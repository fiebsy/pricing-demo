/**
 * Metric Tile Configuration
 *
 * Default styling and size configurations for dashboard metric tiles.
 * These wrap Skwircle.Card with dashboard-optimized defaults.
 */

import type {
  SkwircleRoundness,
  SkwircleElevation,
  SkwircleBackgroundGradient,
} from '@/components/ui/skwircle'

// =============================================================================
// SIZE CONFIGURATION
// =============================================================================

export type MetricTileSize = 'sm' | 'md' | 'lg'

export interface MetricTileSizeConfig {
  /** Padding inside the tile */
  padding: string
  /** Label text class */
  labelClass: string
  /** Value text class */
  valueClass: string
  /** Change indicator text class */
  changeClass: string
  /** Period text class */
  periodClass: string
  /** Gap between value and change row */
  valueGap: string
  /** Gap between change and period */
  changeGap: string
}

export const METRIC_TILE_SIZE_CONFIGS: Record<MetricTileSize, MetricTileSizeConfig> = {
  sm: {
    padding: 'p-4',
    labelClass: 'text-xs font-medium',
    valueClass: 'text-xl font-semibold',
    changeClass: 'text-xs font-medium',
    periodClass: 'text-[10px]',
    valueGap: 'mt-1.5',
    changeGap: 'gap-1',
  },
  md: {
    padding: 'p-5',
    labelClass: 'text-xs font-medium',
    valueClass: 'text-2xl font-semibold',
    changeClass: 'text-sm font-medium',
    periodClass: 'text-xs',
    valueGap: 'mt-2',
    changeGap: 'gap-1.5',
  },
  lg: {
    padding: 'p-6',
    labelClass: 'text-sm font-medium',
    valueClass: 'text-3xl font-semibold',
    changeClass: 'text-sm font-medium',
    periodClass: 'text-xs',
    valueGap: 'mt-3',
    changeGap: 'gap-2',
  },
}

// =============================================================================
// DEFAULT SKWIRCLE CARD PROPS
// =============================================================================

export interface MetricTileDefaults {
  elevation: SkwircleElevation
  roundness: SkwircleRoundness
  borderWidth: number
  backgroundGradient: SkwircleBackgroundGradient | undefined
}

/**
 * Default Skwircle.Card props for metric tiles.
 * These provide the "dashboard" look out of the box.
 */
export const METRIC_TILE_DEFAULTS: MetricTileDefaults = {
  elevation: 'none',
  roundness: 'rounded',
  borderWidth: 1,
  backgroundGradient: 'depth-3-bottom',
}

// =============================================================================
// CHANGE TYPE STYLING
// =============================================================================

export type ChangeType = 'positive' | 'negative' | 'neutral'

export const CHANGE_TYPE_COLORS: Record<ChangeType, string> = {
  positive: 'text-success-primary',
  negative: 'text-error-primary',
  neutral: 'text-tertiary',
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

export const getMetricTileSizeConfig = (size: MetricTileSize): MetricTileSizeConfig => {
  return METRIC_TILE_SIZE_CONFIGS[size]
}

export const getChangeTypeColor = (type: ChangeType): string => {
  return CHANGE_TYPE_COLORS[type]
}
