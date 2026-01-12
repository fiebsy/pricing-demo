/**
 * FilterSelectChip - Configuration
 *
 * Default configuration and size mappings for the biaxial filter chip.
 *
 * @module prod/base/filter/filter-select-chip/config
 */

import type * as React from 'react'

import { EASING_EXPO_OUT } from '../filter-chip/config'
import { DEFAULT_APPEARANCE } from '../../menu/config'
import type { FilterSelectChipConfig, ChipSize, ChipRounded } from './types'

// ============================================================================
// RE-EXPORT EASING
// ============================================================================

export { EASING_EXPO_OUT }

// ============================================================================
// SIZE CONFIGURATION
// ============================================================================

export interface ChipSizeConfig {
  height: number
  paddingX: number
  textClass: string
  iconSize: number
  closeSize: number
}

export const CHIP_SIZE_CONFIGS: Record<ChipSize, ChipSizeConfig> = {
  xs: { height: 24, paddingX: 8, textClass: 'text-xs', iconSize: 12, closeSize: 12 },
  sm: { height: 28, paddingX: 10, textClass: 'text-xs', iconSize: 14, closeSize: 14 },
  md: { height: 32, paddingX: 12, textClass: 'text-sm', iconSize: 16, closeSize: 16 },
  lg: { height: 36, paddingX: 14, textClass: 'text-sm', iconSize: 18, closeSize: 18 },
}

export const CHIP_ROUNDED_CLASSES: Record<ChipRounded, string> = {
  sm: 'rounded-md',
  md: 'rounded-lg',
  lg: 'rounded-xl',
  full: 'rounded-full',
}

// ============================================================================
// DEFAULT CONFIGURATION
// ============================================================================

/**
 * Default configuration for FilterSelectChip
 *
 * These values are the production-hardened presets.
 * Override via the `config` prop for custom behavior.
 */
export const DEFAULT_CONFIG: FilterSelectChipConfig = {
  // Chip Configuration (entry animation)
  chipSize: 'md',
  chipRounded: 'full',
  iconSize: 14,
  chipDuration: 200,
  revealMode: 'fade',
  chipExpandAnimation: true,
  iconOpacity: 0.5,
  iconValueGap: 4,
  paddingLeft: 8,
  paddingRight: 6,

  // Menu Animation (biaxial expansion)
  menuDuration: 225,
  menuCollapseDuration: 125,
  contentFadeDuration: 75,
  contentFadeDelay: 0,

  // Menu Layout
  minPanelWidth: 200,
  maxPanelHeight: 300,
  innerPadding: 4,
  itemHeight: 32,
  itemTextSize: 'sm',
  itemGap: 2,
  borderRadius: 16,
  contentTopOffset: 0,
  topExtension: 0,
  showHeaderSeparator: false,
  squircleOnOpen: false,
  itemSquircle: true,
  shadowOnExpandOnly: false,
  menuAnchor: 'left',

  // Appearance (uses menu styling system)
  appearance: {
    ...DEFAULT_APPEARANCE,
  },
}

// ============================================================================
// HELPERS
// ============================================================================

export function mergeConfig(
  config?: Partial<FilterSelectChipConfig>
): FilterSelectChipConfig {
  if (!config) return DEFAULT_CONFIG

  const mergedAppearance = {
    ...DEFAULT_CONFIG.appearance,
    ...config.appearance,
  }

  // Auto-sync itemSquircle with appearance.squircle if not explicitly set
  const itemSquircle =
    config.itemSquircle !== undefined
      ? config.itemSquircle
      : mergedAppearance.squircle ?? DEFAULT_CONFIG.itemSquircle

  return {
    ...DEFAULT_CONFIG,
    ...config,
    itemSquircle,
    appearance: mergedAppearance,
  }
}

export function getChipSizeConfig(size: ChipSize): ChipSizeConfig {
  return CHIP_SIZE_CONFIGS[size]
}

// ============================================================================
// CSS VARIABLE HELPERS (S-tier animation system)
// ============================================================================

/**
 * CSS variable names for filter-select-chip-transitions.css
 */
export const FSC_CSS_VARS = {
  chipWidth: '--fsc-chip-width',
  panelWidth: '--fsc-panel-width',
  panelHeight: '--fsc-panel-height',
  chipHeight: '--fsc-chip-height',
  topExtension: '--fsc-top-extension',
  duration: '--fsc-duration',
  collapseDuration: '--fsc-collapse-duration',
  easing: '--fsc-easing',
  contentFadeDuration: '--fsc-content-fade-duration',
  contentFadeDelay: '--fsc-content-fade-delay',
  borderRadius: '--fsc-border-radius',
} as const

/**
 * Generate CSS custom properties for the filter-select-chip container.
 * These drive the CSS-based animations in filter-select-chip-transitions.css.
 */
export function getFSCCSSVariables(
  config: FilterSelectChipConfig,
  measurements: {
    chipWidth: number
    chipHeight: number
    panelHeight: number
  }
): React.CSSProperties {
  return {
    [FSC_CSS_VARS.chipWidth]: `${measurements.chipWidth}px`,
    [FSC_CSS_VARS.panelWidth]: `${config.minPanelWidth}px`,
    [FSC_CSS_VARS.panelHeight]: `${measurements.panelHeight}px`,
    [FSC_CSS_VARS.chipHeight]: `${measurements.chipHeight}px`,
    [FSC_CSS_VARS.topExtension]: `${config.topExtension}px`,
    [FSC_CSS_VARS.duration]: `${config.menuDuration}ms`,
    [FSC_CSS_VARS.collapseDuration]: `${config.menuCollapseDuration}ms`,
    [FSC_CSS_VARS.easing]: EASING_EXPO_OUT,
    [FSC_CSS_VARS.contentFadeDuration]: `${config.contentFadeDuration}ms`,
    [FSC_CSS_VARS.contentFadeDelay]: `${config.contentFadeDelay}ms`,
    [FSC_CSS_VARS.borderRadius]: `${config.borderRadius}px`,
  } as React.CSSProperties
}
