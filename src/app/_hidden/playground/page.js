"use strict";
/**
 * Playground Index Page
 *
 * Landing page for all component playgrounds and demos.
 * Navigate to individual component demos from here.
 */
'use client';
/**
 * Playground Index Page
 *
 * Landing page for all component playgrounds and demos.
 * Navigate to individual component demos from here.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const link_1 = require("next/link");
const skwircle_1 = require("@/components/ui/deprecated/skwircle/skwircle");
const PLAYGROUND_ITEMS = [
    {
        id: 'skwircle-demo',
        title: 'Skwircle Design System',
        description: 'Interactive playground for buttons, inputs, badges, and cards',
        href: '/playground/skwircle-demo',
    },
    {
        id: 'skwircle-card',
        title: 'Skwircle Card',
        description: 'Showcase cards with preview area and dark footer pattern',
        href: '/playground/skwircle-card',
    },
    {
        id: 'sticky-data-table',
        title: 'Sticky Data Table',
        description: 'High-performance data table with sticky columns and infinite scroll',
        href: '/playground/sticky-data-table',
    },
];
function PlaygroundPage() {
    return (<div className="min-h-screen nav-clearance nav-clearance-bottom">
      {/* Content */}
      <div className="px-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-display-md font-semibold text-primary">Playground</h1>
          <p className="mt-1 text-sm text-secondary">
            Explore and test Skwircle design system components
          </p>
        </div>

        {/* Demo Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PLAYGROUND_ITEMS.map((item) => (<link_1.default key={item.id} href={item.href} className="group">
              <skwircle_1.Skwircle.Card elevation="xs" roundness="rounded" intent="default">
                <div className="p-5">
                  <h3 className="text-sm font-semibold text-primary group-hover:text-brand-secondary transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-tertiary">
                    {item.description}
                  </p>
                </div>
              </skwircle_1.Skwircle.Card>
            </link_1.default>))}
        </div>
      </div>
    </div>);
}
exports.default = PlaygroundPage;
//# sourceMappingURL=page.js.map