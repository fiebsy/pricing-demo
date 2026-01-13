"use strict";
/**
 * Base UI Menu - Menu Navigation Hook
 *
 * Manages the navigation state for nested menus with optimized animations.
 *
 * Features:
 * - Uses ResizeObserver for accurate, automatic measurements
 * - Uses CSS Grid-based height animation (GPU-accelerated)
 * - Simplified state management with single source of truth
 *
 * @module base-ui/menu/hooks/use-menu-navigation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMenuNavigation = void 0;
const react_1 = require("react");
const config_1 = require("../config");
/**
 * Hook for managing nested menu navigation with optimized height transitions
 */
function useMenuNavigation({ items, isOpen, heightTransition, }) {
    // ============================================================================
    // State
    // ============================================================================
    const [menuStack, setMenuStack] = (0, react_1.useState)([]);
    const [displayMenuStack, setDisplayMenuStack] = (0, react_1.useState)([]);
    const [rootHeight, setRootHeight] = (0, react_1.useState)(0);
    const [submenuHeight, setSubmenuHeight] = (0, react_1.useState)(0);
    const [isTransitioning, setIsTransitioning] = (0, react_1.useState)(false);
    const [activePanel, setActivePanel] = (0, react_1.useState)('root');
    // ============================================================================
    // Refs
    // ============================================================================
    const containerRef = (0, react_1.useRef)(null);
    const rootMenuRef = (0, react_1.useRef)(null);
    const submenuRef = (0, react_1.useRef)(null);
    const wasOpenRef = (0, react_1.useRef)(false);
    const resizeObserverRef = (0, react_1.useRef)(null);
    const transitionTimeoutRef = (0, react_1.useRef)(undefined);
    // ============================================================================
    // Menu Item Helpers
    // ============================================================================
    const getCurrentMenuItems = (0, react_1.useCallback)(() => {
        let currentItems = items;
        for (const menuId of displayMenuStack) {
            const menuItem = currentItems.find((item) => item.id === menuId);
            if (menuItem && menuItem.type === 'submenu' && 'items' in menuItem) {
                currentItems = menuItem.items;
            }
        }
        return currentItems;
    }, [items, displayMenuStack]);
    const getCurrentMenuTitle = (0, react_1.useCallback)(() => {
        // Use displayMenuStack so title stays stable during exit animation
        if (displayMenuStack.length === 0)
            return null;
        let currentItems = items;
        let menuTitle = '';
        for (const menuId of displayMenuStack) {
            const menuItem = currentItems.find((item) => item.id === menuId);
            if (menuItem && 'label' in menuItem) {
                menuTitle = menuItem.label;
                if (menuItem.type === 'submenu' && 'items' in menuItem) {
                    currentItems = menuItem.items;
                }
            }
        }
        return menuTitle || null;
    }, [items, displayMenuStack]);
    // ============================================================================
    // ResizeObserver Setup
    // ============================================================================
    (0, react_1.useLayoutEffect)(() => {
        if (!isOpen)
            return;
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const target = entry.target;
                const height = entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height;
                if (target === rootMenuRef.current) {
                    setRootHeight(height);
                }
                else if (target === submenuRef.current) {
                    setSubmenuHeight(height);
                }
            }
        });
        resizeObserverRef.current = observer;
        if (rootMenuRef.current) {
            observer.observe(rootMenuRef.current);
        }
        if (submenuRef.current) {
            observer.observe(submenuRef.current);
        }
        return () => {
            observer.disconnect();
            resizeObserverRef.current = null;
        };
    }, [isOpen]);
    // Re-observe on content changes
    (0, react_1.useLayoutEffect)(() => {
        if (!isOpen || !resizeObserverRef.current)
            return;
        if (submenuRef.current && displayMenuStack.length > 0) {
            resizeObserverRef.current.observe(submenuRef.current);
        }
    }, [isOpen, displayMenuStack, items]);
    // ============================================================================
    // Display State Sync (only on menu open, not on menuStack changes)
    // ============================================================================
    (0, react_1.useEffect)(() => {
        // Only sync when menu first opens, not on every menuStack change
        // navigateToSubmenu and navigateBack handle displayMenuStack updates directly
        if (isOpen && menuStack.length === 0 && displayMenuStack.length === 0) {
            setActivePanel('root');
        }
    }, [isOpen, menuStack.length, displayMenuStack.length]);
    (0, react_1.useEffect)(() => {
        if (!isOpen && wasOpenRef.current) {
            const resetTimeout = setTimeout(() => {
                setMenuStack([]);
                setDisplayMenuStack([]);
                setActivePanel('root');
                setIsTransitioning(false);
            }, config_1.STATE_RESET_DELAY);
            return () => clearTimeout(resetTimeout);
        }
        wasOpenRef.current = isOpen;
    }, [isOpen]);
    // ============================================================================
    // Transition Management
    // ============================================================================
    const startTransition = (0, react_1.useCallback)(() => {
        if (transitionTimeoutRef.current) {
            clearTimeout(transitionTimeoutRef.current);
        }
        setIsTransitioning(true);
        transitionTimeoutRef.current = setTimeout(() => {
            setIsTransitioning(false);
        }, heightTransition.duration + 50);
    }, [heightTransition.duration]);
    (0, react_1.useEffect)(() => {
        return () => {
            if (transitionTimeoutRef.current) {
                clearTimeout(transitionTimeoutRef.current);
            }
        };
    }, []);
    // ============================================================================
    // Navigation Functions
    // ============================================================================
    const navigateToSubmenu = (0, react_1.useCallback)((menuId) => {
        const newStack = [...menuStack, menuId];
        startTransition();
        setMenuStack(newStack);
        setDisplayMenuStack(newStack);
        setActivePanel('submenu');
    }, [menuStack, startTransition]);
    const navigateBack = (0, react_1.useCallback)((slideTransitionDuration = 300) => {
        const newStack = menuStack.slice(0, -1);
        startTransition();
        setMenuStack(newStack);
        setActivePanel(newStack.length > 0 ? 'submenu' : 'root');
        // Delay displayMenuStack update so submenu content stays stable during slide-out
        setTimeout(() => {
            setDisplayMenuStack(newStack);
        }, slideTransitionDuration);
    }, [menuStack, startTransition]);
    // ============================================================================
    // CSS Custom Properties
    // ============================================================================
    const cssVars = {
        '--menu-root-height': `${rootHeight}px`,
        '--menu-submenu-height': `${submenuHeight}px`,
        '--menu-target-height': activePanel === 'root' ? `${rootHeight}px` : `${submenuHeight}px`,
        '--menu-transition-duration': `${heightTransition.duration}ms`,
        '--menu-transition-easing': heightTransition.easing,
    };
    // ============================================================================
    // Return
    // ============================================================================
    return {
        menuStack,
        displayMenuStack,
        inSubmenu: menuStack.length > 0, // Use menuStack for immediate slide trigger
        rootHeight,
        submenuHeight,
        activePanel,
        isTransitioning,
        rootMenuRef,
        submenuRef,
        containerRef,
        navigateToSubmenu,
        navigateBack,
        getCurrentMenuItems,
        getCurrentMenuTitle,
        cssVars,
    };
}
exports.useMenuNavigation = useMenuNavigation;
//# sourceMappingURL=use-menu-navigation.js.map