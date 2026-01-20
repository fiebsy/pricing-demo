/**
 * FloatingNav
 *
 * Minimalist floating navigation bar with sliding toggle indicator.
 * - Top center on desktop (md+)
 * - Bottom center on mobile
 * - Same component for both layouts
 */

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import {
  Home01Icon,
  AnalyticsUpIcon,
} from '@hugeicons-pro/core-stroke-rounded'

// =============================================================================
// TYPES
// =============================================================================

interface NavItem {
  id: string
  label: string
  href: string
  icon: typeof Home01Icon
}

interface FloatingNavProps {
  className?: string
}

// =============================================================================
// CONSTANTS
// =============================================================================

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', href: '/', icon: Home01Icon },
  { id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: AnalyticsUpIcon },
]

const ITEM_SIZE = 34 // p-2 (8px * 2) + icon 18px = 34px

// =============================================================================
// COMPONENT
// =============================================================================

export function FloatingNav({ className = '' }: FloatingNavProps) {
  const pathname = usePathname()

  // Hide nav entirely on /a/ routes
  const isHiddenRoute = pathname.startsWith('/a')

  // Check if current path matches nav item (exact or starts with for nested routes)
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  // Get active index for slider position (-1 if no match)
  const activeIndex = NAV_ITEMS.findIndex((item) => isActive(item.href))

  // Don't render on hidden routes
  if (isHiddenRoute) return null

  return (
    <nav
      className={`
        fixed right-4 top-4 z-50
        ${className}
      `}
    >
      <div className="relative flex items-center rounded-full border border-primary bg-secondary p-1 backdrop-blur-xl shadow-lg shadow-black/10">
        {/* Sliding indicator - only show when a nav item is active */}
        {activeIndex >= 0 && (
          <div
            className="absolute top-1 bottom-1 rounded-full bg-quaternary transition-transform duration-300 ease-out"
            style={{
              width: ITEM_SIZE,
              transform: `translateX(${activeIndex * ITEM_SIZE}px)`,
            }}
          />
        )}

        {/* Nav items */}
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href)

          return (
            <Link
              key={item.id}
              href={item.href}
              title={item.label}
              className={`
                relative z-10 flex items-center justify-center rounded-full p-2
                transition-colors duration-200
                ${active ? 'text-primary' : 'text-quaternary hover:text-secondary'}
              `}
            >
              <HugeIcon icon={item.icon} size={18} />
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default FloatingNav
