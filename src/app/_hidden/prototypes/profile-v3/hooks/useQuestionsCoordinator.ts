/**
 * useQuestionsCoordinator Hook
 *
 * Manages which question is expanded (only one at a time).
 * Provides coordination layer for multiple QuestionCommandMenu instances.
 *
 * @module b/profile-v3/hooks
 */

import { useState, useCallback } from 'react'

// =============================================================================
// HOOK
// =============================================================================

export function useQuestionsCoordinator() {
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null)

  const expandQuestion = useCallback((id: string) => {
    setExpandedQuestionId(id)
  }, [])

  const collapseQuestion = useCallback((id: string) => {
    setExpandedQuestionId((prev) => (prev === id ? null : prev))
  }, [])

  const collapseAll = useCallback(() => {
    setExpandedQuestionId(null)
  }, [])

  const isExpanded = useCallback(
    (id: string) => expandedQuestionId === id,
    [expandedQuestionId]
  )

  return {
    expandedQuestionId,
    expandQuestion,
    collapseQuestion,
    collapseAll,
    isExpanded,
  }
}
