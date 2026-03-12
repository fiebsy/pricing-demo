/**
 * Pricing Select Menu - Clip Path Utilities
 *
 * Generates clip-path values for the expand animation.
 */

import type { ExpandOrigin } from '../types'

// ============================================================================
// SLOT CONTAINER CLIP PATH
// ============================================================================

/**
 * Generate clip-path for slot containers (bottom).
 * Creates the "card growing" effect from a specified origin.
 */
export function getSlotContainerClipPath(
  expanded: boolean,
  origin: ExpandOrigin
): string {
  if (expanded) {
    return 'inset(0 0 0 0)'
  }

  switch (origin) {
    case 'top':
      // Collapse toward top (expands downward)
      return 'inset(0 0 100% 0)'
    case 'bottom':
      // Collapse toward bottom (expands upward)
      return 'inset(100% 0 0 0)'
    case 'center':
    default:
      // Collapse toward center (expands from middle)
      return 'inset(50% 0 50% 0)'
  }
}

// ============================================================================
// CONTENT LAYER CLIP PATH
// ============================================================================

/**
 * Generate clip-path for the content layer.
 * Shows only trigger area when collapsed, full panel when expanded.
 */
export function getContentClipPath(
  expanded: boolean,
  panelHeight: number,
  triggerHeight: number,
  borderRadius: number
): string {
  if (expanded) {
    return `inset(0 0 0 0 round ${borderRadius}px)`
  }

  // Collapsed: show only trigger area
  const bottomInset = panelHeight - triggerHeight

  return `inset(0 0 ${bottomInset}px 0 round ${borderRadius}px)`
}
