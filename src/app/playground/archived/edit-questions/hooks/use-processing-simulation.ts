/**
 * Edit Questions Playground - Processing Simulation Hook
 *
 * Simulates processing progress for LLM answer regeneration after revision.
 * Handles progress animation, state transitions, and completion callbacks.
 *
 * @module playground/edit-questions/hooks
 */

'use client'

import { useCallback, useEffect, useRef } from 'react'
import type { UseModalStateReturn } from './use-modal-state'

// =============================================================================
// TYPES
// =============================================================================

export interface UseProcessingSimulationOptions {
  /** Duration of the processing simulation in milliseconds */
  duration: number
  /** Modal state instance for updating processing progress */
  modal: UseModalStateReturn
  /** Callback when processing completes */
  onComplete?: () => void
}

export interface UseProcessingSimulationReturn {
  /** Start the processing simulation */
  start: () => void
  /** Stop the processing simulation */
  stop: () => void
}

// =============================================================================
// HOOK
// =============================================================================

/**
 * Hook for simulating LLM processing after revision flow completion.
 *
 * Usage:
 * ```tsx
 * const processing = useProcessingSimulation({
 *   duration: 3000,
 *   modal,
 *   onComplete: () => {
 *     // Regenerate answer after processing completes
 *   },
 * })
 *
 * // Start processing after revision flow completes
 * processing.start()
 *
 * // Stop processing (e.g., when modal closes)
 * processing.stop()
 * ```
 */
export function useProcessingSimulation({
  duration,
  modal,
  onComplete,
}: UseProcessingSimulationOptions): UseProcessingSimulationReturn {
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  const start = useCallback(() => {
    modal.startProcessing()

    const interval = 50
    const increment = (100 / duration) * interval
    let currentProgress = 0

    intervalRef.current = setInterval(() => {
      currentProgress += increment

      if (currentProgress >= 100) {
        modal.updateProcessingProgress(100, 'complete')
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
        }
        // Delay completion callback for visual feedback
        setTimeout(() => {
          modal.completeProcessing()
          onCompleteRef.current?.()
        }, 800)
      } else {
        // Switch states at progress milestones
        if (currentProgress >= 40) {
          modal.updateProcessingProgress(currentProgress, 'analyzing')
        } else {
          modal.updateProcessingProgress(currentProgress, 'loading')
        }
      }
    }, interval)
  }, [duration, modal])

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return { start, stop }
}
