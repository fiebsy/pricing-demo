'use client'

import { useMemo, useCallback, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import Add01Icon from '@hugeicons-pro/core-stroke-rounded/Add01Icon'

// V4 Command Menu imports
import type { ChatMessage, QuestionCommandMenuV4Config } from '@/app/playground/archived/question-command-menu-v4/types'
import { V4Provider, useV4Context } from '@/app/playground/archived/question-command-menu-v4/state'
import { Preview } from '@/app/playground/archived/question-command-menu-v4/components'
import { FLOW_DEFAULT_CONFIG } from '@/app/playground/question-command-menu-v4-flow/default-config'
import { QUESTION_FLOW_CONFIG } from '@/app/playground/question-command-menu-v4-flow/flow-config'

const MAX_QUESTIONS = 5

// Mock responses for questions
const MOCK_RESPONSES: Record<string, string> = {
  'How has your experience co-founding Pickaxe.it shaped your approach to design?':
    'Co-founding Pickaxe taught me that great design emerges from understanding real user problems. Building a product from scratch meant I had to balance aesthetic vision with technical constraints and business needs.',
  'What types of projects do you focus on as a design engineer at Payva?':
    'At Payva, I focus on building the design system and core UI components that power our payment platform. This includes creating reusable patterns for complex financial interfaces.',
  'How old are you?':
    'I prefer to keep some things private, but I can tell you that I have over a decade of experience in design and technology.',
  'What inspired you to transition from product management to design engineering?':
    'I realized that I was most energized when working at the intersection of design and code. Design engineering lets me combine both worlds.',
  'Hello':
    'Hello! Welcome to my mentorship profile. Feel free to ask me anything about design, engineering, career transitions, or building products.',
}

function getMockResponse(question: string): string {
  return MOCK_RESPONSES[question] || `This is a simulated AI response for: "${question}"`
}

interface QuestionsListProps {
  questions: string[]
  onChange: (questions: string[]) => void
}

/**
 * Pinned questions list with command menu v4 integration
 * - Max 5 questions
 * - Each question renders as a command menu in response state
 * - Full-width triggers
 */
export function QuestionsList({ questions, onChange }: QuestionsListProps) {
  const handleRemove = useCallback((index: number) => {
    const newQuestions = questions.filter((_, i) => i !== index)
    onChange(newQuestions)
  }, [questions, onChange])

  const handleAdd = useCallback(() => {
    if (questions.length < MAX_QUESTIONS) {
      onChange([...questions, ''])
    }
  }, [questions, onChange])

  const canAddMore = questions.length < MAX_QUESTIONS

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="ml-3.5 flex items-center gap-2">
        <span className="text-sm font-medium text-primary">
          Pinned Questions
        </span>
        <span className="text-xs text-quaternary">
          {questions.length}/{MAX_QUESTIONS}
        </span>
      </div>

      {/* Questions as command menus */}
      <div className="flex w-full flex-col gap-2">
        {questions.map((question, index) => (
          <QuestionCommandMenuItem
            key={index}
            question={question}
            index={index}
            onDelete={() => handleRemove(index)}
          />
        ))}

        {/* Add button - only show if under max */}
        {canAddMore && (
          <button
            type="button"
            onClick={handleAdd}
            className={cn(
              'flex w-fit cursor-pointer items-center gap-2',
              'rounded-xl bg-tertiary px-3 py-2.5',
              'text-sm text-tertiary',
              'hover:bg-quaternary',
              'transition-colors'
            )}
          >
            <HugeIcon icon={Add01Icon} size="sm" color="current" />
            Add question
          </button>
        )}

        {/* At max capacity message */}
        {!canAddMore && (
          <p className="ml-3.5 text-xs text-quaternary">
            Delete a question to add a new one
          </p>
        )}
      </div>
    </div>
  )
}

// =============================================================================
// QUESTION COMMAND MENU ITEM
// =============================================================================

interface QuestionCommandMenuItemProps {
  question: string
  index: number
  onDelete: () => void
}

function QuestionCommandMenuItem({
  question,
  index,
  onDelete,
}: QuestionCommandMenuItemProps) {
  // Determine if this is an "add question" state (no question yet)
  const isAddMode = !question

  // Create config - trigger and panel at same width
  const config: QuestionCommandMenuV4Config = useMemo(
    () => ({
      ...FLOW_DEFAULT_CONFIG,
      flowConfigs: QUESTION_FLOW_CONFIG,
      layout: {
        ...FLOW_DEFAULT_CONFIG.layout,
        triggerWidth: 560,
        panelWidth: 560,
      },
      appearance: {
        ...FLOW_DEFAULT_CONFIG.appearance,
        // Use primary background for collapsed "add question" state
        collapsedBackground: isAddMode ? 'primary' : undefined,
      },
      triggerDisplay: {
        ...FLOW_DEFAULT_CONFIG.triggerDisplay,
        placeholderText: question || 'Enter your question...',
        addPlaceholderText: question || 'Enter your question...',
      },
    }),
    [question, isAddMode]
  )

  return (
    <div className="w-full">
      <V4Provider config={config}>
        <InnerQuestionMenuItem
          question={question}
          index={index}
          onDelete={onDelete}
        />
      </V4Provider>
    </div>
  )
}

// =============================================================================
// INNER COMPONENT (uses V4 context)
// =============================================================================

interface InnerQuestionMenuItemProps {
  question: string
  index: number
  onDelete: () => void
}

function InnerQuestionMenuItem({
  question,
  index,
  onDelete,
}: InnerQuestionMenuItemProps) {
  const {
    config,
    flowStateId,
    setInput,
    submitQuestion,
    receiveResponse,
    deleteQuestion,
  } = useV4Context()

  const hasInitialized = useRef(false)

  // Initialize to response state if question exists
  useEffect(() => {
    if (!hasInitialized.current && question) {
      hasInitialized.current = true

      // Set the input value to the question
      setInput(question)

      // Transition through states to reach "response"
      submitQuestion(0.85)

      // Immediately receive the response
      setTimeout(() => {
        receiveResponse(getMockResponse(question))
      }, 0)
    }
  }, [question, setInput, submitQuestion, receiveResponse])

  // Build chat messages from stored data
  const chatMessages: ChatMessage[] = useMemo(() => {
    // Only show messages once we're past processing
    if (flowStateId === 'idle' || flowStateId === 'adding' || !question) {
      return []
    }

    return [
      {
        id: `user-${index}`,
        role: 'user' as const,
        content: question,
      },
      {
        id: `assistant-${index}`,
        role: 'assistant' as const,
        content: getMockResponse(question),
        confidence: 0.85,
      },
    ]
  }, [question, index, flowStateId])

  // Handle delete
  const handleDelete = useCallback(() => {
    deleteQuestion()
    onDelete()
  }, [deleteQuestion, onDelete])

  // Handle chat send (for "Improve answer" flow)
  const handleChatSend = useCallback((message: string) => {
    console.log('[QuestionsList] Follow-up:', message)
  }, [])

  return (
    <div className="w-full">
      <Preview
        config={config}
        questionGroups={[]}
        chatMessages={chatMessages}
        isChatTyping={flowStateId === 'processing'}
        onChatSend={handleChatSend}
        onDelete={handleDelete}
        skipProvider
      />
    </div>
  )
}
