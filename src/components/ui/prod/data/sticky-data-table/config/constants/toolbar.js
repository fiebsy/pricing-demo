"use strict";
/**
 * StickyDataTable - Toolbar Constants
 *
 * Default toolbar layout configuration.
 *
 * @module config/constants/toolbar
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_TOOLBAR_LAYOUT = void 0;
const dimensions_1 = require("./dimensions");
// ============================================================================
// DEFAULT TOOLBAR LAYOUT
// ============================================================================
/**
 * Default toolbar layout configuration
 * Note: leftCount and rightCount are intentionally omitted - they're runtime values
 */
exports.DEFAULT_TOOLBAR_LAYOUT = {
    position: 'above',
    countPosition: 'left',
    countStackPosition: 'below',
    toolbarToCountGap: 6,
    toolbarBottomMargin: dimensions_1.TABLE_CONFIG.TOOLBAR_MARGIN,
    headerGap: dimensions_1.TABLE_CONFIG.HEADER_GAP,
    integratedPadding: {
        top: dimensions_1.TABLE_CONFIG.INTEGRATED_TOOLBAR_TOP_PADDING,
        bottom: dimensions_1.TABLE_CONFIG.INTEGRATED_TOOLBAR_TO_HEADER_GAP,
        left: 0,
        right: 0,
    },
    integratedToolbarHeight: dimensions_1.TABLE_CONFIG.INTEGRATED_TOOLBAR_HEIGHT,
    countPaddingLeft: 0,
    countPaddingRight: 0,
    debug: false,
};
//# sourceMappingURL=toolbar.js.map