/**
 * EditableText Component
 *
 * Inline editable text that looks identical to regular text.
 * Click to edit, autosaves on blur. No layout shift.
 *
 * @module b/profile-v3/components/editable-profile
 */

'use client'

import * as React from 'react'
import { useState, useRef, useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'

// =============================================================================
// TYPES
// =============================================================================

export interface EditableTextProps {
  value: string
  onChange?: (value: string) => void
  className?: string
  placeholder?: string
  multiline?: boolean
  minWidth?: number
}

// =============================================================================
// COMPONENT
// =============================================================================

export function EditableText({
  value,
  onChange,
  className,
  placeholder = 'Click to edit...',
  multiline = false,
  minWidth = 60,
}: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [localValue, setLocalValue] = useState(value)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  // Sync external value changes
  useEffect(() => {
    if (!isEditing) {
      setLocalValue(value)
    }
  }, [value, isEditing])

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      // Move cursor to end
      const len = localValue.length
      inputRef.current.setSelectionRange(len, len)
    }
  }, [isEditing, localValue.length])

  const handleClick = useCallback(() => {
    setIsEditing(true)
  }, [])

  const handleBlur = useCallback(() => {
    // Autosave on blur - always save the current value
    onChange?.(localValue)
    setIsEditing(false)
  }, [localValue, onChange])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !multiline) {
        e.preventDefault()
        ;(e.target as HTMLElement).blur()
      }
      if (e.key === 'Escape') {
        setLocalValue(value)
        setIsEditing(false)
      }
    },
    [multiline, value]
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setLocalValue(e.target.value)
    },
    []
  )

  // Sizer uses committed value to lock size while editing
  // Display uses localValue to show latest typed value immediately
  const sizerText = value || placeholder
  const displayText = localValue || placeholder

  return (
    <div
      ref={containerRef}
      className={cn('relative inline-block', multiline && 'w-full')}
      style={{ minWidth: multiline ? undefined : minWidth }}
    >
      {/* Hidden sizer element - uses committed value to lock size while editing */}
      <span
        className={cn(
          className,
          'invisible whitespace-pre-wrap',
          multiline && 'block'
        )}
        aria-hidden="true"
      >
        {sizerText}
      </span>

      {/* Actual editable element - absolutely positioned over sizer */}
      {isEditing ? (
        multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={localValue}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={cn(
              className,
              'absolute inset-0 w-full h-full',
              'bg-transparent border-none outline-none',
              'focus:ring-0 focus:outline-none',
              'caret-brand-primary resize-none overflow-hidden'
            )}
            placeholder={placeholder}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={localValue}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={cn(
              className,
              'absolute inset-0 w-full',
              'bg-transparent border-none outline-none',
              'focus:ring-0 focus:outline-none',
              'caret-brand-primary'
            )}
            placeholder={placeholder}
          />
        )
      ) : (
        <span
          onClick={handleClick}
          className={cn(
            className,
            'absolute inset-0',
            'cursor-text'
          )}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleClick()
            }
          }}
        >
          {displayText}
        </span>
      )}
    </div>
  )
}
