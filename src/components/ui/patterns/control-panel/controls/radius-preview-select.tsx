// =============================================================================
// Radius Preview Select Control
// =============================================================================
// Dropdown where each option shows a small square with that border radius.
// =============================================================================

'use client'

import { cx } from '@/components/utils/cx'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/deprecated/base/primitives/select'
import type { RadiusOption } from '../tokens/radius'

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface RadiusPreviewSelectProps {
  /** Current value */
  value: string
  /** Radius options */
  options: RadiusOption[]
  /** Change handler */
  onChange: (value: string) => void
  /** Preview square size */
  previewSize?: 'sm' | 'md' | 'lg'
  /** Whether the control is disabled */
  disabled?: boolean
  /** Additional class name */
  className?: string
}

// -----------------------------------------------------------------------------
// Radius Preview Square
// -----------------------------------------------------------------------------

interface RadiusPreviewProps {
  pixels: number
  size: 'sm' | 'md' | 'lg'
}

function RadiusPreview({ pixels, size }: RadiusPreviewProps) {
  const sizeMap = {
    sm: 16,
    md: 20,
    lg: 24,
  }
  const squareSize = sizeMap[size]

  // For "full" radius, cap at half the square size
  const effectiveRadius = Math.min(pixels, squareSize / 2)

  return (
    <span
      className="inline-block shrink-0 border border-tertiary bg-secondary"
      style={{
        width: squareSize,
        height: squareSize,
        borderRadius: effectiveRadius,
      }}
    />
  )
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function RadiusPreviewSelect({
  value,
  options,
  onChange,
  previewSize = 'md',
  disabled = false,
  className,
}: RadiusPreviewSelectProps) {
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
          {selectedOption && (
            <RadiusPreview pixels={selectedOption.pixels} size={previewSize} />
          )}
          <span className="truncate">
            {selectedOption?.label || 'Select radius...'}
          </span>
          {selectedOption && selectedOption.pixels > 0 && (
            <span className="text-tertiary ml-auto text-[10px] tabular-nums">
              {selectedOption.pixels === 9999 ? '∞' : `${selectedOption.pixels}px`}
            </span>
          )}
        </span>
      </SelectTrigger>
      <SelectContent className="max-h-[300px]">
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value} className="py-2">
            <span className="flex items-center gap-3">
              <RadiusPreview pixels={option.pixels} size={previewSize} />
              <span className="flex flex-col">
                <span className="text-xs">{option.label}</span>
                <span className="text-tertiary text-[10px] tabular-nums">
                  {option.pixels === 9999 ? 'Full (pill)' : `${option.pixels}px`}
                </span>
              </span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
