/**
 * StickyDataTable - Filter Factories
 *
 * Factory functions for creating filter configurations.
 *
 * @module config/factories/filter
 */

import type { MenuAppearance } from '@/components/ui/prod/base/menu'
import type { FilterMenuConfig, FilterToolbarConfig } from '../constants'
import {
  DEFAULT_FILTER_MENU,
  DEFAULT_FILTER_TRIGGER,
  DEFAULT_FILTER_PILL,
} from '../constants'

// ============================================================================
// MENU APPEARANCE CONVERTER
// ============================================================================

/**
 * Convert FilterMenuConfig to PROD MenuAppearance
 * Used internally by FilterToolbar
 *
 * Only includes properties that are explicitly set in the config.
 * Returns undefined if no appearance overrides are specified,
 * allowing Menu to use its DEFAULT_APPEARANCE.
 */
export function toMenuAppearanceConfig(config: FilterMenuConfig): MenuAppearance | undefined {
  const appearance: MenuAppearance = {}
  let hasOverrides = false

  if (config.borderRadius !== undefined) {
    appearance.borderRadius = config.borderRadius
    hasOverrides = true
  }
  if (config.shadow !== undefined) {
    appearance.shadow = config.shadow
    hasOverrides = true
  }
  if (config.shine !== undefined) {
    appearance.shine = config.shine
    hasOverrides = true
  }
  if (config.squircle !== undefined) {
    appearance.squircle = config.squircle
    hasOverrides = true
  }
  if (config.background !== undefined) {
    appearance.background = config.background
    hasOverrides = true
  }
  if (config.gradient !== undefined) {
    appearance.gradient = config.gradient
    hasOverrides = true
  }
  if (config.gradientColor !== undefined) {
    appearance.gradientColor = config.gradientColor
    hasOverrides = true
  }

  return hasOverrides ? appearance : undefined
}

// ============================================================================
// FILTER CONFIG FACTORY
// ============================================================================

/**
 * Create filter config with partial overrides
 */
export function createFilterConfig(overrides?: Partial<FilterToolbarConfig>): FilterToolbarConfig {
  return {
    menu: { ...DEFAULT_FILTER_MENU, ...overrides?.menu },
    trigger: { ...DEFAULT_FILTER_TRIGGER, ...overrides?.trigger },
    pill: { ...DEFAULT_FILTER_PILL, ...overrides?.pill },
  }
}

/**
 * Merge filter config with defaults
 * Deep merges each section independently
 */
export function mergeFilterConfig(
  base: FilterToolbarConfig,
  overrides?: Partial<FilterToolbarConfig>
): FilterToolbarConfig {
  if (!overrides) return base

  return {
    menu: { ...base.menu, ...overrides.menu },
    trigger: { ...base.trigger, ...overrides.trigger },
    pill: { ...base.pill, ...overrides.pill },
  }
}
