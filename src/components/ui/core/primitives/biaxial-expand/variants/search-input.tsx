/**
 * Biaxial Expand - Search Input Variant
 *
 * Built-in trigger variant for search/command input.
 * Expands the menu on focus and provides keyboard navigation.
 */

'use client'

import * as React from 'react'
import { forwardRef, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import Search01Icon from '@hugeicons-pro/core-stroke-rounded/Search01Icon'
import { useBiaxialExpand } from '../context'
import type { SearchInputProps } from '../types'

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      placeholder = 'Search...',
      value,
      onValueChange,
      onEscape,
      onArrowDown,
      className,
    },
    ref
  ) => {
    const { expanded, setExpanded, config } = useBiaxialExpand()

    const handleFocus = useCallback(() => {
      setExpanded(true)
    }, [setExpanded])

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape') {
          setExpanded(false)
          onEscape?.()
          ;(e.target as HTMLInputElement).blur()
        } else if (e.key === 'ArrowDown') {
          e.preventDefault()
          onArrowDown?.()
        }
      },
      [setExpanded, onEscape, onArrowDown]
    )

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onValueChange?.(e.target.value)
      },
      [onValueChange]
    )

    return (
      <div
        className={cn(
          'flex items-center w-full h-full gap-2 px-3',
          className
        )}
      >
        {/* Search icon */}
        <HugeIcon
          icon={Search01Icon}
          size={18}
          className={cn(
            'shrink-0 transition-colors duration-150',
            expanded ? 'text-tertiary' : 'text-quaternary'
          )}
        />

        {/* Input */}
        <input
          ref={ref}
          type="text"
          value={value ?? ''}
          onChange={handleChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(
            'flex-1 bg-transparent outline-none',
            'text-primary placeholder:text-tertiary',
            'text-sm'
          )}
        />

        {/* Keyboard shortcut hint (when collapsed) */}
        {!expanded && (
          <kbd
            className={cn(
              'hidden sm:flex items-center gap-1',
              'px-1.5 py-0.5 rounded',
              'bg-tertiary text-tertiary',
              'text-xs font-medium'
            )}
          >
            <span className="text-[10px]">CMD</span>
            <span>K</span>
          </kbd>
        )}
      </div>
    )
  }
)

SearchInput.displayName = 'BiaxialExpand.SearchInput'
