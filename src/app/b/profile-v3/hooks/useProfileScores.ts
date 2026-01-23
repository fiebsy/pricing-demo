/**
 * useProfileScores Hook - V3
 *
 * Manages profile scores state with flat 5-category structure.
 *
 * @module b/profile-v3/hooks
 */

'use client'

import { useState, useCallback } from 'react'
import { MOCK_SCORES } from '../constants'
import type { CategoryType, ProfileScores } from '../types'

// =============================================================================
// HOOK
// =============================================================================

export interface UseProfileScoresReturn {
  scores: ProfileScores
  activeCategory: CategoryType
  expandedSubScore: string | null
  setActiveCategory: (category: CategoryType) => void
  toggleSubScore: (subScoreId: string) => void
  scrollToCategory: (category: CategoryType) => void
}

export function useProfileScores(): UseProfileScoresReturn {
  const [scores] = useState<ProfileScores>(MOCK_SCORES)
  const [activeCategory, setActiveCategory] = useState<CategoryType>('career')
  const [expandedSubScore, setExpandedSubScore] = useState<string | null>(null)

  const toggleSubScore = useCallback((subScoreId: string) => {
    setExpandedSubScore((prev) => (prev === subScoreId ? null : subScoreId))
  }, [])

  const scrollToCategory = useCallback((category: CategoryType) => {
    setActiveCategory(category)
    // Could add smooth scroll behavior here if needed
  }, [])

  return {
    scores,
    activeCategory,
    expandedSubScore,
    setActiveCategory,
    toggleSubScore,
    scrollToCategory,
  }
}
