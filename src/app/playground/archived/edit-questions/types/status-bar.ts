/**
 * Edit Questions Playground - StatusBar Types
 *
 * Types for the interactive StatusBar island component.
 * Tracks uploads, scores, confidence, and notifications.
 *
 * @module playground/edit-questions/types/status-bar
 */

// =============================================================================
// UPLOAD TYPES
// =============================================================================

/** Upload state for the StatusBar */
export type UploadState = 'idle' | 'uploading' | 'processing' | 'complete'

/** Upload tracking data */
export interface UploadProgress {
  state: UploadState
  progress: number // 0-100
  itemsAdded: number
  startedAt: Date | null
}

// =============================================================================
// CONFIDENCE TYPES
// =============================================================================

/** Confidence level thresholds */
export type ConfidenceLevel = 'high' | 'medium' | 'low'

/** Confidence score data */
export interface ConfidenceScore {
  value: number // 0-100
  level: ConfidenceLevel
  questionsAffected: number
  totalQuestions: number
}

// =============================================================================
// NOTIFICATION TYPES
// =============================================================================

/** Notification type categories */
export type NotificationType =
  | 'upload_complete'
  | 'confidence_change'
  | 'regeneration'
  | 'info'

/** Enhanced notification with type and data */
export interface StatusNotification {
  id: string
  type: NotificationType
  message: string
  timestamp: Date
  data?: {
    questionsImproved?: number
    totalQuestions?: number
    contentType?: string
    itemsAdded?: number
  }
}

// =============================================================================
// STATUSBAR STATE
// =============================================================================

/** Complete StatusBar state */
export interface StatusBarState {
  upload: UploadProgress
  compositeScore: number
  confidence: ConfidenceScore
  notifications: StatusNotification[]
  filesUploaded: number
}

/** Initial StatusBar state */
export const INITIAL_STATUS_BAR_STATE: StatusBarState = {
  upload: {
    state: 'idle',
    progress: 0,
    itemsAdded: 0,
    startedAt: null,
  },
  compositeScore: 12100, // 12.1K as shown in screenshot
  confidence: {
    value: 65,
    level: 'medium',
    questionsAffected: 0,
    totalQuestions: 0,
  },
  notifications: [],
  filesUploaded: 0,
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/** Get confidence level from value */
export function getConfidenceLevel(value: number): ConfidenceLevel {
  if (value >= 70) return 'high'
  if (value >= 40) return 'medium'
  return 'low'
}

/** Format score for display (12100 -> "12.1K") */
export function formatScore(value: number): string {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`
  return value.toString()
}

/** Generate unique notification ID */
export function generateNotificationId(): string {
  return `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}
