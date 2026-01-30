/**
 * Question Command Menu V3 - Buttons Content
 *
 * Action buttons content that can render in any slot.
 * Supports horizontal and vertical layouts.
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/core/primitives/button'
import { useV3Context } from '../core'
import type { ActionButtonConfig, ActionButtonIcon, SlotPosition } from '../config/types'

// Icons
import Tick02Icon from '@hugeicons-pro/core-stroke-rounded/Tick02Icon'
import Cancel01Icon from '@hugeicons-pro/core-stroke-rounded/Cancel01Icon'
import Edit02Icon from '@hugeicons-pro/core-stroke-rounded/Edit02Icon'
import SparklesIcon from '@hugeicons-pro/core-stroke-rounded/SparklesIcon'
import RefreshIcon from '@hugeicons-pro/core-stroke-rounded/RefreshIcon'
import SentIcon from '@hugeicons-pro/core-stroke-rounded/SentIcon'

// ============================================================================
// ICON MAP
// ============================================================================

const ICON_MAP: Record<ActionButtonIcon, React.FC<{ className?: string }> | undefined> = {
  check: Tick02Icon,
  edit: Edit02Icon,
  sparkle: SparklesIcon,
  close: Cancel01Icon,
  refresh: RefreshIcon,
  send: SentIcon,
  none: undefined,
}

// ============================================================================
// TYPES
// ============================================================================

export interface ButtonsContentProps {
  /** Called when a button is clicked */
  onSelect?: (buttonId: string) => void
  /** Slot position this content is rendered in */
  slotPosition: SlotPosition
  /** Additional className */
  className?: string
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const ButtonsContent: React.FC<ButtonsContentProps> = ({
  onSelect,
  slotPosition,
  className,
}) => {
  const { config } = useV3Context()
  const buttonsConfig = config.contentConfigs.buttons
  const {
    buttons,
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

  // Filter to only enabled buttons
  const enabledButtons = buttons.filter((btn) => btn.enabled)

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
        const IconComponent = ICON_MAP[button.icon]

        return (
          <Button
            key={button.id}
            variant={button.variant}
            size={size}
            roundness="squircle"
            iconLeading={IconComponent}
            onClick={() => handleClick(button.id)}
            className={isHorizontal ? 'flex-1' : 'w-full'}
          >
            {button.label}
          </Button>
        )
      })}
    </div>
  )
}

ButtonsContent.displayName = 'ButtonsContent'
