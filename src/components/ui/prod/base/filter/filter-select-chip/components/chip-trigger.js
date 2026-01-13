"use strict";
/**
 * ChipTrigger - Chip Display for FilterSelectChip
 *
 * Renders the filter chip that serves as the trigger for the expanded menu.
 * Retains the styling and entry animation of the production FilterChip.
 *
 * @module prod/base/filter/filter-select-chip/components/chip-trigger
 */
'use client';
/**
 * ChipTrigger - Chip Display for FilterSelectChip
 *
 * Renders the filter chip that serves as the trigger for the expanded menu.
 * Retains the styling and entry animation of the production FilterChip.
 *
 * @module prod/base/filter/filter-select-chip/components/chip-trigger
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChipTrigger = void 0;
const React = require("react");
const react_1 = require("react");
const utils_1 = require("@/lib/utils");
const icon_1 = require("@/components/ui/prod/base/icon");
const CancelCircleIcon_1 = require("@hugeicons-pro/core-solid-rounded/CancelCircleIcon");
const config_1 = require("../config");
/** Gap between value and close button (matches filter-chip) */
const VALUE_CLOSE_GAP = 10;
// ============================================================================
// COMPONENT
// ============================================================================
const ChipTrigger = ({ value, icon, label, expandedLabel, isExpanded, onClick, onRemove, hideCloseButton = false, chipSize, chipRounded, iconSize, iconOpacity, iconValueGap, paddingLeft, paddingRight, chipDuration, chipExpandAnimation = true, }) => {
    const measureRef = (0, react_1.useRef)(null);
    const expandedMeasureRef = (0, react_1.useRef)(null);
    const iconLabelRef = (0, react_1.useRef)(null);
    const sizeConfig = config_1.CHIP_SIZE_CONFIGS[chipSize];
    const roundedClass = config_1.CHIP_ROUNDED_CLASSES[chipRounded];
    const hasIcon = !!icon;
    const hasExpandedLabel = hasIcon && !!expandedLabel;
    // Show close icon unless explicitly hidden
    const showCloseIcon = !hideCloseButton;
    // ============================================================================
    // Measurement
    // ============================================================================
    const [collapsedWidth, setCollapsedWidth] = (0, react_1.useState)(0);
    const [expandedWidth, setExpandedWidth] = (0, react_1.useState)(0);
    const [expandedWithLabelWidth, setExpandedWithLabelWidth] = (0, react_1.useState)(0);
    (0, react_1.useLayoutEffect)(() => {
        const measure = () => {
            if (measureRef.current) {
                setExpandedWidth(measureRef.current.offsetWidth);
            }
            if (expandedMeasureRef.current) {
                setExpandedWithLabelWidth(expandedMeasureRef.current.offsetWidth);
            }
            if (iconLabelRef.current) {
                setCollapsedWidth(iconLabelRef.current.offsetWidth);
            }
        };
        measure();
        const observer = new ResizeObserver(measure);
        if (measureRef.current)
            observer.observe(measureRef.current);
        if (expandedMeasureRef.current)
            observer.observe(expandedMeasureRef.current);
        if (iconLabelRef.current)
            observer.observe(iconLabelRef.current);
        return () => observer.disconnect();
    }, [value, label, expandedLabel, icon, chipSize]);
    // ============================================================================
    // Fade-in on mount (only after measurements are ready)
    // ============================================================================
    const [isVisible, setIsVisible] = (0, react_1.useState)(false);
    const [chipExpanded, setChipExpanded] = (0, react_1.useState)(!chipExpandAnimation); // Start expanded if no animation
    const hasMeasurements = collapsedWidth > 0 && expandedWidth > 0 &&
        (!hasExpandedLabel || expandedWithLabelWidth > 0);
    (0, react_1.useEffect)(() => {
        if (!hasMeasurements)
            return;
        const frame = requestAnimationFrame(() => {
            setIsVisible(true);
            if (chipExpandAnimation) {
                setChipExpanded(true);
            }
        });
        return () => cancelAnimationFrame(frame);
    }, [hasMeasurements, chipExpandAnimation]);
    // ============================================================================
    // Render Helpers
    // ============================================================================
    const renderIconOrLabel = () => {
        if (hasIcon) {
            return (<icon_1.HugeIcon icon={icon} size={iconSize} strokeWidth={2} className="text-tertiary flex-shrink-0" style={{ opacity: iconOpacity }}/>);
        }
        return (<span className={(0, utils_1.cn)(sizeConfig?.textClass, 'font-medium text-tertiary whitespace-nowrap')} style={{ opacity: iconOpacity }}>
        {label}:
      </span>);
    };
    // Show expanded label when menu is open
    const showExpandedLabelNow = isExpanded && hasExpandedLabel;
    // ============================================================================
    // Clip-path Animation (S-tier: no layout, paint-only)
    // ============================================================================
    // Target width based on current state (what we want to show)
    const targetWidth = (0, react_1.useMemo)(() => {
        if (!chipExpanded)
            return collapsedWidth;
        if (showExpandedLabelNow)
            return expandedWithLabelWidth;
        return expandedWidth;
    }, [chipExpanded, showExpandedLabelNow, collapsedWidth, expandedWidth, expandedWithLabelWidth]);
    // Clip amount for entry animation only (collapsed -> expanded)
    // After entry, clipRight is 0 and width changes handle state transitions
    const clipRight = (0, react_1.useMemo)(() => {
        if (!chipExpanded) {
            // Entry animation: reveal from icon to full width
            return targetWidth - collapsedWidth;
        }
        // After entry: no clipping, width handles the rest
        return 0;
    }, [chipExpanded, targetWidth, collapsedWidth]);
    // Border radius for clip-path (must match chip's rounded style)
    const clipBorderRadius = (0, react_1.useMemo)(() => {
        if (chipRounded === 'full')
            return (sizeConfig?.height ?? 32) / 2;
        const radiusMap = {
            sm: 6, // rounded-md
            md: 8, // rounded-lg
            lg: 12, // rounded-xl
            full: 16,
        };
        return radiusMap[chipRounded] ?? 8;
    }, [chipRounded, sizeConfig?.height]);
    // Calculate content opacity based on chip expansion state
    const contentOpacity = (0, react_1.useMemo)(() => {
        if (!chipExpanded)
            return 0;
        return 1;
    }, [chipExpanded]);
    return (<div className="fsc-chip-wrapper relative inline-flex" style={{ opacity: isVisible ? 1 : 0 }}>
      {/* Hidden measurement element - normal layout (icon + value) */}
      <div ref={measureRef} aria-hidden="true" className={(0, utils_1.cn)('inline-flex items-center', roundedClass, 'whitespace-nowrap pointer-events-none')} style={{
            visibility: 'hidden',
            position: 'absolute',
            top: 0,
            left: 0,
            height: sizeConfig?.height,
            paddingLeft: paddingLeft,
            paddingRight: paddingRight,
        }}>
        <span ref={iconLabelRef} className="inline-flex items-center" style={{
            height: sizeConfig?.height,
            paddingLeft: paddingLeft,
            marginLeft: -paddingLeft,
        }}>
          {renderIconOrLabel()}
        </span>
        <span className={(0, utils_1.cn)(sizeConfig?.textClass, 'font-medium text-primary whitespace-nowrap')} style={{ marginLeft: iconValueGap }}>
          {value}
        </span>
        {/* Close button placeholder for measurement */}
        {showCloseIcon && (<span className="inline-flex items-center justify-center shrink-0" style={{ width: sizeConfig?.closeSize, height: sizeConfig?.closeSize, marginLeft: VALUE_CLOSE_GAP }}/>)}
      </div>

      {/* Hidden measurement element - expanded layout (icon + label: + value) */}
      {hasExpandedLabel && (<div ref={expandedMeasureRef} aria-hidden="true" className={(0, utils_1.cn)('inline-flex items-center', roundedClass, 'whitespace-nowrap pointer-events-none')} style={{
                visibility: 'hidden',
                position: 'absolute',
                top: 0,
                left: 0,
                height: sizeConfig?.height,
                paddingLeft: paddingLeft,
                paddingRight: paddingRight,
            }}>
          {/* Icon */}
          <icon_1.HugeIcon icon={icon} size={iconSize} strokeWidth={2} className="text-tertiary flex-shrink-0" style={{ opacity: iconOpacity }}/>
          {/* Label */}
          <span className={(0, utils_1.cn)(sizeConfig?.textClass, 'font-medium text-tertiary whitespace-nowrap')} style={{ marginLeft: iconValueGap, opacity: iconOpacity }}>
            {expandedLabel}:
          </span>
          {/* Value */}
          <span className={(0, utils_1.cn)(sizeConfig?.textClass, 'font-medium text-primary whitespace-nowrap')} style={{ marginLeft: iconValueGap }}>
            {value}
          </span>
          {/* Close button placeholder */}
          {showCloseIcon && (<span className="inline-flex items-center justify-center shrink-0" style={{ width: sizeConfig?.closeSize, height: sizeConfig?.closeSize, marginLeft: VALUE_CLOSE_GAP }}/>)}
        </div>)}

      {/* Visible animated chip (acts as trigger) - transparent since backdrop provides visual surface */}
      {/* Uses clip-path for entry animation (C-tier: paint only), width for state changes */}
      <div className={(0, utils_1.cn)('fsc-chip-clip relative overflow-hidden', roundedClass)} style={{
            width: targetWidth || 'auto',
            height: sizeConfig?.height,
            clipPath: clipRight > 0 ? `inset(0 ${clipRight}px 0 0 round ${clipBorderRadius}px)` : undefined,
        }}>
        {/* Clickable area for opening menu (excludes close button area) */}
        <button type="button" onClick={onClick} className={(0, utils_1.cn)('absolute inset-0 cursor-pointer', 'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand', roundedClass)} style={{
            right: showCloseIcon ? (sizeConfig?.closeSize ?? 16) + paddingRight : 0,
        }} aria-label="Open filter menu"/>

        {/* Icon/Label - absolutely positioned, never moves */}
        <div className="absolute left-0 top-0 bottom-0 flex items-center justify-center pointer-events-none" style={{
            width: collapsedWidth,
            paddingLeft: paddingLeft,
        }}>
          {renderIconOrLabel()}
        </div>

        {/* Value area - revealed as chip expands, with optional label when menu is open */}
        <div className="fsc-chip-value absolute top-0 bottom-0 flex items-center pointer-events-none" style={{
            left: collapsedWidth,
            right: showCloseIcon ? (sizeConfig?.closeSize ?? 16) + paddingRight : paddingRight,
            paddingLeft: iconValueGap,
            opacity: contentOpacity,
        }}>
          {/* Show label when expanded with expandedLabel */}
          {showExpandedLabelNow && (<span className={(0, utils_1.cn)(sizeConfig?.textClass, 'font-medium text-tertiary whitespace-nowrap')} style={{ opacity: iconOpacity, marginRight: iconValueGap }}>
              {expandedLabel}:
            </span>)}
          <span className={(0, utils_1.cn)(sizeConfig?.textClass, 'font-medium text-primary whitespace-nowrap')}>
            {value}
          </span>
        </div>

        {/* Close icon - always visible, interactive only when onRemove provided */}
        {showCloseIcon && (<div className="fsc-chip-close-area absolute top-0 bottom-0 right-0 flex items-center" style={{
                paddingRight: paddingRight,
                opacity: contentOpacity,
            }}>
            {onRemove ? (<button type="button" onClick={(e) => {
                    e.stopPropagation();
                    onRemove();
                }} className={(0, utils_1.cn)('flex-shrink-0 flex items-center justify-center rounded-full', 'text-tertiary hover:text-primary', 'transition-colors duration-150', 'motion-reduce:transition-none', 'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand')} style={{
                    width: sizeConfig?.closeSize,
                    height: sizeConfig?.closeSize
                }} aria-label={`Remove ${value} filter`}>
                <icon_1.HugeIcon icon={CancelCircleIcon_1.default} size={sizeConfig?.closeSize ?? 16} strokeWidth={0}/>
              </button>) : (<span className="flex-shrink-0 flex items-center justify-center text-tertiary" style={{
                    width: sizeConfig?.closeSize,
                    height: sizeConfig?.closeSize
                }}>
                <icon_1.HugeIcon icon={CancelCircleIcon_1.default} size={sizeConfig?.closeSize ?? 16} strokeWidth={0}/>
              </span>)}
          </div>)}
      </div>
    </div>);
};
exports.ChipTrigger = ChipTrigger;
exports.ChipTrigger.displayName = 'ChipTrigger';
//# sourceMappingURL=chip-trigger.js.map