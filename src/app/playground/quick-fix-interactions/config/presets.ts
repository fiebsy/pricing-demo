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
    borderRadius: 16,
    stackOffset: 8,
    stackScale: 0.05,
    visibleCards: 3,
    background: 'primary',
    border: true,
    borderColor: 'primary',
    shadow: 'lg',
    shine: 'none',
    shineIntensity: '',
    cornerShape: 'round',
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
    displayMode: 'icon-only',
    size: 56,
    iconSize: 'lg',
    useProdButton: false,
    prodButtonSize: 'lg',
    prodButtonRoundness: 'squircle',
    prodTrueVariant: 'primary-success',
    prodFalseVariant: 'primary-destructive',
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
  {
    id: 'compact',
    name: 'Compact',
    category: 'compact',
    description: 'Smaller cards for dense layouts',
    data: {
      ...DEFAULT_QUICK_FIX_CONFIG,
      card: {
        ...DEFAULT_QUICK_FIX_CONFIG.card,
        width: 280,
        height: 140,
        padding: 16,
        borderRadius: 12,
        stackOffset: 6,
        fontSize: 'text-base',
      },
      actionButtons: {
        ...DEFAULT_QUICK_FIX_CONFIG.actionButtons,
        size: 44,
        iconSize: 'md',
        borderRadius: 22,
        prodButtonSize: 'md',
      },
      progress: {
        ...DEFAULT_QUICK_FIX_CONFIG.progress,
        height: 4,
        borderRadius: 2,
      },
      toast: {
        ...DEFAULT_QUICK_FIX_CONFIG.toast,
        padding: 12,
        gap: 10,
        borderRadius: 12,
        iconContainerSize: 32,
      },
    },
  },
  {
    id: 'playful',
    name: 'Playful',
    category: 'playful',
    description: 'Dramatic swipe animations',
    data: {
      ...DEFAULT_QUICK_FIX_CONFIG,
      card: {
        ...DEFAULT_QUICK_FIX_CONFIG.card,
        borderRadius: 24,
        shadow: '2xl',
        shine: 'shine-2',
        shineIntensity: '',
        cornerShape: 'squircle',
      },
      swipe: {
        ...DEFAULT_QUICK_FIX_CONFIG.swipe,
        swipeThreshold: 80,
        exitDistance: 500,
        exitRotation: 25,
        maxRotation: 20,
        rotationFactor: 0.08,
        scaleOnDrag: 1.05,
        overlayOpacity: 20,
      },
      actionButtons: {
        ...DEFAULT_QUICK_FIX_CONFIG.actionButtons,
        size: 64,
        iconSize: 'xl',
        hoverScale: 1.1,
        displayMode: 'icon-text',
        useProdButton: true,
        prodButtonRoundness: 'pill',
      },
      toast: {
        ...DEFAULT_QUICK_FIX_CONFIG.toast,
        shine: 'shine-2',
        shineIntensity: '',
        cornerShape: 'squircle',
        borderRadius: 20,
      },
    },
  },
  {
    id: 'minimal',
    name: 'Minimal',
    category: 'minimal',
    description: 'Clean, subtle interactions',
    data: {
      ...DEFAULT_QUICK_FIX_CONFIG,
      card: {
        ...DEFAULT_QUICK_FIX_CONFIG.card,
        border: false,
        shadow: 'md',
        borderRadius: 12,
        shine: 'none',
        shineIntensity: '',
      },
      swipe: {
        ...DEFAULT_QUICK_FIX_CONFIG.swipe,
        exitRotation: 8,
        maxRotation: 8,
        rotationFactor: 0.03,
        scaleOnDrag: 1,
        showOverlay: false,
      },
      actionButtons: {
        ...DEFAULT_QUICK_FIX_CONFIG.actionButtons,
        borderRadius: 12,
        showRipple: false,
        displayMode: 'text-only',
        useProdButton: true,
        prodButtonRoundness: 'default',
      },
      island: {
        ...DEFAULT_QUICK_FIX_CONFIG.island,
        border: false,
        backdropBlur: 8,
      },
      toast: {
        ...DEFAULT_QUICK_FIX_CONFIG.toast,
        shine: 'none',
        shineIntensity: '',
        cornerShape: 'round',
      },
      flowOptions: {
        ...DEFAULT_QUICK_FIX_CONFIG.flowOptions,
        shine: 'none',
        shineIntensity: '',
      },
    },
  },
  {
    id: 'premium',
    name: 'Premium',
    category: 'premium',
    description: 'Refined, polished appearance',
    data: {
      ...DEFAULT_QUICK_FIX_CONFIG,
      card: {
        ...DEFAULT_QUICK_FIX_CONFIG.card,
        width: 360,
        height: 200,
        padding: 32,
        borderRadius: 20,
        shadow: 'xl',
        background: 'secondary',
        shine: 'shine-1',
        shineIntensity: '-subtle',
        cornerShape: 'squircle',
      },
      swipe: {
        ...DEFAULT_QUICK_FIX_CONFIG.swipe,
        exitDuration: 250,
        returnDuration: 350,
      },
      actionButtons: {
        ...DEFAULT_QUICK_FIX_CONFIG.actionButtons,
        size: 60,
        borderRadius: 16,
        useProdButton: true,
        prodButtonSize: 'lg',
        prodButtonRoundness: 'squircle',
        displayMode: 'icon-text',
      },
      completion: {
        ...DEFAULT_QUICK_FIX_CONFIG.completion,
        iconSize: 72,
        bulletStyle: 'check',
        buttonSize: 'lg',
      },
      island: {
        ...DEFAULT_QUICK_FIX_CONFIG.island,
        padding: 12,
        gap: 16,
      },
      toast: {
        ...DEFAULT_QUICK_FIX_CONFIG.toast,
        padding: 20,
        gap: 16,
        borderRadius: 20,
        shine: 'shine-1',
        shineIntensity: '-subtle',
        cornerShape: 'squircle',
        iconContainerSize: 48,
      },
      flowOptions: {
        ...DEFAULT_QUICK_FIX_CONFIG.flowOptions,
        shine: 'shine-1',
        shineIntensity: '-subtle',
        cornerShape: 'squircle',
        cardBorderRadius: 16,
      },
    },
  },
]

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

export const getPresetById = (id: string): QuickFixPresetMeta | undefined =>
  QUICK_FIX_PRESETS.find((p) => p.id === id)

export const getPresetsByCategory = (category: string): QuickFixPresetMeta[] =>
  QUICK_FIX_PRESETS.filter((p) => p.category === category)
