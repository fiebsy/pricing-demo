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

// Flat navigation items (for flat mode)
const flatTabs = [
  { label: 'Overview', href: '/payva/overview' },
  { label: 'Orders', href: '/payva/orders' },
  { label: 'Payouts', href: '/payva/payouts' },
  { label: 'Risk', href: '/payva/risk' },
  { label: 'Products', href: '/payva/products' },
]

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
    showOverviewNav,
    showLogoImage,
    logoImageSize,
    logoImageRadius,
    logoImageSquircle,
    contentMaxWidth,
    navMatchContent,
  } = config

  const isInline = navLayout === 'inline'
  const isGrouped = navMode === 'grouped'

  // Render flat navigation tabs
  const renderFlatTabs = () => (
    <nav className="flex gap-1">
      {flatTabs.map((tab) => {
        const isActive = pathname === tab.href
        const color = isActive ? navItemActiveColor : navItemColor
        const opacity = isActive ? navItemActiveOpacity : navItemOpacity

        return (
          <Link
            key={tab.href}
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

  // Render grouped navigation (Overview + Money dropdown + Products)
  const renderGroupedNav = () => {
    const isOverviewActive = pathname === '/payva/overview'
    const isProductsActive = pathname === '/payva/products'
    const overviewColor = isOverviewActive ? navItemActiveColor : navItemColor
    const overviewOpacity = isOverviewActive ? navItemActiveOpacity : navItemOpacity
    const productsColor = isProductsActive ? navItemActiveColor : navItemColor
    const productsOpacity = isProductsActive ? navItemActiveOpacity : navItemOpacity

    return (
      <nav className="flex items-center gap-1">
        {/* Overview - standalone (hidden by default) */}
        {showOverviewNav && (
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

        {/* Money section with dropdown */}
        <SectionDropdown section={moneySection} config={config} />

        {/* Products - standalone */}
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
