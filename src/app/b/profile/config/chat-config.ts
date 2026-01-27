/**
 * Chat Configuration for B Profile
 *
 * Hardened settings from radial-blur playground experimentation.
 * These settings control the chat input, backdrop, and message styling.
 *
 * @module b/profile/config
 */

import type { InputStyleConfig, MessageStyleConfig } from '@/components/ui/features/radial-blur'

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
// CHAT CONFIG
// =============================================================================

export interface ChatConfig {
  /** Height configuration per state */
  height: BlurHeightConfig
  /** Visual style configuration */
  style: BlurStyleConfig
  /** Message bubble styling */
  messages: MessageStyleConfig
  /** Input field styling */
  input: InputStyleConfig
  /** Max width of chat area in pixels */
  maxWidth: number
}

// =============================================================================
// DEFAULT CONFIGURATION
// =============================================================================

export const DEFAULT_CHAT_CONFIG: ChatConfig = {
  height: {
    default: 50,
    expanded: 100,
    fadeEdge: 40,
  },
  style: {
    blurAmount: 20,
    overlayOpacity: 50,
    ellipseWidth: 500,
  },
  messages: {
    useBlurBubbles: true,
    bubbleBlur: 12,
    bubbleBgColor: 'primary',
    bubbleOpacity: 90,
    userBubbleBgColor: 'brand-primary',
    userBubbleOpacity: 80,
    fadeTopHeight: 100,
    fadeBottomHeight: 200,
    borderRadius: 32,
    useAsymmetricCorners: false,
    useSquircle: true,
    shineStyle: 'shine-3',
    inputHeight: 130,
  },
  input: {
    bgColor: 'tertiary',
    bgOpacity: 98,
    blurAmount: 12,
    borderRadius: 24,
    useSquircle: true,
    shineStyle: 'shine-1',
    focusShineStyle: 'shine-3',
    showFocusRing: false,
    iconSize: 20,
    iconButtonSize: 28,
    iconButtonRadius: 24,
    sendButtonBgColor: 'brand-primary',
    sendButtonOpacity: 100,
    minHeight: 64,
    iconButtonGap: 4,
    useButtonUtility: true,
    showTooltips: true,
    hoverShineStyle: 'shine-1',
    controlButtonsOffsetX: 14,
    controlButtonsGap: 4,
    controlButtonSize: 'sm',
    controlButtonRadius: 999,
    controlButtonsReversed: true,
    closeButtonIcon: 'minus',
    expandButtonIcon: 'expand',
    // Control button container
    controlContainerEnabled: true,
    controlContainerBgColor: 'primary',
    controlContainerBgOpacity: 60,
    controlContainerBlurAmount: 12,
    controlContainerBorderRadius: 999,
    controlContainerPadding: 8,
    controlContainerShineStyle: 'shine-1',
    controlContainerUseSquircle: false,
  },
  maxWidth: 550,
}
