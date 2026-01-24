/**
 * Quick Fix Modal - Preset Definitions
 *
 * Solution presets for Edit Questions and Profile V3 integrations.
 *
 * @module playground/quick-fix-modal/config
 */

import type {
  QuickFixModalConfig,
  ModalSolutionPreset,
  QuickFixModalPresetMeta,
  FlowDefinition,
} from './types'
import { DEFAULT_QUICK_FIX_MODAL_CONFIG } from './defaults'

// =============================================================================
// BASE FLOW DEFINITIONS
// =============================================================================

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

// =============================================================================
// SOLUTION A: EDIT QUESTIONS
// =============================================================================

/**
 * Edit Questions preset - Modal-based flow for Q&A editing.
 * Uses generic AddToMind variant (file/link/text upload).
 */
export const EDIT_QUESTIONS_MODAL_PRESET: ModalSolutionPreset = {
  id: 'edit-questions',
  name: 'Edit Questions',
  solution: 'edit-questions',
  description: 'Modal-based flow for Q&A editing with subtle styling',
  config: {
    ...DEFAULT_QUICK_FIX_MODAL_CONFIG,
    modal: {
      ...DEFAULT_QUICK_FIX_MODAL_CONFIG.modal,
      maxWidth: 480,
      goldBorder: false,
      shine: 'shine-2',
      shineIntensity: '-subtle',
    },
    card: {
      ...DEFAULT_QUICK_FIX_MODAL_CONFIG.card,
      width: 280,
      height: 160,
    },
  },
  flowRegistry: {
    flows: BASE_FLOW_DEFINITIONS.map((f) => ({
      ...f,
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

// =============================================================================
// SOLUTION B: PROFILE V3
// =============================================================================

/**
 * Profile V3 preset - Category-aware flow with premium styling.
 * Uses category-aware AddToMind variant with impact scoring.
 */
export const PROFILE_MODAL_PRESET: ModalSolutionPreset = {
  id: 'profile-v3',
  name: 'Profile V3',
  solution: 'profile-v3',
  description: 'Premium modal with gold border and category-aware flows',
  config: {
    ...DEFAULT_QUICK_FIX_MODAL_CONFIG,
    modal: {
      ...DEFAULT_QUICK_FIX_MODAL_CONFIG.modal,
      maxWidth: 520,
      goldBorder: true, // Premium appearance
      shine: 'shine-3',
      shineIntensity: '',
    },
    card: {
      ...DEFAULT_QUICK_FIX_MODAL_CONFIG.card,
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
    headerTitle: 'Improve {category}', // Dynamic substitution
    showStepIndicator: false,
    onCompleteAction: 'toast',
  },
}

// =============================================================================
// STANDALONE PRESET
// =============================================================================

/**
 * Standalone preset - Default playground configuration.
 */
export const STANDALONE_MODAL_PRESET: ModalSolutionPreset = {
  id: 'standalone',
  name: 'Standalone',
  solution: 'standalone',
  description: 'Default playground configuration for testing',
  config: DEFAULT_QUICK_FIX_MODAL_CONFIG,
  flowRegistry: {
    flows: BASE_FLOW_DEFINITIONS,
    defaultFlow: null,
  },
  integration: {
    mode: 'modal',
    showHeader: true,
    showBackButton: true,
    showCloseButton: true,
    showStepIndicator: true,
    onCompleteAction: 'toast',
  },
}

// =============================================================================
// ALL SOLUTION PRESETS
// =============================================================================

export const MODAL_SOLUTION_PRESETS: ModalSolutionPreset[] = [
  STANDALONE_MODAL_PRESET,
  EDIT_QUESTIONS_MODAL_PRESET,
  PROFILE_MODAL_PRESET,
]

// =============================================================================
// PRESET METADATA (for control panel)
// =============================================================================

export const QUICK_FIX_MODAL_PRESETS: QuickFixModalPresetMeta[] = [
  {
    id: 'default',
    name: 'Default',
    category: 'default',
    description: 'Standard modal configuration',
    data: DEFAULT_QUICK_FIX_MODAL_CONFIG,
  },
  {
    id: 'edit-questions',
    name: 'Edit Questions',
    category: 'edit-questions',
    description: 'Subtle styling for Q&A editing',
    data: EDIT_QUESTIONS_MODAL_PRESET.config,
  },
  {
    id: 'profile-v3',
    name: 'Profile V3',
    category: 'profile',
    description: 'Premium modal with gold border',
    data: PROFILE_MODAL_PRESET.config,
  },
  {
    id: 'minimal',
    name: 'Minimal',
    category: 'minimal',
    description: 'Clean, minimal appearance',
    data: {
      ...DEFAULT_QUICK_FIX_MODAL_CONFIG,
      modal: {
        ...DEFAULT_QUICK_FIX_MODAL_CONFIG.modal,
        shine: 'none',
        cornerShape: 'round',
        goldBorder: false,
      },
    },
  },
  {
    id: 'premium',
    name: 'Premium',
    category: 'premium',
    description: 'Full premium appearance',
    data: {
      ...DEFAULT_QUICK_FIX_MODAL_CONFIG,
      modal: {
        ...DEFAULT_QUICK_FIX_MODAL_CONFIG.modal,
        shine: 'shine-3',
        shineIntensity: '',
        goldBorder: true,
        borderRadius: 28,
      },
    },
  },
]

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

export const getModalPresetById = (id: string): QuickFixModalPresetMeta | undefined =>
  QUICK_FIX_MODAL_PRESETS.find((p) => p.id === id)

export const getModalSolutionPresetById = (id: string): ModalSolutionPreset | undefined =>
  MODAL_SOLUTION_PRESETS.find((p) => p.id === id)

export const getModalSolutionPresetBySolution = (
  solution: 'edit-questions' | 'profile-v3' | 'standalone'
): ModalSolutionPreset | undefined =>
  MODAL_SOLUTION_PRESETS.find((p) => p.solution === solution)
