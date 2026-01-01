/**
 * Filter Animation Constants
 *
 * Shared animation values for all filter components.
 * Single source of truth for easing curves and durations.
 *
 * @module base-ui/filter/constants/animation
 */

// ============================================================================
// Easing Curves
// ============================================================================

/** Expo ease-out - smooth deceleration, matches expanding-search */
export const EASING_EXPO_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)'

/** Standard ease-out for collapse animations */
export const EASING_EASE_OUT = 'ease-out'

// ============================================================================
// Durations
// ============================================================================

/** Default expand animation duration (ms) */
export const DURATION_EXPAND = 300

/** Fast collapse animation duration (ms) - snappy feel */
export const DURATION_COLLAPSE = 75

/** Fade-in animation duration for wrappers (ms) */
export const DURATION_FADE_IN = 200

/** Panel transition duration for menus (ms) */
export const DURATION_PANEL_TRANSITION = 250

// ============================================================================
// Ratios
// ============================================================================

/** Opacity fade speed as ratio of total duration (0.1 = 10%, 1.0 = 100%) */
export const OPACITY_FADE_RATIO = 0.2

/** Default opacity duration ratio for crossfade effects */
export const OPACITY_CROSSFADE_RATIO = 0.8
