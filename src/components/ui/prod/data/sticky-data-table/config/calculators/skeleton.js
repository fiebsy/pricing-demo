"use strict";
/**
 * StickyDataTable - Skeleton Calculators
 *
 * Pure calculation functions for skeleton dimensions.
 *
 * @module config/calculators/skeleton
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateSkeletonHeight = void 0;
const constants_1 = require("../constants");
const toolbar_1 = require("./toolbar");
// ============================================================================
// SKELETON HEIGHT
// ============================================================================
/**
 * Calculate total skeleton height for perfect layout sync
 *
 * @param config - Skeleton dimension configuration
 * @param rowCount - Number of skeleton rows to display
 * @param toolbarLayout - Optional toolbar layout for accurate toolbar height calculation
 * @returns Total height in pixels
 */
function calculateSkeletonHeight(config, rowCount, toolbarLayout) {
    // Pass toolbarLayout for accurate margin/padding calculation
    const toolbarHeight = (0, toolbar_1.calculateToolbarHeight)(config.toolbar, toolbarLayout);
    const headerHeight = config.headerHeight ?? constants_1.TABLE_CONFIG.HEADER_HEIGHT;
    const rowHeight = config.rowHeight ?? constants_1.TABLE_CONFIG.ROW_HEIGHT;
    const bodyHeight = rowCount * rowHeight;
    // For integrated toolbar, the toolbar height is part of the sticky header area
    // so we don't add it to document flow height
    const isIntegrated = toolbarLayout?.position === 'integrated';
    const effectiveToolbarHeight = isIntegrated ? 0 : toolbarHeight;
    // Note: Header gap is NOT included because it's handled by sticky positioning
    // (top: HEADER_GAP) rather than document flow
    return effectiveToolbarHeight + headerHeight + bodyHeight;
}
exports.calculateSkeletonHeight = calculateSkeletonHeight;
//# sourceMappingURL=skeleton.js.map