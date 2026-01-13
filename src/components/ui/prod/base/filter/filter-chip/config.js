"use strict";
/**
 * Filter Chip - Configuration
 *
 * @module prod/base/filter/filter-chip/config
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSizeConfig = exports.mergeConfig = exports.DEFAULT_CONFIG = exports.ROUNDED_CLASSES = exports.SIZE_CONFIGS = exports.OPACITY_FADE_RATIO = exports.DURATION_COLLAPSE = exports.DURATION_EXPAND = exports.EASING_EXPO_OUT = void 0;
// ============================================================================
// Animation Constants
// ============================================================================
exports.EASING_EXPO_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)';
exports.DURATION_EXPAND = 300;
exports.DURATION_COLLAPSE = 75;
exports.OPACITY_FADE_RATIO = 0.2;
exports.SIZE_CONFIGS = {
    xs: { height: 24, paddingX: 8, textClass: 'text-xs', iconSize: 12, closeSize: 12 },
    sm: { height: 28, paddingX: 10, textClass: 'text-xs', iconSize: 14, closeSize: 14 },
    md: { height: 32, paddingX: 12, textClass: 'text-sm', iconSize: 16, closeSize: 16 },
    lg: { height: 36, paddingX: 14, textClass: 'text-sm', iconSize: 18, closeSize: 18 },
};
exports.ROUNDED_CLASSES = {
    sm: 'rounded-md',
    md: 'rounded-lg',
    lg: 'rounded-xl',
    full: 'rounded-full',
};
// ============================================================================
// Default Configuration
// ============================================================================
exports.DEFAULT_CONFIG = {
    size: 'md',
    rounded: 'full',
    iconSize: 14,
    closeSize: 16,
    duration: 200,
    revealMode: 'fade',
    opacityFadeRatio: exports.OPACITY_FADE_RATIO,
    iconOpacity: 0.5,
    iconValueGap: 4,
    valueCloseGap: 10,
    paddingLeft: 8,
    paddingRight: 6,
};
// ============================================================================
// Helpers
// ============================================================================
function mergeConfig(config) {
    return { ...exports.DEFAULT_CONFIG, ...config };
}
exports.mergeConfig = mergeConfig;
function getSizeConfig(size) {
    return exports.SIZE_CONFIGS[size];
}
exports.getSizeConfig = getSizeConfig;
//# sourceMappingURL=config.js.map