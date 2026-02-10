/**
 * Biaxial Expand - Positioning Utilities
 *
 * Calculates horizontal positioning and clip-path insets based on expandOriginX.
 */

import type { ExpandOriginX, VerticalAlign } from '../types'

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
// VERTICAL ALIGNMENT FOR HORIZONTAL SLOTS
// ============================================================================

/**
 * Calculate vertical offset for horizontal slots (left/right) based on alignment.
 *
 * @param align - Vertical alignment ('top' | 'center' | 'bottom')
 * @param containerHeight - Total height of the container (full panel height)
 * @param slotHeight - Height of the slot content
 * @returns Offset from top in pixels
 * @deprecated Use getHorizontalSlotVerticalPosition for trigger-relative alignment
 */
export function getVerticalOffset(
  align: VerticalAlign,
  containerHeight: number,
  slotHeight: number
): number {
  switch (align) {
    case 'top':
      return 0
    case 'center':
      return (containerHeight - slotHeight) / 2
    case 'bottom':
      return containerHeight - slotHeight
    default:
      return 0
  }
}

// ============================================================================
// HORIZONTAL SLOT VERTICAL POSITION (TRIGGER-RELATIVE)
// ============================================================================

export interface HorizontalSlotVerticalPosition {
  /** The final top offset for CSS positioning */
  topOffset: number
  /** Extra padding needed above the trigger to accommodate the slot */
  alignmentPadding: number
}

/**
 * Calculate vertical position for horizontal slots (left/right) RELATIVE TO THE TRIGGER.
 *
 * This function calculates where the slot should be positioned so that its
 * verticalAlign property aligns the slot with the trigger, not the full panel.
 *
 * - 'top': Slot's top edge aligns with trigger's top edge
 * - 'center': Slot centers vertically with the trigger
 * - 'bottom': Slot's bottom edge aligns with trigger's bottom edge
 *
 * When the slot is taller than the trigger and alignment would push it above
 * the trigger's top edge, we calculate alignmentPadding - the extra space
 * needed above the trigger to accommodate the slot.
 *
 * @param verticalAlign - Alignment relative to trigger ('top' | 'center' | 'bottom')
 * @param triggerTopInContentLayer - Where the trigger starts in ContentLayer (topSlotContribution)
 * @param triggerHeight - Height of the trigger
 * @param slotHeight - Height of the slot content
 * @returns topOffset for CSS and alignmentPadding for panel extension
 */
export function getHorizontalSlotVerticalPosition(
  verticalAlign: VerticalAlign,
  triggerTopInContentLayer: number,
  triggerHeight: number,
  slotHeight: number
): HorizontalSlotVerticalPosition {
  // Handle 'full' mode - position at ContentLayer top (0)
  // Slot spans from top to bottom, ignoring trigger position
  if (verticalAlign === 'full') {
    return {
      topOffset: 0,
      alignmentPadding: 0,
    }
  }

  // Calculate where the slot's top edge should be RELATIVE to the trigger's top edge
  let slotTopRelativeToTrigger: number

  switch (verticalAlign) {
    case 'top':
      // Slot top aligns with trigger top
      slotTopRelativeToTrigger = 0
      break
    case 'center':
      // Slot center aligns with trigger center
      // If slot is taller, it extends equally above and below trigger
      slotTopRelativeToTrigger = (triggerHeight - slotHeight) / 2
      break
    case 'bottom':
      // Slot bottom aligns with trigger bottom
      // If slot is taller, it extends above the trigger
      slotTopRelativeToTrigger = triggerHeight - slotHeight
      break
    default:
      slotTopRelativeToTrigger = 0
  }

  // The absolute position in ContentLayer coordinates
  // triggerTopInContentLayer is how far down the trigger starts (due to top slot)
  const rawTopOffset = triggerTopInContentLayer + slotTopRelativeToTrigger

  // If rawTopOffset is negative, the slot extends above ContentLayer's current top
  // We need alignment padding to extend the panel upward
  const alignmentPadding = rawTopOffset < 0 ? Math.abs(rawTopOffset) : 0

  // The final topOffset accounts for the alignment padding
  // After ContentLayer extends upward by alignmentPadding, the slot's position shifts
  const topOffset = rawTopOffset + alignmentPadding

  return { topOffset, alignmentPadding }
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

// ============================================================================
// HORIZONTAL SLOT HEIGHT CONTRIBUTION
// ============================================================================

/**
 * Calculate where a horizontal slot's bottom edge ends relative to the trigger top.
 *
 * Used for panel height calculations when a horizontal slot drives panel height.
 * The key insight is that the slot's height contribution to the panel depends on
 * its vertical alignment relative to the trigger:
 *
 * - 'top': Slot starts at trigger top, extends down by slotHeight
 * - 'center': Slot is centered with trigger, bottom = (triggerHeight + slotHeight) / 2
 * - 'bottom': Slot ends at trigger bottom, extends above
 *
 * @param verticalAlign - Alignment relative to trigger ('top' | 'center' | 'bottom')
 * @param triggerHeight - Height of the trigger
 * @param slotHeight - Height of the slot content
 * @returns Distance from trigger top to slot bottom edge (may be less than slotHeight for center/bottom alignment)
 */
export function getHorizontalSlotBottomPosition(
  verticalAlign: VerticalAlign,
  triggerHeight: number,
  slotHeight: number
): number {
  // For 'full' mode, bottom position is simply slotHeight (starts at 0)
  if (verticalAlign === 'full') {
    return slotHeight
  }

  switch (verticalAlign) {
    case 'top':
      // Slot starts at trigger top, extends down by slotHeight
      return slotHeight
    case 'center':
      // Slot is centered with trigger
      // Bottom = triggerCenter + slotHeight/2 = triggerHeight/2 + slotHeight/2
      return (triggerHeight + slotHeight) / 2
    case 'bottom':
      // Slot ends at trigger bottom
      return triggerHeight
    default:
      return slotHeight
  }
}
