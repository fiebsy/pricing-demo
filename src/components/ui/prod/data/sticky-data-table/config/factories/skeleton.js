"use strict";
/**
 * StickyDataTable - Skeleton Factories
 *
 * Factory functions for creating skeleton configurations.
 *
 * @module config/factories/skeleton
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSkeletonConfig = exports.createSkeletonDimensionConfig = void 0;
const constants_1 = require("../constants");
// ============================================================================
// SKELETON DIMENSION CONFIG FACTORY
// ============================================================================
/**
 * Create skeleton dimension configuration
 */
function createSkeletonDimensionConfig(overrides) {
    return {
        toolbar: overrides?.toolbar ?? {
            showToolbar: false,
            showLeftToolbar: false,
            showRightToolbar: false,
            showExportButton: false,
            showColumnControl: false,
            showCount: false,
            activeFilterCount: 0,
        },
        rowHeight: overrides?.rowHeight ?? constants_1.TABLE_CONFIG.ROW_HEIGHT,
        headerHeight: overrides?.headerHeight ?? constants_1.TABLE_CONFIG.HEADER_HEIGHT,
        headerGap: overrides?.headerGap ?? constants_1.TABLE_CONFIG.HEADER_GAP,
        borderRadius: overrides?.borderRadius ?? constants_1.TABLE_CONFIG.DEFAULT_BORDER_RADIUS,
    };
}
exports.createSkeletonDimensionConfig = createSkeletonDimensionConfig;
// ============================================================================
// SKELETON CONFIG FACTORY
// ============================================================================
/**
 * Create skeleton configuration with overrides
 */
function createSkeletonConfig(overrides) {
    return {
        ...constants_1.DEFAULT_SKELETON_CONFIG,
        ...overrides,
        headerCell: {
            ...constants_1.DEFAULT_SKELETON_CELL,
            ...overrides?.headerCell,
        },
        bodyCell: {
            ...constants_1.DEFAULT_SKELETON_CELL,
            ...overrides?.bodyCell,
        },
    };
}
exports.createSkeletonConfig = createSkeletonConfig;
//# sourceMappingURL=skeleton.js.map