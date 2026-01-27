/**
 * Edit Questions Playground - Modal State Types
 *
 * Types for modal state machine and answer/processing states.
 *
 * @module playground/edit-questions/types/modal
 */

import type { RevisionFlowType } from './revision'

/** States for the modal state machine */
export type ModalState =
  | 'closed'
  | 'main'
  | 'selected'
  | 'revision-flow'
  | 'processing'

/** Actions for the modal state machine */
export type ModalAction =
  | { type: 'OPEN' }
  | { type: 'CLOSE' }
  | { type: 'SELECT'; questionId: string }
  | { type: 'DESELECT' }
  | { type: 'OPEN_REVISION'; flowType: RevisionFlowType }
  | { type: 'CLOSE_REVISION' }
  | { type: 'START_PROCESSING' }
  | { type: 'COMPLETE_PROCESSING' }

/** Visual state for answer preview component */
export type AnswerState = 'idle' | 'loading' | 'success' | 'orphaned'

/** States for the processing meter */
export type ProcessingState = 'idle' | 'loading' | 'analyzing' | 'complete'
