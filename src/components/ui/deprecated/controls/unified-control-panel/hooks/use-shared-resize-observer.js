"use strict";
/**
 * Shared Resize Observer
 *
 * A singleton ResizeObserver that efficiently observes multiple elements.
 * Instead of creating one observer per component, this shares a single
 * observer instance and dispatches callbacks to registered listeners.
 *
 * Usage:
 *   const { ref, height } = useElementSize()
 *   // ref is assigned to the element you want to observe
 *   // height updates when the element resizes
 */
'use client';
/**
 * Shared Resize Observer
 *
 * A singleton ResizeObserver that efficiently observes multiple elements.
 * Instead of creating one observer per component, this shares a single
 * observer instance and dispatches callbacks to registered listeners.
 *
 * Usage:
 *   const { ref, height } = useElementSize()
 *   // ref is assigned to the element you want to observe
 *   // height updates when the element resizes
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedResizeObserver = exports.getSharedObserver = exports.useContentHeight = exports.useElementSize = void 0;
const react_1 = require("react");
class SharedResizeObserver {
    observer = null;
    callbacks = new Map();
    constructor() {
        // Lazy init observer only when needed
        if (typeof window !== 'undefined') {
            this.observer = new ResizeObserver((entries) => {
                for (const entry of entries) {
                    const elementCallbacks = this.callbacks.get(entry.target);
                    if (elementCallbacks) {
                        elementCallbacks.forEach((callback) => callback(entry));
                    }
                }
            });
        }
    }
    observe(element, callback) {
        if (!this.observer)
            return () => { };
        // Add callback to the set for this element
        let callbacks = this.callbacks.get(element);
        if (!callbacks) {
            callbacks = new Set();
            this.callbacks.set(element, callbacks);
            this.observer.observe(element);
        }
        callbacks.add(callback);
        // Return cleanup function
        return () => {
            const elementCallbacks = this.callbacks.get(element);
            if (elementCallbacks) {
                elementCallbacks.delete(callback);
                if (elementCallbacks.size === 0) {
                    this.callbacks.delete(element);
                    this.observer?.unobserve(element);
                }
            }
        };
    }
    disconnect() {
        this.observer?.disconnect();
        this.callbacks.clear();
    }
}
exports.SharedResizeObserver = SharedResizeObserver;
// Singleton instance
let sharedObserver = null;
function getSharedObserver() {
    if (!sharedObserver) {
        sharedObserver = new SharedResizeObserver();
    }
    return sharedObserver;
}
exports.getSharedObserver = getSharedObserver;
/**
 * Hook to observe an element's size using the shared ResizeObserver
 */
function useElementSize(options = {}) {
    const { debounce = 0 } = options;
    const [size, setSize] = (0, react_1.useState)(null);
    const elementRef = (0, react_1.useRef)(null);
    const cleanupRef = (0, react_1.useRef)(null);
    const timeoutRef = (0, react_1.useRef)(null);
    const ref = (0, react_1.useCallback)((element) => {
        // Cleanup previous observer
        if (cleanupRef.current) {
            cleanupRef.current();
            cleanupRef.current = null;
        }
        elementRef.current = element;
        if (element) {
            const observer = getSharedObserver();
            const handleResize = (entry) => {
                const { width, height } = entry.contentRect;
                if (debounce > 0) {
                    if (timeoutRef.current) {
                        clearTimeout(timeoutRef.current);
                    }
                    timeoutRef.current = setTimeout(() => {
                        setSize({ width, height });
                    }, debounce);
                }
                else {
                    setSize({ width, height });
                }
            };
            cleanupRef.current = observer.observe(element, handleResize);
            // Get initial size
            const rect = element.getBoundingClientRect();
            setSize({ width: rect.width, height: rect.height });
        }
        else {
            setSize(null);
        }
    }, [debounce]);
    // Cleanup on unmount
    (0, react_1.useEffect)(() => {
        return () => {
            if (cleanupRef.current) {
                cleanupRef.current();
            }
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);
    return {
        ref,
        size,
        width: size?.width ?? null,
        height: size?.height ?? null,
    };
}
exports.useElementSize = useElementSize;
/**
 * Hook to observe content height only (common use case for collapse animations)
 */
function useContentHeight() {
    const { ref, height } = useElementSize();
    return { ref, height };
}
exports.useContentHeight = useContentHeight;
//# sourceMappingURL=use-shared-resize-observer.js.map