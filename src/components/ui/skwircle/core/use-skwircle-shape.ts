/**
 * useSkwircleShape Hook
 *
 * Generates SVG paths for skwircle shapes.
 */

'use client'

import { useMemo } from 'react'
import type { RoundnessConfig } from '../types'
import { generateSkwirclePath } from '../utils'

interface SkwirclePaths {
  /** Background path (innermost) */
  background: string
  /** Border path */
  border: string
  /** Outer border path (for ring effect) */
  outerBorder: string
}

/**
 * Hook to generate SVG paths for skwircle shapes.
 *
 * @param dimensions - Element dimensions
 * @param borderWidth - Border thickness
 * @param outerBorderWidth - Outer border (ring) thickness
 * @param roundnessConfig - Roundness configuration
 */
export function useSkwircleShape(
  dimensions: { width: number; height: number },
  borderWidth: number,
  outerBorderWidth: number,
  roundnessConfig: RoundnessConfig
): SkwirclePaths {
  return useMemo(() => {
    if (dimensions.width === 0 || dimensions.height === 0) {
      return { background: '', border: '', outerBorder: '' }
    }

    // Calculate total offset including outer border
    const totalBorderOffset = borderWidth + (outerBorderWidth || 0)

    // Outer border path (outermost layer)
    const outerBorderPath =
      outerBorderWidth && outerBorderWidth > 0
        ? generateSkwirclePath(
            dimensions.width + totalBorderOffset * 2,
            dimensions.height + totalBorderOffset * 2,
            roundnessConfig,
            0
          )
        : ''

    // Main border path
    const outerWidth = dimensions.width + borderWidth * 2
    const outerHeight = dimensions.height + borderWidth * 2

    const borderPath = generateSkwirclePath(outerWidth, outerHeight, roundnessConfig, 0)

    // Background path (innermost)
    const innerBorderRadius = Math.max(1, roundnessConfig.borderRadius - borderWidth)
    const innerConfig = {
      ...roundnessConfig,
      borderRadius: innerBorderRadius,
    }

    const backgroundPath = generateSkwirclePath(dimensions.width, dimensions.height, innerConfig, 0)

    return { background: backgroundPath, border: borderPath, outerBorder: outerBorderPath }
  }, [dimensions, borderWidth, outerBorderWidth, roundnessConfig])
}
