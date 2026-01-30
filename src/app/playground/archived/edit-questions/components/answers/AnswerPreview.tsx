/**
 * AnswerPreview - Chat-style question/answer display
 *
 * Shows the question and answer in connected chat bubbles (iOS reply style):
 * - Question: Faded, smaller text in rounded container with connecting line
 * - Answer: Prominent bubble below with confidence badge
 *
 * States:
 * - Idle: No question selected
 * - Loading: Question shown, answer skeleton
 * - Success/Orphaned: Full Q&A display with actions
 *
 * @module playground/edit-questions/components
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import { Badge } from '@/components/ui/core/primitives/badge'
import RefreshIcon from '@hugeicons-pro/core-stroke-rounded/RefreshIcon'
import Edit01Icon from '@hugeicons-pro/core-stroke-rounded/Edit01Icon'
import AlertCircleIcon from '@hugeicons-pro/core-stroke-rounded/AlertCircleIcon'
import Tick01Icon from '@hugeicons-pro/core-stroke-rounded/Tick01Icon'
import type { Answer, AnswerState } from '../../types'

// =============================================================================
// TYPES
// =============================================================================

export interface AnswerPreviewProps {
  state: AnswerState
  questionText?: string
  answer?: Answer
  onRegenerate?: () => void
  onImprove?: () => void
  className?: string
}

// =============================================================================
// QUESTION BUBBLE (right-aligned, faded)
// =============================================================================

interface QuestionBubbleProps {
  text: string
}

function QuestionBubble({ text }: QuestionBubbleProps) {
  return (
    <div className="flex justify-end">
      <div
        className={cn(
          'max-w-[75%]',
          'px-3 py-2 rounded-2xl rounded-tr-md',
          'bg-tertiary/20 border border-tertiary/30',
          'text-xs text-tertiary leading-relaxed'
        )}
      >
        {text}
      </div>
    </div>
  )
}

// =============================================================================
// ANSWER BUBBLE (left-aligned)
// =============================================================================

interface AnswerBubbleProps {
  text: string
  confidence?: number
  isOrphaned: boolean
  isLoading?: boolean
  onRegenerate?: () => void
}

function AnswerBubble({ text, confidence, isOrphaned, isLoading, onRegenerate }: AnswerBubbleProps) {
  const getBadgeColor = () => {
    if (isOrphaned) return 'warning'
    if (confidence && confidence >= 0.8) return 'success'
    if (confidence && confidence >= 0.5) return 'warning'
    return 'error'
  }

  const getBadgeLabel = () => {
    if (isOrphaned) return 'Needs revision'
    if (confidence) return `${Math.round(confidence * 100)}% confidence`
    return ''
  }

  return (
    <div className="flex items-center gap-2 mt-3">
      {/* Answer bubble */}
      <div
        className={cn(
          'max-w-[75%]',
          'px-4 py-3 rounded-2xl rounded-tl-md',
          'border',
          isLoading && 'animate-pulse',
          isOrphaned
            ? 'bg-warning-primary/5 border-warning-primary/20'
            : 'bg-brand-primary/5 border-brand-primary/20'
        )}
      >
        {isLoading ? (
          <div className="space-y-2 min-w-[200px]">
            <div className="h-3 bg-tertiary/30 rounded w-full" />
            <div className="h-3 bg-tertiary/30 rounded w-5/6" />
            <div className="h-3 bg-tertiary/30 rounded w-4/6" />
          </div>
        ) : (
          <div className="space-y-2">
            <p
              className={cn(
                'text-sm leading-relaxed',
                isOrphaned ? 'text-tertiary italic' : 'text-secondary'
              )}
            >
              {text}
            </p>
            {/* Confidence badge inside bubble */}
            {confidence !== undefined && (
              <Badge
                size="xs"
                shape="squircle"
                color={getBadgeColor()}
                iconLeading={isOrphaned ? <HugeIcon icon={AlertCircleIcon} size={12} color="current" /> : <HugeIcon icon={Tick01Icon} size={12} color="current" />}
              >
                {getBadgeLabel()}
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Regenerate icon button - to the right of bubble */}
      {!isLoading && onRegenerate && (
        <button
          type="button"
          onClick={onRegenerate}
          className={cn(
            'shrink-0 p-2 rounded-lg',
            'text-tertiary hover:text-primary',
            'hover:bg-secondary',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary',
            'motion-safe:transition-all motion-safe:duration-150'
          )}
          title="Regenerate answer"
        >
          <HugeIcon icon={RefreshIcon} size="sm" color="current" />
        </button>
      )}
    </div>
  )
}

// =============================================================================
// IDLE STATE
// =============================================================================

function IdleState() {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <div className="size-12 rounded-full bg-tertiary/20 flex items-center justify-center mb-3">
        <HugeIcon icon={Edit01Icon} size="md" color="tertiary" />
      </div>
      <h3 className="text-base font-medium text-secondary mb-1">Select a question</h3>
      <p className="text-sm text-tertiary max-w-xs">
        Choose a question from the list below to view or edit its answer.
      </p>
    </div>
  )
}

// =============================================================================
// CHAT DISPLAY (question + answer bubbles)
// =============================================================================

interface ChatDisplayProps {
  questionText: string
  answer: Answer
  isOrphaned: boolean
  onRegenerate?: () => void
  onImprove?: () => void
}

function ChatDisplay({
  questionText,
  answer,
  isOrphaned,
  onRegenerate,
  onImprove,
}: ChatDisplayProps) {
  return (
    <div className="space-y-3">
      {/* Question bubble - right */}
      <QuestionBubble text={questionText} />

      {/* Answer bubble - left, with confidence badge inside and regenerate icon to the right */}
      <AnswerBubble
        text={answer.text}
        confidence={answer.confidence}
        isOrphaned={isOrphaned}
        onRegenerate={onRegenerate}
      />

      {/* Actions - left aligned below answer */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onImprove}
          className={cn(
            'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg',
            'text-xs font-medium text-white',
            isOrphaned
              ? 'bg-warning-primary hover:bg-warning-primary/90'
              : 'bg-brand-solid hover:bg-brand-solid-hover',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary',
            'motion-safe:transition-all motion-safe:duration-150'
          )}
        >
          <HugeIcon icon={Edit01Icon} size={14} color="current" />
          <span>Improve answer</span>
        </button>
      </div>
    </div>
  )
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function AnswerPreview({
  state,
  questionText,
  answer,
  onRegenerate,
  onImprove,
  className,
}: AnswerPreviewProps) {
  return (
    <div className={cn('p-4', className)}>
      {state === 'idle' && <IdleState />}

      {state === 'loading' && questionText && (
        <div>
          <QuestionBubble text={questionText} />
          <AnswerBubble text="" isOrphaned={false} isLoading />
        </div>
      )}

      {state === 'success' && questionText && answer && (
        <ChatDisplay
          questionText={questionText}
          answer={answer}
          isOrphaned={false}
          onRegenerate={onRegenerate}
          onImprove={onImprove}
        />
      )}

      {state === 'orphaned' && questionText && answer && (
        <ChatDisplay
          questionText={questionText}
          answer={answer}
          isOrphaned={true}
          onRegenerate={onRegenerate}
          onImprove={onImprove}
        />
      )}
    </div>
  )
}
