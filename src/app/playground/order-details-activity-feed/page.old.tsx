'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

import { OrderSummaryFlowView } from './components/order-summary-flow-view'
import { MOCK_CONTRACT, type ViewMode } from './types'

// ============================================================================
// ORDER DETAILS ACTIVITY FEED PLAYGROUND
// ============================================================================
// Recovered from: feebs/playground-backup-2024-12-30
// Original location: front-end/src/modules/playground/ui/flow/pages/payment-plan-details/
// ============================================================================

export default function OrderDetailsActivityFeedPlayground() {
  const [viewMode, setViewMode] = useState<ViewMode>('order-summary-flow')

  const VERSION_TABS: { id: ViewMode; label: string }[] = [
    { id: 'order-summary-flow', label: 'Demo' },
    { id: 'order-summary-flow-large', label: 'Demo Large' },
  ]

  const handleTabClick = (tabId: ViewMode) => {
    setViewMode(tabId)
  }

  const renderTab = (tab: { id: ViewMode; label: string }) => (
    <button
      key={tab.id}
      onClick={() => handleTabClick(tab.id)}
      className={cn(
        'relative pb-4 text-sm font-medium transition-colors',
        viewMode === tab.id ? 'text-primary' : 'text-secondary hover:text-primary'
      )}
    >
      {tab.label}
      {viewMode === tab.id && <span className="bg-brand-solid absolute right-0 bottom-0 left-0 h-0.5" />}
    </button>
  )

  return (
    <div className="bg-primary min-h-screen p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <div className="space-y-4 bg-transparent">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-primary text-3xl font-semibold tracking-tight">
                Order Details Activity Feed
              </h1>
              <p className="text-tertiary mt-1 text-lg">
                V2 redesign exploration with PayProgressCircle timeline view.
              </p>
            </div>
            <div className="text-right">
              <p className="text-tertiary text-xs tracking-wider uppercase">Order ID</p>
              <p className="text-primary text-lg font-semibold">{MOCK_CONTRACT.centrexId}</p>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="border-secondary border-b">
            <div className="flex items-center gap-8">
              {VERSION_TABS.map(renderTab)}
            </div>
          </div>
        </div>

        {/* View Content */}
        {viewMode === 'order-summary-flow' && (
          <OrderSummaryFlowView contract={MOCK_CONTRACT} variant="default" />
        )}
        {viewMode === 'order-summary-flow-large' && (
          <OrderSummaryFlowView contract={MOCK_CONTRACT} variant="large" />
        )}
      </div>
    </div>
  )
}
