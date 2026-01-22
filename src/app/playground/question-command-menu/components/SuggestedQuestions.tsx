/**
 * SuggestedQuestions - V3-style dropdown for Add mode
 *
 * Shows filtered question suggestions based on input query.
 * Uses V3 styling patterns with dynamic height and overflow gradients.
 * Designed to work within BiaxialExpandV4.BottomSlot.
 *
 * @module playground/question-command-menu/components
 */

'use client'

import * as React from 'react'
import { useMemo } from 'react'
import { ScrollArea } from '@base-ui/react/scroll-area'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import Add01Icon from '@hugeicons-pro/core-stroke-rounded/Add01Icon'
import AiIdeaIcon from '@hugeicons-pro/core-stroke-rounded/AiIdeaIcon'

import {
  OVERFLOW_GRADIENT_HEIGHT,
  getTopGradientStyles,
  getBottomGradientStyles,
} from '../_utils/layout'

// =============================================================================
// TYPES
// =============================================================================

export interface QuestionSuggestion {
  id: string
  text: string
}

export interface SuggestedQuestionsProps {
  /** Current input query for filtering */
  query: string
  /** List of question suggestions */
  suggestions: QuestionSuggestion[]
  /** Called when a suggestion is selected */
  onSelect?: (suggestion: QuestionSuggestion) => void
  /** Called when user wants to add the custom query as a question */
  onAddCustom?: () => void
  /** Additional className */
  className?: string
}

// =============================================================================
// SUGGESTION ROW COMPONENT
// =============================================================================

interface SuggestionRowProps {
  suggestion: QuestionSuggestion
  isHighlighted?: boolean
  onClick?: () => void
}

function SuggestionRow({ suggestion, isHighlighted, onClick }: SuggestionRowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl',
        'text-left',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary',
        'motion-safe:transition-all motion-safe:duration-150',
        isHighlighted
          ? 'bg-brand-primary/10 text-primary'
          : 'hover:bg-secondary text-secondary hover:text-primary'
      )}
    >
      {/* Lightbulb icon */}
      <div className="shrink-0">
        <HugeIcon icon={AiIdeaIcon} size="sm" className="text-brand-primary" />
      </div>

      {/* Suggestion text */}
      <span className="flex-1 text-sm truncate">{suggestion.text}</span>
    </button>
  )
}

// =============================================================================
// ADD CUSTOM ROW
// =============================================================================

interface AddCustomRowProps {
  query: string
  onClick?: () => void
}

function AddCustomRow({ query, onClick }: AddCustomRowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl',
        'text-left',
        'border border-dashed border-brand-primary/30',
        'bg-brand-primary/5',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary',
        'motion-safe:transition-all motion-safe:duration-150',
        'hover:bg-brand-primary/10 text-secondary hover:text-primary'
      )}
    >
      {/* Add icon */}
      <div className="shrink-0">
        <HugeIcon icon={Add01Icon} size="sm" className="text-brand-primary" />
      </div>

      {/* Query text */}
      <div className="flex-1 min-w-0">
        <span className="text-sm truncate block">
          Add &quot;{query}&quot;
        </span>
        <span className="text-xs text-tertiary">as a new question</span>
      </div>
    </button>
  )
}

// =============================================================================
// EMPTY STATE
// =============================================================================

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center px-4">
      <div className="size-10 rounded-full bg-tertiary/20 flex items-center justify-center mb-2">
        <HugeIcon icon={AiIdeaIcon} size="sm" color="tertiary" />
      </div>
      <h3 className="text-sm font-medium text-secondary mb-0.5">No suggestions</h3>
      <p className="text-xs text-tertiary max-w-[200px]">
        Type a question or select from the list
      </p>
    </div>
  )
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function SuggestedQuestions({
  query,
  suggestions,
  onSelect,
  onAddCustom,
  className,
}: SuggestedQuestionsProps) {
  // Filter suggestions based on query
  const filteredSuggestions = useMemo(() => {
    if (!query.trim()) return suggestions

    const normalizedQuery = query.toLowerCase().trim()
    return suggestions.filter((s) =>
      s.text.toLowerCase().includes(normalizedQuery)
    )
  }, [suggestions, query])

  const hasQuery = query.trim().length > 0
  const showAddCustom = hasQuery && onAddCustom
  const isEmpty = filteredSuggestions.length === 0 && !showAddCustom

  if (isEmpty) {
    return (
      <div className={cn('', className)}>
        <EmptyState />
      </div>
    )
  }

  return (
    <div className={cn('h-full flex flex-col', className)}>
      <ScrollArea.Root className="flex-1 relative">
        <ScrollArea.Viewport className="h-full">
          <ScrollArea.Content>
            <div className="p-2 space-y-1">
              {/* Add custom query option */}
              {showAddCustom && (
                <AddCustomRow query={query} onClick={onAddCustom} />
              )}

              {/* Separator if both custom and suggestions */}
              {showAddCustom && filteredSuggestions.length > 0 && (
                <div className="h-px bg-primary my-2" />
              )}

              {/* Suggestions list */}
              {filteredSuggestions.map((suggestion) => (
                <SuggestionRow
                  key={suggestion.id}
                  suggestion={suggestion}
                  onClick={() => onSelect?.(suggestion)}
                />
              ))}
            </div>
          </ScrollArea.Content>
        </ScrollArea.Viewport>

        {/* Custom Scrollbar */}
        <ScrollArea.Scrollbar
          orientation="vertical"
          className={cn(
            'absolute top-1 right-1 bottom-1 flex w-1.5 touch-none select-none p-0.5',
            'opacity-0 transition-opacity duration-150',
            'data-[hovering]:opacity-100 data-[scrolling]:opacity-100'
          )}
        >
          <ScrollArea.Thumb className="bg-fg-quaternary hover:bg-fg-quaternary_hover relative flex-1 rounded-full" />
        </ScrollArea.Scrollbar>

        {/* Overflow Gradients */}
        <div
          className="pointer-events-none absolute transition-opacity duration-150"
          style={getTopGradientStyles(OVERFLOW_GRADIENT_HEIGHT)}
        />
        <div
          className="pointer-events-none absolute transition-opacity duration-150"
          style={getBottomGradientStyles(OVERFLOW_GRADIENT_HEIGHT)}
        />
      </ScrollArea.Root>
    </div>
  )
}
