/**
 * Edit Questions Playground - Type Definitions
 *
 * TypeScript interfaces for the Q/A Editor modal prototype.
 * Supports the preview → improve → verify loop pattern.
 *
 * @module playground/edit-questions/types
 */

// Question & Answer types
export type { QuestionStatus, Answer, Question } from './question'

// Revision flow types
export type { RevisionFlowType, QuickFixStatement, MindContent } from './revision'

// Modal state types
export type { ModalState, ModalAction, AnswerState, ProcessingState } from './modal'

// Simulation types
export type { SimulatedResponseType, SimulatedResponse } from './simulation'

// Toolbar types
export type { ToolbarStatus, Notification } from './toolbar'

// StatusBar types
export type {
  UploadState,
  UploadProgress,
  ConfidenceLevel,
  ConfidenceScore,
  NotificationType,
  StatusNotification,
  StatusBarState,
} from './status-bar'
export {
  INITIAL_STATUS_BAR_STATE,
  getConfidenceLevel,
  formatScore,
  generateNotificationId,
} from './status-bar'

// Config types
export type {
  ModalWidth,
  InputPosition,
  AnswerPosition,
  PlaygroundConfig,
  PlaygroundPreset,
} from './config'
