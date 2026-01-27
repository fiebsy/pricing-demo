/**
 * Radial Blur Presets
 *
 * Preset categories:
 * - default: Standard starting point (current ChatBackdrop defaults)
 * - subtle: Minimal blur effect
 * - dramatic: Strong, cinematic blur
 * - custom: User-defined variations
 */

import type { RadialBlurConfig, RadialBlurPresetMeta } from './types'

export const DEFAULT_RADIAL_BLUR_CONFIG: RadialBlurConfig = {
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
    bubbleOpacity: 70,
    userBubbleBgColor: 'brand-primary',
    userBubbleOpacity: 20,
    fadeTopHeight: 100,
    fadeBottomHeight: 80,
    borderRadius: 32,
    useAsymmetricCorners: false,
    useSquircle: true,
    shineStyle: 'shine-3',
  },
  input: {
    bgColor: 'secondary',
    bgOpacity: 80,
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
    minHeight: 54,
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
  layout: {
    maxWidth: 550,
  },
  demoState: 'default',
}

export const RADIAL_BLUR_PRESETS: RadialBlurPresetMeta[] = [
  {
    id: 'default',
    name: 'Default',
    category: 'default',
    description: 'Standard radial blur configuration',
    data: DEFAULT_RADIAL_BLUR_CONFIG,
  },
]

export const getPresetById = (id: string): RadialBlurPresetMeta | undefined =>
  RADIAL_BLUR_PRESETS.find((p) => p.id === id)

export const getPresetsByCategory = (category: string): RadialBlurPresetMeta[] =>
  RADIAL_BLUR_PRESETS.filter((p) => p.category === category)
