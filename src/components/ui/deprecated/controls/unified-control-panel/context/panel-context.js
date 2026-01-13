"use strict";
/**
 * Panel Context
 *
 * Split context pattern for optimal performance:
 * - PanelStateContext: Frequently changing values (activeTab, isScrollingProgrammatically)
 * - PanelActionsContext: Stable functions and refs (never cause re-renders)
 *
 * Use usePanelState() when you need reactive state
 * Use usePanelActions() when you only need functions/refs
 * Use usePanelContext() for backwards compatibility (combines both)
 */
'use client';
/**
 * Panel Context
 *
 * Split context pattern for optimal performance:
 * - PanelStateContext: Frequently changing values (activeTab, isScrollingProgrammatically)
 * - PanelActionsContext: Stable functions and refs (never cause re-renders)
 *
 * Use usePanelState() when you need reactive state
 * Use usePanelActions() when you only need functions/refs
 * Use usePanelContext() for backwards compatibility (combines both)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PanelActionsContext = exports.PanelStateContext = exports.PanelContext = exports.usePanelContext = exports.usePanelActions = exports.usePanelState = exports.PanelProvider = void 0;
const react_1 = require("react");
// -----------------------------------------------------------------------------
// Split Contexts
// -----------------------------------------------------------------------------
const PanelStateContext = (0, react_1.createContext)(null);
exports.PanelStateContext = PanelStateContext;
const PanelActionsContext = (0, react_1.createContext)(null);
exports.PanelActionsContext = PanelActionsContext;
// Legacy combined context (for backwards compatibility)
const PanelContext = (0, react_1.createContext)(null);
exports.PanelContext = PanelContext;
const PanelProvider = ({ children, defaultActiveTab, defaultMinimized = false, }) => {
    const [activeTab, setActiveTab] = (0, react_1.useState)(defaultActiveTab);
    const [isScrollingProgrammatically, setIsScrollingProgrammatically] = (0, react_1.useState)(false);
    const [isMinimized, setIsMinimized] = (0, react_1.useState)(defaultMinimized);
    const containerRef = (0, react_1.useRef)(null);
    const sectionRefs = (0, react_1.useRef)(new Map());
    // Stable function - never changes
    const registerSection = (0, react_1.useCallback)((id, element) => {
        if (element) {
            sectionRefs.current.set(id, element);
        }
        else {
            sectionRefs.current.delete(id);
        }
    }, []);
    // Stable function - never changes
    const scrollToSection = (0, react_1.useCallback)((sectionId) => {
        const sectionEl = sectionRefs.current.get(sectionId);
        const container = containerRef.current;
        if (!sectionEl || !container)
            return;
        setActiveTab(sectionId);
        setIsScrollingProgrammatically(true);
        const scrollMargin = 128;
        const elementTop = sectionEl.offsetTop;
        const targetScroll = Math.max(0, elementTop - scrollMargin);
        const scrollDistance = Math.abs(container.scrollTop - targetScroll);
        const useSmooth = scrollDistance > 500;
        container.scrollTo({
            top: targetScroll,
            behavior: useSmooth ? 'smooth' : 'auto',
        });
        const resetDelay = useSmooth ? 600 : 100;
        setTimeout(() => {
            setIsScrollingProgrammatically(false);
        }, resetDelay);
    }, []);
    // Toggle minimize state
    const toggleMinimize = (0, react_1.useCallback)(() => {
        setIsMinimized((prev) => !prev);
    }, []);
    // Set minimize state directly
    const setMinimized = (0, react_1.useCallback)((value) => {
        setIsMinimized(value);
    }, []);
    // State value - changes when state changes
    const stateValue = (0, react_1.useMemo)(() => ({
        activeTab,
        isScrollingProgrammatically,
        isMinimized,
    }), [activeTab, isScrollingProgrammatically, isMinimized]);
    // Actions value - stable reference, never changes
    const actionsValue = (0, react_1.useMemo)(() => ({
        setActiveTab,
        setIsScrollingProgrammatically,
        registerSection,
        scrollToSection,
        toggleMinimize,
        setMinimized,
        containerRef,
    }), [registerSection, scrollToSection, toggleMinimize, setMinimized]);
    // Combined value for backwards compatibility
    const combinedValue = (0, react_1.useMemo)(() => ({
        ...stateValue,
        ...actionsValue,
    }), [stateValue, actionsValue]);
    return (<PanelActionsContext.Provider value={actionsValue}>
      <PanelStateContext.Provider value={stateValue}>
        <PanelContext.Provider value={combinedValue}>{children}</PanelContext.Provider>
      </PanelStateContext.Provider>
    </PanelActionsContext.Provider>);
};
exports.PanelProvider = PanelProvider;
// -----------------------------------------------------------------------------
// Hooks
// -----------------------------------------------------------------------------
/**
 * Get only the panel state (activeTab, isScrollingProgrammatically)
 * Use this when you need reactive state values
 */
const usePanelState = () => {
    const context = (0, react_1.useContext)(PanelStateContext);
    if (!context) {
        throw new Error('usePanelState must be used within a PanelProvider');
    }
    return context;
};
exports.usePanelState = usePanelState;
/**
 * Get only the panel actions (functions and refs)
 * Use this when you only need to call functions or access refs
 * Components using this won't re-render when state changes
 */
const usePanelActions = () => {
    const context = (0, react_1.useContext)(PanelActionsContext);
    if (!context) {
        throw new Error('usePanelActions must be used within a PanelProvider');
    }
    return context;
};
exports.usePanelActions = usePanelActions;
/**
 * Get both state and actions (backwards compatible)
 * Prefer usePanelState() or usePanelActions() for better performance
 */
const usePanelContext = () => {
    const context = (0, react_1.useContext)(PanelContext);
    if (!context) {
        throw new Error('usePanelContext must be used within a PanelProvider');
    }
    return context;
};
exports.usePanelContext = usePanelContext;
//# sourceMappingURL=panel-context.js.map