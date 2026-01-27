/**
 * Edit Questions Playground - StatusBar State Hook
 *
 * Manages all StatusBar state: uploads, scores, confidence, and notifications.
 * Provides actions for state updates and simulated upload progress.
 *
 * @module playground/edit-questions/hooks
 */

'use client'

import { useCallback, useRef, useState } from 'react'
import type {
  StatusBarState,
  UploadState,
  StatusNotification,
  NotificationType,
} from '../types'
import {
  INITIAL_STATUS_BAR_STATE,
  getConfidenceLevel,
  generateNotificationId,
} from '../types'

// =============================================================================
// TYPES
// =============================================================================

export interface UseStatusBarStateOptions {
  /** Duration of upload simulation in ms (default 10000) */
  uploadDuration?: number
  /** Auto-dismiss notifications after ms (default 5000, 0 = no auto-dismiss) */
  notificationTimeout?: number
}

export interface UseStatusBarStateReturn {
  /** Current state */
  state: StatusBarState

  // Upload actions
  /** Start upload simulation */
  startUpload: () => void
  /** Update upload progress manually (0-100) */
  updateUploadProgress: (progress: number, uploadState?: UploadState) => void
  /** Complete upload and reset to idle */
  completeUpload: (itemsAdded: number) => void
  /** Cancel current upload */
  cancelUpload: () => void

  // Score actions
  /** Increment composite score */
  incrementScore: (amount: number) => void
  /** Set composite score directly */
  setScore: (value: number) => void

  // Confidence actions
  /** Update confidence score */
  updateConfidence: (
    value: number,
    questionsAffected: number,
    totalQuestions: number
  ) => void

  // Notification actions
  /** Add a notification */
  addNotification: (
    type: NotificationType,
    message: string,
    data?: StatusNotification['data']
  ) => void
  /** Dismiss a notification by ID */
  dismissNotification: (id: string) => void
  /** Clear all notifications */
  clearNotifications: () => void

  // Files actions
  /** Set files uploaded count */
  setFilesUploaded: (count: number) => void
  /** Increment files uploaded count */
  incrementFilesUploaded: (amount?: number) => void
}

// =============================================================================
// HOOK
// =============================================================================

/**
 * Hook for managing StatusBar state.
 *
 * Usage:
 * ```tsx
 * const statusBar = useStatusBarState({ uploadDuration: 10000 })
 *
 * // Start upload on revision complete
 * statusBar.startUpload()
 *
 * // Add notification
 * statusBar.addNotification('confidence_change', '3 of 5 questions improved')
 *
 * // Update confidence
 * statusBar.updateConfidence(75, 3, 5)
 * ```
 */
export function useStatusBarState(
  options: UseStatusBarStateOptions = {}
): UseStatusBarStateReturn {
  const { uploadDuration = 10000, notificationTimeout = 5000 } = options

  const [state, setState] = useState<StatusBarState>(INITIAL_STATUS_BAR_STATE)

  const uploadIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const notificationTimeoutsRef = useRef<Map<string, NodeJS.Timeout>>(new Map())

  // ---------------------------------------------------------------------------
  // Upload Actions
  // ---------------------------------------------------------------------------

  const startUpload = useCallback(() => {
    // Clear any existing interval
    if (uploadIntervalRef.current) {
      clearInterval(uploadIntervalRef.current)
    }

    setState((prev) => ({
      ...prev,
      upload: {
        state: 'uploading',
        progress: 0,
        itemsAdded: 0,
        startedAt: new Date(),
      },
    }))

    const interval = 100
    const increment = (100 / uploadDuration) * interval
    let currentProgress = 0

    uploadIntervalRef.current = setInterval(() => {
      currentProgress += increment

      if (currentProgress >= 100) {
        if (uploadIntervalRef.current) {
          clearInterval(uploadIntervalRef.current)
          uploadIntervalRef.current = null
        }
        setState((prev) => ({
          ...prev,
          upload: {
            ...prev.upload,
            state: 'complete',
            progress: 100,
          },
        }))
      } else {
        setState((prev) => ({
          ...prev,
          upload: {
            ...prev.upload,
            state: currentProgress >= 60 ? 'processing' : 'uploading',
            progress: currentProgress,
          },
        }))
      }
    }, interval)
  }, [uploadDuration])

  const updateUploadProgress = useCallback(
    (progress: number, uploadState?: UploadState) => {
      setState((prev) => ({
        ...prev,
        upload: {
          ...prev.upload,
          progress: Math.min(100, Math.max(0, progress)),
          ...(uploadState ? { state: uploadState } : {}),
        },
      }))
    },
    []
  )

  const completeUpload = useCallback((itemsAdded: number) => {
    // Clear interval if still running
    if (uploadIntervalRef.current) {
      clearInterval(uploadIntervalRef.current)
      uploadIntervalRef.current = null
    }

    setState((prev) => ({
      ...prev,
      upload: {
        state: 'idle',
        progress: 0,
        itemsAdded: 0,
        startedAt: null,
      },
      filesUploaded: prev.filesUploaded + itemsAdded,
    }))
  }, [])

  const cancelUpload = useCallback(() => {
    if (uploadIntervalRef.current) {
      clearInterval(uploadIntervalRef.current)
      uploadIntervalRef.current = null
    }

    setState((prev) => ({
      ...prev,
      upload: {
        state: 'idle',
        progress: 0,
        itemsAdded: 0,
        startedAt: null,
      },
    }))
  }, [])

  // ---------------------------------------------------------------------------
  // Score Actions
  // ---------------------------------------------------------------------------

  const incrementScore = useCallback((amount: number) => {
    setState((prev) => ({
      ...prev,
      compositeScore: prev.compositeScore + amount,
    }))
  }, [])

  const setScore = useCallback((value: number) => {
    setState((prev) => ({
      ...prev,
      compositeScore: value,
    }))
  }, [])

  // ---------------------------------------------------------------------------
  // Confidence Actions
  // ---------------------------------------------------------------------------

  const updateConfidence = useCallback(
    (value: number, questionsAffected: number, totalQuestions: number) => {
      const level = getConfidenceLevel(value)
      setState((prev) => ({
        ...prev,
        confidence: {
          value,
          level,
          questionsAffected,
          totalQuestions,
        },
      }))
    },
    []
  )

  // ---------------------------------------------------------------------------
  // Notification Actions
  // ---------------------------------------------------------------------------

  const addNotification = useCallback(
    (
      type: NotificationType,
      message: string,
      data?: StatusNotification['data']
    ) => {
      const id = generateNotificationId()
      const notification: StatusNotification = {
        id,
        type,
        message,
        timestamp: new Date(),
        data,
      }

      setState((prev) => ({
        ...prev,
        notifications: [...prev.notifications, notification],
      }))

      // Auto-dismiss if timeout is set
      if (notificationTimeout > 0) {
        const timeout = setTimeout(() => {
          dismissNotification(id)
        }, notificationTimeout)
        notificationTimeoutsRef.current.set(id, timeout)
      }
    },
    [notificationTimeout]
  )

  const dismissNotification = useCallback((id: string) => {
    // Clear timeout if exists
    const timeout = notificationTimeoutsRef.current.get(id)
    if (timeout) {
      clearTimeout(timeout)
      notificationTimeoutsRef.current.delete(id)
    }

    setState((prev) => ({
      ...prev,
      notifications: prev.notifications.filter((n) => n.id !== id),
    }))
  }, [])

  const clearNotifications = useCallback(() => {
    // Clear all timeouts
    notificationTimeoutsRef.current.forEach((timeout) => clearTimeout(timeout))
    notificationTimeoutsRef.current.clear()

    setState((prev) => ({
      ...prev,
      notifications: [],
    }))
  }, [])

  // ---------------------------------------------------------------------------
  // Files Actions
  // ---------------------------------------------------------------------------

  const setFilesUploaded = useCallback((count: number) => {
    setState((prev) => ({
      ...prev,
      filesUploaded: count,
    }))
  }, [])

  const incrementFilesUploaded = useCallback((amount = 1) => {
    setState((prev) => ({
      ...prev,
      filesUploaded: prev.filesUploaded + amount,
    }))
  }, [])

  return {
    state,
    startUpload,
    updateUploadProgress,
    completeUpload,
    cancelUpload,
    incrementScore,
    setScore,
    updateConfidence,
    addNotification,
    dismissNotification,
    clearNotifications,
    setFilesUploaded,
    incrementFilesUploaded,
  }
}
