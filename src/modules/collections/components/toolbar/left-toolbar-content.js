"use strict";
/**
 * LeftToolbarContent Component
 *
 * Filter menu and active filter chips for the toolbar.
 * Uses prod/base/filter components with hardened styling.
 */
'use client';
/**
 * LeftToolbarContent Component
 *
 * Filter menu and active filter chips for the toolbar.
 * Uses prod/base/filter components with hardened styling.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeftToolbarContent = void 0;
const React = require("react");
const react_1 = require("react");
const react_2 = require("motion/react");
const utils_1 = require("@/lib/utils");
const filter_1 = require("@/components/ui/prod/base/filter");
const filter_config_1 = require("../../config/filter-config");
// =============================================================================
// FILTER OPTIONS BY CATEGORY
// =============================================================================
const FILTER_OPTIONS_BY_CATEGORY = {
    Status: [
        { id: 'status-collections', label: 'Collections' },
        { id: 'status-clawback', label: 'Last Chance' },
        { id: 'status-settled', label: 'Clawed back' },
    ],
    Outcome: [
        { id: 'outcome-defaulted', label: 'Defaulted' },
        { id: 'outcome-canceled', label: 'Canceled' },
        { id: 'outcome-chargeback', label: 'Chargeback' },
    ],
    Urgency: [
        { id: 'urgency-critical', label: 'Critical (0-3 days)' },
        { id: 'urgency-warning', label: 'Warning (4-7 days)' },
        { id: 'urgency-safe', label: 'Safe (8+ days)' },
    ],
    Balance: [
        { id: 'balance-high', label: '>$500' },
        { id: 'balance-medium', label: '$100-500' },
        { id: 'balance-low', label: '<$100' },
    ],
    Route: [
        { id: 'route-servicing', label: 'PAC' },
        { id: 'route-funding', label: 'Upfront' },
    ],
};
// =============================================================================
// FILTER SELECT CHIP MOTION CONFIG
// =============================================================================
const ANIMATION_CONFIG = {
    transitionType: 'tween',
    easing: 'easeOut',
    duration: 0.15,
    exitDuration: 0.05,
};
const STYLE_CONFIG = {
    size: 'sm',
    roundness: 'full',
    gap: 'md',
};
// =============================================================================
// COMPONENT
// =============================================================================
const LeftToolbarContent = ({ activeFilters, onFilterSelect, onFilterChange, onFilterRemove, onFiltersClear, className, }) => {
    const [isMenuOpen, setIsMenuOpen] = (0, react_1.useState)(false);
    // Transform activeFilters to FilterChipData format for the motion component
    // IMPORTANT: Use category as the stable ID so value changes don't trigger enter/exit animations
    const filterChipData = activeFilters.map((filter) => ({
        id: filter.category.toLowerCase(), // Stable key based on category (e.g., 'status')
        label: filter.category, // Category name shown in dropdown header
        icon: filter_config_1.FILTER_ICONS[filter.category],
        value: filter.id, // Currently selected option ID (e.g., 'status-collections')
        options: FILTER_OPTIONS_BY_CATEGORY[filter.category],
    }));
    // Handle filter value change (switching to a different option in same category)
    // filterId is now the category (e.g., 'status'), newValue is the new option ID
    const handleFilterChange = (categoryId, newValue) => {
        // Find the current filter for this category to get its option ID
        const currentFilter = activeFilters.find((f) => f.category.toLowerCase() === categoryId);
        if (currentFilter) {
            onFilterChange(currentFilter.id, newValue);
        }
    };
    // Handle filter removal
    // filterId is now the category (e.g., 'status'), need to find the actual option ID
    const handleFilterRemove = (categoryId) => {
        const currentFilter = activeFilters.find((f) => f.category.toLowerCase() === categoryId);
        if (currentFilter) {
            onFilterRemove(currentFilter.id);
        }
    };
    return (<div className={(0, utils_1.cn)('flex flex-wrap items-center gap-3', className)}>
      {/* Filter Menu */}
      <filter_1.FilterMenu trigger={<filter_1.FilterTrigger isOpen={isMenuOpen} label="Filter" size="md" rounded="full" variant="default"/>} items={filter_config_1.RISK_FILTER_ITEMS} onFilterSelect={onFilterSelect} activeFilterIds={activeFilters.map((f) => f.id)} onOpenChange={setIsMenuOpen} align="start" side="bottom" width={240}/>

      {/* Active Filter Chips - Using FilterSelectChipMotion */}
      {activeFilters.length > 0 && (<react_2.LayoutGroup>
          <filter_1.FilterSelectChipMotion filters={filterChipData} onFilterChange={handleFilterChange} onFilterRemove={handleFilterRemove} animationConfig={ANIMATION_CONFIG} styleConfig={STYLE_CONFIG}/>

          {/* Clear All Button - animated with LayoutGroup for smooth reflow */}
          <react_2.motion.button layout transition={{
                layout: {
                    type: 'tween',
                    duration: ANIMATION_CONFIG.duration,
                    ease: [0.33, 1, 0.68, 1],
                },
            }} onClick={onFiltersClear} className={(0, utils_1.cn)('text-sm font-medium text-tertiary hover:text-secondary', 'transition-colors whitespace-nowrap', 'outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand')}>
            Clear all
          </react_2.motion.button>
        </react_2.LayoutGroup>)}
    </div>);
};
exports.LeftToolbarContent = LeftToolbarContent;
exports.LeftToolbarContent.displayName = 'LeftToolbarContent';
//# sourceMappingURL=left-toolbar-content.js.map