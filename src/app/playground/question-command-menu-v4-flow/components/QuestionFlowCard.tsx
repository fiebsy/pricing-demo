/**
 * QuestionFlowCard
 *
 * A reusable, self-contained question flow component.
 * Wraps V4Provider and Preview with built-in state management.
 */

'use client'

import { useMemo } from 'react'
import { cn } from '@/lib/utils'

import { V4Provider, useV4Context } from '../../archived/question-command-menu-v4/state'
import { Preview } from '../../archived/question-command-menu-v4/components'
import { useQuestionFlow } from '../hooks'
import { FLOW_DEFAULT_CONFIG } from '../default-config'
import { QUESTION_FLOW_CONFIG } from '../flow-config'
import type { Question, QuestionFlowCardProps } from '../types'

// ============================================================================
// INNER CONTENT (inside V4Provider)
// ============================================================================

interface CardContentProps {
  question?: Question
  onUpdate?: (question: Question) => void
  onDelete?: () => void
}

function CardContent({ question, onUpdate, onDelete }: CardContentProps) {
  const { config } = useV4Context()

  const { chatMessages, isChatTyping, handleChatSend, handleDelete } = useQuestionFlow({
    initialQuestion: question,
    onUpdate: (partial) => {
      if (question && onUpdate) {
        onUpdate({ ...question, ...partial })
      }
    },
    onDelete,
  })

  return (
    <Preview
      config={config}
      questionGroups={[]}
      chatMessages={chatMessages}
      isChatTyping={isChatTyping}
      onChatSend={handleChatSend}
      onDelete={handleDelete}
      skipProvider
    />
  )
}

// ============================================================================
// QUESTION FLOW CARD
// ============================================================================

// Default layout values
const DEFAULT_TRIGGER_WIDTH = 360
const DEFAULT_PANEL_WIDTH = 480

export function QuestionFlowCard({
  question,
  layout,
  onUpdate,
  onDelete,
  isActive = true,
  className,
}: QuestionFlowCardProps) {
  // Check if this is an empty "add question" state
  const isAddMode = !question?.text && !question?.response

  // Extract layout values with defaults
  const triggerWidth = layout?.triggerWidth ?? DEFAULT_TRIGGER_WIDTH
  const panelWidth = layout?.panelWidth ?? DEFAULT_PANEL_WIDTH

  // Merge flow config into base config
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
        // Use primary background for collapsed "add question" state
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
        <CardContent question={question} onUpdate={onUpdate} onDelete={onDelete} />
      </V4Provider>
    </div>
  )
}
