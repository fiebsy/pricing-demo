/**
 * Ratings Panel Playground - Mock Data
 *
 * Sample profile scores data for playground testing.
 * Copied from profile constants for isolation.
 *
 * @module playground/ratings-panel/config
 */

import type { ProfileScores, SectionData } from './types'

// =============================================================================
// MOCK PROFILE SCORES
// =============================================================================

export const MOCK_SCORES: ProfileScores = {
  overall: {
    current: 73,
    networkAverage: 68,
  },
  sections: [
    // =======================================================================
    // MIND SECTION
    // =======================================================================
    {
      sectionId: 'mind',
      label: 'Mind',
      icon: 'Brain01Icon',
      aggregate: { current: 74, networkAverage: 69 },
      categories: [
        {
          categoryId: 'career',
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
          categoryId: 'growth',
          label: 'Growth',
          icon: 'PlantIcon',
          aggregate: { current: 76, networkAverage: 68 },
          subScores: [
            { id: 'habits', label: 'Habits', score: { current: 80, networkAverage: 70 } },
            { id: 'mindset', label: 'Mindset', score: { current: 78, networkAverage: 68 } },
            { id: 'goals', label: 'Goals', score: { current: 72, networkAverage: 66 } },
            { id: 'reflection', label: 'Reflection', score: { current: 74, networkAverage: 68 } },
          ],
        },
        {
          categoryId: 'skills',
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
          categoryId: 'business',
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
      ],
    },
    // =======================================================================
    // VOICE SECTION
    // =======================================================================
    {
      sectionId: 'voice',
      label: 'Voice',
      icon: 'Mic01Icon',
      aggregate: { current: 71, networkAverage: 65 },
      categories: [
        {
          categoryId: 'tone',
          label: 'Tone',
          icon: 'Mic01Icon',
          aggregate: { current: 75, networkAverage: 68 },
          subScores: [
            { id: 'warmth', label: 'Warmth', score: { current: 82, networkAverage: 70 } },
            { id: 'formality', label: 'Formality', score: { current: 70, networkAverage: 65 } },
            { id: 'confidence', label: 'Confidence', score: { current: 78, networkAverage: 68 } },
            { id: 'empathy', label: 'Empathy', score: { current: 70, networkAverage: 69 } },
          ],
        },
        {
          categoryId: 'style',
          label: 'Style',
          icon: 'Pen01Icon',
          aggregate: { current: 82, networkAverage: 64 },
          subScores: [
            { id: 'vocabulary', label: 'Vocabulary', score: { current: 85, networkAverage: 66 } },
            { id: 'structure', label: 'Structure', score: { current: 80, networkAverage: 64 } },
            { id: 'pacing', label: 'Pacing', score: { current: 82, networkAverage: 62 } },
            { id: 'examples', label: 'Examples', score: { current: 81, networkAverage: 64 } },
          ],
        },
        {
          categoryId: 'personality',
          label: 'Personality',
          icon: 'SmileIcon',
          aggregate: { current: 68, networkAverage: 65 },
          subScores: [
            { id: 'humor', label: 'Humor', score: { current: 65, networkAverage: 60 } },
            { id: 'authenticity', label: 'Authenticity', score: { current: 78, networkAverage: 68 } },
            { id: 'curiosity', label: 'Curiosity', score: { current: 70, networkAverage: 66 } },
            { id: 'passion', label: 'Passion', score: { current: 59, networkAverage: 66 } },
          ],
        },
        {
          categoryId: 'responses',
          label: 'Responses',
          icon: 'Comment01Icon',
          aggregate: { current: 59, networkAverage: 63 },
          subScores: [
            { id: 'depth', label: 'Depth', score: { current: 62, networkAverage: 65 } },
            { id: 'relevance', label: 'Relevance', score: { current: 58, networkAverage: 64 } },
            { id: 'clarity', label: 'Clarity', score: { current: 60, networkAverage: 62 } },
            { id: 'engagement', label: 'Engagement', score: { current: 56, networkAverage: 61 } },
          ],
        },
      ],
    },
    // =======================================================================
    // APPEARANCE SECTION
    // =======================================================================
    {
      sectionId: 'appearance',
      label: 'Appearance',
      icon: 'User03Icon',
      aggregate: { current: 74, networkAverage: 70 },
      categories: [
        {
          categoryId: 'visual',
          label: 'Visual',
          icon: 'Image01Icon',
          aggregate: { current: 85, networkAverage: 72 },
          subScores: [
            { id: 'headshot', label: 'Headshot', score: { current: 90, networkAverage: 75 } },
            { id: 'gallery', label: 'Gallery', score: { current: 82, networkAverage: 70 } },
            { id: 'quality', label: 'Quality', score: { current: 88, networkAverage: 72 } },
            { id: 'consistency', label: 'Consistency', score: { current: 80, networkAverage: 71 } },
          ],
        },
        {
          categoryId: 'branding',
          label: 'Branding',
          icon: 'PaintBrush01Icon',
          aggregate: { current: 72, networkAverage: 68 },
          subScores: [
            { id: 'colors', label: 'Colors', score: { current: 78, networkAverage: 70 } },
            { id: 'typography', label: 'Typography', score: { current: 70, networkAverage: 66 } },
            { id: 'logo', label: 'Logo', score: { current: 68, networkAverage: 68 } },
            { id: 'tagline', label: 'Tagline', score: { current: 72, networkAverage: 68 } },
          ],
        },
        {
          categoryId: 'presentation',
          label: 'Presentation',
          icon: 'Presentation01Icon',
          aggregate: { current: 70, networkAverage: 70 },
          subScores: [
            { id: 'bio', label: 'Bio', score: { current: 75, networkAverage: 72 } },
            { id: 'highlights', label: 'Highlights', score: { current: 68, networkAverage: 68 } },
            { id: 'links', label: 'Links', score: { current: 72, networkAverage: 70 } },
            { id: 'contact', label: 'Contact', score: { current: 65, networkAverage: 70 } },
          ],
        },
        {
          categoryId: 'media',
          label: 'Media',
          icon: 'Video01Icon',
          aggregate: { current: 69, networkAverage: 70 },
          subScores: [
            { id: 'intro-video', label: 'Intro Video', score: { current: 72, networkAverage: 72 } },
            { id: 'samples', label: 'Samples', score: { current: 70, networkAverage: 70 } },
            { id: 'interviews', label: 'Interviews', score: { current: 65, networkAverage: 68 } },
            { id: 'podcasts', label: 'Podcasts', score: { current: 69, networkAverage: 70 } },
          ],
        },
      ],
    },
  ],
}

// =============================================================================
// HELPERS
// =============================================================================

export function getSectionData(sectionId: string): SectionData | undefined {
  return MOCK_SCORES.sections.find((s) => s.sectionId === sectionId)
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

export function getScoreStatus(score: number): string {
  if (score >= 80) return 'Excellent'
  if (score >= 50) return 'Good'
  return 'Needs Work'
}

export function getScoreDelta(current: number, networkAverage: number): string {
  const delta = current - networkAverage
  if (delta > 0) return `+${delta}`
  if (delta < 0) return `${delta}`
  return '0'
}
