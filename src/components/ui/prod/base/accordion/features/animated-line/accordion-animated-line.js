"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccordionAnimatedLine = void 0;
/**
 * Accordion Animated Line - Component
 *
 * A collapsible accordion with animated L-shaped navigation lines.
 * Built on Base UI Collapsible for accessibility.
 *
 * This is a feature extension of the base Accordion component.
 *
 * @module prod/base/accordion/features/animated-line
 *
 * @example
 * ```tsx
 * import { AccordionAnimatedLine } from '@/components/ui/prod/base/accordion/features/animated-line'
 * import FolderIcon from '@hugeicons-pro/core-stroke-rounded/Folder01Icon'
 *
 * <AccordionAnimatedLine label="Documents" icon={FolderIcon} defaultExpanded>
 *   <AccordionAnimatedLine.Item value="doc-1" href="/docs/one">Document One</AccordionAnimatedLine.Item>
 *   <AccordionAnimatedLine.Item value="doc-2" href="/docs/two">Document Two</AccordionAnimatedLine.Item>
 * </AccordionAnimatedLine>
 * ```
 */
const React = require("react");
const react_1 = require("react");
const link_1 = require("next/link");
const utils_1 = require("@/lib/utils");
const icon_1 = require("@/components/ui/prod/base/icon");
const ArrowDown01Icon_1 = require("@hugeicons-pro/core-solid-rounded/ArrowDown01Icon");
const ArrowDown01Icon_2 = require("@hugeicons-pro/core-bulk-rounded/ArrowDown01Icon");
const config_1 = require("../../config");
const config_2 = require("./config");
// ============================================================================
// CONTEXT
// ============================================================================
const AccordionAnimatedLineContext = (0, react_1.createContext)(null);
const useAccordionAnimatedLineContext = () => {
    const context = (0, react_1.useContext)(AccordionAnimatedLineContext);
    if (!context) {
        throw new Error('AccordionAnimatedLine.Item must be used within an AccordionAnimatedLine');
    }
    return context;
};
// ============================================================================
// ACCORDION ITEM WITH ANIMATED LINE
// ============================================================================
const AccordionAnimatedLineItem = ({ value, children, href, onClick, disabled, className, index = 0, }) => {
    const { isExpanded, lineGeometry, config, animation } = useAccordionAnimatedLineContext();
    const isFirst = index === 0;
    const currentLineHeight = isFirst ? lineGeometry.firstLineHeight : lineGeometry.lineHeight;
    const svgWidth = config.cornerRadius;
    const svgHeight = currentLineHeight;
    const content = (<div className="relative" style={{ isolation: 'isolate' }}>
      {/* SVG L-shaped navigation line */}
      {config.showLine && (<svg className="pointer-events-none absolute" style={{
                overflow: 'visible',
                right: `calc(100% + 1px)`,
                top: '50%',
                transform: `translateY(-${svgHeight}px)`,
                width: svgWidth,
                height: svgHeight,
                zIndex: 1,
            }} aria-hidden="true">
          <path d={`
              M 0 0
              L 0 ${currentLineHeight - config.cornerRadius}
              Q 0 ${currentLineHeight} ${config.cornerRadius} ${currentLineHeight}
              L ${config.cornerRadius} ${currentLineHeight}
            `} fill="none" stroke={`var(${config.lineColor})`} strokeWidth={config.strokeWidth} strokeLinecap="round" strokeDasharray="1000" strokeDashoffset="1000" style={{
                animation: isExpanded
                    ? `accordion-draw-line ${animation.lineDuration}s linear 0s forwards, accordion-fade-in-line 0.1s ease-in 0s forwards`
                    : 'none',
            }}/>
        </svg>)}

      {/* Item content with slide animation */}
      <span className={(0, utils_1.cn)(config_2.styles.item.base, disabled && 'opacity-50 cursor-not-allowed', className)} style={{
            display: 'block',
            height: `${config.itemHeight}px`,
            paddingLeft: `${config.paddingX}px`,
            paddingRight: `${config.paddingX}px`,
            lineHeight: `${config.itemHeight}px`,
            borderRadius: `${config.borderRadius}px`,
            // CSS custom properties for animation
            '--accordion-translate-x': `-${config.animationDistance}px`,
            '--accordion-scale-start': String(animation.scaleStart),
            '--accordion-scale-end': String(animation.scaleEnd),
            '--accordion-opacity-start': '1',
            '--accordion-opacity-end': '1',
            animation: isExpanded
                ? `accordion-fade-in-up ${animation.itemDuration}s ease-out ${index * animation.staggerDelay}s both`
                : 'none',
            zIndex: 10,
        }}>
        {children}
      </span>
    </div>);
    if (href && !disabled) {
        return (<link_1.default href={href} onClick={onClick} className="block">
        {content}
      </link_1.default>);
    }
    return (<button type="button" onClick={disabled ? undefined : onClick} disabled={disabled} className="block w-full text-left">
      {content}
    </button>);
};
// ============================================================================
// ACCORDION ROOT WITH ANIMATED LINE
// ============================================================================
const AccordionAnimatedLineRoot = ({ label, icon, children, defaultExpanded = false, expanded: controlledExpanded, onExpandedChange, onLabelClick, toggleOnChevronOnly = false, showCount = true, size = 'default', triggerConfig = {}, lineConfig = {}, animationConfig = {}, className, }) => {
    const [internalExpanded, setInternalExpanded] = (0, react_1.useState)(defaultExpanded);
    const [animationKey, setAnimationKey] = (0, react_1.useState)(0);
    const isControlled = controlledExpanded !== undefined;
    const isExpanded = isControlled ? controlledExpanded : internalExpanded;
    // Get size preset
    const sizeConfig = config_1.sizePresets[size];
    // Merge trigger config
    const mergedTriggerConfig = (0, react_1.useMemo)(() => ({
        height: triggerConfig.height ?? sizeConfig.triggerHeight,
        paddingX: triggerConfig.paddingX ?? 8,
        paddingY: triggerConfig.paddingY ?? 4,
        fontSize: triggerConfig.fontSize ?? sizeConfig.triggerFontSize,
        borderRadius: triggerConfig.borderRadius ?? 6,
        showChevron: triggerConfig.showChevron ?? true,
    }), [triggerConfig, sizeConfig]);
    // Merge line config
    const mergedLineConfig = (0, react_1.useMemo)(() => ({
        ...config_2.defaultLineConfig,
        ...lineConfig,
    }), [lineConfig]);
    // Merge animation config
    const mergedAnimationConfig = (0, react_1.useMemo)(() => ({
        ...config_2.defaultAnimationConfig,
        ...animationConfig,
    }), [animationConfig]);
    // Calculate line geometry
    const lineGeometry = (0, react_1.useMemo)(() => (0, config_2.calculateLineGeometry)({
        itemHeight: config_2.itemHeightBySize[size],
        itemGap: config_2.itemGapBySize[size],
        visualOffset: mergedLineConfig.visualOffset,
        topPadding: mergedLineConfig.topPadding,
        firstLineOffset: mergedLineConfig.firstLineOffset,
    }), [size, mergedLineConfig]);
    // Count children
    const childCount = React.Children.count(children);
    // Handle toggle
    const handleToggle = (0, react_1.useCallback)(() => {
        const newExpanded = !isExpanded;
        if (!isControlled) {
            setInternalExpanded(newExpanded);
        }
        onExpandedChange?.(newExpanded);
        if (newExpanded) {
            setAnimationKey((k) => k + 1);
        }
    }, [isExpanded, isControlled, onExpandedChange]);
    // Handle label click (when toggleOnChevronOnly is true)
    const handleLabelClick = (0, react_1.useCallback)(() => {
        onLabelClick?.();
        if (!toggleOnChevronOnly) {
            handleToggle();
        }
    }, [onLabelClick, toggleOnChevronOnly, handleToggle]);
    // Context value
    const contextValue = (0, react_1.useMemo)(() => ({
        isExpanded,
        size,
        lineGeometry,
        config: {
            itemHeight: config_2.itemHeightBySize[size],
            strokeWidth: mergedLineConfig.strokeWidth,
            cornerRadius: mergedLineConfig.cornerRadius,
            lineColor: mergedLineConfig.color,
            paddingX: 8,
            borderRadius: 6,
            animationDistance: config_2.animationDistanceBySize[size],
            showLine: mergedLineConfig.enabled,
        },
        animation: mergedAnimationConfig,
    }), [isExpanded, size, lineGeometry, mergedLineConfig, mergedAnimationConfig]);
    // Clone children to inject index
    const indexedChildren = React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { index });
        }
        return child;
    });
    // Calculate max height for animation
    const maxHeight = (0, react_1.useMemo)(() => {
        const itemsHeight = childCount * config_2.itemHeightBySize[size];
        const gapsHeight = Math.max(0, childCount - 1) * config_2.itemGapBySize[size];
        const padding = mergedLineConfig.topPadding;
        return itemsHeight + gapsHeight + padding + 20;
    }, [childCount, size, mergedLineConfig]);
    return (<AccordionAnimatedLineContext.Provider value={contextValue}>
      <div className={className}>
        {/* Trigger */}
        <button type="button" className={(0, utils_1.cn)(config_2.styles.trigger.base)} style={{
            height: `${mergedTriggerConfig.height}px`,
            paddingLeft: `${mergedTriggerConfig.paddingX}px`,
            paddingRight: `${mergedTriggerConfig.paddingX}px`,
            paddingTop: `${mergedTriggerConfig.paddingY}px`,
            paddingBottom: `${mergedTriggerConfig.paddingY}px`,
            borderRadius: `${mergedTriggerConfig.borderRadius}px`,
        }} onClick={toggleOnChevronOnly ? onLabelClick : handleToggle} aria-expanded={isExpanded}>
          {icon != null && (<icon_1.HugeIcon icon={icon} size={sizeConfig.iconSize} strokeWidth={1.5} className="text-tertiary shrink-0"/>)}
          <span className="text-tertiary font-medium" style={{ fontSize: `${mergedTriggerConfig.fontSize}px` }}>
            {label}
          </span>
          {showCount && (<span className="text-tertiary/50 font-medium" style={{ fontSize: `${mergedTriggerConfig.fontSize}px` }}>
              {childCount}
            </span>)}
          {mergedTriggerConfig.showChevron && (<span className={(0, utils_1.cn)('-mr-1 rounded p-0.5', toggleOnChevronOnly && 'hover:bg-tertiary cursor-pointer')} onClick={toggleOnChevronOnly
                ? (e) => {
                    e.stopPropagation();
                    handleToggle();
                }
                : undefined}>
              <icon_1.HugeIcon icon={ArrowDown01Icon_1.default} size={16} strokeWidth={0} className={(0, utils_1.cn)(config_2.styles.chevron.base, 'text-tertiary group-hover:hidden block', isExpanded ? config_2.styles.chevron.expanded : config_2.styles.chevron.collapsed)} style={{ transitionDuration: `${mergedAnimationConfig.chevronDuration}ms` }}/>
              <icon_1.HugeIcon icon={ArrowDown01Icon_2.default} size={16} strokeWidth={0} className={(0, utils_1.cn)(config_2.styles.chevron.base, 'text-tertiary group-hover:block hidden', isExpanded ? config_2.styles.chevron.expanded : config_2.styles.chevron.collapsed)} style={{ transitionDuration: `${mergedAnimationConfig.chevronDuration}ms` }}/>
            </span>)}
        </button>

        {/* Content */}
        <div className={config_2.styles.content.base} style={{
            maxHeight: isExpanded ? `${maxHeight}px` : '0px',
            opacity: isExpanded ? 1 : 0,
            transition: `max-height ${mergedAnimationConfig.accordionDuration}ms ease-in-out, opacity ${isExpanded ? mergedAnimationConfig.accordionDuration : 80}ms ease-${isExpanded ? 'in' : 'out'}`,
        }}>
          <div key={animationKey} className="flex flex-col" style={{
            paddingTop: `${mergedLineConfig.topPadding}px`,
            paddingLeft: `${mergedLineConfig.leftPadding}px`,
            gap: `${config_2.itemGapBySize[size]}px`,
        }}>
            {indexedChildren}
          </div>
        </div>
      </div>
    </AccordionAnimatedLineContext.Provider>);
};
// ============================================================================
// COMPOUND COMPONENT EXPORT
// ============================================================================
exports.AccordionAnimatedLine = Object.assign(AccordionAnimatedLineRoot, {
    Item: AccordionAnimatedLineItem,
});
//# sourceMappingURL=accordion-animated-line.js.map