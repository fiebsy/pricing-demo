/**
 * Button Audit Playground - Preset Definitions
 *
 * Preset configurations for quick switching between audit modes.
 *
 * @module playground/button-audit/config
 */

import type { ButtonAuditConfig, ButtonAuditPreset } from './types'

// =============================================================================
// DEFAULT CONFIG
// =============================================================================

export const DEFAULT_BUTTON_AUDIT_CONFIG: ButtonAuditConfig = {
  // Button Properties
  button: {
    variant: 'primary',
    size: 'md',
    roundness: 'default',
    text: 'Button',
    showIconLeading: false,
    showIconTrailing: false,
    isLoading: false,
    showTextWhileLoading: false,
    disabled: false,
  },

  // Display Settings
  display: {
    mode: 'single',
    contentMode: 'text',
    showLabels: true,
    showPaddingOverlay: false,
    showMeasurements: false,
    backgroundColor: 'primary',
  },

  // Grid Settings
  grid: {
    gap: 16,
    columns: 4,
  },
}

// =============================================================================
// PRESETS
// =============================================================================

export const BUTTON_AUDIT_PRESETS: ButtonAuditPreset[] = [
  {
    id: 'default',
    name: 'Default',
    description: 'Single button view with default settings',
    category: 'default',
    data: DEFAULT_BUTTON_AUDIT_CONFIG,
  },
  {
    id: 'all-variants',
    name: 'All Variants',
    description: 'Grid showing all button variants',
    category: 'audit',
    data: {
      ...DEFAULT_BUTTON_AUDIT_CONFIG,
      display: {
        ...DEFAULT_BUTTON_AUDIT_CONFIG.display,
        mode: 'grid-variants',
        showLabels: true,
      },
      grid: {
        gap: 24,
        columns: 4,
      },
    },
  },
  {
    id: 'all-sizes',
    name: 'All Sizes',
    description: 'Grid showing all button sizes',
    category: 'audit',
    data: {
      ...DEFAULT_BUTTON_AUDIT_CONFIG,
      display: {
        ...DEFAULT_BUTTON_AUDIT_CONFIG.display,
        mode: 'grid-sizes',
        showLabels: true,
      },
      grid: {
        gap: 16,
        columns: 5,
      },
    },
  },
  {
    id: 'full-matrix',
    name: 'Full Matrix',
    description: 'Complete grid of all variants and sizes',
    category: 'audit',
    data: {
      ...DEFAULT_BUTTON_AUDIT_CONFIG,
      display: {
        ...DEFAULT_BUTTON_AUDIT_CONFIG.display,
        mode: 'grid-all',
        showLabels: true,
      },
      grid: {
        gap: 12,
        columns: 5,
      },
    },
  },
  {
    id: 'with-icons',
    name: 'With Icons',
    description: 'Single button with leading and trailing icons',
    category: 'testing',
    data: {
      ...DEFAULT_BUTTON_AUDIT_CONFIG,
      button: {
        ...DEFAULT_BUTTON_AUDIT_CONFIG.button,
        showIconLeading: true,
        showIconTrailing: true,
      },
    },
  },
  {
    id: 'icon-only',
    name: 'Icon Only',
    description: 'Grid showing icon-only buttons across all sizes',
    category: 'audit',
    data: {
      ...DEFAULT_BUTTON_AUDIT_CONFIG,
      display: {
        ...DEFAULT_BUTTON_AUDIT_CONFIG.display,
        mode: 'grid-sizes',
        contentMode: 'icon-only',
        showLabels: true,
      },
      grid: {
        gap: 16,
        columns: 5,
      },
    },
  },
  {
    id: 'icon-only-variants',
    name: 'Icon Only Variants',
    description: 'Grid showing icon-only buttons across all variants',
    category: 'audit',
    data: {
      ...DEFAULT_BUTTON_AUDIT_CONFIG,
      display: {
        ...DEFAULT_BUTTON_AUDIT_CONFIG.display,
        mode: 'grid-variants',
        contentMode: 'icon-only',
        showLabels: true,
      },
      grid: {
        gap: 24,
        columns: 4,
      },
    },
  },
  {
    id: 'compare-text-icon',
    name: 'Compare: Text vs Icon',
    description: 'Side-by-side comparison of text and icon-only buttons',
    category: 'audit',
    data: {
      ...DEFAULT_BUTTON_AUDIT_CONFIG,
      display: {
        ...DEFAULT_BUTTON_AUDIT_CONFIG.display,
        mode: 'grid-sizes',
        contentMode: 'both',
        showLabels: true,
      },
      grid: {
        gap: 16,
        columns: 5,
      },
    },
  },
  {
    id: 'loading-states',
    name: 'Loading States',
    description: 'Button in loading state',
    category: 'testing',
    data: {
      ...DEFAULT_BUTTON_AUDIT_CONFIG,
      button: {
        ...DEFAULT_BUTTON_AUDIT_CONFIG.button,
        isLoading: true,
        showTextWhileLoading: true,
      },
    },
  },
  {
    id: 'disabled-states',
    name: 'Disabled States',
    description: 'Grid showing all variants in disabled state',
    category: 'testing',
    data: {
      ...DEFAULT_BUTTON_AUDIT_CONFIG,
      button: {
        ...DEFAULT_BUTTON_AUDIT_CONFIG.button,
        disabled: true,
      },
      display: {
        ...DEFAULT_BUTTON_AUDIT_CONFIG.display,
        mode: 'grid-variants',
      },
    },
  },
  {
    id: 'xs-size-audit',
    name: 'XS Size Audit',
    description: 'Focus on extra-small size across variants',
    category: 'audit',
    data: {
      ...DEFAULT_BUTTON_AUDIT_CONFIG,
      button: {
        ...DEFAULT_BUTTON_AUDIT_CONFIG.button,
        size: 'xs',
      },
      display: {
        ...DEFAULT_BUTTON_AUDIT_CONFIG.display,
        mode: 'grid-variants',
        showPaddingOverlay: true,
      },
    },
  },
  {
    id: 'padding-debug',
    name: 'Padding Debug',
    description: 'View with padding overlays for debugging',
    category: 'testing',
    data: {
      ...DEFAULT_BUTTON_AUDIT_CONFIG,
      display: {
        ...DEFAULT_BUTTON_AUDIT_CONFIG.display,
        mode: 'grid-sizes',
        showPaddingOverlay: true,
        showMeasurements: true,
      },
    },
  },
  {
    id: 'dark-background',
    name: 'Dark Background',
    description: 'View buttons on dark brand background',
    category: 'testing',
    data: {
      ...DEFAULT_BUTTON_AUDIT_CONFIG,
      display: {
        ...DEFAULT_BUTTON_AUDIT_CONFIG.display,
        mode: 'grid-variants',
        backgroundColor: 'brand-solid',
      },
    },
  },
]

// =============================================================================
// HELPERS
// =============================================================================

export function getPresetById(id: string): ButtonAuditPreset | undefined {
  return BUTTON_AUDIT_PRESETS.find((p) => p.id === id)
}

export function getPresetConfig(id: string): ButtonAuditConfig {
  const preset = getPresetById(id)
  return preset?.data ?? DEFAULT_BUTTON_AUDIT_CONFIG
}

export function getPresetsByCategory(category: ButtonAuditPreset['category']): ButtonAuditPreset[] {
  return BUTTON_AUDIT_PRESETS.filter((p) => p.category === category)
}
