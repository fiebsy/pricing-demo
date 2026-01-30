/**
 * ChatPreview - Chat-style Q&A display for top slot
 *
 * Shows question and answer in connected chat bubbles.
 * Display-only component - actions are in ActionBar.
 * Designed to work within BiaxialExpandV4.TopSlot.
 *
 * @module playground/question-command-menu/components
 */

'use client'

import * as React from 'react'
import { ScrollArea } from '@base-ui/react/scroll-area'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import { Badge } from '@/components/ui/core/primitives/badge'
import AlertCircleIcon from '@hugeicons-pro/core-stroke-rounded/AlertCircleIcon'
import Tick01Icon from '@hugeicons-pro/core-stroke-rounded/Tick01Icon'
import Edit01Icon from '@hugeicons-pro/core-stroke-rounded/Edit01Icon'

import type { Answer, AnswerState } from '../types'
import {
  OVERFLOW_GRADIENT_HEIGHT,
  getTopGradientStyles,
  getBottomGradientStyles,
} from '../_utils/layout'

// =============================================================================
// TYPES
// =============================================================================

export interface ChatPreviewProps {
  /** Current state of the answer */
  state: AnswerState
  /** The question text */
  questionText?: string
  /** The answer object */
  answer?: Answer
  /** Additional className */
  className?: string
}

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

interface QuestionBubbleProps {
  text: string
}

function QuestionBubble({ text }: QuestionBubbleProps) {
  return (
    <div className="flex justify-end">
      <div
        className={cn(
          'max-w-[85%]',
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

interface AnswerBubbleProps {
  text: string
  confidence?: number
  isOrphaned: boolean
  isLoading?: boolean
}

function AnswerBubble({
  text,
  confidence,
  isOrphaned,
  isLoading,
}: AnswerBubbleProps) {
  const getBadgeColor = () => {
    if (isOrphaned) return 'warning'
    if (confidence && confidence >= 0.8) return 'success'
    if (confidence && confidence >= 0.5) return 'warning'
    return 'error'
  }

  const getBadgeLabel = () => {
    if (isOrphaned) return 'Needs revision'
    if (confidence) return `${Math.round(confidence * 100)}%`
    return ''
  }

  return (
    <div className="flex items-start gap-2 mt-2">
      <div
        className={cn(
          'flex-1 max-w-[85%]',
          'px-3 py-2 rounded-2xl rounded-tl-md',
          'border',
          isLoading && 'animate-pulse',
          isOrphaned
            ? 'bg-warning-primary/5 border-warning-primary/20'
            : 'bg-brand-primary/5 border-brand-primary/20'
        )}
      >
        {isLoading ? (
          <div className="space-y-1.5 min-w-[160px]">
            <div className="h-2.5 bg-tertiary/30 rounded w-full" />
            <div className="h-2.5 bg-tertiary/30 rounded w-5/6" />
            <div className="h-2.5 bg-tertiary/30 rounded w-4/6" />
          </div>
        ) : (
          <div className="space-y-1.5">
            <p
              className={cn(
                'text-xs leading-relaxed',
                isOrphaned ? 'text-tertiary italic' : 'text-secondary'
              )}
            >
              {text}
            </p>
            {confidence !== undefined && (
              <Badge
                size="xs"
                shape="squircle"
                color={getBadgeColor()}
                iconLeading={
                  <HugeIcon
                    icon={isOrphaned ? AlertCircleIcon : Tick01Icon}
                    size={10}
                    color="current"
                  />
                }
              >
                {getBadgeLabel()}
              </Badge>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function IdleState() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4">
      <div className="size-10 rounded-full bg-tertiary/20 flex items-center justify-center mb-2">
        <HugeIcon icon={Edit01Icon} size="sm" color="tertiary" />
      </div>
      <h3 className="text-sm font-medium text-secondary mb-0.5">Select a question</h3>
      <p className="text-xs text-tertiary max-w-[200px]">
        Choose from the list below to view its answer
      </p>
    </div>
  )
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function ChatPreview({
  state,
  questionText,
  answer,
  className,
}: ChatPreviewProps) {
  const isOrphaned = state === 'orphaned'

  return (
    <div className={cn('h-full flex flex-col', className)}>
      <ScrollArea.Root className="flex-1 relative">
        <ScrollArea.Viewport className="h-full">
          <ScrollArea.Content>
            <div className="p-3">
              {state === 'idle' && <IdleState />}

              {state === 'loading' && questionText && (
                <div>
                  <QuestionBubble text={questionText} />
                  <AnswerBubble text="" isOrphaned={false} isLoading />
                </div>
              )}

              {(state === 'success' || state === 'orphaned') &&
                questionText &&
                answer && (
                  <div className="space-y-2">
                    <QuestionBubble text={questionText} />
                    <AnswerBubble
                      text={answer.text}
                      confidence={answer.confidence}
                      isOrphaned={isOrphaned}
                    />
                  </div>
                )}
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
