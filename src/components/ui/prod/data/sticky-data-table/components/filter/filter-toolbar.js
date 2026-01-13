"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterToolbar = void 0;
// =============================================================================
// Filter Toolbar V2
// =============================================================================
// Production-ready filter toolbar with built-in defaults.
// Uses the unified FilterConfig from config/filter.ts
//
// Features:
// - Submenu-based category → value navigation
// - Built-in sliding animations and back button
// - Configurable menu, trigger, and pill styling
// - Works out of the box with sensible defaults
// =============================================================================
const React = require("react");
const react_1 = require("react");
const react_aria_components_1 = require("react-aria-components");
const utils_1 = require("@/lib/utils");
// PROD Base UI imports (migrated from legacy-base-ui)
const filter_1 = require("@/components/ui/prod/base/filter");
const config_1 = require("../../config");
// ============================================================================
// HELPER: Convert FilterPillConfig to PROD ChipConfig
// ============================================================================
/**
 * Maps FilterPillConfig size values to PROD ChipConfig size values
 * PROD sizes: 'xs' | 'sm' | 'md' | 'lg'
 */
function mapPillSizeToChipSize(size) {
    const sizeMap = {
        xs: 'xs',
        sm: 'sm',
        default: 'md',
        md: 'md',
        lg: 'lg',
        xl: 'lg',
    };
    return sizeMap[size] ?? 'md';
}
/**
 * Maps FilterPillConfig rounded values to PROD ChipConfig rounded values
 * PROD rounded: 'sm' | 'md' | 'lg' | 'full'
 */
function mapPillRoundedToChipRounded(rounded) {
    const roundedMap = {
        none: 'sm',
        sm: 'sm',
        default: 'md',
        md: 'md',
        lg: 'lg',
        xl: 'lg',
        full: 'full',
    };
    return roundedMap[rounded] ?? 'full';
}
/**
 * Convert FilterPillConfig to PROD ChipConfig
 * Includes visual styling and animation duration
 */
function toChipConfig(pill) {
    return {
        size: mapPillSizeToChipSize(pill.size),
        rounded: mapPillRoundedToChipRounded(pill.rounded),
        iconSize: pill.iconSize,
        closeSize: pill.closeIconSize,
        iconOpacity: pill.leftIconOpacity / 100, // Convert 0-100 to 0-1
        iconValueGap: pill.iconValueGap,
        valueCloseGap: pill.itemGap,
        paddingLeft: pill.paddingLeft,
        paddingRight: pill.paddingRight,
        duration: pill.duration,
    };
}
// ============================================================================
// HOOK: Convert filter categories to menu items
// ============================================================================
const useFilterMenuItems = (categories, onFilterAdd) => {
    return (0, react_1.useMemo)(() => {
        return categories.map((category) => {
            const config = category.config;
            let valueItems = [];
            // Convert filter options to action items based on filter type
            switch (config.type) {
                case 'select': {
                    const selectConfig = config;
                    valueItems = selectConfig.options.map((option) => ({
                        id: `${category.key}-${option.id}`,
                        // Include count in label if available (PROD menu doesn't support addon prop)
                        label: option.count !== undefined ? `${option.label} (${option.count})` : option.label,
                        icon: option.icon,
                        onClick: () => {
                            onFilterAdd({
                                categoryKey: category.key,
                                operator: 'equals',
                                value: option.id,
                                displayLabel: category.label,
                                displayValue: option.label,
                            });
                        },
                    }));
                    break;
                }
                case 'date': {
                    const dateConfig = config;
                    valueItems = dateConfig.presets.map((preset) => {
                        const days = preset.days ?? 0;
                        return {
                            id: `${category.key}-${preset.id}`,
                            label: preset.label,
                            onClick: () => {
                                const filterDate = new Date();
                                if (days !== 0) {
                                    filterDate.setDate(filterDate.getDate() + days);
                                }
                                const operator = days < 0 ? 'greater_than' : 'equals';
                                onFilterAdd({
                                    categoryKey: category.key,
                                    operator,
                                    value: filterDate.getTime(),
                                    displayLabel: category.label,
                                    displayValue: preset.label,
                                });
                            },
                        };
                    });
                    break;
                }
                case 'range': {
                    const rangeConfig = config;
                    if (rangeConfig.presets && rangeConfig.presets.length > 0) {
                        valueItems = rangeConfig.presets.map((preset) => ({
                            id: `${category.key}-${preset.id}`,
                            label: preset.label,
                            icon: preset.icon,
                            onClick: () => {
                                onFilterAdd({
                                    categoryKey: category.key,
                                    operator: 'between',
                                    value: [preset.min, preset.max],
                                    displayLabel: category.label,
                                    displayValue: preset.label,
                                });
                            },
                        }));
                    }
                    break;
                }
            }
            return {
                id: category.key,
                type: 'submenu',
                label: category.label,
                description: category.description,
                icon: category.icon,
                items: valueItems,
            };
        });
    }, [categories, onFilterAdd]);
};
// ============================================================================
// COMPONENT: ClearAllButton (with fade-in animation)
// ============================================================================
const EASING_EXPO_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)';
const ClearAllButton = ({ onPress }) => {
    const [isVisible, setIsVisible] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        const frame = requestAnimationFrame(() => setIsVisible(true));
        return () => cancelAnimationFrame(frame);
    }, []);
    return (<react_aria_components_1.Button onPress={onPress} className={(0, utils_1.cn)('text-sm font-medium text-tertiary hover:text-secondary transition-colors', 'outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand')} style={{
            opacity: isVisible ? 1 : 0,
            transition: `opacity 200ms ${EASING_EXPO_OUT}`,
        }}>
      Clear all
    </react_aria_components_1.Button>);
};
// ============================================================================
// COMPONENT: FilterToolbar
// ============================================================================
/**
 * FilterToolbar Component
 *
 * Provides a complete filter UI for the StickyDataTable including:
 * - "Add filter" button using BaseUIMenu with submenu navigation
 * - Built-in sliding animations and back button from menu component
 * - Active filter pills with remove functionality
 * - Clear all filters option
 *
 * Uses DEFAULT_FILTER_CONFIG for all styling. Override via `config` prop.
 *
 * @example Basic usage (uses all defaults)
 * ```tsx
 * <FilterToolbar
 *   categories={filterCategories}
 *   filterState={filterState}
 *   onFilterAdd={addFilter}
 *   onFilterRemove={removeFilter}
 *   onFiltersClear={clearFilters}
 * />
 * ```
 *
 * @example With custom config
 * ```tsx
 * <FilterToolbar
 *   categories={filterCategories}
 *   filterState={filterState}
 *   onFilterAdd={addFilter}
 *   onFilterRemove={removeFilter}
 *   onFiltersClear={clearFilters}
 *   config={{
 *     menu: { width: 280 },
 *     pill: { shine: '2' }
 *   }}
 * />
 * ```
 *
 * @example Using a preset
 * ```tsx
 * import { FILTER_PRESET_COMPACT } from './config'
 *
 * <FilterToolbar
 *   {...props}
 *   config={FILTER_PRESET_COMPACT}
 * />
 * ```
 */
const FilterToolbar = ({ categories, filterState, onFilterAdd, onFilterRemove, onFiltersClear, config: configOverrides, className, showClearAll = true, }) => {
    // Track menu open state for trigger button animation
    const [isMenuOpen, setIsMenuOpen] = (0, react_1.useState)(false);
    // Merge config with defaults - stable reference when configOverrides doesn't change
    const config = (0, react_1.useMemo)(() => (0, config_1.mergeFilterConfig)(config_1.DEFAULT_FILTER_CONFIG, configOverrides), [configOverrides]);
    // Convert to menu appearance config - stable reference
    const menuAppearance = (0, react_1.useMemo)(() => (0, config_1.toMenuAppearanceConfig)(config.menu), [config.menu]);
    // Convert to PROD chip config - stable reference
    const chipConfig = (0, react_1.useMemo)(() => toChipConfig(config.pill), [config.pill]);
    // Stable category lookup map
    const categoryMap = (0, react_1.useMemo)(() => new Map(categories.map((c) => [c.key, c])), [categories]);
    // Convert filter categories to menu items
    const menuItems = useFilterMenuItems(categories, onFilterAdd);
    // Memoize trigger size/rounded to prevent object recreation
    const triggerSize = config.trigger.height >= 48 ? 'lg' : config.trigger.height >= 40 ? 'md' : 'sm';
    const triggerRounded = config.trigger.rounded === 'full' ? 'full' : 'lg';
    return (<div className={(0, utils_1.cn)('flex flex-wrap items-center gap-3', className)}>
      {/* Add Filter Button */}
      <filter_1.FilterMenu trigger={<filter_1.FilterTrigger isOpen={isMenuOpen} size={triggerSize} rounded={triggerRounded} variant="default"/>} items={menuItems} align="start" side="bottom" width={config.menu.width} appearance={menuAppearance} onOpenChange={setIsMenuOpen}/>

      {/* Active Filter Pills - inline callbacks are fine, React handles this efficiently */}
      {filterState.activeFilters.map((filter) => (<filter_1.FilterChip key={filter.id} icon={categoryMap.get(filter.categoryKey)?.icon} value={filter.displayValue} config={chipConfig} onRemove={() => onFilterRemove(filter.id)}/>))}

      {/* Clear All Button */}
      {showClearAll && filterState.hasFilters && (<ClearAllButton onPress={onFiltersClear}/>)}
    </div>);
};
exports.FilterToolbar = FilterToolbar;
exports.FilterToolbar.displayName = 'FilterToolbar';
//# sourceMappingURL=filter-toolbar.js.map