/**
 * Modal Button Section
 *
 * Integrates FluidButtonGroup with AnimatedRightButton for stage-based
 * button transitions. Handles:
 * - Fluid width transitions (both buttons → single button)
 * - Primary button state changes (text/spinner/checkmark)
 * - Secondary button text crossfades
 *
 * @status incubating
 */

'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/core/primitives/button'
import { FluidButtonGroup } from '@/components/ui/core/primitives/fluid-button-group'

import type {
  ButtonsConfig,
  StageButtonConfig,
  TextTransitionMode,
  TextTransitionEasing,
} from '../config/types'
import type { ButtonStateConfig, StateTransitionConfig } from '@/app/playground/button-fluid-layout/config/types'
import type { FluidTiming } from '@/components/ui/core/primitives/fluid-button-group'
import { AnimatedRightButton } from '@/app/playground/button-fluid-layout/core/animated-right-button'
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
// Helper Functions
// ============================================================================

/**
 * Derives fluid button timing from modal master duration.
 * Maps the master duration (seconds) to fluid timing (milliseconds)
 * while keeping existing ease-out easing curves.
 */
function deriveFluidTimingFromMaster(masterDuration: number): FluidTiming {
  // Master duration is in seconds (0.15-0.8), fluid expects milliseconds
  const baseDuration = masterDuration * 1000

  return {
    collapseDuration: baseDuration * 0.4,    // Fast exit (40% of master)
    expandDuration: baseDuration * 0.85,     // Slower expand (85% of master)
    showBothDuration: baseDuration * 0.5,    // Mid-range for both
    collapseEasing: 'cubic-bezier(0.25, 1, 0.5, 1)',  // Keep existing ease-out
    expandEasing: 'cubic-bezier(0.25, 1, 0.5, 1)',
    expandDelay: 0,
  }
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
  const { fluid, primary, secondary, cornerSquircle } = config

  // Resolve timing: use derived timing when 'synced' and masterDuration is provided
  const resolvedTiming = fluid.timing === 'synced' && masterDuration != null
    ? deriveFluidTimingFromMaster(masterDuration)
    : fluid.timing === 'synced'
      ? 'default'  // Fallback to default if synced but no masterDuration
      : fluid.timing

  // Determine visibility based on secondary button presence
  const showSecondary = stageButtons.secondary !== null
  const visible = showSecondary ? 'both' : 'primary'

  // Convert stage button config to AnimatedRightButton's expected format
  const primaryButtonState: ButtonStateConfig = {
    id: 'primary',
    text: stageButtons.primary.text,
    showSpinner: stageButtons.primary.showSpinner,
    showCheckmark: stageButtons.primary.showCheckmark,
    showText: stageButtons.primary.showText,
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
            className={cn('flex-1', !cornerSquircle && 'corner-round')}
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
          className={cn('flex-1', !cornerSquircle && 'corner-round')}
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
            className={cn('flex-1', !cornerSquircle && 'corner-round')}
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
          className={cn('w-full', !cornerSquircle && 'corner-round')}
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
