"use strict";
/**
 * StickyDataTable V2 - useHeaderDrag Hook
 *
 * Manages pointer-based drag-and-drop state and handlers for column reordering.
 *
 * @module components/table-header/use-header-drag
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.useHeaderDrag = void 0;
const react_1 = require("react");
const config_1 = require("../../config");
const INITIAL_DRAG_STATE = {
    isDragging: false,
    draggedKey: null,
    dragOverKey: null,
    dropSide: null,
    pointerX: 0,
    pointerY: 0,
    dragWidth: 0,
    dragHeight: 0,
    dragLabel: '',
    dragAlign: 'left',
};
/**
 * Hook for managing header column drag-and-drop
 */
function useHeaderDrag({ headerScrollRef, allColumns, enableColumnReorder = true, onReorderColumns, externalDroppedKeyRef, cloneMode = 'inline', dragSwapThreshold = 0.5, }) {
    const [dragState, setDragState] = (0, react_1.useState)(INITIAL_DRAG_STATE);
    // Track the last dropped column key (persists through animation)
    // Use external ref if provided (shared with body), otherwise create local fallback
    const internalDroppedKeyRef = (0, react_1.useRef)(null);
    const lastDroppedKeyRef = externalDroppedKeyRef ?? internalDroppedKeyRef;
    // Ref to store column element rects for hit testing
    const columnRectsRef = (0, react_1.useRef)(new Map());
    // Track drag start position for inline mode offset calculation
    const dragStartXRef = (0, react_1.useRef)(0);
    // Track the original index of the dragged column (for inline slot-based detection)
    const draggedOriginalIndexRef = (0, react_1.useRef)(-1);
    // Track ordered column keys at drag start (for slot calculation)
    const orderedKeysAtDragStartRef = (0, react_1.useRef)([]);
    /**
     * Check if a column can be dragged
     */
    const isColumnDraggable = (0, react_1.useCallback)((column) => {
        if (!enableColumnReorder || !onReorderColumns)
            return false;
        if (column.isSticky)
            return false;
        if (column.key === '__checkbox')
            return false;
        return true;
    }, [enableColumnReorder, onReorderColumns]);
    /**
     * Check if a column is a valid drop target
     */
    const isValidDropTarget = (0, react_1.useCallback)((column) => {
        if (!enableColumnReorder || !onReorderColumns)
            return false;
        if (column.isSticky)
            return false;
        if (column.key === '__checkbox')
            return false;
        return true;
    }, [enableColumnReorder, onReorderColumns]);
    /**
     * Capture column positions for hit testing
     */
    const captureColumnRects = (0, react_1.useCallback)(() => {
        const container = headerScrollRef.current;
        if (!container)
            return;
        columnRectsRef.current.clear();
        const cells = container.querySelectorAll('[data-column-key]');
        cells.forEach((cell) => {
            const key = cell.getAttribute('data-column-key');
            if (key) {
                columnRectsRef.current.set(key, cell.getBoundingClientRect());
            }
        });
    }, [headerScrollRef]);
    /**
     * Find drop target using center-of-column detection for inline mode.
     * The shift triggers when the CENTER of the dragged column crosses
     * into another column's territory (past its midpoint).
     */
    const findDropTargetInlineMode = (0, react_1.useCallback)((x) => {
        const draggedKey = dragState.draggedKey;
        if (!draggedKey)
            return null;
        const originalIndex = draggedOriginalIndexRef.current;
        if (originalIndex === -1)
            return null;
        const orderedKeys = orderedKeysAtDragStartRef.current;
        if (orderedKeys.length === 0)
            return null;
        // Get the dragged column's original rect
        const draggedRect = columnRectsRef.current.get(draggedKey);
        if (!draggedRect)
            return null;
        // Calculate cursor displacement from drag start
        const displacement = x - dragStartXRef.current;
        // Calculate the current center of the dragged column
        // Original center + how far we've dragged
        const originalCenter = draggedRect.left + draggedRect.width / 2;
        const currentCenter = originalCenter + displacement;
        // Find which column's territory the dragged column's center is now in
        // by checking if center has crossed past another column's midpoint
        let targetSlotIndex = originalIndex;
        if (displacement > 0) {
            // Moving RIGHT - check columns to the right
            for (let i = originalIndex + 1; i < orderedKeys.length; i++) {
                const colKey = orderedKeys[i];
                if (!colKey)
                    continue;
                const colRect = columnRectsRef.current.get(colKey);
                if (!colRect)
                    continue;
                // If our center has passed the trigger point, we should be in its slot
                // Lower threshold = more sensitive (triggers earlier when entering the column)
                const triggerPoint = colRect.left + colRect.width * dragSwapThreshold;
                if (currentCenter > triggerPoint) {
                    targetSlotIndex = i;
                }
                else {
                    break; // No need to check further
                }
            }
        }
        else if (displacement < 0) {
            // Moving LEFT - check columns to the left
            for (let i = originalIndex - 1; i >= 0; i--) {
                const colKey = orderedKeys[i];
                if (!colKey)
                    continue;
                const colRect = columnRectsRef.current.get(colKey);
                if (!colRect)
                    continue;
                // If our center has passed the trigger point (going left), we should be in its slot
                // Use (1 - threshold) so a lower threshold also means more sensitive when moving left
                const triggerPoint = colRect.left + colRect.width * (1 - dragSwapThreshold);
                if (currentCenter < triggerPoint) {
                    targetSlotIndex = i;
                }
                else {
                    break; // No need to check further
                }
            }
        }
        // If we haven't moved from original position, no drop target
        if (targetSlotIndex === originalIndex)
            return null;
        // Find the column key at the target position
        const targetKey = orderedKeys[targetSlotIndex];
        if (!targetKey || targetKey === draggedKey)
            return null;
        const targetCol = allColumns.find(c => c.key === targetKey);
        if (!targetCol || !isValidDropTarget(targetCol))
            return null;
        // When moving right, drop AFTER the target; when moving left, drop BEFORE
        const side = targetSlotIndex > originalIndex ? 'right' : 'left';
        return { key: targetKey, side };
    }, [dragState.draggedKey, allColumns, isValidDropTarget, dragSwapThreshold]);
    /**
     * Find which column the pointer is over and which side (left/right half)
     * Returns { key, side } where side determines insert before (left) or after (right)
     *
     * In FLOATING mode: Uses direct hit testing against column rects
     * In INLINE mode: Uses slot-based calculation based on cursor displacement
     */
    const findDropTarget = (0, react_1.useCallback)((x, y) => {
        // INLINE MODE: Use slot-based detection (stable, no feedback loops)
        if (cloneMode === 'inline') {
            return findDropTargetInlineMode(x);
        }
        // FLOATING MODE: Use traditional hit testing against original rects
        for (const [key, rect] of columnRectsRef.current.entries()) {
            if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
                const col = allColumns.find((c) => c.key === key);
                if (col && isValidDropTarget(col)) {
                    // Determine which half of the column the cursor is in
                    const midpoint = rect.left + rect.width / 2;
                    const side = x < midpoint ? 'left' : 'right';
                    return { key, side };
                }
            }
        }
        return null;
    }, [allColumns, isValidDropTarget, cloneMode, findDropTargetInlineMode]);
    /**
     * Handle pointer down on drag handle
     */
    const handlePointerDown = (0, react_1.useCallback)((e, columnKey, label) => {
        e.preventDefault();
        e.stopPropagation();
        const target = e.currentTarget;
        const cell = target.closest('[data-column-key]');
        if (!cell)
            return;
        const rect = cell.getBoundingClientRect();
        // Find the column to get its alignment
        const column = allColumns.find((col) => col.key === columnKey);
        const align = column?.isLast ? 'right' : (column?.align ?? 'left');
        // Capture pointer for tracking
        target.setPointerCapture(e.pointerId);
        // Capture all column positions for hit testing
        captureColumnRects();
        // Store drag start position for inline mode
        dragStartXRef.current = e.clientX;
        // For inline mode: capture original index and column order for slot-based detection
        const draggableColumns = allColumns.filter(col => !col.isSticky && col.key !== '__checkbox');
        orderedKeysAtDragStartRef.current = draggableColumns.map(col => col.key);
        draggedOriginalIndexRef.current = draggableColumns.findIndex(col => col.key === columnKey);
        setDragState({
            isDragging: true,
            draggedKey: columnKey,
            dragOverKey: null,
            dropSide: null,
            pointerX: e.clientX,
            pointerY: e.clientY,
            dragWidth: rect.width,
            dragHeight: rect.height,
            dragLabel: label,
            dragAlign: align,
        });
    }, [captureColumnRects, allColumns]);
    /**
     * Handle pointer move during drag
     */
    const handlePointerMove = (0, react_1.useCallback)((e) => {
        if (!dragState.isDragging || !dragState.draggedKey)
            return;
        const dropTarget = findDropTarget(e.clientX, e.clientY);
        // Check if drop would result in no change based on side
        let effectiveTarget = null;
        let effectiveSide = null;
        if (dropTarget && dropTarget.key !== dragState.draggedKey) {
            const fromIndex = allColumns.findIndex((col) => col.key === dragState.draggedKey);
            const toIndex = allColumns.findIndex((col) => col.key === dropTarget.key);
            // Determine if this would be a no-op based on side:
            // - Left side (insert before): no-op if dragged column is already immediately before target
            // - Right side (insert after): no-op if dragged column is already immediately after target
            const isNoOp = dropTarget.side === 'left'
                ? fromIndex === toIndex - 1 // Already immediately before
                : fromIndex === toIndex + 1; // Already immediately after
            if (!isNoOp) {
                effectiveTarget = dropTarget.key;
                effectiveSide = dropTarget.side;
            }
        }
        setDragState((prev) => ({
            ...prev,
            pointerX: e.clientX,
            pointerY: e.clientY,
            dragOverKey: effectiveTarget,
            dropSide: effectiveSide,
        }));
    }, [dragState.isDragging, dragState.draggedKey, findDropTarget, allColumns]);
    /**
     * Handle pointer up - complete the drag
     */
    const handlePointerUp = (0, react_1.useCallback)((e) => {
        if (!dragState.isDragging || !dragState.draggedKey) {
            setDragState((prev) => ({ ...prev, isDragging: false, draggedKey: null, dragOverKey: null, dropSide: null }));
            return;
        }
        const dropTarget = findDropTarget(e.clientX, e.clientY);
        if (dropTarget && dropTarget.key !== dragState.draggedKey && onReorderColumns) {
            const fromIndex = allColumns.findIndex((col) => col.key === dragState.draggedKey);
            const toIndex = allColumns.findIndex((col) => col.key === dropTarget.key);
            // Determine if this would be a no-op based on side
            const isNoOp = dropTarget.side === 'left'
                ? fromIndex === toIndex - 1
                : fromIndex === toIndex + 1;
            if (!isNoOp) {
                // Store the dragged key for FLIP animation
                lastDroppedKeyRef.current = dragState.draggedKey;
                // Pass column keys and whether to insert after (right side) or before (left side)
                const insertAfter = dropTarget.side === 'right';
                onReorderColumns(dragState.draggedKey, dropTarget.key, insertAfter);
                // Clear the ref after animation completes
                setTimeout(() => {
                    lastDroppedKeyRef.current = null;
                }, config_1.ANIMATION_CONFIG.COLUMN_ANIMATION_DURATION + 50);
            }
        }
        // Reset drag state and refs
        setDragState(INITIAL_DRAG_STATE);
        draggedOriginalIndexRef.current = -1;
        orderedKeysAtDragStartRef.current = [];
    }, [dragState.isDragging, dragState.draggedKey, findDropTarget, onReorderColumns, allColumns, lastDroppedKeyRef]);
    /**
     * Handle pointer cancel
     */
    const handlePointerCancel = (0, react_1.useCallback)(() => {
        setDragState(INITIAL_DRAG_STATE);
        draggedOriginalIndexRef.current = -1;
        orderedKeysAtDragStartRef.current = [];
    }, []);
    /**
     * Calculate shift direction for a column based on drop position
     *
     * FLOATING MODE: Neighbors of drop position shift apart to create a small gap
     * INLINE MODE: Columns between original and drop position shift to fill/make room
     *              (like browser tab reordering)
     */
    const getShiftDirection = (0, react_1.useCallback)((columnKey, colIndex) => {
        if (!dragState.dragOverKey || !dragState.dropSide || !dragState.draggedKey)
            return null;
        const draggedIndex = allColumns.findIndex((c) => c.key === dragState.draggedKey);
        const dropTargetIndex = allColumns.findIndex((c) => c.key === dragState.dragOverKey);
        if (draggedIndex === -1 || dropTargetIndex === -1)
            return null;
        // Don't shift the dragged column itself
        if (columnKey === dragState.draggedKey)
            return null;
        // INLINE MODE: Columns between original and drop position shift to reorder
        if (cloneMode === 'inline') {
            // Calculate effective drop index
            const effectiveDropIndex = dragState.dropSide === 'right' ? dropTargetIndex + 1 : dropTargetIndex;
            // Dragging RIGHT (to a later position)
            if (effectiveDropIndex > draggedIndex) {
                // Columns between dragged position and drop position shift LEFT
                if (colIndex > draggedIndex && colIndex < effectiveDropIndex) {
                    return 'left';
                }
                // The drop target shifts left if dropping on its right side
                if (colIndex === dropTargetIndex && dragState.dropSide === 'right') {
                    return 'left';
                }
            }
            // Dragging LEFT (to an earlier position)
            else if (effectiveDropIndex < draggedIndex) {
                // Columns between drop position and dragged position shift RIGHT
                if (colIndex >= effectiveDropIndex && colIndex < draggedIndex) {
                    return 'right';
                }
            }
            return null;
        }
        // FLOATING MODE: Just shift immediate neighbors to create gap for drop indicator
        if (dragState.dropSide === 'left') {
            if (columnKey === dragState.dragOverKey) {
                return 'right';
            }
            else if (colIndex === dropTargetIndex - 1) {
                return 'left';
            }
        }
        else {
            if (columnKey === dragState.dragOverKey) {
                return 'left';
            }
            else if (colIndex === dropTargetIndex + 1) {
                return 'right';
            }
        }
        return null;
    }, [dragState.dragOverKey, dragState.dropSide, dragState.draggedKey, allColumns, cloneMode]);
    /**
     * Get inline offset for the dragged column (inline mode only)
     * Returns the translateX value in pixels, or null if not applicable
     */
    const getInlineOffset = (0, react_1.useCallback)((columnKey) => {
        if (cloneMode !== 'inline')
            return null;
        if (!dragState.isDragging)
            return null;
        if (columnKey !== dragState.draggedKey)
            return null;
        // Calculate offset from drag start position
        return dragState.pointerX - dragStartXRef.current;
    }, [cloneMode, dragState.isDragging, dragState.draggedKey, dragState.pointerX]);
    /**
     * Get the shift amount in pixels for a column
     * In floating mode: small gap (4px) - just creates space for drop indicator
     * In inline mode: full width of the dragged column - columns actually reposition
     */
    const getShiftAmount = (0, react_1.useCallback)(() => {
        if (cloneMode === 'inline' && dragState.draggedKey) {
            // Get the width of the dragged column from captured rects
            const draggedRect = columnRectsRef.current?.get(dragState.draggedKey);
            if (draggedRect) {
                return draggedRect.width;
            }
        }
        // Small gap for floating mode (creates space for drop indicator)
        return 4;
    }, [cloneMode, dragState.draggedKey]);
    return {
        dragState,
        columnRectsRef,
        lastDroppedKeyRef,
        dragStartXRef,
        isColumnDraggable,
        handlePointerDown,
        handlePointerMove,
        handlePointerUp,
        handlePointerCancel,
        getShiftDirection,
        getInlineOffset,
        getShiftAmount,
        cloneMode,
    };
}
exports.useHeaderDrag = useHeaderDrag;
//# sourceMappingURL=use-header-drag.js.map