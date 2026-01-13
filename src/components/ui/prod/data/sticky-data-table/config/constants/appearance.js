"use strict";
/**
 * StickyDataTable - Appearance Constants
 *
 * Border and background default configurations.
 * Based on JAN2 production preset.
 *
 * @module config/constants/appearance
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_BACKGROUND_CONFIG = exports.DEFAULT_BORDER_CONFIG = void 0;
// ============================================================================
// DEFAULT BORDER CONFIGURATION (JAN2)
// ============================================================================
/**
 * Default border configuration (JAN2)
 * Uses semantic design tokens for theming support
 */
exports.DEFAULT_BORDER_CONFIG = {
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
// ============================================================================
// DEFAULT BACKGROUND CONFIGURATION (JAN2)
// ============================================================================
/**
 * Default background configuration (JAN2)
 * Uses semantic design tokens for theming support
 */
exports.DEFAULT_BACKGROUND_CONFIG = {
    headerWrapper: 'bg-secondary_alt',
    headerContainer: 'bg-secondary_t1',
    headerStickyCell: 'bg-secondary_t1',
    headerStickyCellWithArrows: 'bg-secondary_t1/90',
    bodyContainer: 'bg-primary',
    rowStickyCell: 'bg-primary/0',
    rowStickyCellWithArrows: 'bg-secondary_t1/90',
    rowHover: 'bg-tertiary',
};
//# sourceMappingURL=appearance.js.map