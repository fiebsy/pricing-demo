"use strict";
/**
 * Breadcrumbs
 *
 * Minimalist breadcrumb navigation for sub-pages.
 * Displays a simple path with separator.
 */
'use client';
/**
 * Breadcrumbs
 *
 * Minimalist breadcrumb navigation for sub-pages.
 * Displays a simple path with separator.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Breadcrumbs = void 0;
const link_1 = require("next/link");
// =============================================================================
// COMPONENT
// =============================================================================
function Breadcrumbs({ items, className = '' }) {
    if (items.length === 0)
        return null;
    return (<nav className={`flex items-center gap-2 text-sm ${className}`}>
      {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (<span key={index} className="flex items-center gap-2">
            {item.href && !isLast ? (<link_1.default href={item.href} className="text-gray-500 hover:text-gray-300 transition-colors">
                {item.label}
              </link_1.default>) : (<span className={isLast ? 'text-gray-300 font-medium' : 'text-gray-500'}>
                {item.label}
              </span>)}
            {!isLast && (<span className="text-gray-600">/</span>)}
          </span>);
        })}
    </nav>);
}
exports.Breadcrumbs = Breadcrumbs;
exports.default = Breadcrumbs;
//# sourceMappingURL=breadcrumbs.js.map