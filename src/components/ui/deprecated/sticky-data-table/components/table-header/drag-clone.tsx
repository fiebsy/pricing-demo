'use client'

/**
 * StickyDataTable V2 - DragClone Component
 *
 * Floating clone of the dragged column rendered via portal.
 * Shows a preview with gradient border and skeleton rows.
 *
 * @module components/table-header/drag-clone
 */

import { createPortal } from 'react-dom'
import type { DragCloneProps } from './types'

const MAX_CLONE_WIDTH = 160 // px

/**
 * Floating drag clone - rendered via portal
 * Exact replica of column with gradient border that fades out
 */
export function DragClone({ dragState }: DragCloneProps) {
  if (!dragState.isDragging || typeof document === 'undefined') {
    return null
  }

  // Alignment classes matching the original column
  const alignClass = dragState.dragAlign === 'right'
    ? 'justify-end text-right'
    : dragState.dragAlign === 'center'
      ? 'justify-center text-center'
      : 'justify-start text-left'

  // Constrain clone width to prevent overly wide clones
  const cloneWidth = Math.min(dragState.dragWidth, MAX_CLONE_WIDTH)

  // Position clone based on alignment:
  // - Right-aligned: clone appears to the RIGHT of cursor
  // - Left-aligned: clone appears to the LEFT of cursor
  // - Center: clone appears to the RIGHT of cursor (default)
  const cloneLeft = dragState.dragAlign === 'left'
    ? dragState.pointerX - cloneWidth - 4
    : dragState.pointerX + 4

  return createPortal(
    <div
      className="pointer-events-none fixed z-[9999]"
      style={{
        left: cloneLeft,
        top: dragState.pointerY + 8,
        width: cloneWidth,
        cursor: 'grabbing',
      }}
    >
      {/* Outer container with gradient border effect */}
      <div
        className="relative flex flex-col overflow-hidden opacity-80"
        style={{
          background: 'linear-gradient(to bottom, var(--border-color-primary) 0%, transparent 100%)',
          padding: '1px',
        }}
      >
        {/* Inner content with solid background */}
        <div className="flex flex-col overflow-hidden">
          {/* Header cell - exact replica */}
          <div
            className={`flex items-center bg-primary/95 px-3 text-xs font-medium text-tertiary backdrop-blur-sm ${alignClass}`}
            style={{ height: dragState.dragHeight }}
          >
            {dragState.dragLabel}
          </div>
          {/* Skeleton rows with gradient fade effect */}
          <div className="relative bg-primary/40">
            {/* Row 1 - most visible */}
            <div
              className={`flex items-center border-t border-primary/60 px-3 ${alignClass}`}
              style={{ height: 46, opacity: 0.85 }}
            >
              <div className="h-3.5 w-3/4 rounded-sm bg-tertiary" />
            </div>
            {/* Row 2 - fading */}
            <div
              className={`flex items-center border-t border-primary/40 px-3 ${alignClass}`}
              style={{ height: 46, opacity: 0.5 }}
            >
              <div className="h-3.5 w-1/2 rounded-sm bg-tertiary" />
            </div>
            {/* Row 3 - faded out */}
            <div
              className={`flex items-center border-t border-primary/20 px-3 ${alignClass}`}
              style={{ height: 46, opacity: 0.2 }}
            >
              <div className="h-3.5 w-2/3 rounded-sm bg-tertiary" />
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

/**
 * Global grabbing cursor during drag - rendered via portal to document.head
 */
export function DragCursor({ isDragging }: { isDragging: boolean }) {
  if (!isDragging || typeof document === 'undefined') {
    return null
  }

  return createPortal(
    <style>{`* { cursor: grabbing !important; }`}</style>,
    document.head
  )
}
