"use strict";
/**
 * FilterMenuMotion - Main Component
 *
 * A filter menu component with Motion Dev animations.
 * Built on Base UI Menu primitives with integrated motion/react.
 *
 * Architecture:
 * - Uses Base UI Menu for accessibility and keyboard navigation
 * - Uses Motion Dev for animations (render prop pattern)
 * - Sliding panel approach for submenu navigation
 * - State-based animation for mounted components
 *
 * Key patterns from documentation:
 * - AnimatePresence with keepMounted for exit animations
 * - initial={false} to prevent animation on first render
 * - render prop to compose motion.div with Base UI components
 *
 * @module prod/base/filter/filter-menu-motion
 */
'use client';
/**
 * FilterMenuMotion - Main Component
 *
 * A filter menu component with Motion Dev animations.
 * Built on Base UI Menu primitives with integrated motion/react.
 *
 * Architecture:
 * - Uses Base UI Menu for accessibility and keyboard navigation
 * - Uses Motion Dev for animations (render prop pattern)
 * - Sliding panel approach for submenu navigation
 * - State-based animation for mounted components
 *
 * Key patterns from documentation:
 * - AnimatePresence with keepMounted for exit animations
 * - initial={false} to prevent animation on first render
 * - render prop to compose motion.div with Base UI components
 *
 * @module prod/base/filter/filter-menu-motion
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterMenuMotion = void 0;
const React = require("react");
const react_1 = require("react");
const menu_1 = require("@base-ui/react/menu");
const react_2 = require("motion/react");
const utils_1 = require("@/lib/utils");
const animation_config_1 = require("./animation-config");
const default_items_1 = require("./default-items");
const utils_2 = require("./utils");
const components_1 = require("./components");
// ============================================================================
// HOOKS
// ============================================================================
/**
 * Hook to manage submenu navigation state.
 */
function useSubmenuNavigation(wrappedItems, animationConfig, isOpen) {
    const [submenu, setSubmenu] = (0, react_1.useState)(null);
    const [inSubmenu, setInSubmenu] = (0, react_1.useState)(false);
    // Navigate to a submenu
    const navigateToSubmenu = (0, react_1.useCallback)((menuId) => {
        const submenuItem = wrappedItems.find((item) => item.id === menuId && item.type === 'submenu');
        if (submenuItem && submenuItem.type === 'submenu') {
            // Set submenu content first
            setSubmenu({
                id: menuId,
                title: submenuItem.label,
                items: submenuItem.items,
            });
            // Delay slide to allow React to render content
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setInSubmenu(true);
                });
            });
        }
    }, [wrappedItems]);
    // Navigate back to root
    const navigateBack = (0, react_1.useCallback)(() => {
        setInSubmenu(false);
        // Keep submenu content for exit animation, clear after
        setTimeout(() => {
            setSubmenu(null);
        }, animationConfig.slideDuration);
    }, [animationConfig.slideDuration]);
    // Reset on close
    (0, react_1.useEffect)(() => {
        if (!isOpen) {
            const timeout = setTimeout(() => {
                setSubmenu(null);
                setInSubmenu(false);
            }, 200);
            return () => clearTimeout(timeout);
        }
    }, [isOpen]);
    return {
        submenu,
        inSubmenu,
        navigateToSubmenu,
        navigateBack,
    };
}
// ============================================================================
// MAIN COMPONENT
// ============================================================================
/**
 * FilterMenuMotion - Filter menu with Motion Dev animations.
 *
 * Uses state-based animation pattern for mounted components:
 * - Both panels stay mounted in the DOM
 * - Animation driven by inSubmenu state
 * - initial={false} prevents animation on first render
 */
function FilterMenuMotion({ items = default_items_1.DEFAULT_FILTER_ITEMS, onFilterSelect, activeFilterIds = [], trigger, width = animation_config_1.DEFAULT_WIDTH, side = 'bottom', align = 'start', sideOffset = animation_config_1.DEFAULT_SIDE_OFFSET, onOpenChange: externalOnOpenChange, animation, className, }) {
    // Merge animation config with defaults
    const animationConfig = (0, react_1.useMemo)(() => ({ ...animation_config_1.DEFAULT_MOTION_ANIMATION, ...animation }), [animation]);
    // Respect reduced motion preference
    const shouldReduceMotion = (0, react_2.useReducedMotion)();
    // Open state
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    // Create set for O(1) lookup
    const activeIdsSet = (0, react_1.useMemo)(() => new Set(activeFilterIds), [activeFilterIds]);
    // Transform items to inject selected state
    const wrappedItems = (0, react_1.useMemo)(() => (0, utils_2.transformItemsWithFilterState)(items, activeIdsSet, onFilterSelect), [items, activeIdsSet, onFilterSelect]);
    // Submenu navigation
    const { submenu, inSubmenu, navigateToSubmenu, navigateBack } = useSubmenuNavigation(wrappedItems, animationConfig, isOpen);
    // Handlers
    const handleOpenChange = (0, react_1.useCallback)((open) => {
        setIsOpen(open);
        externalOnOpenChange?.(open);
    }, [externalOnOpenChange]);
    const handleSelect = (0, react_1.useCallback)(() => {
        handleOpenChange(false);
    }, [handleOpenChange]);
    // Trigger
    const resolvedTrigger = trigger ?? <components_1.FilterTrigger isOpen={isOpen}/>;
    // Popup variants
    const popupVariants = shouldReduceMotion
        ? undefined
        : (0, animation_config_1.createPopupVariants)(animationConfig, side === 'bottom' ? 'bottom' : 'top');
    // -------------------------------------------------------------------------
    // RENDER
    // -------------------------------------------------------------------------
    return (<menu_1.Menu.Root open={isOpen} onOpenChange={handleOpenChange} modal={false}>
      <menu_1.Menu.Trigger render={<span className="outline-none focus:outline-none"/>}>
        {(0, react_1.isValidElement)(resolvedTrigger)
            ? (0, react_1.cloneElement)(resolvedTrigger, {
                isActive: isOpen,
            })
            : resolvedTrigger}
      </menu_1.Menu.Trigger>

      <react_2.AnimatePresence>
        {isOpen && (<menu_1.Menu.Portal keepMounted>
            <menu_1.Menu.Positioner side={side} align={align} sideOffset={sideOffset} collisionPadding={8} style={{ zIndex: 9999 }}>
              <menu_1.Menu.Popup render={<react_2.motion.div variants={popupVariants} initial="hidden" animate="visible" exit="exit" transition={(0, animation_config_1.getMotionTransition)(animationConfig, animationConfig.revealDuration)} style={{ transformOrigin: 'var(--transform-origin)' }}/>} className={(0, utils_1.cn)('rounded-2xl corner-squircle', 'bg-primary shine-2-subtle-shadow-lg', 'motion-reduce:animate-none motion-reduce:transition-none', className)} style={{ width }}>
                <components_1.SlidingPanelContainer inSubmenu={inSubmenu} isOpen={isOpen} animationConfig={animationConfig} submenuKey={submenu?.id ?? null} rootPanel={<RootPanel items={wrappedItems} isVisible={!inSubmenu} animationConfig={animationConfig} shouldReduceMotion={shouldReduceMotion} onSubmenuClick={navigateToSubmenu} onSelect={handleSelect}/>} submenuPanel={<SubmenuPanel submenu={submenu} isVisible={inSubmenu} animationConfig={animationConfig} shouldReduceMotion={shouldReduceMotion} onBack={navigateBack} onSubmenuClick={navigateToSubmenu} onSelect={handleSelect}/>}/>
              </menu_1.Menu.Popup>
            </menu_1.Menu.Positioner>
          </menu_1.Menu.Portal>)}
      </react_2.AnimatePresence>
    </menu_1.Menu.Root>);
}
exports.FilterMenuMotion = FilterMenuMotion;
FilterMenuMotion.displayName = 'FilterMenuMotion';
function RootPanel({ items, isVisible, animationConfig, shouldReduceMotion, onSubmenuClick, onSelect, }) {
    return (<components_1.AnimatedPanel isActive={isVisible} animationConfig={animationConfig} isSubmenu={false}>
      <components_1.FilterMenuHeader />
      <div className="flex flex-col gap-1">
        {items.map((item, index) => (<components_1.AnimatedMenuItem key={item.id} item={item} index={index} animationConfig={animationConfig} shouldReduceMotion={shouldReduceMotion} isVisible={isVisible} onSubmenuClick={onSubmenuClick} onSelect={onSelect}/>))}
      </div>
    </components_1.AnimatedPanel>);
}
function SubmenuPanel({ submenu, isVisible, animationConfig, shouldReduceMotion, onBack, onSubmenuClick, onSelect, }) {
    return (<components_1.AnimatedPanel isActive={isVisible} animationConfig={animationConfig} isSubmenu>
      {submenu && (<>
          <components_1.BackButton title={submenu.title} onBack={onBack} isVisible={isVisible} animationConfig={animationConfig} shouldReduceMotion={shouldReduceMotion}/>
          <div className="flex flex-col gap-1">
            {submenu.items.map((item, index) => (<components_1.AnimatedMenuItem key={item.id} item={item} index={index} animationConfig={animationConfig} shouldReduceMotion={shouldReduceMotion} isVisible={isVisible} isInSubmenu onSubmenuClick={onSubmenuClick} onSelect={onSelect}/>))}
          </div>
        </>)}
    </components_1.AnimatedPanel>);
}
//# sourceMappingURL=filter-menu-motion.js.map