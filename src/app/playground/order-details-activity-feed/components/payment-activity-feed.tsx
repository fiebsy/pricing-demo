'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/deprecated/base/icon/huge-icons/huge-icons'

// Bulk icons for status indicators
import StatusIcon from '@hugeicons-pro/core-bulk-rounded/StatusIcon'
import CheckmarkCircle02Icon from '@hugeicons-pro/core-bulk-rounded/CheckmarkCircle02Icon'
import CancelCircleIcon from '@hugeicons-pro/core-bulk-rounded/CancelCircleIcon'

import type { PaymentRecord } from '../types'

// ============================================================================
// PAYMENT ACTIVITY FEED ITEM (V2 - Bulk Icons)
// ============================================================================

type FeedMode = 'payment' | 'payout'

interface PaymentActivityFeedItemProps {
  payment: PaymentRecord
  customerName: string
  isLast?: boolean
  mode?: FeedMode
}

export const PaymentActivityFeedItem = ({
  payment,
  customerName,
  isLast = false,
  mode = 'payment',
}: PaymentActivityFeedItemProps) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  // Get status message based on payment status and mode
  const getStatusMessage = () => {
    if (mode === 'payout') {
      switch (payment.status) {
        case 'Cleared':
          return 'received a payout'
        case 'Failed':
          return 'payout failed'
        case 'Pending': {
          const paymentDate = new Date(payment.processedDate)
          const now = new Date()
          const diffMs = paymentDate.getTime() - now.getTime()
          const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24))
          return `payout scheduled in ${diffDays} days`
        }
        case 'Processing':
          return 'payout processing'
        default:
          return 'received payout'
      }
    }
    // Payment mode (default)
    switch (payment.status) {
      case 'Cleared':
        return 'sent a payment'
      case 'Failed':
        return 'missed a payment'
      case 'Pending': {
        const paymentDate = new Date(payment.processedDate)
        const now = new Date()
        const diffMs = paymentDate.getTime() - now.getTime()
        const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24))
        return `next payment in ${diffDays} days`
      }
      case 'Processing':
        return 'payment processing'
      default:
        return 'sent payment'
    }
  }

  // Get icon and color based on status
  const getStatusConfig = () => {
    switch (payment.status) {
      case 'Cleared':
        return {
          icon: CheckmarkCircle02Icon,
          color: 'text-[var(--color-utility-success-500)]',
        }
      case 'Failed':
        return {
          icon: CancelCircleIcon,
          color: 'text-[var(--color-utility-error-500)]',
        }
      case 'Pending':
      case 'Processing':
      default:
        return {
          icon: StatusIcon,
          color: 'text-[var(--color-utility-blue-500)]',
        }
    }
  }

  const statusConfig = getStatusConfig()

  // Check if payment has subtext (for centering logic)
  const hasSubtext = payment.status === 'Failed' || payment.status === 'Pending'

  // Spacing constants
  const ICON_SIZE = 20
  const ICON_TOP_PADDING = 12
  const CONNECTOR_TOP_MARGIN = 4
  const CONNECTOR_BOTTOM_OFFSET = 6
  const ITEM_SPACING = 24
  const CONNECTOR_DOT_SIZE = 2
  const CONNECTOR_DOT_SPACING = 6

  const connectorTopPx = ICON_TOP_PADDING + ICON_SIZE + CONNECTOR_TOP_MARGIN
  const connectorBottomOverlapPx = ITEM_SPACING + ICON_TOP_PADDING - CONNECTOR_BOTTOM_OFFSET
  const connectorDotRadiusPx = CONNECTOR_DOT_SIZE / 2

  return (
    <article className="flex gap-3">
      {/* Icon column */}
      <div className="relative flex flex-col items-center pt-3" style={{ width: ICON_SIZE }}>
        <div className="relative flex w-[20px] shrink-0 items-center justify-center overflow-hidden">
          <HugeIcon
            icon={CheckmarkCircle02Icon}
            data-icon-status={payment.status}
            size={ICON_SIZE}
            strokeWidth={0}
            className={statusConfig.color}
          />
        </div>
        {!isLast && (
          <div
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 bg-border-primary"
            style={{
              top: `${connectorTopPx}px`,
              bottom: `-${connectorBottomOverlapPx}px`,
              width: `${CONNECTOR_DOT_SIZE}px`,
              WebkitMaskImage: `radial-gradient(circle, #000 ${connectorDotRadiusPx}px, transparent ${connectorDotRadiusPx + 0.5}px)`,
              WebkitMaskSize: `${CONNECTOR_DOT_SIZE}px ${CONNECTOR_DOT_SPACING}px`,
              WebkitMaskRepeat: 'repeat-y',
              WebkitMaskPosition: 'center top',
              maskImage: `radial-gradient(circle, #000 ${connectorDotRadiusPx}px, transparent ${connectorDotRadiusPx + 0.5}px)`,
              maskSize: `${CONNECTOR_DOT_SIZE}px ${CONNECTOR_DOT_SPACING}px`,
              maskRepeat: 'repeat-y',
              maskPosition: 'center top',
            }}
          />
        )}
      </div>

      {/* Content column */}
      <div className={cn('flex-1 flex items-start justify-between relative', !isLast && 'pb-6')}>
        {!isLast && (
          <div
            className="absolute bottom-0 h-px bg-border-secondary"
            style={{
              left: 0,
              right: `-32px`,
            }}
          />
        )}
        <div className="flex-1 flex flex-col gap-0.5 items-start">
          <span className="text-sm block">
            <span className="text-primary font-medium">{customerName}</span>
            <span className="text-tertiary"> {getStatusMessage()}</span>
          </span>
          <time className="text-quaternary text-sm block">
            {formatDate(payment.processedDate)}
          </time>
        </div>

        <div
          className={cn(
            'ml-4 text-right flex flex-col gap-0.5',
            !hasSubtext && 'justify-center self-stretch'
          )}
        >
          {payment.status === 'Cleared' ? (
            <span className="text-[var(--color-utility-success-500)] text-sm font-semibold tabular-nums">
              +${payment.amount.toFixed(2)}
            </span>
          ) : payment.status === 'Failed' ? (
            <>
              <span className="text-[var(--color-utility-error-500)] text-sm font-semibold tabular-nums">
                ${payment.amount.toFixed(2)}
              </span>
              <span className="text-quaternary text-sm">5 attempts</span>
            </>
          ) : (
            <>
              <span className="text-primary text-sm font-semibold tabular-nums opacity-50">
                ${payment.amount.toFixed(2)}
              </span>
              <span className="text-quaternary text-sm">Scheduled</span>
            </>
          )}
        </div>
      </div>
    </article>
  )
}

// ============================================================================
// GRADIENT OVERLAY COMPONENT
// ============================================================================

interface GradientOverlayProps {
  isVisible: boolean
  height?: number
  intensity?: number
}

const GradientOverlay = ({ isVisible, height = 80, intensity = 100 }: GradientOverlayProps) => {
  const alpha = intensity / 100

  return (
    <div
      className={cn(
        'pointer-events-none absolute right-0 bottom-0 left-0 bg-secondary',
        'motion-safe:transition-opacity motion-safe:duration-[200ms] motion-safe:ease-[cubic-bezier(0,0,0.2,1)]',
        isVisible ? 'opacity-100' : 'opacity-0'
      )}
      style={{
        height: `${height}px`,
        maskImage: `linear-gradient(to bottom, transparent 0%, rgba(0,0,0,${alpha * 0.8}) 40%, rgba(0,0,0,${alpha}) 100%)`,
        WebkitMaskImage: `linear-gradient(to bottom, transparent 0%, rgba(0,0,0,${alpha * 0.8}) 40%, rgba(0,0,0,${alpha}) 100%)`,
      }}
      aria-hidden="true"
    />
  )
}

// ============================================================================
// ACTION BUTTON COMPONENT
// ============================================================================

interface ActionButtonProps {
  onClick: () => void
  isExpanded: boolean
  textColorClass?: string
  showIcon?: boolean
  position?: 'center' | 'left' | 'right'
  bottomOffset?: number
  showBorder?: boolean
  borderColorClass?: string
  mode?: FeedMode
}

const ActionButton = ({
  onClick,
  isExpanded,
  textColorClass = 'text-secondary',
  showIcon = true,
  position = 'center',
  bottomOffset = 4,
  showBorder = true,
  borderColorClass = 'border-primary',
  mode = 'payment',
}: ActionButtonProps) => {
  const positionClass = {
    center: 'justify-center',
    left: 'justify-start pl-4',
    right: 'justify-end pr-4',
  }[position]

  const labels = mode === 'payout'
    ? { expanded: 'Show fewer payouts', collapsed: 'Show all payouts' }
    : { expanded: 'Show fewer payments', collapsed: 'Show all payments' }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'absolute right-0 left-0 z-20 flex h-8 cursor-pointer items-center rounded-b-lg',
        'transform-gpu will-change-transform',
        'hover:opacity-80 active:opacity-60',
        'transition-opacity duration-150',
        positionClass
      )}
      style={{ bottom: `${bottomOffset}px` }}
      aria-label={isExpanded ? labels.expanded : labels.collapsed}
    >
      <span
        className={cn(
          'bg-primary/80 flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium backdrop-blur-sm',
          textColorClass,
          showBorder && 'border',
          showBorder && borderColorClass
        )}
      >
        <span className="relative grid">
          <span
            className={cn(
              'col-start-1 row-start-1 transition-opacity duration-200 ease-out',
              isExpanded ? 'opacity-100' : 'opacity-0'
            )}
            aria-hidden={!isExpanded}
          >
            Show less
          </span>
          <span
            className={cn(
              'col-start-1 row-start-1 transition-opacity duration-200 ease-out',
              isExpanded ? 'opacity-0' : 'opacity-100'
            )}
            aria-hidden={isExpanded}
          >
            See all
          </span>
        </span>

        {showIcon && (
          <svg
            className={cn(
              'size-3 shrink-0 transition-transform duration-200 ease-out',
              isExpanded && 'rotate-180'
            )}
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
    </button>
  )
}

// ============================================================================
// PAYMENT ACTIVITY FEED (V2 - Componentized)
// ============================================================================

interface PaymentActivityFeedProps {
  payments: PaymentRecord[]
  customerName: string
  title?: string
  collapsedItemCount?: number
  gradientHeight?: number
  gradientIntensity?: number
  mode?: FeedMode
}

export const PaymentActivityFeed = ({
  payments,
  customerName,
  title = 'Payment Activity',
  collapsedItemCount = 3,
  gradientHeight = 80,
  gradientIntensity = 100,
  mode = 'payment',
}: PaymentActivityFeedProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const contentRef = useRef<HTMLUListElement>(null)
  const [contentHeight, setContentHeight] = useState<number | null>(null)

  const outerPadding = 4
  const outerBorderRadius = 24
  const innerPadding = 32

  const shouldShowSeeMore = payments.length > collapsedItemCount

  useEffect(() => {
    if (contentRef.current) {
      const measureHeight = () => {
        if (contentRef.current) {
          const height = contentRef.current.scrollHeight
          setContentHeight(height)
        }
      }

      const timeoutId = setTimeout(measureHeight, 0)
      measureHeight()

      const observer = new ResizeObserver(() => {
        measureHeight()
      })
      observer.observe(contentRef.current)

      return () => {
        clearTimeout(timeoutId)
        observer.disconnect()
      }
    }
  }, [payments.length])

  useEffect(() => {
    if (isExpanded && contentRef.current) {
      const timeoutId = setTimeout(() => {
        if (contentRef.current) {
          setContentHeight(contentRef.current.scrollHeight)
        }
      }, 10)
      return () => clearTimeout(timeoutId)
    }
  }, [isExpanded])

  const getCollapsedHeight = () => {
    if (!shouldShowSeeMore) return 0
    const itemHeight = 66
    const itemSpacing = 24
    const firstItemHeight = itemHeight
    const additionalItemsHeight = (collapsedItemCount - 1) * (itemHeight + itemSpacing)
    const baseHeight = firstItemHeight + additionalItemsHeight
    return Math.round(baseHeight * 1.5)
  }

  const containerHeight = isExpanded
    ? contentHeight !== null
      ? contentHeight
      : undefined
    : shouldShowSeeMore
      ? getCollapsedHeight()
      : contentHeight !== null
        ? contentHeight
        : undefined

  const handleToggleExpand = () => {
    setIsExpanded((prev) => !prev)
  }

  return (
    <div
      className={cn(
        'mb-8',
        'bg-secondary',
        'rounded-[20px]'
      )}
      style={{
        padding: `${innerPadding}px`,
        borderRadius: `${outerBorderRadius - outerPadding}px`,
      }}
    >
      <div className="relative min-h-0">
        <div
          data-expanded={isExpanded}
          className={cn(
            'relative overflow-hidden',
            shouldShowSeeMore &&
              'motion-safe:transition-[height] motion-safe:duration-[200ms] motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)]',
            'motion-reduce:transition-none'
          )}
          style={{
            ...(containerHeight !== undefined && {
              height: `${containerHeight}px`,
            }),
          }}
        >
          <ul
            ref={contentRef}
            className="space-y-0"
          >
          {payments.map((payment, index) => {
            return (
              <li key={payment.id} className={index > 0 ? 'pt-6' : ''}>
                <PaymentActivityFeedItem
                  payment={payment}
                  customerName={customerName}
                  isLast={index === payments.length - 1}
                  mode={mode}
                />
              </li>
            )
          })}
          </ul>
        </div>

        {shouldShowSeeMore && (
          <GradientOverlay
            isVisible={!isExpanded}
            height={gradientHeight}
            intensity={gradientIntensity}
          />
        )}

        {shouldShowSeeMore && (
          <ActionButton
            onClick={handleToggleExpand}
            isExpanded={isExpanded}
            textColorClass="text-secondary"
            showIcon={true}
            position="center"
            bottomOffset={4}
            showBorder={true}
            borderColorClass="border-primary"
            mode={mode}
          />
        )}
      </div>
    </div>
  )
}
