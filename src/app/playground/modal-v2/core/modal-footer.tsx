/**
 * Modal Footer Component
 *
 * Integrates FluidButtonGroup with AnimatedRightButton for stage-based
 * button transitions. Handles:
 * - Fluid width transitions (both buttons → single button)
 * - Primary button state changes (text/spinner/checkmark)
 * - Secondary button text crossfades
 */

'use client'

import { useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/core/primitives/button'
import { FluidButtonGroup } from '@/components/ui/core/primitives/fluid-button-group'

import type { Stage, ButtonsConfig, AnimationConfig } from '../config/types'
import type { ButtonStateConfig, StateTransitionConfig } from '@/app/playground/button-fluid-layout/config/types'
import type { FluidTiming } from '@/components/ui/core/primitives/fluid-button-group'
import { AnimatedRightButton } from '@/app/playground/button-fluid-layout/core/animated-right-button'

// ============================================================================
// Types
// ============================================================================

interface ModalFooterProps {
  /** Current stage */
  stage: Stage
  /** Button configuration */
  config: ButtonsConfig
  /** Animation configuration */
  animation: AnimationConfig
  /** Slow motion mode */
  slowMo: boolean
  /** Primary button click handler */
  onPrimaryClick: () => void
  /** Secondary button click handler */
  onSecondaryClick: () => void
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Derives fluid button timing from modal master duration.
 */
function deriveFluidTimingFromMaster(masterDuration: number): FluidTiming {
  const baseDuration = masterDuration * 1000

  return {
    collapseDuration: baseDuration * 0.4,
    expandDuration: baseDuration * 0.85,
    showBothDuration: baseDuration * 0.5,
    collapseEasing: 'cubic-bezier(0.25, 1, 0.5, 1)',
    expandEasing: 'cubic-bezier(0.25, 1, 0.5, 1)',
    expandDelay: 0,
  }
}

// ============================================================================
// Hooks
// ============================================================================

/**
 * Preserves the previous non-null value during exit animations.
 */
function usePreviousValue<T>(value: T | null): T | null {
  const previousRef = useRef<T | null>(value)

  useEffect(() => {
    if (value !== null) {
      previousRef.current = value
    }
  }, [value])

  return value ?? previousRef.current
}

// ============================================================================
// Component
// ============================================================================

export function ModalFooter({
  stage,
  config,
  animation,
  slowMo,
  onPrimaryClick,
  onSecondaryClick,
}: ModalFooterProps) {
  const { primary, secondary, cornerSquircle, fluid } = config
  const { buttons: stageButtons } = stage

  // Derive secondary text from stage config
  const secondaryText = stageButtons.secondary?.text ?? null

  // Preserve secondary text during exit animation
  const preservedSecondaryText = usePreviousValue(secondaryText)

  // Resolve timing
  const resolvedTiming = fluid.timing === 'synced'
    ? deriveFluidTimingFromMaster(animation.duration)
    : fluid.timing

  // Determine visibility based on secondary button presence
  const showSecondary = secondaryText !== null
  const visible = showSecondary ? 'both' : 'primary'

  // Convert stage button config to AnimatedRightButton's expected format
  const primaryButtonState: ButtonStateConfig = {
    id: 'primary',
    text: stageButtons.primary.text ?? '',
    showSpinner: stageButtons.primary.loading ?? false,
    showCheckmark: stageButtons.primary.checkmark ?? false,
    showText: stageButtons.primary.showText ?? true,
    showLeftButton: showSecondary,
  }

  // Build state transition config for AnimatedRightButton
  const stateTransition: StateTransitionConfig = {
    textSlideDuration: fluid.textSlideDuration,
    textSlideEasing: 'cubic-bezier(0.25, 1, 0.5, 1)',
    spinnerToCheckmarkDuration: 200,
    checkmarkDrawDuration: fluid.checkmarkDrawDuration,
    checkmarkEntranceStyle: fluid.checkmarkStyle,
  }

  // If fluid is disabled, fall back to standard buttons
  if (!fluid.enabled) {
    return (
      <div
        className={cn(
          'flex w-full items-center',
          config.layout === 'vertical' && 'flex-col',
          config.layout === 'horizontal-reverse' && 'flex-row-reverse'
        )}
        style={{ gap: config.gap }}
      >
        {showSecondary && config.layout !== 'horizontal-reverse' && (
          <Button
            variant={secondary.variant}
            size={secondary.size}
            onClick={onSecondaryClick}
            className={cn('flex-1', !cornerSquircle && 'corner-round')}
          >
            {secondaryText}
          </Button>
        )}

        <Button
          variant={primary.variant}
          size={primary.size}
          onClick={onPrimaryClick}
          className={cn('flex-1', !cornerSquircle && 'corner-round')}
        >
          {stageButtons.primary.text}
        </Button>

        {showSecondary && config.layout === 'horizontal-reverse' && (
          <Button
            variant={secondary.variant}
            size={secondary.size}
            onClick={onSecondaryClick}
            className={cn('flex-1', !cornerSquircle && 'corner-round')}
          >
            {secondaryText}
          </Button>
        )}
      </div>
    )
  }

  // Fluid mode - use FluidButtonGroup with AnimatedRightButton
  return (
    <FluidButtonGroup
      visible={visible}
      timing={resolvedTiming}
      gap={fluid.gap}
      exitBlur={fluid.exitBlur}
      slowMo={slowMo}
      secondaryButton={
        <Button
          variant={secondary.variant}
          size={secondary.size}
          onClick={onSecondaryClick}
          className={cn('w-full', !cornerSquircle && 'corner-round')}
        >
          {preservedSecondaryText}
        </Button>
      }
      primaryButton={
        <AnimatedRightButton
          state={primaryButtonState}
          transition={stateTransition}
          variant={primary.variant === 'primary' ? 'primary' : primary.variant === 'secondary' ? 'secondary' : 'tertiary'}
          slowMo={slowMo}
          className={cn(!cornerSquircle && 'corner-round')}
        />
      }
    />
  )
}
