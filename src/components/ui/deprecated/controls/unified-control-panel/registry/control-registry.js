"use strict";
/**
 * Control Registry
 *
 * Extensible registry pattern for control components.
 * Allows registering custom control types without modifying core code.
 *
 * Usage:
 *   // Register a custom control type
 *   registerControl('my-custom', MyCustomControl)
 *
 *   // Use in config
 *   { type: 'my-custom', id: 'foo', label: 'Foo', ...customProps }
 */
'use client';
/**
 * Control Registry
 *
 * Extensible registry pattern for control components.
 * Allows registering custom control types without modifying core code.
 *
 * Usage:
 *   // Register a custom control type
 *   registerControl('my-custom', MyCustomControl)
 *
 *   // Use in config
 *   { type: 'my-custom', id: 'foo', label: 'Foo', ...customProps }
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControlRegistryContext = exports.defaultRegistry = exports.useRenderControl = exports.useControlRegistry = exports.ControlRegistryProvider = exports.getRegisteredTypes = exports.hasControl = exports.getControl = exports.unregisterControl = exports.registerControl = void 0;
const react_1 = require("react");
// -----------------------------------------------------------------------------
// Default Registry
// -----------------------------------------------------------------------------
/**
 * The default registry instance
 * Built-in controls are registered in control-primitives.tsx
 */
const defaultRegistry = new Map();
exports.defaultRegistry = defaultRegistry;
/**
 * Register a control component for a given type
 */
function registerControl(type, component) {
    defaultRegistry.set(type, component);
}
exports.registerControl = registerControl;
/**
 * Unregister a control component
 */
function unregisterControl(type) {
    return defaultRegistry.delete(type);
}
exports.unregisterControl = unregisterControl;
/**
 * Get a control component by type
 */
function getControl(type) {
    return defaultRegistry.get(type);
}
exports.getControl = getControl;
/**
 * Check if a control type is registered
 */
function hasControl(type) {
    return defaultRegistry.has(type);
}
exports.hasControl = hasControl;
/**
 * Get all registered control types
 */
function getRegisteredTypes() {
    return Array.from(defaultRegistry.keys());
}
exports.getRegisteredTypes = getRegisteredTypes;
// -----------------------------------------------------------------------------
// Registry Context (for scoped registries)
// -----------------------------------------------------------------------------
const ControlRegistryContext = (0, react_1.createContext)(defaultRegistry);
exports.ControlRegistryContext = ControlRegistryContext;
/**
 * Provider for a custom control registry scope
 * Use this to provide additional controls for a specific subtree
 */
function ControlRegistryProvider({ children, registry, extend = true, }) {
    const parentRegistry = (0, react_1.useContext)(ControlRegistryContext);
    const mergedRegistry = (0, react_1.useMemo)(() => {
        if (!registry)
            return parentRegistry;
        if (extend) {
            // Merge with parent registry (custom controls override built-in)
            const merged = new Map(parentRegistry);
            registry.forEach((component, type) => {
                merged.set(type, component);
            });
            return merged;
        }
        return registry;
    }, [registry, extend, parentRegistry]);
    return (<ControlRegistryContext.Provider value={mergedRegistry}>
      {children}
    </ControlRegistryContext.Provider>);
}
exports.ControlRegistryProvider = ControlRegistryProvider;
/**
 * Hook to access the control registry
 */
function useControlRegistry() {
    return (0, react_1.useContext)(ControlRegistryContext);
}
exports.useControlRegistry = useControlRegistry;
/**
 * Hook to render a control from the registry
 */
function useRenderControl() {
    const registry = useControlRegistry();
    return function renderControl(config, onChange) {
        const Component = registry.get(config.type);
        if (!Component) {
            if (process.env.NODE_ENV === 'development') {
                console.warn(`[ControlRegistry] No component registered for type "${config.type}"`);
            }
            return null;
        }
        return (<Component config={config} onChange={onChange} disabled={config.disabled}/>);
    };
}
exports.useRenderControl = useRenderControl;
//# sourceMappingURL=control-registry.js.map