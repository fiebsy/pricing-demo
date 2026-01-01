/**
 * SearchInput Component
 *
 * A search input component built on Skwircle primitive.
 * Includes search icon and optional clear button.
 *
 * @example Basic
 * ```tsx
 * <SearchInput placeholder="Search..." value={query} onChange={handleChange} />
 * ```
 *
 * @example With Clear
 * ```tsx
 * <SearchInput
 *   placeholder="Search..."
 *   value={query}
 *   onChange={handleChange}
 *   onClear={() => setQuery('')}
 * />
 * ```
 */

'use client'

import * as React from 'react'
import { Skwircle } from '../../'
import { HugeIcon } from '@/components/ui/icon/huge-icons/huge-icons'
import { Search01Icon, Cancel01Icon } from '@hugeicons-pro/core-stroke-rounded'

// =============================================================================
// TYPES
// =============================================================================

type InputSize = 'sm' | 'md'

interface SearchInputProps {
  value?: string
  placeholder?: string
  size?: InputSize
  disabled?: boolean
  readOnly?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClear?: () => void
  className?: string
}

// =============================================================================
// SIZE CONFIGURATION
// =============================================================================

interface SizeConfig {
  height: number
  paddingX: number
  iconSize: number
  textClass: string
  gap: number
}

const SIZE_CONFIGS: Record<InputSize, SizeConfig> = {
  sm: {
    height: 32,
    paddingX: 10,
    iconSize: 14,
    textClass: 'text-sm',
    gap: 6,
  },
  md: {
    height: 40,
    paddingX: 12,
    iconSize: 16,
    textClass: 'text-sm',
    gap: 8,
  },
}

// =============================================================================
// COMPONENT
// =============================================================================

export const SearchInput: React.FC<SearchInputProps> = ({
  value = '',
  placeholder = 'Search...',
  size = 'md',
  disabled = false,
  readOnly = false,
  onChange,
  onClear,
  className = '',
}) => {
  const config = SIZE_CONFIGS[size]
  const showClear = value.length > 0 && onClear

  return (
    <Skwircle
      variant="input"
      intent="default"
      roundness="rounded"
      borderWidth={1}
      backgroundColor="background-primary"
      borderColor="border-primary"
      disabled={disabled}
      className={`w-full ${className}`}
    >
      <div
        className="flex items-center w-full"
        style={{
          height: config.height,
          paddingLeft: config.paddingX,
          paddingRight: config.paddingX,
          gap: config.gap,
        }}
      >
        {/* Search Icon */}
        <span className="text-quaternary flex-shrink-0">
          <HugeIcon icon={Search01Icon} size={config.iconSize} strokeWidth={2} />
        </span>

        {/* Input */}
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          onChange={onChange}
          className={`
            flex-1 min-w-0 bg-transparent border-none outline-none
            text-primary placeholder:text-quaternary
            ${config.textClass}
          `}
        />

        {/* Clear Button */}
        {showClear && (
          <button
            type="button"
            onClick={onClear}
            className="text-quaternary hover:text-tertiary flex-shrink-0 transition-colors"
            aria-label="Clear search"
          >
            <HugeIcon icon={Cancel01Icon} size={config.iconSize} strokeWidth={2} />
          </button>
        )}
      </div>
    </Skwircle>
  )
}
