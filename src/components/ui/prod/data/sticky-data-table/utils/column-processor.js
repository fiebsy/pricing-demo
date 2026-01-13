"use strict";
/**
 * StickyDataTable V2 - Column Processor
 *
 * Unified column processing logic shared between StickyDataTable and TableSkeleton.
 * This ensures both components use identical column calculations for perfect alignment.
 *
 * @module utils/column-processor
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRightmostStickyColumn = exports.countStickyColumns = exports.hasStickyColumns = exports.createVisibleColumnKeys = exports.processColumns = void 0;
const grid_1 = require("./grid");
const config_1 = require("../config");
// ============================================================================
// CONSTANTS
// ============================================================================
/**
 * Checkbox column configuration
 * Added as first sticky column when selection is enabled
 */
const CHECKBOX_COLUMN = {
    key: '__checkbox',
    width: 48,
    align: 'center',
    isSticky: true,
    stickyLeft: 0,
    sortable: false,
};
// ============================================================================
// CORE PROCESSING
// ============================================================================
/**
 * Process columns with unified logic
 *
 * This function handles:
 * 1. Adding checkbox column if selection enabled
 * 2. Adjusting sticky offsets for existing columns
 * 3. Filtering by visibility
 * 4. Computing sticky offsets
 * 5. Generating grid template
 * 6. Creating sticky state
 *
 * @param options - Column processor options
 * @returns Processed columns result
 *
 * @example
 * ```tsx
 * // Basic usage
 * const result = processColumns({ columns: myColumns })
 *
 * // With selection
 * const result = processColumns({
 *   columns: myColumns,
 *   enableSelection: true,
 * })
 *
 * // With visibility filter
 * const result = processColumns({
 *   columns: myColumns,
 *   visibleColumnKeys: new Set(['id', 'name', 'amount']),
 * })
 *
 * // For skeleton with scrollable simulation
 * const result = processColumns({
 *   columns: myColumns,
 *   enableSelection: true,
 *   simulateScrollable: true,
 * })
 * ```
 */
function processColumns(options) {
    const { columns, enableSelection = false, visibleColumnKeys, simulateScrollable = false, borderConfig: borderConfigOverrides, backgroundConfig: backgroundConfigOverrides, } = options;
    let processedColumns = [...columns];
    let hasCheckboxColumn = false;
    // Step 1: Add checkbox column if selection enabled
    if (enableSelection) {
        // Check if checkbox column already exists
        const hasExistingCheckbox = processedColumns.some((col) => col.key === '__checkbox');
        if (!hasExistingCheckbox) {
            // Adjust stickyLeft for existing sticky columns
            processedColumns = processedColumns.map((col) => {
                if (col.isSticky && col.stickyLeft !== undefined) {
                    return { ...col, stickyLeft: col.stickyLeft + CHECKBOX_COLUMN.width };
                }
                return col;
            });
            // Add checkbox as first column
            processedColumns = [CHECKBOX_COLUMN, ...processedColumns];
            hasCheckboxColumn = true;
        }
        else {
            hasCheckboxColumn = true;
        }
    }
    // Step 2: Filter by visibility if provided
    if (visibleColumnKeys && visibleColumnKeys.size > 0) {
        processedColumns = processedColumns.filter((col) => {
            // Always include checkbox column
            if (col.key === '__checkbox')
                return true;
            return visibleColumnKeys.has(col.key);
        });
    }
    // Step 2.5: Reorder columns so sticky come first (matches grid template order)
    // This is critical for skeleton alignment - the grid template expects sticky columns
    // to come before scrollable columns. Without this reordering, cells would be rendered
    // in user order but the grid expects sticky-first order, causing misalignment.
    const reorderedColumns = [
        ...processedColumns.filter((col) => col.isSticky),
        ...processedColumns.filter((col) => !col.isSticky),
    ];
    // Step 3: Compute column offsets
    const computedColumns = (0, grid_1.computeColumnOffsets)(reorderedColumns);
    // Step 4: Separate into sticky and scrollable
    const { stickyColumns, scrollableColumns } = (0, grid_1.separateColumns)(computedColumns);
    // Step 5: Generate grid template
    const gridTemplate = (0, grid_1.generateGridTemplate)(stickyColumns, scrollableColumns);
    // Step 6: Calculate total sticky width
    const totalStickyWidth = (0, grid_1.calculateTotalStickyWidth)(stickyColumns);
    // Step 7: Create sticky state
    const stickyState = simulateScrollable
        ? {
            showLeftArrow: false,
            showRightArrow: true,
            hasArrows: true,
            useEnhancedStyling: true,
        }
        : (0, config_1.createInitialStickyState)();
    // Step 8: Merge configurations
    const borderConfig = (0, config_1.createBorderConfig)(borderConfigOverrides);
    const backgroundConfig = (0, config_1.createBackgroundConfig)(backgroundConfigOverrides);
    return {
        allColumns: computedColumns,
        stickyColumns,
        scrollableColumns,
        gridTemplate,
        totalStickyWidth,
        stickyState,
        borderConfig,
        backgroundConfig,
        hasCheckboxColumn,
    };
}
exports.processColumns = processColumns;
// ============================================================================
// HELPERS
// ============================================================================
/**
 * Create visible column keys set from default visible columns array
 *
 * @param columns - All columns
 * @param defaultVisibleColumns - Array of visible column keys
 * @returns Set of visible column keys
 */
function createVisibleColumnKeys(columns, defaultVisibleColumns) {
    if (!defaultVisibleColumns || defaultVisibleColumns.length === 0) {
        return undefined;
    }
    const visibleSet = new Set(defaultVisibleColumns);
    // Filter to only include keys that exist in columns
    const validKeys = columns.map((c) => c.key).filter((key) => visibleSet.has(key));
    return new Set(validKeys);
}
exports.createVisibleColumnKeys = createVisibleColumnKeys;
/**
 * Check if columns configuration has any sticky columns
 *
 * @param columns - Column configuration array
 * @returns True if any column is sticky
 */
function hasStickyColumns(columns) {
    return columns.some((col) => col.isSticky);
}
exports.hasStickyColumns = hasStickyColumns;
/**
 * Count total number of sticky columns
 *
 * @param columns - Column configuration array
 * @returns Number of sticky columns
 */
function countStickyColumns(columns) {
    return columns.filter((col) => col.isSticky).length;
}
exports.countStickyColumns = countStickyColumns;
/**
 * Get the rightmost sticky column
 *
 * @param columns - Computed columns
 * @returns The last sticky column or undefined
 */
function getRightmostStickyColumn(columns) {
    const stickyColumns = columns.filter((col) => col.isSticky);
    return stickyColumns[stickyColumns.length - 1];
}
exports.getRightmostStickyColumn = getRightmostStickyColumn;
//# sourceMappingURL=column-processor.js.map