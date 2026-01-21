/**
 * Edit Questions Playground - Components
 *
 * Re-exports all components for the playground.
 *
 * @module playground/edit-questions/components
 */

// Core components
export { QuestionsList } from './QuestionsList'
export type { QuestionsListProps } from './QuestionsList'

export { QuestionInput } from './QuestionInput'
export type { QuestionInputProps } from './QuestionInput'

export { QuestionRow, QuestionInputRow, QuestionInputList } from './QuestionInputRow'
export type { QuestionRowProps, QuestionInputRowProps, QuestionInputListProps } from './QuestionInputRow'

export { AnswerPreview } from './AnswerPreview'
export type { AnswerPreviewProps } from './AnswerPreview'

export { ProcessingMeter, useSimulatedProgress } from './ProcessingMeter'
export type { ProcessingMeterProps } from './ProcessingMeter'

export { BottomToolbar } from './BottomToolbar'
export type { BottomToolbarProps } from './BottomToolbar'

// Re-export types from types.ts for backward compatibility
export type { AnswerState, ProcessingState, ToolbarStatus, Notification } from '../types'

// Modal components
export { EditQuestionsModal } from './EditQuestionsModal'
export type { EditQuestionsModalProps } from './EditQuestionsModal'

export { RevisionFlowModal } from './RevisionFlowModal'
export type { RevisionFlowModalProps } from './RevisionFlowModal'

// Flow components
export { QuickFixFlow } from './QuickFixFlow'
export type { QuickFixFlowProps } from './QuickFixFlow'

export { AddToMindFlow } from './AddToMindFlow'
export type { AddToMindFlowProps } from './AddToMindFlow'

export { ManualFixFlow } from './ManualFixFlow'
export type { ManualFixFlowProps } from './ManualFixFlow'

// View components
export { MenuView, DetailView } from './views'
export type { MenuViewProps, DetailViewProps } from './views'

// Playground components
export { StatCard, StatusBar } from './playground'
export type { StatCardProps, StatusBarProps } from './playground'
