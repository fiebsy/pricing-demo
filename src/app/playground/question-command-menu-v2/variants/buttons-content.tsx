/**
 * Question Command Menu - Buttons Content Variant
 *
 * Bottom slot content with action buttons.
 * Useful for confirmation dialogs, action menus, etc.
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import Tick02Icon from '@hugeicons-pro/core-stroke-rounded/Tick02Icon'
import Cancel01Icon from '@hugeicons-pro/core-stroke-rounded/Cancel01Icon'
import Edit02Icon from '@hugeicons-pro/core-stroke-rounded/Edit02Icon'
import Delete02Icon from '@hugeicons-pro/core-stroke-rounded/Delete02Icon'
import SparklesIcon from '@hugeicons-pro/core-stroke-rounded/SparklesIcon'
import RefreshIcon from '@hugeicons-pro/core-stroke-rounded/RefreshIcon'

export interface ButtonOption {
  id: string
  label: string
  icon?: React.ComponentType<{ className?: string }>
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
}

export interface ButtonsContentProps {
  /** Button options */
  options?: ButtonOption[]
  /** Called when a button is clicked */
  onSelect?: (buttonId: string) => void
  /** Layout direction */
  layout?: 'horizontal' | 'vertical' | 'grid'
  /** Additional className */
  className?: string
}

const DEFAULT_OPTIONS: ButtonOption[] = [
  { id: 'confirm', label: 'Confirm', icon: Tick02Icon, variant: 'primary' },
  { id: 'cancel', label: 'Cancel', icon: Cancel01Icon, variant: 'ghost' },
]

const EXTENDED_OPTIONS: ButtonOption[] = [
  { id: 'approve', label: 'Approve', icon: Tick02Icon, variant: 'primary' },
  { id: 'edit', label: 'Edit', icon: Edit02Icon, variant: 'secondary' },
  { id: 'regenerate', label: 'Regenerate', icon: SparklesIcon, variant: 'secondary' },
  { id: 'refresh', label: 'Refresh', icon: RefreshIcon, variant: 'ghost' },
  { id: 'delete', label: 'Delete', icon: Delete02Icon, variant: 'danger' },
]

const variantStyles = {
  primary: 'bg-brand-solid text-on-brand hover:bg-brand-solid-hover',
  secondary: 'bg-secondary text-primary border border-primary hover:bg-tertiary',
  danger: 'bg-error-secondary text-error-primary hover:bg-error-tertiary',
  ghost: 'bg-transparent text-tertiary hover:text-primary hover:bg-tertiary',
}

export const ButtonsContent: React.FC<ButtonsContentProps> = ({
  options = EXTENDED_OPTIONS,
  onSelect,
  layout = 'vertical',
  className,
}) => {
  const handleClick = (buttonId: string) => {
    console.log('[ButtonsContent] Button clicked:', buttonId)
    onSelect?.(buttonId)
  }

  const layoutClasses = {
    horizontal: 'flex flex-row items-center gap-2',
    vertical: 'flex flex-col gap-2',
    grid: 'grid grid-cols-2 gap-2',
  }

  return (
    <div
      className={cn(
        'w-full h-full p-3',
        layoutClasses[layout],
        className
      )}
    >
      {options.map((option) => {
        const Icon = option.icon
        const variant = option.variant ?? 'secondary'

        return (
          <button
            key={option.id}
            type="button"
            onClick={() => handleClick(option.id)}
            className={cn(
              'flex items-center justify-center gap-2',
              'px-4 py-2.5 rounded-xl',
              'text-sm font-medium',
              'transition-colors duration-150',
              variantStyles[variant],
              layout === 'vertical' && 'w-full'
            )}
          >
            {Icon && <HugeIcon icon={Icon} size={16} />}
            <span>{option.label}</span>
          </button>
        )
      })}
    </div>
  )
}

ButtonsContent.displayName = 'ButtonsContent'
