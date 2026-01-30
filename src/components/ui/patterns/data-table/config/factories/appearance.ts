/**
 * StickyDataTable - Appearance Factories
 *
 * Factory functions for creating border, background, and sticky state configs.
 *
 * @module config/factories/appearance
 */

import type { BorderConfig, BackgroundConfig, StickyState } from '../../types'
import {
  DEFAULT_BORDER_CONFIG,
  DEFAULT_BACKGROUND_CONFIG,
} from '../constants'

// ============================================================================
// BORDER CONFIG FACTORY
// ============================================================================

/**
 * Create merged border config with defaults
 */
export function createBorderConfig(overrides?: Partial<BorderConfig>): BorderConfig {
  return {
    ...DEFAULT_BORDER_CONFIG,
    ...overrides,
    hideCellBordersForColumns:
      overrides?.hideCellBordersForColumns ?? DEFAULT_BORDER_CONFIG.hideCellBordersForColumns,
  }
}

// ============================================================================
// BACKGROUND CONFIG FACTORY
// ============================================================================

/**
 * Create merged background config with defaults
 */
export function createBackgroundConfig(overrides?: Partial<BackgroundConfig>): BackgroundConfig {
  return {
    ...DEFAULT_BACKGROUND_CONFIG,
    ...overrides,
  }
}

// ============================================================================
// STICKY STATE FACTORIES
// ============================================================================

/**
 * Create StickyState from scroll state
 */
export function createStickyState(canScrollLeft: boolean, canScrollRight: boolean): StickyState {
  const hasArrows = canScrollLeft || canScrollRight
  return {
    showLeftArrow: canScrollLeft,
    showRightArrow: canScrollRight,
    hasArrows,
    useEnhancedStyling: hasArrows,
  }
}

/**
 * Create initial sticky state (no scrolling)
 */
export function createInitialStickyState(): StickyState {
  return {
    showLeftArrow: false,
    showRightArrow: false,
    hasArrows: false,
    useEnhancedStyling: false,
  }
}
