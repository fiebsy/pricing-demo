'use client'

/**
 * SearchToolbar Component
 *
 * A simple search bar integration for StickyDataTable.
 * Uses the Untitled UI InputBase component for consistent styling.
 *
 * @example
 * ```tsx
 * const [search, setSearch] = useState('')
 *
 * <StickyDataTable
 *   searchToolbar={
 *     <SearchToolbar
 *       value={search}
 *       onChange={setSearch}
 *       placeholder="Search contracts..."
 *     />
 *   }
 * />
 * ```
 */

import * as React from 'react'
import { Search01Icon, Cancel01Icon } from '@hugeicons-pro/core-stroke-rounded'
import { cx } from '@/components/utils/cx'
import { HugeIcon } from '@/components/ui/prod/base/icon'

export interface SearchToolbarProps {
  /** Current search value */
  value: string
  /** Callback when search value changes */
  onChange: (value: string) => void
  /** Placeholder text */
  placeholder?: string
  /** Debounce delay in ms (0 = no debounce) */
  debounceMs?: number
  /** Callback when search is cleared */
  onClear?: () => void
  /** Disabled state */
  disabled?: boolean
  /** Additional class name */
  className?: string
  /** Width of the search input */
  width?: number | string
}

/**
 * SearchToolbar - Search input designed for StickyDataTable toolbar
 *
 * Features:
 * - Clearable when value exists
 * - Compact size matching toolbar
 * - Optional debouncing
 * - Uses Untitled UI styling
 */
export const SearchToolbar: React.FC<SearchToolbarProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
  debounceMs = 0,
  onClear,
  disabled = false,
  className,
  width = 220,
}) => {
  const [localValue, setLocalValue] = React.useState(value)
  const debounceRef = React.useRef<NodeJS.Timeout | null>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  // Sync external value changes
  React.useEffect(() => {
    setLocalValue(value)
  }, [value])

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setLocalValue(newValue)

      if (debounceMs > 0) {
        if (debounceRef.current) {
          clearTimeout(debounceRef.current)
        }
        debounceRef.current = setTimeout(() => {
          onChange(newValue)
        }, debounceMs)
      } else {
        onChange(newValue)
      }
    },
    [onChange, debounceMs]
  )

  const handleClear = React.useCallback(() => {
    setLocalValue('')
    onChange('')
    onClear?.()
    inputRef.current?.focus()
  }, [onChange, onClear])

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [])

  const showClearButton = localValue.length > 0 && !disabled

  return (
    <div
      className={cx(
        'relative flex items-center',
        'bg-primary rounded-xl ring-1 ring-inset ring-primary shadow-xs',
        'transition-all duration-100 ease-linear',
        'focus-within:outline-2 focus-within:outline-brand focus-within:outline-offset-0',
        disabled && 'bg-disabled_subtle ring-disabled cursor-not-allowed opacity-50',
        className
      )}
      style={{ width }}
    >
      {/* Search Icon */}
      <span className="absolute left-3 pointer-events-none text-quaternary">
        <HugeIcon icon={Search01Icon} size={16} strokeWidth={1.5} />
      </span>

      {/* Input */}
      <input
        ref={inputRef}
        type="text"
        value={localValue}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        className={cx(
          'w-full bg-transparent border-none outline-none',
          'text-sm text-primary placeholder:text-placeholder',
          'py-2 pl-9',
          showClearButton ? 'pr-8' : 'pr-3',
          disabled && 'cursor-not-allowed'
        )}
      />

      {/* Clear Button */}
      {showClearButton && (
        <button
          type="button"
          onClick={handleClear}
          className={cx(
            'absolute right-2 p-1 rounded-md',
            'text-quaternary hover:text-secondary hover:bg-secondary',
            'transition-colors duration-100'
          )}
          aria-label="Clear search"
        >
          <HugeIcon icon={Cancel01Icon} size={14} strokeWidth={2} />
        </button>
      )}
    </div>
  )
}

SearchToolbar.displayName = 'SearchToolbar'
