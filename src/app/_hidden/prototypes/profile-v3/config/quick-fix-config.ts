/**
 * Quick Fix Modal Configuration - Profile V3
 *
 * Configuration for the QuickFixModal integration with profile-v3.
 * Uses the PROFILE_MODAL_PRESET as a base with profile-specific settings.
 *
 * @module b/profile-v3/config
 */

import { PROFILE_MODAL_PRESET } from '@/app/playground/quick-fix-modal/config/presets'
import type { QuickFixModalConfig, IntegrationConfig } from '@/app/playground/quick-fix-modal/config/types'

// =============================================================================
// PROFILE QUICK FIX CONFIG
// =============================================================================

/**
 * Profile-specific QuickFixModal configuration.
 * Uses the PROFILE_MODAL_PRESET as base with adjustments for profile context.
 */
export const PROFILE_QUICK_FIX_CONFIG: QuickFixModalConfig = {
  ...PROFILE_MODAL_PRESET.config,
  modal: {
    ...PROFILE_MODAL_PRESET.config.modal,
    // Use secondary background for better contrast
    background: 'secondary',
    // Squircle corners match profile design
    cornerShape: 'squircle',
    // Premium gold border for profile context
    goldBorder: true,
  },
  completion: {
    ...PROFILE_MODAL_PRESET.config.completion,
    // Contextual button text for profile improvement flow
    buttonText: 'Done',
  },
}

// =============================================================================
// INTEGRATION CONFIG
// =============================================================================

/**
 * Integration settings for profile-v3 context.
 * Configures header title with category substitution and close behavior.
 */
export const PROFILE_INTEGRATION_CONFIG: IntegrationConfig = {
  mode: 'modal',
  showHeader: true,
  showBackButton: true,
  showCloseButton: true,
  headerTitle: 'Improve {category}',
  showStepIndicator: false,
  onCompleteAction: 'close',
}
