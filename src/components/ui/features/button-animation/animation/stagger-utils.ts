/**
 * ButtonAnimation V2 - Stagger Utilities
 *
 * Utilities for staggered animation delays and entry offsets.
 *
 * @module prod/base/button-animation-v2/animation
 */

import type { EntryDirection, EntryOrder, StaggerDirection } from '../types'

// ============================================================================
// ENTRY OFFSET
// ============================================================================

export interface EntryOffset {
  x: number
  y: number
}

/**
 * Calculates initial position offset based on entry direction.
 */
export function getEntryOffset(
  direction: EntryDirection,
  distance: number
): EntryOffset {
  switch (direction) {
    case 'right':
      return { x: distance, y: 0 }
    case 'left':
      return { x: -distance, y: 0 }
    case 'up':
      return { x: 0, y: -distance }
    case 'down':
      return { x: 0, y: distance }
    case 'none':
      return { x: 0, y: 0 }
  }
}

// ============================================================================
// STAGGER INDEX
// ============================================================================

/**
 * Calculates effective stagger index for an element.
 */
export function getStaggerIndex(
  index: number,
  total: number,
  order: EntryOrder,
  direction: StaggerDirection
): number {
  let effectiveIndex: number

  switch (order) {
    case 'sequential':
      effectiveIndex = index
      break
    case 'reverse':
      effectiveIndex = total - 1 - index
      break
    case 'center-out': {
      const center = Math.floor(total / 2)
      effectiveIndex = Math.abs(index - center)
      break
    }
  }

  return direction === 'reverse' ? total - 1 - effectiveIndex : effectiveIndex
}

// ============================================================================
// DELAY CALCULATION
// ============================================================================

/**
 * Calculates total animation delay for a child element.
 */
export function getChildDelay(
  index: number,
  total: number,
  baseDelay: number,
  stagger: number,
  order: EntryOrder,
  direction: StaggerDirection
): number {
  const staggerIndex = getStaggerIndex(index, total, order, direction)
  return baseDelay + staggerIndex * stagger
}
