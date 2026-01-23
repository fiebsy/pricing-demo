/**
 * useScoreAnimation Hook - V3
 *
 * Manages score improvement animations and toasts.
 *
 * @module b/profile-v3/hooks
 */

'use client'

import { useState, useCallback } from 'react'
import type { ScoreImprovement } from '../types'

// =============================================================================
// HOOK
// =============================================================================

export interface UseScoreAnimationReturn {
  improvements: ScoreImprovement[]
  addImprovement: (improvement: ScoreImprovement) => void
  clearImprovement: (categoryId: string) => void
  clearAllImprovements: () => void
}

export function useScoreAnimation(): UseScoreAnimationReturn {
  const [improvements, setImprovements] = useState<ScoreImprovement[]>([])

  const addImprovement = useCallback((improvement: ScoreImprovement) => {
    setImprovements((prev) => [...prev, improvement])
  }, [])

  const clearImprovement = useCallback((categoryId: string) => {
    setImprovements((prev) => prev.filter((i) => i.categoryId !== categoryId))
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
