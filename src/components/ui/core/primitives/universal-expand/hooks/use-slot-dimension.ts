/**
 * Universal Expand - Slot Dimension Hook
 *
 * Calculates dynamic dimensions (height for vertical, width for horizontal)
 * for slots based on content.
 */

'use client'

import { useMemo } from 'react'
import type {
  ExtendedSlotPosition,
  UnifiedSlotConfig,
  DimensionMode,
} from '../types'
import { isVerticalSlot } from '../types'

// ============================================================================
// DIMENSION CALCULATOR
// ============================================================================

interface CalculateDimensionParams {
  slotConfig: UnifiedSlotConfig
  contentDimension?: number
  position: ExtendedSlotPosition
}

/**
 * Calculate the effective dimension for a slot based on its config and content.
 */
export function calculateSlotDimension({
  slotConfig,
  contentDimension,
  position,
}: CalculateDimensionParams): number {
  const { dimensionMode, fixedDimension, maxDimension, minDimension } = slotConfig

  // Fixed mode: use fixedDimension directly
  if (dimensionMode === 'fixed') {
    return fixedDimension ?? 48
  }

  // If no content dimension provided, fall back to fixedDimension
  if (contentDimension === undefined) {
    return fixedDimension ?? 48
  }

  // Apply min/max constraints
  const min = minDimension ?? 0
  const max = maxDimension ?? Infinity

  // Auto mode: hug content (only min constraint)
  if (dimensionMode === 'auto') {
    return Math.max(min, contentDimension)
  }

  // Dynamic mode: apply both min and max constraints
  return Math.max(min, Math.min(max, contentDimension))
}

// ============================================================================
// CONTENT DIMENSION CALCULATORS
// ============================================================================

/**
 * Calculate content height for a list of items.
 */
export function calculateListContentHeight(params: {
  itemCount: number
  itemHeight: number
  itemGap: number
  headerCount?: number
  headerHeight?: number
  paddingTop: number
  paddingBottom: number
}): number {
  const {
    itemCount,
    itemHeight,
    itemGap,
    headerCount = 0,
    headerHeight = 32,
    paddingTop,
    paddingBottom,
  } = params

  const itemsHeight = itemCount * itemHeight
  const gapsHeight = Math.max(0, itemCount - 1) * itemGap
  const headersHeight = headerCount * headerHeight

  return itemsHeight + gapsHeight + headersHeight + paddingTop + paddingBottom
}

/**
 * Calculate content width for horizontal content.
 */
export function calculateHorizontalContentWidth(params: {
  itemCount: number
  itemWidth: number
  itemGap: number
  paddingLeft: number
  paddingRight: number
}): number {
  const {
    itemCount,
    itemWidth,
    itemGap,
    paddingLeft,
    paddingRight,
  } = params

  const itemsWidth = itemCount * itemWidth
  const gapsWidth = Math.max(0, itemCount - 1) * itemGap

  return itemsWidth + gapsWidth + paddingLeft + paddingRight
}

// ============================================================================
// HOOK
// ============================================================================

/**
 * Hook to calculate dynamic slot dimension.
 *
 * For vertical slots (top/bottom): calculates height
 * For horizontal slots (left/right): calculates width
 */
export function useSlotDimension(
  position: ExtendedSlotPosition,
  slotConfig: UnifiedSlotConfig,
  contentDimension?: number
): number {
  const isVertical = isVerticalSlot(position)

  return useMemo(() => {
    return calculateSlotDimension({
      slotConfig,
      contentDimension,
      position,
    })
  }, [slotConfig, contentDimension, position])
}
