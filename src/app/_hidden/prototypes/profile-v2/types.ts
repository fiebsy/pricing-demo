/**
 * Profile V2 - Extended Types
 *
 * Builds on base profile types with V2-specific additions.
 *
 * @module b/profile-v2/types
 */

// Re-export all base types
export * from '@/app/b/profile/types'

// =============================================================================
// CATEGORY HIGHLIGHT STATE
// =============================================================================

import type { CategoryType, ProfileQuestion, SectionType } from '@/app/b/profile/types'

/**
 * State for category highlighting when a question is clicked
 */
export interface CategoryHighlightState {
  activeQuestion: ProfileQuestion | null
  relatedCategories: CategoryType[]
  unrelatedCategories: CategoryType[]
}

// =============================================================================
// EDIT MODE
// =============================================================================

/**
 * Edit mode state for owner view
 */
export interface EditModeState {
  isEditMode: boolean
  hoveredItem: string | null
}

// =============================================================================
// BIO KEYWORDS
// =============================================================================

/**
 * Highlighted keyword in bio
 */
export interface BioKeyword {
  word: string
  start: number
  end: number
}

// =============================================================================
// SCORE IMPROVEMENTS
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

// =============================================================================
// BENTO LAYOUT
// =============================================================================

/**
 * Bento card size for masonry layout
 */
export type BentoCardSize = 'sm' | 'md' | 'lg'

/**
 * Question card with bento sizing
 */
export interface BentoQuestionCard extends ProfileQuestion {
  size?: BentoCardSize
}

// =============================================================================
// TAB INDICATOR
// =============================================================================

/**
 * Tab section for edit panel
 */
export type EditPanelSection = 'mind' | 'voice'

/**
 * Tab indicator position
 */
export interface TabIndicatorPosition {
  left: number
  width: number
}

// =============================================================================
// COMPONENT PROPS - V2 SPECIFIC
// =============================================================================

/**
 * BentoProfileLayout props
 */
export interface BentoProfileLayoutProps {
  leftPanel?: React.ReactNode
  rightPanel?: React.ReactNode
  bottomLeftPanel?: React.ReactNode
  video?: React.ReactNode
  questions?: React.ReactNode
  footer?: React.ReactNode
  className?: string
}

/**
 * ProfilePanel props
 */
export interface ProfilePanelProps {
  name: string
  avatarUrl: string
  bio: string
  role?: string
  company?: string
  isVerified?: boolean
  className?: string
}

/**
 * ProfileAvatar props
 */
export interface ProfileAvatarProps {
  name: string
  avatarUrl: string
  size?: number
  isVerified?: boolean
  className?: string
}

/**
 * ProfileIdentity props
 */
export interface ProfileIdentityProps {
  name: string
  role?: string
  company?: string
  isVerified?: boolean
  className?: string
}

/**
 * ProfileBio props
 */
export interface ProfileBioProps {
  bio: string
  keywords?: string[]
  onRegenerate?: () => void
  onRefine?: () => void
  className?: string
}

/**
 * BentoGrid props
 */
export interface BentoGridProps {
  children: React.ReactNode
  className?: string
}

/**
 * QuestionCard props
 */
export interface QuestionCardProps {
  question: ProfileQuestion
  onClick?: (question: ProfileQuestion) => void
  isHighlighted?: boolean
  isDimmed?: boolean
  className?: string
}

/**
 * EditPanel props
 */
export interface EditPanelProps {
  scores: import('@/app/b/profile/types').ProfileScores
  activeSection: SectionType
  expandedCategory: CategoryType | null
  onSectionChange: (section: SectionType) => void
  onCategoryToggle: (category: CategoryType) => void
  onImproveCategory: (category: CategoryType, section: SectionType) => void
  className?: string
}

/**
 * SectionTabs V2 props (with sliding indicator)
 */
export interface SectionTabsV2Props {
  activeSection: EditPanelSection
  onSectionChange: (section: EditPanelSection) => void
  className?: string
}

/**
 * CategoryMetrics props
 */
export interface CategoryMetricsProps {
  categories: import('@/app/b/profile/types').CategoryScoreData[]
  expandedCategory: CategoryType | null
  onCategoryToggle: (category: CategoryType) => void
  onImproveCategory: (category: CategoryType) => void
  highlightedCategories?: CategoryType[]
  dimmedCategories?: CategoryType[]
  className?: string
}

/**
 * ScoreImprovement component props
 */
export interface ScoreImprovementProps {
  delta: number
  className?: string
}

/**
 * ScoreToast props
 */
export interface ScoreToastProps {
  title: string
  improvements: ScoreImprovement[]
  onClose: () => void
  className?: string
}

/**
 * FloatingEditControls props
 */
export interface FloatingEditControlsProps {
  onEdit: () => void
  onDelete: () => void
  visible: boolean
  className?: string
}

/**
 * BottomToolbar props
 */
export interface BottomToolbarProps {
  isEditMode: boolean
  onToggleEditMode: () => void
  onSettings?: () => void
  onShare?: () => void
  className?: string
}

/**
 * Confidence signal level (Wi-Fi bars)
 */
export type ConfidenceLevel = 1 | 2 | 3 | 4
