/**
 * FilterChip - Single filter chip
 *
 * Wraps the chip trigger and popup with Base UI Select.
 *
 * @module prod/base/filter/filter-select-chip-static/components/filter-chip
 */

'use client'

import * as React from 'react'
import { Select } from '@base-ui/react/select'
import { cn } from '@/lib/utils'
import FilterIcon from '@hugeicons-pro/core-stroke-rounded/FilterIcon'

import { ChipTrigger } from './chip-trigger'
import { ChipPopup } from './chip-popup'
import { RemoveButton } from './remove-button'
import { getSizeConfig, getRoundnessClass } from '../config'
import type { FilterChipProps } from '../types'

// ============================================================================
// Component
// ============================================================================

export function FilterChip({
  filter,
  styleConfig,
  onValueChange,
  onRemove,
  showDebug,
  index,
  allActiveValues,
}: FilterChipProps) {
  const [open, setOpen] = React.useState(false)

  const sizeConfig = getSizeConfig(styleConfig.size)
  const roundnessClass = getRoundnessClass(styleConfig.roundness)
  const selectedOption = filter.options.find((o) => o.id === filter.value)
  const displayValue = selectedOption?.label ?? filter.value
  const Icon = filter.icon || FilterIcon

  return (
    <div className="inline-flex">
      <Select.Root
        value={filter.value}
        onValueChange={(val) => val && onValueChange(val)}
        open={open}
        onOpenChange={setOpen}
      >
        <div
          className={cn(
            'group relative inline-flex items-center',
            'bg-secondary border border-transparent shine-3-subtle',
            'hover:bg-tertiary',
            open && 'bg-tertiary',
            roundnessClass,
            'transition-colors duration-150'
          )}
          style={{ height: sizeConfig.height }}
        >
          <ChipTrigger
            displayValue={displayValue}
            icon={Icon}
            sizeConfig={sizeConfig}
            isOpen={open}
            roundnessClass={roundnessClass}
          />
          <RemoveButton
            filterLabel={filter.label}
            iconSize={sizeConfig.iconSize}
            height={sizeConfig.height}
            onRemove={onRemove}
          />
          {showDebug && (
            <span className="absolute -top-2 -left-2 bg-brand-primary text-inverse text-xs rounded-full w-5 h-5 flex items-center justify-center font-mono">
              {index}
            </span>
          )}
        </div>
        <ChipPopup
          label={filter.label}
          options={filter.options}
          currentValue={filter.value}
          allActiveValues={allActiveValues}
        />
      </Select.Root>
    </div>
  )
}

FilterChip.displayName = 'FilterChip'
