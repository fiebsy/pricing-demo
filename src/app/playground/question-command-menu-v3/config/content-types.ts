/**
 * Question Command Menu V3 - Content Type Definitions
 *
 * Defines content types independently from slot positions.
 * Content-first design: configure WHAT appears, then WHERE.
 */

import type * as React from 'react'

// ============================================================================
// CORE TYPES
// ============================================================================

export type ContentTypeId = 'questions' | 'buttons' | 'filters' | 'tabs' | 'chat' | 'suggestions'
export type SlotPosition = 'top' | 'bottom'

// ============================================================================
// CONTENT INSTANCE
// ============================================================================

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

// ============================================================================
// QUESTION TYPES (shared with V2)
// ============================================================================

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

// ============================================================================
// QUESTION ITEM CONFIG
// ============================================================================

export interface QuestionItemConfig {
  /** Item height */
  height: number
  /** Gap between items */
  gap: number
  /** Horizontal padding */
  paddingX: number
  /** Vertical padding */
  paddingY: number
  /** Item border radius */
  borderRadius: number
  /** Highlight background (keyboard/selected) */
  highlightBackground: BackgroundOption
  /** Hover background */
  hoverBackground: BackgroundOption
  /** Icon size */
  iconSize: number
  /** Gap between icon and text */
  iconGap: number
  /** Icon opacity (0-100) */
  iconOpacity: number
}

// ============================================================================
// QUESTIONS CONTENT CONFIG
// ============================================================================

export interface QuestionsConfig {
  /** Question item styling */
  item: QuestionItemConfig
  /** Empty state message */
  emptyMessage?: string
}

// ============================================================================
// BUTTONS CONTENT CONFIG
// ============================================================================

export type ActionButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'shine'
export type ActionButtonIcon = 'check' | 'edit' | 'sparkle' | 'close' | 'refresh' | 'send' | 'none'

export interface ActionButtonConfig {
  id: string
  label: string
  icon: ActionButtonIcon
  variant: ActionButtonVariant
  enabled: boolean
}

export type ButtonSize = 'xs' | 'sm' | 'md'

export interface ButtonsConfig {
  /** Button definitions */
  buttons: ActionButtonConfig[]
  /** Layout direction */
  direction: 'horizontal' | 'vertical'
  /** Gap between buttons */
  gap?: number
  /** Button size */
  size: ButtonSize
  /** Padding left */
  paddingLeft: number
  /** Padding right */
  paddingRight: number
  /** Padding top */
  paddingTop: number
  /** Padding bottom */
  paddingBottom: number
}

// ============================================================================
// FILTERS/TABS CONTENT CONFIG
// ============================================================================

export interface FilterOption {
  id: string
  label: string
  icon?: React.ComponentType<{ className?: string }>
  count?: number
}

export interface FiltersConfig {
  /** Filter options */
  options: FilterOption[]
  /** Default selected value */
  defaultValue?: string
}

// ============================================================================
// CHAT CONTENT CONFIG
// ============================================================================

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
  /** Message bubble styling */
  message: {
    /** Padding X inside bubbles */
    paddingX: number
    /** Padding Y inside bubbles */
    paddingY: number
    /** Gap between messages */
    gap: number
    /** Border radius for bubbles */
    borderRadius: number
    /** Max width for bubbles (percentage) */
    maxWidth: number
    /** Use squircle corners */
    squircle: boolean
  }
  /** Container padding */
  container: {
    /** Padding at top of chat window */
    paddingTop: number
    /** Padding at bottom of chat window */
    paddingBottom: number
  }
  /** User message appearance */
  userMessage: {
    background: BackgroundOption
    textColor: 'primary' | 'secondary' | 'tertiary' | 'on-brand'
    /** Shine effect */
    shine: ShineOption
  }
  /** Assistant message appearance */
  assistantMessage: {
    background: BackgroundOption
    textColor: 'primary' | 'secondary' | 'tertiary'
    /** Shine effect */
    shine: ShineOption
  }
  /** Response actions shown below assistant messages */
  responseActions: {
    enabled: boolean
    actions: ResponseAction[]
  }
  /** Show typing indicator */
  showTypingIndicator: boolean
  /** Empty state message */
  emptyMessage?: string
}

// ============================================================================
// COMBINED CONTENT CONFIGS
// ============================================================================

// ============================================================================
// SUGGESTIONS CONTENT CONFIG
// ============================================================================

export interface SuggestionItem {
  id: string
  text: string
  confidence: number  // 0-1
  category?: string
}

export interface SuggestionsConfig {
  maxWords: number  // 15
  showSearch: boolean
  item: {
    height: number
    gap: number
    paddingX: number
    paddingY: number
    borderRadius: number
  }
  emptyMessage?: string
}

// ============================================================================
// COMBINED CONTENT CONFIGS
// ============================================================================

export interface ContentConfigs {
  questions: QuestionsConfig
  buttons: ButtonsConfig
  filters: FiltersConfig
  tabs: FiltersConfig
  chat: ChatConfig
  suggestions: SuggestionsConfig
}

// ============================================================================
// BACKGROUND & APPEARANCE OPTIONS (shared)
// ============================================================================

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
