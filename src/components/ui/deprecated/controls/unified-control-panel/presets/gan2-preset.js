"use strict";
/**
 * GAN2 Unified Preset Configuration
 *
 * Single source of truth for all GAN2 component defaults.
 * Used by playground pages to initialize state and apply presets consistently.
 *
 * @module unified-control-panel/presets/gan2-preset
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyPreset = exports.createInitialPlaygroundState = exports.getMetricTileConfigFromPreset = exports.getFilterConfigsFromPreset = exports.getTableConfigFromPreset = exports.getDefaultPreset = exports.getUnifiedPreset = exports.UNIFIED_PRESETS = exports.GAN2_PRESET = void 0;
const config_1 = require("@/components/ui/data/sticky-data-table/config");
const config_2 = require("@/components/ui/deprecated/filter/config");
const metric_tile_config_1 = require("@/components/ui/deprecated/skwircle/composed/dashboard/metric-tile-config");
// ============================================================================
// GAN2 Preset Definition
// ============================================================================
/**
 * GAN2 Unified Preset - Updated 2026-01-02
 *
 * This is the blessed production configuration used across the application.
 * All playground pages should use this as the default initial state.
 */
exports.GAN2_PRESET = {
    tableConfig: config_1.DEFAULT_TABLE_CONFIGURATION,
    filterTrigger: config_2.DEFAULT_FILTER_TRIGGER_STYLE,
    filterMenu: config_2.DEFAULT_FILTER_STYLING_CONFIG,
    filterChip: config_2.DEFAULT_CHIP_STYLE,
    metricTileConfig: metric_tile_config_1.METRIC_TILE_DEFAULTS,
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
};
/**
 * Registry of all available presets
 */
exports.UNIFIED_PRESETS = [
    {
        id: 'gan2',
        name: 'GAN2 (Default)',
        description: 'Production-ready configuration - Updated 2026-01-02',
        config: exports.GAN2_PRESET,
    },
];
// ============================================================================
// Helper Functions
// ============================================================================
/**
 * Get a preset by ID
 */
function getUnifiedPreset(presetId) {
    return exports.UNIFIED_PRESETS.find((p) => p.id === presetId);
}
exports.getUnifiedPreset = getUnifiedPreset;
/**
 * Get the default preset (GAN2)
 */
function getDefaultPreset() {
    return exports.GAN2_PRESET;
}
exports.getDefaultPreset = getDefaultPreset;
/**
 * Get just the table configuration from a preset
 */
function getTableConfigFromPreset(presetId) {
    const preset = getUnifiedPreset(presetId);
    return preset?.config.tableConfig ?? config_1.DEFAULT_TABLE_CONFIGURATION;
}
exports.getTableConfigFromPreset = getTableConfigFromPreset;
/**
 * Get just the filter configs from a preset
 */
function getFilterConfigsFromPreset(presetId) {
    const preset = getUnifiedPreset(presetId);
    return {
        trigger: preset?.config.filterTrigger ?? config_2.DEFAULT_FILTER_TRIGGER_STYLE,
        menu: preset?.config.filterMenu ?? config_2.DEFAULT_FILTER_STYLING_CONFIG,
        chip: preset?.config.filterChip ?? config_2.DEFAULT_CHIP_STYLE,
    };
}
exports.getFilterConfigsFromPreset = getFilterConfigsFromPreset;
/**
 * Get just the metric tile config from a preset
 */
function getMetricTileConfigFromPreset(presetId) {
    const preset = getUnifiedPreset(presetId);
    return preset?.config.metricTileConfig ?? metric_tile_config_1.METRIC_TILE_DEFAULTS;
}
exports.getMetricTileConfigFromPreset = getMetricTileConfigFromPreset;
/**
 * Create initial state for a playground page using the default preset
 *
 * @example
 * ```tsx
 * const [config, setConfig] = useState(() => createInitialPlaygroundState())
 * ```
 */
function createInitialPlaygroundState() {
    return { ...exports.GAN2_PRESET };
}
exports.createInitialPlaygroundState = createInitialPlaygroundState;
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
function applyPreset(presetId) {
    const preset = getUnifiedPreset(presetId);
    return preset?.config ?? null;
}
exports.applyPreset = applyPreset;
//# sourceMappingURL=gan2-preset.js.map