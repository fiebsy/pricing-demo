"use strict";
/**
 * StickyDataTable - Skeleton Constants
 *
 * Default skeleton cell and config values.
 *
 * @module config/constants/skeleton
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_SKELETON_CONFIG = exports.DEFAULT_SKELETON_CELL = void 0;
// ============================================================================
// DEFAULT SKELETON CELL
// ============================================================================
/**
 * Default skeleton cell configuration
 */
exports.DEFAULT_SKELETON_CELL = {
    widthMode: 'auto',
    widthPercentage: 80,
    fixedWidth: 60,
    height: 16,
    borderRadius: 12,
};
// ============================================================================
// DEFAULT SKELETON CONFIG
// ============================================================================
/**
 * Default skeleton configuration
 */
exports.DEFAULT_SKELETON_CONFIG = {
    enabled: false,
    scope: 'rows-only',
    initialRowCount: 10,
    infiniteScrollRowCount: 5,
    headerCell: exports.DEFAULT_SKELETON_CELL,
    bodyCell: exports.DEFAULT_SKELETON_CELL,
    checkboxSize: 16,
    showToolbarSkeleton: true,
    showFilterSkeleton: true,
    showSearchSkeleton: false,
    showExportSkeleton: true,
    showColumnControlSkeleton: true,
    simulateStickyState: 'auto',
    enableShimmer: true,
    shimmerDuration: 1500,
};
//# sourceMappingURL=skeleton.js.map