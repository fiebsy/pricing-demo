'use client'

/**
 * StickyDataTable V2 - DropIndicator Component
 *
 * Visual indicator showing where a dragged column will be dropped.
 * Diamond shape at top with vertical line.
 *
 * @module components/table-header/drop-indicator
 */

import type { DropIndicatorProps } from './types'

/**
 * Drop indicator - rendered at container level for stable positioning
 * Uses cached column rects so indicator doesn't move with cell transform
 */
export function DropIndicator({
  dragOverKey,
  dropSide,
  columnRectsRef,
  headerScrollRef,
}: DropIndicatorProps) {
  if (!dragOverKey || !dropSide) {
    return null
  }

  const targetRect = columnRectsRef.current?.get(dragOverKey)
  const containerRect = headerScrollRef.current?.getBoundingClientRect()

  if (!targetRect || !containerRect) {
    return null
  }

  // Calculate indicator position relative to container
  const indicatorX = dropSide === 'right'
    ? targetRect.right - containerRect.left
    : targetRect.left - containerRect.left

  return (
    <div
      className="pointer-events-none absolute top-0 bottom-0 z-30 flex flex-col items-center"
      style={{
        left: indicatorX,
        transform: 'translateX(-50%)', // Center the indicator on the edge
      }}
      aria-hidden="true"
    >
      {/* Diamond indicator at top */}
      <div
        className="size-2 rotate-45 bg-brand-solid -mt-0.5"
        style={{ borderRadius: '1px' }}
      />
      {/* Vertical line */}
      <div className="w-0.5 flex-1 bg-brand-solid rounded-b-full" />
    </div>
  )
}
