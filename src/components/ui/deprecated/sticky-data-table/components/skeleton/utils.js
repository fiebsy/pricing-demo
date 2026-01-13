"use strict";
/**
 * Skeleton Utilities
 *
 * Width calculation and default configurations for skeleton cells.
 *
 * @module skeleton/utils
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateSkeletonWidth = exports.DEFAULT_BODY_CELL_CONFIG = exports.DEFAULT_HEADER_CELL_CONFIG = exports.TOOLBAR_MARGIN = exports.TOOLBAR_HEIGHT = void 0;
const config_1 = require("../../config");
// ============================================================================
// CONSTANTS
// ============================================================================
exports.TOOLBAR_HEIGHT = config_1.TABLE_CONFIG.TOOLBAR_HEIGHT;
exports.TOOLBAR_MARGIN = config_1.TABLE_CONFIG.TOOLBAR_MARGIN;
// ============================================================================
// DEFAULT CELL CONFIGURATIONS
// ============================================================================
/**
 * Default cell configurations (used when no config provided)
 */
exports.DEFAULT_HEADER_CELL_CONFIG = {
    widthMode: 'auto',
    widthPercentage: 80,
    fixedWidth: 60,
    height: 16,
    borderRadius: 12,
};
exports.DEFAULT_BODY_CELL_CONFIG = {
    widthMode: 'auto',
    widthPercentage: 80,
    fixedWidth: 60,
    height: 16,
    borderRadius: 12,
};
// ============================================================================
// WIDTH CALCULATION
// ============================================================================
/**
 * Calculate skeleton width based on cell config and column width
 */
function calculateSkeletonWidth(column, cellConfig) {
    const columnWidth = column.minWidth ?? column.width;
    const padding = 32; // Cell padding (16px each side)
    const availableWidth = columnWidth - padding;
    switch (cellConfig.widthMode) {
        case 'percentage':
            // Use percentage of available space (column width minus padding)
            return Math.max(availableWidth * (cellConfig.widthPercentage / 100), 20);
        case 'fixed':
            // Use fixed width, but cap at available space
            return Math.min(cellConfig.fixedWidth, availableWidth);
        case 'auto':
        default:
            // Auto: use percentage (80%) of available space, capped at max 120px
            // This prevents wide sticky columns from having oversized skeletons
            const autoWidth = availableWidth * 0.8;
            return Math.min(Math.max(autoWidth, 40), 120);
    }
}
exports.calculateSkeletonWidth = calculateSkeletonWidth;
//# sourceMappingURL=utils.js.map