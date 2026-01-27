'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/deprecated/base/icon/huge-icons/huge-icons'
import Clock01Icon from '@hugeicons-pro/core-stroke-rounded/Clock01Icon'

import { InfoCard } from './info-card'
import { PaymentActivityFeed } from './payment-activity-feed'
import { Badge, Avatar, PayProgressCircle } from './ui-components'
import { MOCK_CUSTOMER_PAYMENTS, MOCK_PARTNER_PAYOUTS, type ContractData } from '../types'

// ============================================================================
// TAB NAVIGATION
// ============================================================================

type TabId = 'activity' | 'payouts' | 'details'

interface TabNavigationProps {
  activeTab: TabId
  onTabChange: (tab: TabId) => void
  isLarge?: boolean
}

const TabNavigation = ({ activeTab, onTabChange, isLarge = false }: TabNavigationProps) => {
  const tabs: { id: TabId; label: string }[] = [
    { id: 'activity', label: 'Activity' },
    { id: 'payouts', label: 'Payouts' },
    { id: 'details', label: 'Info' },
  ]

  return (
    <div className="border-b border-secondary">
      <div className="flex gap-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'relative pb-4 font-medium transition-colors',
              isLarge ? 'text-base' : 'text-sm',
              activeTab === tab.id
                ? 'text-primary'
                : 'text-secondary hover:text-primary'
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-solid" />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

// ============================================================================
// ORDER SUMMARY FLOW VIEW
// ============================================================================

interface OrderSummaryFlowViewProps {
  contract: ContractData
  variant?: 'default' | 'large'
}

export const OrderSummaryFlowView = ({ contract, variant = 'default' }: OrderSummaryFlowViewProps) => {
  const [activeTab, setActiveTab] = useState<TabId>('activity')
  const isLarge = variant === 'large'

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

  // Card config
  const outerPadding = 4
  const outerBorderRadius = 24
  const innerPadding = 32

  // Size variants
  const textSizes = {
    header: isLarge ? 'text-2xl' : 'text-xl',
    product: isLarge ? 'text-base' : 'text-sm',
    metrics: isLarge ? 'text-base' : 'text-sm',
    metricsLabel: isLarge ? 'text-sm' : 'text-xs',
    message: isLarge ? 'text-xl' : 'text-lg',
    maxWidth: isLarge ? '380px' : '340px',
  }

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
      <div className="min-h-screen p-8">
        <div className="mx-auto max-w-3xl space-y-8">
          {/* Main Content Card */}
          <div
            className="bg-primary rounded-3xl"
            style={{
              padding: `${outerPadding}px`,
              borderRadius: `${outerBorderRadius}px`,
            }}
          >
            <div style={{ padding: `${innerPadding}px` }}>
              {/* Header Section */}
              <div className={cn('mb-6', isLarge && 'flex items-center justify-between')}>
                <h1 className={cn('text-primary font-medium', textSizes.header)}>
                  #{contract.centrexId}
                </h1>
                {isLarge && (
                  <Badge type="color" size="sm" color="success">
                    Healthy
                  </Badge>
                )}
              </div>

              {/* Product Info */}
              <div className={cn('mb-8', isLarge ? 'space-y-3' : 'space-y-2')}>
                <div className="flex items-center gap-5">
                  <div className="flex items-center gap-2">
                    <Avatar size="xs" shape="square" initials={partnerInitials} color={partnerAvatarColor} />
                    <span className={cn('text-primary', textSizes.product)}>{contract.productName}</span>
                  </div>

                  <span className="text-primary/10">|</span>
                  <span className={textSizes.product}>
                    <span className="text-quaternary">Purchased by </span>
                    <span className="text-primary">{customerName}</span>
                  </span>
                </div>

                {/* Metadata Tags */}
                <div className="flex flex-wrap gap-2">
                  <Badge type="color" size="sm" color="gray">
                    {contract.partner.name}
                  </Badge>
                  <Badge type="color" size="sm" color="gray">
                    {getRouteDisplay(contract.planType)}
                  </Badge>
                  <Badge type="color" size="sm" color="gray" className="gap-1">
                    <HugeIcon icon={Clock01Icon} size={12} className="text-tertiary/50" strokeWidth={2.5} />
                    {contract.paymentsTotal} months
                  </Badge>
                  <Badge type="color" size="sm" color="gray" className="gap-1">
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
              </div>

              {/* Metrics Section */}
              <div className="mb-8 flex flex-wrap justify-between gap-6">
                <div className="flex-shrink-0">
                  <p className={cn('text-tertiary mb-1', textSizes.metricsLabel)}>List price</p>
                  <p className={cn('text-primary font-medium tabular-nums', textSizes.metrics)}>
                    ${contract.amountTotal.toFixed(2)}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <p className={cn('text-tertiary mb-1', textSizes.metricsLabel)}>Purchased</p>
                  <p className={cn('text-primary font-medium', textSizes.metrics)}>
                    {formatDate(contract.contractDate)}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <p className={cn('text-tertiary mb-1', textSizes.metricsLabel)}>Term</p>
                  <p className={cn('text-tertiary', textSizes.metrics)}>{contract.paymentsTotal} months</p>
                </div>
                <div className="flex-shrink-0">
                  <p className={cn('text-tertiary mb-1', textSizes.metricsLabel)}>Route</p>
                  <p className={cn('text-tertiary', textSizes.metrics)}>{getRouteDisplay(contract.planType)}</p>
                </div>
              </div>

              {/* Message Card */}
              <div
                className="mb-8 bg-tertiary rounded-[20px] flex items-center justify-center"
                style={{
                  height: '320px',
                  padding: `${innerPadding}px`,
                  borderRadius: `${outerBorderRadius - outerPadding}px`,
                }}
              >
                <p
                  className={cn('mx-auto text-center leading-relaxed font-medium', textSizes.message)}
                  style={{
                    color: 'var(--color-utility-gray-400)',
                    maxWidth: textSizes.maxWidth,
                  }}
                >
                  Customer has made first payment and
                  <br />
                  is making regular monthly payments.
                  <br />
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
                  </span>{' '}
                  All
                  <br />
                  payments are being processed
                  <br />
                  successfully. No action required.
                </p>
              </div>

              {/* Tab Navigation */}
              <div className="mb-6">
                <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} isLarge={isLarge} />
              </div>

              {/* Tab Content */}
              <div className="space-y-6">
                {activeTab === 'details' && (
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

                {activeTab === 'payouts' && (
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

                {activeTab === 'activity' && (
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
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
