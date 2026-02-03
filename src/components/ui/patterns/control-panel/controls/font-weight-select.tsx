// =============================================================================
// Font Weight Select Control
// =============================================================================
// Enhanced dropdown where each option shows text rendered in that actual weight.
// =============================================================================

'use client'

import { cx } from '@/components/utils/cx'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/deprecated/base/primitives/select'
import type { FontWeightOption } from '../tokens/typography'

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface FontWeightSelectProps {
  /** Current value */
  value: string
  /** Font weight options */
  options: FontWeightOption[]
  /** Change handler */
  onChange: (value: string) => void
  /** Preview text to render in each weight */
  previewText?: string
  /** Whether the control is disabled */
  disabled?: boolean
  /** Additional class name */
  className?: string
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function FontWeightSelect({
  value,
  options,
  onChange,
  previewText = 'Aa',
  disabled = false,
  className,
}: FontWeightSelectProps) {
  const safeValue = value || options[0]?.value || ''
  const selectedOption = options.find((opt) => opt.value === safeValue)

  return (
    <Select
      value={safeValue || undefined}
      onValueChange={disabled ? undefined : onChange}
      disabled={disabled}
    >
      <SelectTrigger
        className={cx(
          'h-9 w-full px-2.5 py-1.5 text-xs',
          disabled && 'cursor-not-allowed opacity-50',
          className
        )}
      >
        <span className="flex items-center gap-2.5">
          {/* Weight preview in trigger */}
          <span
            className="text-primary w-8 text-center text-sm"
            style={{ fontWeight: selectedOption?.weight ?? 400 }}
          >
            {previewText}
          </span>
          <span className="text-secondary truncate text-xs">
            {selectedOption?.label || 'Select weight...'}
          </span>
        </span>
      </SelectTrigger>
      <SelectContent className="max-h-[300px]">
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value} className="py-2">
            <span className="flex items-center gap-3">
              {/* Weight preview in option */}
              <span
                className="text-primary w-8 text-center text-sm"
                style={{ fontWeight: option.weight }}
              >
                {previewText}
              </span>
              <span className="flex flex-col">
                <span className="text-xs">{option.label}</span>
                <span className="text-tertiary text-[10px] tabular-nums">
                  {option.weight}
                </span>
              </span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
