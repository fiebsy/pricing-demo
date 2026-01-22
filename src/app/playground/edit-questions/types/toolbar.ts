/**
 * Edit Questions Playground - Toolbar Types
 *
 * Types for the bottom toolbar component.
 *
 * @module playground/edit-questions/types/toolbar
 */

/** Toolbar status indicator state */
export type ToolbarStatus = 'idle' | 'processing' | 'success'

/** Notification in the toolbar */
export interface Notification {
  id: string
  message: string
  timestamp: Date
}
