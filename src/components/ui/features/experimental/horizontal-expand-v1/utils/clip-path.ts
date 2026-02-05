/**
 * Horizontal Expand V1 - Clip Path Utilities
 *
 * Generates clip-path values for horizontal expand animations.
 * Adapted from BiaxialExpandV4's vertical clip-path logic.
 */

import type { HorizontalExpandOrigin } from '../types'

// ============================================================================
// SLOT CONTAINER CLIP PATH (for left/right slots)
// ============================================================================

/**
 * Generate clip-path for slot containers (left, right).
 * Creates the "card growing" effect from a specified origin.
 *
 * Clip-path inset format: inset(TOP RIGHT BOTTOM LEFT)
 *
 * Horizontal origins:
 * - 'left':   Clips from left side (100% left inset), expands rightward
 * - 'right':  Clips from right side (100% right inset), expands leftward
 * - 'center': Clips from middle (50% left/right), expands both ways
 *
 * NOTE: We don't use `round` in clip-path here because it creates standard
 * circular corners that conflict with the element's borderRadius.
 */
export function getSlotContainerClipPath(
  expanded: boolean,
  origin: HorizontalExpandOrigin
): string {
  if (expanded) {
    return 'inset(0 0 0 0)'
  }

  switch (origin) {
    case 'left':
      // Collapse toward left edge (expands rightward from left)
      // Used for RIGHT slot content: reveals from left edge going right
      return 'inset(0 100% 0 0)'
    case 'right':
      // Collapse toward right edge (expands leftward from right)
      // Used for LEFT slot content: reveals from right edge going left
      return 'inset(0 0 0 100%)'
    case 'center':
    default:
      // Collapse toward center (expands from middle both ways)
      return 'inset(0 50% 0 50%)'
  }
}

// ============================================================================
// BACKDROP CLIP PATH
// ============================================================================

/**
 * Generate clip-path for the backdrop layer.
 * Shows only trigger area when collapsed, full panel when expanded.
 */
export function getBackdropClipPath(
  expanded: boolean,
  totalWidth: number,
  triggerWidth: number,
  leftWidth: number,
  height: number,
  borderRadius: number
): string {
  if (expanded) {
    return `inset(0 0 0 0 round ${borderRadius}px)`
  }

  // Collapsed: show only trigger area centered
  // Calculate how much to inset from each side to reveal only trigger
  const leftInset = leftWidth
  const rightInset = totalWidth - leftWidth - triggerWidth

  return `inset(0 ${rightInset}px 0 ${leftInset}px round ${borderRadius}px)`
}
