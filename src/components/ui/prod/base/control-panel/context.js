"use strict";
// =============================================================================
// Panel Context
// =============================================================================
// Shared state management for the control panel including:
// - Active tab state
// - Minimize/expand state
// =============================================================================
'use client';
// =============================================================================
// Panel Context
// =============================================================================
// Shared state management for the control panel including:
// - Active tab state
// - Minimize/expand state
// =============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.PanelContext = exports.usePanelContext = exports.PanelProvider = void 0;
const react_1 = require("react");
const PanelContext = (0, react_1.createContext)(null);
exports.PanelContext = PanelContext;
function PanelProvider({ children, defaultActiveTab, defaultMinimized = false, minimized: controlledMinimized, onMinimizedChange, }) {
    const [activeTab, setActiveTab] = (0, react_1.useState)(defaultActiveTab);
    const [uncontrolledMinimized, setUncontrolledMinimized] = (0, react_1.useState)(defaultMinimized);
    // Support both controlled and uncontrolled minimize state
    const isMinimized = controlledMinimized ?? uncontrolledMinimized;
    const setIsMinimized = (0, react_1.useCallback)((value) => {
        if (onMinimizedChange) {
            onMinimizedChange(value);
        }
        else {
            setUncontrolledMinimized(value);
        }
    }, [onMinimizedChange]);
    const toggleMinimized = (0, react_1.useCallback)(() => {
        setIsMinimized(!isMinimized);
    }, [isMinimized, setIsMinimized]);
    const value = (0, react_1.useMemo)(() => ({
        activeTab,
        setActiveTab,
        isMinimized,
        setIsMinimized,
        toggleMinimized,
    }), [activeTab, isMinimized, setIsMinimized, toggleMinimized]);
    return <PanelContext.Provider value={value}>{children}</PanelContext.Provider>;
}
exports.PanelProvider = PanelProvider;
function usePanelContext() {
    const context = (0, react_1.useContext)(PanelContext);
    if (!context) {
        throw new Error('usePanelContext must be used within a PanelProvider');
    }
    return context;
}
exports.usePanelContext = usePanelContext;
//# sourceMappingURL=context.js.map