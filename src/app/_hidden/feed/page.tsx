'use client'

import { Skwircle } from '@/components/ui/deprecated/skwircle'
import { Button } from '@/components/ui/deprecated/skwircle/components/button'
import { Badge } from '@/components/ui/deprecated/skwircle/components/badge'
import { MetricTile } from '@/components/ui/deprecated/skwircle'
import { SearchInput } from '@/components/ui/deprecated/skwircle/components/search-input'
import { ExpandingSearch } from '@/components/ui/deprecated/expanding-search'
import {
  CheckmarkCircle02Icon,
  ArrowUp01Icon,
} from '@hugeicons-pro/core-stroke-rounded'
import { HugeIcon } from '@/components/ui/prod/base/icon'

// =============================================================================
// FEED ITEM TYPE
// =============================================================================

interface FeedItem {
  id: string
  label: string
  component: React.ReactNode
}

// =============================================================================
// FEED ITEMS - Add your components here
// =============================================================================

const FEED_ITEMS: FeedItem[] = [
  {
    id: 'button-primary',
    label: 'Button',
    component: (
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button hierarchy="primary">Primary</Button>
        <Button hierarchy="secondary">Secondary</Button>
        <Button hierarchy="tertiary">Tertiary</Button>
      </div>
    ),
  },
  {
    id: 'badge-variants',
    label: 'Badge',
    component: (
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Badge color="brand">Brand</Badge>
        <Badge color="success">Success</Badge>
        <Badge color="warning">Warning</Badge>
        <Badge color="error">Error</Badge>
      </div>
    ),
  },
  {
    id: 'metric-tile',
    label: 'MetricTile',
    component: (
      <MetricTile
        label="Total Revenue"
        value="$45,231"
        change="+12.5%"
        changeType="positive"
        period="vs last month"
        icon={<HugeIcon icon={ArrowUp01Icon} size={20} />}
      />
    ),
  },
  {
    id: 'badge-with-icon',
    label: 'Badge with Icon',
    component: (
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Badge.WithIcon icon={CheckmarkCircle02Icon} color="success">
          Approved
        </Badge.WithIcon>
        <Badge.WithDot dotColor="success">Online</Badge.WithDot>
      </div>
    ),
  },
  {
    id: 'expanding-search',
    label: 'ExpandingSearch',
    component: (
      <ExpandingSearch
        placeholder="Search..."
        className="shine-1"
      />
    ),
  },
  {
    id: 'search-input',
    label: 'SearchInput',
    component: (
      <div className="w-64">
        <SearchInput
          size="md"
          placeholder="Type to search..."
          readOnly
        />
      </div>
    ),
  },
  {
    id: 'button-sizes',
    label: 'Button Sizes',
    component: (
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
    ),
  },
  {
    id: 'metric-tile-sizes',
    label: 'MetricTile Sizes',
    component: (
      <div className="flex flex-wrap items-end justify-center gap-4">
        <MetricTile size="sm" label="Small" value="$1,234" change="+5%" changeType="positive" />
        <MetricTile size="md" label="Medium" value="$12,345" change="+10%" changeType="positive" />
        <MetricTile size="lg" label="Large" value="$123,456" change="+15%" changeType="positive" />
      </div>
    ),
  },
]

// =============================================================================
// FEED CARD COMPONENT
// =============================================================================

function FeedCard({ item }: { item: FeedItem }) {
  return (
    <div>
      <Skwircle.Card
        elevation="sm"
        roundness="rounded"
        fillMode
        className="w-full min-h-[140px] sm:min-h-[180px]"
        contentWrapperClassName="flex-1 flex items-center justify-center p-5 sm:p-8"
      >
        {item.component}
      </Skwircle.Card>
      <p className="text-tertiary mt-3 text-center text-sm">{item.label}</p>
    </div>
  )
}

// =============================================================================
// FEED PAGE
// =============================================================================

export default function FeedPage() {
  return (
    <div className="min-h-screen bg-primary nav-clearance nav-clearance-bottom px-4">
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
          {FEED_ITEMS.map((item) => (
            <FeedCard key={item.id} item={item} />
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center">
          <p className="text-quaternary text-xs">
            Built with Skwircle
          </p>
        </footer>
      </div>
    </div>
  )
}
