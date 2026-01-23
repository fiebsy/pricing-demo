/**
 * Mock Data - V3
 *
 * Sample profile data with flat 5-category structure.
 * Each category weighted equally at 20%.
 *
 * @module b/profile-v3/constants
 */

import type { ProfileData, ProfileScores, UpdatesIslandData, CategoryType, CategoryScoreData } from '../types'

// =============================================================================
// CATEGORY SCORE DATA
// =============================================================================

const CAREER_SCORE: CategoryScoreData = {
  categoryId: 'career',
  label: 'Career',
  icon: 'Briefcase01Icon',
  aggregate: { current: 68, networkAverage: 65 },
  subScores: [
    { id: 'experience', label: 'Experience', score: { current: 72, networkAverage: 70 } },
    { id: 'roles', label: 'Roles', score: { current: 65, networkAverage: 62 } },
    { id: 'achievements', label: 'Achievements', score: { current: 58, networkAverage: 60 } },
    { id: 'network', label: 'Network', score: { current: 77, networkAverage: 68 } },
  ],
}

const SKILLS_SCORE: CategoryScoreData = {
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
}

const GROWTH_SCORE: CategoryScoreData = {
  categoryId: 'growth',
  label: 'Growth',
  icon: 'PlantIcon',
  aggregate: { current: 76, networkAverage: 68 },
  subScores: [
    { id: 'mindset', label: 'Mindset', score: { current: 78, networkAverage: 68 } },
    { id: 'habits', label: 'Habits', score: { current: 80, networkAverage: 70 } },
    { id: 'goals', label: 'Goals', score: { current: 72, networkAverage: 66 } },
    { id: 'learning', label: 'Learning', score: { current: 74, networkAverage: 68 } },
  ],
}

const BUSINESS_SCORE: CategoryScoreData = {
  categoryId: 'business',
  label: 'Business',
  icon: 'ChartLineData01Icon',
  aggregate: { current: 70, networkAverage: 71 },
  subScores: [
    { id: 'strategy', label: 'Strategy', score: { current: 68, networkAverage: 72 } },
    { id: 'teams', label: 'Teams', score: { current: 75, networkAverage: 70 } },
    { id: 'operations', label: 'Operations', score: { current: 75, networkAverage: 74 } },
    { id: 'results', label: 'Results', score: { current: 62, networkAverage: 68 } },
  ],
}

const VOICE_SCORE: CategoryScoreData = {
  categoryId: 'voice',
  label: 'Voice',
  icon: 'Mic01Icon',
  aggregate: { current: 71, networkAverage: 65 },
  subScores: [
    { id: 'tone', label: 'Tone', score: { current: 75, networkAverage: 68 } },
    { id: 'style', label: 'Style', score: { current: 82, networkAverage: 64 } },
    { id: 'clarity', label: 'Clarity', score: { current: 60, networkAverage: 62 } },
    { id: 'authenticity', label: 'Authenticity', score: { current: 67, networkAverage: 66 } },
  ],
}

// =============================================================================
// MOCK PROFILE SCORES
// =============================================================================

export const MOCK_SCORES: ProfileScores = {
  overall: {
    current: 73, // Average of all 5 categories
    networkAverage: 68,
  },
  categories: {
    career: CAREER_SCORE,
    skills: SKILLS_SCORE,
    growth: GROWTH_SCORE,
    business: BUSINESS_SCORE,
    voice: VOICE_SCORE,
  },
}

// =============================================================================
// MOCK PROFILE DATA
// =============================================================================

export const MOCK_PROFILE: ProfileData = {
  id: 'profile-1',
  name: 'Squirtle Kid',
  avatarUrl: '/skwircle-kid.png',
  bio: `Design engineer crafting user experiences through thoughtful UI and clean code. Always iterating, always learning.`,
  questions: [
    {
      id: 'q1',
      text: 'What drives your passion for design engineering?',
      linkedCategory: 'growth',
    },
    {
      id: 'q2',
      text: 'How did you transition into your current role?',
      linkedCategory: 'career',
    },
    {
      id: 'q3',
      text: 'What technologies are you most excited about?',
      linkedCategory: 'skills',
    },
    {
      id: 'q4',
      text: 'How would you describe your communication style?',
      linkedCategory: 'voice',
    },
    {
      id: 'q5',
      text: 'What advice would you give to junior developers?',
      linkedCategory: 'skills',
    },
  ],
  scores: MOCK_SCORES,
}

// =============================================================================
// MOCK UPDATES DATA
// =============================================================================

export const MOCK_UPDATES: UpdatesIslandData = {
  pendingFiles: 0,
  pendingUpdates: 2,
}

// =============================================================================
// HELPER: Get category scores as array (for rendering)
// =============================================================================

/**
 * Get category scores as an array in display order
 */
export function getCategoryScoresArray(scores: ProfileScores): CategoryScoreData[] {
  const order: CategoryType[] = ['career', 'skills', 'growth', 'business', 'voice']
  return order.map((id) => scores.categories[id])
}
