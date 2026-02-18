/**
 * FloatingNav
 *
 * Minimalist floating navigation with dropdown menu.
 * - Top left on all pages
 * - Full page navigation with Menu component
 */

'use client'

import type { ComponentType } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import { Menu } from '@/components/ui/core/primitives/menu'
import type { MenuItemType, MenuItemAction, MenuItemSubmenu } from '@/components/ui/core/primitives/menu'
import {
  Home01Icon,
  Menu01Icon,
  Table01Icon,
  LayersIcon,
} from '@hugeicons-pro/core-stroke-rounded'

// =============================================================================
// TYPES
// =============================================================================

type IconComponent = ComponentType<{ className?: string }>

interface FloatingNavProps {
  className?: string
}

// =============================================================================
// CONSTANTS
// =============================================================================

// Navigation menu items with submenus
const createNavMenuItems = (router: ReturnType<typeof useRouter>): MenuItemType[] => [
  {
    id: 'stuff',
    type: 'submenu',
    label: 'Stuff',
    icon: LayersIcon as unknown as IconComponent,
    items: [
      {
        id: 'nav-stack',
        label: 'Nav Stack',
        icon: LayersIcon as unknown as IconComponent,
        onClick: () => router.push('/nav-stack'),
      } as MenuItemAction,
      {
        id: 'magnet',
        label: 'Magnet',
        icon: Home01Icon as unknown as IconComponent,
        onClick: () => router.push('/magnet'),
      } as MenuItemAction,
      {
        id: 'table',
        label: 'Table',
        icon: Table01Icon as unknown as IconComponent,
        onClick: () => router.push('/table'),
      } as MenuItemAction,
    ],
  } as MenuItemSubmenu,
]

// =============================================================================
// COMPONENT
// =============================================================================

export function FloatingNav({ className = '' }: FloatingNavProps) {
  const router = useRouter()
  const pathname = usePathname()

  // Only show on home page
  if (pathname !== '/') {
    return null
  }

  // Create menu items with router
  const menuItems = createNavMenuItems(router)

  return (
    <nav
      className={`
        fixed left-4 top-4 z-50
        ${className}
      `}
    >
      <Menu
        items={menuItems}
        trigger={
          <button
            className="flex items-center justify-center rounded-full border border-primary bg-secondary p-2 backdrop-blur-xl shadow-lg shadow-black/10 text-secondary hover:text-primary hover:bg-tertiary transition-colors"
            title="Navigate"
          >
            <HugeIcon icon={Menu01Icon} size={18} />
          </button>
        }
        side="bottom"
        align="start"
        width={200}
        appearance={{
          borderRadius: 'xl',
          shadow: 'lg',
          background: 'secondary',
        }}
      />
    </nav>
  )
}

export default FloatingNav
