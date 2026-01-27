/**
 * Question Flow Module
 *
 * Reusable question flow components for embedding in different pages.
 *
 * @example
 * // Single question
 * import { QuestionFlowCard } from '@/components/ui/features/question-command-menu/flow'
 * <QuestionFlowCard onUpdate={handleUpdate} />
 *
 * @example
 * // Multiple questions
 * import { QuestionsList } from '@/components/ui/features/question-command-menu/flow'
 * <QuestionsList maxQuestions={5} onChange={setQuestions} />
 */

// Components
export { QuestionFlowCard, QuestionsList } from './components'

// Hooks
export { useQuestionFlow } from './hooks'

// Config
export { QUESTION_FLOW_CONFIG } from './flow-config'
export { FLOW_DEFAULT_CONFIG } from './default-config'

// Types
export type {
  Question,
  QuestionFlowCardProps,
  QuestionsListProps,
  QuestionFlowLayout,
  UseQuestionFlowReturn,
  ChatMessage,
} from './types'
