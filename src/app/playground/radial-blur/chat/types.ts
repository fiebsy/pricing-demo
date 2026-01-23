/**
 * Chat Component Types
 *
 * Types for the portable chat container and its subcomponents.
 *
 * @module playground/radial-blur/chat
 */

import type { ChatOverlayState } from '@/app/b/profile/types'
import type { SemanticBgColor, ShineStyle, InputStyleConfig } from '../config/types'

// =============================================================================
// CHAT DISPLAY CONFIG
// =============================================================================

/**
 * Configuration for how chat messages are displayed.
 * Extracted from RadialBlurConfig for portability.
 */
export interface ChatDisplayConfig {
  /** Enable blur background on message bubbles */
  useBlurBubbles: boolean
  /** Blur amount for message bubbles (px) */
  bubbleBlur: number
  /** Assistant bubble background color (semantic) */
  bubbleBgColor: SemanticBgColor
  /** Assistant bubble background opacity (0-100) */
  bubbleOpacity: number
  /** User bubble background color (semantic) */
  userBubbleBgColor: SemanticBgColor
  /** User bubble background opacity (0-100) */
  userBubbleOpacity: number
  /** Height of the fade zone at top of scroll area (px) */
  fadeTopHeight: number
  /** Height of the fade zone at bottom of scroll area (px) */
  fadeBottomHeight: number
  /** Border radius in pixels */
  borderRadius: number
  /** Use asymmetric corners (iOS-style) */
  useAsymmetricCorners: boolean
  /** Use squircle corner-shape */
  useSquircle: boolean
  /** Shine effect style */
  shineStyle: ShineStyle
}

// =============================================================================
// CHAT CONTAINER PROPS
// =============================================================================

/**
 * Props for the portable ChatContainer component.
 */
export interface ChatContainerProps {
  /** Display configuration for messages */
  displayConfig: ChatDisplayConfig
  /** Input field styling configuration */
  inputConfig: InputStyleConfig
  /** Current chat state */
  state: ChatOverlayState
  /** Callback when state changes */
  onStateChange: (state: ChatOverlayState) => void
  /** Maximum width of the chat area */
  maxWidth?: number
  /** Maximum height for messages area */
  messagesMaxHeight?: string
  /** Additional class names */
  className?: string
}

// =============================================================================
// CHAT MESSAGES AREA PROPS
// =============================================================================

export interface ChatMessagesAreaProps {
  /** Display configuration for messages */
  displayConfig: ChatDisplayConfig
  /** Whether to show messages (state !== 'collapsed') */
  showMessages: boolean
  /** Maximum height for messages area */
  maxHeight?: string
  /** Maximum width for centering */
  maxWidth?: number
  /** Additional class names */
  className?: string
}

// =============================================================================
// CHAT STATE INDICATOR PROPS
// =============================================================================

export interface ChatStateIndicatorProps {
  /** Current chat state */
  state: ChatOverlayState
  /** Whether blur bubbles are enabled */
  useBlurBubbles: boolean
  /** Additional class names */
  className?: string
}
