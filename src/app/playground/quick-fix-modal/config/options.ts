/**
 * Quick Fix Modal - Control Options
 *
 * Options for the UnifiedControlPanel controls.
 *
 * @module playground/quick-fix-modal/config
 */

// Re-export base options
export * from '../../quick-fix-interactions/config/options'

// =============================================================================
// MODAL PREVIEW MODE OPTIONS
// =============================================================================

export const MODAL_PREVIEW_MODE_OPTIONS = [
  { label: 'Full Flow', value: 'full-flow' },
  { label: 'Sheet Stack', value: 'sheet-stack' },
  { label: 'Clip Path', value: 'clip-path' },
  { label: 'Island', value: 'island' },
  { label: 'Toast', value: 'toast' },
] as const

// =============================================================================
// MODAL SOLUTION OPTIONS
// =============================================================================

export const MODAL_SOLUTION_OPTIONS = [
  { label: 'Standalone', value: 'standalone' },
  { label: 'Edit Questions', value: 'edit-questions' },
  { label: 'Profile V3', value: 'profile-v3' },
] as const

// =============================================================================
// STACK DIRECTION OPTIONS
// =============================================================================

export const STACK_DIRECTION_OPTIONS = [
  { label: 'Up', value: 'up' },
  { label: 'Down', value: 'down' },
  { label: 'Left', value: 'left' },
  { label: 'Right', value: 'right' },
] as const

// =============================================================================
// EASING OPTIONS
// =============================================================================

export const EASING_OPTIONS = [
  { label: 'Expo Out', value: 'cubic-bezier(0.16, 1, 0.3, 1)' },
  { label: 'Standard', value: 'cubic-bezier(0.2, 0.8, 0.2, 1)' },
  { label: 'Snappy', value: 'cubic-bezier(0.2, 0, 0, 1)' },
  { label: 'Ease Out', value: 'ease-out' },
  { label: 'Ease In Out', value: 'ease-in-out' },
] as const
