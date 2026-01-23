/**
 * Question Command Menu V4 - Trigger Display
 *
 * Read-only display state for question mode (idle/saved states).
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import { useV4Context } from '../state'
import type { TriggerConfig, TriggerDisplayConfig } from '../types'

// Icons
import ArrowRight01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowRight01Icon'

// =============================================================================
// TYPES
// =============================================================================

export interface TriggerDisplayProps {
  triggerConfig: TriggerConfig
  displayConfig?: TriggerDisplayConfig
  onClick?: () => void
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
  className,
}) => {
  const { state, hasSavedValue } = useV4Context()

  const displayText = hasSavedValue
    ? state.savedValue
    : displayConfig.addPlaceholderText

  const textColor = hasSavedValue
    ? `text-${displayConfig.savedValueColor}`
    : 'text-tertiary'

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick?.()
        }
      }}
      className={cn(
        'flex items-center w-full h-full gap-2',
        'cursor-pointer select-none',
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

      {/* Arrow indicator */}
      {displayConfig.showEditIndicator && (
        <span className="shrink-0 flex items-center justify-center text-quaternary">
          <HugeIcon icon={ArrowRight01Icon} size={18} strokeWidth={1.5} />
        </span>
      )}
    </div>
  )
}

TriggerDisplay.displayName = 'TriggerDisplay'
