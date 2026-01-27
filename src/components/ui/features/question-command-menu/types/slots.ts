/**
 * Question Command Menu V4 - Slot Types
 *
 * Unified slot configuration for both top and bottom slots.
 * Adapted from V3 with minimal changes.
 */

import type { BackgroundOption, BorderColorOption, ShineOption } from './content'

// =============================================================================
// CORE TYPES
// =============================================================================

export type HeightMode = 'fixed' | 'dynamic' | 'auto'
export type ExpandOrigin = 'top' | 'center' | 'bottom'

// =============================================================================
// SLOT APPEARANCE
// =============================================================================

export interface SlotAppearanceConfig {
  background: BackgroundOption
  shine: ShineOption
  borderRadius: number
  inset: number
  borderWidth: number
  borderColor: BorderColorOption
}

// =============================================================================
// SLOT ANIMATION
// =============================================================================

export interface SlotAnimationConfig {
  /** Animation delay offset (ms) */
  delayOffset: number
  /** Animation duration offset (ms) */
  durationOffset: number
  /** Expansion origin */
  expandOrigin: ExpandOrigin
}

// =============================================================================
// SLOT SCROLL
// =============================================================================

export interface SlotScrollConfig {
  overflowGradient: boolean
  gradientHeight: number
  paddingTop: number
  paddingBottom: number
}

// =============================================================================
// UNIFIED SLOT CONFIG
// =============================================================================

/**
 * Single unified slot configuration for both top and bottom slots.
 */
export interface UnifiedSlotConfig {
  /** Whether this slot is enabled */
  enabled: boolean

  // Height settings
  heightMode: HeightMode
  fixedHeight?: number
  maxHeight?: number
  minHeight?: number

  /** Appearance settings */
  appearance: SlotAppearanceConfig

  /** Animation timing settings */
  animation: SlotAnimationConfig

  /** Scroll/overflow settings */
  scroll: SlotScrollConfig
}

// =============================================================================
// SLOTS CONFIG
// =============================================================================

export interface SlotsConfig {
  top: UnifiedSlotConfig
  bottom: UnifiedSlotConfig
}

// =============================================================================
// DEFAULT SLOT CONFIGS
// =============================================================================

export const DEFAULT_SLOT_APPEARANCE: SlotAppearanceConfig = {
  background: 'secondary',
  shine: 'none',
  borderRadius: 14,
  inset: 4,
  borderWidth: 1,
  borderColor: 'primary',
}

export const DEFAULT_SLOT_ANIMATION: SlotAnimationConfig = {
  delayOffset: 0,
  durationOffset: 0,
  expandOrigin: 'top',
}

export const DEFAULT_SLOT_SCROLL: SlotScrollConfig = {
  overflowGradient: true,
  gradientHeight: 24,
  paddingTop: 0,
  paddingBottom: 16,
}

export const DEFAULT_TOP_SLOT: UnifiedSlotConfig = {
  enabled: true,
  heightMode: 'fixed',
  fixedHeight: 48,
  maxHeight: 300,
  minHeight: 48,
  appearance: {
    ...DEFAULT_SLOT_APPEARANCE,
  },
  animation: {
    ...DEFAULT_SLOT_ANIMATION,
    durationOffset: -100,
    expandOrigin: 'bottom',
  },
  scroll: {
    ...DEFAULT_SLOT_SCROLL,
    paddingTop: 8,
    paddingBottom: 8,
  },
}

export const DEFAULT_BOTTOM_SLOT: UnifiedSlotConfig = {
  enabled: true,
  heightMode: 'dynamic',
  fixedHeight: 200,
  maxHeight: 340,
  minHeight: 100,
  appearance: {
    ...DEFAULT_SLOT_APPEARANCE,
  },
  animation: {
    ...DEFAULT_SLOT_ANIMATION,
    durationOffset: 100,
    expandOrigin: 'top',
  },
  scroll: {
    ...DEFAULT_SLOT_SCROLL,
  },
}
