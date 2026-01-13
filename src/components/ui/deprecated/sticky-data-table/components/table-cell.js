"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableCell = void 0;
/**
 * StickyDataTable V2 - TableCell Component
 *
 * Memoized cell component with optimized styling.
 * Handles sticky positioning, borders, and backgrounds.
 *
 * ## ⚠️ STYLING RULES (see docs/STYLING-GUIDE.md)
 *
 * ### Typography Defaults Applied Here:
 * - Header cells: `text-xs font-medium text-tertiary`
 * - Body cells: `text-sm font-normal text-primary`
 *
 * ### Content Styling (applied in renderCell, NOT here):
 * - Standard text: `text-sm font-normal text-primary`
 * - Descriptions: `text-xs font-normal text-secondary`
 * - Status codes/IDs: `text-xs font-mono text-tertiary`
 *
 * ### Forbidden in renderCell:
 * - Bold text (`font-bold`, `font-semibold`)
 * - Decorative colors (`text-blue-500`, etc.)
 * - Arbitrary font sizes (`text-[13px]`, `text-lg`)
 *
 * @module components/table-cell
 */
const react_1 = require("react");
const utils_1 = require("../utils");
/**
 * Memoized table cell component
 *
 * Renders a single cell with:
 * - Sticky positioning if applicable
 * - Proper borders and backgrounds
 * - Animation classes for column transitions
 * - Responsive text wrapping
 *
 * ## Typography (automatic, based on isHeader):
 * - **Header cells**: `text-xs font-medium text-tertiary`
 * - **Body cells**: `text-sm font-normal text-primary`
 *
 * ## Content Styling (user responsibility in renderCell):
 * See docs/STYLING-GUIDE.md for required patterns
 */
const TableCellBase = ({ column, children, stickyState, borderConfig, backgroundConfig, leavingColumnKeys, enteringColumnKeys, columnChange, forceRightAlign = false, textSizeClass = 'text-sm', isHeader = false, getHeaderBackground, 
// Drag state for inline column shifting
shiftDirection = null, inlineOffset = null, shiftAmount = 0, isInlineDragMode = false, isDraggedCell = false, }) => {
    // Compute alignment
    const effectiveAlign = forceRightAlign ? 'right' : column.align;
    const alignment = (0, utils_1.getAlignmentClasses)(effectiveAlign);
    // Compute borders
    const stickyBorder = (0, utils_1.getStickyColumnBorder)(column, stickyState, borderConfig);
    const shouldSuppressRightBorder = column.isSticky && column.isFirstSticky && stickyState.useEnhancedStyling;
    const cellBorder = stickyBorder || shouldSuppressRightBorder
        ? ''
        : (0, utils_1.getCellBorder)(borderConfig, column.isLast, column.key);
    // Compute animation class (legacy support) and data attributes (new)
    const animationClass = (0, utils_1.getColumnAnimationClass)(column.key, leavingColumnKeys, columnChange, enteringColumnKeys);
    const animationDataAttrs = (0, utils_1.getColumnAnimationDataAttrs)(column.key, leavingColumnKeys, enteringColumnKeys);
    // Compute padding
    const paddingClass = (0, utils_1.getCellPadding)(column.isFirst, column.isLast);
    // Compute background
    const backgroundClass = isHeader && getHeaderBackground
        ? getHeaderBackground()
        : (0, utils_1.getRowStickyBackground)(backgroundConfig, stickyState, column.isSticky ?? false);
    // Compute base style
    const baseStyle = (0, utils_1.getCellStyle)(column, stickyState);
    // Calculate cell-level transform for inline drag mode
    // In inline mode: dragged cell follows cursor, neighbor cells slide to make room
    const getCellTransform = () => {
        if (isDraggedCell && inlineOffset !== null) {
            // Dragged cell follows cursor
            return `translateX(${inlineOffset}px)`;
        }
        if (isInlineDragMode && shiftDirection) {
            // Neighbor cells slide to make room (inline mode only)
            return shiftDirection === 'right'
                ? `translateX(${shiftAmount}px)`
                : `translateX(-${shiftAmount}px)`;
        }
        return undefined;
    };
    const cellTransform = getCellTransform();
    // Build cell style based on drag state
    // For shifting cells: add right border if cell is "last" (normally has no right border)
    // This prevents a gap at the table edge during drag preview
    const shiftingCellBorderFix = column.isLast && shiftDirection
        ? { borderRight: '1px solid var(--border-color-secondary)' }
        : {};
    const style = isDraggedCell && inlineOffset !== null
        ? {
            ...baseStyle,
            transform: cellTransform,
            zIndex: 50,
            transition: 'none', // No transition for dragged cell - follows cursor directly
        }
        : isInlineDragMode && shiftDirection
            ? {
                ...baseStyle,
                ...shiftingCellBorderFix,
                transform: cellTransform,
                transition: 'transform 150ms ease-out',
            }
            : baseStyle;
    // Text wrapping and line clamping
    const allowTextWrap = column.allowTextWrap ?? false;
    const maxLines = column.maxLines;
    // Determine text overflow behavior:
    // 1. maxLines set: wrap text, clamp at N lines with ellipsis
    // 2. allowTextWrap: wrap text, no limit
    // 3. default: single line, truncate with ellipsis
    const hasLineClamping = maxLines !== undefined && maxLines > 0;
    const shouldWrap = hasLineClamping || allowTextWrap;
    // Tabular numbers (enabled by default for better number alignment)
    // Set useTabularNums: false to disable for text-only columns
    const useTabularNums = column.useTabularNums ?? true;
    return (<div className={`${backgroundClass} box-border ${cellBorder} ${stickyBorder} ${animationClass}`} style={style} {...animationDataAttrs}>
      {/*
         * Cell content wrapper with typography styles
         *
         * TYPOGRAPHY RULES (see docs/STYLING-GUIDE.md):
         * - Headers: text-xs font-medium text-tertiary (automatic)
         * - Body: text-sm font-normal text-primary (automatic)
         *
         * Content rendered via renderCell should use:
         * - Standard text: text-sm font-normal text-primary
         * - Descriptions: text-xs font-normal text-secondary
         * - Status codes: text-xs font-mono text-tertiary
         *
         * ⚠️ FORBIDDEN in renderCell:
         * - font-bold, font-semibold (use font-normal)
         * - text-blue-500, etc. (use semantic tokens)
         * - text-[13px], text-lg (use text-sm or text-xs)
         */}
      <div className={`
          ${paddingClass}
          flex h-full items-center
          ${shouldWrap ? 'min-w-0' : ''}
          ${alignment.flexJustify}
          ${textSizeClass}
          ${isHeader ? 'text-tertiary font-medium' : 'text-primary font-normal'}
          ${alignment.textAlign}
          ${shouldWrap ? 'whitespace-normal' : 'whitespace-nowrap'}
          ${useTabularNums ? 'tabular-nums' : ''}
        `}>
        {hasLineClamping ? (
        // Line-clamped content: wrap up to maxLines, then truncate with ellipsis
        <div className="w-full min-w-0 overflow-hidden" style={{
                display: '-webkit-box',
                WebkitLineClamp: maxLines,
                WebkitBoxOrient: 'vertical',
                lineClamp: maxLines,
            }}>
            {children}
          </div>) : shouldWrap ? (
        // Unlimited wrapping
        <div className="w-full min-w-0">{children}</div>) : (
        // Single line, truncate (default)
        children)}
      </div>
    </div>);
};
// Memoize with custom comparison
exports.TableCell = (0, react_1.memo)(TableCellBase, (prev, next) => {
    // Quick checks for common cases
    if (prev.children !== next.children)
        return false;
    if (prev.column.key !== next.column.key)
        return false;
    if (prev.stickyState.useEnhancedStyling !== next.stickyState.useEnhancedStyling)
        return false;
    if (prev.leavingColumnKeys !== next.leavingColumnKeys)
        return false;
    if (prev.enteringColumnKeys !== next.enteringColumnKeys)
        return false;
    if (prev.columnChange !== next.columnChange)
        return false;
    // Check border config changes that affect cell styling
    if (prev.borderConfig.showCells !== next.borderConfig.showCells)
        return false;
    if (prev.borderConfig.cellColor !== next.borderConfig.cellColor)
        return false;
    if (prev.borderConfig.showRows !== next.borderConfig.showRows)
        return false;
    if (prev.borderConfig.rowColor !== next.borderConfig.rowColor)
        return false;
    return true;
});
exports.TableCell.displayName = 'TableCell';
//# sourceMappingURL=table-cell.js.map