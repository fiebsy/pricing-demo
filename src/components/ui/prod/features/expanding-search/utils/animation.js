"use strict";
/**
 * Expanding Search - Animation Utilities
 *
 * Pure functions for calculating animation timing and opacity transitions.
 *
 * @module expanding-search/utils/animation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnimationStyles = exports.getContainerTransition = exports.getContentTransition = exports.getContentOpacity = void 0;
const config_1 = require("../config");
// ============================================================================
// Animation Calculations
// ============================================================================
/**
 * Calculate content opacity based on reveal mode and animation state
 */
function getContentOpacity(state, revealMode) {
    if (!state.isExpanded)
        return 0;
    if (revealMode === 'sync')
        return state.animationComplete ? 1 : 0;
    return 1;
}
exports.getContentOpacity = getContentOpacity;
/**
 * Calculate content transition CSS based on reveal/hide modes
 */
function getContentTransition(state, config) {
    const { duration, collapseDuration, revealMode, hideMode } = config;
    // Close transition based on hideMode
    if (!state.isExpanded) {
        switch (hideMode) {
            case 'instant':
                return 'opacity 0ms linear';
            case 'immediate':
                return `opacity ${collapseDuration}ms ${config_1.EASING}`;
            case 'fade':
            default:
                return `opacity ${collapseDuration}ms ease-out`;
        }
    }
    // Open transition based on revealMode
    switch (revealMode) {
        case 'immediate':
            return `opacity ${duration}ms ${config_1.EASING}`;
        case 'fade':
            return `opacity ${duration * config_1.OPACITY_FADE_RATIO}ms ${config_1.EASING} ${duration * (1 - config_1.OPACITY_FADE_RATIO)}ms`;
        case 'delay':
            return `opacity 1ms linear ${duration}ms`;
        case 'sync':
            return 'opacity 1ms linear';
        default:
            return `opacity ${duration * config_1.OPACITY_FADE_RATIO}ms ${config_1.EASING}`;
    }
}
exports.getContentTransition = getContentTransition;
/**
 * Build container width transition string
 */
function getContainerTransition(duration) {
    return `width ${duration}ms ${config_1.EASING}`;
}
exports.getContainerTransition = getContainerTransition;
/**
 * Calculate all animation styles at once
 */
function getAnimationStyles(state, config) {
    return {
        containerTransition: getContainerTransition(config.duration),
        contentOpacity: getContentOpacity(state, config.revealMode),
        contentTransition: getContentTransition(state, config),
    };
}
exports.getAnimationStyles = getAnimationStyles;
//# sourceMappingURL=animation.js.map