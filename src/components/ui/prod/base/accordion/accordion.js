"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Accordion = void 0;
/**
 * Accordion - Component
 *
 * A collapsible accordion built on Base UI Collapsible for accessibility.
 * This is the base component without animated navigation lines.
 *
 * For animated line features, see features/animated-line/
 *
 * @module prod/base/accordion
 *
 * @example
 * ```tsx
 * import { Accordion } from '@/components/ui/prod/base/accordion'
 * import FolderIcon from '@hugeicons-pro/core-stroke-rounded/Folder01Icon'
 *
 * <Accordion label="Documents" icon={FolderIcon} defaultExpanded>
 *   <Accordion.Item value="doc-1" href="/docs/one">Document One</Accordion.Item>
 *   <Accordion.Item value="doc-2" href="/docs/two">Document Two</Accordion.Item>
 * </Accordion>
 * ```
 */
const React = require("react");
const react_1 = require("react");
const link_1 = require("next/link");
const collapsible_1 = require("@base-ui/react/collapsible");
const utils_1 = require("@/lib/utils");
const icon_1 = require("@/components/ui/prod/base/icon");
const ArrowDown01Icon_1 = require("@hugeicons-pro/core-solid-rounded/ArrowDown01Icon");
const ArrowDown01Icon_2 = require("@hugeicons-pro/core-bulk-rounded/ArrowDown01Icon");
const config_1 = require("./config");
// ============================================================================
// CONTEXT
// ============================================================================
const AccordionContext = (0, react_1.createContext)(null);
const useAccordionContext = () => {
    const context = (0, react_1.useContext)(AccordionContext);
    if (!context) {
        throw new Error('Accordion.Item must be used within an Accordion');
    }
    return context;
};
// ============================================================================
// ACCORDION ITEM
// ============================================================================
const AccordionItem = ({ value, children, href, onClick, disabled, className, }) => {
    const { itemHeight } = useAccordionContext();
    const content = (<span className={(0, utils_1.cn)(config_1.styles.item.base, disabled && 'opacity-50 cursor-not-allowed', className)} style={{
            display: 'block',
            height: `${itemHeight}px`,
            paddingLeft: '8px',
            paddingRight: '8px',
            lineHeight: `${itemHeight}px`,
            borderRadius: '6px',
        }}>
      {children}
    </span>);
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
// ACCORDION ROOT
// ============================================================================
const AccordionRoot = ({ label, icon, children, defaultExpanded = false, expanded: controlledExpanded, onExpandedChange, onLabelClick, toggleOnChevronOnly = false, showCount = true, size = 'default', triggerConfig = {}, className, }) => {
    const [internalExpanded, setInternalExpanded] = (0, react_1.useState)(defaultExpanded);
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
    // Count children
    const childCount = React.Children.count(children);
    // Handle toggle
    const handleToggle = (0, react_1.useCallback)((open) => {
        if (!isControlled) {
            setInternalExpanded(open);
        }
        onExpandedChange?.(open);
    }, [isControlled, onExpandedChange]);
    // Handle label click (when toggleOnChevronOnly is true)
    const handleLabelClick = (0, react_1.useCallback)((e) => {
        if (toggleOnChevronOnly) {
            e.preventDefault();
            onLabelClick?.();
        }
    }, [onLabelClick, toggleOnChevronOnly]);
    // Handle chevron click (when toggleOnChevronOnly is true)
    const handleChevronClick = (0, react_1.useCallback)((e) => {
        if (toggleOnChevronOnly) {
            e.stopPropagation();
            handleToggle(!isExpanded);
        }
    }, [toggleOnChevronOnly, handleToggle, isExpanded]);
    // Context value
    const contextValue = (0, react_1.useMemo)(() => ({
        isExpanded,
        size,
        itemHeight: sizeConfig.itemHeight,
        itemGap: sizeConfig.itemGap,
    }), [isExpanded, size, sizeConfig]);
    return (<AccordionContext.Provider value={contextValue}>
      <collapsible_1.Collapsible.Root open={isExpanded} onOpenChange={handleToggle} className={className}>
        {/* Trigger */}
        <collapsible_1.Collapsible.Trigger className={(0, utils_1.cn)(config_1.styles.trigger.base)} style={{
            height: `${mergedTriggerConfig.height}px`,
            paddingLeft: `${mergedTriggerConfig.paddingX}px`,
            paddingRight: `${mergedTriggerConfig.paddingX}px`,
            paddingTop: `${mergedTriggerConfig.paddingY}px`,
            paddingBottom: `${mergedTriggerConfig.paddingY}px`,
            borderRadius: `${mergedTriggerConfig.borderRadius}px`,
        }} onClick={toggleOnChevronOnly ? handleLabelClick : undefined}>
          {icon != null && (<icon_1.HugeIcon icon={icon} size={sizeConfig.iconSize} strokeWidth={1.5} className="text-tertiary shrink-0"/>)}
          <span className="text-tertiary font-medium" style={{ fontSize: `${mergedTriggerConfig.fontSize}px` }}>
            {label}
          </span>
          {showCount && (<span className="text-tertiary/50 font-medium" style={{ fontSize: `${mergedTriggerConfig.fontSize}px` }}>
              {childCount}
            </span>)}
          {mergedTriggerConfig.showChevron && (<span className={(0, utils_1.cn)('-mr-1 rounded p-0.5', toggleOnChevronOnly && 'hover:bg-tertiary cursor-pointer')} onClick={toggleOnChevronOnly ? handleChevronClick : undefined}>
              <icon_1.HugeIcon icon={ArrowDown01Icon_1.default} size={16} strokeWidth={0} className={(0, utils_1.cn)(config_1.styles.chevron.base, 'text-tertiary group-hover:hidden block', isExpanded ? config_1.styles.chevron.expanded : config_1.styles.chevron.collapsed)} style={{ transitionDuration: `${config_1.defaultAnimationDuration.chevron}ms` }}/>
              <icon_1.HugeIcon icon={ArrowDown01Icon_2.default} size={16} strokeWidth={0} className={(0, utils_1.cn)(config_1.styles.chevron.base, 'text-tertiary group-hover:block hidden', isExpanded ? config_1.styles.chevron.expanded : config_1.styles.chevron.collapsed)} style={{ transitionDuration: `${config_1.defaultAnimationDuration.chevron}ms` }}/>
            </span>)}
        </collapsible_1.Collapsible.Trigger>

        {/* Content Panel */}
        <collapsible_1.Collapsible.Panel className={(0, utils_1.cn)(config_1.styles.content.base, 
        // Base UI data attribute animations
        'h-0 transition-[height] duration-200 ease-in-out', 'data-[open]:h-[var(--collapsible-panel-height)]', 'data-[starting-style]:h-0', 'data-[ending-style]:h-0')}>
          <div className="flex flex-col pt-0.5" style={{
            paddingLeft: '8px',
            gap: `${sizeConfig.itemGap}px`,
        }}>
            {children}
          </div>
        </collapsible_1.Collapsible.Panel>
      </collapsible_1.Collapsible.Root>
    </AccordionContext.Provider>);
};
// ============================================================================
// COMPOUND COMPONENT EXPORT
// ============================================================================
exports.Accordion = Object.assign(AccordionRoot, {
    Item: AccordionItem,
});
//# sourceMappingURL=accordion.js.map