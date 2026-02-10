'use client'

import { MetricCard } from './metric-card'
import { PageHeader } from './page-header'
import { SectionTabBar } from './section-tab-bar'
import { useNavigation, useCurrentSection, useHasTabs } from './nav-context'

interface PageContentProps {
  title: string
  description?: string
}

export function PageContent({ title, description }: PageContentProps) {
  const { config } = useNavigation()
  const section = useCurrentSection()
  const hasTabs = useHasTabs()

  const { pageHeader, tabBar } = config
  const { tabBarPosition } = pageHeader

  // Show tabs below metrics when position is 'below-metrics'
  const showTabsBelowMetrics = hasTabs && section && tabBarPosition === 'below-metrics'

  return (
    <div className="space-y-6">
      {/* Page Header (may include tabs if position is 'above-metrics') */}
      <PageHeader title={title} description={description} />

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Total Volume" />
        <MetricCard title="Transactions" />
        <MetricCard title="Success Rate" />
        <MetricCard title="Avg. Value" />
      </div>

      {/* Tab bar below metrics (when position is 'below-metrics') */}
      {showTabsBelowMetrics && (
        <SectionTabBar section={section} config={tabBar} />
      )}

      {/* Table Placeholder */}
      <div className="rounded-xl border border-primary bg-secondary">
        <div className="border-b border-primary px-4 py-3">
          <div className="h-4 w-32 rounded bg-tertiary/30" />
        </div>
        <div className="divide-y divide-primary">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-3">
              <div className="h-4 w-24 rounded bg-tertiary/20" />
              <div className="h-4 w-32 rounded bg-tertiary/20" />
              <div className="h-4 flex-1 rounded bg-tertiary/20" />
              <div className="h-4 w-20 rounded bg-tertiary/20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
