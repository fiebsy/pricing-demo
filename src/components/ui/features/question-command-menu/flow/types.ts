/**
 * Question Flow Types
 *
 * Shared types for the question command menu flow system.
 */

import type { ChatMessage } from '../types'

// Re-export for convenience
export type { ChatMessage }

/**
 * Layout configuration for question flow components
 */
export interface QuestionFlowLayout {
  /** Width of the trigger when collapsed */
  triggerWidth?: number
  /** Width of the expanded panel */
  panelWidth?: number
}

/**
 * Individual question in a multi-question list
 */
export interface Question {
  id: string
  text: string
  response: string | null
  confidence: number | null
  status: 'idle' | 'adding' | 'processing' | 'response' | 'editing'
}

/**
 * Props for rendering a single question flow
 */
export interface QuestionFlowCardProps {
  /** Initial question data (for hydrating existing questions) */
  question?: Question
  /** Layout configuration */
  layout?: QuestionFlowLayout
  /** Callback when question state changes */
  onUpdate?: (question: Question) => void
  /** Callback when question is deleted */
  onDelete?: () => void
  /** Whether this card is currently active/selected */
  isActive?: boolean
  /** Optional className for the wrapper */
  className?: string
}

/**
 * Props for the questions list component
 */
export interface QuestionsListProps {
  /** Number of question slots (default: 5) */
  questionCount?: number
  /** Initial questions to populate (will fill remaining slots with empty) */
  initialQuestions?: Partial<Question>[]
  /** Layout configuration passed to each card */
  layout?: QuestionFlowLayout
  /** Callback when questions change */
  onChange?: (questions: Question[]) => void
  /** Optional className */
  className?: string
}

/**
 * Return type for useQuestionFlow hook
 */
export interface UseQuestionFlowReturn {
  chatMessages: ChatMessage[]
  isChatTyping: boolean
  handleChatSend: (message: string) => void
  handleDelete: () => void
  resetFlow: () => void
}
