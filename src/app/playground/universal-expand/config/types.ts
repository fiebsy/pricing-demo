/**
 * Universal Expand Playground - Type Definitions
 *
 * Flat config structure for UnifiedControlPanel integration.
 * Maps to UniversalExpandConfig for component rendering.
 */

import type {
  BackgroundOption,
  BorderColorOption,
  ShineOption,
  DimensionMode,
  ExpandOrigin,
  BackdropAnimationMode,
} from '@/components/ui/core/primitives/universal-expand'
import type { Background } from '@/components/ui/core/primitives/menu'

// =============================================================================
// APPEARANCE OPTIONS (for control panel)
// =============================================================================

/** Backdrop background (doesn't include 'none') */
export type BackdropBackgroundOption = Background

export type ShadowOption = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type BorderRadiusOption = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type GradientOption =
  | 'none'
  | 'subtle-depth-sm'
  | 'subtle-depth-md'
  | 'subtle-depth-lg'
  | 'subtle-depth-xl'
export type GradientColorOption =
  | 'brand'
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'gray'
  | 'gray-light'

// =============================================================================
// PLAYGROUND CONFIG INTERFACE
// =============================================================================

/**
 * Flat playground configuration.
 * All slot configs are flattened with prefixes (e.g., topEnabled, bottomBackground).
 */
export interface PlaygroundConfig {
  // -------------------------------------------------------------------------
  // Layout
  // -------------------------------------------------------------------------
  triggerWidth: number
  triggerHeight: number
  panelWidth: number
  borderRadius: number
  gapTop: number
  gapBottom: number
  gapLeft: number
  gapRight: number

  // -------------------------------------------------------------------------
  // Animation
  // -------------------------------------------------------------------------
  duration: number
  collapseDuration: number
  backdropMode: BackdropAnimationMode
  backdropDelay: number
  backdropDurationOffset: number
  animateSlotContainers: boolean
  slotContainerDelay: number
  slotContainerDurationOffset: number

  // -------------------------------------------------------------------------
  // Appearance (Backdrop)
  // -------------------------------------------------------------------------
  background: BackdropBackgroundOption
  backdropBorderRadius: BorderRadiusOption
  shadow: ShadowOption
  shine: ShineOption
  gradient: GradientOption
  gradientColor: GradientColorOption
  squircle: boolean

  // -------------------------------------------------------------------------
  // Top Slot
  // -------------------------------------------------------------------------
  topEnabled: boolean
  topDimensionMode: DimensionMode
  topFixedDimension: number
  topMaxDimension: number
  topMinDimension: number
  // Appearance
  topBackground: BackgroundOption
  topShine: ShineOption
  topBorderRadius: number
  topInset: number
  topBorderWidth: number
  topBorderColor: BorderColorOption
  // Animation
  topDelayOffset: number
  topDurationOffset: number
  topExpandOrigin: ExpandOrigin
  // Scroll
  topOverflowGradient: boolean
  topGradientHeight: number
  topPaddingTop: number
  topPaddingBottom: number

  // -------------------------------------------------------------------------
  // Bottom Slot
  // -------------------------------------------------------------------------
  bottomEnabled: boolean
  bottomDimensionMode: DimensionMode
  bottomFixedDimension: number
  bottomMaxDimension: number
  bottomMinDimension: number
  // Appearance
  bottomBackground: BackgroundOption
  bottomShine: ShineOption
  bottomBorderRadius: number
  bottomInset: number
  bottomBorderWidth: number
  bottomBorderColor: BorderColorOption
  // Animation
  bottomDelayOffset: number
  bottomDurationOffset: number
  bottomExpandOrigin: ExpandOrigin
  // Scroll
  bottomOverflowGradient: boolean
  bottomGradientHeight: number
  bottomPaddingTop: number
  bottomPaddingBottom: number

  // -------------------------------------------------------------------------
  // Left Slot
  // -------------------------------------------------------------------------
  leftEnabled: boolean
  leftDimensionMode: DimensionMode
  leftFixedDimension: number
  leftMaxDimension: number
  leftMinDimension: number
  // Appearance
  leftBackground: BackgroundOption
  leftShine: ShineOption
  leftBorderRadius: number
  leftInset: number
  leftBorderWidth: number
  leftBorderColor: BorderColorOption
  // Animation
  leftDelayOffset: number
  leftDurationOffset: number
  leftExpandOrigin: ExpandOrigin
  // Scroll
  leftOverflowGradient: boolean
  leftGradientHeight: number
  leftPaddingTop: number
  leftPaddingBottom: number

  // -------------------------------------------------------------------------
  // Right Slot
  // -------------------------------------------------------------------------
  rightEnabled: boolean
  rightDimensionMode: DimensionMode
  rightFixedDimension: number
  rightMaxDimension: number
  rightMinDimension: number
  // Appearance
  rightBackground: BackgroundOption
  rightShine: ShineOption
  rightBorderRadius: number
  rightInset: number
  rightBorderWidth: number
  rightBorderColor: BorderColorOption
  // Animation
  rightDelayOffset: number
  rightDurationOffset: number
  rightExpandOrigin: ExpandOrigin
  // Scroll
  rightOverflowGradient: boolean
  rightGradientHeight: number
  rightPaddingTop: number
  rightPaddingBottom: number

  // -------------------------------------------------------------------------
  // Trigger Slot
  // -------------------------------------------------------------------------
  triggerSlotEnabled: boolean
  triggerSlotBackground: BackgroundOption
  triggerSlotInset: number

  // -------------------------------------------------------------------------
  // Debug
  // -------------------------------------------------------------------------
  debug: boolean
}
