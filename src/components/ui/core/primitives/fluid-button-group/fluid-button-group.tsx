/**
 * Fluid Button Group
 *
 * A production-ready component for fluid button layout animations.
 * Two buttons fill a container, and toggling visibility causes the
 * remaining button to expand smoothly.
 *
 * Key implementation insight: Uses explicit width calculations
 * (`calc(50% - gap/2px)`) instead of `flex-1` to avoid text stretching
 * during animation. This allows independent timing control for collapse
 * vs expand animations.
 *
 * @status production
 */

'use client'

import { useCallback, type TransitionEvent } from 'react'
import { cn } from '@/lib/utils'

import type { FluidButtonGroupProps } from './types'
import { DEFAULT_GAP, DEFAULT_BLUR_CONFIG } from './constants'
import { useFluidTiming } from './hooks/use-fluid-timing'

// ============================================================================
// Component
// ============================================================================

export function FluidButtonGroup({
  visible,
  primaryButton,
  secondaryButton,
  timing = 'default',
  gap = DEFAULT_GAP,
  syncToExpand = true,
  exitBlur = false,
  className,
  onTransitionEnd,
  slowMo = false,
}: FluidButtonGroupProps) {
  // Calculate all timing values
  const timingValues = useFluidTiming({
    timing,
    syncToExpand,
    exitBlur,
    slowMo,
  })

  // Determine visibility states
  const showSecondary = visible === 'both' || visible === 'secondary'
  const showPrimary = visible === 'both' || visible === 'primary'
  const showBoth = visible === 'both'

  // Calculate widths - explicit values avoid flex fighting/text stretching
  const halfWidth = `calc(50% - ${gap / 2}px)`
  const fullWidth = '100%'

  // Determine secondary button width and timing
  const secondaryWidth = showBoth ? halfWidth : showSecondary ? fullWidth : 0
  const secondaryDuration = showBoth
    ? timingValues.showBothDuration
    : showSecondary
      ? timingValues.expandDuration
      : timingValues.collapseDuration
  const secondaryEasing = showBoth
    ? timingValues.expandEasing
    : showSecondary
      ? timingValues.expandEasing
      : timingValues.collapseEasing

  // Determine primary button width and timing
  const primaryWidth = showBoth ? halfWidth : showPrimary ? fullWidth : 0
  const primaryDuration = timingValues.expandDuration
  const primaryDelay = showBoth ? 0 : timingValues.expandDelay
  const primaryEasing = timingValues.expandEasing

  // Opacity timing
  const opacityDuration = showBoth
    ? timingValues.enterOpacityDuration
    : timingValues.exitOpacityDuration

  // Blur configuration
  const blurConfig = timingValues.blur
  const blurAmount = blurConfig.enabled ? (blurConfig.amount ?? DEFAULT_BLUR_CONFIG.amount) : 0
  const blurDuration = blurConfig.enabled ? blurConfig.duration : 0

  // Handle transition end on primary button (the one that expands)
  const handleTransitionEnd = useCallback(
    (e: TransitionEvent<HTMLDivElement>) => {
      // Only fire callback for width transitions to avoid multiple calls
      if (e.propertyName === 'width' && onTransitionEnd) {
        onTransitionEnd()
      }
    },
    [onTransitionEnd]
  )

  // If no secondary button provided, just render primary at full width
  if (!secondaryButton) {
    return (
      <div className={cn('flex items-center motion-reduce:transition-none', className)}>
        <div className="w-full">{primaryButton}</div>
      </div>
    )
  }

  return (
    <div className={cn('flex items-center motion-reduce:transition-none', className)}>
      {/* Secondary (left) button wrapper */}
      <div
        className="overflow-hidden"
        style={{
          width: secondaryWidth,
          opacity: showSecondary ? 1 : 0,
          filter: blurConfig.enabled
            ? showSecondary
              ? 'blur(0px)'
              : `blur(${blurAmount}px)`
            : undefined,
          transition: `
            width ${secondaryDuration}ms ${secondaryEasing},
            opacity ${opacityDuration}ms ease-out,
            filter ${blurDuration}ms ease-out
          `,
        }}
      >
        <div className="w-full">
          <span
            className="block"
            style={{
              opacity: showSecondary ? 1 : 0,
              filter: blurConfig.enabled
                ? showSecondary
                  ? 'blur(0px)'
                  : `blur(${blurAmount}px)`
                : undefined,
              transition: `
                opacity ${timingValues.textExitDuration}ms ease-out,
                filter ${blurDuration}ms ease-out
              `,
            }}
          >
            {secondaryButton}
          </span>
        </div>
      </div>

      {/* Gap - collapses with secondary button */}
      <div
        style={{
          width: showBoth ? gap : 0,
          transition: `width ${secondaryDuration}ms ${secondaryEasing}`,
        }}
      />

      {/* Primary (right) button wrapper - anchored to right edge */}
      <div
        style={{
          width: primaryWidth,
          marginLeft: 'auto',
          transition: `width ${primaryDuration}ms ${primaryEasing} ${primaryDelay}ms`,
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        <div className="w-full">{primaryButton}</div>
      </div>
    </div>
  )
}
