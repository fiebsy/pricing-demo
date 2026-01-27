/**
 * AddQuestionCommandMenu Component
 *
 * Command menu variant for adding new questions.
 * Uses the "adding" flow state to show input with Add button.
 *
 * @module b/profile-v3/components/questions
 */

'use client'

import * as React from 'react'
import { useCallback, useEffect, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { V4Provider, useV4Context, Preview } from '@/components/ui/features/question-command-menu'
import type { QuestionCommandMenuV4Config } from '@/components/ui/features/question-command-menu'
import { ADD_QUESTION_CONFIG, PROFILE_FLOW_CONFIG } from '../../config/question-command-config'
import type { ProfileQuestion, CategoryType } from '../../types'

// =============================================================================
// TYPES
// =============================================================================

export interface AddQuestionCommandMenuProps {
  isActive: boolean
  onActivate: () => void
  onDeactivate: () => void
  onAdd: (question: ProfileQuestion) => void
  className?: string
}

// =============================================================================
// INNER COMPONENT (uses context)
// =============================================================================

interface InnerAddMenuProps {
  isActive: boolean
  onActivate: () => void
  onDeactivate: () => void
  onAdd: (question: ProfileQuestion) => void
}

function InnerAddMenu({
  isActive,
  onActivate,
  onDeactivate,
  onAdd,
}: InnerAddMenuProps) {
  const {
    state,
    expand,
    collapse,
    startAdding,
    setInput,
  } = useV4Context()

  // Sync active state with provider
  useEffect(() => {
    if (isActive && !state.expanded) {
      expand()
      startAdding()
    } else if (!isActive && state.expanded) {
      collapse()
    }
  }, [isActive, state.expanded, expand, collapse, startAdding])

  // Handle question save (when user clicks Add or presses Enter)
  const handleQuestionSave = useCallback(
    (questionText: string) => {
      if (!questionText.trim()) return

      const newQuestion: ProfileQuestion = {
        id: `q-${Date.now()}`,
        text: questionText.trim(),
        linkedCategory: 'growth', // Default category
        aiResponse: null,
        aiConfidence: null,
      }

      onAdd(newQuestion)
      setInput('') // Clear input after adding
    },
    [onAdd, setInput]
  )

  // Handle chat send (maps to question save for add flow)
  const handleChatSend = useCallback(
    (message: string) => {
      handleQuestionSave(message)
    },
    [handleQuestionSave]
  )

  return (
    <Preview
      config={ADD_QUESTION_CONFIG}
      chatMessages={[]}
      isChatTyping={false}
      onChatSend={handleChatSend}
      onQuestionSave={handleQuestionSave}
      skipProvider
    />
  )
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function AddQuestionCommandMenu({
  isActive,
  onActivate,
  onDeactivate,
  onAdd,
  className,
}: AddQuestionCommandMenuProps) {
  // Config for add mode
  const config: QuestionCommandMenuV4Config = useMemo(
    () => ({
      ...ADD_QUESTION_CONFIG,
      flowConfigs: PROFILE_FLOW_CONFIG,
    }),
    []
  )

  // Handle click on collapsed trigger
  const handleClick = useCallback(() => {
    if (!isActive) {
      onActivate()
    }
  }, [isActive, onActivate])

  return (
    <div
      className={cn(
        'relative',
        'motion-safe:transition-all motion-safe:duration-200',
        'motion-reduce:transition-none',
        className
      )}
      onClick={!isActive ? handleClick : undefined}
    >
      <V4Provider
        config={config}
        initialMode="input"
      >
        <InnerAddMenu
          isActive={isActive}
          onActivate={onActivate}
          onDeactivate={onDeactivate}
          onAdd={onAdd}
        />
      </V4Provider>
    </div>
  )
}

AddQuestionCommandMenu.displayName = 'AddQuestionCommandMenu'
