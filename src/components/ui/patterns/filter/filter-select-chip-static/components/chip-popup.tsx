/**
 * ChipPopup - Select dropdown popup
 *
 * The dropdown menu that appears when a chip is clicked.
 * Contains header with filter label and list of options.
 *
 * @module prod/base/filter/filter-select-chip-static/components/chip-popup
 */

'use client'

import { Select } from '@base-ui/react/select'
import { cn } from '@/lib/utils'

import { OptionItem } from './option-item'
import type { ChipPopupProps } from '../types'

// ============================================================================
// Component
// ============================================================================

export function ChipPopup({ label, options, currentValue, allActiveValues }: ChipPopupProps) {
  return (
    <Select.Portal>
      <Select.Positioner sideOffset={0} alignItemWithTrigger className="z-50">
        <Select.Popup
          className={cn(
            'bg-primary border border-primary rounded-xl shadow-lg',
            'p-1 min-w-[160px]',
            'outline-none'
          )}
        >
          <div className="flex items-center text-quaternary opacity-60 px-2 min-h-7 text-xs font-normal mb-1">
            {label}
          </div>

          {options.map((option) => (
            <OptionItem
              key={option.id}
              option={option}
              isSelected={allActiveValues?.has(option.id) ?? option.id === currentValue}
            />
          ))}
        </Select.Popup>
      </Select.Positioner>
    </Select.Portal>
  )
}

ChipPopup.displayName = 'ChipPopup'
