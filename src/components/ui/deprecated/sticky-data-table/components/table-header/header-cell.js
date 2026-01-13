"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaderCell = void 0;
/**
 * StickyDataTable V2 - HeaderCell Component
 *
 * Individual header cell with sort controls, drag handle, and styling.
 *
 * @module components/table-header/header-cell
 */
const react_1 = require("react");
const checkbox_1 = require("@/components/ui/base/primitives/checkbox");
const utils_1 = require("../../utils");
const icons_1 = require("./icons");
/**
 * Header cell component with optional drag-and-drop support
 */
exports.HeaderCell = (0, react_1.memo)(function HeaderCell({ column, label, stickyState, borderConfig, backgroundConfig, sortColumn, sortDirection, onSort, leavingColumnKeys, enteringColumnKeys, columnChange, selectionState, 
// Pointer drag props
isDraggable = false, isDragging = false, shiftDirection = null, inlineOffset = null, shiftAmount = 4, isInlineMode = false, onPointerDown, }) {
    // Check if this is the actively dragged cell (has inline offset)
    const isDraggedCell = inlineOffset !== null;
    const isSortable = column.sortable ?? false;
    const isCurrentlySorted = sortColumn === column.key;
    // Compute alignment (force right for last column)
    const effectiveAlign = column.isLast ? 'right' : column.align;
    const alignment = (0, utils_1.getAlignmentClasses)(effectiveAlign);
    // Compute borders
    const stickyBorder = (0, utils_1.getStickyColumnBorder)(column, stickyState, borderConfig);
    const shouldSuppressRightBorder = column.isSticky && column.isFirstSticky && stickyState.useEnhancedStyling;
    const cellBorder = stickyBorder || shouldSuppressRightBorder
        ? ''
        : (0, utils_1.getCellBorder)(borderConfig, column.isLast, column.key);
    // Compute animation class and data attributes
    const animationClass = (0, utils_1.getColumnAnimationClass)(column.key, leavingColumnKeys, columnChange, enteringColumnKeys);
    const animationDataAttrs = (0, utils_1.getColumnAnimationDataAttrs)(column.key, leavingColumnKeys, enteringColumnKeys);
    // Compute background (solid when dragging, hover state for draggable columns)
    const baseBackgroundClass = (0, utils_1.getHeaderStickyBackground)(backgroundConfig, stickyState, column.isSticky ?? false);
    const hoverClass = isDraggable && !isDragging ? 'hover:bg-tertiary' : '';
    const backgroundClass = isDragging ? 'bg-quaternary' : `${baseBackgroundClass} ${hoverClass}`;
    // Compute padding
    const paddingClass = (0, utils_1.getCellPadding)(column.isFirst, column.isLast);
    // Compute style (no transform on cell - only content shifts in floating mode)
    const baseStyle = (0, utils_1.getCellStyle)(column, stickyState);
    // Calculate cell-level transform for inline mode
    // In inline mode: dragged cell follows cursor, neighbor cells slide to make room
    // In floating mode: no cell transforms, only content shifts for drop indicator
    const getCellTransform = () => {
        if (isDraggedCell) {
            // Dragged cell follows cursor
            return `translateX(${inlineOffset}px)`;
        }
        if (isInlineMode && shiftDirection) {
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
    const cellStyle = isDraggedCell
        ? {
            ...baseStyle,
            transform: cellTransform,
            zIndex: 50,
            boxShadow: 'var(--shine-3), var(--shadow-md)',
            border: 'none',
            borderColor: 'transparent',
            transition: 'box-shadow 150ms ease-out',
        }
        : isInlineMode && shiftDirection
            ? {
                ...baseStyle,
                ...shiftingCellBorderFix,
                transform: cellTransform,
                transition: 'transform 150ms ease-out',
            }
            : baseStyle;
    // Content shift transform - ONLY used in floating mode
    // In floating mode: shifts content to make room for drop indicator (small gap)
    // In inline mode: no content transform needed, cell itself moves
    const contentTransform = !isInlineMode && shiftDirection
        ? shiftDirection === 'right'
            ? `translateX(${shiftAmount}px)`
            : `translateX(-${shiftAmount}px)`
        : 'translateX(0)';
    // Checkbox column handling
    const isCheckboxColumn = column.key === '__checkbox';
    // Tabular numbers (disabled by default, enable for numeric columns)
    const useTabularNums = column.useTabularNums ?? false;
    // Determine drag handle position (opposite to label alignment)
    const dragHandlePosition = effectiveAlign === 'right' ? 'left' : 'right';
    // Compute opacity class for label and sort icon only
    const contentOpacityClass = isDragging
        ? 'opacity-50'
        : isSortable
            ? isCurrentlySorted
                ? 'group-hover:opacity-80 group-active:opacity-60' // Active sort: full opacity, subtle hover
                : 'opacity-60 group-hover:opacity-100 group-active:opacity-80' // Sortable but inactive
            : 'opacity-60'; // Non-sortable
    return (<div className={`${backgroundClass} box-border ${cellBorder} ${stickyBorder} ${animationClass} group relative`} style={cellStyle} data-column-key={column.key} onClick={isSortable && !isCheckboxColumn ? () => onSort(column.key) : undefined} {...animationDataAttrs}>
      {/* Drag handle - 40px touch target, icon centered inside */}
      {isDraggable && (<div className={`
            absolute top-1/2 -translate-y-1/2 z-10
            ${dragHandlePosition === 'left' ? '-left-2' : '-right-2'}
            w-10 h-10 flex items-center justify-center
            cursor-grab active:cursor-grabbing
            opacity-0 transition-opacity duration-150
            group-hover:opacity-70
            text-primary
            touch-none
          `} onPointerDown={onPointerDown} aria-hidden="true">
          <icons_1.DragHandleIcon />
        </div>)}

      <div className={`
          ${paddingClass}
          flex h-full items-center
          ${alignment.flexJustify}
          text-tertiary text-xs font-medium
          ${alignment.textAlign}
          ${isSortable ? 'cursor-pointer' : 'cursor-default'}
          whitespace-nowrap
          ${useTabularNums ? 'tabular-nums' : ''}
        `} style={{
            transform: contentTransform,
            transition: 'transform 150ms ease-out',
        }}>
        {isCheckboxColumn && selectionState ? (<checkbox_1.Checkbox isSelected={selectionState.isAllSelected} isIndeterminate={selectionState.isSomeSelected} onChange={(isSelected) => {
                if (isSelected) {
                    selectionState.selectAllRows();
                }
                else {
                    selectionState.deselectAllRows();
                }
            }} aria-label="Select all" size="sm"/>) : (<>
            {/* Sort icon on left for right-aligned columns */}
            {isSortable && column.align === 'right' && (<span className={`mr-1 transition-opacity ${contentOpacityClass}`}>
                <icons_1.SortIndicator isActive={isCurrentlySorted} direction={sortDirection}/>
              </span>)}

            <span className={`min-w-0 transition-opacity ${contentOpacityClass}`}>{label}</span>

            {/* Sort icon on right for left/center-aligned columns */}
            {isSortable && column.align !== 'right' && (<span className={`ml-1 transition-opacity ${contentOpacityClass}`}>
                <icons_1.SortIndicator isActive={isCurrentlySorted} direction={sortDirection}/>
              </span>)}
          </>)}
      </div>
    </div>);
});
//# sourceMappingURL=header-cell.js.map