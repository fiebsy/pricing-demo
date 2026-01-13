"use strict";
/**
 * OptionList - Selectable Options with Checkmarks
 *
 * Displays filter options with checkmarks on selected items.
 * Provides keyboard navigation via imperative handle.
 *
 * @module prod/base/filter/filter-select-chip/components/option-list
 */
'use client';
/**
 * OptionList - Selectable Options with Checkmarks
 *
 * Displays filter options with checkmarks on selected items.
 * Provides keyboard navigation via imperative handle.
 *
 * @module prod/base/filter/filter-select-chip/components/option-list
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionList = void 0;
const React = require("react");
const react_1 = require("react");
const utils_1 = require("@/lib/utils");
const icon_1 = require("@/components/ui/prod/base/icon");
const Tick02Icon_1 = require("@hugeicons-pro/core-stroke-rounded/Tick02Icon");
const config_1 = require("@/components/ui/prod/base/menu/config");
// ============================================================================
// TEXT SIZE CLASSES
// ============================================================================
const TEXT_SIZE_CLASSES = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
};
// ============================================================================
// COMPONENT
// ============================================================================
exports.OptionList = React.forwardRef(({ options, selectedId, onSelect, itemHeight = 32, itemTextSize = 'sm', itemGap = 2, maxHeight = 260, itemSquircle = true, }, ref) => {
    // Find initial highlight index based on selected item
    const initialIndex = (0, react_1.useMemo)(() => {
        const idx = options.findIndex((o) => o.id === selectedId);
        return idx >= 0 ? idx : 0;
    }, [options, selectedId]);
    const [highlightIndex, setHighlightIndex] = (0, react_1.useState)(initialIndex);
    const listRef = (0, react_1.useRef)(null);
    // Get only non-disabled options for keyboard navigation
    const navigableOptions = (0, react_1.useMemo)(() => options.filter((o) => !o.disabled), [options]);
    // Scroll highlighted item into view
    (0, react_1.useEffect)(() => {
        if (!listRef.current)
            return;
        const highlighted = listRef.current.querySelector('[data-highlighted="true"]');
        if (highlighted) {
            highlighted.scrollIntoView({ block: 'nearest' });
        }
    }, [highlightIndex]);
    // Keyboard navigation handlers
    const highlightNext = (0, react_1.useCallback)(() => {
        setHighlightIndex((prev) => Math.min(prev + 1, navigableOptions.length - 1));
    }, [navigableOptions.length]);
    const highlightPrev = (0, react_1.useCallback)(() => {
        setHighlightIndex((prev) => Math.max(prev - 1, 0));
    }, []);
    const selectHighlighted = (0, react_1.useCallback)(() => {
        const option = navigableOptions[highlightIndex];
        if (option && !option.disabled) {
            onSelect(option.id);
        }
    }, [navigableOptions, highlightIndex, onSelect]);
    const resetHighlight = (0, react_1.useCallback)(() => {
        const idx = navigableOptions.findIndex((o) => o.id === selectedId);
        setHighlightIndex(idx >= 0 ? idx : 0);
    }, [navigableOptions, selectedId]);
    // Expose methods via ref
    (0, react_1.useImperativeHandle)(ref, () => ({
        highlightNext,
        highlightPrev,
        selectHighlighted,
        resetHighlight,
    }));
    return (<div ref={listRef} role="listbox" className="overflow-y-auto flex flex-col" style={{ maxHeight, gap: itemGap }}>
        {options.map((option) => {
            const isSelected = option.id === selectedId;
            const navigableIndex = navigableOptions.findIndex((o) => o.id === option.id);
            const isHighlighted = navigableIndex === highlightIndex;
            return (<button key={option.id} type="button" role="option" aria-selected={isSelected} aria-disabled={option.disabled} data-highlighted={isHighlighted} onClick={() => {
                    if (!option.disabled) {
                        onSelect(option.id);
                    }
                }} className={(0, utils_1.cn)('w-full flex items-center justify-between', config_1.MENU_ITEM_STYLES.paddingX, 'transition-colors duration-150', 'outline-none text-left', itemSquircle && 'corner-squircle', 
                // Highlight state
                isHighlighted && 'bg-quaternary', 
                // Interactive states
                !isHighlighted && config_1.INTERACTIVE_STATES.hover, 
                // Disabled state
                option.disabled && 'opacity-50 pointer-events-none')} style={{
                    height: itemHeight,
                    borderRadius: 'var(--menu-item-radius, 12px)',
                }}>
              <div className="flex items-center gap-2.5 min-w-0">
                {/* Option Icon (if provided) */}
                {option.icon != null ? (<icon_1.HugeIcon icon={option.icon} size={config_1.MENU_ITEM_STYLES.iconSize} strokeWidth={config_1.MENU_ITEM_STYLES.iconStrokeWidth} className={(0, utils_1.cn)(config_1.MENU_ITEM_STYLES.iconColor, config_1.MENU_ITEM_STYLES.iconOpacity, 'shrink-0')}/>) : null}

                {/* Label */}
                <span className={(0, utils_1.cn)(TEXT_SIZE_CLASSES[itemTextSize], config_1.MENU_ITEM_STYLES.textWeight, 'text-primary truncate')}>
                  {option.label}
                </span>
              </div>

              {/* Checkmark for selected item or disabled (selected elsewhere) */}
              {(isSelected || option.disabled) && (<icon_1.HugeIcon icon={Tick02Icon_1.default} size={16} strokeWidth={2} className={(0, utils_1.cn)('shrink-0', isSelected ? 'text-brand-primary' : 'text-tertiary')}/>)}
            </button>);
        })}
      </div>);
});
exports.OptionList.displayName = 'OptionList';
//# sourceMappingURL=option-list.js.map