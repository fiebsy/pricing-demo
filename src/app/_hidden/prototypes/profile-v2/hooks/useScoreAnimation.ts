/**
 * useScoreAnimation Hook
 *
 * Manages score improvement animations.
 *
 * @module b/profile-v2/hooks
 */

import { useState, useCallback, useRef } from 'react'
import type { CategoryType } from '../types'
import { ANIMATION_DURATIONS } from '../config'

// =============================================================================
// TYPES
// =============================================================================

export interface ScoreImprovement {
  id: string
  categoryId: CategoryType
  delta: number
  previousScore: number
  newScore: number
}

export interface UseScoreAnimationReturn {
  /** Active improvements to display */
  improvements: ScoreImprovement[]
  /** Add a new improvement animation */
  addImprovement: (improvement: Omit<ScoreImprovement, 'id'>) => void
  /** Clear a specific improvement */
  clearImprovement: (id: string) => void
  /** Clear all improvements */
  clearAllImprovements: () => void
}

// =============================================================================
// HOOK
// =============================================================================

export function useScoreAnimation(): UseScoreAnimationReturn {
  const [improvements, setImprovements] = useState<ScoreImprovement[]>([])
  const idCounter = useRef(0)

  const addImprovement = useCallback(
    (improvement: Omit<ScoreImprovement, 'id'>) => {
      const id = `improvement-${++idCounter.current}`
      const newImprovement: ScoreImprovement = { ...improvement, id }

      setImprovements((prev) => [...prev, newImprovement])

      // Auto-dismiss after duration
      setTimeout(() => {
        setImprovements((prev) => prev.filter((i) => i.id !== id))
      }, ANIMATION_DURATIONS.toastDismiss)
    },
    []
  )

  const clearImprovement = useCallback((id: string) => {
    setImprovements((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const clearAllImprovements = useCallback(() => {
    setImprovements([])
  }, [])

  return {
    improvements,
    addImprovement,
    clearImprovement,
    clearAllImprovements,
  }
}
