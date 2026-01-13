"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
const skwircle_1 = require("@/components/ui/deprecated/skwircle");
const button_1 = require("@/components/ui/deprecated/skwircle/components/button");
const badge_1 = require("@/components/ui/deprecated/skwircle/components/badge");
const skwircle_2 = require("@/components/ui/deprecated/skwircle");
const search_input_1 = require("@/components/ui/deprecated/skwircle/components/search-input");
const expanding_search_1 = require("@/components/ui/deprecated/expanding-search");
const core_stroke_rounded_1 = require("@hugeicons-pro/core-stroke-rounded");
const icon_1 = require("@/components/ui/prod/base/icon");
// =============================================================================
// FEED ITEMS - Add your components here
// =============================================================================
const FEED_ITEMS = [
    {
        id: 'button-primary',
        label: 'Button',
        component: (<div className="flex flex-wrap items-center justify-center gap-3">
        <button_1.Button hierarchy="primary">Primary</button_1.Button>
        <button_1.Button hierarchy="secondary">Secondary</button_1.Button>
        <button_1.Button hierarchy="tertiary">Tertiary</button_1.Button>
      </div>),
    },
    {
        id: 'badge-variants',
        label: 'Badge',
        component: (<div className="flex flex-wrap items-center justify-center gap-2">
        <badge_1.Badge color="brand">Brand</badge_1.Badge>
        <badge_1.Badge color="success">Success</badge_1.Badge>
        <badge_1.Badge color="warning">Warning</badge_1.Badge>
        <badge_1.Badge color="error">Error</badge_1.Badge>
      </div>),
    },
    {
        id: 'metric-tile',
        label: 'MetricTile',
        component: (<skwircle_2.MetricTile label="Total Revenue" value="$45,231" change="+12.5%" changeType="positive" period="vs last month" icon={<icon_1.HugeIcon icon={core_stroke_rounded_1.ArrowUp01Icon} size={20}/>}/>),
    },
    {
        id: 'badge-with-icon',
        label: 'Badge with Icon',
        component: (<div className="flex flex-wrap items-center justify-center gap-2">
        <badge_1.Badge.WithIcon icon={core_stroke_rounded_1.CheckmarkCircle02Icon} color="success">
          Approved
        </badge_1.Badge.WithIcon>
        <badge_1.Badge.WithDot dotColor="success">Online</badge_1.Badge.WithDot>
      </div>),
    },
    {
        id: 'expanding-search',
        label: 'ExpandingSearch',
        component: (<expanding_search_1.ExpandingSearch placeholder="Search..." className="shine-1"/>),
    },
    {
        id: 'search-input',
        label: 'SearchInput',
        component: (<div className="w-64">
        <search_input_1.SearchInput size="md" placeholder="Type to search..." readOnly/>
      </div>),
    },
    {
        id: 'button-sizes',
        label: 'Button Sizes',
        component: (<div className="flex flex-wrap items-center justify-center gap-3">
        <button_1.Button size="sm">Small</button_1.Button>
        <button_1.Button size="md">Medium</button_1.Button>
        <button_1.Button size="lg">Large</button_1.Button>
      </div>),
    },
    {
        id: 'metric-tile-sizes',
        label: 'MetricTile Sizes',
        component: (<div className="flex flex-wrap items-end justify-center gap-4">
        <skwircle_2.MetricTile size="sm" label="Small" value="$1,234" change="+5%" changeType="positive"/>
        <skwircle_2.MetricTile size="md" label="Medium" value="$12,345" change="+10%" changeType="positive"/>
        <skwircle_2.MetricTile size="lg" label="Large" value="$123,456" change="+15%" changeType="positive"/>
      </div>),
    },
];
// =============================================================================
// FEED CARD COMPONENT
// =============================================================================
function FeedCard({ item }) {
    return (<div>
      <skwircle_1.Skwircle.Card elevation="sm" roundness="rounded" fillMode className="w-full min-h-[140px] sm:min-h-[180px]" contentWrapperClassName="flex-1 flex items-center justify-center p-5 sm:p-8">
        {item.component}
      </skwircle_1.Skwircle.Card>
      <p className="text-tertiary mt-3 text-center text-sm">{item.label}</p>
    </div>);
}
// =============================================================================
// FEED PAGE
// =============================================================================
function FeedPage() {
    return (<div className="min-h-screen bg-primary nav-clearance nav-clearance-bottom px-4">
      {/* Feed Container */}
      <div className="mx-auto w-full max-w-[700px]">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-primary text-2xl font-medium tracking-tight">
            Component Feed
          </h1>
          <p className="text-tertiary mt-2 text-sm">
            A collection of Skwircle components
          </p>
        </header>

        {/* Feed Items */}
        <div className="flex flex-col gap-8">
          {FEED_ITEMS.map((item) => (<FeedCard key={item.id} item={item}/>))}
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center">
          <p className="text-quaternary text-xs">
            Built with Skwircle
          </p>
        </footer>
      </div>
    </div>);
}
exports.default = FeedPage;
//# sourceMappingURL=page.js.map