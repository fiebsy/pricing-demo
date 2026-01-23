/**
 * Radial Blur Configuration Types
 *
 * @status incubating
 * @migration-target src/app/b/profile/components/chat/ChatBackdrop.tsx
 */

import type { ChatOverlayState } from '@/app/b/profile/types'

// =============================================================================
// BLUR HEIGHT CONFIG
// =============================================================================

export interface BlurHeightConfig {
  /** Height coverage for default state (0-100, percentage of viewport) */
  default: number
  /** Height coverage for expanded state (0-100, percentage of viewport) */
  expanded: number
  /** How soft the fade edge is (0-100, higher = softer/more gradual fade) */
  fadeEdge: number
}

// =============================================================================
// BLUR STYLE CONFIG
// =============================================================================

export interface BlurStyleConfig {
  /** Blur intensity in pixels */
  blurAmount: number
  /** Background overlay opacity (0-100) */
  overlayOpacity: number
  /** Ellipse width multiplier (100-500) */
  ellipseWidth: number
}

// =============================================================================
// MESSAGE STYLE CONFIG
// =============================================================================

export type SemanticBgColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'quaternary'
  | 'brand-primary'
  | 'brand-secondary'

export type ShineStyle =
  | 'none'
  | 'shine-0'
  | 'shine-0-subtle'
  | 'shine-1'
  | 'shine-1-subtle'
  | 'shine-2'
  | 'shine-2-subtle'
  | 'shine-3'
  | 'shine-3-subtle'
  | 'shine-brand'
  | 'shine-brand-subtle'

export interface MessageStyleConfig {
  /** Enable blur background on message bubbles */
  useBlurBubbles: boolean
  /** Blur amount for message bubbles (px) */
  bubbleBlur: number
  /** Bubble background color (semantic) */
  bubbleBgColor: SemanticBgColor
  /** Bubble background opacity (0-100) */
  bubbleOpacity: number
  /** User bubble background color (semantic) */
  userBubbleBgColor: SemanticBgColor
  /** User bubble background opacity (0-100) */
  userBubbleOpacity: number
  /** Height of the fade zone at top of scroll area (px) */
  fadeTopHeight: number
  /** Height of the fade zone at bottom of scroll area (px) */
  fadeBottomHeight: number
  /** Border radius in pixels (4-32) */
  borderRadius: number
  /** Use asymmetric corners (iOS-style with one smaller corner) */
  useAsymmetricCorners: boolean
  /** Use squircle corner-shape instead of standard rounded */
  useSquircle: boolean
  /** Shine effect style */
  shineStyle: ShineStyle
}

// =============================================================================
// INPUT STYLE CONFIG
// =============================================================================

export interface InputStyleConfig {
  /** Input background color (semantic) */
  bgColor: SemanticBgColor
  /** Input background opacity (0-100) */
  bgOpacity: number
  /** Blur amount for input (px) */
  blurAmount: number
  /** Border radius in pixels */
  borderRadius: number
  /** Use squircle corner-shape */
  useSquircle: boolean
  /** Shine effect style */
  shineStyle: ShineStyle
  /** Shine effect when input is focused */
  focusShineStyle: ShineStyle
  /** Show focus ring */
  showFocusRing: boolean
  /** Icon size in pixels */
  iconSize: number
  /** Icon button size in pixels */
  iconButtonSize: number
  /** Icon button border radius (0 = square, 999 = full) */
  iconButtonRadius: number
  /** Send button background color */
  sendButtonBgColor: SemanticBgColor
  /** Send button opacity */
  sendButtonOpacity: number
  /** Minimum height of input container */
  minHeight: number
  /** Gap between icon buttons */
  iconButtonGap: number
  /** Use ButtonUtility component for icons */
  useButtonUtility: boolean
  /** Show tooltips on icon buttons (requires useButtonUtility) */
  showTooltips: boolean
  /** Shine style on hover for icon buttons */
  hoverShineStyle: ShineStyle
  /** Horizontal offset for control buttons (close/expand) */
  controlButtonsOffsetX: number
  /** Gap between control buttons */
  controlButtonsGap: number
  /** Control button size (xs, sm) */
  controlButtonSize: 'xs' | 'sm'
  /** Control button border radius (0 = square, 999 = full) */
  controlButtonRadius: number
  /** Reverse order of control buttons (expand first, then close) */
  controlButtonsReversed: boolean
  /** Close button icon style */
  closeButtonIcon: 'minus-circle' | 'minus' | 'x' | 'x-circle'
  /** Expand button icon style */
  expandButtonIcon: 'expand' | 'arrows-expand' | 'maximize'
  /** Enable styled container for control buttons */
  controlContainerEnabled: boolean
  /** Control container background color */
  controlContainerBgColor: SemanticBgColor
  /** Control container background opacity (0-100) */
  controlContainerBgOpacity: number
  /** Control container blur amount (px) */
  controlContainerBlurAmount: number
  /** Control container border radius (999 = fully rounded) */
  controlContainerBorderRadius: number
  /** Control container padding (px) */
  controlContainerPadding: number
  /** Control container shine style */
  controlContainerShineStyle: ShineStyle
  /** Control container use squircle */
  controlContainerUseSquircle: boolean
}

// =============================================================================
// COMBINED CONFIG
// =============================================================================

export interface ChatLayoutConfig {
  /** Max width of chat area in pixels */
  maxWidth: number
}

export interface RadialBlurConfig {
  /** Height configuration per state */
  height: BlurHeightConfig
  /** Visual style configuration */
  style: BlurStyleConfig
  /** Message bubble styling */
  messages: MessageStyleConfig
  /** Input field styling */
  input: InputStyleConfig
  /** Chat layout settings */
  layout: ChatLayoutConfig
  /** Current demo state */
  demoState: ChatOverlayState
}

// =============================================================================
// PRESET META
// =============================================================================

export interface RadialBlurPresetMeta {
  id: string
  name: string
  description?: string
  category?: 'default' | 'subtle' | 'dramatic' | 'custom'
  data: RadialBlurConfig
}
