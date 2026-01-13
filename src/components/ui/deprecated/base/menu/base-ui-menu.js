"use strict";
/**
 * Base UI Menu - Animated Menu Component
 *
 * Core menu component with optimized height transitions for nested menus.
 * Uses Base UI primitives for accessibility and positioning.
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * CONTAINER STRUCTURE
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Container 1 (Menu.Popup)
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │  • Outer wrapper with border, shadow, corner-squircle, appearance styling  │
 * │  • Fixed width (e.g., 200px)                                               │
 * │  • overflow: hidden (clips the sliding strip)                              │
 * │                                                                            │
 * │  Height Wrapper (animates height)                                          │
 * │  ┌────────────────────────────────────────────────────────────────────────┐│
 * │  │  • height: transitions between rootHeight ↔ submenuHeight              ││
 * │  │  • overflow: hidden                                                    ││
 * │  │                                                                        ││
 * │  │  Sliding Strip (200% width, translateX for slide)                      ││
 * │  │  ┌──────────────────────────┬──────────────────────────┐               ││
 * │  │  │                          │                          │               ││
 * │  │  │  Container 1A            │  Container 1B            │               ││
 * │  │  │  (Root Menu)             │  (Submenu: 1B1, 1B2...)  │               ││
 * │  │  │                          │                          │               ││
 * │  │  │  • w-1/2 (50% of strip)  │  • w-1/2 (50% of strip)  │               ││
 * │  │  │  • Header + menu items   │  • BackButton + items    │               ││
 * │  │  │  • opacity: 1 → 0        │  • opacity: 0 → 1        │               ││
 * │  │  │                          │                          │               ││
 * │  │  └──────────────────────────┴──────────────────────────┘               ││
 * │  │                                                                        ││
 * │  └────────────────────────────────────────────────────────────────────────┘│
 * └─────────────────────────────────────────────────────────────────────────────┘
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * WHY THIS ARCHITECTURE?
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * 1. SLIDING STRIP PATTERN (transform: translateX)
 *    ─────────────────────────────────────────────
 *    WHY: Animating `transform` is GPU-accelerated (S-Tier performance).
 *         Both panels exist side-by-side, and we simply slide the viewport.
 *
 *    HOW: Strip is 200% width. Each panel is 50% (= 100% of visible area).
 *         translateX(0) = show 1A, translateX(-50%) = show 1B
 *
 *    BENEFIT: No layout recalculation during animation. Buttery smooth 60fps.
 *
 * 2. HEIGHT ANIMATION (height property)
 *    ───────────────────────────────────
 *    WHY: Container 1A and 1B have different content heights.
 *         Without height animation, switching panels causes jarring jumps.
 *
 *    HOW: ResizeObserver measures each panel's natural height.
 *         Height wrapper transitions between rootHeight ↔ submenuHeight.
 *
 *    CRITICAL: `items-start` on the flex container prevents panels from
 *              stretching to match each other. Without this, both panels
 *              would have the same height (the taller one), breaking
 *              the height transition effect.
 *
 * 3. OPACITY CROSSFADE
 *    ──────────────────
 *    WHY: Pure slide looks mechanical. Crossfade adds perceived smoothness.
 *         The outgoing panel fades as the incoming panel appears.
 *
 *    HOW: 1A: opacity 1→0 when entering submenu, 0→1 when returning
 *         1B: opacity 0→1 when entering submenu, 1→0 when returning
 *         Duration is 80% of slide duration for overlap effect.
 *
 * 4. TWO-PHASE ANIMATION TRIGGER
 *    ────────────────────────────
 *    WHY: We must measure 1B's height BEFORE animating, otherwise the
 *         height wrapper doesn't know what to transition to.
 *
 *    HOW: 1) submenuData is set → content renders (but no animation yet)
 *         2) Wait 2 frames for layout calculation
 *         3) Measure submenuRef height synchronously
 *         4) Set shouldAnimateToSubmenu → triggers slide + height + opacity
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * ANIMATION PERFORMANCE TIER
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * | Property  | Tier   | Notes                                    |
 * |-----------|--------|------------------------------------------|
 * | transform | S-Tier | GPU-accelerated, no layout recalc        |
 * | opacity   | S-Tier | GPU-accelerated, no layout recalc        |
 * | height    | B-Tier | Causes layout recalc, but acceptable for |
 * |           |        | small menus with smooth easing           |
 *
 * @module base-ui/menu/base-ui-menu
 */
'use client';
/**
 * Base UI Menu - Animated Menu Component
 *
 * Core menu component with optimized height transitions for nested menus.
 * Uses Base UI primitives for accessibility and positioning.
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * CONTAINER STRUCTURE
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Container 1 (Menu.Popup)
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │  • Outer wrapper with border, shadow, corner-squircle, appearance styling  │
 * │  • Fixed width (e.g., 200px)                                               │
 * │  • overflow: hidden (clips the sliding strip)                              │
 * │                                                                            │
 * │  Height Wrapper (animates height)                                          │
 * │  ┌────────────────────────────────────────────────────────────────────────┐│
 * │  │  • height: transitions between rootHeight ↔ submenuHeight              ││
 * │  │  • overflow: hidden                                                    ││
 * │  │                                                                        ││
 * │  │  Sliding Strip (200% width, translateX for slide)                      ││
 * │  │  ┌──────────────────────────┬──────────────────────────┐               ││
 * │  │  │                          │                          │               ││
 * │  │  │  Container 1A            │  Container 1B            │               ││
 * │  │  │  (Root Menu)             │  (Submenu: 1B1, 1B2...)  │               ││
 * │  │  │                          │                          │               ││
 * │  │  │  • w-1/2 (50% of strip)  │  • w-1/2 (50% of strip)  │               ││
 * │  │  │  • Header + menu items   │  • BackButton + items    │               ││
 * │  │  │  • opacity: 1 → 0        │  • opacity: 0 → 1        │               ││
 * │  │  │                          │                          │               ││
 * │  │  └──────────────────────────┴──────────────────────────┘               ││
 * │  │                                                                        ││
 * │  └────────────────────────────────────────────────────────────────────────┘│
 * └─────────────────────────────────────────────────────────────────────────────┘
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * WHY THIS ARCHITECTURE?
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * 1. SLIDING STRIP PATTERN (transform: translateX)
 *    ─────────────────────────────────────────────
 *    WHY: Animating `transform` is GPU-accelerated (S-Tier performance).
 *         Both panels exist side-by-side, and we simply slide the viewport.
 *
 *    HOW: Strip is 200% width. Each panel is 50% (= 100% of visible area).
 *         translateX(0) = show 1A, translateX(-50%) = show 1B
 *
 *    BENEFIT: No layout recalculation during animation. Buttery smooth 60fps.
 *
 * 2. HEIGHT ANIMATION (height property)
 *    ───────────────────────────────────
 *    WHY: Container 1A and 1B have different content heights.
 *         Without height animation, switching panels causes jarring jumps.
 *
 *    HOW: ResizeObserver measures each panel's natural height.
 *         Height wrapper transitions between rootHeight ↔ submenuHeight.
 *
 *    CRITICAL: `items-start` on the flex container prevents panels from
 *              stretching to match each other. Without this, both panels
 *              would have the same height (the taller one), breaking
 *              the height transition effect.
 *
 * 3. OPACITY CROSSFADE
 *    ──────────────────
 *    WHY: Pure slide looks mechanical. Crossfade adds perceived smoothness.
 *         The outgoing panel fades as the incoming panel appears.
 *
 *    HOW: 1A: opacity 1→0 when entering submenu, 0→1 when returning
 *         1B: opacity 0→1 when entering submenu, 1→0 when returning
 *         Duration is 80% of slide duration for overlap effect.
 *
 * 4. TWO-PHASE ANIMATION TRIGGER
 *    ────────────────────────────
 *    WHY: We must measure 1B's height BEFORE animating, otherwise the
 *         height wrapper doesn't know what to transition to.
 *
 *    HOW: 1) submenuData is set → content renders (but no animation yet)
 *         2) Wait 2 frames for layout calculation
 *         3) Measure submenuRef height synchronously
 *         4) Set shouldAnimateToSubmenu → triggers slide + height + opacity
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * ANIMATION PERFORMANCE TIER
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * | Property  | Tier   | Notes                                    |
 * |-----------|--------|------------------------------------------|
 * | transform | S-Tier | GPU-accelerated, no layout recalc        |
 * | opacity   | S-Tier | GPU-accelerated, no layout recalc        |
 * | height    | B-Tier | Causes layout recalc, but acceptable for |
 * |           |        | small menus with smooth easing           |
 *
 * @module base-ui/menu/base-ui-menu
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseUIMenu = void 0;
const react_1 = require("react");
const menu_1 = require("@base-ui/react/menu");
const utils_1 = require("@/lib/utils");
const config_1 = require("./config");
const components_1 = require("./components");
// ============================================================================
// Component
// ============================================================================
/**
 * Animated menu with nested submenu support
 * Built on Base UI Menu primitives
 *
 * Uses horizontal sliding strip for left-right navigation
 * Container 1 height animates based on active panel (1A vs 1B)
 */
const BaseUIMenu = ({ trigger, items, align = config_1.DEFAULT_MENU_PROPS.align, side = config_1.DEFAULT_MENU_PROPS.side, sideOffset = config_1.DEFAULT_MENU_PROPS.sideOffset, alignOffset = 0, width = config_1.DEFAULT_MENU_PROPS.width, variant = config_1.DEFAULT_MENU_PROPS.variant, open: controlledOpen, onOpenChange, className, appearance, slideTransition = config_1.DEFAULT_SLIDE_TRANSITION, modal = false, header, 
// Panel Navigation Animation (1A ↔ 1B)
heightAnimationEnabled = true, opacityCrossfadeEnabled = true, opacityDurationRatio = 0.8, }) => {
    // ============================================================================
    // State
    // ============================================================================
    const [internalOpen, setInternalOpen] = (0, react_1.useState)(false);
    const isOpen = controlledOpen ?? internalOpen;
    // Submenu content - stored separately to control render timing
    // WHY: We need content to render BEFORE animation starts (for height measurement)
    const [submenuData, setSubmenuData] = (0, react_1.useState)(null);
    // Animation state flags
    // WHY: Two-phase approach - render content first, then animate
    const [shouldAnimateToSubmenu, setShouldAnimateToSubmenu] = (0, react_1.useState)(false);
    const [isNavigatingBack, setIsNavigatingBack] = (0, react_1.useState)(false);
    // Measured heights for Container 1A and 1B
    // WHY: Height wrapper needs explicit pixel values to animate between
    const [rootHeight, setRootHeight] = (0, react_1.useState)(0);
    const [submenuHeight, setSubmenuHeight] = (0, react_1.useState)(0);
    // Derived state: Are we currently showing the submenu?
    // WHY: This single boolean controls slide position, opacity, and height target
    // It's only true when: content exists AND animation should play AND not going back
    const inSubmenu = shouldAnimateToSubmenu && !isNavigatingBack;
    // Refs
    const wasOpenRef = (0, react_1.useRef)(false);
    const rootRef = (0, react_1.useRef)(null); // Container 1A
    const submenuRef = (0, react_1.useRef)(null); // Container 1B
    // ============================================================================
    // Height Measurement with ResizeObserver
    // Measures Container 1A (rootRef) and Container 1B (submenuRef)
    // ============================================================================
    (0, react_1.useLayoutEffect)(() => {
        if (!isOpen)
            return;
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const height = entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height;
                if (entry.target === rootRef.current) {
                    setRootHeight(height);
                }
                else if (entry.target === submenuRef.current) {
                    setSubmenuHeight(height);
                }
            }
        });
        if (rootRef.current)
            observer.observe(rootRef.current);
        if (submenuRef.current)
            observer.observe(submenuRef.current);
        return () => observer.disconnect();
    }, [isOpen]);
    // ============================================================================
    // Wait for submenu (Container 1B) to render before animating
    // Ensures height is measured before transition starts
    // ============================================================================
    (0, react_1.useEffect)(() => {
        if (submenuData && !shouldAnimateToSubmenu && !isNavigatingBack) {
            // Wait 2 frames: 1 for React render, 1 for layout calculation
            let frame1;
            let frame2;
            frame1 = requestAnimationFrame(() => {
                frame2 = requestAnimationFrame(() => {
                    // Always do synchronous height measurement before animating
                    // This ensures we have the correct submenu height after content renders
                    if (submenuRef.current) {
                        const rect = submenuRef.current.getBoundingClientRect();
                        if (rect.height > 0) {
                            setSubmenuHeight(rect.height);
                        }
                    }
                    setShouldAnimateToSubmenu(true);
                });
            });
            return () => {
                cancelAnimationFrame(frame1);
                cancelAnimationFrame(frame2);
            };
        }
    }, [submenuData, shouldAnimateToSubmenu, isNavigatingBack]);
    // ============================================================================
    // Reset on Close
    // ============================================================================
    (0, react_1.useEffect)(() => {
        if (!isOpen && wasOpenRef.current) {
            const timeout = setTimeout(() => {
                setSubmenuData(null);
                setShouldAnimateToSubmenu(false);
                setIsNavigatingBack(false);
            }, config_1.STATE_RESET_DELAY);
            return () => clearTimeout(timeout);
        }
        wasOpenRef.current = isOpen;
    }, [isOpen]);
    // ============================================================================
    // Navigation
    // ============================================================================
    const navigateToSubmenu = (0, react_1.useCallback)((menuId) => {
        // Capture submenu data immediately - animation starts after measurement
        const submenuItem = items.find((item) => item.id === menuId && item.type === 'submenu');
        if (submenuItem && 'items' in submenuItem) {
            setSubmenuData({
                id: menuId,
                title: submenuItem.label,
                items: submenuItem.items,
            });
            setIsNavigatingBack(false);
            // Note: shouldAnimateToSubmenu is set by the effect after height is measured
        }
    }, [items]);
    const navigateBack = (0, react_1.useCallback)(() => {
        setIsNavigatingBack(true);
        setShouldAnimateToSubmenu(false);
        // Delay clearing submenu data so content stays visible during slide-out
        setTimeout(() => {
            setSubmenuData(null);
            setIsNavigatingBack(false);
        }, slideTransition.duration);
    }, [slideTransition.duration]);
    // ============================================================================
    // Handlers
    // ============================================================================
    const handleOpenChange = (0, react_1.useCallback)((open) => {
        setInternalOpen(open);
        onOpenChange?.(open);
    }, [onOpenChange]);
    const handleSelect = (0, react_1.useCallback)(() => {
        handleOpenChange(false);
    }, [handleOpenChange]);
    // ============================================================================
    // Render Helpers
    // ============================================================================
    const renderMenuItem = (0, react_1.useCallback)((item) => (<components_1.MenuItemComponent key={item.id} item={item} variant={variant} onSubmenuClick={navigateToSubmenu} onSelect={handleSelect}/>), [variant, navigateToSubmenu, handleSelect]);
    // ============================================================================
    // Animation Timing
    // ============================================================================
    // Shared transition timing for slide and height
    const transitionStyle = `${slideTransition.duration}ms ${slideTransition.easing}`;
    // Height target: switches based on which panel is active
    // WHY: This is what makes Container 1 grow/shrink smoothly
    const targetHeight = inSubmenu ? submenuHeight : rootHeight;
    const hasHeight = heightAnimationEnabled && targetHeight > 0;
    // Opacity crossfade: controlled by opacityDurationRatio prop
    // WHY: Lower ratio = faster fade, creating more overlap effect
    const opacityDuration = Math.round(slideTransition.duration * opacityDurationRatio);
    const opacityTransitionStyle = `${opacityDuration}ms ${slideTransition.easing}`;
    // Opacity values based on whether crossfade is enabled
    const panel1AOpacity = opacityCrossfadeEnabled ? (inSubmenu ? 0 : 1) : 1;
    const panel1BOpacity = opacityCrossfadeEnabled ? (inSubmenu ? 1 : 0) : 1;
    // ============================================================================
    // Render
    // ============================================================================
    return (<menu_1.Menu.Root open={isOpen} onOpenChange={handleOpenChange} modal={modal}>
      <menu_1.Menu.Trigger nativeButton={false} render={<span className="outline-none focus:outline-none"/>}>
        {trigger}
      </menu_1.Menu.Trigger>

      <menu_1.Menu.Portal>
        <menu_1.Menu.Positioner side={side} align={align} sideOffset={sideOffset} alignOffset={alignOffset} collisionPadding={config_1.DEFAULT_MENU_PROPS.collisionPadding} className="!z-[9999]">
          <menu_1.Menu.Popup data-menu-popup="" className={(0, utils_1.cn)('z-[9999] overflow-hidden', (0, config_1.getAppearanceClasses)(appearance), !className && [
            'data-[open]:animate-in data-[open]:fade-in-0 data-[open]:zoom-in-95',
            'data-[closed]:animate-out data-[closed]:fade-out-0 data-[closed]:zoom-out-95',
            'duration-200 ease-out',
        ], 'menu-popup', className)} style={{
            width,
            ...(0, config_1.getAppearanceStyle)(appearance),
            // Dynamic item radius: container radius - padding
            '--menu-item-radius': `${(0, config_1.calculateItemRadius)(appearance?.borderRadius ?? config_1.DEFAULT_APPEARANCE.borderRadius, variant)}px`,
        }}>
            {/*
         * ┌─────────────────────────────────────────────────────────────┐
         * │ HEIGHT WRAPPER                                              │
         * │ • Animates between rootHeight ↔ submenuHeight               │
         * │ • overflow:hidden clips content during transition           │
         * │ • B-Tier animation (height causes layout recalc)            │
         * └─────────────────────────────────────────────────────────────┘
         */}
            <div className="relative overflow-hidden" style={{
            height: hasHeight ? targetHeight : 'auto',
            transition: hasHeight ? `height ${transitionStyle}` : 'none',
        }}>
              {/*
         * ┌─────────────────────────────────────────────────────────────┐
         * │ SLIDING STRIP                                               │
         * │ • 200% width = both panels side-by-side                     │
         * │ • translateX(0) = show 1A, translateX(-50%) = show 1B       │
         * │ • S-Tier animation (transform is GPU-accelerated)           │
         * │                                                             │
         * │ CRITICAL: items-start prevents flex stretch!                │
         * │ Without it, both panels match the taller one's height,      │
         * │ which breaks height measurement and animation.              │
         * └─────────────────────────────────────────────────────────────┘
         */}
              <div className="flex items-start w-[200%]" style={{
            transform: inSubmenu ? 'translateX(-50%)' : 'translateX(0)',
            transition: `transform ${transitionStyle}`,
        }}>
                {/*
         * CONTAINER 1A - Root/Parent Menu
         * • Always rendered (never unmounted)
         * • opacity: 1→0 when entering submenu (if crossfade enabled)
         * • w-1/2 = 50% of strip = 100% of visible area
         */}
                <div ref={rootRef} className="w-1/2 flex-shrink-0 p-1" style={{
            opacity: panel1AOpacity,
            transition: opacityCrossfadeEnabled ? `opacity ${opacityTransitionStyle}` : 'none',
        }}>
                  {header && (<div className="mb-1 px-1">
                      {header}
                    </div>)}
                  <div className="flex flex-col gap-1">
                    {items.map(renderMenuItem)}
                  </div>
                </div>

                {/*
         * CONTAINER 1B - Submenu Panel
         * • Content renders when submenuData is set (before animation)
         * • opacity: 0→1 when entering submenu (if crossfade enabled)
         * • pointerEvents: none when hidden (prevents accidental clicks)
         * • Can be 1B1 (Notifications), 1B2 (Invite Users), etc.
         */}
                <div ref={submenuRef} className="w-1/2 flex-shrink-0 p-1" style={{
            opacity: panel1BOpacity,
            transition: opacityCrossfadeEnabled ? `opacity ${opacityTransitionStyle}` : 'none',
            pointerEvents: inSubmenu ? 'auto' : 'none',
        }}>
                  {submenuData && (<>
                      <components_1.BackButton title={submenuData.title} onBack={navigateBack}/>
                      <div className="flex flex-col gap-1">
                        {submenuData.items.map(renderMenuItem)}
                      </div>
                    </>)}
                </div>
              </div>
            </div>
          </menu_1.Menu.Popup>
        </menu_1.Menu.Positioner>
      </menu_1.Menu.Portal>
    </menu_1.Menu.Root>);
};
exports.BaseUIMenu = BaseUIMenu;
exports.BaseUIMenu.displayName = 'BaseUIMenu';
//# sourceMappingURL=base-ui-menu.js.map