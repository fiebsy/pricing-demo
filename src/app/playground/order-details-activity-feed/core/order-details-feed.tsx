/**
 * Order Details Activity Feed Component
 *
 * @status incubating
 * @migration-target src/components/ui/features/order-details-feed
 */

'use client'

import * as React from 'react'
import { useState } from 'react'
import { cx } from '@/components/utils/cx'
import { Badge } from '@/components/ui/core/primitives/badge'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import Clock01Icon from '@hugeicons-pro/core-stroke-rounded/Clock01Icon'

import type { OrderDetailsFeedConfig, ContractData, TabId } from '../config/types'
import { DEFAULT_ORDER_DETAILS_CONFIG } from '../config/presets'
import {
  buildOuterClasses,
  buildOuterStyles,
  buildSummaryCardClasses,
  buildSummaryCardStyles,
  getHeaderSizeClass,
  getProductSizeClass,
  getMetricsSizeClass,
  getMessageSizeClass,
  getSpacingValue,
} from '../utils/class-builders'

// Import existing components - these will be refactored gradually
import { InfoCard } from '../components/info-card'
import { PaymentActivityFeed } from '../components/payment-activity-feed'
import { Avatar, PayProgressCircle } from '../components/ui-components'
import { MOCK_CUSTOMER_PAYMENTS, MOCK_PARTNER_PAYOUTS } from '../types'

export interface OrderDetailsFeedProps {
  config?: OrderDetailsFeedConfig
  contract: ContractData
  className?: string
}

// Tab Navigation Component
interface TabNavigationProps {
  tabs: TabId[]
  activeTab: TabId
  onTabChange: (tab: TabId) => void
  showBorder?: boolean
  isLarge?: boolean
}

const TabNavigation = ({ tabs, activeTab, onTabChange, showBorder = true, isLarge = false }: TabNavigationProps) => {
  const tabLabels: Record<TabId, string> = {
    activity: 'Activity',
    payouts: 'Payouts',
    info: 'Info',
  }

  if (tabs.length === 0) return null
  if (tabs.length === 1 && !showBorder) return null // Hide single tab without border

  return (
    <div className={cx(showBorder && 'border-b border-secondary')}>
      <div className="flex gap-8">
        {tabs.map((tabId) => (
          <button
            key={tabId}
            onClick={() => onTabChange(tabId)}
            className={cx(
              'relative pb-4 font-medium transition-colors',
              isLarge ? 'text-base' : 'text-sm',
              activeTab === tabId
                ? 'text-primary'
                : 'text-secondary hover:text-primary'
            )}
          >
            {tabLabels[tabId]}
            {activeTab === tabId && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-solid" />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export const OrderDetailsFeed = React.forwardRef<HTMLDivElement, OrderDetailsFeedProps>(
  ({ config: configOverride, contract, className }, ref) => {
    // Use the provided config directly if given, otherwise use defaults
    const config: OrderDetailsFeedConfig = configOverride ? configOverride as OrderDetailsFeedConfig : DEFAULT_ORDER_DETAILS_CONFIG

    // State for active tab
    const [activeTab, setActiveTab] = useState<TabId>(config.tabs.defaultTab)

    // Ensure active tab is in visible tabs
    React.useEffect(() => {
      if (!config.tabs.visibleTabs.includes(activeTab)) {
        setActiveTab(config.tabs.visibleTabs[0] || 'info')
      }
    }, [config.tabs.visibleTabs, activeTab])

    // Helper functions
    const formatDate = (dateStr: string) => {
      const date = new Date(dateStr)
      return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    }

    const getRouteDisplay = (planType: string) => {
      if (planType === 'FUNDING') return 'Upfront'
      if (planType === 'SERVICING') return 'PAC'
      return planType
    }

    // Calculate payment summary
    const clearedPayments = MOCK_CUSTOMER_PAYMENTS.filter((p) => p.status === 'Cleared')
    const totalPaid = clearedPayments.reduce((sum, p) => sum + p.amount, 0)

    const customerName = `${contract.customer.firstName} ${contract.customer.lastName}`

    // Extract initials from partner name
    const getInitials = (name: string) => {
      if (!name) return ''
      const firstWord = name.trim().split(/\s+/)[0] || ''
      return firstWord
        .slice(0, 2)
        .toUpperCase()
        .padEnd(2, firstWord[0] || '')
    }

    // Avatar colors
    const AVATAR_COLORS: Array<'blue' | 'green' | 'orange' | 'red' | 'yellow' | 'brand'> = [
      'blue',
      'green',
      'orange',
      'red',
      'yellow',
      'brand',
    ]

    const getPartnerAvatarColor = (partnerId: string): 'blue' | 'green' | 'orange' | 'red' | 'yellow' | 'brand' => {
      let hash = 0
      for (let i = 0; i < partnerId.length; i++) {
        hash = (hash << 5) - hash + partnerId.charCodeAt(i)
        hash = hash & hash
      }
      const index = Math.abs(hash) % AVATAR_COLORS.length
      return AVATAR_COLORS[index] ?? 'blue'
    }

    const partnerInitials = getInitials(contract.partner.name)
    const partnerAvatarColor = getPartnerAvatarColor(contract.partner.id)

    // Get spacing values
    const spacing = getSpacingValue(config.layout.spacing)

    // Typography classes
    const headerClass = getHeaderSizeClass(config.typography.headerSize)
    const productClass = getProductSizeClass(config.typography.productSize)
    const metricsClass = getMetricsSizeClass(config.typography.metricsSize)
    const metricLabelClass = config.typography.metricsSize === 'xs' ? 'text-xs' : 
                             config.typography.metricsSize === 'sm' ? 'text-xs' : 'text-sm'
    const messageClass = getMessageSizeClass(config.typography.messageSize)

    const isLarge = false // 'large' mode doesn't exist in ViewVariant type

    return (
      <>
        <style
          dangerouslySetInnerHTML={{
            __html: `
            :root {
              --gradient-success-start: #002B11;
              --gradient-success-end: #8E8000;
            }
            .dark-mode {
              --gradient-success-start: #22c55e;
              --gradient-success-end: #eab308;
            }
          `,
          }}
        />
        <div 
          ref={ref}
          className={cx('mx-auto', spacing.sectionGap, className)}
          style={{ maxWidth: config.layout.maxWidth }}
        >
          {/* Main Content Card */}
          <div
            className={cx(buildOuterClasses(config.outer), 'rounded-3xl')}
            style={buildOuterStyles(config.outer)}
          >
            <div style={{ padding: `${spacing.innerPadding}px` }}>
              {/* Header Section */}
              {config.header.showOrderId && (
                <div className={cx('mb-6', isLarge && 'flex items-center justify-between')}>
                  <h1 className={cx('text-primary font-medium', headerClass)}>
                    #{contract.centrexId}
                  </h1>
                  {isLarge && config.header.showHealthBadge && (
                    <Badge size="sm" color="success">
                      Healthy
                    </Badge>
                  )}
                </div>
              )}

              {/* Product Info */}
              <div className={cx('mb-8', isLarge ? 'space-y-3' : 'space-y-2')}>
                <div className="flex items-center gap-5">
                  <div className="flex items-center gap-2">
                    <Avatar size="xs" shape="square" initials={partnerInitials} color={partnerAvatarColor} />
                    <span className={cx('text-primary', productClass)}>{contract.productName}</span>
                  </div>

                  <span className="text-primary/10">|</span>
                  <span className={productClass}>
                    <span className="text-quaternary">Purchased by </span>
                    <span className="text-primary">{customerName}</span>
                  </span>
                </div>

                {/* Metadata Tags */}
                {config.header.showMetadata && (
                  <div className="flex flex-wrap gap-2">
                    <Badge size="sm" color="gray">
                      {contract.partner.name}
                    </Badge>
                    <Badge size="sm" color="gray">
                      {getRouteDisplay(contract.planType)}
                    </Badge>
                    <Badge size="sm" color="gray" className="gap-1">
                      <HugeIcon icon={Clock01Icon} size={12} className="text-tertiary/50" strokeWidth={2.5} />
                      {contract.paymentsTotal} months
                    </Badge>
                    <Badge size="sm" color="gray" className="gap-1">
                      Order #{contract.centrexId}
                      <PayProgressCircle
                        amountPaid={totalPaid}
                        totalAmount={contract.amountToRepay}
                        size={12}
                        strokeWidth={2.5}
                        showPercentageText={false}
                      />
                    </Badge>
                  </div>
                )}
              </div>

              {/* Metrics Section */}
              {config.header.showMetrics && (
                <div className={cx('mb-8 flex flex-wrap justify-between', spacing.itemGap)}>
                  <div className="flex-shrink-0">
                    <p className={cx('text-tertiary mb-1', metricLabelClass)}>List price</p>
                    <p className={cx('text-primary font-medium tabular-nums', metricsClass)}>
                      ${contract.amountTotal.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <p className={cx('text-tertiary mb-1', metricLabelClass)}>Purchased</p>
                    <p className={cx('text-primary font-medium', metricsClass)}>
                      {formatDate(contract.contractDate)}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <p className={cx('text-tertiary mb-1', metricLabelClass)}>Term</p>
                    <p className={cx('text-tertiary', metricsClass)}>{contract.paymentsTotal} months</p>
                  </div>
                  <div className="flex-shrink-0">
                    <p className={cx('text-tertiary mb-1', metricLabelClass)}>Route</p>
                    <p className={cx('text-tertiary', metricsClass)}>{getRouteDisplay(contract.planType)}</p>
                  </div>
                </div>
              )}

              {/* Summary Card */}
              {config.summaryCard.visible && (
                <div
                  className={cx('mb-8', buildSummaryCardClasses(config.summaryCard))}
                  style={{
                    ...buildSummaryCardStyles(config.summaryCard),
                    padding: `${spacing.innerPadding}px`,
                  }}
                >
                  <p
                    className={cx('mx-auto text-center leading-relaxed font-medium', messageClass)}
                    style={{
                      color: 'var(--color-utility-gray-400)',
                      maxWidth: isLarge ? '380px' : '340px',
                    }}
                  >
                    Customer has made first payment and
                    <br />
                    is making regular monthly payments.
                    <br />
                    {config.summaryCard.gradientEffect ? (
                      <span
                        style={{
                          background:
                            'linear-gradient(to top right, var(--gradient-success-start), var(--gradient-success-end))',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        Order is healthy and on track.
                      </span>
                    ) : (
                      <span>Order is healthy and on track.</span>
                    )}{' '}
                    All
                    <br />
                    payments are being processed
                    <br />
                    successfully. No action required.
                  </p>
                </div>
              )}

              {/* Tab Navigation */}
              {config.tabs.visibleTabs.length > 0 && (
                <>
                  <div className="mb-6">
                    <TabNavigation
                      tabs={config.tabs.visibleTabs}
                      activeTab={activeTab}
                      onTabChange={setActiveTab}
                      showBorder={config.tabs.showBorder}
                      isLarge={isLarge}
                    />
                  </div>

                  {/* Tab Content */}
                  <div className="space-y-6">
                    {activeTab === 'info' && config.tabs.visibleTabs.includes('info') && (
                      <InfoCard
                        orderId={contract.centrexId}
                        product={contract.productName}
                        route={getRouteDisplay(contract.planType)}
                        term={contract.paymentsTotal}
                        listPrice={contract.amountTotal}
                        customerName={customerName}
                        customerEmail={contract.customer.email}
                        customerPhone={contract.customer.phoneNumber}
                        purchaseDate={contract.contractDate}
                        customerPrice={contract.amountToRepay}
                        paidIn={totalPaid}
                        paymentProgress={Math.round((totalPaid / contract.amountToRepay) * 100)}
                        variant="minimal"
                      />
                    )}

                    {activeTab === 'payouts' && config.tabs.visibleTabs.includes('payouts') && (
                      <PaymentActivityFeed
                        payments={MOCK_PARTNER_PAYOUTS}
                        customerName={contract.partner.name}
                        title="Payout Activity"
                        collapsedItemCount={3}
                        gradientHeight={80}
                        gradientIntensity={100}
                        mode="payout"
                      />
                    )}

                    {activeTab === 'activity' && config.tabs.visibleTabs.includes('activity') && (
                      <PaymentActivityFeed
                        payments={MOCK_CUSTOMER_PAYMENTS}
                        customerName={customerName}
                        title="Payment Activity"
                        collapsedItemCount={3}
                        gradientHeight={80}
                        gradientIntensity={100}
                      />
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </>
    )
  }
)

OrderDetailsFeed.displayName = 'OrderDetailsFeed'