"use strict";
/**
 * FilterSelectChip - Biaxial Animated Filter Dropdown
 *
 * A filter chip that expands into a menu for selecting filter options.
 * Uses the two-layer animation system:
 *
 * 1. **Backdrop Layer** - Animates size with shine/shadow
 * 2. **Content Layer** - Uses clip-path for smooth reveal
 *
 * The trigger (filter chip) retains its exact appearance and entry animation.
 *
 * @module prod/base/filter/filter-select-chip/filter-select-chip
 */
'use client';
/**
 * FilterSelectChip - Biaxial Animated Filter Dropdown
 *
 * A filter chip that expands into a menu for selecting filter options.
 * Uses the two-layer animation system:
 *
 * 1. **Backdrop Layer** - Animates size with shine/shadow
 * 2. **Content Layer** - Uses clip-path for smooth reveal
 *
 * The trigger (filter chip) retains its exact appearance and entry animation.
 *
 * @module prod/base/filter/filter-select-chip/filter-select-chip
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterSelectChip = void 0;
const React = require("react");
const react_1 = require("react");
const utils_1 = require("@/lib/utils");
const config_1 = require("@/components/ui/prod/base/menu/config");
const icon_1 = require("@/components/ui/prod/base/icon");
const CancelCircleIcon_1 = require("@hugeicons-pro/core-solid-rounded/CancelCircleIcon");
// CSS-driven transitions (S-tier: transform + opacity only)
require("./filter-select-chip-transitions.css");
const config_2 = require("./config");
const components_1 = require("./components");
/** Padding inside menu items (matches px-2.5) */
const MENU_ITEM_PADDING = 10;
// ============================================================================
// HELPERS
// ============================================================================
/**
 * Calculate panel height based on options count
 */
function calculatePanelHeight(config, optionCount, chipHeight) {
    const itemsHeight = optionCount * config.itemHeight;
    const gapsHeight = Math.max(0, optionCount - 1) * config.itemGap;
    const padding = config.innerPadding * 2;
    const calculatedHeight = config.topExtension + chipHeight + config.contentTopOffset + itemsHeight + gapsHeight + padding;
    return Math.min(calculatedHeight, config.maxPanelHeight + chipHeight + config.topExtension);
}
/**
 * Get clip-path for biaxial animation
 *
 * When collapsed, chip is always at left=0 (for entry animation).
 * When expanded with center anchor, panel expands from center.
 */
function getClipPath(expanded, panelWidth, panelHeight, chipWidth, chipHeight, borderRadius, topExtension) {
    const round = `round ${borderRadius}px`;
    if (expanded) {
        return `inset(0 0 0 0 ${round})`;
    }
    // Collapsed - always show chip area from left edge (chip is at left=0 when closed)
    const bottomInset = panelHeight - chipHeight - topExtension;
    const topInset = topExtension;
    const rightInset = panelWidth - chipWidth;
    return `inset(${topInset}px ${rightInset}px ${bottomInset}px 0px ${round})`;
}
// ============================================================================
// COMPONENT
// ============================================================================
const FilterSelectChip = ({ value, options, disabledOptions = [], icon, label, expandedLabel, config: userConfig, onChange, onRemove, triggerMode = 'click', hoverOpenDelay = 0, hoverCloseDelay = 150, className, }) => {
    // Merge config with defaults
    const config = (0, react_1.useMemo)(() => (0, config_2.mergeConfig)(userConfig), [userConfig]);
    // State
    const [menuExpanded, setMenuExpanded] = (0, react_1.useState)(false);
    const containerRef = (0, react_1.useRef)(null);
    const listRef = (0, react_1.useRef)(null);
    const hoverOpenTimeoutRef = (0, react_1.useRef)(null);
    const hoverCloseTimeoutRef = (0, react_1.useRef)(null);
    // Get chip dimensions from size config
    const chipSizeConfig = config_2.CHIP_SIZE_CONFIGS[config.chipSize];
    const chipHeight = chipSizeConfig?.height ?? 32;
    // Get selected option label for display
    const selectedOption = (0, react_1.useMemo)(() => options.find((o) => o.id === value), [options, value]);
    const displayValue = selectedOption?.label ?? value;
    // Merge disabled options into the options array
    const optionsWithDisabled = (0, react_1.useMemo)(() => options.map((option) => ({
        ...option,
        disabled: option.disabled || disabledOptions.includes(option.id),
    })), [options, disabledOptions]);
    // Calculate dimensions
    const panelHeight = (0, react_1.useMemo)(() => calculatePanelHeight(config, options.length, chipHeight), [config, options.length, chipHeight]);
    // Item radius = container radius - padding
    const itemRadius = (0, react_1.useMemo)(() => Math.max(0, config.borderRadius - config.innerPadding), [config.borderRadius, config.innerPadding]);
    // We need to measure the chip width dynamically
    const [chipWidth, setChipWidth] = (0, react_1.useState)(100);
    const chipMeasureRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        if (!chipMeasureRef.current)
            return;
        const measure = () => {
            if (chipMeasureRef.current) {
                setChipWidth(chipMeasureRef.current.offsetWidth);
            }
        };
        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(chipMeasureRef.current);
        return () => observer.disconnect();
    }, [displayValue, icon, label, config.chipSize]);
    // ---------------------------------------------------------------------------
    // Handlers
    // ---------------------------------------------------------------------------
    const handleToggle = (0, react_1.useCallback)(() => {
        setMenuExpanded((prev) => !prev);
    }, []);
    // Hover handlers
    const handleMouseEnter = (0, react_1.useCallback)(() => {
        if (triggerMode !== 'hover')
            return;
        // Clear any pending close timeout
        if (hoverCloseTimeoutRef.current) {
            clearTimeout(hoverCloseTimeoutRef.current);
            hoverCloseTimeoutRef.current = null;
        }
        // Set open timeout
        hoverOpenTimeoutRef.current = setTimeout(() => {
            setMenuExpanded(true);
        }, hoverOpenDelay);
    }, [triggerMode, hoverOpenDelay]);
    const handleMouseLeave = (0, react_1.useCallback)(() => {
        if (triggerMode !== 'hover')
            return;
        // Clear any pending open timeout
        if (hoverOpenTimeoutRef.current) {
            clearTimeout(hoverOpenTimeoutRef.current);
            hoverOpenTimeoutRef.current = null;
        }
        // Set close timeout
        hoverCloseTimeoutRef.current = setTimeout(() => {
            setMenuExpanded(false);
        }, hoverCloseDelay);
    }, [triggerMode, hoverCloseDelay]);
    // Cleanup hover timeouts on unmount
    (0, react_1.useEffect)(() => {
        return () => {
            if (hoverOpenTimeoutRef.current)
                clearTimeout(hoverOpenTimeoutRef.current);
            if (hoverCloseTimeoutRef.current)
                clearTimeout(hoverCloseTimeoutRef.current);
        };
    }, []);
    const handleSelect = (0, react_1.useCallback)((optionId) => {
        onChange?.(optionId);
        setMenuExpanded(false);
    }, [onChange]);
    // Handle keyboard navigation when expanded
    (0, react_1.useEffect)(() => {
        if (!menuExpanded)
            return;
        const handleKeyDown = (e) => {
            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    listRef.current?.highlightNext();
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    listRef.current?.highlightPrev();
                    break;
                case 'Enter':
                    e.preventDefault();
                    listRef.current?.selectHighlighted();
                    break;
                case 'Escape':
                    e.preventDefault();
                    setMenuExpanded(false);
                    break;
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [menuExpanded]);
    // Click outside to close
    (0, react_1.useEffect)(() => {
        if (!menuExpanded)
            return;
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setMenuExpanded(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [menuExpanded]);
    // Reset highlight when opening
    (0, react_1.useEffect)(() => {
        if (menuExpanded) {
            listRef.current?.resetHighlight();
        }
    }, [menuExpanded]);
    // ---------------------------------------------------------------------------
    // Animation Values
    // ---------------------------------------------------------------------------
    const clipPath = getClipPath(menuExpanded, config.minPanelWidth, panelHeight, chipWidth, chipHeight, config.borderRadius, config.topExtension);
    // CSS custom properties for CSS-driven animations
    const cssVariables = (0, react_1.useMemo)(() => (0, config_2.getFSCCSSVariables)(config, { chipWidth, chipHeight, panelHeight }), [config, chipWidth, chipHeight, panelHeight]);
    // ---------------------------------------------------------------------------
    // Styling
    // ---------------------------------------------------------------------------
    const popupClasses = (0, react_1.useMemo)(() => (0, config_1.getPopupClasses)(config.appearance), [config.appearance]);
    const gradientStyles = (0, react_1.useMemo)(() => (0, config_1.getGradientStyles)(config.appearance), [config.appearance]);
    // ---------------------------------------------------------------------------
    // Render
    // ---------------------------------------------------------------------------
    return (<div ref={containerRef} className={(0, utils_1.cn)('filter-select-chip-container relative inline-block', className)} style={{
            ...cssVariables,
            width: chipWidth,
            height: chipHeight,
            zIndex: menuExpanded ? 50 : 'auto',
        }} data-fsc-expanded={menuExpanded} data-fsc-anchor={config.menuAnchor} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {/* Hidden chip measurement element */}
      <div ref={chipMeasureRef} aria-hidden="true" className="absolute top-0 left-0 pointer-events-none" style={{ visibility: 'hidden' }}>
        <components_1.ChipTrigger value={displayValue} icon={icon} label={label} expandedLabel={expandedLabel} isExpanded={false} onClick={() => { }} onRemove={onRemove} chipSize={config.chipSize} chipRounded={config.chipRounded} iconSize={config.iconSize} iconOpacity={config.iconOpacity} iconValueGap={config.iconValueGap} paddingLeft={config.paddingLeft} paddingRight={config.paddingRight} chipDuration={config.chipDuration} revealMode={config.revealMode} chipExpandAnimation={config.chipExpandAnimation}/>
      </div>

      {/* Backdrop Layer - CSS-driven size animation */}
      <div className={(0, utils_1.cn)('fsc-backdrop', popupClasses, 
        // Apply squircle corners on open if enabled
        config.squircleOnOpen && menuExpanded && 'corner-squircle')} style={gradientStyles}/>

      {/* Content Layer - uses CLIP-PATH for smooth reveal */}
      <div className="fsc-content" style={{
            clipPath,
            '--menu-item-radius': `${itemRadius}px`,
        }}>
        {/* Chip Trigger - CSS handles center anchor positioning */}
        <div className="fsc-trigger">
          <components_1.ChipTrigger value={displayValue} icon={icon} label={label} expandedLabel={expandedLabel} isExpanded={menuExpanded} onClick={handleToggle} onRemove={onRemove} hideCloseButton={menuExpanded} chipSize={config.chipSize} chipRounded={config.chipRounded} iconSize={config.iconSize} iconOpacity={config.iconOpacity} iconValueGap={config.iconValueGap} paddingLeft={config.paddingLeft} paddingRight={config.paddingRight} chipDuration={config.chipDuration} revealMode={config.revealMode} chipExpandAnimation={config.chipExpandAnimation}/>
        </div>

        {/* Close Button - CSS-driven opacity animation */}
        {onRemove && (<button type="button" onClick={(e) => {
                e.stopPropagation();
                onRemove();
            }} className={(0, utils_1.cn)('fsc-close rounded-full', 'text-tertiary hover:text-primary', 'transition-colors duration-150', 'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand')} style={{
                top: config.topExtension + (chipHeight - chipSizeConfig.closeSize) / 2,
                // Align with checkmark center (innerPadding + itemPadding + half icon width)
                right: config.innerPadding + MENU_ITEM_PADDING + 8 - chipSizeConfig.closeSize / 2,
                width: chipSizeConfig.closeSize,
                height: chipSizeConfig.closeSize,
            }} aria-label={`Remove ${displayValue} filter`}>
            <icon_1.HugeIcon icon={CancelCircleIcon_1.default} size={chipSizeConfig.closeSize} strokeWidth={0}/>
          </button>)}

        {/* Options List - CSS-driven opacity animation */}
        <div className="fsc-options" style={{
            top: config.topExtension + chipHeight + config.contentTopOffset,
            padding: config.innerPadding,
        }}>
          {/* Header Separator */}
          {config.showHeaderSeparator && (<div className="fsc-separator border-t border-primary -mx-1 mb-1" role="separator"/>)}

          <components_1.OptionList ref={listRef} options={optionsWithDisabled} selectedId={value} onSelect={handleSelect} itemHeight={config.itemHeight} itemGap={config.itemGap} maxHeight={config.maxPanelHeight - chipHeight - config.innerPadding * 2} itemSquircle={config.itemSquircle}/>
        </div>
      </div>
    </div>);
};
exports.FilterSelectChip = FilterSelectChip;
exports.FilterSelectChip.displayName = 'FilterSelectChip';
//# sourceMappingURL=filter-select-chip.js.map