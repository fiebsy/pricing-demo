/**
 * QuestionInput - Autocomplete input for adding questions
 *
 * Text input with dropdown suggestions that filter as user types.
 * Can also display the currently selected question text.
 *
 * Features:
 * - Maximum 5 questions limit with "Limit reached" state
 * - Duplicate detection
 * - Fuzzy search suggestions
 * - Shows selected question text when provided
 *
 * @module playground/edit-questions/components
 */

'use client'

import * as React from 'react'
import { useState, useCallback, useEffect } from 'react'
import { Autocomplete } from '@base-ui/react/autocomplete'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import Add01Icon from '@hugeicons-pro/core-stroke-rounded/Add01Icon'
import AlertCircleIcon from '@hugeicons-pro/core-stroke-rounded/AlertCircleIcon'

import type { Question } from '../types'
import { useSuggestions, isDuplicateQuestion } from '../services'

// =============================================================================
// CONSTANTS
// =============================================================================

const MAX_QUESTIONS = 5

// =============================================================================
// TYPES
// =============================================================================

export interface QuestionInputProps {
  onAddQuestion: (questionText: string) => void
  onUpdateQuestion?: (questionText: string) => void
  existingQuestions?: Question[]
  selectedQuestionText?: string
  maxQuestions?: number
  className?: string
  placeholder?: string
}

// =============================================================================
// COMPONENT
// =============================================================================

export function QuestionInput({
  onAddQuestion,
  onUpdateQuestion,
  existingQuestions = [],
  selectedQuestionText,
  maxQuestions = MAX_QUESTIONS,
  className,
  placeholder = 'Type a question...',
}: QuestionInputProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [localValue, setLocalValue] = useState('')
  const isEditingExisting = !!selectedQuestionText

  // Use suggestions service for search/filter (only for new questions)
  const {
    suggestions,
    allSuggestions,
    isEmpty,
  } = useSuggestions({
    existingQuestions,
    limit: 8,
    enableFuzzy: true,
  })

  // Initialize local value from selected question
  useEffect(() => {
    if (selectedQuestionText) {
      setLocalValue(selectedQuestionText)
    }
  }, [selectedQuestionText])

  // Check limits and duplicates
  const isAtLimit = existingQuestions.length >= maxQuestions && !isEditingExisting
  const isDuplicate = localValue.trim()
    ? isDuplicateQuestion(localValue.trim(), existingQuestions) && localValue.trim() !== selectedQuestionText
    : false

  // Get display suggestions (all when empty, filtered when typing)
  const displaySuggestions = isEmpty
    ? allSuggestions.map((text) => ({ text, score: 1, matchType: 'exact' as const }))
    : suggestions

  // Handle saving (add or update)
  const handleSave = useCallback(() => {
    const trimmed = localValue.trim()
    if (!trimmed || isDuplicate) return

    if (isEditingExisting && onUpdateQuestion) {
      onUpdateQuestion(trimmed)
    } else if (!isAtLimit) {
      onAddQuestion(trimmed)
      setLocalValue('')
    }
  }, [localValue, isDuplicate, isEditingExisting, isAtLimit, onAddQuestion, onUpdateQuestion])

  // Handle selecting a suggestion
  const handleSelectSuggestion = useCallback(
    (suggestion: string) => {
      if (isEditingExisting && onUpdateQuestion) {
        onUpdateQuestion(suggestion)
      } else if (!isAtLimit) {
        onAddQuestion(suggestion)
        setLocalValue('')
      }
      setIsOpen(false)
    },
    [isAtLimit, isEditingExisting, onAddQuestion, onUpdateQuestion]
  )

  // Handle key press
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' && localValue.trim() && !isOpen && !isDuplicate) {
        event.preventDefault()
        handleSave()
      }
      if (event.key === 'Escape') {
        // Reset to original value if editing existing
        if (selectedQuestionText) {
          setLocalValue(selectedQuestionText)
        }
      }
    },
    [localValue, isOpen, isDuplicate, handleSave, selectedQuestionText]
  )

  // Determine error message
  const errorMessage = isAtLimit
    ? `Maximum ${maxQuestions} questions reached`
    : isDuplicate
      ? 'This question already exists'
      : null

  const hasError = isAtLimit || isDuplicate
  const hasChanges = isEditingExisting && localValue.trim() !== selectedQuestionText

  return (
    <div className={cn('relative', className)}>
      <Autocomplete.Root
        value={localValue}
        onValueChange={(value: string) => setLocalValue(value)}
        open={isOpen && !isAtLimit}
        onOpenChange={(open) => setIsOpen(open && !isAtLimit)}
      >
        <div className="relative flex items-center gap-2">
          {/* Input */}
          <Autocomplete.Input
            placeholder={isAtLimit ? 'Question limit reached' : placeholder}
            onKeyDown={handleKeyDown}
            disabled={isAtLimit && !isEditingExisting}
            className={cn(
              'w-full px-4 py-3 rounded-xl',
              'bg-secondary border border-primary',
              'text-primary placeholder:text-tertiary',
              'focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent',
              'motion-safe:transition-all motion-safe:duration-150',
              'disabled:opacity-60 disabled:cursor-not-allowed',
              isEditingExisting && 'pr-24',
              !isEditingExisting && 'pr-20',
              hasError && 'border-error-primary focus:ring-error-primary'
            )}
          />

          {/* Save/Add button */}
          <button
            type="button"
            onClick={handleSave}
            disabled={!localValue.trim() || isDuplicate || (isAtLimit && !isEditingExisting) || (isEditingExisting && !hasChanges)}
            className={cn(
              'absolute right-2 px-3 py-1.5 rounded-lg',
              'inline-flex items-center gap-1.5',
              'text-xs font-medium',
              'motion-safe:transition-colors motion-safe:duration-150',
              isAtLimit && !isEditingExisting
                ? 'bg-error-primary/10 text-error-primary cursor-not-allowed'
                : 'bg-brand-solid text-white hover:bg-brand-solid-hover disabled:opacity-50 disabled:cursor-not-allowed'
            )}
          >
            {isAtLimit && !isEditingExisting ? (
              <span>Limit reached</span>
            ) : isEditingExisting ? (
              <span>Save</span>
            ) : (
              <>
                <HugeIcon icon={Add01Icon} size="xs" color="current" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="mt-1 text-xs text-error-primary flex items-center gap-1">
            <HugeIcon icon={AlertCircleIcon} size="xs" color="current" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Dropdown - only show for new questions */}
        {!isAtLimit && !isEditingExisting && (
          <Autocomplete.Portal>
            <Autocomplete.Positioner className="z-50" sideOffset={8}>
              <Autocomplete.Popup
                className={cn(
                  'w-[var(--anchor-width)] p-1 rounded-xl',
                  'bg-primary border border-primary shadow-lg',
                  'motion-safe:transition-all motion-safe:duration-150',
                  'data-[starting-style]:opacity-0 data-[starting-style]:scale-95',
                  'data-[ending-style]:opacity-0 data-[ending-style]:scale-95'
                )}
              >
                <Autocomplete.List className="max-h-64 overflow-y-auto">
                  {displaySuggestions.length > 0 ? (
                    displaySuggestions.map((suggestion) => (
                      <Autocomplete.Item
                        key={suggestion.text}
                        value={suggestion.text}
                        onClick={() => handleSelectSuggestion(suggestion.text)}
                        className={cn(
                          'px-3 py-2 rounded-lg cursor-pointer',
                          'text-sm text-secondary',
                          'hover:bg-secondary hover:text-primary',
                          'data-[highlighted]:bg-secondary data-[highlighted]:text-primary',
                          'motion-safe:transition-colors motion-safe:duration-100'
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <span>{suggestion.text}</span>
                          {!isEmpty && suggestion.matchType !== 'exact' && (
                            <span className="text-xs text-tertiary ml-2">
                              {suggestion.matchType}
                            </span>
                          )}
                        </div>
                      </Autocomplete.Item>
                    ))
                  ) : (
                    <div className="px-3 py-4 text-center text-sm text-tertiary">
                      {isDuplicate
                        ? 'This question already exists'
                        : 'No matching suggestions. Press Enter to add your question.'}
                    </div>
                  )}
                </Autocomplete.List>
              </Autocomplete.Popup>
            </Autocomplete.Positioner>
          </Autocomplete.Portal>
        )}
      </Autocomplete.Root>
    </div>
  )
}
