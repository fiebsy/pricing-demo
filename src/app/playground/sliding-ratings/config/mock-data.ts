/**
 * Sliding Ratings Panel - Mock Data
 *
 * Sample category data for playground testing.
 * Derived from the ratings-panel mock data.
 *
 * @module playground/sliding-ratings/config
 */

import type { CategoryData, CategoryId } from './types'

// =============================================================================
// MOCK CATEGORIES
// =============================================================================

export const MOCK_CATEGORIES: CategoryData[] = [
  {
    id: 'career',
    label: 'Career',
    icon: 'Briefcase01Icon',
    aggregate: { current: 68, networkAverage: 65 },
    subScores: [
      { id: 'experience', label: 'Experience', score: { current: 72, networkAverage: 70 } },
      { id: 'role', label: 'Role', score: { current: 65, networkAverage: 62 } },
      { id: 'achievements', label: 'Achievements', score: { current: 58, networkAverage: 60 } },
      { id: 'skills', label: 'Skills', score: { current: 77, networkAverage: 68 } },
    ],
  },
  {
    id: 'growth',
    label: 'Growth',
    icon: 'Plant01Icon',
    aggregate: { current: 76, networkAverage: 68 },
    subScores: [
      { id: 'habits', label: 'Habits', score: { current: 80, networkAverage: 70 } },
      { id: 'mindset', label: 'Mindset', score: { current: 78, networkAverage: 68 } },
      { id: 'goals', label: 'Goals', score: { current: 72, networkAverage: 66 } },
      { id: 'reflection', label: 'Reflection', score: { current: 74, networkAverage: 68 } },
    ],
  },
  {
    id: 'skills',
    label: 'Skills',
    icon: 'Wrench01Icon',
    aggregate: { current: 82, networkAverage: 72 },
    subScores: [
      { id: 'technical', label: 'Technical', score: { current: 88, networkAverage: 75 } },
      { id: 'tools', label: 'Tools', score: { current: 85, networkAverage: 72 } },
      { id: 'methods', label: 'Methods', score: { current: 78, networkAverage: 70 } },
      { id: 'projects', label: 'Projects', score: { current: 77, networkAverage: 71 } },
    ],
  },
  {
    id: 'business',
    label: 'Business',
    icon: 'ChartLineData01Icon',
    aggregate: { current: 70, networkAverage: 71 },
    subScores: [
      { id: 'strategy', label: 'Strategy', score: { current: 68, networkAverage: 72 } },
      { id: 'teams', label: 'Teams', score: { current: 75, networkAverage: 70 } },
      { id: 'funding', label: 'Funding', score: { current: 62, networkAverage: 68 } },
      { id: 'operations', label: 'Operations', score: { current: 75, networkAverage: 74 } },
    ],
  },
]

// =============================================================================
// HELPERS
// =============================================================================

export function getCategoryById(id: CategoryId): CategoryData | undefined {
  return MOCK_CATEGORIES.find((c) => c.id === id)
}

// =============================================================================
// SCORE THRESHOLDS & HELPERS
// =============================================================================

export const SCORE_THRESHOLDS = {
  excellent: 80,
  good: 50,
  needsWork: 0,
} as const

export function getScoreColor(score: number): 'success' | 'warning' | 'error' {
  if (score >= SCORE_THRESHOLDS.excellent) return 'success'
  if (score >= SCORE_THRESHOLDS.good) return 'warning'
  return 'error'
}

export function getScoreColorClass(score: number): string {
  const color = getScoreColor(score)
  return {
    success: 'text-success-primary',
    warning: 'text-warning-primary',
    error: 'text-error-primary',
  }[color]
}

export function getScoreBgClass(score: number): string {
  const color = getScoreColor(score)
  return {
    success: 'bg-success-primary',
    warning: 'bg-warning-primary',
    error: 'bg-error-primary',
  }[color]
}
