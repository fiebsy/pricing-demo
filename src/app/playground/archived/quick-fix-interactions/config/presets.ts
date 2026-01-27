/**
 * Quick Fix Interactions - Configuration Presets
 */

import type { QuickFixInteractionsConfig } from './types'

// =============================================================================
// DEFAULT CONFIGURATION
// =============================================================================

export const DEFAULT_QUICK_FIX_CONFIG: QuickFixInteractionsConfig = {
  // Preview mode
  previewMode: 'full-flow',
  modalPreviewMode: 'full-flow',
  
  // Card configuration
  card: {
    width: 320,
    height: 400,
    borderRadius: 24,
    background: 'secondary',
    shine: 'shine-1',
    shineIntensity: '-subtle',
    cornerShape: 'squircle',
    textSize: 'text-base',
    textWeight: 'font-medium',
    textColor: 'primary',
    stackOffset: 12,
    stackScale: 0.04,
    maxVisibleCards: 3,
  },
  
  // Swipe configuration
  swipe: {
    dragThreshold: 100,
    velocityThreshold: 0.5,
    rotationFactor: 0.05,
    scaleOnDrag: 1.05,
    animationDuration: 300,
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
  },
  
  // Action buttons
  actionButtons: {
    size: 56,
    gap: 24,
    background: 'secondary',
    shine: 'shine-1',
    shineIntensity: '-subtle',
    cornerShape: 'squircle',
    borderRadius: 20,
    iconSize: 24,
    hoverScale: 1.1,
    pressScale: 0.95,
  },
  
  // Progress bar
  progress: {
    height: 4,
    width: 200,
    background: 'tertiary/20',
    fillColor: 'brand-primary',
    borderRadius: 2,
    animationDuration: 300,
  },
  
  // Flow options
  flowOptions: {
    cardGap: 16,
    cardBorderRadius: 16,
    cardBackground: 'secondary',
    shine: 'shine-1',
    shineIntensity: '-subtle',
    cornerShape: 'squircle',
    iconCircleSize: 56,
  },
  
  // Completion state
  completion: {
    bulletSpacing: 8,
    bulletSize: 'text-sm',
    bulletColor: 'secondary',
    buttonVariant: 'primary',
    buttonSize: 'lg',
    buttonRoundness: 'squircle',
  },
  
  // Status island
  island: {
    showUpload: false,
    showScore: true,
    showConfidence: true,
    showNotifications: true,
    shine: 'shine-2',
    shineIntensity: '-subtle',
    cornerShape: 'squircle',
    borderRadius: 32,
    padding: 16,
    gap: 12,
    wheelSize: 44,
    wheelStrokeWidth: 2.5,
    scoreSize: 'text-2xl',
    scoreWeight: 'font-bold',
  },
  
  // Toast configuration
  toast: {
    animationDuration: 250,
    animationDirection: 'right',
    shine: 'shine-1',
    shineIntensity: '-subtle',
    cornerShape: 'squircle',
  },
}

// =============================================================================
// PRESETS
// =============================================================================

export const QUICK_FIX_PRESETS: Array<{
  id: string
  name: string
  data: QuickFixInteractionsConfig
}> = [
  {
    id: 'default',
    name: 'Default',
    data: DEFAULT_QUICK_FIX_CONFIG,
  },
  {
    id: 'minimal',
    name: 'Minimal',
    data: {
      ...DEFAULT_QUICK_FIX_CONFIG,
      card: {
        ...DEFAULT_QUICK_FIX_CONFIG.card,
        shine: 'none' as const,
        shineIntensity: '' as const,
        cornerShape: 'round' as const,
      },
      actionButtons: {
        ...DEFAULT_QUICK_FIX_CONFIG.actionButtons,
        shine: 'none' as const,
        shineIntensity: '' as const,
        cornerShape: 'round' as const,
      },
      island: {
        ...DEFAULT_QUICK_FIX_CONFIG.island,
        shine: 'none' as const,
        shineIntensity: '' as const,
        cornerShape: 'round' as const,
      },
    } as QuickFixInteractionsConfig,
  },
  {
    id: 'vibrant',
    name: 'Vibrant',
    data: {
      ...DEFAULT_QUICK_FIX_CONFIG,
      card: {
        ...DEFAULT_QUICK_FIX_CONFIG.card,
        shine: 'shine-2' as const,
        shineIntensity: '' as const,
        cornerShape: 'squircle' as const,
      },
      actionButtons: {
        ...DEFAULT_QUICK_FIX_CONFIG.actionButtons,
        shine: 'shine-2' as const,
        shineIntensity: '' as const,
        cornerShape: 'squircle' as const,
        hoverScale: 1.15,
      },
      island: {
        ...DEFAULT_QUICK_FIX_CONFIG.island,
        shine: 'shine-3' as const,
        shineIntensity: '' as const,
        cornerShape: 'squircle' as const,
      },
    } as QuickFixInteractionsConfig,
  },
  {
    id: 'compact',
    name: 'Compact',
    data: {
      ...DEFAULT_QUICK_FIX_CONFIG,
      card: {
        ...DEFAULT_QUICK_FIX_CONFIG.card,
        width: 280,
        height: 360,
        borderRadius: 20,
        textSize: 'text-sm' as const,
      },
      actionButtons: {
        ...DEFAULT_QUICK_FIX_CONFIG.actionButtons,
        size: 48,
        gap: 20,
        iconSize: 20,
      },
      island: {
        ...DEFAULT_QUICK_FIX_CONFIG.island,
        padding: 12,
        gap: 10,
        wheelSize: 40,
        scoreSize: 'text-xl' as const,
      },
    } as QuickFixInteractionsConfig,
  },
]