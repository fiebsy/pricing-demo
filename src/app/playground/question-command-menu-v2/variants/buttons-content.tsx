/**
 * Question Command Menu - Buttons Content Variant
 *
 * Bottom slot content with action buttons using the design system Button.
 * Horizontally aligned like filter tabs.
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button, type ButtonVariant } from '@/components/ui/prod/base/button'
import Tick02Icon from '@hugeicons-pro/core-stroke-rounded/Tick02Icon'
import Cancel01Icon from '@hugeicons-pro/core-stroke-rounded/Cancel01Icon'
import Edit02Icon from '@hugeicons-pro/core-stroke-rounded/Edit02Icon'
import SparklesIcon from '@hugeicons-pro/core-stroke-rounded/SparklesIcon'

export interface ButtonOption {
  id: string
  label: string
  icon?: React.FC<{ className?: string }>
  variant?: ButtonVariant
}

export interface ButtonsContentProps {
  /** Button options */
  options?: ButtonOption[]
  /** Called when a button is clicked */
  onSelect?: (buttonId: string) => void
  /** Additional className */
  className?: string
}

const DEFAULT_OPTIONS: ButtonOption[] = [
  { id: 'approve', label: 'Approve', icon: Tick02Icon, variant: 'primary' },
  { id: 'edit', label: 'Edit', icon: Edit02Icon, variant: 'secondary' },
  { id: 'regenerate', label: 'Regenerate', icon: SparklesIcon, variant: 'tertiary' },
  { id: 'cancel', label: 'Cancel', icon: Cancel01Icon, variant: 'tertiary' },
]

export const ButtonsContent: React.FC<ButtonsContentProps> = ({
  options = DEFAULT_OPTIONS,
  onSelect,
  className,
}) => {
  const handleClick = (buttonId: string) => {
    console.log('[ButtonsContent] Button clicked:', buttonId)
    onSelect?.(buttonId)
  }

  return (
    <div
      className={cn(
        'flex items-center justify-center gap-2 w-full h-full px-3',
        className
      )}
    >
      {options.map((option) => (
        <Button
          key={option.id}
          variant={option.variant ?? 'secondary'}
          size="sm"
          roundness="squircle"
          iconLeading={option.icon}
          onClick={() => handleClick(option.id)}
          className="flex-1"
        >
          {option.label}
        </Button>
      ))}
    </div>
  )
}

ButtonsContent.displayName = 'ButtonsContent'
