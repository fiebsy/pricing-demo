"use strict";
/**
 * Filter Animation Constants
 *
 * Shared animation values for all filter components.
 * Single source of truth for easing curves and durations.
 *
 * @module base-ui/filter/constants/animation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OPACITY_CROSSFADE_RATIO = exports.OPACITY_FADE_RATIO = exports.DURATION_PANEL_TRANSITION = exports.DURATION_FADE_IN = exports.DURATION_COLLAPSE = exports.DURATION_EXPAND = exports.EASING_EASE_OUT = exports.EASING_EXPO_OUT = void 0;
// ============================================================================
// Easing Curves
// ============================================================================
/** Expo ease-out - smooth deceleration, matches expanding-search */
exports.EASING_EXPO_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)';
/** Standard ease-out for collapse animations */
exports.EASING_EASE_OUT = 'ease-out';
// ============================================================================
// Durations
// ============================================================================
/** Default expand animation duration (ms) */
exports.DURATION_EXPAND = 300;
/** Fast collapse animation duration (ms) - snappy feel */
exports.DURATION_COLLAPSE = 75;
/** Fade-in animation duration for wrappers (ms) */
exports.DURATION_FADE_IN = 200;
/** Panel transition duration for menus (ms) */
exports.DURATION_PANEL_TRANSITION = 250;
// ============================================================================
// Ratios
// ============================================================================
/** Opacity fade speed as ratio of total duration (0.1 = 10%, 1.0 = 100%) */
exports.OPACITY_FADE_RATIO = 0.2;
/** Default opacity duration ratio for crossfade effects */
exports.OPACITY_CROSSFADE_RATIO = 0.8;
//# sourceMappingURL=animation.js.map