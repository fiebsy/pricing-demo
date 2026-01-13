"use strict";
/**
 * Metric Tile Configuration
 *
 * Default styling and size configurations for dashboard metric tiles.
 * These wrap Skwircle.Card with dashboard-optimized defaults.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChangeTypeColor = exports.getMetricTileSizeConfig = exports.CHANGE_TYPE_COLORS = exports.METRIC_TILE_DEFAULTS = exports.METRIC_TILE_SIZE_CONFIGS = void 0;
exports.METRIC_TILE_SIZE_CONFIGS = {
    sm: {
        padding: 'p-4',
        labelClass: 'text-xs font-medium',
        valueClass: 'text-xl font-semibold',
        changeClass: 'text-xs font-medium',
        periodClass: 'text-[10px]',
        valueGap: 'mt-1.5',
        changeGap: 'gap-1',
    },
    md: {
        padding: 'p-5',
        labelClass: 'text-xs font-medium',
        valueClass: 'text-2xl font-semibold',
        changeClass: 'text-sm font-medium',
        periodClass: 'text-xs',
        valueGap: 'mt-2',
        changeGap: 'gap-1.5',
    },
    lg: {
        padding: 'p-6',
        labelClass: 'text-sm font-medium',
        valueClass: 'text-3xl font-semibold',
        changeClass: 'text-sm font-medium',
        periodClass: 'text-xs',
        valueGap: 'mt-3',
        changeGap: 'gap-2',
    },
};
/**
 * Default Skwircle.Card props for metric tiles.
 * GAN2 Configuration - Updated 2026-01-02
 */
exports.METRIC_TILE_DEFAULTS = {
    elevation: 'none',
    roundness: 'rounded',
    borderWidth: 1,
    backgroundGradient: undefined, // GAN2: depthIntensity 'none'
};
exports.CHANGE_TYPE_COLORS = {
    positive: 'text-success-primary',
    negative: 'text-error-primary',
    neutral: 'text-tertiary',
};
// =============================================================================
// HELPER FUNCTIONS
// =============================================================================
const getMetricTileSizeConfig = (size) => {
    return exports.METRIC_TILE_SIZE_CONFIGS[size];
};
exports.getMetricTileSizeConfig = getMetricTileSizeConfig;
const getChangeTypeColor = (type) => {
    return exports.CHANGE_TYPE_COLORS[type];
};
exports.getChangeTypeColor = getChangeTypeColor;
//# sourceMappingURL=metric-tile-config.js.map