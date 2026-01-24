/**
 * Question Flow Module
 *
 * Reusable question flow components for embedding in different pages.
 *
 * @example
 * // Single question
 * import { QuestionFlowCard } from '@/app/playground/question-command-menu-v4-flow'
 * <QuestionFlowCard onUpdate={handleUpdate} />
 *
 * @example
 * // Multiple questions
 * import { QuestionsList } from '@/app/playground/question-command-menu-v4-flow'
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
