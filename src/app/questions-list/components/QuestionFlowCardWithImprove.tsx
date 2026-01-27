/**
 * QuestionFlowCardWithImprove
 *
 * Enhanced version of QuestionFlowCard that supports the improve flow.
 * Intercepts "Improve answer" button clicks and calls the onImproveAnswer callback.
 */

'use client'

import { useMemo, useCallback } from 'react'
import { cn } from '@/lib/utils'

import { V4Provider, useV4Context } from '@/components/ui/features/expandable-input'
import { PreviewWithImprove } from './PreviewWithImprove'
import { useQuestionFlowWithImprove } from '../hooks/useQuestionFlowWithImprove'
import { FLOW_DEFAULT_CONFIG } from '../../playground/question-command-menu-v4-flow/default-config'
import { QUESTION_FLOW_CONFIG } from '../../playground/question-command-menu-v4-flow/flow-config'
import type { Question, QuestionFlowLayout } from '../../playground/question-command-menu-v4-flow/types'

// ============================================================================
// TYPES
// ============================================================================

export interface QuestionFlowCardWithImproveProps {
  /** Initial question data */
  question?: Question
  /** Layout configuration */
  layout?: QuestionFlowLayout
  /** Callback when question state changes */
  onUpdate?: (question: Question) => void
  /** Callback when question is deleted */
  onDelete?: () => void
  /** Callback when "Improve answer" is clicked */
  onImproveAnswer?: () => void
  /** Register the regenerate function */
  onRegisterRegenerate?: (fn: () => void) => void
  /** Whether this question is currently regenerating */
  isRegenerating?: boolean
  /** Whether this card is currently active/selected */
  isActive?: boolean
  /** Optional className for the wrapper */
  className?: string
  /** Lock state - keeps menu expanded */
  isLocked?: boolean
  /** Called when lock state changes */
  onLockedChange?: (locked: boolean) => void
}

// ============================================================================
// INNER CONTENT (inside V4Provider)
// ============================================================================

interface CardContentProps {
  question?: Question
  onUpdate?: (question: Question) => void
  onDelete?: () => void
  onImproveAnswer?: () => void
  onRegisterRegenerate?: (fn: () => void) => void
  isRegenerating?: boolean
  isLocked?: boolean
  onLockedChange?: (locked: boolean) => void
}

function CardContent({
  question,
  onUpdate,
  onDelete,
  onImproveAnswer,
  onRegisterRegenerate,
  isRegenerating = false,
  isLocked,
  onLockedChange,
}: CardContentProps) {
  const { config } = useV4Context()

  const {
    chatMessages,
    isChatTyping,
    handleChatSend,
    handleDelete,
    regenerateResponse,
  } = useQuestionFlowWithImprove({
    initialQuestion: question,
    onUpdate: (partial) => {
      if (question && onUpdate) {
        onUpdate({ ...question, ...partial })
      }
    },
    onDelete,
    onRegisterRegenerate,
  })

  // Handle button selection - intercept "Improve answer" (btn1)
  const handleButtonSelect = useCallback(
    (buttonId: string) => {
      if (buttonId === 'btn1' && onImproveAnswer) {
        onImproveAnswer()
      }
    },
    [onImproveAnswer]
  )

  return (
    <PreviewWithImprove
      config={config}
      questionGroups={[]}
      chatMessages={chatMessages}
      isChatTyping={isChatTyping}
      onChatSend={handleChatSend}
      onDelete={handleDelete}
      onButtonSelect={handleButtonSelect}
      isRegenerating={isRegenerating}
      isLocked={isLocked}
      onLockedChange={onLockedChange}
      skipProvider
    />
  )
}

// ============================================================================
// QUESTION FLOW CARD WITH IMPROVE
// ============================================================================

const DEFAULT_TRIGGER_WIDTH = 360
const DEFAULT_PANEL_WIDTH = 480

export function QuestionFlowCardWithImprove({
  question,
  layout,
  onUpdate,
  onDelete,
  onImproveAnswer,
  onRegisterRegenerate,
  isRegenerating = false,
  isActive = true,
  className,
  isLocked,
  onLockedChange,
}: QuestionFlowCardWithImproveProps) {
  const isAddMode = !question?.text && !question?.response

  const triggerWidth = layout?.triggerWidth ?? DEFAULT_TRIGGER_WIDTH
  const panelWidth = layout?.panelWidth ?? DEFAULT_PANEL_WIDTH

  const config = useMemo(
    () => ({
      ...FLOW_DEFAULT_CONFIG,
      flowConfigs: QUESTION_FLOW_CONFIG,
      layout: {
        ...FLOW_DEFAULT_CONFIG.layout,
        triggerWidth,
        panelWidth,
      },
      appearance: {
        ...FLOW_DEFAULT_CONFIG.appearance,
        collapsedBackground: isAddMode ? ('primary' as const) : undefined,
      },
    }),
    [isAddMode, triggerWidth, panelWidth]
  )

  return (
    <div
      className={cn(
        'transition-opacity duration-200',
        !isActive && 'opacity-60 pointer-events-none',
        className
      )}
    >
      <V4Provider config={config} key={question?.id}>
        <CardContent
          question={question}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onImproveAnswer={onImproveAnswer}
          onRegisterRegenerate={onRegisterRegenerate}
          isRegenerating={isRegenerating}
          isLocked={isLocked}
          onLockedChange={onLockedChange}
        />
      </V4Provider>
    </div>
  )
}
