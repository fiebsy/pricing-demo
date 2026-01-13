"use strict";
/**
 * FilterSelectChipMotion - Main Component
 *
 * Motion-based filter chip system with AnimatePresence + popLayout for fluid
 * add/remove animations. Uses Base UI Select for dropdown functionality.
 *
 * Key features:
 * - Scale-up entry animation that pushes other chips
 * - GPU-optimized: only opacity, scale, transform
 * - Spring or tween physics options
 * - Respects prefers-reduced-motion
 * - Base UI Select with anchored dropdown
 *
 * @module prod/base/filter/filter-select-chip-motion
 *
 * @example
 * ```tsx
 * import { FilterSelectChipMotion } from '@/components/ui/prod/base/filter'
 *
 * <FilterSelectChipMotion
 *   filters={activeFilters}
 *   onFilterChange={(id, value) => updateFilter(id, value)}
 *   onFilterRemove={(id) => removeFilter(id)}
 * />
 * ```
 */
'use client';
/**
 * FilterSelectChipMotion - Main Component
 *
 * Motion-based filter chip system with AnimatePresence + popLayout for fluid
 * add/remove animations. Uses Base UI Select for dropdown functionality.
 *
 * Key features:
 * - Scale-up entry animation that pushes other chips
 * - GPU-optimized: only opacity, scale, transform
 * - Spring or tween physics options
 * - Respects prefers-reduced-motion
 * - Base UI Select with anchored dropdown
 *
 * @module prod/base/filter/filter-select-chip-motion
 *
 * @example
 * ```tsx
 * import { FilterSelectChipMotion } from '@/components/ui/prod/base/filter'
 *
 * <FilterSelectChipMotion
 *   filters={activeFilters}
 *   onFilterChange={(id, value) => updateFilter(id, value)}
 *   onFilterRemove={(id) => removeFilter(id)}
 * />
 * ```
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterSelectChipMotion = void 0;
const react_1 = require("motion/react");
const utils_1 = require("@/lib/utils");
const components_1 = require("./components");
const config_1 = require("./config");
// ============================================================================
// Component
// ============================================================================
function FilterSelectChipMotion({ filters, onFilterChange, onFilterRemove, animationConfig: animationConfigProp, styleConfig: styleConfigProp, showDebug = false, className, }) {
    const shouldReduceMotion = (0, react_1.useReducedMotion)();
    // Merge configs with defaults
    const animationConfig = (0, config_1.mergeAnimationConfig)(animationConfigProp);
    const styleConfig = (0, config_1.mergeStyleConfig)(styleConfigProp);
    return (<div className={(0, utils_1.cn)('flex flex-wrap items-center', (0, config_1.getGapClass)(styleConfig.gap), className)}>
      <react_1.AnimatePresence mode="popLayout">
        {filters.map((filter, index) => (<components_1.AnimatedChip key={filter.id} filter={filter} index={index} animationConfig={animationConfig} styleConfig={styleConfig} shouldReduceMotion={shouldReduceMotion} onValueChange={(value) => onFilterChange?.(filter.id, value)} onRemove={() => onFilterRemove?.(filter.id)} showDebug={showDebug}/>))}
      </react_1.AnimatePresence>
    </div>);
}
exports.FilterSelectChipMotion = FilterSelectChipMotion;
FilterSelectChipMotion.displayName = 'FilterSelectChipMotion';
//# sourceMappingURL=filter-select-chip-motion.js.map