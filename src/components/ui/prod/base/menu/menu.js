"use strict";
/**
 * Menu - Main Component
 *
 * Base menu component with reveal animation, panel navigation,
 * and configurable appearance. Built on Base UI primitives.
 *
 * This is the foundation for FilterMenu and other menu derivatives.
 *
 * @module prod/base/menu/menu
 */
'use client';
/**
 * Menu - Main Component
 *
 * Base menu component with reveal animation, panel navigation,
 * and configurable appearance. Built on Base UI primitives.
 *
 * This is the foundation for FilterMenu and other menu derivatives.
 *
 * @module prod/base/menu/menu
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Menu = void 0;
const react_1 = require("react");
const menu_1 = require("@base-ui/react/menu");
const utils_1 = require("@/lib/utils");
// CSS-driven panel transitions (no JS during animation)
require("./menu-transitions.css");
const config_1 = require("./config");
const menu_item_1 = require("./menu-item");
const menu_back_button_1 = require("./menu-back-button");
// ============================================================================
// Reveal Animation Hook (Legacy - kept for easy revert)
// ============================================================================
/**
 * Legacy reveal animation using CSS keyframe injection.
 * Only used when USE_LEGACY_ANIMATION is true.
 * Kept for easy revert if Tailwind animations cause issues.
 */
function useRevealAnimationLegacy(isOpen, sideOffset) {
    const idRef = (0, react_1.useRef)(`menu-${Math.random().toString(36).substr(2, 9)}`);
    const uniqueClass = `menu-popup-${idRef.current}`;
    const animationCss = (0, react_1.useMemo)(() => {
        if (!isOpen)
            return '';
        // Use centralized reveal animation config
        const { duration, scaleStart, scaleEnd, slideOffsetRatio } = config_1.REVEAL_ANIMATION;
        const easing = config_1.EASING_EXPO_OUT;
        const slideOffset = Math.round(sideOffset * slideOffsetRatio);
        const keyframe = `menu-reveal-${idRef.current}`;
        const opacityKeyframe = `menu-opacity-${idRef.current}`;
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
// Component
// ============================================================================
/**
 * Menu - Base dropdown menu component
 *
 * Features:
 * - Reveal animation (scale + slide + fade)
 * - Panel navigation with sliding strip
 * - Height animation between panels
 * - Configurable appearance (shine, shadow, squircle, gradient)
 */
const Menu = ({ items, trigger, header, width = config_1.DEFAULT_MENU_WIDTH, side = 'bottom', align = 'start', sideOffset = config_1.DEFAULT_SIDE_OFFSET, alignOffset = 0, onOpenChange: externalOnOpenChange, onSelect: externalOnSelect, appearance, animation, className, }) => {
    // ============================================================================
    // State
    // ============================================================================
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    const [submenu, setSubmenu] = (0, react_1.useState)(null);
    const [isAnimatingToSubmenu, setIsAnimatingToSubmenu] = (0, react_1.useState)(false);
    const [isAnimatingBack, setIsAnimatingBack] = (0, react_1.useState)(false);
    const [direction, setDirection] = (0, react_1.useState)('forward');
    // Measured heights for smooth transitions
    const [rootHeight, setRootHeight] = (0, react_1.useState)(0);
    const [submenuHeight, setSubmenuHeight] = (0, react_1.useState)(0);
    // Refs
    const rootPanelRef = (0, react_1.useRef)(null);
    const submenuPanelRef = (0, react_1.useRef)(null);
    const wasOpenRef = (0, react_1.useRef)(false);
    // Reveal animation - conditionally use legacy or Tailwind approach
    const legacyAnimation = useRevealAnimationLegacy(isOpen, sideOffset);
    const revealClasses = (0, react_1.useMemo)(() => (0, config_1.getRevealAnimationClasses)(), []);
    // Close menu on scroll to prevent animation issues with sticky positioning
    (0, react_1.useEffect)(() => {
        if (!isOpen)
            return;
        const handleScroll = () => {
            setIsOpen(false);
            externalOnOpenChange?.(false);
        };
        // Use capture phase to catch scroll before it causes position updates
        window.addEventListener('scroll', handleScroll, { passive: true, capture: true });
        return () => window.removeEventListener('scroll', handleScroll, { capture: true });
    }, [isOpen, externalOnOpenChange]);
    // ============================================================================
    // Configuration
    // ============================================================================
    const mergedAppearance = (0, react_1.useMemo)(() => ({ ...config_1.DEFAULT_APPEARANCE, ...appearance }), [appearance]);
    const mergedAnimation = (0, react_1.useMemo)(() => ({ ...config_1.DEFAULT_ANIMATION, ...animation }), [animation]);
    // ============================================================================
    // Height Measurement
    // ============================================================================
    //
    // Height animation between panels requires accurate measurements of both
    // root and submenu panel heights. This is tricky because:
    //
    // 1. Initial open: rootHeight must be measured synchronously before the
    //    first render to avoid a flash of auto-height.
    //
    // 2. Navigate to submenu: submenuHeight is measured after 2 animation frames
    //    to ensure the submenu content has rendered (see Submenu Animation Trigger).
    //
    // 3. Navigate back: rootHeight must be re-measured in navigateBack() because
    //    the root panel may have been at 0 opacity during crossfade, and we need
    //    the current accurate height for a smooth transition.
    //
    // ResizeObserver handles ongoing changes (e.g., dynamic content), but the
    // synchronous measurements ensure we have valid heights at critical moments.
    // ============================================================================
    (0, react_1.useLayoutEffect)(() => {
        if (!isOpen)
            return;
        // Immediate synchronous measurement for initial height
        // This prevents height animation from starting at 0
        if (rootPanelRef.current) {
            const rect = rootPanelRef.current.getBoundingClientRect();
            if (rect.height > 0) {
                setRootHeight(rect.height);
            }
        }
        // ResizeObserver for ongoing height changes (dynamic content)
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const height = entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height;
                if (entry.target === rootPanelRef.current) {
                    setRootHeight(height);
                }
                else if (entry.target === submenuPanelRef.current) {
                    setSubmenuHeight(height);
                }
            }
        });
        if (rootPanelRef.current)
            observer.observe(rootPanelRef.current);
        if (submenuPanelRef.current)
            observer.observe(submenuPanelRef.current);
        return () => observer.disconnect();
    }, [isOpen, submenu]); // Re-run when submenu changes to observe new panel
    // Note: Submenu animation is now triggered directly in navigateToSubmenu
    // with a single RAF for faster response
    // ============================================================================
    // Reset on Close
    // ============================================================================
    (0, react_1.useEffect)(() => {
        if (!isOpen && wasOpenRef.current) {
            const timeout = setTimeout(() => {
                setSubmenu(null);
                setIsAnimatingToSubmenu(false);
                setIsAnimatingBack(false);
            }, 200);
            return () => clearTimeout(timeout);
        }
        wasOpenRef.current = isOpen;
    }, [isOpen]);
    // ============================================================================
    // Handlers
    // ============================================================================
    const handleOpenChange = (0, react_1.useCallback)((open) => {
        setIsOpen(open);
        externalOnOpenChange?.(open);
    }, [externalOnOpenChange]);
    const navigateToSubmenu = (0, react_1.useCallback)((menuId) => {
        const submenuItem = items.find((item) => item.id === menuId && item.type === 'submenu');
        if (submenuItem && submenuItem.type === 'submenu') {
            // Batch all state updates together (React 18+ auto-batches)
            setDirection('forward');
            setIsAnimatingBack(false);
            setSubmenu({
                id: menuId,
                title: submenuItem.label,
                items: submenuItem.items,
            });
            // Trigger animation immediately on next frame (single RAF, not double)
            requestAnimationFrame(() => {
                if (submenuPanelRef.current) {
                    const rect = submenuPanelRef.current.getBoundingClientRect();
                    if (rect.height > 0) {
                        setSubmenuHeight(rect.height);
                    }
                }
                setIsAnimatingToSubmenu(true);
            });
        }
    }, [items]);
    const navigateBack = (0, react_1.useCallback)(() => {
        // Re-measure root height synchronously before animation
        if (rootPanelRef.current) {
            const rect = rootPanelRef.current.getBoundingClientRect();
            if (rect.height > 0) {
                setRootHeight(rect.height);
            }
        }
        // Batch state updates
        setDirection('back');
        setIsAnimatingBack(true);
        setIsAnimatingToSubmenu(false);
        // Clean up after animation completes
        setTimeout(() => {
            setSubmenu(null);
            setIsAnimatingBack(false);
        }, mergedAnimation.duration);
    }, [mergedAnimation.duration]);
    const handleSelect = (0, react_1.useCallback)((item) => {
        if (item && item.type !== 'separator' && item.type !== 'label' && item.type !== 'submenu' && item.type !== 'checkbox') {
            externalOnSelect?.(item);
        }
        handleOpenChange(false);
    }, [handleOpenChange, externalOnSelect]);
    // ============================================================================
    // Animation State
    // ============================================================================
    const inSubmenu = isAnimatingToSubmenu && !isAnimatingBack;
    const targetHeight = inSubmenu ? submenuHeight : rootHeight;
    const canAnimateHeight = mergedAnimation.animateHeight && targetHeight > 0;
    // CSS custom properties for transitions (memoized to prevent style reconciliation)
    const animationCssVars = (0, react_1.useMemo)(() => ({
        '--menu-slide-duration': `${mergedAnimation.duration}ms`,
        '--menu-slide-easing': mergedAnimation.easing,
        '--menu-fade-duration': `${mergedAnimation.opacityDuration}ms`,
        '--menu-fade-easing': mergedAnimation.opacityEasing,
        '--menu-quick-out-duration': `${mergedAnimation.quickOutDuration}ms`,
        '--menu-fade-in-delay': `${mergedAnimation.fadeInDelay}ms`,
        '--menu-stagger-delay': `${mergedAnimation.staggerDelay}ms`,
        '--menu-height-transition': canAnimateHeight
            ? `height ${mergedAnimation.duration}ms ${mergedAnimation.easing}`
            : 'none',
        '--menu-target-height': targetHeight > 0 ? `${targetHeight}px` : 'auto',
    }), [
        mergedAnimation.duration,
        mergedAnimation.easing,
        mergedAnimation.opacityDuration,
        mergedAnimation.opacityEasing,
        mergedAnimation.quickOutDuration,
        mergedAnimation.fadeInDelay,
        mergedAnimation.staggerDelay,
        canAnimateHeight,
        targetHeight,
    ]);
    // ============================================================================
    // Render
    // ============================================================================
    const popupClasses = (0, config_1.getPopupClasses)(mergedAppearance);
    const gradientStyles = (0, config_1.getGradientStyles)(mergedAppearance);
    const itemRadius = (0, config_1.getItemRadius)(mergedAppearance.borderRadius);
    return (<>
      {/* Inject reveal animation CSS (legacy mode only) */}
      {config_1.USE_LEGACY_ANIMATION && isOpen && legacyAnimation.animationCss && (<style>{legacyAnimation.animationCss}</style>)}

      <menu_1.Menu.Root open={isOpen} onOpenChange={handleOpenChange} modal={false}>
        <menu_1.Menu.Trigger nativeButton={false} render={<span className="outline-none focus:outline-none"/>}>
          {/* Inject isActive prop into trigger when menu is open */}
          {(0, react_1.isValidElement)(trigger)
            ? (0, react_1.cloneElement)(trigger, { isActive: isOpen })
            : trigger}
        </menu_1.Menu.Trigger>

        <menu_1.Menu.Portal>
          <menu_1.Menu.Positioner side={side} align={align} sideOffset={sideOffset} alignOffset={alignOffset} collisionPadding={8} style={{ zIndex: config_1.Z_INDEX.MENU_POSITIONER }}>
            <menu_1.Menu.Popup data-menu-popup="" data-state={isOpen ? 'open' : 'closed'} data-side={side} className={(0, utils_1.cn)('overflow-hidden', 
        // Use legacy animation (CSS keyframe injection)
        config_1.USE_LEGACY_ANIMATION ? legacyAnimation.uniqueClass : revealClasses, 
        // Accessibility: respect reduced motion preference
        'motion-reduce:animate-none motion-reduce:transition-none', popupClasses, className)} style={{
            width,
            '--menu-item-radius': `${itemRadius}px`,
            ...gradientStyles,
        }}>
              {/* Animation Container - CSS handles all transitions via data attributes */}
              <div style={animationCssVars} data-menu-view={inSubmenu ? 'submenu' : 'root'} data-menu-direction={direction} data-menu-mode={mergedAnimation.opacityMode}>
                {/* Height Wrapper - animates between panel heights */}
                <div className="menu-height-wrapper relative overflow-hidden">
                  {/* Sliding Strip - 200% width, translateX for panel switching */}
                  <div className="menu-sliding-strip flex items-start w-[200%]">
                    {/* Panel A - Root Menu */}
                    <div ref={rootPanelRef} className="menu-panel-root w-1/2 flex-shrink-0 p-1">
                      {header}
                      <div className="flex flex-col gap-1">
                        {items.map((item) => (<menu_item_1.MenuItem key={item.id} item={item} onSubmenuClick={navigateToSubmenu} onSelect={() => handleSelect(item)}/>))}
                      </div>
                    </div>

                    {/* Panel B - Submenu */}
                    <div ref={submenuPanelRef} className="menu-panel-submenu w-1/2 flex-shrink-0 p-1">
                      {submenu && (<>
                          <menu_back_button_1.MenuBackButton title={submenu.title} onBack={navigateBack}/>
                          <div className="flex flex-col gap-1">
                            {submenu.items.map((item) => (<menu_item_1.MenuItem key={item.id} item={item} onSubmenuClick={navigateToSubmenu} onSelect={() => handleSelect(item)}/>))}
                          </div>
                        </>)}
                    </div>
                  </div>
                </div>
              </div>
            </menu_1.Menu.Popup>
          </menu_1.Menu.Positioner>
        </menu_1.Menu.Portal>
      </menu_1.Menu.Root>
    </>);
};
exports.Menu = Menu;
exports.Menu.displayName = 'Menu';
//# sourceMappingURL=menu.js.map