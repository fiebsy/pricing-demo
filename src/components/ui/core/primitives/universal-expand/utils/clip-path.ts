/**
 * Universal Expand - Clip Path Utilities
 *
 * Generates clip-path values for 4-directional expansion.
 * Extends the biaxial clip-path system to support horizontal slots.
 */

import type {
  ExtendedSlotPosition,
  ExpandOrigin,
  SlotDimensions,
  LayoutConfig,
  SlotsConfig,
} from '../types'
import { isVerticalSlot, isHorizontalSlot } from '../types'

// ============================================================================
// SLOT CLIP PATH
// ============================================================================

/**
 * Generate clip-path for a slot based on position and origin.
 *
 * clip-path: inset(top right bottom left)
 *
 * Vertical slots (top/bottom) collapse/expand in height.
 * Horizontal slots (left/right) collapse/expand in width.
 */
export function getSlotClipPath(
  expanded: boolean,
  position: ExtendedSlotPosition,
  origin: ExpandOrigin
): string {
  if (expanded) {
    return 'inset(0 0 0 0)'
  }

  if (isVerticalSlot(position)) {
    // Vertical slots: collapse in height
    switch (origin) {
      case 'start':
        // Collapse toward top (content reveals from top edge)
        return 'inset(0 0 100% 0)'
      case 'end':
        // Collapse toward bottom (content reveals from bottom edge)
        return 'inset(100% 0 0 0)'
      case 'center':
      default:
        // Collapse toward center (content reveals from middle)
        return 'inset(50% 0 50% 0)'
    }
  }

  // Horizontal slots: collapse in width
  switch (origin) {
    case 'start':
      // Collapse toward left (content reveals from left edge)
      return 'inset(0 100% 0 0)'
    case 'end':
      // Collapse toward right (content reveals from right edge)
      return 'inset(0 0 0 100%)'
    case 'center':
    default:
      // Collapse toward center (content reveals from middle)
      return 'inset(0 50% 0 50%)'
  }
}

/**
 * Get the appropriate expand origin for a slot position.
 *
 * - Top slot: 'end' (expands upward from bottom edge)
 * - Bottom slot: 'start' (expands downward from top edge)
 * - Left slot: 'end' (expands leftward from right edge)
 * - Right slot: 'start' (expands rightward from left edge)
 */
export function getDefaultExpandOrigin(position: ExtendedSlotPosition): ExpandOrigin {
  switch (position) {
    case 'top':
    case 'left':
      return 'end'
    case 'bottom':
    case 'right':
      return 'start'
  }
}

// ============================================================================
// SECTION CLIP PATH (for outer wrapper reveal)
// ============================================================================

/**
 * Generate clip-path for slot section (outer wrapper reveal).
 * This creates the "reveal from edge" effect before the inner container animates.
 */
export function getSectionClipPath(
  expanded: boolean,
  position: ExtendedSlotPosition
): string {
  if (expanded) {
    return 'inset(0 0 0 0)'
  }

  // Clip from the opposite edge of the expansion direction
  switch (position) {
    case 'top':
      // Top slot reveals from bottom, so clip from top
      return 'inset(100% 0 0 0)'
    case 'bottom':
      // Bottom slot reveals from top, so clip from bottom
      return 'inset(0 0 100% 0)'
    case 'left':
      // Left slot reveals from right, so clip from left
      return 'inset(0 100% 0 0)'
    case 'right':
      // Right slot reveals from left, so clip from right
      return 'inset(0 0 0 100%)'
  }
}

// ============================================================================
// BACKDROP CLIP PATH
// ============================================================================

/**
 * Calculate backdrop clip-path for multi-directional expansion.
 *
 * When collapsed, shows only the trigger area.
 * When expanded, reveals the full backdrop encompassing all enabled slots.
 */
export function getBackdropClipPath(
  expanded: boolean,
  dimensions: SlotDimensions,
  layout: LayoutConfig,
  slots: SlotsConfig
): string {
  if (expanded) {
    return `inset(0 0 0 0 round ${layout.borderRadius}px)`
  }

  // Calculate total backdrop dimensions
  const { triggerWidth, triggerHeight, gaps } = layout
  const {
    topHeight,
    bottomHeight,
    leftWidth,
    rightWidth,
  } = dimensions

  // Calculate offsets for each direction
  const topOffset = slots.top.enabled ? topHeight + gaps.top : 0
  const leftOffset = slots.left.enabled ? leftWidth + gaps.left : 0

  // Calculate total dimensions
  const totalWidth =
    leftOffset +
    triggerWidth +
    (slots.right.enabled ? gaps.right + rightWidth : 0)

  const totalHeight =
    topOffset +
    triggerHeight +
    (slots.bottom.enabled ? gaps.bottom + bottomHeight : 0)

  // Calculate insets to show only trigger area when collapsed
  const topInset = topOffset
  const rightInset = totalWidth - leftOffset - triggerWidth
  const bottomInset = totalHeight - topOffset - triggerHeight
  const leftInset = leftOffset

  return `inset(${topInset}px ${rightInset}px ${bottomInset}px ${leftInset}px round ${layout.borderRadius}px)`
}

// ============================================================================
// CONTENT LAYER CLIP PATH
// ============================================================================

/**
 * Generate clip-path for the unified content layer.
 * Shows only trigger area when collapsed, full panel when expanded.
 *
 * Note: This is used for backward-compatible biaxial mode where
 * trigger and bottom content share the same layer.
 */
export function getContentClipPath(
  expanded: boolean,
  dimensions: SlotDimensions,
  layout: LayoutConfig,
  borderRadius: number
): string {
  const { panelWidth, triggerWidth, triggerHeight } = layout
  const { bottomHeight } = dimensions
  const bottomGap = layout.gaps.bottom
  const panelHeight = triggerHeight + bottomGap + bottomHeight

  if (expanded) {
    return `inset(0 0 0 0 round ${borderRadius}px)`
  }

  // Collapsed: show only trigger area centered
  const sideInset = (panelWidth - triggerWidth) / 2
  const bottomInset = panelHeight - triggerHeight

  return `inset(0 ${sideInset}px ${bottomInset}px ${sideInset}px round ${borderRadius}px)`
}

// ============================================================================
// HELPERS
// ============================================================================

/**
 * Calculate total expanded dimensions based on enabled slots.
 */
export function calculateTotalDimensions(
  dimensions: SlotDimensions,
  layout: LayoutConfig,
  slots: SlotsConfig
): { width: number; height: number } {
  const { triggerWidth, triggerHeight, gaps, panelWidth } = layout
  const { topHeight, bottomHeight, leftWidth, rightWidth } = dimensions

  // Width: base is panelWidth (or triggerWidth if no horizontal expansion)
  let width = panelWidth

  // If left or right slots enabled, calculate full width
  if (slots.left.enabled || slots.right.enabled) {
    width = (slots.left.enabled ? leftWidth + gaps.left : 0) +
            triggerWidth +
            (slots.right.enabled ? gaps.right + rightWidth : 0)
  }

  // Height: trigger + vertical slots
  const height =
    (slots.top.enabled ? topHeight + gaps.top : 0) +
    triggerHeight +
    (slots.bottom.enabled ? gaps.bottom + bottomHeight : 0)

  return { width, height }
}
