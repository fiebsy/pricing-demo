/**
 * Category Definitions
 *
 * 3-tier hierarchy: Sections > Categories > SubScores
 * With upload suggestion mappings for Add to Mind flow.
 *
 * @module b/profile/constants
 */

import type {
  SectionType,
  CategoryType,
  MindCategory,
  VoiceCategory,
  AppearanceCategory,
  UploadSuggestion,
} from '../types'

// =============================================================================
// SECTION DEFINITIONS
// =============================================================================

export interface SectionDefinition {
  id: SectionType
  label: string
  description: string
  icon: string
  categories: CategoryDefinition[]
}

export interface CategoryDefinition {
  id: CategoryType
  label: string
  description: string
  icon: string
  subScores: {
    id: string
    label: string
    description: string
  }[]
}

// =============================================================================
// MIND SECTION
// =============================================================================

const MIND_CATEGORIES: CategoryDefinition[] = [
  {
    id: 'career' as MindCategory,
    label: 'Career',
    description: 'Jobs, experience, and achievements',
    icon: 'Briefcase01Icon',
    subScores: [
      { id: 'experience', label: 'Experience', description: 'Years and depth of professional work' },
      { id: 'role', label: 'Role', description: 'Your current position and responsibilities' },
      { id: 'achievements', label: 'Achievements', description: 'Notable accomplishments and milestones' },
      { id: 'skills', label: 'Skills', description: 'Professional skills you possess' },
    ],
  },
  {
    id: 'growth' as MindCategory,
    label: 'Growth',
    description: 'Habits, mindset, and self-improvement',
    icon: 'PlantIcon',
    subScores: [
      { id: 'habits', label: 'Habits', description: 'Daily practices and routines' },
      { id: 'mindset', label: 'Mindset', description: 'Mental frameworks and beliefs' },
      { id: 'goals', label: 'Goals', description: 'Aspirations and targets' },
      { id: 'reflection', label: 'Reflection', description: 'Self-awareness and introspection' },
    ],
  },
  {
    id: 'skills' as MindCategory,
    label: 'Skills',
    description: 'Technical abilities, tools, and methods',
    icon: 'Wrench01Icon',
    subScores: [
      { id: 'technical', label: 'Technical', description: 'Core technical competencies' },
      { id: 'tools', label: 'Tools', description: 'Software and tools you use' },
      { id: 'methods', label: 'Methods', description: 'Processes and methodologies' },
      { id: 'projects', label: 'Projects', description: 'Hands-on project experience' },
    ],
  },
  {
    id: 'business' as MindCategory,
    label: 'Business',
    description: 'Strategy, teams, and operations',
    icon: 'ChartLineData01Icon',
    subScores: [
      { id: 'strategy', label: 'Strategy', description: 'Business planning and vision' },
      { id: 'teams', label: 'Teams', description: 'Team building and leadership' },
      { id: 'funding', label: 'Funding', description: 'Capital and financial planning' },
      { id: 'operations', label: 'Operations', description: 'Day-to-day business management' },
    ],
  },
]

// =============================================================================
// VOICE SECTION
// =============================================================================

const VOICE_CATEGORIES: CategoryDefinition[] = [
  {
    id: 'tone' as VoiceCategory,
    label: 'Tone',
    description: 'Emotional quality of communication',
    icon: 'Mic01Icon',
    subScores: [
      { id: 'warmth', label: 'Warmth', description: 'Friendliness and approachability' },
      { id: 'formality', label: 'Formality', description: 'Professional vs casual register' },
      { id: 'confidence', label: 'Confidence', description: 'Assertiveness in expression' },
      { id: 'empathy', label: 'Empathy', description: 'Understanding and relatability' },
    ],
  },
  {
    id: 'style' as VoiceCategory,
    label: 'Style',
    description: 'Unique way of expressing ideas',
    icon: 'Pen01Icon',
    subScores: [
      { id: 'vocabulary', label: 'Vocabulary', description: 'Word choice and language' },
      { id: 'structure', label: 'Structure', description: 'How you organize thoughts' },
      { id: 'pacing', label: 'Pacing', description: 'Rhythm and flow' },
      { id: 'examples', label: 'Examples', description: 'Use of illustrations and stories' },
    ],
  },
  {
    id: 'personality' as VoiceCategory,
    label: 'Personality',
    description: 'Character traits that shine through',
    icon: 'SmileIcon',
    subScores: [
      { id: 'humor', label: 'Humor', description: 'Wit and playfulness' },
      { id: 'authenticity', label: 'Authenticity', description: 'Genuineness and honesty' },
      { id: 'curiosity', label: 'Curiosity', description: 'Inquisitiveness and openness' },
      { id: 'passion', label: 'Passion', description: 'Enthusiasm and energy' },
    ],
  },
  {
    id: 'responses' as VoiceCategory,
    label: 'Responses',
    description: 'How you engage with questions',
    icon: 'Comment01Icon',
    subScores: [
      { id: 'depth', label: 'Depth', description: 'Thoroughness of answers' },
      { id: 'relevance', label: 'Relevance', description: 'Staying on topic' },
      { id: 'clarity', label: 'Clarity', description: 'Clear and understandable' },
      { id: 'engagement', label: 'Engagement', description: 'Interactive and conversational' },
    ],
  },
]

// =============================================================================
// APPEARANCE SECTION
// =============================================================================

const APPEARANCE_CATEGORIES: CategoryDefinition[] = [
  {
    id: 'visual' as AppearanceCategory,
    label: 'Visual',
    description: 'Profile imagery and photos',
    icon: 'Image01Icon',
    subScores: [
      { id: 'headshot', label: 'Headshot', description: 'Primary profile photo' },
      { id: 'gallery', label: 'Gallery', description: 'Additional photos' },
      { id: 'quality', label: 'Quality', description: 'Image resolution and clarity' },
      { id: 'consistency', label: 'Consistency', description: 'Visual coherence' },
    ],
  },
  {
    id: 'branding' as AppearanceCategory,
    label: 'Branding',
    description: 'Personal brand identity',
    icon: 'PaintBrush01Icon',
    subScores: [
      { id: 'colors', label: 'Colors', description: 'Color palette preferences' },
      { id: 'typography', label: 'Typography', description: 'Font and text styles' },
      { id: 'logo', label: 'Logo', description: 'Personal logo or mark' },
      { id: 'tagline', label: 'Tagline', description: 'Personal slogan or motto' },
    ],
  },
  {
    id: 'presentation' as AppearanceCategory,
    label: 'Presentation',
    description: 'How you present yourself publicly',
    icon: 'Presentation01Icon',
    subScores: [
      { id: 'bio', label: 'Bio', description: 'Written biography' },
      { id: 'highlights', label: 'Highlights', description: 'Featured achievements' },
      { id: 'links', label: 'Links', description: 'Social and portfolio links' },
      { id: 'contact', label: 'Contact', description: 'Contact information' },
    ],
  },
  {
    id: 'media' as AppearanceCategory,
    label: 'Media',
    description: 'Video and audio content',
    icon: 'Video01Icon',
    subScores: [
      { id: 'intro-video', label: 'Intro Video', description: 'Personal introduction video' },
      { id: 'samples', label: 'Samples', description: 'Work samples and demos' },
      { id: 'interviews', label: 'Interviews', description: 'Interview recordings' },
      { id: 'podcasts', label: 'Podcasts', description: 'Podcast appearances' },
    ],
  },
]

// =============================================================================
// SECTIONS
// =============================================================================

export const SECTIONS: SectionDefinition[] = [
  {
    id: 'mind',
    label: 'Mind',
    description: 'Your knowledge, experience, and expertise',
    icon: 'Brain01Icon',
    categories: MIND_CATEGORIES,
  },
  {
    id: 'voice',
    label: 'Voice',
    description: 'How you communicate and express yourself',
    icon: 'Mic01Icon',
    categories: VOICE_CATEGORIES,
  },
  {
    id: 'appearance',
    label: 'Appearance',
    description: 'Your visual presence and public presentation',
    icon: 'User03Icon',
    categories: APPEARANCE_CATEGORIES,
  },
]

// =============================================================================
// UPLOAD SUGGESTIONS (for Add to Mind flow)
// =============================================================================

export const UPLOAD_SUGGESTIONS: Record<CategoryType, UploadSuggestion[]> = {
  // Mind - Career
  career: [
    { id: 'linkedin', label: 'LinkedIn', description: 'Import your professional profile', icon: 'Linkedin01Icon', impactScore: 10 },
    { id: 'docs', label: 'Documents', description: 'Upload resume or CV', icon: 'File01Icon', impactScore: 9 },
    { id: 'video-interviews', label: 'Video Interviews', description: 'Past interview recordings', icon: 'Video01Icon', impactScore: 7 },
    { id: 'recommendations', label: 'Recommendations', description: 'Letters or endorsements', icon: 'Award01Icon', impactScore: 6 },
  ],
  // Mind - Growth
  growth: [
    { id: 'journals', label: 'Journals', description: 'Personal journals or diaries', icon: 'Book02Icon', impactScore: 10 },
    { id: 'video', label: 'Video', description: 'Personal reflection recordings', icon: 'Video01Icon', impactScore: 9 },
    { id: 'posts', label: 'Posts', description: 'Blog posts or social media', icon: 'Edit01Icon', impactScore: 8 },
    { id: 'coaching', label: 'Coaching Notes', description: 'Notes from coaches or mentors', icon: 'Comment01Icon', impactScore: 7 },
  ],
  // Mind - Skills
  skills: [
    { id: 'code', label: 'Code / Repos', description: 'GitHub or code samples', icon: 'SourceCode01Icon', impactScore: 10 },
    { id: 'docs', label: 'Documentation', description: 'Technical documentation', icon: 'File01Icon', impactScore: 9 },
    { id: 'podcasts', label: 'Podcasts', description: 'Technical podcasts or talks', icon: 'Podcast01Icon', impactScore: 8 },
    { id: 'certifications', label: 'Certifications', description: 'Professional certifications', icon: 'Certificate01Icon', impactScore: 7 },
  ],
  // Mind - Business
  business: [
    { id: 'pitch-decks', label: 'Pitch Decks', description: 'Investor presentations', icon: 'Presentation01Icon', impactScore: 10 },
    { id: 'emails', label: 'Business Emails', description: 'Professional communications', icon: 'Mail01Icon', impactScore: 9 },
    { id: 'financials', label: 'Financials', description: 'Business metrics and reports', icon: 'ChartLineData01Icon', impactScore: 8 },
    { id: 'contracts', label: 'Contracts', description: 'Business agreements', icon: 'File01Icon', impactScore: 6 },
  ],
  // Voice categories
  tone: [
    { id: 'audio', label: 'Audio Clips', description: 'Voice recordings or calls', icon: 'Mic01Icon', impactScore: 10 },
    { id: 'videos', label: 'Videos', description: 'Video calls or presentations', icon: 'Video01Icon', impactScore: 9 },
    { id: 'emails', label: 'Emails', description: 'Written communications', icon: 'Mail01Icon', impactScore: 7 },
    { id: 'chats', label: 'Chat Logs', description: 'Messaging conversations', icon: 'Comment01Icon', impactScore: 6 },
  ],
  style: [
    { id: 'writing', label: 'Writing Samples', description: 'Articles or blog posts', icon: 'Edit01Icon', impactScore: 10 },
    { id: 'presentations', label: 'Presentations', description: 'Slides or keynotes', icon: 'Presentation01Icon', impactScore: 9 },
    { id: 'social', label: 'Social Posts', description: 'Social media content', icon: 'Share01Icon', impactScore: 8 },
    { id: 'newsletters', label: 'Newsletters', description: 'Email newsletters', icon: 'Mail01Icon', impactScore: 7 },
  ],
  personality: [
    { id: 'personal-videos', label: 'Personal Videos', description: 'Casual or personal content', icon: 'Video01Icon', impactScore: 10 },
    { id: 'social', label: 'Social Media', description: 'Personal social posts', icon: 'Share01Icon', impactScore: 9 },
    { id: 'testimonials', label: 'Testimonials', description: "What others say about you", icon: 'Comment01Icon', impactScore: 8 },
    { id: 'interviews', label: 'Interviews', description: 'Personal interviews', icon: 'Mic01Icon', impactScore: 7 },
  ],
  responses: [
    { id: 'q-and-a', label: 'Q&A Sessions', description: 'AMA or Q&A recordings', icon: 'Comment01Icon', impactScore: 10 },
    { id: 'podcasts', label: 'Podcasts', description: 'Podcast appearances', icon: 'Podcast01Icon', impactScore: 9 },
    { id: 'interviews', label: 'Interviews', description: 'Interview recordings', icon: 'Mic01Icon', impactScore: 8 },
    { id: 'webinars', label: 'Webinars', description: 'Webinar recordings', icon: 'Video01Icon', impactScore: 7 },
  ],
  // Appearance categories
  visual: [
    { id: 'photos', label: 'Photos', description: 'Professional headshots', icon: 'Image01Icon', impactScore: 10 },
    { id: 'gallery', label: 'Photo Gallery', description: 'Additional images', icon: 'Gallery01Icon', impactScore: 8 },
    { id: 'video', label: 'Video', description: 'Video introductions', icon: 'Video01Icon', impactScore: 7 },
  ],
  branding: [
    { id: 'brand-assets', label: 'Brand Assets', description: 'Logos and brand materials', icon: 'PaintBrush01Icon', impactScore: 10 },
    { id: 'style-guide', label: 'Style Guide', description: 'Brand guidelines', icon: 'Book02Icon', impactScore: 9 },
    { id: 'colors', label: 'Color Palette', description: 'Brand colors', icon: 'ColorPicker01Icon', impactScore: 7 },
  ],
  presentation: [
    { id: 'portfolio', label: 'Portfolio', description: 'Portfolio website or PDF', icon: 'File01Icon', impactScore: 10 },
    { id: 'bio', label: 'Written Bio', description: 'Biography text', icon: 'Edit01Icon', impactScore: 9 },
    { id: 'highlights', label: 'Highlights', description: 'Key achievements', icon: 'Award01Icon', impactScore: 8 },
  ],
  media: [
    { id: 'intro-video', label: 'Intro Video', description: 'Personal introduction', icon: 'Video01Icon', impactScore: 10 },
    { id: 'demos', label: 'Demos', description: 'Work demonstrations', icon: 'Presentation01Icon', impactScore: 9 },
    { id: 'podcasts', label: 'Podcast Episodes', description: 'Audio content', icon: 'Podcast01Icon', impactScore: 8 },
  ],
}

// =============================================================================
// HELPERS
// =============================================================================

/**
 * Get section definition by ID
 */
export function getSectionById(id: SectionType): SectionDefinition | undefined {
  return SECTIONS.find((s) => s.id === id)
}

/**
 * Get category definition by ID
 */
export function getCategoryById(id: CategoryType): CategoryDefinition | undefined {
  for (const section of SECTIONS) {
    const category = section.categories.find((c) => c.id === id)
    if (category) return category
  }
  return undefined
}

/**
 * Get section that contains a category
 */
export function getSectionForCategory(categoryId: CategoryType): SectionDefinition | undefined {
  return SECTIONS.find((section) =>
    section.categories.some((c) => c.id === categoryId)
  )
}

/**
 * Get all section IDs
 */
export function getAllSectionIds(): SectionType[] {
  return SECTIONS.map((s) => s.id)
}

/**
 * Get all category IDs for a section
 */
export function getCategoryIdsForSection(sectionId: SectionType): CategoryType[] {
  const section = getSectionById(sectionId)
  return section ? section.categories.map((c) => c.id) : []
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
