/**
 * ButtonAnimation - Stagger Utilities
 *
 * Utilities for calculating staggered animation delays and entry offsets.
 * Supports multiple ordering strategies for cascading effects.
 *
 * @module prod/base/button-animation/animation
 */

import type { EntryDirection, EntryOrder, StaggerDirection } from '../types'

// ============================================================================
// ENTRY OFFSET CALCULATION
// ============================================================================

/**
 * Offset coordinates for entry animations.
 */
export interface EntryOffset {
  x: number
  y: number
}

/**
 * Calculates the initial position offset based on entry direction.
 *
 * Elements animate FROM this offset TO their final position (0, 0).
 *
 * @param direction - Direction from which element enters
 * @param distance - Distance in pixels to travel
 * @returns Offset coordinates for initial position
 *
 * @example
 * ```ts
 * getEntryOffset('down', 8)  // → { x: 0, y: 8 }  // Enters from below
 * getEntryOffset('right', 20) // → { x: 20, y: 0 } // Enters from right
 * getEntryOffset('none', 8)   // → { x: 0, y: 0 }  // No positional animation
 * ```
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
// STAGGER INDEX CALCULATION
// ============================================================================

/**
 * Calculates the effective stagger index for an element.
 *
 * This determines when an element starts animating relative to siblings.
 * Different ordering strategies create different visual effects:
 *
 * - sequential: Standard left-to-right cascade
 * - reverse: Right-to-left cascade (last appears first)
 * - center-out: Center items appear first, edges last
 *
 * @param index - Element's position in the list (0-based)
 * @param total - Total number of elements
 * @param order - Ordering strategy
 * @param direction - Whether to reverse the final order
 * @returns Effective index for delay calculation
 *
 * @example
 * ```ts
 * // Sequential ordering for 5 items
 * getStaggerIndex(0, 5, 'sequential', 'forward') // → 0
 * getStaggerIndex(2, 5, 'sequential', 'forward') // → 2
 *
 * // Center-out ordering for 5 items
 * getStaggerIndex(0, 5, 'center-out', 'forward') // → 2 (edge)
 * getStaggerIndex(2, 5, 'center-out', 'forward') // → 0 (center)
 * ```
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
      // Calculate distance from center
      const center = Math.floor(total / 2)
      effectiveIndex = Math.abs(index - center)
      break
    }
  }

  // Apply direction reversal if needed
  return direction === 'reverse' ? total - 1 - effectiveIndex : effectiveIndex
}

// ============================================================================
// DELAY CALCULATION
// ============================================================================

/**
 * Calculates the total animation delay for a child element.
 *
 * Combines base delay with staggered offset based on position.
 *
 * @param index - Element's position (0-based)
 * @param total - Total number of elements
 * @param baseDelay - Initial delay before any children animate (seconds)
 * @param stagger - Delay between consecutive children (seconds)
 * @param order - Ordering strategy
 * @param direction - Stagger direction
 * @returns Total delay in seconds
 *
 * @example
 * ```ts
 * // First child with no base delay
 * getChildDelay(0, 3, 0, 0.03, 'sequential', 'forward') // → 0
 *
 * // Third child with 30ms stagger
 * getChildDelay(2, 3, 0, 0.03, 'sequential', 'forward') // → 0.06
 *
 * // With 100ms base delay
 * getChildDelay(0, 3, 0.1, 0.03, 'sequential', 'forward') // → 0.1
 * ```
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
