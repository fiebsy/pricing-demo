/**
 * Quick Fix Interactions - Preset Definitions
 *
 * @module playground/quick-fix-interactions/config
 */

import type { QuickFixInteractionsConfig, QuickFixPresetMeta } from './types'

// =============================================================================
// DEFAULT CONFIGURATION
// =============================================================================

export const DEFAULT_QUICK_FIX_CONFIG: QuickFixInteractionsConfig = {
  // Card appearance
  card: {
    width: 320,
    height: 180,
    padding: 24,
    borderRadius: 32,
    stackOffset: 8,
    stackScale: 0.05,
    visibleCards: 3,
    background: 'primary',
    border: true,
    borderColor: 'primary',
    shadow: 'lg',
    shine: 'none',
    shineIntensity: '',
    cornerShape: 'squircle',
    fontSize: 'text-lg',
    fontWeight: 'font-medium',
    textColor: 'primary',
  },

  // Swipe behavior
  swipe: {
    swipeThreshold: 100,
    velocityThreshold: 0.5,
    exitDistance: 400,
    exitRotation: 15,
    exitDuration: 200,
    returnDuration: 300,
    maxRotation: 15,
    rotationFactor: 0.05,
    scaleOnDrag: 1.02,
    showOverlay: true,
    overlayOpacity: 10,
  },

  // Action buttons
  actionButtons: {
    displayMode: 'text-only',
    size: 56,
    iconSize: 'lg',
    useProdButton: true,
    prodButtonSize: 'lg',
    prodButtonRoundness: 'squircle',
    prodTrueVariant: 'tertiary-success',
    prodFalseVariant: 'tertiary-destructive',
    trueBackground: 'success-primary/10',
    falseBackground: 'error-primary/10',
    trueColor: 'success-primary',
    falseColor: 'error-primary',
    borderRadius: 28,
    hoverScale: 1.05,
    pressScale: 0.95,
    showRipple: true,
    trueLabel: 'True',
    falseLabel: 'False',
  },

  // Progress indicator
  progress: {
    height: 6,
    borderRadius: 3,
    background: 'tertiary/20',
    fillColor: 'brand-primary',
    animateFill: true,
    fillDuration: 300,
    showCount: true,
    showLabel: true,
    labelPosition: 'above',
  },

  // Completion state
  completion: {
    iconSize: 64,
    iconBackground: 'success-primary/10',
    iconColor: 'success-primary',
    bulletStyle: 'dot',
    bulletColor: 'brand-primary',
    bulletSpacing: 8,
    buttonStyle: 'solid',
    buttonSize: 'md',
  },

  // Toast
  toast: {
    padding: 16,
    gap: 12,
    borderRadius: 16,
    iconContainerSize: 40,
    background: 'secondary',
    shine: 'shine-1',
    shineIntensity: '-subtle',
    cornerShape: 'squircle',
    titleSize: 'text-sm',
    titleWeight: 'font-semibold',
    titleColor: 'primary',
    subtitleSize: 'text-xs',
    subtitleWeight: 'font-normal',
    subtitleColor: 'tertiary',
    iconSize: 20,
    iconColor: 'success-primary',
    iconContainerBackground: 'success-primary/10',
    animationDirection: 'right',
    animationDuration: 300,
  },

  // Island bar
  island: {
    padding: 10,
    gap: 12,
    borderRadius: 9999,
    background: 'rgba(26, 26, 26, 0.9)',
    backdropBlur: 12,
    border: true,
    borderColor: 'white/10',
    showUpload: true,
    showScore: true,
    showConfidence: true,
    showNotifications: true,
    wheelSize: 28,
    wheelStrokeWidth: 2.5,
    showNotificationPanel: true,
  },

  // Flow method options
  flowOptions: {
    cardPadding: 16,
    cardBorderRadius: 12,
    cardGap: 12,
    shine: 'none',
    shineIntensity: '',
    cornerShape: 'round',
    iconSize: 20,
    iconCircleSize: 40,
    iconCircleBackground: 'brand-primary/10',
    labelSize: 'text-sm',
    descriptionSize: 'text-xs',
    hoverBackground: 'tertiary',
    selectedBackground: 'brand-primary/10',
    selectedBorder: 'brand-primary',
  },

  // Preview mode
  previewMode: 'card-stack',
}

// =============================================================================
// PRESET DEFINITIONS
// =============================================================================

export const QUICK_FIX_PRESETS: QuickFixPresetMeta[] = [
  {
    id: 'default',
    name: 'Default',
    category: 'default',
    description: 'Standard Tinder-style cards',
    data: DEFAULT_QUICK_FIX_CONFIG,
  },
]

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

export const getPresetById = (id: string): QuickFixPresetMeta | undefined =>
  QUICK_FIX_PRESETS.find((p) => p.id === id)

export const getPresetsByCategory = (category: string): QuickFixPresetMeta[] =>
  QUICK_FIX_PRESETS.filter((p) => p.category === category)
