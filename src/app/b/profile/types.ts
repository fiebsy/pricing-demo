/**
 * Video Game Profile Editor - Types
 *
 * TypeScript interfaces for the RPG-style profile scoring system.
 * Supports a 3-tier hierarchy: Sections > Categories > SubScores
 *
 * @module b/profile/types
 */

// =============================================================================
// SECTION TYPES (Top Level)
// =============================================================================

/**
 * The 3 main sections: Mind, Voice, Appearance
 */
export type SectionType = 'mind' | 'voice' | 'appearance'

// =============================================================================
// CATEGORY TYPES (Second Level - within Sections)
// =============================================================================

/**
 * Mind section categories
 */
export type MindCategory = 'career' | 'growth' | 'skills' | 'business'

/**
 * Voice section categories
 */
export type VoiceCategory = 'tone' | 'style' | 'personality' | 'responses'

/**
 * Appearance section categories
 */
export type AppearanceCategory = 'visual' | 'branding' | 'presentation' | 'media'

/**
 * All category types combined
 */
export type CategoryType = MindCategory | VoiceCategory | AppearanceCategory

/**
 * Legacy type for backwards compatibility
 * @deprecated Use CategoryType instead
 */
export type ScoreCategory = CategoryType

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
 * Sub-score item within a category (third level)
 */
export interface SubScoreItem {
  id: string
  label: string
  score: ScoreValue
}

/**
 * Category with aggregate and sub-scores (second level)
 */
export interface CategoryScoreData {
  categoryId: CategoryType
  label: string
  icon: string
  aggregate: ScoreValue
  subScores: SubScoreItem[]
}

/**
 * Section containing categories (top level)
 */
export interface SectionData {
  sectionId: SectionType
  label: string
  icon: string
  aggregate: ScoreValue
  categories: CategoryScoreData[]
}

/**
 * All profile scores with section-based hierarchy
 */
export interface ProfileScores {
  overall: ScoreValue
  sections: SectionData[]
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
  linkedSection: SectionType
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
  targetSection: SectionType | null
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

export interface SectionTabsProps {
  sections: SectionData[]
  activeSection: SectionType
  onSectionChange: (section: SectionType) => void
  overallScore?: ScoreValue
  className?: string
}

export interface ConfidencePanelProps {
  scores: ProfileScores
  activeSection: SectionType
  expandedCategory: CategoryType | null
  onSectionChange: (section: SectionType) => void
  onCategoryToggle: (category: CategoryType) => void
  onImproveCategory: (category: CategoryType, section: SectionType) => void
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
  /** Callback when "Improve answer" button is clicked on a message */
  onImproveAnswer?: (message: ChatMessage) => void
  /** Callback when an assistant answer completes (for tracking confidence changes) */
  onAnswerComplete?: (message: ChatMessage) => void
  className?: string
}

export interface RevisionModalProps {
  isOpen: boolean
  flowType: RevisionFlowType | null
  targetCategory: CategoryType | null
  targetSection: SectionType | null
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
// CHAT COMPONENT PROP TYPES
// =============================================================================

export interface ChatBackdropProps {
  state: ChatOverlayState
  onClose?: () => void
  className?: string
}

export interface MessageBubbleProps {
  message: ChatMessage
  className?: string
}

export interface MessageListProps {
  messages: ChatMessage[]
  isTyping: boolean
  className?: string
}

export interface ChatInputProps {
  onSend: (content: string) => void
  onFocus?: () => void
  onBlur?: () => void
  disabled?: boolean
  className?: string
}
