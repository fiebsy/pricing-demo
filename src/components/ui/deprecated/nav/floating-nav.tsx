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
  AnalyticsUpIcon,
  Menu01Icon,
  GridIcon,
  ImageIcon,
  UserIcon,
  FilterIcon,
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
    id: 'main',
    type: 'submenu',
    label: 'Main',
    icon: Home01Icon as unknown as IconComponent,
    items: [
      {
        id: 'home',
        label: 'Home',
        icon: Home01Icon as unknown as IconComponent,
        onClick: () => router.push('/'),
      } as MenuItemAction,
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: AnalyticsUpIcon as unknown as IconComponent,
        onClick: () => router.push('/dashboard'),
      } as MenuItemAction,
      {
        id: 'studio',
        label: 'Studio',
        icon: GridIcon as unknown as IconComponent,
        onClick: () => router.push('/studio'),
      } as MenuItemAction,
      {
        id: 'carousel',
        label: 'Carousel',
        icon: ImageIcon as unknown as IconComponent,
        onClick: () => router.push('/carousel'),
      } as MenuItemAction,
    ],
  } as MenuItemSubmenu,
  {
    id: 'playground',
    type: 'submenu',
    label: 'Playground',
    icon: LayersIcon as unknown as IconComponent,
    items: [
      {
        id: 'filter-chip-motion',
        label: 'Filter Chip Motion',
        icon: FilterIcon as unknown as IconComponent,
        onClick: () => router.push('/playground/archived/filter-chip-motion'),
      } as MenuItemAction,
      {
        id: 'sticky-data-table',
        label: 'Sticky Data Table',
        icon: Table01Icon as unknown as IconComponent,
        onClick: () => router.push('/playground/archived/sticky-data-table'),
      } as MenuItemAction,
    ],
  } as MenuItemSubmenu,
  {
    id: 'profiles',
    type: 'submenu',
    label: 'Profiles',
    icon: UserIcon as unknown as IconComponent,
    items: [
      {
        id: 'profile-playground',
        label: 'Profile Playground',
        icon: UserIcon as unknown as IconComponent,
        onClick: () => router.push('/a/playground'),
      } as MenuItemAction,
      {
        id: 'profile-mock',
        label: 'Profile Mock',
        icon: UserIcon as unknown as IconComponent,
        onClick: () => router.push('/a/mock'),
      } as MenuItemAction,
    ],
  } as MenuItemSubmenu,
  { id: 'sep-1', type: 'separator' },
  {
    id: 'hidden',
    type: 'submenu',
    label: 'Hidden',
    icon: LayersIcon as unknown as IconComponent,
    items: [
      {
        id: 'skwircle-demo',
        label: 'Skwircle Demo',
        icon: GridIcon as unknown as IconComponent,
        onClick: () => router.push('/_hidden/playground/skwircle-demo'),
      } as MenuItemAction,
      {
        id: 'skwircle-card',
        label: 'Skwircle Card',
        icon: GridIcon as unknown as IconComponent,
        onClick: () => router.push('/_hidden/playground/skwircle-card'),
      } as MenuItemAction,
      {
        id: 'hidden-sticky-table',
        label: 'Sticky Table (Dev)',
        icon: Table01Icon as unknown as IconComponent,
        onClick: () => router.push('/_hidden/playground/sticky-data-table'),
      } as MenuItemAction,
      {
        id: 'feed',
        label: 'Feed',
        icon: GridIcon as unknown as IconComponent,
        onClick: () => router.push('/_hidden/feed'),
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
