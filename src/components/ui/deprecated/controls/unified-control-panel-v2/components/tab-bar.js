"use strict";
/**
 * Tab Bar
 *
 * Navigation tabs using Base UI Tabs primitive.
 * Provides smooth animated indicator and scroll support.
 */
'use client';
/**
 * Tab Bar
 *
 * Navigation tabs using Base UI Tabs primitive.
 * Provides smooth animated indicator and scroll support.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabBar = void 0;
const tabs_1 = require("@base-ui/react/tabs");
const cx_1 = require("@/components/utils/cx");
function TabBar({ sections, activeTab, onTabChange }) {
    const isScrollable = sections.length > 4;
    return (<tabs_1.Tabs.Root value={activeTab} onValueChange={onTabChange}>
      <tabs_1.Tabs.List className={(0, cx_1.cx)('border-secondary bg-primary relative flex items-center overflow-hidden border-b', isScrollable && 'overflow-x-auto scrollbar-none')}>
        {/* Animated indicator */}
        <tabs_1.Tabs.Indicator className={(0, cx_1.cx)('bg-brand absolute bottom-0 h-0.5', 'transition-all duration-200 ease-out')}/>

        {sections.map((section) => (<tabs_1.Tabs.Tab key={section.id} value={section.id} className={(0, cx_1.cx)('relative z-10 cursor-pointer select-none whitespace-nowrap', 'px-4 py-3 font-mono text-xs font-medium uppercase tracking-wider', 'transition-colors duration-150', 
            // State styles
            'text-secondary hover:text-primary', 'data-[selected]:text-primary', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-inset', 
            // Size
            isScrollable ? 'shrink-0' : 'flex-1 text-center')}>
            {section.label}
          </tabs_1.Tabs.Tab>))}
      </tabs_1.Tabs.List>
    </tabs_1.Tabs.Root>);
}
exports.TabBar = TabBar;
//# sourceMappingURL=tab-bar.js.map