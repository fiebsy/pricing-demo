'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import Copy01Icon from '@hugeicons-pro/core-stroke-rounded/Copy01Icon'

// ============================================================================
// TYPES
// ============================================================================

type InfoCardVariant = 'minimal' | 'colon' | 'parenthetical' | 'natural'

interface InfoCardProps {
  orderId: string
  product: string
  route: string
  term: number
  listPrice: number
  customerName: string
  customerEmail: string
  customerPhone: string
  purchaseDate: string
  customerPrice: number
  paidIn: number
  paymentProgress: number
  variant?: InfoCardVariant
  className?: string
}

// ============================================================================
// HELPER COMPONENTS
// ============================================================================

interface InfoItemProps {
  text: string
  isBold?: boolean
  onCopy?: () => void
  showCopyIcon?: boolean
}

const InfoItem = ({ text, isBold, onCopy, showCopyIcon }: InfoItemProps) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (onCopy) {
      onCopy()
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <p className={cn('text-base', isBold ? 'text-primary font-medium' : 'text-tertiary')}>{text}</p>
      {showCopyIcon && (
        <button
          onClick={handleCopy}
          className="text-quaternary hover:text-secondary transition-colors cursor-pointer"
          aria-label={`Copy`}
        >
          <HugeIcon icon={Copy01Icon} size={14} className={copied ? 'text-success-primary' : ''} />
        </button>
      )}
    </div>
  )
}

interface SectionProps {
  title: string
  children: React.ReactNode
  showDivider?: boolean
}

const Section = ({ title, children, showDivider = true }: SectionProps) => (
  <>
    {showDivider && <div className="hidden sm:block border-t border-secondary" />}

    <div className={cn('pb-12 sm:pb-8', showDivider && 'sm:pt-8')}>
      <div className="sm:hidden">
        <h3 className="text-xl font-medium text-primary">{title}</h3>
        <div className="border-t border-secondary mt-2 mb-4" />
      </div>

      <div className="hidden sm:grid sm:grid-cols-[140px_1fr] sm:gap-8">
        <div>
          <h3 className="text-xl font-medium text-primary">{title}</h3>
        </div>
        <div className="flex flex-col gap-2">
          {children}
        </div>
      </div>

      <div className="sm:hidden flex flex-col gap-2">
        {children}
      </div>
    </div>
  </>
)

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const InfoCard = ({
  orderId,
  product,
  route,
  term,
  listPrice,
  customerName,
  customerEmail,
  customerPhone,
  purchaseDate,
  customerPrice,
  paidIn,
  paymentProgress,
  variant = 'minimal',
  className,
}: InfoCardProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount)
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  }

  const getEndDate = (startDateStr: string, months: number) => {
    const date = new Date(startDateStr)
    date.setMonth(date.getMonth() + months)
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const remaining = customerPrice - paidIn

  const getRouteContext = (routeType: string) => {
    if (routeType === 'Upfront') return 'partner paid upfront'
    if (routeType === 'PAC') return 'pay-as-collected'
    return ''
  }

  // MINIMAL VARIANT
  if (variant === 'minimal') {
    return (
      <div className={cn('bg-primary rounded-xl overflow-hidden', className)}>
        <Section title="Customer" showDivider={false}>
          <InfoItem text={customerName} isBold />
          <InfoItem text={customerEmail} showCopyIcon onCopy={() => copyToClipboard(customerEmail)} />
          <InfoItem text={customerPhone} showCopyIcon onCopy={() => copyToClipboard(customerPhone)} />
        </Section>

        <Section title="Product">
          <InfoItem text={product} isBold />
          <InfoItem text={`${formatCurrency(listPrice)} list price`} />
        </Section>

        <Section title="Plan">
          <InfoItem text={`Order #${orderId}`} isBold />
          <InfoItem text={`${route} route`} />
          <InfoItem text={`${term} months`} />
          <InfoItem text={`${formatDate(purchaseDate)} – ${getEndDate(purchaseDate, term)}`} />
        </Section>

        <Section title="Balance">
          <InfoItem text={`${formatCurrency(paidIn)} of ${formatCurrency(customerPrice)}`} isBold />
          <InfoItem text={`${formatCurrency(remaining)} remaining`} />
          <InfoItem text={`${paymentProgress}% complete`} />
        </Section>
      </div>
    )
  }

  // COLON VARIANT
  if (variant === 'colon') {
    return (
      <div className={cn('bg-primary rounded-xl overflow-hidden', className)}>
        <Section title="Customer" showDivider={false}>
          <InfoItem text={customerName} isBold />
          <InfoItem text={customerEmail} showCopyIcon onCopy={() => copyToClipboard(customerEmail)} />
          <InfoItem text={customerPhone} showCopyIcon onCopy={() => copyToClipboard(customerPhone)} />
        </Section>

        <Section title="Product">
          <InfoItem text={product} isBold />
          <InfoItem text={`${formatCurrency(listPrice)}: list price`} />
        </Section>

        <Section title="Plan">
          <InfoItem text={`Order #${orderId}`} isBold />
          <InfoItem text={`${route}: ${getRouteContext(route)}`} />
          <InfoItem text={`${term} months: payment term`} />
          <InfoItem text={`${formatDate(purchaseDate)}: purchase date`} />
        </Section>

        <Section title="Balance">
          <InfoItem text={`${formatCurrency(customerPrice)}: total owed`} isBold />
          <InfoItem text={`${formatCurrency(paidIn)}: paid to date`} />
          <InfoItem text={`${formatCurrency(remaining)}: remaining`} />
          <InfoItem text={`${paymentProgress}%: complete`} />
        </Section>
      </div>
    )
  }

  // PARENTHETICAL VARIANT
  if (variant === 'parenthetical') {
    return (
      <div className={cn('bg-primary rounded-xl overflow-hidden', className)}>
        <Section title="Customer" showDivider={false}>
          <InfoItem text={customerName} isBold />
          <InfoItem text={customerEmail} showCopyIcon onCopy={() => copyToClipboard(customerEmail)} />
          <InfoItem text={customerPhone} showCopyIcon onCopy={() => copyToClipboard(customerPhone)} />
        </Section>

        <Section title="Product">
          <InfoItem text={product} isBold />
          <InfoItem text={`${formatCurrency(listPrice)} (list price)`} />
        </Section>

        <Section title="Plan">
          <InfoItem text={`Order #${orderId}`} isBold />
          <InfoItem text={`${route} (${getRouteContext(route)})`} />
          <InfoItem text={`${term} months (payment term)`} />
          <InfoItem text={`${formatDate(purchaseDate)} (purchase date)`} />
        </Section>

        <Section title="Balance">
          <InfoItem text={`${formatCurrency(customerPrice)} (total owed)`} isBold />
          <InfoItem text={`${formatCurrency(paidIn)} (paid to date)`} />
          <InfoItem text={`${formatCurrency(remaining)} (remaining)`} />
          <InfoItem text={`${paymentProgress}% (complete)`} />
        </Section>
      </div>
    )
  }

  // NATURAL VARIANT (default)
  return (
    <div className={cn('bg-primary rounded-xl overflow-hidden', className)}>
      <Section title="Customer" showDivider={false}>
        <InfoItem text={customerName} isBold />
        <InfoItem text={customerEmail} showCopyIcon onCopy={() => copyToClipboard(customerEmail)} />
        <InfoItem text={customerPhone} showCopyIcon onCopy={() => copyToClipboard(customerPhone)} />
      </Section>

      <Section title="Product">
        <InfoItem text={product} isBold />
        <InfoItem text={`List price of ${formatCurrency(listPrice)}`} />
      </Section>

      <Section title="Plan">
        <InfoItem text={`Order #${orderId}`} isBold />
        <InfoItem text={`${route} route where ${getRouteContext(route)}`} />
        <InfoItem text={`${term} month payment term`} />
        <InfoItem text={`Purchased on ${formatDate(purchaseDate)}`} />
      </Section>

      <Section title="Balance">
        <InfoItem text={`${formatCurrency(customerPrice)} total owed`} isBold />
        <InfoItem text={`${formatCurrency(paidIn)} paid to date`} />
        <InfoItem text={`${formatCurrency(remaining)} remaining balance`} />
        <InfoItem text={`${paymentProgress}% complete`} />
      </Section>
    </div>
  )
}
