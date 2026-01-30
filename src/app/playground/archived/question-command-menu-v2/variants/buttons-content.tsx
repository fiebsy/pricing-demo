/**
 * Question Command Menu - Buttons Content Variant
 *
 * Bottom slot content with action buttons using the design system Button.
 * Horizontally aligned like filter tabs.
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/core/primitives/button'
import type { ActionButtonConfig, ActionButtonIcon } from '../config/types'
import Tick02Icon from '@hugeicons-pro/core-stroke-rounded/Tick02Icon'
import Cancel01Icon from '@hugeicons-pro/core-stroke-rounded/Cancel01Icon'
import Edit02Icon from '@hugeicons-pro/core-stroke-rounded/Edit02Icon'
import SparklesIcon from '@hugeicons-pro/core-stroke-rounded/SparklesIcon'
import RefreshIcon from '@hugeicons-pro/core-stroke-rounded/RefreshIcon'
import SentIcon from '@hugeicons-pro/core-stroke-rounded/SentIcon'

// Map icon names to actual icon components
const ICON_MAP: Record<ActionButtonIcon, React.FC<{ className?: string }> | undefined> = {
  check: Tick02Icon,
  edit: Edit02Icon,
  sparkle: SparklesIcon,
  close: Cancel01Icon,
  refresh: RefreshIcon,
  send: SentIcon,
  none: undefined,
}

export interface ButtonsContentProps {
  /** Button configurations */
  buttons?: ActionButtonConfig[]
  /** Called when a button is clicked */
  onSelect?: (buttonId: string) => void
  /** Additional className */
  className?: string
}

const DEFAULT_BUTTONS: ActionButtonConfig[] = [
  { id: 'approve', label: 'Approve', icon: 'check', variant: 'primary', enabled: true },
  { id: 'edit', label: 'Edit', icon: 'edit', variant: 'secondary', enabled: true },
  { id: 'regenerate', label: 'Regenerate', icon: 'sparkle', variant: 'tertiary', enabled: true },
  { id: 'cancel', label: 'Cancel', icon: 'close', variant: 'tertiary', enabled: true },
]

export const ButtonsContent: React.FC<ButtonsContentProps> = ({
  buttons = DEFAULT_BUTTONS,
  onSelect,
  className,
}) => {
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

  return (
    <div
      className={cn(
        'flex items-center justify-center gap-2 w-full h-full px-3',
        className
      )}
    >
      {enabledButtons.map((button) => {
        const IconComponent = ICON_MAP[button.icon]

        return (
          <Button
            key={button.id}
            variant={button.variant}
            size="sm"
            roundness="squircle"
            iconLeading={IconComponent}
            onClick={() => handleClick(button.id)}
            className="flex-1"
          >
            {button.label}
          </Button>
        )
      })}
    </div>
  )
}

ButtonsContent.displayName = 'ButtonsContent'
