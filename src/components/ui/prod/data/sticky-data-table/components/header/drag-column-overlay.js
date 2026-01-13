"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.DragColumnOverlay = void 0;
/**
 * StickyDataTable V2 - DragColumnOverlay Component
 *
 * Renders a unified overlay that spans the entire dragged column (header + body).
 * This provides a single shine/shadow effect around the whole column instead of
 * per-cell styling which creates visual breaks.
 *
 * Rendered as a fixed-position element (not a portal) to maintain proper
 * stacking context with table cells.
 *
 * @module components/header/drag-column-overlay
 */
const react_1 = require("react");
/**
 * DragColumnOverlay
 *
 * A fixed-position overlay that provides unified column styling during drag.
 * Positioned over the dragged column and follows it as it moves.
 *
 * Benefits over per-cell styling:
 * - Single shine/shadow border around the entire column
 * - No visual breaks between header and body cells
 * - Can include complex effects (gradients, glows)
 * - Doesn't interfere with cell memoization
 */
const DragColumnOverlayBase = ({ dragState, columnRectsRef, dragStartXRef, bodyScrollRef, borderRadius = 8, }) => {
    // Don't render if not dragging or no dragged key
    if (!dragState.isDragging || !dragState.draggedKey)
        return null;
    // Get the dragged column's original rect
    const columnRect = columnRectsRef.current?.get(dragState.draggedKey);
    if (!columnRect)
        return null;
    // Get body container rect for height calculation
    const bodyRect = bodyScrollRef.current?.getBoundingClientRect();
    if (!bodyRect)
        return null;
    // Calculate displacement from drag start
    const displacement = dragState.pointerX - (dragStartXRef.current ?? 0);
    // Calculate overlay position
    // The overlay follows the column as it moves
    const left = columnRect.left + displacement;
    const top = columnRect.top;
    const width = columnRect.width;
    // Height spans from header top to body bottom
    const height = bodyRect.bottom - columnRect.top;
    return (<div className="pointer-events-none fixed z-40 bg-quaternary/80 corner-squircle" style={{
            left,
            top,
            width,
            height,
            // Unified column styling - shine border with shadow
            boxShadow: 'var(--shine-3), var(--shadow-lg)',
            borderRadius: `${borderRadius}px`,
        }} aria-hidden="true"/>);
};
exports.DragColumnOverlay = (0, react_1.memo)(DragColumnOverlayBase);
exports.DragColumnOverlay.displayName = 'DragColumnOverlay';
//# sourceMappingURL=drag-column-overlay.js.map