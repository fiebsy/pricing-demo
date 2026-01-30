/**
 * FilterSelectChipStatic - Configuration
 *
 * Style configuration and size mappings.
 *
 * @module prod/base/filter/filter-select-chip-static/config
 */

import type { StyleConfig, SizeConfig, ChipSize, ChipGap, ChipRoundness } from './types'

// ============================================================================
// DEFAULT CONFIGURATION
// ============================================================================

export const DEFAULT_STYLE_CONFIG: StyleConfig = {
  gap: 'md',
  roundness: 'full',
  size: 'sm',
}

// ============================================================================
// SIZE MAPPINGS
// ============================================================================

export const SIZE_MAP: Record<ChipSize, SizeConfig> = {
  sm: { height: 28, text: 'text-xs', padding: 'px-2.5', iconSize: 14 },
  md: { height: 32, text: 'text-sm', padding: 'px-3', iconSize: 16 },
  lg: { height: 36, text: 'text-sm', padding: 'px-3.5', iconSize: 18 },
}

export const GAP_MAP: Record<ChipGap, string> = {
  sm: 'gap-2',
  md: 'gap-3',
  lg: 'gap-4',
}

export const ROUNDNESS_MAP: Record<ChipRoundness, string> = {
  md: 'rounded-lg',
  lg: 'rounded-xl',
  xl: 'rounded-2xl',
  full: 'rounded-full',
}

// ============================================================================
// HELPERS
// ============================================================================

const styleConfigCache = new WeakMap<Partial<StyleConfig>, StyleConfig>()

export function mergeStyleConfig(config?: Partial<StyleConfig>): StyleConfig {
  if (!config) return DEFAULT_STYLE_CONFIG
  const cached = styleConfigCache.get(config)
  if (cached) return cached
  const merged = { ...DEFAULT_STYLE_CONFIG, ...config }
  styleConfigCache.set(config, merged)
  return merged
}

export function getSizeConfig(size: ChipSize): SizeConfig {
  return SIZE_MAP[size]
}

export function getGapClass(gap: ChipGap): string {
  return GAP_MAP[gap]
}

export function getRoundnessClass(roundness: ChipRoundness): string {
  return ROUNDNESS_MAP[roundness]
}

// ============================================================================
// OPTIONS (for control panels)
// ============================================================================

export const SIZE_OPTIONS: Array<{ label: string; value: ChipSize }> = [
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
]

export const GAP_OPTIONS: Array<{ label: string; value: ChipGap }> = [
  { label: 'Small (8px)', value: 'sm' },
  { label: 'Medium (12px)', value: 'md' },
  { label: 'Large (16px)', value: 'lg' },
]

export const ROUNDNESS_OPTIONS: Array<{ label: string; value: ChipRoundness }> = [
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
  { label: 'XL', value: 'xl' },
  { label: 'Full (Pill)', value: 'full' },
]
