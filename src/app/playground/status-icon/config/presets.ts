/**
 * Status Icon Presets
 *
 * Preset categories:
 * - default: Standard starting point
 * - active: Active order states (Healthy, At-Risk)
 * - closed: Closed order states (Completed, Clawback, Declined)
 */

import type { StatusIconConfig, StatusIconPresetMeta } from './types'

// ============================================================================
// Default Icon Configuration
// ============================================================================

const DEFAULT_ICON_CONFIG = {
  show: false,
  iconName: 'Tick01',
  color: 'fg-primary',
  size: 10,
  strokeWidth: 2,
}

// ============================================================================
// Default Configuration
// ============================================================================

export const DEFAULT_STATUS_ICON_CONFIG: StatusIconConfig = {
  size: {
    diameter: 14,
  },
  stroke: {
    width: 2,
    color: 'fg-quaternary',
    dashed: false,
    dashArray: '',
    lineCap: 'round',
  },
  fill: {
    type: 'pie',
    percentage: 60,
    color: 'bg-success-solid',
  },
  icon: DEFAULT_ICON_CONFIG,
  text: {
    show: true,
    content: 'Active',
    size: 'xs',
    weight: '500',
    color: 'text-primary',
    position: 'right',
    gap: 8,
  },
}

// ============================================================================
// Presets
// ============================================================================

export const STATUS_ICON_PRESETS: StatusIconPresetMeta[] = [
  // Default
  {
    id: 'default',
    name: 'Default',
    category: 'default',
    description: 'Pie fill with neutral stroke',
    data: DEFAULT_STATUS_ICON_CONFIG,
  },

  // Active States
  {
    id: 'healthy',
    name: 'Healthy',
    category: 'active',
    description: 'Green solid stroke, 100% pie fill',
    data: {
      ...DEFAULT_STATUS_ICON_CONFIG,
      stroke: {
        ...DEFAULT_STATUS_ICON_CONFIG.stroke,
        color: 'fg-success-primary',
      },
      fill: {
        type: 'pie',
        percentage: 100,
        color: 'bg-success-solid',
      },
      text: {
        ...DEFAULT_STATUS_ICON_CONFIG.text,
        content: 'Healthy',
        color: 'text-success-primary',
      },
    },
  },
  {
    id: 'at-risk-low',
    name: 'At-Risk Low',
    category: 'active',
    description: 'Amber dashed stroke, 25% pie fill',
    data: {
      ...DEFAULT_STATUS_ICON_CONFIG,
      stroke: {
        ...DEFAULT_STATUS_ICON_CONFIG.stroke,
        color: 'fg-warning-primary',
        dashed: true,
        dashArray: '4 2',
      },
      fill: {
        type: 'pie',
        percentage: 25,
        color: 'bg-warning-solid',
      },
      text: {
        ...DEFAULT_STATUS_ICON_CONFIG.text,
        content: 'Low Risk',
        color: 'text-warning-primary',
      },
    },
  },
  {
    id: 'at-risk-medium',
    name: 'At-Risk Medium',
    category: 'active',
    description: 'Amber dashed stroke, 50% pie fill',
    data: {
      ...DEFAULT_STATUS_ICON_CONFIG,
      stroke: {
        ...DEFAULT_STATUS_ICON_CONFIG.stroke,
        color: 'fg-warning-primary',
        dashed: true,
        dashArray: '4 2',
      },
      fill: {
        type: 'pie',
        percentage: 50,
        color: 'bg-warning-solid',
      },
      text: {
        ...DEFAULT_STATUS_ICON_CONFIG.text,
        content: 'Medium Risk',
        color: 'text-warning-primary',
      },
    },
  },
  {
    id: 'at-risk-high',
    name: 'At-Risk High',
    category: 'active',
    description: 'Red filled circle, alert icon',
    data: {
      ...DEFAULT_STATUS_ICON_CONFIG,
      stroke: {
        ...DEFAULT_STATUS_ICON_CONFIG.stroke,
        color: 'fg-quaternary',
      },
      fill: {
        type: 'full',
        color: 'bg-error-primary',
      },
      icon: {
        ...DEFAULT_ICON_CONFIG,
        show: true,
        iconName: 'Alert02',
        color: 'fg-error-secondary',
        size: 10,
      },
      text: {
        ...DEFAULT_STATUS_ICON_CONFIG.text,
        content: 'High Risk',
        color: 'text-primary',
      },
    },
  },
  {
    id: 'last-chance',
    name: 'Last Chance',
    category: 'active',
    description: 'Red dashed stroke, critical warning',
    data: {
      ...DEFAULT_STATUS_ICON_CONFIG,
      stroke: {
        ...DEFAULT_STATUS_ICON_CONFIG.stroke,
        color: 'fg-error-primary',
        dashed: true,
        dashArray: '2 2',
      },
      fill: {
        type: 'pie',
        percentage: 90,
        color: 'bg-error-solid',
      },
      text: {
        ...DEFAULT_STATUS_ICON_CONFIG.text,
        content: 'Last Chance',
        color: 'text-error-primary',
      },
    },
  },

  // Closed States
  {
    id: 'completed',
    name: 'Completed',
    category: 'closed',
    description: 'Green filled circle, checkmark icon',
    data: {
      ...DEFAULT_STATUS_ICON_CONFIG,
      stroke: {
        ...DEFAULT_STATUS_ICON_CONFIG.stroke,
        color: 'fg-quaternary',
      },
      fill: {
        type: 'full',
        color: 'bg-success-primary',
      },
      icon: {
        ...DEFAULT_ICON_CONFIG,
        show: true,
        iconName: 'Tick01',
        color: 'fg-success-secondary',
        size: 10,
      },
      text: {
        ...DEFAULT_STATUS_ICON_CONFIG.text,
        content: 'Completed',
        color: 'text-primary',
      },
    },
  },
  {
    id: 'clawback',
    name: 'Clawback',
    category: 'closed',
    description: 'Red filled circle, paw icon',
    data: {
      ...DEFAULT_STATUS_ICON_CONFIG,
      stroke: {
        ...DEFAULT_STATUS_ICON_CONFIG.stroke,
        color: 'fg-quaternary',
      },
      fill: {
        type: 'full',
        color: 'bg-error-primary',
      },
      icon: {
        ...DEFAULT_ICON_CONFIG,
        show: true,
        iconName: 'ClawbackSolid',
        color: 'fg-error-secondary',
        size: 10,
      },
      text: {
        ...DEFAULT_STATUS_ICON_CONFIG.text,
        content: 'Clawback',
        color: 'text-primary',
      },
    },
  },
  {
    id: 'declined',
    name: 'Declined',
    category: 'closed',
    description: 'Gray filled circle, minus icon',
    data: {
      ...DEFAULT_STATUS_ICON_CONFIG,
      stroke: {
        ...DEFAULT_STATUS_ICON_CONFIG.stroke,
        color: 'fg-quaternary',
      },
      fill: {
        type: 'full',
        color: 'bg-quaternary',
      },
      icon: {
        ...DEFAULT_ICON_CONFIG,
        show: true,
        iconName: 'Remove01',
        color: 'fg-secondary',
        size: 10,
      },
      text: {
        ...DEFAULT_STATUS_ICON_CONFIG.text,
        content: 'Declined',
        color: 'text-primary',
      },
    },
  },
  {
    id: 'canceled',
    name: 'Canceled',
    category: 'closed',
    description: 'Gray filled circle, X icon',
    data: {
      ...DEFAULT_STATUS_ICON_CONFIG,
      stroke: {
        ...DEFAULT_STATUS_ICON_CONFIG.stroke,
        color: 'fg-quaternary',
      },
      fill: {
        type: 'full',
        color: 'bg-quaternary',
      },
      icon: {
        ...DEFAULT_ICON_CONFIG,
        show: true,
        iconName: 'Cancel01',
        color: 'fg-secondary',
        size: 10,
      },
      text: {
        ...DEFAULT_STATUS_ICON_CONFIG.text,
        content: 'Canceled',
        color: 'text-primary',
      },
    },
  },
  {
    id: 'defaulted',
    name: 'Defaulted',
    category: 'closed',
    description: 'Red filled circle, alert icon',
    data: {
      ...DEFAULT_STATUS_ICON_CONFIG,
      stroke: {
        ...DEFAULT_STATUS_ICON_CONFIG.stroke,
        color: 'fg-quaternary',
      },
      fill: {
        type: 'full',
        color: 'bg-error-primary',
      },
      icon: {
        ...DEFAULT_ICON_CONFIG,
        show: true,
        iconName: 'Alert02',
        color: 'fg-error-secondary',
        size: 10,
      },
      text: {
        ...DEFAULT_STATUS_ICON_CONFIG.text,
        content: 'Defaulted',
        color: 'text-primary',
      },
    },
  },
  {
    id: 'chargeback',
    name: 'Chargeback',
    category: 'closed',
    description: 'Red fill, dollar icon',
    data: {
      ...DEFAULT_STATUS_ICON_CONFIG,
      stroke: {
        ...DEFAULT_STATUS_ICON_CONFIG.stroke,
        color: 'fg-quaternary',
      },
      fill: {
        type: 'full',
        color: 'bg-error-primary',
      },
      icon: {
        ...DEFAULT_ICON_CONFIG,
        show: true,
        iconName: 'DollarCircle',
        color: 'fg-error-secondary',
        size: 10,
      },
      text: {
        ...DEFAULT_STATUS_ICON_CONFIG.text,
        content: 'Chargeback',
        color: 'text-primary',
      },
    },
  },
  {
    id: 'refunded',
    name: 'Refunded',
    category: 'closed',
    description: 'Brand filled circle, dollar icon',
    data: {
      ...DEFAULT_STATUS_ICON_CONFIG,
      stroke: {
        ...DEFAULT_STATUS_ICON_CONFIG.stroke,
        color: 'fg-quaternary',
      },
      fill: {
        type: 'full',
        color: 'bg-brand-primary',
      },
      icon: {
        ...DEFAULT_ICON_CONFIG,
        show: true,
        iconName: 'DollarCircle',
        color: 'fg-brand-secondary',
        size: 10,
      },
      text: {
        ...DEFAULT_STATUS_ICON_CONFIG.text,
        content: 'Refunded',
        color: 'text-primary',
      },
    },
  },
]

// ============================================================================
// Helpers
// ============================================================================

export const getPresetById = (id: string): StatusIconPresetMeta | undefined =>
  STATUS_ICON_PRESETS.find((p) => p.id === id)

export const getPresetsByCategory = (category: string): StatusIconPresetMeta[] =>
  STATUS_ICON_PRESETS.filter((p) => p.category === category)
