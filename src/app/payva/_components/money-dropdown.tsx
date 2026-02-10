'use client'

import { useRouter, usePathname } from 'next/navigation'
import { Menu } from '@/components/ui/core/primitives/menu'
import type { MenuItemAction } from '@/components/ui/core/primitives/menu'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import ArrowDown01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowDown01Icon'
import Invoice01Icon from '@hugeicons-pro/core-stroke-rounded/Invoice01Icon'
import MoneyReceiveCircleIcon from '@hugeicons-pro/core-stroke-rounded/MoneyReceiveCircleIcon'
import Alert02Icon from '@hugeicons-pro/core-stroke-rounded/Alert02Icon'
import { cn } from '@/lib/utils'
import type { NavConfig, NavTextStyle, TextSize, FontWeight, TextColor } from './nav-config'

const moneyItems: MenuItemAction[] = [
  {
    id: 'orders',
    label: 'Orders',
    icon: Invoice01Icon,
  },
  {
    id: 'payouts',
    label: 'Payouts',
    icon: MoneyReceiveCircleIcon,
  },
  {
    id: 'risk',
    label: 'Risk',
    icon: Alert02Icon,
  },
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

const ICON_SIZE_MAP = {
  sm: 12,
  md: 14,
  lg: 16,
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

interface MoneyDropdownProps {
  config: NavConfig
}

export function MoneyDropdown({ config }: MoneyDropdownProps) {
  const router = useRouter()
  const pathname = usePathname()

  const {
    navItemSize,
    navItemWeight,
    navItemColor,
    navItemOpacity,
    navItemActiveColor,
    navItemActiveOpacity,
    showDropdownIcon,
    dropdownIconSize,
  } = config

  const isMoneyActive = ['/payva/orders', '/payva/payouts', '/payva/risk'].some(
    (path) => pathname === path
  )

  const color = isMoneyActive ? navItemActiveColor : navItemColor
  const opacity = isMoneyActive ? navItemActiveOpacity : navItemOpacity
  const iconSize = ICON_SIZE_MAP[dropdownIconSize]

  const handleSelect = (item: MenuItemAction) => {
    router.push(`/payva/${item.id}`)
  }

  return (
    <Menu
      items={moneyItems}
      onSelect={handleSelect}
      side="bottom"
      align="start"
      sideOffset={8}
      width={180}
      appearance={{
        borderRadius: 'lg',
        shadow: 'lg',
        background: 'secondary',
        squircle: true,
      }}
      trigger={
        <button
          type="button"
          className={cn(
            'flex items-center gap-1 px-3 py-2 transition-colors',
            'rounded-lg',
            getNavItemClasses(navItemSize, navItemWeight, color),
            isMoneyActive && 'bg-secondary',
            !isMoneyActive && 'hover:bg-secondary/50'
          )}
          style={getOpacityStyle(opacity)}
        >
          <span>Money</span>
          {showDropdownIcon && (
            <HugeIcon
              icon={ArrowDown01Icon}
              size={iconSize}
              className="text-tertiary transition-transform data-[active]:rotate-180"
            />
          )}
        </button>
      }
    />
  )
}
