/**
 * Category Definitions - V3
 *
 * Flat 5-category structure (no sections).
 * Each category weighted equally at 20%.
 *
 * @module b/profile-v3/constants
 */

import type { CategoryType, UploadSuggestion } from '../types'

// =============================================================================
// CATEGORY DEFINITIONS
// =============================================================================

export interface SubScoreDefinition {
  id: string
  label: string
  description: string
}

export interface CategoryDefinition {
  id: CategoryType
  label: string
  description: string
  question: string // What question does this category answer?
  icon: string
  subScores: SubScoreDefinition[]
  contentSources: string[] // What to upload
}

// =============================================================================
// THE 5 CATEGORIES
// =============================================================================

export const CATEGORIES: CategoryDefinition[] = [
  {
    id: 'career',
    label: 'Career',
    description: "What you've done - your professional history and achievements",
    question: "What's your background?",
    icon: 'Briefcase01Icon',
    contentSources: ['LinkedIn', 'Resume', 'Work history'],
    subScores: [
      { id: 'experience', label: 'Experience', description: 'Years and depth of professional work' },
      { id: 'roles', label: 'Roles', description: 'Positions held and responsibilities' },
      { id: 'achievements', label: 'Achievements', description: 'Notable accomplishments and milestones' },
      { id: 'network', label: 'Network', description: 'Professional connections and references' },
    ],
  },
  {
    id: 'skills',
    label: 'Skills',
    description: 'What you can do - your capabilities and expertise',
    question: 'What can you do?',
    icon: 'Wrench01Icon',
    contentSources: ['GitHub', 'Project samples', 'Certifications'],
    subScores: [
      { id: 'technical', label: 'Technical', description: 'Core technical competencies' },
      { id: 'tools', label: 'Tools', description: 'Software and tools proficiency' },
      { id: 'methods', label: 'Methods', description: 'Processes and methodologies' },
      { id: 'projects', label: 'Projects', description: 'Hands-on project experience' },
    ],
  },
  {
    id: 'growth',
    label: 'Growth',
    description: 'How you think - your mindset and continuous learning',
    question: 'How do you approach challenges?',
    icon: 'PlantIcon',
    contentSources: ['Blog posts', 'Journals', 'Reflections'],
    subScores: [
      { id: 'mindset', label: 'Mindset', description: 'Mental frameworks and beliefs' },
      { id: 'habits', label: 'Habits', description: 'Daily practices and routines' },
      { id: 'goals', label: 'Goals', description: 'Aspirations and targets' },
      { id: 'learning', label: 'Learning', description: 'Continuous improvement and curiosity' },
    ],
  },
  {
    id: 'business',
    label: 'Business',
    description: 'How you lead - your strategic and operational abilities',
    question: 'How do you build/lead?',
    icon: 'ChartLineData01Icon',
    contentSources: ['Pitch decks', 'Business plans', 'Case studies'],
    subScores: [
      { id: 'strategy', label: 'Strategy', description: 'Business planning and vision' },
      { id: 'teams', label: 'Teams', description: 'Team building and leadership' },
      { id: 'operations', label: 'Operations', description: 'Day-to-day business management' },
      { id: 'results', label: 'Results', description: 'Outcomes and impact achieved' },
    ],
  },
  {
    id: 'voice',
    label: 'Voice',
    description: 'How you express - your communication style and presence',
    question: 'What are you like to talk to?',
    icon: 'Mic01Icon',
    contentSources: ['Video intro', 'Audio clips', 'Writing samples'],
    subScores: [
      { id: 'tone', label: 'Tone', description: 'Emotional quality and warmth' },
      { id: 'style', label: 'Style', description: 'Unique way of expressing ideas' },
      { id: 'clarity', label: 'Clarity', description: 'Clear and understandable communication' },
      { id: 'authenticity', label: 'Authenticity', description: 'Genuineness and personality' },
    ],
  },
]

// =============================================================================
// UPLOAD SUGGESTIONS (for Add to Mind flow)
// =============================================================================

export const UPLOAD_SUGGESTIONS: Record<CategoryType, UploadSuggestion[]> = {
  career: [
    { id: 'linkedin', label: 'LinkedIn', description: 'Import your professional profile', icon: 'Linkedin01Icon', impactScore: 10 },
    { id: 'resume', label: 'Resume', description: 'Upload resume or CV', icon: 'File01Icon', impactScore: 9 },
    { id: 'work-history', label: 'Work History', description: 'Job descriptions and achievements', icon: 'Briefcase01Icon', impactScore: 8 },
    { id: 'recommendations', label: 'Recommendations', description: 'Letters or endorsements', icon: 'Award01Icon', impactScore: 7 },
  ],
  skills: [
    { id: 'github', label: 'GitHub', description: 'Link your repositories', icon: 'SourceCode01Icon', impactScore: 10 },
    { id: 'projects', label: 'Projects', description: 'Upload project samples', icon: 'Folder01Icon', impactScore: 9 },
    { id: 'certifications', label: 'Certifications', description: 'Professional certifications', icon: 'Certificate01Icon', impactScore: 8 },
    { id: 'portfolio', label: 'Portfolio', description: 'Work samples and demos', icon: 'Presentation01Icon', impactScore: 7 },
  ],
  growth: [
    { id: 'posts', label: 'Blog Posts', description: 'Import articles or posts', icon: 'Edit01Icon', impactScore: 10 },
    { id: 'journals', label: 'Journals', description: 'Personal journals or diaries', icon: 'Book02Icon', impactScore: 9 },
    { id: 'reflections', label: 'Reflections', description: 'Personal reflection recordings', icon: 'Video01Icon', impactScore: 8 },
    { id: 'goals', label: 'Goals', description: 'Goal-setting documents', icon: 'Target01Icon', impactScore: 7 },
  ],
  business: [
    { id: 'pitch-deck', label: 'Pitch Deck', description: 'Investor presentations', icon: 'Presentation01Icon', impactScore: 10 },
    { id: 'business-plan', label: 'Business Plan', description: 'Strategic documents', icon: 'File01Icon', impactScore: 9 },
    { id: 'case-studies', label: 'Case Studies', description: 'Success stories and outcomes', icon: 'ChartLineData01Icon', impactScore: 8 },
    { id: 'team-docs', label: 'Team Docs', description: 'Team structure and processes', icon: 'UserGroup01Icon', impactScore: 7 },
  ],
  voice: [
    { id: 'video-intro', label: 'Video Intro', description: 'Record a video introduction', icon: 'Video01Icon', impactScore: 10 },
    { id: 'audio-clips', label: 'Audio Clips', description: 'Voice recordings or calls', icon: 'Mic01Icon', impactScore: 9 },
    { id: 'writing', label: 'Writing Samples', description: 'Articles or blog posts', icon: 'Edit01Icon', impactScore: 8 },
    { id: 'podcasts', label: 'Podcasts', description: 'Podcast appearances', icon: 'Podcast01Icon', impactScore: 7 },
  ],
}

// =============================================================================
// HELPERS
// =============================================================================

/**
 * Get category definition by ID
 */
export function getCategoryById(id: CategoryType): CategoryDefinition | undefined {
  return CATEGORIES.find((c) => c.id === id)
}

/**
 * Get all category IDs
 */
export function getAllCategoryIds(): CategoryType[] {
  return CATEGORIES.map((c) => c.id)
}

/**
 * Get upload suggestions for a category, sorted by impact score
 */
export function getUploadSuggestions(categoryId: CategoryType): UploadSuggestion[] {
  const suggestions = UPLOAD_SUGGESTIONS[categoryId] || []
  return [...suggestions].sort((a, b) => b.impactScore - a.impactScore)
}

// =============================================================================
// SCORE THRESHOLDS
// =============================================================================

export const SCORE_THRESHOLDS = {
  excellent: 80,
  good: 50,
  needsWork: 0,
} as const

/**
 * Get color based on score value
 */
export function getScoreColor(score: number): 'success' | 'warning' | 'error' {
  if (score >= SCORE_THRESHOLDS.excellent) return 'success'
  if (score >= SCORE_THRESHOLDS.good) return 'warning'
  return 'error'
}

/**
 * Get semantic color class based on score
 */
export function getScoreColorClass(score: number): string {
  const color = getScoreColor(score)
  return {
    success: 'text-success-primary',
    warning: 'text-warning-primary',
    error: 'text-error-primary',
  }[color]
}

/**
 * Get background color class based on score
 */
export function getScoreBgClass(score: number): string {
  const color = getScoreColor(score)
  return {
    success: 'bg-success-primary',
    warning: 'bg-warning-primary',
    error: 'bg-error-primary',
  }[color]
}

/**
 * Calculate overall score from categories (equal 20% weight)
 */
export function calculateOverallScore(
  categories: Record<CategoryType, { aggregate: { current: number } }>
): number {
  const categoryIds = getAllCategoryIds()
  const totalScore = categoryIds.reduce((sum, id) => {
    return sum + (categories[id]?.aggregate.current || 0)
  }, 0)
  return Math.round(totalScore / categoryIds.length)
}
