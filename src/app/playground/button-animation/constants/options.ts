/**
 * ButtonAnimation Playground - Select Options
 *
 * Options for dropdown/select controls in the control panel.
 *
 * @module playground/button-animation/constants
 */

// =============================================================================
// EASE OPTIONS
// =============================================================================

export const EASE_OPTIONS = [
  { label: 'Spring', value: 'spring', description: 'Physics-based, natural motion' },
  { label: 'Ease Out', value: 'easeOut', description: 'Deceleration curve' },
  { label: 'Ease In', value: 'easeIn', description: 'Acceleration curve' },
  { label: 'Ease In/Out', value: 'easeInOut', description: 'Smooth start and end' },
  { label: 'Linear', value: 'linear', description: 'Constant velocity' },
]

// =============================================================================
// ORCHESTRATION OPTIONS
// =============================================================================

export const ORCHESTRATION_OPTIONS = [
  { label: 'Sync', value: 'sync', description: 'Parent and children animate together' },
  { label: 'Before Children', value: 'beforeChildren', description: 'Parent completes first' },
  { label: 'After Children', value: 'afterChildren', description: 'Children complete first' },
]

// =============================================================================
// ENTRY DIRECTION OPTIONS
// =============================================================================

export const ENTRY_DIRECTION_OPTIONS = [
  { label: 'Down', value: 'down', description: 'Enter from below' },
  { label: 'Up', value: 'up', description: 'Enter from above' },
  { label: 'Left', value: 'left', description: 'Enter from left' },
  { label: 'Right', value: 'right', description: 'Enter from right' },
  { label: 'None', value: 'none', description: 'Fade only' },
]

// =============================================================================
// ENTRY ORDER OPTIONS
// =============================================================================

export const ENTRY_ORDER_OPTIONS = [
  { label: 'Sequential', value: 'sequential', description: 'First to last' },
  { label: 'Reverse', value: 'reverse', description: 'Last to first' },
  { label: 'Center Out', value: 'center-out', description: 'Middle items first' },
]

// =============================================================================
// STAGGER DIRECTION OPTIONS
// =============================================================================

export const STAGGER_DIRECTION_OPTIONS = [
  { label: 'Forward', value: 'forward', description: 'Standard order' },
  { label: 'Reverse', value: 'reverse', description: 'Inverted order' },
]

// =============================================================================
// BUTTON VARIANT OPTIONS
// =============================================================================

export const BUTTON_VARIANT_OPTIONS = [
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Tertiary', value: 'tertiary' },
  { label: 'Shine', value: 'shine' },
  { label: 'Link Gray', value: 'link-gray' },
  { label: 'Link Color', value: 'link-color' },
  { label: 'Primary Destructive', value: 'primary-destructive' },
  { label: 'Secondary Destructive', value: 'secondary-destructive' },
  { label: 'Tertiary Destructive', value: 'tertiary-destructive' },
  { label: 'Link Destructive', value: 'link-destructive' },
]

// =============================================================================
// SIZE OPTIONS
// =============================================================================

export const SIZE_OPTIONS = [
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
  { label: 'Extra Large', value: 'xl' },
]

// =============================================================================
// ROUNDNESS OPTIONS
// =============================================================================

export const ROUNDNESS_OPTIONS = [
  { label: 'Default', value: 'default', description: 'Rounded corners' },
  { label: 'Pill', value: 'pill', description: 'Fully rounded' },
  { label: 'Squircle', value: 'squircle', description: 'Rounded with squircle' },
]

// =============================================================================
// GAP OPTIONS
// =============================================================================

export const GAP_OPTIONS = [
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
]
