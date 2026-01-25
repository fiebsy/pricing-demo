/**
 * useCategoryHighlight Hook - V3
 *
 * Manages category highlighting when questions are clicked.
 *
 * @module b/profile-v3/hooks
 */

'use client'

import { useState, useCallback, useMemo } from 'react'
import { CATEGORY_IDS } from '../types'
import type { CategoryType, ProfileQuestion } from '../types'

// =============================================================================
// TYPES
// =============================================================================

export interface CategoryHighlightState {
  activeQuestion: ProfileQuestion | null
  highlightedCategory: CategoryType | null
  dimmedCategories: CategoryType[]
}

export interface UseCategoryHighlightReturn {
  state: CategoryHighlightState
  setActiveQuestion: (question: ProfileQuestion | null) => void
  clearHighlight: () => void
  isHighlighted: (categoryId: CategoryType) => boolean
  isDimmed: (categoryId: CategoryType) => boolean
}

// =============================================================================
// HOOK
// =============================================================================

const INITIAL_STATE: CategoryHighlightState = {
  activeQuestion: null,
  highlightedCategory: null,
  dimmedCategories: [],
}

export function useCategoryHighlight(): UseCategoryHighlightReturn {
  const [state, setState] = useState<CategoryHighlightState>(INITIAL_STATE)

  const setActiveQuestion = useCallback((question: ProfileQuestion | null) => {
    if (!question) {
      setState(INITIAL_STATE)
      return
    }

    const highlightedCategory = question.linkedCategory
    const dimmedCategories = CATEGORY_IDS.filter((id) => id !== highlightedCategory)

    setState({
      activeQuestion: question,
      highlightedCategory,
      dimmedCategories,
    })
  }, [])

  const clearHighlight = useCallback(() => {
    setState(INITIAL_STATE)
  }, [])

  const isHighlighted = useCallback(
    (categoryId: CategoryType) => state.highlightedCategory === categoryId,
    [state.highlightedCategory]
  )

  const isDimmed = useCallback(
    (categoryId: CategoryType) => state.dimmedCategories.includes(categoryId),
    [state.dimmedCategories]
  )

  return {
    state,
    setActiveQuestion,
    clearHighlight,
    isHighlighted,
    isDimmed,
  }
}
