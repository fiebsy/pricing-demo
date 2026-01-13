"use strict";
/**
 * Use Scroll Sync
 *
 * IntersectionObserver-based scroll sync for tab navigation
 */
'use client';
/**
 * Use Scroll Sync
 *
 * IntersectionObserver-based scroll sync for tab navigation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.useScrollSync = void 0;
const react_1 = require("react");
const useScrollSync = ({ sectionIds, onSectionInView, isDisabled = false, containerRef, rootMargin = '-20% 0px -70% 0px', }) => {
    const observerRef = (0, react_1.useRef)(null);
    const lastActiveSectionRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        const container = containerRef.current;
        if (!container || sectionIds.length === 0)
            return;
        if (observerRef.current) {
            observerRef.current.disconnect();
        }
        observerRef.current = new IntersectionObserver((entries) => {
            if (isDisabled)
                return;
            let topmostEntry = null;
            let topmostTop = Infinity;
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    const rect = entry.boundingClientRect;
                    if (rect.top < topmostTop) {
                        topmostTop = rect.top;
                        topmostEntry = entry;
                    }
                }
            }
            if (topmostEntry) {
                const targetElement = topmostEntry.target;
                if (targetElement.id) {
                    const newSection = targetElement.id;
                    if (newSection !== lastActiveSectionRef.current) {
                        lastActiveSectionRef.current = newSection;
                        onSectionInView(newSection);
                    }
                }
            }
        }, {
            root: container,
            rootMargin,
            threshold: [0, 0.1, 0.5],
        });
        sectionIds.forEach((id) => {
            const element = container.querySelector(`[data-section-id="${id}"]`);
            if (element) {
                observerRef.current?.observe(element);
            }
        });
        return () => {
            observerRef.current?.disconnect();
        };
    }, [sectionIds, onSectionInView, isDisabled, containerRef, rootMargin]);
    return {
        resetSync: () => {
            lastActiveSectionRef.current = null;
        },
    };
};
exports.useScrollSync = useScrollSync;
//# sourceMappingURL=use-scroll-sync.js.map