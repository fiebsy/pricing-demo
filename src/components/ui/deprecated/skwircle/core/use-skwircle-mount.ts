/**
 * useSkwircleMount Hook
 *
 * Smart FOUC (Flash of Unstyled Content) prevention.
 * Analyzes layout stability to determine the best mount strategy.
 */

'use client'

import { useMemo } from 'react'
import type { SkwircleMountStrategy } from '../types'
import { parsePx } from '../utils'

interface UseSkwircleMountOptions {
  /** Mount strategy preference */
  mountStrategy: SkwircleMountStrategy
  /** Whether first measurement has completed */
  hasMeasured: boolean
  /** Initial dimensions for SSR */
  initialDimensions?: { width: number; height: number }
  /** Element className for stability analysis */
  className?: string
  /** Element style for stability analysis */
  style?: React.CSSProperties
  /** Whether element uses fill mode */
  fillMode?: boolean
}

interface UseSkwircleMountResult {
  /** Whether the component should be visible */
  shouldShow: boolean
  /** Opacity value (0 or 1) */
  opacity: number
  /** CSS transition for opacity */
  transition: string | undefined
}

type LayoutStability = 'stable' | 'uncertain' | 'unstable'

/**
 * Analyze layout stability based on CSS properties.
 *
 * @returns Layout stability level
 */
function analyzeLayoutStability(
  className?: string,
  style?: React.CSSProperties,
  fillMode?: boolean,
  initialDimensions?: { width: number; height: number }
): LayoutStability {
  const cn = className ?? ''
  const st = style ?? {}

  // Check for fixed dimensions
  const fixedW = parsePx(st.width)
  const fixedH = parsePx(st.height)
  const hasFixedSize = !!fixedW && !!fixedH
  const hasInitialDims = !!initialDimensions && initialDimensions.width > 0 && initialDimensions.height > 0

  // Fixed size or initial dimensions = stable
  if (hasFixedSize || hasInitialDims) {
    return 'stable'
  }

  // Check for fluid sizing patterns
  const isFluidWidth =
    typeof st.width === 'string' &&
    (st.width.includes('%') || st.width.includes('calc') || st.width === 'auto')
  const isFluidHeight =
    typeof st.height === 'string' &&
    (st.height.includes('%') || st.height.includes('calc') || st.height === 'auto')

  const isFlexGrow =
    st.flex !== undefined ||
    st.flexGrow !== undefined ||
    st.flexBasis !== undefined ||
    cn.includes('flex-1') ||
    cn.includes('grow') ||
    cn.includes('basis-') ||
    cn.includes('w-full')

  const isFluid =
    isFluidWidth ||
    isFluidHeight ||
    cn.includes('w-full') ||
    cn.includes('h-full') ||
    fillMode

  // Fluid or flex = unstable
  if (isFluid || isFlexGrow) {
    return 'unstable'
  }

  // Otherwise uncertain (content-based sizing)
  return 'uncertain'
}

/**
 * Hook to determine mount behavior for FOUC prevention.
 *
 * Mount strategies:
 * - 'auto': Smart detection based on layout stability
 * - 'fade': Always fade in after measurement
 * - 'immediate': Show immediately (use with initialDimensions)
 */
export function useSkwircleMount(options: UseSkwircleMountOptions): UseSkwircleMountResult {
  const {
    mountStrategy,
    hasMeasured,
    initialDimensions,
    className,
    style,
    fillMode,
  } = options

  return useMemo(() => {
    // Determine effective strategy
    let effectiveStrategy: 'fade' | 'immediate' = 'fade'

    if (mountStrategy === 'immediate') {
      effectiveStrategy = 'immediate'
    } else if (mountStrategy === 'fade') {
      effectiveStrategy = 'fade'
    } else {
      // 'auto' - analyze layout stability
      const stability = analyzeLayoutStability(className, style, fillMode, initialDimensions)

      switch (stability) {
        case 'stable':
          // Fixed dimensions - show immediately
          effectiveStrategy = 'immediate'
          break
        case 'unstable':
          // Fluid layout - must fade to hide resize
          effectiveStrategy = 'fade'
          break
        case 'uncertain':
        default:
          // Content-based - fade to be safe
          effectiveStrategy = 'fade'
          break
      }
    }

    // Compute visibility
    const shouldShow = effectiveStrategy === 'immediate' ? true : hasMeasured

    return {
      shouldShow,
      opacity: shouldShow ? 1 : 0,
      transition: effectiveStrategy === 'fade' ? 'opacity 150ms ease-out' : undefined,
    }
  }, [mountStrategy, hasMeasured, initialDimensions, className, style, fillMode])
}
