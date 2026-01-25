/**
 * ChipTrigger - Select trigger button
 *
 * The clickable trigger that opens the select dropdown.
 * Displays icon and current value.
 *
 * @module prod/base/filter/filter-select-chip-static/components/chip-trigger
 */

'use client'

import { Select } from '@base-ui/react/select'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/prod/base/icon'

import type { ChipTriggerProps } from '../types'

// ============================================================================
// Component
// ============================================================================

export function ChipTrigger({
  displayValue,
  icon: Icon,
  sizeConfig,
  isOpen,
  roundnessClass,
}: ChipTriggerProps) {
  return (
    <Select.Trigger
      className={cn(
        'inline-flex items-center gap-1.5',
        sizeConfig.padding,
        sizeConfig.text,
        'font-medium text-primary',
        'outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1',
        roundnessClass,
        'cursor-pointer'
      )}
      style={{ height: sizeConfig.height }}
    >
      <HugeIcon
        icon={Icon}
        size={sizeConfig.iconSize}
        strokeWidth={2}
        className="text-tertiary flex-shrink-0 opacity-50"
      />
      <Select.Value className="text-primary font-medium whitespace-nowrap">
        {displayValue}
      </Select.Value>
    </Select.Trigger>
  )
}

ChipTrigger.displayName = 'ChipTrigger'
