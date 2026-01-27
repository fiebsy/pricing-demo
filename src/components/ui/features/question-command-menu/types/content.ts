/**
 * Question Command Menu V4 - Content Types
 *
 * Defines content types independently from slot positions.
 * Content-first design: configure WHAT appears, then WHERE.
 *
 * Adapted from V3 with cleaner organization.
 */

import type * as React from 'react'

// =============================================================================
// CORE TYPES
// =============================================================================

export type ContentTypeId = 'questions' | 'buttons' | 'filters' | 'tabs' | 'chat' | 'suggestions'
export type SlotPosition = 'top' | 'bottom'

// =============================================================================
// CONTENT INSTANCE
// =============================================================================

/**
 * Content instance - defines WHAT renders WHERE
 */
export interface ContentInstance {
  /** Unique ID for this content */
  id: string
  /** Content type to render */
  type: ContentTypeId
  /** Which slot to render in */
  slot: SlotPosition
}

// =============================================================================
// QUESTION TYPES
// =============================================================================

export interface QuestionStatus {
  type: 'approved' | 'needs-revision' | 'pending' | 'rejected'
  label: string
}

export interface QuestionItem {
  id: string
  text: string
  answer?: string
  status?: QuestionStatus
  icon?: React.ComponentType<{ className?: string }>
}

export interface QuestionGroup {
  id: string
  label: string
  items: QuestionItem[]
}

// =============================================================================
// QUESTION ITEM CONFIG
// =============================================================================

export interface QuestionItemConfig {
  height: number
  gap: number
  paddingX: number
  paddingY: number
  borderRadius: number
  highlightBackground: BackgroundOption
  hoverBackground: BackgroundOption
  iconSize: number
  iconGap: number
  iconOpacity: number
}

export interface QuestionsConfig {
  item: QuestionItemConfig
  emptyMessage?: string
}

// =============================================================================
// BUTTONS CONFIG
// =============================================================================

export type ActionButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'shine'
export type ActionButtonIcon = 'check' | 'edit' | 'sparkle' | 'close' | 'refresh' | 'send' | 'none'
export type ButtonSize = 'xs' | 'sm' | 'md'

export interface ActionButtonConfig {
  id: string
  label: string
  icon: ActionButtonIcon
  variant: ActionButtonVariant
  enabled: boolean
  /** Whether button shows loading spinner (from flow state override) */
  isLoading?: boolean
  /** Whether button is disabled (from flow state override) */
  disabled?: boolean
}

export interface ButtonsConfig {
  buttons: ActionButtonConfig[]
  direction: 'horizontal' | 'vertical'
  gap?: number
  size: ButtonSize
  paddingLeft: number
  paddingRight: number
  paddingTop: number
  paddingBottom: number
}

// =============================================================================
// FILTERS/TABS CONFIG
// =============================================================================

export interface FilterOption {
  id: string
  label: string
  icon?: React.ComponentType<{ className?: string }>
  count?: number
}

export interface FiltersConfig {
  options: FilterOption[]
  defaultValue?: string
}

// =============================================================================
// CHAT CONFIG
// =============================================================================

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  isStreaming?: boolean
  confidence?: number
}

export type ResponseActionId = 'copy' | 'regenerate' | 'speak'

export interface ResponseAction {
  id: ResponseActionId
  enabled: boolean
}

export interface ChatConfig {
  message: {
    paddingX: number
    paddingY: number
    gap: number
    borderRadius: number
    maxWidth: number
    squircle: boolean
  }
  container: {
    paddingTop: number
    paddingBottom: number
  }
  userMessage: {
    background: BackgroundOption
    textColor: 'primary' | 'secondary' | 'tertiary' | 'on-brand'
    shine: ShineOption
  }
  assistantMessage: {
    background: BackgroundOption
    textColor: 'primary' | 'secondary' | 'tertiary'
    shine: ShineOption
  }
  responseActions: {
    enabled: boolean
    actions: ResponseAction[]
  }
  showTypingIndicator: boolean
  emptyMessage?: string
}

// =============================================================================
// SUGGESTIONS CONFIG
// =============================================================================

export interface SuggestionItem {
  id: string
  text: string
  confidence: number
  category?: string
}

export interface SuggestionItemConfig {
  height: number
  gap: number
  paddingX: number
  paddingY: number
  borderRadius: number
  /** Background when item is highlighted/focused */
  highlightBackground: BackgroundOption
  /** Background on hover */
  hoverBackground: BackgroundOption
  /** Whether to show confidence badge */
  showConfidence: boolean
}

export interface SuggestionsConfig {
  maxWords: number
  showSearch: boolean
  item: SuggestionItemConfig
  emptyMessage?: string
}

// =============================================================================
// COMBINED CONTENT CONFIGS
// =============================================================================

export interface ContentConfigs {
  questions: QuestionsConfig
  buttons: ButtonsConfig
  filters: FiltersConfig
  tabs: FiltersConfig
  chat: ChatConfig
  suggestions: SuggestionsConfig
}

// =============================================================================
// APPEARANCE OPTIONS (shared)
// =============================================================================

export type BackgroundOption =
  | 'none'
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'quaternary'

export type BorderColorOption =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'quaternary'
  | 'brand'

export type ShineOption =
  | 'none'
  | 'shine-1'
  | 'shine-1-subtle'
  | 'shine-2'
  | 'shine-2-subtle'
  | 'shine-3'
  | 'shine-brand'
