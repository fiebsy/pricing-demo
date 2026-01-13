"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTableConfiguration = void 0;
/**
 * StickyDataTable V2 - useTableConfiguration Hook
 *
 * Unified hook for managing table configuration state.
 * Supports localStorage persistence for experimentation and development.
 *
 * @module hooks/use-table-configuration
 *
 * @example
 * ```tsx
 * // Basic usage with localStorage persistence
 * const { config, updateConfig, toTableProps } = useTableConfiguration({
 *   storageKey: 'my-table-config',
 * })
 *
 * <StickyDataTable {...toTableProps()} />
 *
 * // Toggle sticky toolbar
 * updateConfig({ toolbar: { position: 'integrated' } })
 * ```
 */
const react_1 = require("react");
const config_1 = require("../config");
// ============================================================================
// STORAGE UTILITIES
// ============================================================================
/**
 * Safely read from localStorage
 */
function readFromStorage(key) {
    if (typeof window === 'undefined')
        return null;
    try {
        const stored = localStorage.getItem(key);
        if (!stored)
            return null;
        return JSON.parse(stored);
    }
    catch (error) {
        console.warn(`[useTableConfiguration] Failed to read from localStorage: ${key}`, error);
        return null;
    }
}
/**
 * Safely write to localStorage
 */
function writeToStorage(key, config) {
    if (typeof window === 'undefined')
        return;
    try {
        localStorage.setItem(key, JSON.stringify(config));
    }
    catch (error) {
        console.warn(`[useTableConfiguration] Failed to write to localStorage: ${key}`, error);
    }
}
/**
 * Clear from localStorage
 */
function clearFromStorage(key) {
    if (typeof window === 'undefined')
        return;
    try {
        localStorage.removeItem(key);
    }
    catch (error) {
        console.warn(`[useTableConfiguration] Failed to clear localStorage: ${key}`, error);
    }
}
// ============================================================================
// COMPARISON UTILITY
// ============================================================================
/**
 * Deep equality check for configurations
 */
function isConfigEqual(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
}
// ============================================================================
// HOOK IMPLEMENTATION
// ============================================================================
/**
 * useTableConfiguration - Unified table configuration hook
 *
 * Provides a single source of truth for all table styling with:
 * - Type-safe configuration updates
 * - Optional localStorage persistence
 * - Easy reset to defaults
 * - Direct conversion to StickyDataTable props
 *
 * @param options - Configuration options
 * @returns Configuration state and utilities
 *
 * @example
 * ```tsx
 * function MyTable() {
 *   const {
 *     config,
 *     updateConfig,
 *     resetConfig,
 *     isDirty,
 *     toTableProps,
 *   } = useTableConfiguration({
 *     storageKey: 'my-table-config',
 *     defaults: {
 *       toolbar: { position: 'integrated' },
 *     },
 *   })
 *
 *   return (
 *     <>
 *       <StickyDataTable {...toTableProps()} />
 *
 *       {isDirty && (
 *         <button onClick={resetConfig}>Reset to defaults</button>
 *       )}
 *     </>
 *   )
 * }
 * ```
 */
function useTableConfiguration(options = {}) {
    const { storageKey, defaults, persist = !!storageKey, } = options;
    // Compute base configuration from defaults
    const baseConfig = (0, react_1.useMemo)(() => {
        return (0, config_1.createTableConfiguration)(defaults);
    }, [defaults]);
    // Track if we've hydrated (loaded from localStorage)
    const [isHydrated, setIsHydrated] = (0, react_1.useState)(false);
    // Always initialize with baseConfig to avoid hydration mismatch
    // localStorage values are loaded in useEffect after mount
    const [config, setConfig] = (0, react_1.useState)(baseConfig);
    // Load from localStorage AFTER hydration to avoid mismatch
    (0, react_1.useEffect)(() => {
        if (!storageKey || isHydrated)
            return;
        const stored = readFromStorage(storageKey);
        if (stored) {
            setConfig((0, config_1.deepMerge)({ ...baseConfig }, stored));
        }
        setIsHydrated(true);
    }, [storageKey, baseConfig, isHydrated]);
    // Track if config has been modified from defaults
    const isDirty = (0, react_1.useMemo)(() => {
        return !isConfigEqual(config, baseConfig);
    }, [config, baseConfig]);
    // Sync with localStorage when config changes (only after hydration)
    (0, react_1.useEffect)(() => {
        if (!storageKey || !persist || !isHydrated)
            return;
        if (isDirty) {
            // Calculate delta from base config to store only overrides
            const overrides = calculateOverrides(baseConfig, config);
            writeToStorage(storageKey, overrides);
        }
        else {
            // Config matches base, clear storage
            clearFromStorage(storageKey);
        }
    }, [config, baseConfig, storageKey, persist, isDirty, isHydrated]);
    // Update configuration with partial overrides
    const updateConfig = (0, react_1.useCallback)((overrides) => {
        setConfig((prev) => (0, config_1.deepMerge)({ ...prev }, overrides));
    }, []);
    // Reset to base configuration
    const resetConfig = (0, react_1.useCallback)(() => {
        setConfig(baseConfig);
        if (storageKey) {
            clearFromStorage(storageKey);
        }
    }, [baseConfig, storageKey]);
    // Convert to StickyDataTable props
    const toTableProps = (0, react_1.useCallback)(() => {
        return (0, config_1.tableConfigToProps)(config);
    }, [config]);
    return {
        config,
        updateConfig,
        resetConfig,
        isDirty,
        toTableProps,
    };
}
exports.useTableConfiguration = useTableConfiguration;
// ============================================================================
// HELPERS
// ============================================================================
/**
 * Calculate the minimal overrides between base and current config
 * This ensures we only store what's different, not the entire config
 */
function calculateOverrides(base, current) {
    const overrides = {};
    // Dimensions
    if (current.dimensions.rowHeight !== base.dimensions.rowHeight) {
        overrides.dimensions = { ...overrides.dimensions, rowHeight: current.dimensions.rowHeight };
    }
    if (current.dimensions.headerHeight !== base.dimensions.headerHeight) {
        overrides.dimensions = { ...overrides.dimensions, headerHeight: current.dimensions.headerHeight };
    }
    if (current.dimensions.borderRadius !== base.dimensions.borderRadius) {
        overrides.dimensions = { ...overrides.dimensions, borderRadius: current.dimensions.borderRadius };
    }
    if (current.dimensions.headerGap !== base.dimensions.headerGap) {
        overrides.dimensions = { ...overrides.dimensions, headerGap: current.dimensions.headerGap };
    }
    // Border - compare each property (including optional side-specific colors)
    const allBorderKeys = new Set([
        ...Object.keys(base.border),
        ...Object.keys(current.border),
    ]);
    for (const key of allBorderKeys) {
        const baseValue = base.border[key];
        const currentValue = current.border[key];
        if (JSON.stringify(currentValue) !== JSON.stringify(baseValue)) {
            if (!overrides.border)
                overrides.border = {};
            overrides.border[key] = currentValue;
        }
    }
    // Background - compare each property
    const bgKeys = Object.keys(base.background);
    for (const key of bgKeys) {
        if (current.background[key] !== base.background[key]) {
            if (!overrides.background)
                overrides.background = {};
            overrides.background[key] = current.background[key];
        }
    }
    // Toolbar
    if (current.toolbar.position !== base.toolbar.position) {
        overrides.toolbar = { ...overrides.toolbar, position: current.toolbar.position };
    }
    if (current.toolbar.countPosition !== base.toolbar.countPosition) {
        overrides.toolbar = { ...overrides.toolbar, countPosition: current.toolbar.countPosition };
    }
    if (current.toolbar.countStackPosition !== base.toolbar.countStackPosition) {
        overrides.toolbar = { ...overrides.toolbar, countStackPosition: current.toolbar.countStackPosition };
    }
    if (current.toolbar.bottomMargin !== base.toolbar.bottomMargin) {
        overrides.toolbar = { ...overrides.toolbar, bottomMargin: current.toolbar.bottomMargin };
    }
    if (current.toolbar.countGap !== base.toolbar.countGap) {
        overrides.toolbar = { ...overrides.toolbar, countGap: current.toolbar.countGap };
    }
    if (current.toolbar.integratedHeight !== base.toolbar.integratedHeight) {
        overrides.toolbar = { ...overrides.toolbar, integratedHeight: current.toolbar.integratedHeight };
    }
    if (current.toolbar.debug !== base.toolbar.debug) {
        overrides.toolbar = { ...overrides.toolbar, debug: current.toolbar.debug };
    }
    if (current.toolbar.countPaddingLeft !== base.toolbar.countPaddingLeft) {
        overrides.toolbar = { ...overrides.toolbar, countPaddingLeft: current.toolbar.countPaddingLeft };
    }
    if (current.toolbar.countPaddingRight !== base.toolbar.countPaddingRight) {
        overrides.toolbar = { ...overrides.toolbar, countPaddingRight: current.toolbar.countPaddingRight };
    }
    // Integrated padding
    const padBase = base.toolbar.integratedPadding;
    const padCurrent = current.toolbar.integratedPadding;
    if (JSON.stringify(padCurrent) !== JSON.stringify(padBase)) {
        overrides.toolbar = {
            ...overrides.toolbar,
            integratedPadding: { ...padCurrent },
        };
    }
    // Features
    if (current.features.enableSelection !== base.features.enableSelection) {
        overrides.features = { ...overrides.features, enableSelection: current.features.enableSelection };
    }
    if (current.features.showColumnControl !== base.features.showColumnControl) {
        overrides.features = { ...overrides.features, showColumnControl: current.features.showColumnControl };
    }
    if (current.features.showCount !== base.features.showCount) {
        overrides.features = { ...overrides.features, showCount: current.features.showCount };
    }
    if (current.features.showExport !== base.features.showExport) {
        overrides.features = { ...overrides.features, showExport: current.features.showExport };
    }
    return overrides;
}
//# sourceMappingURL=use-table-configuration.js.map