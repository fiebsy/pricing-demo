/**
 * useSkwircleColors Hook
 *
 * Resolves and manages color values with hover states.
 */

'use client'

import { useMemo } from 'react'
import { resolveColor } from '../utils'

interface SkwircleColors {
  /** Resolved background color */
  bgColor: string
  /** Resolved border color */
  borderColor: string
  /** Resolved outer border (ring) color */
  outerBorderColor: string | undefined
  /** Resolved shadow color */
  shadowColor: string
}

/**
 * Hook to resolve color values with hover state support.
 *
 * @param colors - Color configuration
 * @param isHovered - Whether element is hovered
 */
export function useSkwircleColors(
  colors: {
    backgroundColor: string
    backgroundColorHover?: string
    borderColor: string
    borderColorHover?: string
    outerBorderColor?: string
    shadowColor?: string
  },
  isHovered: boolean
): SkwircleColors {
  return useMemo(
    () => ({
      bgColor: resolveColor(
        isHovered && colors.backgroundColorHover ? colors.backgroundColorHover : colors.backgroundColor
      ),
      borderColor: resolveColor(
        isHovered && colors.borderColorHover ? colors.borderColorHover : colors.borderColor
      ),
      outerBorderColor: colors.outerBorderColor ? resolveColor(colors.outerBorderColor) : undefined,
      shadowColor: resolveColor(colors.shadowColor ?? 'black'),
    }),
    [colors, isHovered]
  )
}
