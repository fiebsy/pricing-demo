/**
 * Filter Select Component
 *
 * Dropdown filter for coverage type and category.
 */

'use client'

import { cn } from '@/lib/utils'

// =============================================================================
// TYPES
// =============================================================================

interface FilterOption<T> {
  value: T
  label: string
}

interface FilterSelectProps<T extends string> {
  label: string
  value: T
  options: FilterOption<T>[]
  onChange: (value: T) => void
}

// =============================================================================
// COMPONENT
// =============================================================================

export function FilterSelect<T extends string>({
  label,
  value,
  options,
  onChange,
}: FilterSelectProps<T>) {
  const selectedOption = options.find((o) => o.value === value)

  return (
    <div className="flex items-center gap-2">
      <span className="text-tertiary text-xs">{label}:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className={cn(
          'bg-secondary text-secondary rounded-lg px-2.5 py-1.5 text-xs font-medium',
          'border-secondary border',
          'focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand/30',
          'cursor-pointer'
        )}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
