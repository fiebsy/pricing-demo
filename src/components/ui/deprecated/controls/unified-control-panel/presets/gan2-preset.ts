/**
 * GAN2 Unified Preset Configuration
 *
 * Single source of truth for all GAN2 component defaults.
 * Used by playground pages to initialize state and apply presets consistently.
 *
 * @module unified-control-panel/presets/gan2-preset
 */

import { DEFAULT_TABLE_CONFIGURATION } from '@/components/ui/data/sticky-data-table/config'
import {
  DEFAULT_CHIP_STYLE,
  DEFAULT_FILTER_TRIGGER_STYLE,
  DEFAULT_FILTER_STYLING_CONFIG,
} from '@/components/ui/deprecated/filter/config'
import { METRIC_TILE_DEFAULTS } from '@/components/ui/deprecated/skwircle/composed/dashboard/metric-tile-config'

import type { TableConfiguration } from '@/components/ui/data/sticky-data-table/types/table-configuration.types'
import type { ChipStyleConfig, FilterMenuStylingConfig, FilterTriggerStyleConfig } from '@/components/ui/deprecated/filter/types'
import type { MetricTileDefaults } from '@/components/ui/deprecated/skwircle/composed/dashboard/metric-tile-config'

// ============================================================================
// Unified Config Type
// ============================================================================

/**
 * Complete unified configuration for all components
 */
export interface UnifiedPresetConfig {
  tableConfig: TableConfiguration
  filterTrigger: FilterTriggerStyleConfig
  filterMenu: FilterMenuStylingConfig
  filterChip: ChipStyleConfig
  metricTileConfig: MetricTileDefaults
}

/**
 * Local config specific to playground pages
 * (features that are page-specific, not component defaults)
 */
export interface LocalPlaygroundConfig {
  showSearch: boolean
  showFilter: boolean
  showRankColumn: boolean
  showAmountDisplay: boolean
  stackMode: 'vertical' | 'horizontal'
  amount: {
    size: 'xs' | 'sm' | 'md' | 'lg'
    value: {
      weight: 'normal' | 'medium' | 'semibold' | 'bold'
      color: 'primary' | 'secondary' | 'tertiary' | 'quaternary'
    }
    label: {
      weight: 'normal' | 'medium' | 'semibold' | 'bold'
      color: 'primary' | 'secondary' | 'tertiary' | 'quaternary'
    }
    left: {
      label: string
      showValue: boolean
    }
    right: {
      label: string
      showValue: boolean
    }
  }
}

/**
 * Complete preset including both component configs and local page settings
 */
export interface CompletePresetConfig extends UnifiedPresetConfig {
  localConfig: LocalPlaygroundConfig
}

// ============================================================================
// GAN2 Preset Definition
// ============================================================================

/**
 * GAN2 Unified Preset - Updated 2026-01-02
 *
 * This is the blessed production configuration used across the application.
 * All playground pages should use this as the default initial state.
 */
export const GAN2_PRESET: CompletePresetConfig = {
  tableConfig: DEFAULT_TABLE_CONFIGURATION,

  filterTrigger: DEFAULT_FILTER_TRIGGER_STYLE,

  filterMenu: DEFAULT_FILTER_STYLING_CONFIG,

  filterChip: DEFAULT_CHIP_STYLE,

  metricTileConfig: METRIC_TILE_DEFAULTS,

  localConfig: {
    showSearch: false,
    showFilter: true,
    showRankColumn: false,
    showAmountDisplay: false,
    stackMode: 'vertical',
    amount: {
      size: 'xs',
      value: {
        weight: 'semibold',
        color: 'quaternary',
      },
      label: {
        weight: 'normal',
        color: 'quaternary',
      },
      left: {
        label: 'orders',
        showValue: true,
      },
      right: {
        label: 'orders',
        showValue: true,
      },
    },
  },
}

// ============================================================================
// Preset Registry
// ============================================================================

export interface PresetDefinition {
  id: string
  name: string
  description?: string
  config: CompletePresetConfig
}

/**
 * Registry of all available presets
 */
export const UNIFIED_PRESETS: PresetDefinition[] = [
  {
    id: 'gan2',
    name: 'GAN2 (Default)',
    description: 'Production-ready configuration - Updated 2026-01-02',
    config: GAN2_PRESET,
  },
]

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get a preset by ID
 */
export function getUnifiedPreset(presetId: string): PresetDefinition | undefined {
  return UNIFIED_PRESETS.find((p) => p.id === presetId)
}

/**
 * Get the default preset (GAN2)
 */
export function getDefaultPreset(): CompletePresetConfig {
  return GAN2_PRESET
}

/**
 * Get just the table configuration from a preset
 */
export function getTableConfigFromPreset(presetId: string): TableConfiguration {
  const preset = getUnifiedPreset(presetId)
  return preset?.config.tableConfig ?? DEFAULT_TABLE_CONFIGURATION
}

/**
 * Get just the filter configs from a preset
 */
export function getFilterConfigsFromPreset(presetId: string): {
  trigger: FilterTriggerStyleConfig
  menu: FilterMenuStylingConfig
  chip: ChipStyleConfig
} {
  const preset = getUnifiedPreset(presetId)
  return {
    trigger: preset?.config.filterTrigger ?? DEFAULT_FILTER_TRIGGER_STYLE,
    menu: preset?.config.filterMenu ?? DEFAULT_FILTER_STYLING_CONFIG,
    chip: preset?.config.filterChip ?? DEFAULT_CHIP_STYLE,
  }
}

/**
 * Get just the metric tile config from a preset
 */
export function getMetricTileConfigFromPreset(presetId: string): MetricTileDefaults {
  const preset = getUnifiedPreset(presetId)
  return preset?.config.metricTileConfig ?? METRIC_TILE_DEFAULTS
}

/**
 * Create initial state for a playground page using the default preset
 *
 * @example
 * ```tsx
 * const [config, setConfig] = useState(() => createInitialPlaygroundState())
 * ```
 */
export function createInitialPlaygroundState(): CompletePresetConfig {
  return { ...GAN2_PRESET }
}

/**
 * Apply a preset to update all configs at once
 *
 * @example
 * ```tsx
 * const handlePresetChange = (presetId: string) => {
 *   const newConfig = applyPreset(presetId)
 *   if (newConfig) {
 *     setTableConfig(newConfig.tableConfig)
 *     setFilterConfig(newConfig.filterChip)
 *     // ... etc
 *   }
 * }
 * ```
 */
export function applyPreset(presetId: string): CompletePresetConfig | null {
  const preset = getUnifiedPreset(presetId)
  return preset?.config ?? null
}
