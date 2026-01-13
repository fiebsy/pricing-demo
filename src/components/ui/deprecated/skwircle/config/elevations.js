"use strict";
/**
 * Skwircle Elevation Configuration
 *
 * Shadow presets for elevation levels.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasVisibleShadow = exports.getElevationConfig = exports.ELEVATION_CONFIGS = void 0;
/**
 * Shadow configurations for elevation presets.
 *
 * Note: Only xs and sm are available - larger shadows get clipped
 * by parent containers.
 */
exports.ELEVATION_CONFIGS = {
    none: {
        offsetX: 0,
        offsetY: 0,
        blur: 0,
        spread: 0,
        color: 'black',
        opacity: 0,
    },
    xs: {
        offsetX: 0,
        offsetY: 2,
        blur: 2,
        spread: 0,
        color: 'black',
        opacity: 0.09,
    },
    sm: {
        offsetX: 0,
        offsetY: 2,
        blur: 4,
        spread: 0,
        color: 'black',
        opacity: 0.08,
    },
};
/**
 * Get shadow configuration for an elevation level.
 */
const getElevationConfig = (elevation) => {
    return exports.ELEVATION_CONFIGS[elevation];
};
exports.getElevationConfig = getElevationConfig;
/**
 * Check if elevation has a visible shadow.
 */
const hasVisibleShadow = (elevation) => {
    return exports.ELEVATION_CONFIGS[elevation].opacity > 0;
};
exports.hasVisibleShadow = hasVisibleShadow;
//# sourceMappingURL=elevations.js.map