"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableHeader = void 0;
/**
 * StickyDataTable V2 - TableHeader Component
 *
 * Renders the table header with sort controls and sticky positioning.
 * Uses CSS Grid for perfect alignment with body rows.
 * Supports drag-and-drop column reordering for non-sticky columns.
 *
 * @module components/table-header
 */
const react_1 = require("react");
const config_1 = require("../../config");
const utils_1 = require("../../utils");
const hooks_1 = require("../../hooks");
const header_cell_1 = require("./header-cell");
const use_header_drag_1 = require("./use-header-drag");
const drag_clone_1 = require("./drag-clone");
const drop_indicator_1 = require("./drop-indicator");
/**
 * Table header component
 *
 * Features:
 * - CSS Grid layout
 * - Sortable column headers
 * - Sticky positioning
 * - Select all checkbox
 * - Column animations
 * - Drag-and-drop column reordering (for non-sticky columns)
 */
const TableHeaderBase = ({ headerScrollRef, headerHeight = config_1.TABLE_CONFIG.HEADER_HEIGHT, stickyColumns, scrollableColumns, allColumns, columnLabels, stickyState, borderConfig, backgroundConfig, borderRadius, sortColumn, sortDirection, onSort, columnChange, leavingColumnKeys, leavingColumns, enteringColumnKeys, selectionState, enableColumnReorder = false, onReorderColumns, isColumnConfigHydrated = true, lastDroppedKeyRef: externalDroppedKeyRef, showScrollIndicator = false, gradientBackgroundColor = 'var(--background-color-secondary_alt)', dragCloneMode = 'floating', 
// Drag state from parent (when lifted to StickyDataTable level)
dragState: externalDragState, columnRectsRef: externalColumnRectsRef, isColumnDraggable: externalIsColumnDraggable, handlePointerDown: externalHandlePointerDown, handlePointerMove: externalHandlePointerMove, handlePointerUp: externalHandlePointerUp, handlePointerCancel: externalHandlePointerCancel, getShiftDirection: externalGetShiftDirection, getInlineOffset: externalGetInlineOffset, getShiftAmount: externalGetShiftAmount, cloneMode: externalCloneMode, isInlineDragMode: externalIsInlineDragMode, }) => {
    // Generate grid template
    const gridTemplate = (0, utils_1.generateGridTemplate)(stickyColumns, scrollableColumns);
    const outerBorderClasses = (0, utils_1.getHeaderOuterBorders)(borderConfig);
    const outerBorderStyles = (0, utils_1.getHeaderOuterBorderStyles)(borderConfig);
    // Drag-and-drop state and handlers - use external props if provided, otherwise use local hook
    // This allows the hook to be lifted to parent level for sharing between header and body
    const localDrag = (0, use_header_drag_1.useHeaderDrag)({
        headerScrollRef,
        allColumns,
        enableColumnReorder: externalDragState ? false : enableColumnReorder, // Disable local hook if external state provided
        onReorderColumns,
        externalDroppedKeyRef,
        cloneMode: dragCloneMode,
    });
    // Use external drag state if provided, otherwise use local
    const dragState = externalDragState ?? localDrag.dragState;
    const columnRectsRef = externalColumnRectsRef ?? localDrag.columnRectsRef;
    const lastDroppedKeyRef = localDrag.lastDroppedKeyRef; // Always use local for FLIP
    const isColumnDraggable = externalIsColumnDraggable ?? localDrag.isColumnDraggable;
    const handlePointerDown = externalHandlePointerDown ?? localDrag.handlePointerDown;
    const handlePointerMove = externalHandlePointerMove ?? localDrag.handlePointerMove;
    const handlePointerUp = externalHandlePointerUp ?? localDrag.handlePointerUp;
    const handlePointerCancel = externalHandlePointerCancel ?? localDrag.handlePointerCancel;
    const getShiftDirection = externalGetShiftDirection ?? localDrag.getShiftDirection;
    const getInlineOffset = externalGetInlineOffset ?? localDrag.getInlineOffset;
    const getShiftAmount = externalGetShiftAmount ?? localDrag.getShiftAmount;
    const cloneMode = externalCloneMode ?? localDrag.cloneMode;
    const isInlineDragMode = externalIsInlineDragMode ?? (cloneMode === 'inline' && dragState.isDragging);
    // Auto-FLIP: Smooth column shift animations (dragged column snaps, others animate)
    const columnKeys = allColumns.map((col) => col.key);
    (0, hooks_1.useAutoColumnFlip)(headerScrollRef, columnKeys, {
        draggedKeyRef: lastDroppedKeyRef,
        isHydrating: !isColumnConfigHydrated,
    });
    return (<div className="relative" onPointerMove={dragState.isDragging ? handlePointerMove : undefined} onPointerUp={dragState.isDragging ? handlePointerUp : undefined} onPointerCancel={dragState.isDragging ? handlePointerCancel : undefined}>
      {/* Gradient overlay - inside header, clipped INSIDE the border */}
      {showScrollIndicator && (() => {
            const borderWidth = borderConfig.showOuter ? 1 : 0;
            const innerRadius = Math.max(0, borderRadius - borderWidth);
            return (<div className="pointer-events-none absolute inset-0 z-[25]" style={{
                    clipPath: `inset(${borderWidth}px ${borderWidth}px 0 ${borderWidth}px round ${innerRadius}px ${innerRadius}px 0 0)`,
                }}>
            <div className="absolute top-0 bottom-0 right-0 w-5" style={{
                    background: `linear-gradient(to left, ${gradientBackgroundColor} 0%, transparent 100%)`,
                }}/>
          </div>);
        })()}

      {/* Main grid */}
      <div ref={headerScrollRef} className={`grid w-full overflow-x-auto overflow-y-hidden ${outerBorderClasses} ${backgroundConfig.headerContainer} scrollbar-hidden`} style={{
            gridTemplateColumns: gridTemplate,
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            height: `${headerHeight}px`,
            transition: columnChange
                ? `background-color 0.125s ease, grid-template-columns ${config_1.ANIMATION_CONFIG.COLUMN_ANIMATION_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`
                : 'background-color 0.125s ease',
            borderTopLeftRadius: `${borderRadius}px`,
            borderTopRightRadius: `${borderRadius}px`,
            willChange: 'scroll-position',
            ...outerBorderStyles,
        }}>
        {allColumns.map((col, colIndex) => {
            const draggable = isColumnDraggable(col);
            const isDragging = dragState.draggedKey === col.key;
            const label = columnLabels[col.key] || col.key;
            const shiftDirection = getShiftDirection(col.key, colIndex);
            const inlineOffset = getInlineOffset(col.key);
            const shiftAmount = getShiftAmount();
            return (<header_cell_1.HeaderCell key={col.key} column={col} label={label} stickyState={stickyState} borderConfig={borderConfig} backgroundConfig={backgroundConfig} sortColumn={sortColumn} sortDirection={sortDirection} onSort={onSort} leavingColumnKeys={leavingColumnKeys} enteringColumnKeys={enteringColumnKeys} columnChange={columnChange} selectionState={selectionState} isDraggable={draggable} isDragging={isDragging} shiftDirection={shiftDirection} inlineOffset={inlineOffset} shiftAmount={shiftAmount} isInlineMode={isInlineDragMode} onPointerDown={draggable ? (e) => handlePointerDown(e, col.key, label) : undefined}/>);
        })}
      </div>

      {/* Drop indicator - only shown in 'floating' mode */}
      {cloneMode === 'floating' && (<drop_indicator_1.DropIndicator dragOverKey={dragState.dragOverKey} dropSide={dragState.dropSide} columnRectsRef={columnRectsRef} headerScrollRef={headerScrollRef}/>)}

      {/* Floating drag clone - only shown in 'floating' mode */}
      {cloneMode === 'floating' && <drag_clone_1.DragClone dragState={dragState}/>}

      {/* Global grabbing cursor during drag */}
      <drag_clone_1.DragCursor isDragging={dragState.isDragging}/>
    </div>);
};
exports.TableHeader = (0, react_1.memo)(TableHeaderBase);
exports.TableHeader.displayName = 'TableHeader';
//# sourceMappingURL=index.js.map