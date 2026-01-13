"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterStatusBar = void 0;
/**
 * StickyDataTable - FilterStatusBar Component
 *
 * A floating status bar that displays filter information at the bottom of the table.
 * Shows "Showing X of Y orders" with a progress fill and active filter badges.
 *
 * @module components/status/filter-status-bar
 */
const react_1 = require("react");
const utils_1 = require("@/lib/utils");
const badge_1 = require("@/components/ui/prod/base/badge");
// ============================================================================
// FILTER STATUS BAR COMPONENT
// ============================================================================
/**
 * FilterStatusBar - Floating filter information display
 *
 * Features:
 * - Progress fill background showing filter ratio
 * - "Filtering X of Y orders" text
 * - Active filter badges
 * - Smooth fade in/out transitions
 */
const FilterStatusBarBase = ({ visibleCount, totalCount, activeFilters = [], visible = true, className, }) => {
    // Calculate percentage for progress fill
    const percentage = (0, react_1.useMemo)(() => {
        if (totalCount === 0)
            return 100;
        return (visibleCount / totalCount) * 100;
    }, [visibleCount, totalCount]);
    // Determine if we should show - only when filtering is active
    const hasContent = activeFilters.length > 0 || visibleCount !== totalCount;
    const shouldShow = visible && hasContent;
    return (<div className={(0, utils_1.cn)('pointer-events-none', className)} style={{
            opacity: shouldShow ? 1 : 0,
            transition: 'opacity 200ms ease-out',
        }}>
      <div className={(0, utils_1.cn)('pointer-events-auto', 'relative overflow-hidden', 'inline-flex items-center gap-2', 'rounded-full', 'px-3 py-1.5', 'bg-primary/95 backdrop-blur-sm', 'shadow-lg', 'border border-primary', 'text-xs font-medium', 'transition-all duration-200', 'motion-reduce:transition-none')}>
        {/* Progress fill background */}
        <div className="absolute inset-0 bg-brand-primary/10 transition-all duration-300 ease-out" style={{ width: `${percentage}%` }} aria-hidden="true"/>

        {/* Content (above the fill) */}
        <div className="relative z-10 flex items-center gap-2">
          {/* Count Display */}
          <span className="text-secondary whitespace-nowrap">
            Showing{' '}
            <span className="text-primary font-semibold">{visibleCount.toLocaleString()}</span>
            {' '}of{' '}
            <span className="text-tertiary">{totalCount.toLocaleString()}</span>
            {' '}orders
          </span>

          {/* Filter Badges */}
          {activeFilters.length > 0 && (<>
              <span className="bg-quaternary h-3 w-px shrink-0" aria-hidden="true"/>
              <div className="flex items-center gap-1">
                {activeFilters.map((filter) => (<badge_1.Badge key={filter.id} size="xs" color="gray">
                    {filter.label}
                  </badge_1.Badge>))}
              </div>
            </>)}
        </div>
      </div>
    </div>);
};
exports.FilterStatusBar = (0, react_1.memo)(FilterStatusBarBase);
exports.FilterStatusBar.displayName = 'FilterStatusBar';
//# sourceMappingURL=filter-status-bar.js.map