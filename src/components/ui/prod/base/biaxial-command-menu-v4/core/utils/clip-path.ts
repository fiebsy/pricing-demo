/**
 * Biaxial Expand V4 - Clip Path Utilities
 *
 * Generates clip-path values for the biaxial expand animation.
 */

import type { SlotDimensions, LayoutConfig, ExpandOrigin } from '../types'

// ============================================================================
// CONTENT CLIP PATH
// ============================================================================

/**
 * Generate clip-path for the content layer.
 * Uses inset() with border-radius for smooth reveal animation.
 */
export function getContentClipPath(
  expanded: boolean,
  dimensions: SlotDimensions,
  layout: LayoutConfig,
  borderRadius: number
): string {
  if (expanded) {
    // Fully expanded - show entire panel
    return `inset(0 0 0 0 round ${borderRadius}px)`
  }

  // Collapsed - show only trigger area centered
  const { panelWidth, triggerWidth, triggerHeight } = layout
  const { topHeight } = dimensions

  // Calculate insets to reveal only the trigger
  const horizontalInset = (panelWidth - triggerWidth) / 2
  const topInset = topHeight // Hide top section
  const bottomInset = 0 // Will be calculated based on content

  return `inset(${topInset}px ${horizontalInset}px ${bottomInset}px ${horizontalInset}px round ${borderRadius}px)`
}

// ============================================================================
// BACKDROP CLIP PATH
// ============================================================================

/**
 * Generate clip-path for the backdrop layer (when using clip-path mode).
 */
export function getBackdropClipPath(
  expanded: boolean,
  dimensions: SlotDimensions,
  layout: LayoutConfig,
  borderRadius: number,
  backdropTopOffset: number
): string {
  if (expanded) {
    return `inset(0 0 0 0 round ${borderRadius}px)`
  }

  const { panelWidth, triggerWidth, triggerHeight } = layout
  const { topHeight } = dimensions

  const horizontalInset = (panelWidth - triggerWidth) / 2
  const topInset = topHeight + backdropTopOffset

  return `inset(${topInset}px ${horizontalInset}px 0 ${horizontalInset}px round ${borderRadius}px)`
}

// ============================================================================
// SLOT CONTAINER CLIP PATH
// ============================================================================

/**
 * Generate clip-path for slot containers (top, bottom).
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
      // Collapse toward top
      return 'inset(0 0 100% 0)'
    case 'bottom':
      // Collapse toward bottom
      return 'inset(100% 0 0 0)'
    case 'center':
    default:
      // Collapse toward center
      return 'inset(50% 0 50% 0)'
  }
}

// ============================================================================
// TOP SECTION CLIP PATH
// ============================================================================

/**
 * Generate clip-path for top section (expands upward from bottom edge).
 */
export function getTopSectionClipPath(expanded: boolean): string {
  if (expanded) {
    return 'inset(0 0 0 0)'
  }
  // Collapsed: clip from top, reveal from bottom
  return 'inset(100% 0 0 0)'
}
