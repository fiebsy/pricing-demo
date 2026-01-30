/**
 * useAdaptiveStyles Hook
 *
 * Calculates adaptive corner and border styles based on position mode.
 * Flips top/bottom corners and borders when switching between fixed and absolute.
 */

import { useMemo } from 'react'
import type { PositionMode, CornerRadius, Borders } from './types'
import {
  CORNER_RADIUS,
  BORDERS,
  FLIP_CORNERS_ON_MODE,
  FLIP_BORDERS_ON_MODE,
  FLIP_CORNER_WIDTH_MULTIPLIER,
} from './constants'

interface AdaptiveStylesResult {
  /** Effective corner sizes after flipping */
  effectiveCorners: CornerRadius
  /** Corner width (with multiplier applied) */
  cornerWidth: number
  /** Top corner stroke config */
  topCornerStroke: { width: number; color: string }
  /** Bottom corner stroke config */
  bottomCornerStroke: { width: number; color: string }
  /** Top edge stroke config */
  topEdgeStroke: { enabled: boolean; width: number; color: string }
  /** Bottom edge stroke config */
  bottomEdgeStroke: { enabled: boolean; width: number; color: string }
  /** Left/right border style */
  sidesBorderStyle: React.CSSProperties
}

export function useAdaptiveStyles(positionMode: PositionMode): AdaptiveStylesResult {
  return useMemo(() => {
    const isFixed = positionMode === 'fixed'

    // Flip corners based on mode
    let effectiveCorners: CornerRadius
    if (FLIP_CORNERS_ON_MODE && isFixed) {
      // In fixed mode, flip top and bottom corners
      effectiveCorners = {
        topLeft: CORNER_RADIUS.bottomLeft,
        topRight: CORNER_RADIUS.bottomRight,
        bottomLeft: CORNER_RADIUS.topLeft,
        bottomRight: CORNER_RADIUS.topRight,
      }
    } else {
      effectiveCorners = CORNER_RADIUS
    }

    // Calculate corner width from largest corner
    const activeCornerSize = Math.max(
      effectiveCorners.topLeft,
      effectiveCorners.topRight,
      effectiveCorners.bottomLeft,
      effectiveCorners.bottomRight
    )
    const cornerWidth = activeCornerSize * FLIP_CORNER_WIDTH_MULTIPLIER

    // Flip borders based on mode
    let effectiveBorders: Borders
    if (FLIP_BORDERS_ON_MODE && isFixed) {
      effectiveBorders = {
        top: BORDERS.bottom,
        right: BORDERS.right,
        bottom: BORDERS.top,
        left: BORDERS.left,
      }
    } else {
      effectiveBorders = BORDERS
    }

    // Determine which edges need strokes (based on active corners)
    const hasTopCorners = effectiveCorners.topLeft > 0 || effectiveCorners.topRight > 0
    const hasBottomCorners = effectiveCorners.bottomLeft > 0 || effectiveCorners.bottomRight > 0

    // Corner strokes (on the S-curve itself)
    const topCornerStroke = {
      width: hasTopCorners ? effectiveBorders.top.width : 0,
      color: effectiveBorders.top.color,
    }
    const bottomCornerStroke = {
      width: hasBottomCorners ? effectiveBorders.bottom.width : 0,
      color: effectiveBorders.bottom.color,
    }

    // Edge strokes (horizontal lines connecting corners)
    const topEdgeStroke = {
      enabled: effectiveBorders.top.width > 0 && !hasTopCorners,
      width: effectiveBorders.top.width,
      color: effectiveBorders.top.color,
    }
    const bottomEdgeStroke = {
      enabled: effectiveBorders.bottom.width > 0 && !hasBottomCorners,
      width: effectiveBorders.bottom.width,
      color: effectiveBorders.bottom.color,
    }

    // Side borders (left/right)
    const sidesBorderStyle: React.CSSProperties = {
      borderLeftWidth: effectiveBorders.left.width,
      borderLeftColor: effectiveBorders.left.color,
      borderLeftStyle: effectiveBorders.left.width > 0 ? 'solid' : 'none',
      borderRightWidth: effectiveBorders.right.width,
      borderRightColor: effectiveBorders.right.color,
      borderRightStyle: effectiveBorders.right.width > 0 ? 'solid' : 'none',
    }

    return {
      effectiveCorners,
      cornerWidth,
      topCornerStroke,
      bottomCornerStroke,
      topEdgeStroke,
      bottomEdgeStroke,
      sidesBorderStyle,
    }
  }, [positionMode])
}
