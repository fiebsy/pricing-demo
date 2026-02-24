/**
 * Modal Button Section
 *
 * Integrates FluidButtonGroup with AnimatedRightButton for stage-based
 * button transitions. Uses shared adapters for state conversion.
 *
 * Handles:
 * - Fluid width transitions (both buttons → single button)
 * - Primary button state changes (text/spinner/checkmark)
 * - Secondary button text crossfades
 *
 * @status incubating
 */

'use client'

import { useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/core/primitives/button'
import { FluidButtonGroup } from '@/components/ui/core/primitives/fluid-button-group'
import {
  AnimatedRightButton,
  deriveFluidTimingFromMaster,
  buildStateTransitionConfig,
  getFluidVisibility,
  type ModalStageButtonConfig,
} from '@/components/ui/core/primitives/fluid-button-layout'

import type {
  ButtonsConfig,
  StageButtonConfig,
  TextTransitionMode,
  TextTransitionEasing,
} from '../config/types'
import { CrossfadeText } from './crossfade-text'

// ============================================================================
// Types
// ============================================================================

interface ModalButtonSectionProps {
  /** Global button config (variants, sizes, layout) */
  config: ButtonsConfig
  /** Per-stage button config (text, spinner, checkmark states) */
  stageButtons: StageButtonConfig
  /** Slow motion mode */
  slowMo: boolean
  /** Text transition duration in seconds */
  textDuration: number
  /** Text transition bounce */
  textBounce: number
  /** Text Y offset for animations */
  textYOffset: number
  /** Text transition mode */
  textMode: TextTransitionMode
  /** Text transition easing */
  textEasing: TextTransitionEasing
  /** Button radius style override (for sync mode) */
  buttonRadiusStyle?: React.CSSProperties
  /** Master duration in seconds when synced (from modal animation.master.duration) */
  masterDuration?: number
  /** Primary button click handler */
  onPrimaryClick: () => void
  /** Secondary button click handler */
  onSecondaryClick: () => void
}

// ============================================================================
// Hooks
// ============================================================================

/**
 * Preserves the previous non-null value during exit animations.
 * When the value becomes null, returns the previous value to maintain
 * consistent button height during the opacity fade out.
 */
function usePreviousValue<T>(value: T | null): T | null {
  const previousRef = useRef<T | null>(value)

  useEffect(() => {
    // Only update when we have a non-null value
    if (value !== null) {
      previousRef.current = value
    }
  }, [value])

  // Return current value if non-null, otherwise return previous
  return value ?? previousRef.current
}

// ============================================================================
// Component
// ============================================================================

export function ModalButtonSection({
  config,
  stageButtons,
  slowMo,
  textDuration,
  textBounce,
  textYOffset,
  textMode,
  textEasing,
  buttonRadiusStyle,
  masterDuration,
  onPrimaryClick,
  onSecondaryClick,
}: ModalButtonSectionProps) {
  const { fluid, primary, secondary } = config

  // Preserve secondary text during exit animation to maintain button height
  const preservedSecondaryText = usePreviousValue(stageButtons.secondary)

  // Resolve timing: use derived timing when 'synced' and masterDuration is provided
  const resolvedTiming = fluid.timing === 'synced' && masterDuration != null
    ? deriveFluidTimingFromMaster(masterDuration)
    : fluid.timing === 'synced'
      ? 'default'  // Fallback to default if synced but no masterDuration
      : fluid.timing

  // Use shared adapter for visibility determination
  const visible = getFluidVisibility(stageButtons as ModalStageButtonConfig)

  // Build primary button state for AnimatedRightButton
  const primaryButtonState = {
    id: 'primary',
    text: stageButtons.primary.text,
    showSpinner: stageButtons.primary.showSpinner,
    showCheckmark: stageButtons.primary.showCheckmark,
    showText: stageButtons.primary.showText,
  }

  // Use shared adapter for state transition config
  const stateTransition = buildStateTransitionConfig({
    checkmarkStyle: fluid.checkmarkStyle,
    textSlideDuration: fluid.textSlideDuration,
    checkmarkDrawDuration: fluid.checkmarkDrawDuration,
  })

  // If fluid is disabled, fall back to standard buttons
  if (!fluid.enabled) {
    const showSecondary = stageButtons.secondary !== null

    return (
      <div
        className={cn(
          'flex items-center',
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
            className="flex-1"
            style={buttonRadiusStyle}
          >
            <CrossfadeText
              text={stageButtons.secondary ?? ''}
              duration={textEasing === 'spring' ? textDuration : textDuration}
              bounce={textBounce}
              yOffset={textYOffset}
              mode={textMode}
              easing={textEasing}
              useSpring={textEasing === 'spring'}
            />
          </Button>
        )}

        <Button
          variant={primary.variant}
          size={primary.size}
          onClick={onPrimaryClick}
          className="flex-1"
          style={buttonRadiusStyle}
        >
          <CrossfadeText
            text={stageButtons.primary.text}
            duration={textEasing === 'spring' ? textDuration : textDuration}
            bounce={textBounce}
            yOffset={textYOffset}
            mode={textMode}
            easing={textEasing}
            useSpring={textEasing === 'spring'}
          />
        </Button>

        {showSecondary && config.layout === 'horizontal-reverse' && (
          <Button
            variant={secondary.variant}
            size={secondary.size}
            onClick={onSecondaryClick}
            className="flex-1"
            style={buttonRadiusStyle}
          >
            <CrossfadeText
              text={stageButtons.secondary ?? ''}
              duration={textEasing === 'spring' ? textDuration : textDuration}
              bounce={textBounce}
              yOffset={textYOffset}
              mode={textMode}
              easing={textEasing}
              useSpring={textEasing === 'spring'}
            />
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
          className="w-full"
          style={buttonRadiusStyle}
        >
          {/* Use preserved text during exit to maintain button height */}
          {preservedSecondaryText}
        </Button>
      }
      primaryButton={
        <AnimatedRightButton
          state={primaryButtonState}
          transition={stateTransition}
          variant={primary.variant === 'primary' ? 'primary' : primary.variant === 'secondary' ? 'secondary' : 'tertiary'}
          slowMo={slowMo}
        />
      }
    />
  )
}
