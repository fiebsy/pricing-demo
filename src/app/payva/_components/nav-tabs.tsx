'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const tabs = [
  { label: 'Overview', href: '/payva/overview' },
  { label: 'Orders', href: '/payva/orders' },
  { label: 'Payouts', href: '/payva/payouts' },
  { label: 'Risk', href: '/payva/risk' },
  { label: 'Products', href: '/payva/products' },
]

export function NavTabs() {
  const pathname = usePathname()

  return (
    <nav className="flex gap-1 px-6">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              'relative px-3 py-2.5 text-sm font-medium transition-colors',
              isActive
                ? 'text-primary'
                : 'text-tertiary hover:text-secondary'
            )}
          >
            {tab.label}
            {isActive && (
              <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-brand-solid" />
            )}
          </Link>
        )
      })}
    </nav>
  )
}
