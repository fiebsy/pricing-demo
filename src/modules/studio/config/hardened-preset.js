"use strict";
/**
 * Studio Dashboard - Hardened Preset Configuration
 *
 * Table dimensions and styling for the Audience Tab.
 * Reuses the same hardened configuration as collections.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.HARDENED_SEARCH_CONFIG = exports.HARDENED_FEATURES = exports.HARDENED_TOOLBAR_CONFIG = exports.HARDENED_BACKGROUND_CONFIG = exports.HARDENED_BORDER_CONFIG = exports.HARDENED_DIMENSIONS = void 0;
// =============================================================================
// HARDENED DIMENSIONS
// =============================================================================
exports.HARDENED_DIMENSIONS = {
    rowHeight: 52,
    headerHeight: 42,
    borderRadius: 16,
    headerGap: 12,
};
// =============================================================================
// HARDENED BORDER CONFIG
// =============================================================================
exports.HARDENED_BORDER_CONFIG = {
    showOuter: true,
    showRows: true,
    showCells: true,
    outerColor: 'border-primary',
    rowColor: 'border-secondary',
    cellColor: 'border-tertiary',
    stickyColumnRightBorderColor: 'border-secondary',
    hideCellBordersForColumns: ['__checkbox'],
    headerBottomColor: 'border-primary',
};
// =============================================================================
// HARDENED BACKGROUND CONFIG
// =============================================================================
exports.HARDENED_BACKGROUND_CONFIG = {
    headerWrapper: 'bg-secondary_alt',
    headerContainer: 'bg-secondary_t1',
    headerStickyCell: 'bg-secondary_t1',
    headerStickyCellWithArrows: 'bg-secondary_t1/90',
    bodyContainer: 'bg-primary',
    rowStickyCell: 'bg-primary/0',
    rowStickyCellWithArrows: 'bg-secondary_t1/90',
    rowHover: 'bg-tertiary',
};
// =============================================================================
// HARDENED TOOLBAR CONFIG
// =============================================================================
exports.HARDENED_TOOLBAR_CONFIG = {
    position: 'integrated',
    toolbarBottomMargin: 16,
    toolbarToCountGap: 0,
    headerGap: 12,
    integratedToolbarHeight: 40,
    integratedPadding: {
        top: 0,
        bottom: 12,
        left: 0,
        right: 0,
    },
};
// =============================================================================
// HARDENED FEATURES
// =============================================================================
exports.HARDENED_FEATURES = {
    enableSelection: true,
    showColumnControl: false,
    enableColumnReorder: false,
    showCount: false,
    showExport: true,
};
// =============================================================================
// SEARCH CONFIGURATION
// =============================================================================
exports.HARDENED_SEARCH_CONFIG = {
    expandedWidth: 200,
    collapsedWidth: 40,
    height: 40,
    duration: 200,
    revealMode: 'delay',
    hideMode: 'fade',
    collapseOnBlur: true,
    placeholder: 'Search by name or email...',
};
//# sourceMappingURL=hardened-preset.js.map