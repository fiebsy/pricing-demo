/**
 * Search Input
 *
 * The text input field that slides in when the search is expanded.
 * Supports children for additional controls (like clear button).
 *
 * @module expanding-search/components/search-input
 */

'use client'

import React from 'react'
import { Input } from '@base-ui/react/input'
import { cn } from '@/lib/utils'

import type { SearchInputProps } from '../types'

export const SearchInput: React.FC<SearchInputProps> = ({
  inputRef,
  isExpanded,
  value,
  placeholder,
  collapsedWidth,
  contentOpacity,
  contentTransition,
  onChange,
  onKeyDown,
  children,
}) => {
  return (
    <div
      className="absolute top-0 bottom-0 right-0 flex items-center gap-2 pr-3"
      style={{
        left: collapsedWidth,
        opacity: contentOpacity,
        transition: contentTransition,
        pointerEvents: isExpanded ? 'auto' : 'none',
      }}
    >
      <Input
        ref={inputRef}
        type="search"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className={cn(
          'flex-1 min-w-0 bg-transparent border-none outline-none',
          'text-primary text-sm',
          'placeholder:text-tertiary'
        )}
        aria-label="Search"
        tabIndex={isExpanded ? 0 : -1}
      />
      {children}
    </div>
  )
}

SearchInput.displayName = 'SearchInput'
