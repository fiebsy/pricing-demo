"use strict";
/**
 * Base UI Menu - Reveal Menu Component
 *
 * Wrapper that adds a reveal/scale animation to the BaseUIMenu.
 * Injects CSS keyframes for smooth scale-in effect on open.
 *
 * @module base-ui/menu/reveal-menu
 */
'use client';
/**
 * Base UI Menu - Reveal Menu Component
 *
 * Wrapper that adds a reveal/scale animation to the BaseUIMenu.
 * Injects CSS keyframes for smooth scale-in effect on open.
 *
 * @module base-ui/menu/reveal-menu
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RevealMenu = void 0;
const react_1 = require("react");
const utils_1 = require("@/lib/utils");
const config_1 = require("./config");
const use_reveal_animation_1 = require("./hooks/use-reveal-animation");
const base_ui_menu_1 = require("./base-ui-menu");
const components_1 = require("./components");
// ============================================================================
// Helper Functions
// ============================================================================
function isIconTriggerConfig(trigger) {
    return (trigger !== null &&
        typeof trigger === 'object' &&
        'icon' in trigger &&
        !react_1.default.isValidElement(trigger));
}
// ============================================================================
// Component
// ============================================================================
/**
 * Menu with reveal animation
 * Built on Base UI Menu primitives
 *
 * Animation Architecture:
 * - Container 1: Menu.Popup (outer wrapper)
 * - Container 1A: Root menu panel
 * - Container 1B: Submenu panel(s)
 */
const RevealMenu = ({ trigger, items, align = config_1.DEFAULT_MENU_PROPS.align, side = config_1.DEFAULT_MENU_PROPS.side, sideOffset, alignOffset, width = config_1.DEFAULT_MENU_PROPS.width, variant = config_1.DEFAULT_MENU_PROPS.variant, revealConfig = config_1.DEFAULT_REVEAL_CONFIG, heightTransition = config_1.DEFAULT_HEIGHT_TRANSITION, slideTransition = config_1.DEFAULT_SLIDE_TRANSITION, onOpenChange: externalOnOpenChange, header, className, appearance, 
// Panel Navigation Animation (1A ↔ 1B)
heightAnimationEnabled = true, opacityCrossfadeEnabled = true, opacityDurationRatio = 0.8, }) => {
    // ============================================================================
    // State
    // ============================================================================
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    const [animationKey, setAnimationKey] = (0, react_1.useState)(0);
    const handleOpenChange = (0, react_1.useCallback)((open) => {
        setIsOpen(open);
        externalOnOpenChange?.(open);
    }, [externalOnOpenChange]);
    // ============================================================================
    // Animation
    // ============================================================================
    const { uniqueClass, animationCss } = (0, use_reveal_animation_1.useRevealAnimation)({
        isOpen,
        revealConfig,
        side,
        align,
        animationKey,
    });
    // ============================================================================
    // Loop Animation (for testing)
    // ============================================================================
    (0, react_1.useEffect)(() => {
        if (revealConfig.loop && isOpen) {
            const interval = setInterval(() => {
                handleOpenChange(false);
                setTimeout(() => {
                    setAnimationKey((prev) => prev + 1);
                    handleOpenChange(true);
                }, revealConfig.duration);
            }, revealConfig.duration * 2);
            return () => clearInterval(interval);
        }
    }, [isOpen, revealConfig.loop, revealConfig.duration, handleOpenChange]);
    // ============================================================================
    // Trigger
    // ============================================================================
    const stableTrigger = react_1.default.useMemo(() => {
        if (isIconTriggerConfig(trigger)) {
            return (<div className="inline-flex items-center justify-center">
          <components_1.IconTrigger icon={trigger.icon} className={trigger.className} isOpen={isOpen}/>
        </div>);
        }
        if (react_1.default.isValidElement(trigger) ||
            typeof trigger === 'string' ||
            typeof trigger === 'number') {
            return <div className="inline-block">{trigger}</div>;
        }
        return trigger;
    }, [trigger, isOpen]);
    // ============================================================================
    // Render
    // ============================================================================
    return (<div className="reveal-menu-wrapper">
      {/* Inject animation CSS when open */}
      {isOpen && <style>{animationCss}</style>}

      <base_ui_menu_1.BaseUIMenu trigger={stableTrigger} items={items} align={align} side={side} sideOffset={sideOffset} alignOffset={alignOffset} width={width} variant={variant} open={isOpen} onOpenChange={handleOpenChange} className={(0, utils_1.cn)(uniqueClass, 
        // Disable default animations (we use our own)
        'data-[open]:fade-in-0 animate-none data-[open]:animate-none', className)} appearance={appearance} heightTransition={heightTransition} slideTransition={slideTransition} header={header} 
    // Panel Navigation Animation (1A ↔ 1B)
    heightAnimationEnabled={heightAnimationEnabled} opacityCrossfadeEnabled={opacityCrossfadeEnabled} opacityDurationRatio={opacityDurationRatio}/>
    </div>);
};
exports.RevealMenu = RevealMenu;
exports.RevealMenu.displayName = 'RevealMenu';
//# sourceMappingURL=reveal-menu.js.map