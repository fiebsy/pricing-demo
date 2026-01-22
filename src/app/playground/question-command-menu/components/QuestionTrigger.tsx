/**
 * QuestionTrigger - Input trigger for question command menu
 *
 * Adapts to different modes:
 * - List mode: "Add question" placeholder with suggestions
 * - Detail mode: Shows selected question text with edit capability
 *
 * Designed to work as BiaxialExpandV4.Trigger content.
 *
 * @module playground/question-command-menu/components
 */

'use client'

import * as React from 'react'
import { useState, useCallback, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import Add01Icon from '@hugeicons-pro/core-stroke-rounded/Add01Icon'
import Search01Icon from '@hugeicons-pro/core-stroke-rounded/Search01Icon'
import ArrowLeft01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowLeft01Icon'

import { useBiaxialExpand } from '@/components/ui/prod/base/biaxial-command-menu-v4'
import type { ViewMode } from '../types'

// =============================================================================
// TYPES
// =============================================================================

export interface QuestionTriggerProps {
  /** Current view mode */
  mode: ViewMode
  /** The text value */
  value: string
  /** Called when value changes */
  onValueChange: (value: string) => void
  /** Called when add/save is clicked */
  onSubmit?: () => void
  /** Called when back is clicked (detail mode) */
  onBack?: () => void
  /** Placeholder text */
  placeholder?: string
  /** Whether to show the add button */
  showAddButton?: boolean
  /** Whether add/save is disabled */
  submitDisabled?: boolean
  /** Additional className */
  className?: string
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function QuestionTrigger({
  mode,
  value,
  onValueChange,
  onSubmit,
  onBack,
  placeholder = 'Add question...',
  showAddButton = true,
  submitDisabled,
  className,
}: QuestionTriggerProps) {
  const { expanded, setExpanded } = useBiaxialExpand()
  const inputRef = useRef<HTMLInputElement>(null)
  const [isFocused, setIsFocused] = useState(false)

  // Focus input when expanded
  useEffect(() => {
    if (expanded && inputRef.current && mode === 'list') {
      inputRef.current.focus()
    }
  }, [expanded, mode])

  const handleFocus = useCallback(() => {
    setIsFocused(true)
    if (!expanded) {
      setExpanded(true)
    }
  }, [expanded, setExpanded])

  const handleBlur = useCallback(() => {
    setIsFocused(false)
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        inputRef.current?.blur()
        setExpanded(false)
      }
      if (e.key === 'Enter' && value.trim() && !submitDisabled) {
        e.preventDefault()
        onSubmit?.()
      }
    },
    [value, submitDisabled, onSubmit, setExpanded]
  )

  const handleBackClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      onBack?.()
    },
    [onBack]
  )

  const handleAddClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      if (!submitDisabled) {
        onSubmit?.()
      }
    },
    [submitDisabled, onSubmit]
  )

  const isDetailMode = mode === 'detail'

  return (
    <div
      className={cn(
        'flex items-center w-full h-full px-3',
        className
      )}
    >
      {/* Back button (detail mode) */}
      {isDetailMode && onBack && (
        <button
          type="button"
          onClick={handleBackClick}
          className={cn(
            'shrink-0 p-1.5 mr-2 rounded-lg -ml-1',
            'text-tertiary hover:text-primary',
            'hover:bg-tertiary',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary',
            'motion-safe:transition-all motion-safe:duration-150'
          )}
        >
          <HugeIcon icon={ArrowLeft01Icon} size="sm" color="current" />
        </button>
      )}

      {/* Search/Add icon */}
      {!isDetailMode && (
        <HugeIcon
          icon={Search01Icon}
          size="sm"
          className="shrink-0 text-tertiary mr-2"
        />
      )}

      {/* Input */}
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={cn(
          'flex-1 bg-transparent',
          'text-sm text-primary placeholder:text-tertiary',
          'focus:outline-none',
          'min-w-0'
        )}
      />

      {/* Add button (list mode) */}
      {!isDetailMode && showAddButton && value.trim() && (
        <button
          type="button"
          onClick={handleAddClick}
          disabled={submitDisabled}
          className={cn(
            'shrink-0 ml-2 px-2.5 py-1 rounded-lg',
            'inline-flex items-center gap-1',
            'text-xs font-medium',
            'bg-brand-solid text-white',
            'hover:bg-brand-solid-hover',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary',
            'motion-safe:transition-all motion-safe:duration-150',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
        >
          <HugeIcon icon={Add01Icon} size="xs" color="current" />
          <span>Add</span>
        </button>
      )}

      {/* Keyboard hint (collapsed, no value) */}
      {!expanded && !value && (
        <div className="shrink-0 ml-2 px-1.5 py-0.5 rounded bg-tertiary/50 text-tertiary text-xs font-mono">
          /
        </div>
      )}
    </div>
  )
}
