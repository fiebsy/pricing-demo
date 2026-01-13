"use strict";
/**
 * Select - Main Component
 *
 * Dropdown select component styled to match the Menu component.
 * Built on Base UI Select primitive for accessibility.
 *
 * Unlike Menu (action-based), Select is value-based - it maintains
 * a selected value that can be used in forms or state.
 *
 * @module prod/base/select/select
 */
'use client';
/**
 * Select - Main Component
 *
 * Dropdown select component styled to match the Menu component.
 * Built on Base UI Select primitive for accessibility.
 *
 * Unlike Menu (action-based), Select is value-based - it maintains
 * a selected value that can be used in forms or state.
 *
 * @module prod/base/select/select
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Select = void 0;
const react_1 = require("react");
const select_1 = require("@base-ui/react/select");
const ArrowDown01Icon_1 = require("@hugeicons-pro/core-stroke-rounded/ArrowDown01Icon");
const Tick02Icon_1 = require("@hugeicons-pro/core-stroke-rounded/Tick02Icon");
const utils_1 = require("@/lib/utils");
const icon_1 = require("@/components/ui/prod/base/icon");
require("./select-transitions.css");
const config_1 = require("./config");
// ============================================================================
// Reveal Animation Hook (Legacy - matches Menu pattern)
// ============================================================================
function useRevealAnimationLegacy(isOpen, sideOffset) {
    const idRef = (0, react_1.useRef)(`select-${Math.random().toString(36).substr(2, 9)}`);
    const uniqueClass = `select-popup-${idRef.current}`;
    const animationCss = (0, react_1.useMemo)(() => {
        if (!isOpen)
            return '';
        const { duration, scaleStart, scaleEnd, slideOffsetRatio } = config_1.REVEAL_ANIMATION;
        const easing = config_1.EASING_EXPO_OUT;
        const slideOffset = Math.round(sideOffset * slideOffsetRatio);
        const keyframe = `select-reveal-${idRef.current}`;
        const opacityKeyframe = `select-opacity-${idRef.current}`;
        return `
      .${uniqueClass}[data-side="bottom"][data-open] {
        transform-origin: var(--transform-origin) !important;
        animation: ${keyframe}-bottom ${duration}ms ${easing} both,
                   ${opacityKeyframe} ${duration}ms ${easing} both !important;
      }
      .${uniqueClass}[data-side="top"][data-open] {
        transform-origin: var(--transform-origin) !important;
        animation: ${keyframe}-top ${duration}ms ${easing} both,
                   ${opacityKeyframe} ${duration}ms ${easing} both !important;
      }
      @keyframes ${keyframe}-bottom {
        from { transform: scale(${scaleStart}) translateY(-${slideOffset}px); }
        to { transform: scale(${scaleEnd}) translateY(0); }
      }
      @keyframes ${keyframe}-top {
        from { transform: scale(${scaleStart}) translateY(${slideOffset}px); }
        to { transform: scale(${scaleEnd}) translateY(0); }
      }
      @keyframes ${opacityKeyframe} {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    `;
    }, [isOpen, sideOffset, uniqueClass]);
    return { uniqueClass, animationCss };
}
// ============================================================================
// Helper: Type Guards
// ============================================================================
function isOptionGroup(item) {
    return 'type' in item && item.type === 'group';
}
function isSeparator(item) {
    return 'type' in item && item.type === 'separator';
}
function isOption(item) {
    // An item is an option if it doesn't have a 'type' property,
    // OR if it has 'type' but also has a 'value' (shouldn't happen with proper types)
    if (!('type' in item))
        return true;
    // Check if it has a value property (for cases where type might be incorrectly set)
    return 'value' in item && typeof item.value === 'string';
}
// ============================================================================
// Option Item Component
// ============================================================================
const baseItemStyles = (0, utils_1.cn)('flex cursor-pointer items-center justify-between', config_1.INTERACTIVE_STATES.hover, config_1.INTERACTIVE_STATES.focusVisible, config_1.INTERACTIVE_STATES.active, config_1.INTERACTIVE_STATES.highlighted, 'corner-squircle transition-colors duration-150', 'motion-reduce:transition-none', 'relative outline-none select-none', config_1.SELECT_ITEM_STYLES.paddingX, config_1.SELECT_ITEM_STYLES.minHeight, config_1.SELECT_ITEM_STYLES.textSize);
const SelectOptionItem = ({ option, itemRadius }) => {
    return (<select_1.Select.Item value={option.value} disabled={option.disabled} className={(0, utils_1.cn)(baseItemStyles, 'text-primary', 'data-[disabled]:pointer-events-none data-[disabled]:opacity-50')} style={{ borderRadius: `${itemRadius}px` }}>
      <div className={(0, utils_1.cn)('flex min-w-0 flex-1 items-center', config_1.SELECT_ITEM_STYLES.iconGap)}>
        {option.icon && (<icon_1.HugeIcon icon={option.icon} size={config_1.SELECT_ITEM_STYLES.iconSize} strokeWidth={config_1.SELECT_ITEM_STYLES.iconStrokeWidth} className={(0, utils_1.cn)(config_1.SELECT_ITEM_STYLES.iconColor, 'opacity-50 shrink-0')}/>)}
        <div className="flex-1 min-w-0">
          <select_1.Select.ItemText className="truncate block">
            {option.label}
          </select_1.Select.ItemText>
          {option.description && (<div className="text-xs font-normal text-tertiary mt-0.5 truncate">
              {option.description}
            </div>)}
        </div>
      </div>
      <select_1.Select.ItemIndicator className="shrink-0">
        <icon_1.HugeIcon icon={Tick02Icon_1.default} size={config_1.SELECT_ITEM_STYLES.iconSize} strokeWidth={2.5} className="text-brand-solid"/>
      </select_1.Select.ItemIndicator>
    </select_1.Select.Item>);
};
// ============================================================================
// Main Component
// ============================================================================
/**
 * Select - Dropdown select component
 *
 * Features:
 * - Reveal animation matching Menu component
 * - Same appearance system (shine, shadow, squircle, gradient)
 * - Groups and separators support
 * - Icon support on options
 * - Controlled and uncontrolled modes
 */
const Select = ({ options, value, defaultValue, onValueChange, placeholder = 'Select...', trigger, width = config_1.DEFAULT_SELECT_WIDTH, popupWidth = config_1.DEFAULT_POPUP_WIDTH, side = 'bottom', align = 'start', sideOffset = config_1.DEFAULT_SIDE_OFFSET, alignOffset = 0, disabled, required, name, onOpenChange: externalOnOpenChange, appearance, className, triggerClassName, 'aria-label': ariaLabel, }) => {
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    // Reveal animation
    const legacyAnimation = useRevealAnimationLegacy(isOpen, sideOffset);
    const revealClasses = (0, react_1.useMemo)(() => (0, config_1.getRevealAnimationClasses)(), []);
    // Configuration
    const mergedAppearance = (0, react_1.useMemo)(() => ({ ...config_1.DEFAULT_APPEARANCE, ...appearance }), [appearance]);
    // Handlers
    const handleOpenChange = (open) => {
        setIsOpen(open);
        externalOnOpenChange?.(open);
    };
    // Styling
    const popupClasses = (0, config_1.getPopupClasses)(mergedAppearance);
    const gradientStyles = (0, config_1.getGradientStyles)(mergedAppearance);
    const itemRadius = (0, config_1.getItemRadius)(mergedAppearance.borderRadius);
    // Compute popup width
    const computedPopupWidth = popupWidth === 'trigger' ? undefined : popupWidth;
    // Flatten options to find selected label for display
    const flatOptions = (0, react_1.useMemo)(() => {
        const flat = [];
        for (const item of options) {
            if (isOptionGroup(item)) {
                flat.push(...item.options);
            }
            else if (isOption(item)) {
                flat.push(item);
            }
        }
        return flat;
    }, [options]);
    return (<>
      {/* Inject reveal animation CSS (legacy mode only) */}
      {config_1.USE_LEGACY_ANIMATION && isOpen && legacyAnimation.animationCss && (<style>{legacyAnimation.animationCss}</style>)}

      <select_1.Select.Root value={value} defaultValue={defaultValue} onValueChange={onValueChange ? (val) => onValueChange(val) : undefined} onOpenChange={handleOpenChange ? (open) => handleOpenChange(open) : undefined} disabled={disabled} required={required} name={name}>
        {trigger ? (<select_1.Select.Trigger aria-label={ariaLabel} className={(0, utils_1.cn)('outline-none focus:outline-none', triggerClassName)}>
            {trigger}
          </select_1.Select.Trigger>) : (<select_1.Select.Trigger aria-label={ariaLabel} className={(0, utils_1.cn)('inline-flex items-center justify-between gap-2', 'px-3 py-2 rounded-lg', 'bg-primary border border-primary', 'text-sm text-primary', 'hover:bg-secondary transition-colors duration-150', 'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500', 'disabled:opacity-50 disabled:cursor-not-allowed', 'motion-reduce:transition-none', triggerClassName)} style={{ width }}>
            <select_1.Select.Value>
              {(selectedValue) => {
                if (!selectedValue) {
                    return <span className="text-tertiary">{placeholder}</span>;
                }
                const selected = flatOptions.find(o => o.value === selectedValue);
                return selected?.label || selectedValue;
            }}
            </select_1.Select.Value>
            <select_1.Select.Icon className="shrink-0">
              <icon_1.HugeIcon icon={ArrowDown01Icon_1.default} size={16} strokeWidth={2} className="text-tertiary transition-transform duration-150 data-[popup-open]:rotate-180"/>
            </select_1.Select.Icon>
          </select_1.Select.Trigger>)}

        <select_1.Select.Portal>
          <select_1.Select.Positioner side={side} align={align} sideOffset={sideOffset} alignOffset={alignOffset} collisionPadding={8} style={{ zIndex: config_1.Z_INDEX.SELECT_POSITIONER }}>
            <select_1.Select.Popup data-select-popup="" data-state={isOpen ? 'open' : 'closed'} data-side={side} className={(0, utils_1.cn)('overflow-hidden p-1', config_1.USE_LEGACY_ANIMATION ? legacyAnimation.uniqueClass : revealClasses, 'motion-reduce:animate-none motion-reduce:transition-none', popupClasses, className)} style={{
            width: computedPopupWidth,
            minWidth: popupWidth === 'trigger' ? 'var(--anchor-width)' : undefined,
            '--select-item-radius': `${itemRadius}px`,
            ...gradientStyles,
        }}>
              <div className="flex flex-col gap-1">
                {options.map((item, index) => {
            // Separator
            if (isSeparator(item)) {
                return (<div key={item.id} role="separator" className={(0, config_1.getSeparatorClasses)()}/>);
            }
            // Group
            if (isOptionGroup(item)) {
                return (<select_1.Select.Group key={`group-${index}`}>
                        <select_1.Select.GroupLabel className="text-tertiary px-2 py-1.5 text-xs font-semibold uppercase tracking-wide">
                          {item.label}
                        </select_1.Select.GroupLabel>
                        <div className="flex flex-col gap-1">
                          {item.options.map((option) => (<SelectOptionItem key={option.value} option={option} itemRadius={itemRadius}/>))}
                        </div>
                      </select_1.Select.Group>);
            }
            // Regular option
            if (isOption(item)) {
                return (<SelectOptionItem key={item.value} option={item} itemRadius={itemRadius}/>);
            }
            return null;
        })}
              </div>
            </select_1.Select.Popup>
          </select_1.Select.Positioner>
        </select_1.Select.Portal>
      </select_1.Select.Root>
    </>);
};
exports.Select = Select;
exports.Select.displayName = 'Select';
//# sourceMappingURL=select.js.map