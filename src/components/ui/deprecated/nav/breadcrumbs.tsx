/**
 * Breadcrumbs
 *
 * Minimalist breadcrumb navigation for sub-pages.
 * Displays a simple path with separator.
 */

'use client'

import Link from 'next/link'

// =============================================================================
// TYPES
// =============================================================================

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

// =============================================================================
// COMPONENT
// =============================================================================

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  if (items.length === 0) return null

  return (
    <nav className={`flex items-center gap-2 text-sm ${className}`}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1

        return (
          <span key={index} className="flex items-center gap-2">
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="text-gray-500 hover:text-gray-300 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? 'text-gray-300 font-medium' : 'text-gray-500'}>
                {item.label}
              </span>
            )}
            {!isLast && (
              <span className="text-gray-600">/</span>
            )}
          </span>
        )
      })}
    </nav>
  )
}

export default Breadcrumbs
