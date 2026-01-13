"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableRow = void 0;
/**
 * StickyDataTable V2 - TableRow Component
 *
 * Memoized row component with optimized rendering.
 * Uses CSS Grid for perfect column alignment.
 *
 * ## ⚠️ STYLING RULES (see docs/STYLING-GUIDE.md)
 *
 * renderCell content MUST follow these patterns:
 * - Standard text: `text-sm font-normal text-primary`
 * - Descriptions: `text-xs font-normal text-secondary`
 * - Status codes: `text-xs font-mono text-tertiary`
 * - Status badges: Use Untitled UI Badge component
 *
 * Forbidden in renderCell:
 * - Bold fonts, decorative colors, arbitrary sizes
 *
 * @module components/table-row
 */
const react_1 = require("react");
const React = require("react");
const checkbox_1 = require("@/components/ui/prod/base/checkbox");
const utils_1 = require("../../utils");
const table_cell_1 = require("./table-cell");
const config_1 = require("../../config");
/**
 * Memoized table row component
 *
 * Features:
 * - CSS Grid layout matching header
 * - Sticky cell positioning
 * - Row hover effects
 * - Checkbox selection
 * - Click handling with exclusions
 */
function TableRowBase({ row, index, rowId, stickyColumns, scrollableColumns, allColumns, stickyState, borderConfig, backgroundConfig, rowHeight = config_1.TABLE_CONFIG.ROW_HEIGHT, renderCell, onRowClick, columnChange, leavingColumnKeys, enteringColumnKeys, selectionState, 
// Drag state for inline column shifting
getShiftDirection, getInlineOffset, getShiftAmount, isInlineDragMode = false, draggedColumnKey, }) {
    // Generate grid template (matches header)
    const gridTemplate = (0, utils_1.generateGridTemplate)(stickyColumns, scrollableColumns);
    const rowBorderClass = (0, utils_1.getRowBorder)(borderConfig);
    // Handle click with exclusions for interactive elements
    const handleClick = (0, react_1.useCallback)((e) => {
        // Don't trigger row click for interactive elements
        const target = e.target;
        if (target.closest('[data-checkbox-cell]') ||
            target.closest('[data-actions-cell]') ||
            target.closest('button') ||
            target.closest('[role="menuitem"]')) {
            e.stopPropagation();
            return;
        }
        e.preventDefault();
        onRowClick?.(row, index);
    }, [row, index, onRowClick]);
    return (<a href="#" className={`grid w-fit min-w-full ${rowBorderClass} ${(0, utils_1.getRowHoverClass)(backgroundConfig)} no-underline last:border-b-0`} style={{
            gridTemplateColumns: gridTemplate,
            height: `${rowHeight}px`,
            transition: columnChange
                ? `background-color 0.2s ease, grid-template-columns ${config_1.ANIMATION_CONFIG.COLUMN_ANIMATION_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`
                : 'background-color 0.2s ease',
        }} onClick={handleClick}>
      {allColumns.map((col, colIndex) => {
            const isCheckboxColumn = col.key === '__checkbox';
            const isRankColumn = col.key === 'rank';
            /**
             * Text size class for cell container
             *
             * STYLING RULES (see docs/STYLING-GUIDE.md):
             * - Default body text: text-sm (14px)
             * - Rank/compact columns: text-xs (12px)
             *
             * Content rendered via renderCell should use:
             * - Standard text: text-sm font-normal text-primary
             * - Descriptions: text-xs font-normal text-secondary
             * - Status codes: text-xs font-mono text-tertiary
             */
            const textSizeClass = isRankColumn ? 'text-xs' : 'text-sm';
            // Calculate drag-related props for this cell
            const shiftDirection = getShiftDirection?.(col.key, colIndex) ?? null;
            const inlineOffset = getInlineOffset?.(col.key) ?? null;
            const shiftAmount = getShiftAmount?.() ?? 0;
            const isDraggedCell = col.key === draggedColumnKey;
            // Render checkbox or cell content
            const cellContent = isCheckboxColumn && selectionState ? (<div data-checkbox-cell="true" onClick={(e) => e.stopPropagation()}>
            <checkbox_1.Checkbox checked={selectionState.isRowSelected(rowId)} onCheckedChange={() => selectionState.toggleRowSelection(rowId)} aria-label="Select row" size="sm"/>
          </div>) : (renderCell(col.key, row, index));
            return (<table_cell_1.TableCell key={col.key} column={col} stickyState={stickyState} borderConfig={borderConfig} backgroundConfig={backgroundConfig} leavingColumnKeys={leavingColumnKeys} enteringColumnKeys={enteringColumnKeys} columnChange={columnChange} forceRightAlign={col.isLast} textSizeClass={textSizeClass} 
            // Drag state for inline column shifting
            shiftDirection={shiftDirection} inlineOffset={inlineOffset} shiftAmount={shiftAmount} isInlineDragMode={isInlineDragMode} isDraggedCell={isDraggedCell}>
            {cellContent}
          </table_cell_1.TableCell>);
        })}
    </a>);
}
// Memoize with custom comparison for performance
const MemoizedTableRow = (0, react_1.memo)(TableRowBase, (prev, next) => {
    // Quick reference checks
    if (prev.row !== next.row)
        return false;
    if (prev.rowId !== next.rowId)
        return false;
    if (prev.index !== next.index)
        return false;
    if (prev.stickyState.useEnhancedStyling !== next.stickyState.useEnhancedStyling)
        return false;
    if (prev.columnChange !== next.columnChange)
        return false;
    if (prev.leavingColumnKeys !== next.leavingColumnKeys)
        return false;
    if (prev.enteringColumnKeys !== next.enteringColumnKeys)
        return false;
    // Check border config changes that affect row/cell styling
    if (prev.borderConfig.showRows !== next.borderConfig.showRows)
        return false;
    if (prev.borderConfig.rowColor !== next.borderConfig.rowColor)
        return false;
    if (prev.borderConfig.showCells !== next.borderConfig.showCells)
        return false;
    if (prev.borderConfig.cellColor !== next.borderConfig.cellColor)
        return false;
    // Check row height changes
    if (prev.rowHeight !== next.rowHeight)
        return false;
    // Check column changes (length, reference, or properties like align/width)
    if (prev.allColumns !== next.allColumns) {
        // If different reference, check if content actually changed
        if (prev.allColumns.length !== next.allColumns.length)
            return false;
        // Check key column properties that affect rendering
        for (let i = 0; i < prev.allColumns.length; i++) {
            const prevCol = prev.allColumns[i];
            const nextCol = next.allColumns[i];
            if (!prevCol || !nextCol)
                return false;
            if (prevCol.key !== nextCol.key)
                return false;
            if (prevCol.align !== nextCol.align)
                return false;
            if (prevCol.width !== nextCol.width)
                return false;
            if (prevCol.isSticky !== nextCol.isSticky)
                return false;
        }
    }
    // Check selection state
    if (prev.selectionState !== next.selectionState) {
        if (prev.selectionState?.isRowSelected(prev.rowId) !== next.selectionState?.isRowSelected(next.rowId)) {
            return false;
        }
    }
    // Check drag state changes that affect cell styling
    if (prev.isInlineDragMode !== next.isInlineDragMode)
        return false;
    if (prev.draggedColumnKey !== next.draggedColumnKey)
        return false;
    // Functions change reference when drag state changes (pointerX in deps)
    // Must check both to ensure cells re-render during drag
    if (prev.getShiftDirection !== next.getShiftDirection)
        return false;
    if (prev.getInlineOffset !== next.getInlineOffset)
        return false;
    return true;
});
// Type assertion to preserve generic type information
exports.TableRow = MemoizedTableRow;
exports.TableRow.displayName = 'TableRow';
//# sourceMappingURL=table-row.js.map