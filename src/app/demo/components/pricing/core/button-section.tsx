/**
 * Pricing Modal Button Section
 *
 * Integrates FluidButtonGroup with AnimatedRightButton for flow-based
 * button transitions in the pricing modal.
 *
 * States:
 * - A: Single "Upgrade" button
 * - B1/B2: "Back" + "Upgrade/Upgrading" buttons
 * - C1: Checkmark only
 * - C2: "Let's create" button
 */

'use client'

import { FluidButtonGroup } from '@/components/ui/core/primitives/fluid-button-group'
import { Button } from '@/components/ui/core/primitives/button'
import {
  AnimatedRightButton,
  buildStateTransitionConfig,
  type ButtonState,
  type ButtonStateId,
} from '@/components/ui/core/primitives/fluid-button-layout'

import type { ButtonConfig } from '../config/types'

// ============================================================================
// Types
// ============================================================================

export interface ButtonSectionProps {
  /** Current button state ID */
  stateId: ButtonStateId
  /** Complete button state with derived values */
  state: ButtonState
  /** Whether secondary button should be visible */
  showSecondary: boolean
  /** Button configuration from playground config */
  buttonConfig: ButtonConfig
  /** Slow motion mode for debugging */
  slowMo?: boolean
  /** Primary button click handler */
  onPrimaryClick: () => void
  /** Back button click handler */
  onBackClick: () => void
}

// ============================================================================
// Constants
// ============================================================================

const SECONDARY_BUTTON_TEXT = 'Back'

// ============================================================================
// Component
// ============================================================================

export function ButtonSection({
  stateId,
  state,
  showSecondary,
  buttonConfig,
  slowMo = false,
  onPrimaryClick,
  onBackClick,
}: ButtonSectionProps) {
  // Build state transition configuration
  const stateTransition = buildStateTransitionConfig({
    checkmarkStyle: 'flip',
    textSlideDuration: 200,
    checkmarkDrawDuration: 250,
  })

  // Determine fluid visibility
  const visible = showSecondary ? 'both' : 'primary'

  // Map button variant to AnimatedRightButton variant
  const primaryVariant = buttonConfig.variant === 'primary'
    ? 'primary'
    : buttonConfig.variant === 'secondary'
      ? 'secondary'
      : 'tertiary'

  // Determine if primary button should be clickable
  const isPrimaryDisabled = stateId === 'B2' || stateId === 'C1'

  return (
    <FluidButtonGroup
      visible={visible}
      timing="default"
      gap={8}
      exitBlur={false}
      slowMo={slowMo}
      secondaryButton={
        <Button
          variant="secondary"
          size={buttonConfig.size}
          onClick={onBackClick}
          className="w-full"
        >
          {SECONDARY_BUTTON_TEXT}
        </Button>
      }
      primaryButton={
        <div
          onClick={isPrimaryDisabled ? undefined : onPrimaryClick}
          className={isPrimaryDisabled ? 'pointer-events-none' : 'cursor-pointer'}
        >
          <AnimatedRightButton
            state={state}
            transition={stateTransition}
            variant={primaryVariant}
            slowMo={slowMo}
          />
        </div>
      }
    />
  )
}
