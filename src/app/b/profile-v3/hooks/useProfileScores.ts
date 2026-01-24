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
  improveCategory: (category: CategoryType) => void
}

export function useProfileScores(): UseProfileScoresReturn {
  const [scores, setScores] = useState<ProfileScores>(MOCK_SCORES)
  const [activeCategory, setActiveCategory] = useState<CategoryType>('career')
  const [expandedSubScore, setExpandedSubScore] = useState<string | null>(null)

  const toggleSubScore = useCallback((subScoreId: string) => {
    setExpandedSubScore((prev) => (prev === subScoreId ? null : subScoreId))
  }, [])

  const scrollToCategory = useCallback((category: CategoryType) => {
    setActiveCategory(category)
    // Could add smooth scroll behavior here if needed
  }, [])

  const improveCategory = useCallback((category: CategoryType) => {
    setScores((prev) => {
      const increment = Math.floor(Math.random() * 3) + 1 // Random 1-3
      const categoryData = prev.categories[category]
      const newCategoryScore = Math.min(100, categoryData.aggregate.current + increment)

      // Calculate new overall score (average of all categories)
      const allCategories = ['career', 'skills', 'growth', 'business', 'voice'] as CategoryType[]
      const totalScore = allCategories.reduce((sum, cat) => {
        if (cat === category) {
          return sum + newCategoryScore
        }
        return sum + prev.categories[cat].aggregate.current
      }, 0)
      const newOverall = Math.round(totalScore / 5)

      return {
        ...prev,
        overall: {
          ...prev.overall,
          current: newOverall,
        },
        categories: {
          ...prev.categories,
          [category]: {
            ...categoryData,
            aggregate: {
              ...categoryData.aggregate,
              current: newCategoryScore,
            },
          },
        },
      }
    })
  }, [])

  return {
    scores,
    activeCategory,
    expandedSubScore,
    setActiveCategory,
    toggleSubScore,
    scrollToCategory,
    improveCategory,
  }
}
