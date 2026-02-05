/**
 * Biaxial Expand - Clip Path Utilities
 *
 * Generates clip-path values for the biaxial expand animation.
 */

import type { SlotDimensions, LayoutConfig, ExpandOrigin } from '../types'

// ============================================================================
// CONTENT CLIP PATH (for unified ContentLayer)
// ============================================================================

/**
 * Generate clip-path for the unified content layer.
 * Shows only trigger area when collapsed, full panel when expanded.
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
// EXTENDED CONTENT CLIP PATH (for ContentLayer with horizontal slots)
// ============================================================================

/**
 * Generate clip-path for the extended content layer that includes horizontal slots.
 *
 * When horizontal slots are inside ContentLayer, the layer is wider than panelWidth.
 * The clip-path must account for these contributions to properly clip/reveal the slots.
 *
 * @param expanded - Whether the panel is expanded
 * @param panelHeight - Height of the main panel (trigger + bottomGap + bottomHeight)
 * @param triggerHeight - Height of the trigger area
 * @param borderRadius - Border radius for the clip-path
 * @param leftInset - Horizontal clip inset from left (based on expandOriginX)
 * @param rightInset - Horizontal clip inset from right (based on expandOriginX)
 * @param leftContribution - Total width contributed by left slot (width + inset*2 + gap)
 * @param rightContribution - Total width contributed by right slot (width + inset*2 + gap)
 */
export function getExtendedContentClipPath(
  expanded: boolean,
  panelHeight: number,
  triggerHeight: number,
  borderRadius: number,
  leftInset: number,
  rightInset: number,
  leftContribution: number,
  rightContribution: number
): string {
  if (expanded) {
    return `inset(0 0 0 0 round ${borderRadius}px)`
  }

  // Collapsed: show only trigger area
  // The left/right contributions need to be clipped entirely when collapsed
  const bottomInset = panelHeight - triggerHeight
  const totalLeftInset = leftContribution + leftInset
  const totalRightInset = rightContribution + rightInset

  return `inset(0 ${totalRightInset}px ${bottomInset}px ${totalLeftInset}px round ${borderRadius}px)`
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

// ============================================================================
// HORIZONTAL SECTION CLIP PATHS
// ============================================================================

/**
 * Generate clip-path for left section (reveals from right edge, expanding leftward).
 */
export function getLeftSectionClipPath(expanded: boolean): string {
  if (expanded) {
    return 'inset(0 0 0 0)'
  }
  // Collapsed: clip from left side, reveal from right
  return 'inset(0 0 0 100%)'
}

/**
 * Generate clip-path for right section (reveals from left edge, expanding rightward).
 */
export function getRightSectionClipPath(expanded: boolean): string {
  if (expanded) {
    return 'inset(0 0 0 0)'
  }
  // Collapsed: clip from right side, reveal from left
  return 'inset(0 100% 0 0)'
}

/**
 * Generate clip-path for horizontal slot containers (inner "grow" effect).
 */
export function getHorizontalSlotContainerClipPath(
  expanded: boolean,
  origin: 'left' | 'center' | 'right'
): string {
  if (expanded) {
    return 'inset(0 0 0 0)'
  }

  switch (origin) {
    case 'left':
      // Collapse toward left (expands rightward)
      return 'inset(0 100% 0 0)'
    case 'right':
      // Collapse toward right (expands leftward)
      return 'inset(0 0 0 100%)'
    case 'center':
    default:
      // Collapse toward center (expands from middle)
      return 'inset(0 50% 0 50%)'
  }
}

// ============================================================================
// BIAXIAL CLIP PATHS (for diagonal reveal animations)
// ============================================================================

/**
 * Generate biaxial clip-path for right section.
 * Reveals from top-left corner, expanding both rightward AND downward.
 */
export function getRightSectionBiaxialClipPath(expanded: boolean): string {
  if (expanded) {
    return 'inset(0 0 0 0)'
  }
  // Collapsed: clip from right AND bottom (biaxial collapse toward top-left)
  return 'inset(0 100% 100% 0)'
}

/**
 * Generate biaxial clip-path for horizontal slot containers (inner "grow" effect).
 * Creates a compound animation where the inner content grows diagonally.
 */
export function getBiaxialSlotContainerClipPath(
  expanded: boolean,
  horizontalOrigin: 'left' | 'right',
  verticalOrigin: 'top' | 'bottom' = 'top'
): string {
  if (expanded) {
    return 'inset(0 0 0 0)'
  }

  const topInset = verticalOrigin === 'top' ? '0' : '100%'
  const bottomInset = verticalOrigin === 'bottom' ? '0' : '100%'
  const leftInset = horizontalOrigin === 'left' ? '0' : '100%'
  const rightInset = horizontalOrigin === 'right' ? '0' : '100%'

  return `inset(${topInset} ${rightInset} ${bottomInset} ${leftInset})`
}
