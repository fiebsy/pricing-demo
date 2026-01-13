"use strict";
/**
 * Filter Chip - Main Component
 *
 * Expanding filter chip that animates from icon to full value display.
 *
 * @module prod/base/filter/filter-chip/filter-chip
 */
'use client';
/**
 * Filter Chip - Main Component
 *
 * Expanding filter chip that animates from icon to full value display.
 *
 * @module prod/base/filter/filter-chip/filter-chip
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterChip = void 0;
const react_1 = require("react");
const CancelCircleIcon_1 = require("@hugeicons-pro/core-solid-rounded/CancelCircleIcon");
const utils_1 = require("@/lib/utils");
const icon_1 = require("@/components/ui/prod/base/icon");
const config_1 = require("./config");
const use_chip_animation_1 = require("./use-chip-animation");
// ============================================================================
// Component
// ============================================================================
const FilterChip = ({ value, icon, label, onRemove, config: configProp, defaultExpanded = false, expanded, onExpandedChange, className, }) => {
    const containerRef = (0, react_1.useRef)(null);
    const measureRef = (0, react_1.useRef)(null);
    const iconLabelRef = (0, react_1.useRef)(null);
    // Memoize config merge to prevent recalculation
    const config = (0, react_1.useMemo)(() => (0, config_1.mergeConfig)(configProp), [configProp]);
    const sizeConfig = (0, react_1.useMemo)(() => (0, config_1.getSizeConfig)(config.size), [config.size]);
    const roundedClass = config_1.ROUNDED_CLASSES[config.rounded];
    const hasIcon = !!icon;
    // ============================================================================
    // Animation
    // ============================================================================
    const animation = (0, use_chip_animation_1.useChipAnimation)({
        defaultExpanded,
        expanded,
        onExpandedChange,
        duration: config.duration,
        revealMode: config.revealMode,
        opacityFadeRatio: config.opacityFadeRatio,
    });
    // ============================================================================
    // Measurement
    // ============================================================================
    const [collapsedWidth, setCollapsedWidth] = (0, react_1.useState)(0);
    const [expandedWidth, setExpandedWidth] = (0, react_1.useState)(0);
    (0, react_1.useLayoutEffect)(() => {
        const measure = () => {
            if (measureRef.current) {
                setExpandedWidth(measureRef.current.offsetWidth);
            }
            if (iconLabelRef.current) {
                setCollapsedWidth(iconLabelRef.current.offsetWidth);
            }
        };
        measure();
        // Re-measure on resize
        const observer = new ResizeObserver(measure);
        if (measureRef.current)
            observer.observe(measureRef.current);
        if (iconLabelRef.current)
            observer.observe(iconLabelRef.current);
        return () => observer.disconnect();
    }, [value, label, icon, config.size]);
    // ============================================================================
    // Handlers
    // ============================================================================
    const handleRemove = (0, react_1.useCallback)(() => {
        onRemove?.();
    }, [onRemove]);
    const handleTransitionEnd = (0, react_1.useCallback)((e) => {
        if (e.target === containerRef.current) {
            animation.onTransitionEnd(e);
        }
    }, [animation]);
    const currentWidth = animation.isExpanded ? expandedWidth : collapsedWidth;
    // ============================================================================
    // Fade-in on mount (only after measurements are ready)
    // ============================================================================
    const [isVisible, setIsVisible] = (0, react_1.useState)(false);
    const hasMeasurements = collapsedWidth > 0 && expandedWidth > 0;
    (0, react_1.useEffect)(() => {
        if (!hasMeasurements)
            return;
        const frame = requestAnimationFrame(() => setIsVisible(true));
        return () => cancelAnimationFrame(frame);
    }, [hasMeasurements]);
    // ============================================================================
    // Render Helpers
    // ============================================================================
    const renderIconOrLabel = () => {
        if (hasIcon) {
            return (<icon_1.HugeIcon icon={icon} size={config.iconSize} strokeWidth={2} className="text-tertiary flex-shrink-0" style={{ opacity: config.iconOpacity }}/>);
        }
        return (<span className={(0, utils_1.cn)(sizeConfig.textClass, 'font-medium text-tertiary whitespace-nowrap')} style={{ opacity: config.iconOpacity }}>
        {label}:
      </span>);
    };
    return (<div className="relative inline-flex" style={{
            opacity: isVisible ? 1 : 0,
            transition: `opacity 200ms ${config_1.EASING_EXPO_OUT}`,
        }}>
      {/* Hidden measurement element */}
      <div ref={measureRef} aria-hidden="true" className={(0, utils_1.cn)('inline-flex items-center', 'bg-secondary border border-transparent shine-3-subtle', roundedClass, 'whitespace-nowrap pointer-events-none')} style={{
            visibility: 'hidden',
            position: 'absolute',
            top: 0,
            left: 0,
            height: sizeConfig.height,
            paddingLeft: config.paddingLeft,
            paddingRight: config.paddingRight,
        }}>
        <span ref={iconLabelRef} className="inline-flex items-center" style={{
            height: sizeConfig.height,
            paddingLeft: config.paddingLeft,
            marginLeft: -config.paddingLeft,
        }}>
          {renderIconOrLabel()}
        </span>
        <span className={(0, utils_1.cn)(sizeConfig.textClass, 'font-medium text-primary whitespace-nowrap')} style={{ marginLeft: config.iconValueGap }}>
          {value}
        </span>
        {onRemove && (<span className="flex-shrink-0 flex items-center justify-center" style={{ width: config.closeSize, height: config.closeSize, marginLeft: config.valueCloseGap }}/>)}
      </div>

      {/* Visible animated container */}
      <div ref={containerRef} onClick={!animation.isExpanded ? animation.toggle : undefined} onTransitionEnd={handleTransitionEnd} className={(0, utils_1.cn)('relative overflow-hidden', 'bg-secondary border border-transparent shine-3-subtle', roundedClass, 'motion-reduce:transition-none', !animation.isExpanded && 'cursor-pointer', className)} style={{
            width: currentWidth,
            height: sizeConfig.height,
            transition: animation.getContainerTransition(),
        }}>
        {/* Icon/Label - absolutely positioned, never moves */}
        <div className="absolute left-0 top-0 bottom-0 flex items-center justify-center" style={{
            width: collapsedWidth,
            paddingLeft: config.paddingLeft,
        }}>
          {renderIconOrLabel()}
        </div>

        {/* Value area - revealed as container expands */}
        <div className="absolute top-0 bottom-0 right-0 flex items-center" style={{
            left: collapsedWidth,
            paddingLeft: config.iconValueGap,
            paddingRight: config.paddingRight,
            gap: config.valueCloseGap,
            opacity: animation.getContentOpacity(),
            transition: animation.getContentTransition(),
            pointerEvents: animation.isExpanded ? 'auto' : 'none',
        }}>
          <span className={(0, utils_1.cn)(sizeConfig.textClass, 'font-medium text-primary whitespace-nowrap')}>
            {value}
          </span>

          {onRemove && (<button onClick={(e) => {
                e.stopPropagation();
                handleRemove();
            }} className={(0, utils_1.cn)('flex-shrink-0 flex items-center justify-center rounded-full', 'text-tertiary hover:text-primary', 'transition-colors duration-150', 'motion-reduce:transition-none', 'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand')} style={{
                width: config.closeSize,
                height: config.closeSize,
                opacity: animation.getContentOpacity(),
                transition: animation.getContentTransition(),
            }} aria-label={`Remove ${value} filter`}>
              <icon_1.HugeIcon icon={CancelCircleIcon_1.default} size={config.closeSize} strokeWidth={0}/>
            </button>)}
        </div>
      </div>
    </div>);
};
exports.FilterChip = FilterChip;
exports.FilterChip.displayName = 'FilterChip';
//# sourceMappingURL=filter-chip.js.map