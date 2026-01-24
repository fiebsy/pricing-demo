/**
 * Question Command Menu V4 - Trigger Display
 *
 * Read-only display state for question mode (idle/saved states).
 * Also used for "submitted question" state in processing/response flow states.
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { useBiaxialExpand } from '@/components/ui/prod/base/biaxial-command-menu-v4'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import Alert02Icon from '@hugeicons-pro/core-stroke-rounded/Alert02Icon'
import CheckmarkCircle02Icon from '@hugeicons-pro/core-stroke-rounded/CheckmarkCircle02Icon'
import Loading03Icon from '@hugeicons-pro/core-stroke-rounded/Loading03Icon'
import { useV4Context } from '../state'
import { useFlowConfig, useVisibleButtons } from '../hooks'
import { ActionButton } from './TriggerButtons'
import type { TriggerConfig, TriggerDisplayConfig, TriggerButtonConfig } from '../types'


// =============================================================================
// TYPES
// =============================================================================

export interface TriggerDisplayProps {
  triggerConfig: TriggerConfig
  displayConfig?: TriggerDisplayConfig
  onClick?: () => void
  /** Override the displayed value (instead of reading from context) */
  savedValue?: string
  /** Callback when a trigger button is clicked */
  onButtonClick?: (buttonIndex: number, buttonConfig: TriggerButtonConfig) => void
  /** Whether this question is currently regenerating */
  isRegenerating?: boolean
  className?: string
}

// =============================================================================
// DEFAULTS
// =============================================================================

const DEFAULT_DISPLAY_CONFIG: TriggerDisplayConfig = {
  placeholderText: 'Add a question...',
  addPlaceholderText: 'Add a question...',
  savedValueColor: 'primary',
  showEditIndicator: true,
}

// =============================================================================
// COMPONENT
// =============================================================================

export const TriggerDisplay: React.FC<TriggerDisplayProps> = ({
  triggerConfig,
  displayConfig = DEFAULT_DISPLAY_CONFIG,
  onClick,
  savedValue: savedValueProp,
  onButtonClick,
  isRegenerating = false,
  className,
}) => {
  const { expanded, timing } = useBiaxialExpand()
  const { state, hasSavedValue, storedConfidence } = useV4Context()
  const { effectiveTriggerButtons, flowStateId } = useFlowConfig()

  // Determine which status icon to show when collapsed and in response state
  const isCollapsedResponse = !expanded && flowStateId === 'response'
  const hasLowConfidence = storedConfidence !== null && storedConfidence <= 0.1

  // Determine icon type: 'loading' | 'caution' | 'check' | null
  // Priority: loading > caution > check (default for any response)
  let statusIconType: 'loading' | 'caution' | 'check' | null = null
  if (isCollapsedResponse) {
    if (isRegenerating) {
      statusIconType = 'loading'
    } else if (hasLowConfidence) {
      statusIconType = 'caution'
    } else {
      // Default to check for any response (good confidence or null confidence)
      statusIconType = 'check'
    }
  }

  // Use prop value if provided, otherwise fall back to context
  const effectiveSavedValue = savedValueProp ?? state.savedValue
  const hasValue = savedValueProp ? savedValueProp.trim().length > 0 : hasSavedValue

  const displayText = hasValue
    ? effectiveSavedValue
    : displayConfig.addPlaceholderText

  const textColor = hasValue
    ? `text-${displayConfig.savedValueColor}`
    : 'text-tertiary'

  // Get visible buttons for display mode (use 'expanded' showWhen since we're in response state)
  const rightButtons = useVisibleButtons(effectiveTriggerButtons ?? [], 'right', expanded)
  const hasFlowButtons = rightButtons.length > 0 && (flowStateId === 'processing' || flowStateId === 'response')

  // Get animation duration
  const duration = timing.duration

  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick?.()
        }
      }}
      className={cn(
        'flex items-center w-full h-full gap-2',
        onClick ? 'cursor-pointer' : 'cursor-default',
        'select-none',
        'transition-colors duration-150',
        className
      )}
      style={{
        paddingLeft: triggerConfig.paddingLeft,
        paddingRight: triggerConfig.paddingRight,
        paddingTop: triggerConfig.paddingTop,
        paddingBottom: triggerConfig.paddingBottom,
      }}
    >
      {/* Status icon - single container prevents layout shift */}
      {statusIconType && (
        <div
          className={cn(
            'shrink-0 w-4 h-4 flex items-center justify-center',
            statusIconType === 'loading' && 'text-tertiary animate-spin',
            statusIconType === 'caution' && 'text-error-primary',
            statusIconType === 'check' && 'text-success-primary'
          )}
          aria-label={
            statusIconType === 'loading' ? 'Regenerating' :
            statusIconType === 'caution' ? 'Low confidence warning' :
            'Good confidence'
          }
        >
          <HugeIcon
            icon={
              statusIconType === 'loading' ? Loading03Icon :
              statusIconType === 'caution' ? Alert02Icon :
              CheckmarkCircle02Icon
            }
            size={16}
            strokeWidth={2}
          />
        </div>
      )}

      {/* Display text */}
      <span
        className={cn(
          'flex-1 min-w-0 truncate',
          'text-sm',
          textColor
        )}
      >
        {displayText}
      </span>

      {/* Flow-aware buttons (Edit, Delete) in response state */}
      {hasFlowButtons && rightButtons.map((btn, index) => (
        <div
          key={btn.id}
          onClick={(e) => e.stopPropagation()}
        >
          <ActionButton
            config={btn}
            onClick={() => onButtonClick?.(index, btn)}
            expanded={expanded}
            duration={duration}
            saveStatus={state.saveStatus}
            hasUnsavedChanges={false}
          />
        </div>
      ))}

      {/* Arrow indicator - removed, now handled via button config system */}
    </div>
  )
}

TriggerDisplay.displayName = 'TriggerDisplay'
