/**
 * Biaxial Expand - Positioning Utilities
 *
 * Calculates horizontal positioning and clip-path insets based on expandOriginX.
 */

import type { ExpandOriginX } from '../types'

// ============================================================================
// HORIZONTAL POSITIONING
// ============================================================================

export interface HorizontalPosition {
  left: string | number
  right?: string | number
  marginLeft: number
}

/**
 * Calculate horizontal positioning for a layer based on expandOriginX.
 *
 * @param expandOriginX - The horizontal origin ('left' | 'center' | 'right')
 * @param panelWidth - The width of the expanded panel
 * @param currentWidth - The current width (may be trigger or panel width)
 */
export function getHorizontalPosition(
  expandOriginX: ExpandOriginX,
  panelWidth: number,
  currentWidth: number
): HorizontalPosition {
  switch (expandOriginX) {
    case 'left':
      return { left: 0, marginLeft: 0 }
    case 'right':
      return { left: 'auto', right: 0, marginLeft: 0 }
    case 'center':
    default:
      return { left: '50%', marginLeft: -(currentWidth / 2) }
  }
}

// ============================================================================
// TRIGGER OFFSET
// ============================================================================

/**
 * Calculate trigger offset within the panel based on expandOriginX.
 *
 * When collapsed, the trigger should stay at its origin position.
 * When expanded, the trigger fills the full width so offset is 0.
 *
 * @param expandOriginX - The horizontal origin
 * @param panelWidth - Width of the expanded panel
 * @param triggerWidth - Width of the collapsed trigger
 * @param expanded - Current expansion state
 */
export function getTriggerOffset(
  expandOriginX: ExpandOriginX,
  panelWidth: number,
  triggerWidth: number,
  expanded: boolean
): number {
  if (expanded) {
    return 0
  }

  switch (expandOriginX) {
    case 'left':
      return 0
    case 'right':
      return panelWidth - triggerWidth
    case 'center':
    default:
      return (panelWidth - triggerWidth) / 2
  }
}

// ============================================================================
// CLIP PATH INSETS
// ============================================================================

export interface ClipPathInsets {
  leftInset: number
  rightInset: number
}

/**
 * Calculate clip-path insets for asymmetric expansion based on expandOriginX.
 *
 * @param expandOriginX - The horizontal origin
 * @param panelWidth - Width of the expanded panel
 * @param triggerWidth - Width of the collapsed trigger
 */
export function getClipPathInsets(
  expandOriginX: ExpandOriginX,
  panelWidth: number,
  triggerWidth: number
): ClipPathInsets {
  const totalExpansion = panelWidth - triggerWidth

  switch (expandOriginX) {
    case 'left':
      // Expands to the right
      return { leftInset: 0, rightInset: totalExpansion }
    case 'right':
      // Expands to the left
      return { leftInset: totalExpansion, rightInset: 0 }
    case 'center':
    default:
      // Expands equally on both sides
      return { leftInset: totalExpansion / 2, rightInset: totalExpansion / 2 }
  }
}

// ============================================================================
// RIGHT SLOT POSITIONING
// ============================================================================

/**
 * Calculate the left position for the right slot based on expandOriginX.
 *
 * The right slot must be positioned at the ContentLayer's right edge,
 * which varies based on how the panel expands horizontally.
 *
 * @param expandOriginX - The horizontal origin ('left' | 'center' | 'right')
 * @param panelWidth - Width of the expanded panel
 * @param triggerWidth - Width of the collapsed trigger
 */
export function getRightSlotLeftPosition(
  expandOriginX: ExpandOriginX,
  panelWidth: number,
  triggerWidth: number
): number {
  switch (expandOriginX) {
    case 'left':
      // ContentLayer starts at left: 0, ends at panelWidth
      return panelWidth
    case 'right':
      // ContentLayer ends at right: 0 (triggerWidth)
      return triggerWidth
    case 'center':
    default:
      // ContentLayer is centered, right edge at (triggerWidth + panelWidth) / 2
      return (triggerWidth + panelWidth) / 2
  }
}
