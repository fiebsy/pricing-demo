/**
 * Universal Expand - Position Style Utilities
 *
 * Calculates CSS positioning for slots based on their position.
 */

import type { CSSProperties } from 'react'
import type {
  ExtendedSlotPosition,
  LayoutConfig,
  SlotDimensions,
  UnifiedSlotConfig,
} from '../types'
import { isVerticalSlot, isHorizontalSlot } from '../types'

// ============================================================================
// SLOT POSITIONING
// ============================================================================

/**
 * CSS positioning for each slot position relative to the trigger.
 *
 * Top:    bottom: 100%, centered horizontally
 * Bottom: top: triggerHeight + gap, centered horizontally
 * Left:   right: 100%, centered vertically
 * Right:  left: 100%, centered vertically
 */
export function getSlotPositionStyles(
  position: ExtendedSlotPosition,
  layout: LayoutConfig,
  dimensions: SlotDimensions,
  slotConfig: UnifiedSlotConfig
): CSSProperties {
  const { triggerWidth, triggerHeight, panelWidth, gaps } = layout
  const inset = slotConfig.appearance.inset

  // Get slot dimension (height for vertical, width for horizontal)
  const slotDimension = getSlotDimensionValue(position, dimensions)

  switch (position) {
    case 'top':
      return {
        position: 'absolute',
        zIndex: 20,
        bottom: '100%',
        left: '50%',
        width: panelWidth,
        marginLeft: -(panelWidth / 2),
        marginBottom: gaps.top,
        // Total height includes inset padding
        height: slotDimension + inset,
      }

    case 'bottom':
      return {
        position: 'absolute',
        zIndex: 20,
        top: triggerHeight + gaps.bottom,
        left: '50%',
        width: panelWidth,
        marginLeft: -(panelWidth / 2),
        height: slotDimension + inset,
      }

    case 'left':
      return {
        position: 'absolute',
        zIndex: 20,
        right: '100%',
        top: '50%',
        height: triggerHeight,
        marginTop: -(triggerHeight / 2),
        marginRight: gaps.left,
        width: slotDimension + inset,
      }

    case 'right':
      return {
        position: 'absolute',
        zIndex: 20,
        left: '100%',
        top: '50%',
        height: triggerHeight,
        marginTop: -(triggerHeight / 2),
        marginLeft: gaps.right,
        width: slotDimension + inset,
      }
  }
}

/**
 * Get the appropriate dimension value for a slot position.
 */
function getSlotDimensionValue(
  position: ExtendedSlotPosition,
  dimensions: SlotDimensions
): number {
  switch (position) {
    case 'top':
      return dimensions.topHeight
    case 'bottom':
      return dimensions.bottomHeight
    case 'left':
      return dimensions.leftWidth
    case 'right':
      return dimensions.rightWidth
  }
}

// ============================================================================
// INNER CONTAINER POSITIONING
// ============================================================================

/**
 * CSS positioning for inner content container within a slot.
 * The inner container has inset padding on all sides.
 */
export function getInnerContainerStyles(
  position: ExtendedSlotPosition,
  slotConfig: UnifiedSlotConfig
): CSSProperties {
  const inset = slotConfig.appearance.inset

  // Inner container uses absolute positioning with insets
  const base: CSSProperties = {
    position: 'absolute',
    borderRadius: slotConfig.appearance.borderRadius,
    overflow: 'hidden',
  }

  // Apply inset on all sides except the edge closest to trigger
  switch (position) {
    case 'top':
      return {
        ...base,
        top: inset,
        left: inset,
        right: inset,
        bottom: 0, // No inset on bottom (closest to trigger)
      }

    case 'bottom':
      return {
        ...base,
        top: 0, // No inset on top (closest to trigger)
        left: inset,
        right: inset,
        bottom: inset,
      }

    case 'left':
      return {
        ...base,
        top: inset,
        left: inset,
        right: 0, // No inset on right (closest to trigger)
        bottom: inset,
      }

    case 'right':
      return {
        ...base,
        top: inset,
        left: 0, // No inset on left (closest to trigger)
        right: inset,
        bottom: inset,
      }
  }
}

// ============================================================================
// AUTO-SIZE STYLES
// ============================================================================

/**
 * CSS styles for auto-size mode (dimension hugs content).
 */
export function getAutoSizeStyles(
  position: ExtendedSlotPosition,
  layout: LayoutConfig,
  slotConfig: UnifiedSlotConfig
): CSSProperties {
  const { triggerWidth, triggerHeight, panelWidth, gaps } = layout
  const inset = slotConfig.appearance.inset

  const base: CSSProperties = {
    position: 'absolute',
    zIndex: 20,
  }

  if (isVerticalSlot(position)) {
    // Vertical slots: auto height, fixed width
    const verticalBase = {
      ...base,
      left: '50%',
      width: panelWidth,
      marginLeft: -(panelWidth / 2),
      paddingTop: position === 'top' ? inset : 0,
      paddingBottom: position === 'bottom' ? inset : 0,
      paddingLeft: inset,
      paddingRight: inset,
    }

    if (position === 'top') {
      return {
        ...verticalBase,
        bottom: '100%',
        marginBottom: gaps.top,
      }
    }

    return {
      ...verticalBase,
      top: triggerHeight + gaps.bottom,
    }
  }

  // Horizontal slots: auto width, fixed height
  const horizontalBase = {
    ...base,
    top: '50%',
    height: triggerHeight,
    marginTop: -(triggerHeight / 2),
    paddingTop: inset,
    paddingBottom: inset,
    paddingLeft: position === 'left' ? inset : 0,
    paddingRight: position === 'right' ? inset : 0,
  }

  if (position === 'left') {
    return {
      ...horizontalBase,
      right: '100%',
      marginRight: gaps.left,
    }
  }

  return {
    ...horizontalBase,
    left: '100%',
    marginLeft: gaps.right,
  }
}

// ============================================================================
// BACKDROP POSITIONING
// ============================================================================

/**
 * Calculate backdrop position and dimensions for all enabled slots.
 */
export function getBackdropDimensions(
  layout: LayoutConfig,
  dimensions: SlotDimensions,
  slots: {
    top: { enabled: boolean }
    bottom: { enabled: boolean }
    left: { enabled: boolean }
    right: { enabled: boolean }
  }
): {
  width: number
  height: number
  top: number
  left: number
  marginLeft: number
  marginTop: number
} {
  const { triggerWidth, triggerHeight, panelWidth, gaps } = layout
  const { topHeight, bottomHeight, leftWidth, rightWidth } = dimensions

  // Calculate offsets
  const topOffset = slots.top.enabled ? topHeight + gaps.top : 0
  const leftOffset = slots.left.enabled ? leftWidth + gaps.left : 0

  // Calculate total dimensions
  const hasHorizontalSlots = slots.left.enabled || slots.right.enabled

  const width = hasHorizontalSlots
    ? leftOffset + triggerWidth + (slots.right.enabled ? gaps.right + rightWidth : 0)
    : panelWidth

  const height =
    topOffset +
    triggerHeight +
    (slots.bottom.enabled ? gaps.bottom + bottomHeight : 0)

  return {
    width,
    height,
    top: -topOffset,
    left: hasHorizontalSlots ? 0 : 0,
    marginLeft: hasHorizontalSlots ? -leftOffset : -(panelWidth / 2),
    marginTop: 0,
  }
}

/**
 * Calculate collapsed backdrop dimensions (trigger size).
 */
export function getCollapsedBackdropDimensions(
  layout: LayoutConfig
): {
  width: number
  height: number
  marginLeft: number
} {
  return {
    width: layout.triggerWidth,
    height: layout.triggerHeight,
    marginLeft: -(layout.triggerWidth / 2),
  }
}
