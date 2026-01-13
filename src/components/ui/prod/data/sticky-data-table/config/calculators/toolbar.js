"use strict";
/**
 * StickyDataTable - Toolbar Calculators
 *
 * Pure calculation functions for toolbar dimensions.
 *
 * @module config/calculators/toolbar
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateToolbarHeight = exports.calculateIntegratedHeaderGap = void 0;
const constants_1 = require("../constants");
// ============================================================================
// INTEGRATED HEADER GAP
// ============================================================================
/**
 * Calculate the total header gap when toolbar is integrated
 * This is the distance from the top of the viewport to the table header row
 *
 * Structure when integrated:
 * [top padding] + [toolbar height] + [gap to header] = total sticky area above header
 */
function calculateIntegratedHeaderGap(toolbarHeight = constants_1.TABLE_CONFIG.INTEGRATED_TOOLBAR_HEIGHT, topPadding = constants_1.TABLE_CONFIG.INTEGRATED_TOOLBAR_TOP_PADDING, toHeaderGap = constants_1.TABLE_CONFIG.INTEGRATED_TOOLBAR_TO_HEADER_GAP) {
    return topPadding + toolbarHeight + toHeaderGap;
}
exports.calculateIntegratedHeaderGap = calculateIntegratedHeaderGap;
// ============================================================================
// TOOLBAR HEIGHT
// ============================================================================
/**
 * Calculate toolbar height based on configuration
 * This is the single source of truth for toolbar height calculation
 *
 * The calculation differs based on toolbar position:
 * - 'above': Uses bottom margin from layout (configurable)
 * - 'integrated': Uses integrated padding + toolbar height (inside sticky header)
 *
 * @param config - Toolbar configuration
 * @param layout - Optional toolbar layout configuration for accurate margin calculation
 */
function calculateToolbarHeight(config, layout) {
    if (!config.showToolbar)
        return 0;
    const effectiveLayout = layout ?? config.layout;
    // Check if toolbar is integrated into sticky header
    const isIntegrated = effectiveLayout?.position === 'integrated';
    if (isIntegrated) {
        // Integrated toolbar: renders inside sticky header wrapper
        // Height = top padding + toolbar height + bottom padding (gap to header)
        const topPadding = effectiveLayout?.integratedPadding?.top ?? 0;
        const bottomPadding = effectiveLayout?.integratedPadding?.bottom ?? 8;
        const toolbarHeight = effectiveLayout?.integratedToolbarHeight ?? constants_1.TABLE_CONFIG.INTEGRATED_TOOLBAR_HEIGHT;
        return topPadding + toolbarHeight + bottomPadding;
    }
    // 'Above' position: toolbar renders above table with margin
    let height = constants_1.TABLE_CONFIG.TOOLBAR_HEIGHT;
    // Use configured margin or fall back to default
    const margin = effectiveLayout?.toolbarBottomMargin ?? constants_1.TABLE_CONFIG.TOOLBAR_MARGIN;
    // Count display adds height (in normal document flow)
    // Note: For 'below' stack position, count is below toolbar row
    if (config.showCount && effectiveLayout?.countStackPosition !== 'inline') {
        height += (effectiveLayout?.toolbarToCountGap ?? 6) + constants_1.TABLE_CONFIG.COUNT_DISPLAY_MARGIN;
    }
    return height + margin;
}
exports.calculateToolbarHeight = calculateToolbarHeight;
//# sourceMappingURL=toolbar.js.map