/**
 * OptionItem - Select dropdown option
 *
 * Individual option in the select dropdown with checkmark indicator.
 *
 * @module prod/base/filter/filter-select-chip-static/components/option-item
 */

'use client'

import { Select } from '@base-ui/react/select'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import CheckmarkIcon from '@hugeicons-pro/core-stroke-rounded/Tick01Icon'

import type { OptionItemProps } from '../types'

// ============================================================================
// Component
// ============================================================================

export function OptionItem({ option, isSelected }: OptionItemProps) {
  // Disable if explicitly disabled OR if currently selected (prevent double-selection)
  const isDisabled = option.disabled || isSelected

  return (
    <Select.Item
      key={option.id}
      value={option.id}
      disabled={isDisabled}
      className={cn(
        'flex items-center justify-between gap-2',
        'px-2 py-1.5 min-h-7 rounded-lg',
        'text-sm font-medium',
        'text-primary',
        'outline-none cursor-pointer',
        'data-[highlighted]:bg-tertiary',
        'data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed',
        'transition-colors duration-100',
        'motion-reduce:transition-none'
      )}
    >
      <Select.ItemText>{option.label}</Select.ItemText>
      <Select.ItemIndicator className="text-brand-primary">
        <HugeIcon icon={CheckmarkIcon} size={14} strokeWidth={2.5} />
      </Select.ItemIndicator>
    </Select.Item>
  )
}

OptionItem.displayName = 'OptionItem'
