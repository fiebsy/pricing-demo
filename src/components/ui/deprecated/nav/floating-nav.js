"use strict";
/**
 * FloatingNav
 *
 * Minimalist floating navigation bar with sliding toggle indicator.
 * - Top center on desktop (md+)
 * - Bottom center on mobile
 * - Same component for both layouts
 */
'use client';
/**
 * FloatingNav
 *
 * Minimalist floating navigation bar with sliding toggle indicator.
 * - Top center on desktop (md+)
 * - Bottom center on mobile
 * - Same component for both layouts
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloatingNav = void 0;
const link_1 = require("next/link");
const navigation_1 = require("next/navigation");
const icon_1 = require("@/components/ui/prod/base/icon");
const core_stroke_rounded_1 = require("@hugeicons-pro/core-stroke-rounded");
// =============================================================================
// CONSTANTS
// =============================================================================
const NAV_ITEMS = [
    { id: 'home', label: 'Home', href: '/', icon: core_stroke_rounded_1.Home01Icon },
    { id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: core_stroke_rounded_1.AnalyticsUpIcon },
];
const ITEM_SIZE = 34; // p-2 (8px * 2) + icon 18px = 34px
// =============================================================================
// COMPONENT
// =============================================================================
function FloatingNav({ className = '' }) {
    const pathname = (0, navigation_1.usePathname)();
    // Check if current path matches nav item (exact or starts with for nested routes)
    const isActive = (href) => {
        if (href === '/')
            return pathname === '/';
        return pathname === href || pathname.startsWith(`${href}/`);
    };
    // Get active index for slider position
    const activeIndex = NAV_ITEMS.findIndex((item) => isActive(item.href));
    return (<nav className={`
        fixed right-4 top-4 z-50
        ${className}
      `}>
      <div className="relative flex items-center rounded-full border border-primary bg-secondary p-1 backdrop-blur-xl shadow-lg shadow-black/10">
        {/* Sliding indicator */}
        <div className="absolute top-1 bottom-1 rounded-full bg-quaternary transition-transform duration-300 ease-out" style={{
            width: ITEM_SIZE,
            transform: `translateX(${activeIndex * ITEM_SIZE}px)`,
        }}/>

        {/* Nav items */}
        {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (<link_1.default key={item.id} href={item.href} title={item.label} className={`
                relative z-10 flex items-center justify-center rounded-full p-2
                transition-colors duration-200
                ${active ? 'text-primary' : 'text-quaternary hover:text-secondary'}
              `}>
              <icon_1.HugeIcon icon={item.icon} size={18}/>
            </link_1.default>);
        })}
      </div>
    </nav>);
}
exports.FloatingNav = FloatingNav;
exports.default = FloatingNav;
//# sourceMappingURL=floating-nav.js.map