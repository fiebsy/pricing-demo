/**
 * AddQuestionInput Component
 *
 * Inline input for adding questions. Expands from a button into a text field.
 * Validates max 15 words.
 *
 * @module b/profile-v3/components/questions
 */

'use client'

import * as React from 'react'
import { useState, useCallback, useRef, useEffect, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import Add01Icon from '@hugeicons-pro/core-stroke-rounded/Add01Icon'
import Tick02Icon from '@hugeicons-pro/core-stroke-rounded/Tick02Icon'
import Cancel01Icon from '@hugeicons-pro/core-stroke-rounded/Cancel01Icon'
import type { ProfileQuestion, CategoryType } from '../../types'

// =============================================================================
// CONSTANTS
// =============================================================================

const MAX_WORDS = 15

// =============================================================================
// TYPES
// =============================================================================

export interface AddQuestionInputProps {
  onAdd: (question: ProfileQuestion) => void
  className?: string
}

// =============================================================================
// HELPERS
// =============================================================================

function countWords(text: string): number {
  const trimmed = text.trim()
  if (!trimmed) return 0
  return trimmed.split(/\s+/).length
}

// =============================================================================
// COMPONENT
// =============================================================================

export function AddQuestionInput({
  onAdd,
  className,
}: AddQuestionInputProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [text, setText] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const wordCount = useMemo(() => countWords(text), [text])
  const isOverLimit = wordCount > MAX_WORDS
  const isEmpty = text.trim().length === 0
  const canSubmit = !isEmpty && !isOverLimit

  // Focus input when entering edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  const handleStartEditing = useCallback(() => {
    setIsEditing(true)
  }, [])

  const handleCancel = useCallback(() => {
    setIsEditing(false)
    setText('')
  }, [])

  const handleSubmit = useCallback(() => {
    if (!canSubmit) return

    const question: ProfileQuestion = {
      id: `q-${Date.now()}`,
      text: text.trim(),
      linkedCategory: 'growth' as CategoryType, // Default category
    }

    onAdd(question)
    setIsEditing(false)
    setText('')
  }, [canSubmit, text, onAdd])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && canSubmit) {
        e.preventDefault()
        handleSubmit()
      } else if (e.key === 'Escape') {
        handleCancel()
      }
    },
    [canSubmit, handleSubmit, handleCancel]
  )

  // Collapsed state - show button
  if (!isEditing) {
    return (
      <button
        type="button"
        onClick={handleStartEditing}
        className={cn(
          'flex items-center gap-2',
          'px-5 py-4',
          'bg-tertiary/30 hover:bg-tertiary/50',
          'rounded-2xl corner-squircle',
          'border border-dashed border-secondary',
          'text-sm font-medium text-tertiary',
          'motion-safe:transition-all motion-safe:duration-200',
          'motion-reduce:transition-none',
          'hover:-translate-y-0.5',
          'active:scale-[0.99] active:translate-y-0',
          'focus:outline-none',
          className
        )}
      >
        <HugeIcon icon={Add01Icon} size={16} strokeWidth={2} />
        <span>Add question</span>
      </button>
    )
  }

  // Expanded state - show input
  return (
    <div
      className={cn(
        'flex items-center gap-2',
        'bg-primary',
        'rounded-2xl corner-squircle',
        'px-4 py-3',
        'shine-1-subtle',
        // Override parent's *:opacity-50 when editing
        '!opacity-100',
        isOverLimit && 'ring-2 ring-error',
        className
      )}
    >
      {/* Auto-expanding input using grid trick */}
      <div
        className="inline-grid min-w-[160px]"
        style={{
          gridTemplateColumns: '1fr',
        }}
      >
        {/* Hidden sizer element */}
        <span
          className="invisible whitespace-pre col-start-1 row-start-1 text-sm font-medium"
          aria-hidden="true"
        >
          {text || 'Type your question...'}
        </span>
        {/* Actual input */}
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your question..."
          className={cn(
            'col-start-1 row-start-1 w-full',
            'bg-transparent',
            'text-sm font-medium text-primary placeholder:text-quaternary',
            'focus:outline-none'
          )}
        />
      </div>

      {/* Word count indicator */}
      <span
        className={cn(
          'text-xs tabular-nums shrink-0',
          isOverLimit ? 'text-error' : 'text-quaternary'
        )}
      >
        {wordCount}/{MAX_WORDS}
      </span>

      {/* Action buttons */}
      <div className="flex items-center gap-1 shrink-0">
        <button
          type="button"
          onClick={handleCancel}
          className={cn(
            'flex items-center justify-center',
            'w-7 h-7',
            'rounded-lg corner-squircle',
            'text-tertiary hover:text-primary',
            'hover:bg-tertiary/50',
            'transition-colors duration-150',
            'motion-reduce:transition-none',
            'focus:outline-none'
          )}
        >
          <HugeIcon icon={Cancel01Icon} size={16} strokeWidth={2} />
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit}
          className={cn(
            'flex items-center justify-center',
            'w-7 h-7',
            'rounded-lg corner-squircle',
            'text-brand-solid hover:text-brand-solid-hover',
            'hover:bg-brand-primary/10',
            'transition-colors duration-150',
            'motion-reduce:transition-none',
            'focus:outline-none',
            'disabled:opacity-30 disabled:pointer-events-none'
          )}
        >
          <HugeIcon icon={Tick02Icon} size={16} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  )
}
