/**
 * Biaxial Expand V4 - Clip Path Utilities
 *
 * Generates clip-path values for the biaxial expand animation.
 * Matches V3's calculation logic for the unified model.
 */

import type { SlotDimensions, LayoutConfig, ExpandOrigin } from '../types'

// ============================================================================
// CONTENT CLIP PATH (for unified ContentLayer)
// ============================================================================

/**
 * Generate clip-path for the unified content layer.
 * Shows only trigger area when collapsed, full panel when expanded.
 *
 * This matches V3's getClipPath() logic exactly.
 */
export function getContentClipPath(
  expanded: boolean,
  dimensions: SlotDimensions,
  layout: LayoutConfig,
  borderRadius: number
): string {
  const { panelWidth, triggerWidth, triggerHeight, bottomGap } = layout
  const panelHeight = triggerHeight + bottomGap + dimensions.bottomHeight

  if (expanded) {
    return `inset(0 0 0 0 round ${borderRadius}px)`
  }

  // Collapsed: show only trigger area centered
  const sideInset = (panelWidth - triggerWidth) / 2
  const bottomInset = panelHeight - triggerHeight

  return `inset(0 ${sideInset}px ${bottomInset}px ${sideInset}px round ${borderRadius}px)`
}

// ============================================================================
// BACKDROP CLIP PATH
// ============================================================================

/**
 * Generate clip-path for the backdrop layer (when using clip-path mode).
 * Similar to content clip-path but accounts for backdropTopOffset.
 */
export function getBackdropClipPath(
  expanded: boolean,
  dimensions: SlotDimensions,
  layout: LayoutConfig,
  borderRadius: number,
  backdropTopOffset: number
): string {
  const { panelWidth, triggerWidth, triggerHeight, bottomGap } = layout
  const panelHeight = triggerHeight + bottomGap + dimensions.bottomHeight

  if (expanded) {
    return `inset(0 0 0 0 round ${borderRadius}px)`
  }

  // Collapsed: show only trigger area, accounting for top offset
  const sideInset = (panelWidth - triggerWidth) / 2
  const topInset = backdropTopOffset
  const bottomInset = panelHeight + backdropTopOffset - triggerHeight

  return `inset(${topInset}px ${sideInset}px ${bottomInset}px ${sideInset}px round ${borderRadius}px)`
}

// ============================================================================
// SLOT CONTAINER CLIP PATH
// ============================================================================

/**
 * Generate clip-path for slot containers (top, bottom).
 * Creates the "card growing" effect from a specified origin.
 *
 * NOTE: We don't use `round` in clip-path here because it creates standard
 * circular corners that conflict with the element's borderRadius and
 * corner-squircle class. The element's own border-radius handles corners.
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
