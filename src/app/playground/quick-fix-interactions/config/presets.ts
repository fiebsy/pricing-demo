/**
 * Quick Fix Interactions - Preset Definitions
 *
 * @module playground/quick-fix-interactions/config
 */

import type {
  QuickFixInteractionsConfig,
  QuickFixPresetMeta,
  SolutionPreset,
  FlowDefinition,
} from './types'

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
    background: 'var(--color-bg-primary)',
    backdropBlur: 12,
    border: true,
    borderColor: 'primary',
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
    cardBorderRadius: 20,
    cardGap: 20,
    shine: 'shine-3',
    shineIntensity: '',
    cornerShape: 'squircle',
    iconSize: 20,
    iconCircleSize: 52,
    iconCircleBackground: 'brand-primary/10',
    labelSize: 'text-sm',
    descriptionSize: 'text-xs',
    hoverBackground: 'tertiary',
    selectedBackground: 'brand-primary/10',
    selectedBorder: 'brand-primary',
  },

  // Preview mode
  previewMode: 'flow-selector',
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

// =============================================================================
// SOLUTION PRESETS
// =============================================================================

/**
 * Default flow definitions shared across presets.
 * Override specific properties per solution as needed.
 */
const BASE_FLOW_DEFINITIONS: FlowDefinition[] = [
  {
    id: 'quick-fix',
    enabled: true,
    label: 'Quick Fix',
    description: 'Answer T/F questions',
    icon: 'SparklesIcon',
  },
  {
    id: 'add-to-mind',
    enabled: true,
    label: 'Add to Mind',
    description: 'Upload files/links/text',
    icon: 'Brain01Icon',
    variant: 'generic',
  },
  {
    id: 'manual-fix',
    enabled: true,
    label: 'Manual Fix',
    description: 'Type or speak',
    icon: 'Edit01Icon',
  },
]

/**
 * Solution A: Edit Questions
 *
 * Modal-based flow for Q&A editing with all 3 flows enabled.
 * Uses generic AddToMind variant (file/link/text upload).
 */
export const EDIT_QUESTIONS_PRESET: SolutionPreset = {
  id: 'edit-questions',
  name: 'Edit Questions',
  solution: 'edit-questions',
  description: 'Modal-based flow for Q&A editing',
  baseConfig: {
    ...DEFAULT_QUICK_FIX_CONFIG,
    card: {
      ...DEFAULT_QUICK_FIX_CONFIG.card,
      width: 280,
      height: 160,
    },
  },
  flowRegistry: {
    flows: BASE_FLOW_DEFINITIONS.map((f) => ({
      ...f,
      // Generic AddToMind for edit-questions
      variant: f.id === 'add-to-mind' ? 'generic' : f.variant,
    })),
    defaultFlow: null,
  },
  integration: {
    mode: 'modal',
    showHeader: true,
    showBackButton: true,
    showCloseButton: true,
    headerTitle: 'Improve Answer',
    showStepIndicator: false,
    onCompleteAction: 'close',
  },
}

/**
 * Solution B: Profile (Category-Aware)
 *
 * Category-aware flow with upload suggestions ranked by impact score.
 * Uses category-aware AddToMind variant with impact scoring.
 */
export const PROFILE_PRESET: SolutionPreset = {
  id: 'profile',
  name: 'Profile (Category-Aware)',
  solution: 'profile-v3',
  description: 'Category-aware flow with impact-ranked upload suggestions',
  baseConfig: {
    ...DEFAULT_QUICK_FIX_CONFIG,
    card: {
      ...DEFAULT_QUICK_FIX_CONFIG.card,
      width: 320,
      height: 180,
    },
  },
  flowRegistry: {
    flows: BASE_FLOW_DEFINITIONS.map((f) =>
      f.id === 'add-to-mind'
        ? {
            ...f,
            description: 'Upload by impact score',
            variant: 'category-aware' as const,
          }
        : f.id === 'quick-fix'
          ? { ...f, description: 'Verify statements' }
          : f
    ),
    defaultFlow: null,
  },
  integration: {
    mode: 'modal',
    showHeader: true,
    showBackButton: true,
    showCloseButton: true,
    headerTitle: 'Improve {category}',
    showStepIndicator: false,
    onCompleteAction: 'toast',
  },
}

/**
 * Standalone preset for playground testing.
 */
export const STANDALONE_PRESET: SolutionPreset = {
  id: 'standalone',
  name: 'Standalone',
  solution: 'standalone',
  description: 'Default playground configuration',
  baseConfig: DEFAULT_QUICK_FIX_CONFIG,
  flowRegistry: {
    flows: BASE_FLOW_DEFINITIONS,
    defaultFlow: null,
  },
  integration: {
    mode: 'inline',
    showHeader: false,
    showBackButton: false,
    showCloseButton: false,
    showStepIndicator: true,
    onCompleteAction: 'toast',
  },
}

/**
 * All available solution presets.
 */
export const SOLUTION_PRESETS: SolutionPreset[] = [
  STANDALONE_PRESET,
  EDIT_QUESTIONS_PRESET,
  PROFILE_PRESET,
]

// =============================================================================
// SOLUTION PRESET UTILITIES
// =============================================================================

export const getSolutionPresetById = (id: string): SolutionPreset | undefined =>
  SOLUTION_PRESETS.find((p) => p.id === id)

export const getSolutionPresetBySolution = (
  solution: 'edit-questions' | 'profile-v3' | 'standalone'
): SolutionPreset | undefined => SOLUTION_PRESETS.find((p) => p.solution === solution)
