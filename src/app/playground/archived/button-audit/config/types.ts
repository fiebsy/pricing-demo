/**
 * Button Audit Playground - Type Definitions
 *
 * Configuration interfaces for auditing button variants, sizes, and settings.
 *
 * @status incubating
 * @migration-target src/components/ui/prod/base/button
 */

import type { ButtonRoundness, ButtonSize, ButtonVariant } from '@/components/ui/prod/base/button'

// =============================================================================
// DISPLAY MODE
// =============================================================================

export type DisplayMode = 'single' | 'grid-variants' | 'grid-sizes' | 'grid-all'

// =============================================================================
// CONTENT MODE
// =============================================================================

export type ContentMode = 'text' | 'icon-only' | 'both'

// =============================================================================
// PLAYGROUND CONFIG
// =============================================================================

export interface ButtonAuditConfig {
  // Button Properties
  button: {
    variant: ButtonVariant
    size: ButtonSize
    roundness: ButtonRoundness
    text: string
    showIconLeading: boolean
    showIconTrailing: boolean
    isLoading: boolean
    showTextWhileLoading: boolean
    disabled: boolean
  }

  // Display Settings
  display: {
    mode: DisplayMode
    contentMode: ContentMode
    showLabels: boolean
    showPaddingOverlay: boolean
    showMeasurements: boolean
    backgroundColor: string
  }

  // Grid Settings (for grid modes)
  grid: {
    gap: number
    columns: number
  }
}

// =============================================================================
// PRESET TYPE
// =============================================================================

export interface ButtonAuditPreset {
  id: string
  name: string
  description: string
  category: 'default' | 'audit' | 'testing' | 'custom'
  data: ButtonAuditConfig
}
