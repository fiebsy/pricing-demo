'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { SearchBar } from './search-bar'
import { UserMenu } from './user-menu'
import { SectionDropdown } from './section-dropdown'
import {
  type NavConfig,
  type NavTextStyle,
  type TextSize,
  type FontWeight,
  type TextColor,
  navigationStructure,
  moneySection,
  productsItem,
} from './nav-config'

// Navigation item definitions (visibility controlled by config)
interface NavTabDef {
  id: string
  label: string
  href: string
}

const NAV_TABS: NavTabDef[] = [
  { id: 'overview', label: 'Overview', href: '/payva/overview' },
  { id: 'sales', label: 'Sales', href: '/payva/sales' },
  { id: 'orders', label: 'Orders', href: '/payva/orders' },
  { id: 'products', label: 'Products', href: '/payva/products' },
  { id: 'payouts', label: 'Payouts', href: '/payva/payouts' },
  { id: 'payments', label: 'Payments', href: '/payva/payments' },
  { id: 'collections', label: 'Collections', href: '/payva/collections' },
  { id: 'risk', label: 'Risk', href: '/payva/risk' },
  { id: 'documents', label: 'Documents', href: '/payva/documents' },
  { id: 'team', label: 'Team', href: '/payva/team' },
  { id: 'agreements', label: 'Agreements', href: '/payva/agreements' },
  { id: 'webhooks', label: 'Webhooks', href: '/payva/webhooks' },
]

// Visibility flag mapping
type NavVisibilityKey =
  | 'showOverviewNav'
  | 'showSales'
  | 'showOrders'
  | 'showProducts'
  | 'showPayouts'
  | 'showPayments'
  | 'showCollections'
  | 'showRisk'
  | 'showDocuments'
  | 'showTeam'
  | 'showAgreements'
  | 'showWebhooks'

const NAV_VISIBILITY_MAP: Record<string, NavVisibilityKey> = {
  overview: 'showOverviewNav',
  sales: 'showSales',
  orders: 'showOrders',
  products: 'showProducts',
  payouts: 'showPayouts',
  payments: 'showPayments',
  collections: 'showCollections',
  risk: 'showRisk',
  documents: 'showDocuments',
  team: 'showTeam',
  agreements: 'showAgreements',
  webhooks: 'showWebhooks',
}

// Text style utilities
const TEXT_SIZE_CLASSES = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
} as const

const FONT_WEIGHT_CLASSES = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
} as const

const TEXT_COLOR_CLASSES = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  tertiary: 'text-tertiary',
  quaternary: 'text-quaternary',
  brand: 'text-fg-brand-primary',
} as const

function getTextStyleClasses(style: NavTextStyle): string {
  return cn(
    TEXT_SIZE_CLASSES[style.size],
    FONT_WEIGHT_CLASSES[style.weight],
    TEXT_COLOR_CLASSES[style.color]
  )
}

function getTextOpacityStyle(style: NavTextStyle): React.CSSProperties {
  return style.opacity < 100 ? { opacity: style.opacity / 100 } : {}
}

// Helper for flattened nav item styles
function getNavItemClasses(
  size: TextSize,
  weight: FontWeight,
  color: TextColor
): string {
  return cn(
    TEXT_SIZE_CLASSES[size],
    FONT_WEIGHT_CLASSES[weight],
    TEXT_COLOR_CLASSES[color]
  )
}

function getOpacityStyle(opacity: number): React.CSSProperties {
  return opacity < 100 ? { opacity: opacity / 100 } : {}
}

// Logo image utilities
const LOGO_SIZE_CLASSES = {
  xs: 'size-5',
  sm: 'size-6',
  md: 'size-8',
  lg: 'size-10',
} as const

const LOGO_RADIUS_CLASSES = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
} as const

interface ExperimentalNavProps {
  config: NavConfig
}

export function ExperimentalNav({ config }: ExperimentalNavProps) {
  const pathname = usePathname()
  const {
    navLayout,
    showBorder,
    navHeight,
    logoNavGap,
    searchPosition,
    navMode,
    logoText,
    navItemSize,
    navItemWeight,
    navItemColor,
    navItemOpacity,
    navItemActiveColor,
    navItemActiveOpacity,
    showNavItemHoverBackground,
    showNavItemActiveBackground,
    showLogoImage,
    logoImageSize,
    logoImageRadius,
    logoImageSquircle,
    contentMaxWidth,
    navMatchContent,
    // Custom nav items
    customNavItems,
  } = config

  const isInline = navLayout === 'inline'
  const isGrouped = navMode === 'grouped'

  // Build visible tabs based on config, respecting navItemOrder
  const getVisibleTabs = () => {
    const tabs: NavTabDef[] = []
    const { navItemOrder } = config

    // Add built-in tabs in the order specified by navItemOrder
    for (const itemId of navItemOrder) {
      const visibilityKey = NAV_VISIBILITY_MAP[itemId]
      if (visibilityKey && config[visibilityKey]) {
        const tabDef = NAV_TABS.find((t) => t.id === itemId)
        if (tabDef) {
          tabs.push(tabDef)
        }
      }
    }

    // Add visible custom items
    for (const item of customNavItems) {
      if (item.visible) {
        tabs.push({ id: item.id, label: item.label, href: '#' })
      }
    }

    return tabs
  }

  const visibleTabs = getVisibleTabs()

  // Render flat navigation tabs
  const renderFlatTabs = () => {
    return (
      <nav className="flex gap-1">
        {visibleTabs.map((tab) => {
          const isActive = pathname === tab.href
          const color = isActive ? navItemActiveColor : navItemColor
          const opacity = isActive ? navItemActiveOpacity : navItemOpacity

          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={cn(
                'relative px-3 py-2 transition-colors rounded-lg',
                getNavItemClasses(navItemSize, navItemWeight, color),
                isActive && showNavItemActiveBackground && 'bg-secondary',
                !isActive && showNavItemHoverBackground && 'hover:bg-secondary/50'
              )}
              style={getOpacityStyle(opacity)}
            >
              {tab.label}
            </Link>
          )
        })}
      </nav>
    )
  }

  // Render grouped navigation (Overview + Money dropdown + Products)
  const renderGroupedNav = () => {
    // Money dropdown items (items that go inside the dropdown - exclude overview, products, custom)
    const moneyItems = visibleTabs.filter(
      (tab) =>
        tab.id !== 'overview' &&
        tab.id !== 'products' &&
        tab.id !== 'custom'
    )

    // Build dynamic money section for dropdown
    const dynamicMoneySection = {
      ...moneySection,
      items: moneyItems.map((tab) => ({
        id: tab.id,
        label: tab.label,
        href: tab.href,
      })),
    }

    // Check visibility for standalone items
    const showOverview = visibleTabs.some((t) => t.id === 'overview')
    const showProducts = visibleTabs.some((t) => t.id === 'products')
    const customTab = visibleTabs.find((t) => t.id === 'custom')

    const isOverviewActive = pathname === '/payva/overview'
    const isProductsActive = pathname === '/payva/products'
    const overviewColor = isOverviewActive ? navItemActiveColor : navItemColor
    const overviewOpacity = isOverviewActive ? navItemActiveOpacity : navItemOpacity
    const productsColor = isProductsActive ? navItemActiveColor : navItemColor
    const productsOpacity = isProductsActive ? navItemActiveOpacity : navItemOpacity

    return (
      <nav className="flex items-center gap-1">
        {/* Overview - standalone (if visible) */}
        {showOverview && (
          <Link
            href="/payva/overview"
            className={cn(
              'px-3 py-2 transition-colors rounded-lg',
              getNavItemClasses(navItemSize, navItemWeight, overviewColor),
              isOverviewActive && showNavItemActiveBackground && 'bg-secondary',
              !isOverviewActive && showNavItemHoverBackground && 'hover:bg-secondary/50'
            )}
            style={getOpacityStyle(overviewOpacity)}
          >
            Overview
          </Link>
        )}

        {/* Money section with dropdown (only show if there are items) */}
        {moneyItems.length > 0 && (
          <SectionDropdown section={dynamicMoneySection} config={config} />
        )}

        {/* Products - standalone (if visible) */}
        {showProducts && (
          <Link
            href="/payva/products"
            className={cn(
              'px-3 py-2 transition-colors rounded-lg',
              getNavItemClasses(navItemSize, navItemWeight, productsColor),
              isProductsActive && showNavItemActiveBackground && 'bg-secondary',
              !isProductsActive && showNavItemHoverBackground && 'hover:bg-secondary/50'
            )}
            style={getOpacityStyle(productsOpacity)}
          >
            Products
          </Link>
        )}

        {/* Custom - standalone (if visible) */}
        {customTab && (
          <Link
            href={customTab.href}
            className={cn(
              'px-3 py-2 transition-colors rounded-lg',
              getNavItemClasses(navItemSize, navItemWeight, navItemColor)
            )}
            style={getOpacityStyle(navItemOpacity)}
          >
            {customTab.label}
          </Link>
        )}
      </nav>
    )
  }

  // Render search based on position
  const renderSearch = () => {
    if (searchPosition === 'hidden') return null
    return <SearchBar />
  }

  // Logo component
  const renderLogo = () => (
    <Link href="/payva/overview" className="flex items-center gap-3">
      {showLogoImage && (
        <img
          src="/origins/dragon-ball.jpg"
          alt="Karate Mentors logo"
          className={cn(
            'object-cover',
            LOGO_SIZE_CLASSES[logoImageSize],
            LOGO_RADIUS_CLASSES[logoImageRadius],
            logoImageSquircle && 'corner-squircle'
          )}
        />
      )}
      <span className={getTextStyleClasses(logoText)} style={getTextOpacityStyle(logoText)}>Karate Mentors</span>
    </Link>
  )

  // Inline layout - everything in one row
  if (isInline) {
    const constrainNav = navMatchContent && contentMaxWidth !== 9999

    return (
      <header className={cn(
        'sticky top-0 z-50 bg-primary',
        showBorder && 'border-b border-primary'
      )}>
        <div
          className={cn(
            'flex items-center justify-between',
            constrainNav ? 'mx-auto' : 'px-6'
          )}
          style={{
            height: navHeight,
            maxWidth: constrainNav ? contentMaxWidth : undefined,
          }}
        >
          {/* Left: Logo + Nav */}
          <div className="flex items-center gap-4">
            {renderLogo()}

            {/* Navigation */}
            <div className="ml-4">
              {isGrouped ? renderGroupedNav() : renderFlatTabs()}
            </div>
          </div>

          {/* Center: Search (when centered) */}
          {searchPosition === 'center' && (
            <div className="absolute left-1/2 -translate-x-1/2">
              {renderSearch()}
            </div>
          )}

          {/* Right: Search (when right) + User */}
          <div className="flex items-center gap-4">
            {searchPosition === 'right' && renderSearch()}
            <UserMenu />
          </div>
        </div>
      </header>
    )
  }

  // Stacked layout - two rows (original layout)
  const constrainNav = navMatchContent && contentMaxWidth !== 9999

  return (
    <header className={cn(
      'sticky top-0 z-50 bg-primary',
      showBorder && 'border-b border-primary'
    )}>
      {/* Brand Row */}
      <div
        className={cn(
          'relative flex items-center justify-between',
          constrainNav ? 'mx-auto' : 'px-6'
        )}
        style={{
          height: navHeight,
          maxWidth: constrainNav ? contentMaxWidth : undefined,
        }}
      >
        {renderLogo()}

        {/* Center: Search (when centered) */}
        {searchPosition === 'center' && (
          <div className="absolute left-1/2 -translate-x-1/2">
            {renderSearch()}
          </div>
        )}

        {/* Right: Search (when right) + Avatar */}
        <div className="flex items-center gap-4">
          {searchPosition === 'right' && renderSearch()}
          <UserMenu />
        </div>
      </div>

      {/* Tabs Row */}
      <div
        className={cn(
          'pb-1',
          constrainNav ? 'mx-auto' : 'px-6'
        )}
        style={{
          paddingTop: logoNavGap,
          maxWidth: constrainNav ? contentMaxWidth : undefined,
        }}
      >
        {/* Negative margin aligns first nav item text with logo */}
        <div className="-ml-3">
          {isGrouped ? renderGroupedNav() : renderFlatTabs()}
        </div>
      </div>
    </header>
  )
}
