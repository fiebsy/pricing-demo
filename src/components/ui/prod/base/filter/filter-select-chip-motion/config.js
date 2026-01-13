"use strict";
/**
 * FilterSelectChipMotion - Configuration
 *
 * Default configuration, size mappings, and animation utilities.
 * Optimized for performance with memoized lookups and stable references.
 *
 * @module prod/base/filter/filter-select-chip-motion/config
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRESET_OPTIONS = exports.ROUNDNESS_OPTIONS = exports.GAP_OPTIONS = exports.SIZE_OPTIONS = exports.EASING_OPTIONS = exports.TRANSITION_TYPE_OPTIONS = exports.getPresetConfig = exports.buildLayoutTransition = exports.getRoundnessClass = exports.getGapClass = exports.getSizeConfig = exports.mergeStyleConfig = exports.mergeAnimationConfig = exports.ANIMATION_PRESETS = exports.EASING_CURVES = exports.ROUNDNESS_MAP = exports.GAP_MAP = exports.SIZE_MAP = exports.DEFAULT_STYLE_CONFIG = exports.DEFAULT_ANIMATION_CONFIG = void 0;
// ============================================================================
// DEFAULT CONFIGURATION
// ============================================================================
/**
 * Default animation configuration
 *
 * Optimized for smooth, fast transitions that feel responsive.
 * Tween with easeOut provides predictable timing.
 */
exports.DEFAULT_ANIMATION_CONFIG = {
    transitionType: 'tween',
    easing: 'easeOut',
    duration: 0.15,
    stagger: 0,
    entryDirection: 'right',
    entryDistance: 16,
    stiffness: 500,
    damping: 30,
    exitDuration: 0.05,
};
/**
 * Default style configuration
 */
exports.DEFAULT_STYLE_CONFIG = {
    gap: 'md',
    roundness: 'full',
    size: 'sm',
};
// ============================================================================
// SIZE MAPPINGS
// ============================================================================
exports.SIZE_MAP = {
    sm: { height: 28, text: 'text-xs', padding: 'px-2.5', iconSize: 14 },
    md: { height: 32, text: 'text-sm', padding: 'px-3', iconSize: 16 },
    lg: { height: 36, text: 'text-sm', padding: 'px-3.5', iconSize: 18 },
};
exports.GAP_MAP = {
    sm: 'gap-2',
    md: 'gap-3',
    lg: 'gap-4',
};
exports.ROUNDNESS_MAP = {
    md: 'rounded-lg',
    lg: 'rounded-xl',
    xl: 'rounded-2xl',
    full: 'rounded-full',
};
// ============================================================================
// EASING CURVES
// ============================================================================
/**
 * Cubic bezier curves for tween transitions.
 * Each curve is optimized for specific motion characteristics.
 */
exports.EASING_CURVES = {
    /** Standard ease out - smooth deceleration */
    easeOut: [0.33, 1, 0.68, 1],
    /** Symmetric ease in/out */
    easeInOut: [0.65, 0, 0.35, 1],
    /** Circular ease out - quick start, smooth end */
    circOut: [0, 0.55, 0.45, 1],
    /** Back ease out - slight overshoot */
    backOut: [0.34, 1.56, 0.64, 1],
    /** Anticipate - pullback before moving (Motion built-in) */
    anticipate: 'anticipate',
    /** Expo ease out - very punchy, snappy feel */
    expo: [0.16, 1, 0.3, 1],
};
exports.ANIMATION_PRESETS = {
    snappy: {
        transitionType: 'tween',
        easing: 'expo',
        duration: 0.12,
        exitDuration: 0.05,
    },
    smooth: {
        transitionType: 'tween',
        easing: 'easeOut',
        duration: 0.2,
        exitDuration: 0.1,
    },
    bouncy: {
        transitionType: 'spring',
        stiffness: 400,
        damping: 20,
        exitDuration: 0.08,
    },
    instant: {
        transitionType: 'tween',
        easing: 'easeOut',
        duration: 0.05,
        exitDuration: 0.02,
    },
};
// ============================================================================
// HELPERS
// ============================================================================
// Cache for merged configs to avoid object recreation
const animationConfigCache = new WeakMap();
const styleConfigCache = new WeakMap();
/**
 * Merge partial animation config with defaults.
 * Caches results for object identity stability.
 */
function mergeAnimationConfig(config) {
    if (!config)
        return exports.DEFAULT_ANIMATION_CONFIG;
    const cached = animationConfigCache.get(config);
    if (cached)
        return cached;
    const merged = { ...exports.DEFAULT_ANIMATION_CONFIG, ...config };
    animationConfigCache.set(config, merged);
    return merged;
}
exports.mergeAnimationConfig = mergeAnimationConfig;
/**
 * Merge partial style config with defaults.
 * Caches results for object identity stability.
 */
function mergeStyleConfig(config) {
    if (!config)
        return exports.DEFAULT_STYLE_CONFIG;
    const cached = styleConfigCache.get(config);
    if (cached)
        return cached;
    const merged = { ...exports.DEFAULT_STYLE_CONFIG, ...config };
    styleConfigCache.set(config, merged);
    return merged;
}
exports.mergeStyleConfig = mergeStyleConfig;
/**
 * Get size configuration for a given size preset
 */
function getSizeConfig(size) {
    return exports.SIZE_MAP[size];
}
exports.getSizeConfig = getSizeConfig;
/**
 * Get gap class for a given gap preset
 */
function getGapClass(gap) {
    return exports.GAP_MAP[gap];
}
exports.getGapClass = getGapClass;
/**
 * Get roundness class for a given roundness preset
 */
function getRoundnessClass(roundness) {
    return exports.ROUNDNESS_MAP[roundness];
}
exports.getRoundnessClass = getRoundnessClass;
// Cache for layout transitions (keyed by serialized config values)
const layoutTransitionCache = new Map();
/**
 * Build a Motion transition object based on animation config.
 * Returns either a spring or tween transition.
 * Caches results for identical configurations.
 */
function buildLayoutTransition(config) {
    // Create cache key from relevant config values
    const cacheKey = config.transitionType === 'spring'
        ? `spring-${config.stiffness}-${config.damping}`
        : `tween-${config.duration}-${config.easing}`;
    const cached = layoutTransitionCache.get(cacheKey);
    if (cached)
        return cached;
    const transition = config.transitionType === 'spring'
        ? {
            type: 'spring',
            stiffness: config.stiffness,
            damping: config.damping,
        }
        : {
            type: 'tween',
            duration: config.duration,
            ease: exports.EASING_CURVES[config.easing],
        };
    layoutTransitionCache.set(cacheKey, transition);
    return transition;
}
exports.buildLayoutTransition = buildLayoutTransition;
/**
 * Get animation config from a preset name
 */
function getPresetConfig(preset) {
    return mergeAnimationConfig(exports.ANIMATION_PRESETS[preset]);
}
exports.getPresetConfig = getPresetConfig;
// ============================================================================
// PLAYGROUND OPTIONS (for control panel dropdowns)
// ============================================================================
exports.TRANSITION_TYPE_OPTIONS = [
    { label: 'Tween (Duration)', value: 'tween' },
    { label: 'Spring (Physics)', value: 'spring' },
];
exports.EASING_OPTIONS = [
    { label: 'Ease Out', value: 'easeOut' },
    { label: 'Ease In-Out', value: 'easeInOut' },
    { label: 'Circ Out', value: 'circOut' },
    { label: 'Back Out (Overshoot)', value: 'backOut' },
    { label: 'Anticipate', value: 'anticipate' },
    { label: 'Expo (Punchy)', value: 'expo' },
];
exports.SIZE_OPTIONS = [
    { label: 'Small', value: 'sm' },
    { label: 'Medium', value: 'md' },
    { label: 'Large', value: 'lg' },
];
exports.GAP_OPTIONS = [
    { label: 'Small (8px)', value: 'sm' },
    { label: 'Medium (12px)', value: 'md' },
    { label: 'Large (16px)', value: 'lg' },
];
exports.ROUNDNESS_OPTIONS = [
    { label: 'Medium', value: 'md' },
    { label: 'Large', value: 'lg' },
    { label: 'XL', value: 'xl' },
    { label: 'Full (Pill)', value: 'full' },
];
exports.PRESET_OPTIONS = [
    { label: 'Snappy', value: 'snappy' },
    { label: 'Smooth', value: 'smooth' },
    { label: 'Bouncy', value: 'bouncy' },
    { label: 'Instant', value: 'instant' },
];
//# sourceMappingURL=config.js.map