"use strict";
/**
 * StickyDataTable V2 - Grid Utilities
 *
 * CSS Grid template generation and column calculations.
 * CRITICAL: Same template must be used for header and body alignment.
 *
 * @module utils/grid
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.separateColumns = exports.computeColumnOffsets = exports.calculateTotalStickyWidth = exports.generateGridTemplate = void 0;
/**
 * Generate CSS Grid template columns string
 *
 * Creates a grid template that ensures perfect alignment between
 * header and body rows. Uses pixel widths for sticky columns
 * and flexible fr units for scrollable columns.
 *
 * @param stickyColumns - Array of sticky column configs
 * @param scrollableColumns - Array of scrollable column configs
 * @returns CSS grid-template-columns value
 */
function generateGridTemplate(stickyColumns, scrollableColumns) {
    // Sticky columns: Fixed pixel widths (or minmax if maxWidth specified)
    const stickyWidths = stickyColumns
        .map((col) => {
        const min = col.minWidth ?? col.width;
        if (col.maxWidth) {
            return `minmax(${min}px, ${col.maxWidth}px)`;
        }
        return `${min}px`;
    })
        .join(' ');
    // Scrollable columns: Flexible with min/max constraints
    const scrollableWidths = scrollableColumns
        .map((col) => {
        const min = col.minWidth ?? col.width;
        const ratio = col.flexRatio ?? 1;
        if (col.maxWidth) {
            return `minmax(${min}px, ${col.maxWidth}px)`;
        }
        return `minmax(${min}px, ${ratio}fr)`;
    })
        .join(' ');
    return `${stickyWidths} ${scrollableWidths}`.trim();
}
exports.generateGridTemplate = generateGridTemplate;
/**
 * Calculate total width of sticky columns
 * Used for positioning navigation arrows and overlays
 *
 * @param stickyColumns - Array of sticky column configs
 * @returns Total width in pixels
 */
function calculateTotalStickyWidth(stickyColumns) {
    return stickyColumns.reduce((total, col) => {
        const width = col.minWidth ?? col.width;
        return total + width;
    }, 0);
}
exports.calculateTotalStickyWidth = calculateTotalStickyWidth;
/**
 * Compute sticky left offsets for columns
 *
 * Calculates the cumulative left offset for each sticky column.
 * Non-sticky columns get offset of 0.
 *
 * @param columns - Array of column configs
 * @returns Array of computed columns with offsets
 */
function computeColumnOffsets(columns) {
    let stickyOffset = 0;
    let stickyIndex = 0;
    const stickyColumns = columns.filter((c) => c.isSticky);
    const totalColumns = columns.length;
    return columns.map((col, index) => {
        const isSticky = col.isSticky ?? false;
        const computedStickyLeft = isSticky ? stickyOffset : 0;
        // Calculate offset for next sticky column
        if (isSticky) {
            stickyOffset += col.minWidth ?? col.width;
            stickyIndex++;
        }
        // Determine position flags
        const isFirst = index === 0;
        const isLast = index === totalColumns - 1;
        const isFirstSticky = isSticky && stickyIndex === 1;
        const isLastSticky = isSticky && stickyIndex === stickyColumns.length;
        return {
            ...col,
            computedStickyLeft,
            index,
            isFirst,
            isLast,
            isFirstSticky,
            isLastSticky,
        };
    });
}
exports.computeColumnOffsets = computeColumnOffsets;
/**
 * Separate columns into sticky and scrollable groups
 *
 * @param computedColumns - Array of computed columns
 * @returns Object with stickyColumns and scrollableColumns
 */
function separateColumns(computedColumns) {
    const stickyColumns = [];
    const scrollableColumns = [];
    for (const col of computedColumns) {
        if (col.isSticky) {
            stickyColumns.push(col);
        }
        else {
            scrollableColumns.push(col);
        }
    }
    return { stickyColumns, scrollableColumns };
}
exports.separateColumns = separateColumns;
//# sourceMappingURL=grid.js.map