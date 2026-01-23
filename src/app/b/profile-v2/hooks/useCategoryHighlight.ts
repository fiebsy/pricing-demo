/**
 * useCategoryHighlight Hook
 *
 * Manages category highlighting when a question is clicked.
 * Dims unrelated categories, highlights related ones.
 *
 * @module b/profile-v2/hooks
 */

import { useState, useCallback, useMemo } from 'react'
import type { ProfileQuestion, CategoryType } from '../types'
import { SECTIONS } from '../../profile/constants/categories'

// =============================================================================
// TYPES
// =============================================================================

export interface CategoryHighlightState {
  activeQuestion: ProfileQuestion | null
  relatedCategories: CategoryType[]
  unrelatedCategories: CategoryType[]
}

export interface UseCategoryHighlightReturn {
  /** Current highlight state */
  state: CategoryHighlightState
  /** Set the active question (highlights related category) */
  setActiveQuestion: (question: ProfileQuestion | null) => void
  /** Clear the highlight */
  clearHighlight: () => void
  /** Check if a category is highlighted */
  isHighlighted: (category: CategoryType) => boolean
  /** Check if a category is dimmed */
  isDimmed: (category: CategoryType) => boolean
}

// =============================================================================
// HELPERS
// =============================================================================

/**
 * Get all category IDs from all sections
 */
function getAllCategoryIds(): CategoryType[] {
  const categories: CategoryType[] = []
  for (const section of SECTIONS) {
    for (const category of section.categories) {
      categories.push(category.id)
    }
  }
  return categories
}

// =============================================================================
// HOOK
// =============================================================================

export function useCategoryHighlight(): UseCategoryHighlightReturn {
  const [activeQuestion, setActiveQuestionState] = useState<ProfileQuestion | null>(null)

  const allCategories = useMemo(() => getAllCategoryIds(), [])

  const state = useMemo<CategoryHighlightState>(() => {
    if (!activeQuestion) {
      return {
        activeQuestion: null,
        relatedCategories: [],
        unrelatedCategories: [],
      }
    }

    const relatedCategories = [activeQuestion.linkedCategory]
    const unrelatedCategories = allCategories.filter(
      (cat) => cat !== activeQuestion.linkedCategory
    )

    return {
      activeQuestion,
      relatedCategories,
      unrelatedCategories,
    }
  }, [activeQuestion, allCategories])

  const setActiveQuestion = useCallback((question: ProfileQuestion | null) => {
    setActiveQuestionState(question)
  }, [])

  const clearHighlight = useCallback(() => {
    setActiveQuestionState(null)
  }, [])

  const isHighlighted = useCallback(
    (category: CategoryType) => {
      return state.relatedCategories.includes(category)
    },
    [state.relatedCategories]
  )

  const isDimmed = useCallback(
    (category: CategoryType) => {
      // Only dim if there's an active question
      if (!state.activeQuestion) return false
      return state.unrelatedCategories.includes(category)
    },
    [state.activeQuestion, state.unrelatedCategories]
  )

  return {
    state,
    setActiveQuestion,
    clearHighlight,
    isHighlighted,
    isDimmed,
  }
}
