/**
 * useProfileScores Hook
 *
 * Manages profile score state, section navigation, and category expansion.
 *
 * @module b/profile/hooks
 */

'use client'

import { useState, useCallback, useMemo } from 'react'
import type { ProfileScores, SectionType, CategoryType } from '../types'
import { MOCK_PROFILE } from '../constants'
import { getSectionForCategory } from '../constants/categories'

export interface UseProfileScoresReturn {
  scores: ProfileScores
  activeSection: SectionType
  expandedCategory: CategoryType | null
  setActiveSection: (section: SectionType) => void
  toggleCategory: (category: CategoryType) => void
  collapseAll: () => void
  scrollToCategory: (category: CategoryType) => void
}

export function useProfileScores(): UseProfileScoresReturn {
  const [scores] = useState<ProfileScores>(MOCK_PROFILE.scores)
  const [activeSection, setActiveSection] = useState<SectionType>('mind')
  const [expandedCategory, setExpandedCategory] = useState<CategoryType | null>(null)

  const handleSetActiveSection = useCallback((section: SectionType) => {
    setActiveSection(section)
    // Collapse any expanded category when switching sections
    setExpandedCategory(null)
  }, [])

  const toggleCategory = useCallback((category: CategoryType) => {
    setExpandedCategory((prev) => (prev === category ? null : category))
  }, [])

  const collapseAll = useCallback(() => {
    setExpandedCategory(null)
  }, [])

  const scrollToCategory = useCallback((category: CategoryType) => {
    // Find which section contains this category
    const section = getSectionForCategory(category)
    if (section) {
      setActiveSection(section.id)
    }

    // Expand the category
    setExpandedCategory(category)

    // Scroll to the category element
    setTimeout(() => {
      const element = document.getElementById(`category-${category}`)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }, 100)
  }, [])

  return useMemo(
    () => ({
      scores,
      activeSection,
      expandedCategory,
      setActiveSection: handleSetActiveSection,
      toggleCategory,
      collapseAll,
      scrollToCategory,
    }),
    [scores, activeSection, expandedCategory, handleSetActiveSection, toggleCategory, collapseAll, scrollToCategory]
  )
}
