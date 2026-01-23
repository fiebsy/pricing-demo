/**
 * Profile V3 - Types
 *
 * Flat 5-category structure for gamified profile completion.
 * Each category is weighted equally (20% each).
 *
 * Categories:
 * 1. Career - What you've done (LinkedIn, resume, work history)
 * 2. Skills - What you can do (projects, repos, certifications)
 * 3. Growth - How you think (posts, journals, reflections)
 * 4. Business - How you lead (decks, plans, case studies)
 * 5. Voice - How you express (video, audio, writing samples)
 *
 * @module b/profile-v3/types
 */

// =============================================================================
// CATEGORY TYPES (Flat 5-category structure)
// =============================================================================

/**
 * The 5 main categories (20% weight each)
 */
export type CategoryType = 'career' | 'skills' | 'growth' | 'business' | 'voice'

/**
 * All category IDs as array for iteration
 */
export const CATEGORY_IDS: CategoryType[] = [
  'career',
  'skills',
  'growth',
  'business',
  'voice',
]

// =============================================================================
// SCORE TYPES
// =============================================================================

/**
 * Individual score value with benchmark comparison
 */
export interface ScoreValue {
  /** Current score 0-100 */
  current: number
  /** Network average for comparison */
  networkAverage: number
}

/**
 * Sub-score item within a category
 */
export interface SubScoreItem {
  id: string
  label: string
  score: ScoreValue
}

/**
 * Category with aggregate and sub-scores
 */
export interface CategoryScoreData {
  categoryId: CategoryType
  label: string
  icon: string
  aggregate: ScoreValue
  subScores: SubScoreItem[]
}

/**
 * All profile scores with flat category structure
 */
export interface ProfileScores {
  overall: ScoreValue
  categories: Record<CategoryType, CategoryScoreData>
}

// =============================================================================
// UPLOAD SUGGESTION TYPES
// =============================================================================

/**
 * Upload suggestion with impact score
 */
export interface UploadSuggestion {
  id: string
  label: string
  description: string
  icon: string
  impactScore: number // 1-10, higher = more impact
}

/**
 * Upload suggestions mapped by category
 */
export type CategoryUploadSuggestions = Record<CategoryType, UploadSuggestion[]>

// =============================================================================
// PROFILE TYPES
// =============================================================================

/**
 * Profile question with category link
 */
export interface ProfileQuestion {
  id: string
  text: string
  linkedCategory: CategoryType
}

/**
 * Complete profile data
 */
export interface ProfileData {
  id: string
  name: string
  avatarUrl: string
  bio: string
  questions: ProfileQuestion[]
  scores: ProfileScores
}

// =============================================================================
// UI STATE TYPES
// =============================================================================

/**
 * Chat overlay expansion states
 */
export type ChatOverlayState = 'collapsed' | 'default' | 'expanded'

/**
 * Revision flow types
 */
export type RevisionFlowType = 'quick-fix' | 'add-to-mind' | 'manual-fix'

/**
 * Revision modal state
 */
export interface RevisionModalState {
  isOpen: boolean
  flowType: RevisionFlowType | null
  targetCategory: CategoryType | null
}

/**
 * Updates island data
 */
export interface UpdatesIslandData {
  pendingFiles: number
  pendingUpdates: number
}

// =============================================================================
// COMPONENT PROP TYPES
// =============================================================================

export interface ScoreProgressBarProps {
  value: number
  networkAverage?: number
  showBenchmark?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export interface AggregateScoreProps {
  score: ScoreValue
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export interface CategoryScoreProps {
  category: CategoryScoreData
  isExpanded: boolean
  onToggle: () => void
  onImprove: () => void
  className?: string
}

export interface SubScoreProps {
  item: SubScoreItem
  index: number
  className?: string
}

export interface CategoryTabsProps {
  activeCategory: CategoryType
  onCategoryChange: (category: CategoryType) => void
  className?: string
}

export interface ConfidencePanelProps {
  scores: ProfileScores
  activeCategory: CategoryType
  expandedSubScore: string | null
  onCategoryChange: (category: CategoryType) => void
  onSubScoreToggle: (subScoreId: string) => void
  onImproveCategory: (category: CategoryType) => void
  className?: string
}

export interface CharacterAvatarProps {
  name: string
  avatarUrl: string
  className?: string
}

export interface BioSectionProps {
  bio: string
  questions: ProfileQuestion[]
  onQuestionClick: (question: ProfileQuestion) => void
  className?: string
}

export interface ChatOverlayProps {
  state: ChatOverlayState
  onStateChange: (state: ChatOverlayState) => void
  className?: string
}

export interface RevisionModalProps {
  isOpen: boolean
  flowType: RevisionFlowType | null
  targetCategory: CategoryType | null
  onClose: () => void
  onComplete: () => void
}

export interface UpdatesIslandProps {
  data: UpdatesIslandData
  onClick?: () => void
  className?: string
}

// =============================================================================
// CHAT MESSAGE TYPES
// =============================================================================

/**
 * Chat message role
 */
export type MessageRole = 'user' | 'assistant'

/**
 * Chat message status
 */
export type MessageStatus = 'sending' | 'streaming' | 'complete'

/**
 * Individual chat message
 */
export interface ChatMessage {
  id: string
  role: MessageRole
  content: string
  status: MessageStatus
  timestamp: Date
  confidence?: number // For assistant messages
}

// =============================================================================
// EDIT PANEL TYPES
// =============================================================================


// =============================================================================
// SCORE IMPROVEMENT TYPES
// =============================================================================

/**
 * Score improvement indicator
 */
export interface ScoreImprovement {
  categoryId: CategoryType
  delta: number
  previousScore: number
  newScore: number
}

/**
 * Confidence signal level (Wi-Fi bars)
 */
export type ConfidenceLevel = 1 | 2 | 3 | 4
