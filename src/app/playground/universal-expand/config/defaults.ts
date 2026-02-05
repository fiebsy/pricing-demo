/**
 * Universal Expand Playground - Default Configuration
 *
 * Default values derived from DEFAULT_UNIVERSAL_EXPAND_CONFIG.
 */

import type { PlaygroundConfig } from './types'

/**
 * Default playground configuration.
 * Values match the component's DEFAULT_UNIVERSAL_EXPAND_CONFIG.
 */
export const DEFAULT_PLAYGROUND_CONFIG: PlaygroundConfig = {
  // -------------------------------------------------------------------------
  // Layout
  // -------------------------------------------------------------------------
  triggerWidth: 240,
  triggerHeight: 40,
  panelWidth: 340,
  borderRadius: 18,
  gapTop: 0,
  gapBottom: 12,
  gapLeft: 8,
  gapRight: 8,

  // -------------------------------------------------------------------------
  // Animation
  // -------------------------------------------------------------------------
  duration: 350,
  collapseDuration: 125,
  backdropMode: 'size',
  backdropDelay: 0,
  backdropDurationOffset: 0,
  animateSlotContainers: true,
  slotContainerDelay: 0,
  slotContainerDurationOffset: 100,

  // -------------------------------------------------------------------------
  // Appearance (Backdrop)
  // -------------------------------------------------------------------------
  background: 'tertiary',
  backdropBorderRadius: '2xl',
  shadow: '2xl',
  shine: 'shine-2-subtle',
  gradient: 'subtle-depth-md',
  gradientColor: 'tertiary',
  squircle: true,

  // -------------------------------------------------------------------------
  // Top Slot
  // -------------------------------------------------------------------------
  topEnabled: false,
  topDimensionMode: 'fixed',
  topFixedDimension: 48,
  topMaxDimension: 300,
  topMinDimension: 48,
  // Appearance
  topBackground: 'secondary',
  topShine: 'none',
  topBorderRadius: 14,
  topInset: 4,
  topBorderWidth: 1,
  topBorderColor: 'primary',
  // Animation
  topDelayOffset: 0,
  topDurationOffset: -100,
  topExpandOrigin: 'end',
  // Scroll
  topOverflowGradient: true,
  topGradientHeight: 24,
  topPaddingTop: 8,
  topPaddingBottom: 8,

  // -------------------------------------------------------------------------
  // Bottom Slot (enabled by default)
  // -------------------------------------------------------------------------
  bottomEnabled: true,
  bottomDimensionMode: 'dynamic',
  bottomFixedDimension: 200,
  bottomMaxDimension: 340,
  bottomMinDimension: 100,
  // Appearance
  bottomBackground: 'secondary',
  bottomShine: 'none',
  bottomBorderRadius: 14,
  bottomInset: 4,
  bottomBorderWidth: 1,
  bottomBorderColor: 'primary',
  // Animation
  bottomDelayOffset: 0,
  bottomDurationOffset: 100,
  bottomExpandOrigin: 'start',
  // Scroll
  bottomOverflowGradient: true,
  bottomGradientHeight: 24,
  bottomPaddingTop: 0,
  bottomPaddingBottom: 16,

  // -------------------------------------------------------------------------
  // Left Slot
  // -------------------------------------------------------------------------
  leftEnabled: false,
  leftDimensionMode: 'fixed',
  leftFixedDimension: 200,
  leftMaxDimension: 400,
  leftMinDimension: 100,
  // Appearance
  leftBackground: 'secondary',
  leftShine: 'none',
  leftBorderRadius: 14,
  leftInset: 4,
  leftBorderWidth: 1,
  leftBorderColor: 'primary',
  // Animation
  leftDelayOffset: 0,
  leftDurationOffset: -50,
  leftExpandOrigin: 'end',
  // Scroll
  leftOverflowGradient: true,
  leftGradientHeight: 24,
  leftPaddingTop: 0,
  leftPaddingBottom: 16,

  // -------------------------------------------------------------------------
  // Right Slot
  // -------------------------------------------------------------------------
  rightEnabled: false,
  rightDimensionMode: 'fixed',
  rightFixedDimension: 200,
  rightMaxDimension: 400,
  rightMinDimension: 100,
  // Appearance
  rightBackground: 'secondary',
  rightShine: 'none',
  rightBorderRadius: 14,
  rightInset: 4,
  rightBorderWidth: 1,
  rightBorderColor: 'primary',
  // Animation
  rightDelayOffset: 0,
  rightDurationOffset: -50,
  rightExpandOrigin: 'start',
  // Scroll
  rightOverflowGradient: true,
  rightGradientHeight: 24,
  rightPaddingTop: 0,
  rightPaddingBottom: 16,

  // -------------------------------------------------------------------------
  // Trigger Slot
  // -------------------------------------------------------------------------
  triggerSlotEnabled: true,
  triggerSlotBackground: 'none',
  triggerSlotInset: 0,

  // -------------------------------------------------------------------------
  // Debug
  // -------------------------------------------------------------------------
  debug: false,
}
