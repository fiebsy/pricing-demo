"use strict";
/**
 * Hardened Preset for Collections Dashboard
 *
 * Locked table configuration adapted from Table PAYVA V2 playground.
 * Table, toolbar, and filter settings are not user-configurable.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.HARDENED_CONFIG = exports.HARDENED_SEARCH_CONFIG = exports.HARDENED_FILTER_CHIP = exports.HARDENED_FILTER_MENU = exports.HARDENED_FILTER_TRIGGER = exports.HARDENED_FEATURES = exports.HARDENED_TOOLBAR_CONFIG = exports.HARDENED_BACKGROUND_CONFIG = exports.HARDENED_BORDER_CONFIG = exports.HARDENED_DIMENSIONS = void 0;
// =============================================================================
// HARDENED TABLE DIMENSIONS
// =============================================================================
exports.HARDENED_DIMENSIONS = {
    rowHeight: 52,
    headerHeight: 42,
    borderRadius: 16,
    headerGap: 12,
};
// =============================================================================
// HARDENED BORDER CONFIGURATION
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
// HARDENED BACKGROUND CONFIGURATION
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
// HARDENED TOOLBAR CONFIGURATION
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
// HARDENED FEATURE FLAGS
// =============================================================================
exports.HARDENED_FEATURES = {
    enableSelection: true, // Checkbox column to left of sticky column
    showColumnControl: true, // Column visibility toggle in toolbar
    showCount: false, // DISABLED - count not shown in toolbar
    showExport: true, // Via three-dot menu
    enableColumnReorder: true, // Enabled - allows drag-to-reorder columns
};
exports.HARDENED_FILTER_TRIGGER = {
    shine: '0',
    shineIntensity: 'intense',
    background: 'primary',
    backgroundHover: 'tertiary',
    border: false,
    height: 40,
    rounded: 'full',
    paddingX: 12,
    textColor: 'secondary',
    textColorHover: 'primary',
    fontWeight: 'semibold',
    iconSize: 20,
    iconStrokeWidth: 1.5,
    iconColor: 'quaternary',
};
exports.HARDENED_FILTER_MENU = {
    borderRadius: '2xl',
    shadow: '2xl',
    borderStyle: 'shine',
    shineOption: 'shine-1',
    cornerSquircle: true,
    menuWidth: 240,
    backgroundColor: 'primary',
    backgroundGradient: 'subtle-depth-sm',
    itemRadius: 'xl',
    itemSquircle: true,
    itemHoverColor: 'tertiary',
    iconOpacity: 50,
    panelTransitionDuration: 250,
    heightAnimationEnabled: true,
    opacityCrossfadeEnabled: true,
};
exports.HARDENED_FILTER_CHIP = {
    shine: '1',
    shineIntensity: 'subtle',
    background: 'secondary',
    border: false,
    size: 'sm',
    rounded: 'full',
    paddingLeft: 8,
    paddingRight: 4,
    iconValueGap: 4,
    itemGap: 10,
    iconSize: 14,
    closeIconSize: 16,
    leftIconOpacity: 55,
    duration: 150,
    revealMode: 'fade',
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
    placeholder: 'Search contracts...',
};
// =============================================================================
// COMBINED HARDENED CONFIG
// =============================================================================
exports.HARDENED_CONFIG = {
    dimensions: exports.HARDENED_DIMENSIONS,
    border: exports.HARDENED_BORDER_CONFIG,
    background: exports.HARDENED_BACKGROUND_CONFIG,
    toolbar: exports.HARDENED_TOOLBAR_CONFIG,
    features: exports.HARDENED_FEATURES,
    filterTrigger: exports.HARDENED_FILTER_TRIGGER,
    filterMenu: exports.HARDENED_FILTER_MENU,
    filterChip: exports.HARDENED_FILTER_CHIP,
    search: exports.HARDENED_SEARCH_CONFIG,
};
//# sourceMappingURL=hardened-preset.js.map