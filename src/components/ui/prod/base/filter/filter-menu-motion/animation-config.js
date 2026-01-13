"use strict";
/**
 * FilterMenuMotion - Animation Configuration
 *
 * Default animation settings and utilities for Motion Dev integration.
 * Based on the Motion Dev + Base UI patterns from the documentation.
 *
 * @module prod/base/filter/filter-menu-motion/animation-config
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createItemVariants = exports.createPopupVariants = exports.getSlideTransition = exports.getHeightTransition = exports.getTimedTransition = exports.getMotionTransition = exports.EASE_OUT_EXPO = exports.DEFAULT_SIDE_OFFSET = exports.DEFAULT_WIDTH = exports.DEFAULT_MOTION_ANIMATION = exports.SCALE_ORIGIN_MAP = void 0;
// ============================================================================
// SCALE ORIGIN MAP
// ============================================================================
/**
 * Map scale origin values to CSS transform-origin strings.
 */
exports.SCALE_ORIGIN_MAP = {
    'top-left': 'top left',
    'top': 'top center',
    'top-right': 'top right',
    'left': 'left center',
    'center': 'center center',
    'right': 'right center',
    'bottom-left': 'bottom left',
    'bottom': 'bottom center',
    'bottom-right': 'bottom right',
};
// ============================================================================
// DEFAULT CONFIGURATION
// ============================================================================
/**
 * Default animation configuration.
 *
 * Designed for smooth, natural-feeling interactions:
 * - Timed easing for predictable motion
 * - Subtle scale and slide for reveal
 * - Height animation for panel transitions
 */
exports.DEFAULT_MOTION_ANIMATION = {
    // Reveal animation
    revealDuration: 200,
    revealScale: 0.4,
    revealSlideY: 8,
    // Spring physics
    useSpring: false,
    springStiffness: 400,
    springDamping: 30,
    // Panel transitions
    panelTransitionMode: 'slide',
    slideDuration: 300,
    slideOffset: 50,
    stripWidth: 200,
    panelExitScale: 0.86,
    panelEnterScale: 0.86,
    panelScaleOrigin: 'top-left',
    // Height animation
    animateHeight: true,
    heightDuration: 300,
    // Item animations
    enableItemFade: true,
    opacityDuration: 225,
    enableItemStagger: false,
    itemStagger: 30,
    enableCrossfade: true,
    panelCrossfadeDuration: 150,
};
// ============================================================================
// LAYOUT CONSTANTS
// ============================================================================
exports.DEFAULT_WIDTH = 240;
exports.DEFAULT_SIDE_OFFSET = 6;
// ============================================================================
// TRANSITION UTILITIES
// ============================================================================
/**
 * Standard easing curve (ease-out-expo equivalent).
 * Provides a smooth deceleration that feels natural.
 */
exports.EASE_OUT_EXPO = [0.16, 1, 0.3, 1];
/**
 * Get Motion transition configuration based on animation settings.
 *
 * Returns either spring physics or timed easing based on config.
 * This follows the Motion Dev pattern for flexible animation timing.
 */
function getMotionTransition(config, durationMs) {
    if (config.useSpring) {
        return {
            type: 'spring',
            stiffness: config.springStiffness,
            damping: config.springDamping,
        };
    }
    return {
        duration: durationMs / 1000,
        ease: exports.EASE_OUT_EXPO,
    };
}
exports.getMotionTransition = getMotionTransition;
/**
 * Get timed transition (non-spring).
 * Useful for opacity and other non-spatial animations.
 */
function getTimedTransition(durationMs, delayMs = 0) {
    return {
        duration: durationMs / 1000,
        delay: delayMs / 1000,
        ease: exports.EASE_OUT_EXPO,
    };
}
exports.getTimedTransition = getTimedTransition;
/**
 * Get height animation transition.
 * Always uses timed easing for predictable height changes.
 */
function getHeightTransition(config) {
    return {
        duration: config.heightDuration / 1000,
        ease: exports.EASE_OUT_EXPO,
    };
}
exports.getHeightTransition = getHeightTransition;
/**
 * Get panel slide transition.
 */
function getSlideTransition(config) {
    return {
        duration: config.slideDuration / 1000,
        ease: exports.EASE_OUT_EXPO,
    };
}
exports.getSlideTransition = getSlideTransition;
// ============================================================================
// VARIANT FACTORIES
// ============================================================================
/**
 * Create popup reveal variants for AnimatePresence.
 *
 * Uses the pattern from Base UI animation documentation:
 * - Scale from origin point
 * - Subtle vertical slide
 * - Opacity fade
 */
function createPopupVariants(config, side = 'bottom') {
    const slideDirection = side === 'bottom' ? -1 : 1;
    return {
        hidden: {
            opacity: 0,
            scale: config.revealScale,
            y: slideDirection * config.revealSlideY,
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
        },
        exit: {
            opacity: 0,
            scale: config.revealScale,
            y: slideDirection * config.revealSlideY,
        },
    };
}
exports.createPopupVariants = createPopupVariants;
/**
 * Create menu item variants for staggered animation.
 *
 * Based on the Motion Dev patterns documentation:
 * - Parent controls stagger timing via staggerChildren
 * - Items animate opacity and x position
 */
function createItemVariants(isSubmenu = false) {
    const xOffset = isSubmenu ? -15 : 15;
    return {
        hidden: { opacity: 0, x: xOffset },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: xOffset },
    };
}
exports.createItemVariants = createItemVariants;
//# sourceMappingURL=animation-config.js.map