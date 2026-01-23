/**
 * Question Command Menu V4 - Buttons Content
 *
 * Action buttons content that can render in any slot.
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/prod/base/button'
import { useV4Context } from '../state'
import { useFlowConfig } from '../hooks'
import type { ActionButtonIcon, SlotPosition } from '../types'

// Icons
import Tick02Icon from '@hugeicons-pro/core-stroke-rounded/Tick02Icon'
import Cancel01Icon from '@hugeicons-pro/core-stroke-rounded/Cancel01Icon'
import Edit02Icon from '@hugeicons-pro/core-stroke-rounded/Edit02Icon'
import SparklesIcon from '@hugeicons-pro/core-stroke-rounded/SparklesIcon'
import RefreshIcon from '@hugeicons-pro/core-stroke-rounded/RefreshIcon'
import SentIcon from '@hugeicons-pro/core-stroke-rounded/SentIcon'

// =============================================================================
// ICON MAP
// =============================================================================

const ICON_MAP: Record<ActionButtonIcon, React.FC<{ className?: string }> | undefined> = {
  check: Tick02Icon,
  edit: Edit02Icon,
  sparkle: SparklesIcon,
  close: Cancel01Icon,
  refresh: RefreshIcon,
  send: SentIcon,
  none: undefined,
}

// =============================================================================
// TYPES
// =============================================================================

export interface ButtonsContentProps {
  onSelect?: (buttonId: string) => void
  slotPosition: SlotPosition
  className?: string
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export const ButtonsContent: React.FC<ButtonsContentProps> = ({
  onSelect,
  slotPosition,
  className,
}) => {
  const { config } = useV4Context()
  const { effectiveButtons } = useFlowConfig()
  const buttonsConfig = config.contentConfigs.buttons
  const {
    direction,
    gap = 8,
    size = 'sm',
    paddingLeft = 12,
    paddingRight = 12,
    paddingTop = 8,
    paddingBottom = 8,
  } = buttonsConfig

  const handleClick = (buttonId: string) => {
    console.log('[ButtonsContent] Button clicked:', buttonId)
    onSelect?.(buttonId)
  }

  // Filter to only enabled buttons (using effective buttons with flow overrides)
  const enabledButtons = effectiveButtons.filter((btn) => btn.enabled)

  if (enabledButtons.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-full text-tertiary text-sm">
        No buttons enabled
      </div>
    )
  }

  const isHorizontal = direction === 'horizontal'

  return (
    <div
      className={cn(
        'flex items-center justify-center w-full h-full',
        isHorizontal ? 'flex-row' : 'flex-col',
        className
      )}
      style={{
        gap,
        paddingLeft,
        paddingRight,
        paddingTop,
        paddingBottom,
      }}
    >
      {enabledButtons.map((button) => {
        const IconComponent = button.isLoading ? undefined : ICON_MAP[button.icon]

        return (
          <Button
            key={button.id}
            variant={button.variant}
            size={size}
            roundness="squircle"
            iconLeading={IconComponent}
            onClick={() => handleClick(button.id)}
            className={isHorizontal ? 'flex-1' : 'w-full'}
            disabled={button.isLoading}
            isLoading={button.isLoading}
          >
            {button.label}
          </Button>
        )
      })}
    </div>
  )
}

ButtonsContent.displayName = 'ButtonsContent'
