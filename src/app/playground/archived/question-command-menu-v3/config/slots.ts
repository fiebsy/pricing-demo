/**
 * Question Command Menu V3 - Unified Slot Configuration
 *
 * Single slot config type used for BOTH top and bottom slots.
 * This eliminates ~80% duplication from V2's separate TopSlotConfig/BottomSlotConfig.
 */

import type {
  BackgroundOption,
  BorderColorOption,
  ShineOption,
} from './content-types'

// ============================================================================
// CORE TYPES
// ============================================================================

export type HeightMode = 'fixed' | 'dynamic' | 'auto'
export type ExpandOrigin = 'top' | 'center' | 'bottom'

// ============================================================================
// SLOT APPEARANCE CONFIG
// ============================================================================

export interface SlotAppearanceConfig {
  /** Background option */
  background: BackgroundOption
  /** Shine effect */
  shine: ShineOption
  /** Border radius */
  borderRadius: number
  /** Inset from container edges */
  inset: number
  /** Border width */
  borderWidth: number
  /** Border color */
  borderColor: BorderColorOption
}

// ============================================================================
// SLOT ANIMATION CONFIG
// ============================================================================

export interface SlotAnimationConfig {
  /** Animation delay offset (ms) */
  delayOffset: number
  /** Animation duration offset (ms) */
  durationOffset: number
  /** Expansion origin */
  expandOrigin: ExpandOrigin
}

// ============================================================================
// SLOT SCROLL CONFIG
// ============================================================================

export interface SlotScrollConfig {
  /** Show overflow gradient */
  overflowGradient: boolean
  /** Overflow gradient height */
  gradientHeight: number
  /** Scroll padding top */
  paddingTop: number
  /** Scroll padding bottom */
  paddingBottom: number
}

// ============================================================================
// UNIFIED SLOT CONFIG
// ============================================================================

/**
 * Single unified slot configuration used for BOTH top and bottom slots.
 * All properties are the same - no more separate TopSlotConfig/BottomSlotConfig.
 */
export interface UnifiedSlotConfig {
  /** Whether this slot is enabled */
  enabled: boolean

  // Height settings
  /** Height calculation mode */
  heightMode: HeightMode
  /** Fixed height when mode = 'fixed' (px) */
  fixedHeight?: number
  /** Maximum height when mode = 'dynamic' (px) */
  maxHeight?: number
  /** Minimum height when mode = 'dynamic' (px) */
  minHeight?: number

  /** Appearance settings */
  appearance: SlotAppearanceConfig

  /** Animation timing settings */
  animation: SlotAnimationConfig

  /** Scroll/overflow settings */
  scroll: SlotScrollConfig
}

// ============================================================================
// SLOTS CONFIG (both slots together)
// ============================================================================

export interface SlotsConfig {
  top: UnifiedSlotConfig
  bottom: UnifiedSlotConfig
}

// ============================================================================
// DEFAULT SLOT CONFIGS
// ============================================================================

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
    expandOrigin: 'bottom', // Expands upward (away from trigger)
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
    expandOrigin: 'top', // Expands downward (away from trigger)
  },
  scroll: {
    ...DEFAULT_SLOT_SCROLL,
  },
}
