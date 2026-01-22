/**
 * Edit Questions Playground - Revision Flow Types
 *
 * Types for revision flows (quick-fix, add-to-mind, manual-fix).
 *
 * @module playground/edit-questions/types/revision
 */

/** Types of revision flows available */
export type RevisionFlowType = 'quick-fix' | 'add-to-mind' | 'manual-fix'

/** A single statement in the quick fix flow */
export interface QuickFixStatement {
  id: string
  text: string
  isTrue?: boolean // User's response
}

/** Content that can be added to mind */
export interface MindContent {
  id: string
  type: 'file' | 'link' | 'text'
  name: string
  content?: string
  url?: string
}
