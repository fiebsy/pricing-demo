'use client'

import { useState, useRef, useCallback } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { Menu } from '@base-ui/react/menu'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import ArrowDown01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowDown01Icon'
import { cn } from '@/lib/utils'
import type { NavConfig, NavSection, NavTextStyle, TextSize, FontWeight, TextColor } from './nav-config'

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

interface SectionDropdownProps {
  section: NavSection
  config: NavConfig
}

export function SectionDropdown({ section, config }: SectionDropdownProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const {
    navItemSize,
    navItemWeight,
    navItemColor,
    navItemOpacity,
    navItemActiveColor,
    navItemActiveOpacity,
    showNavItemHoverBackground,
    showNavItemActiveBackground,
    showDropdownIcon,
    dropdownIconSize,
  } = config

  // Check if any item in this section is active
  const isSectionActive = section.items.some((item) => pathname === item.href)
  const color = isSectionActive ? navItemActiveColor : navItemColor
  const opacity = isSectionActive ? navItemActiveOpacity : navItemOpacity
  const iconSize = ICON_SIZE_MAP[dropdownIconSize]

  // Handle hover open/close with delay
  const handleMouseEnter = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    setOpen(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpen(false)
    }, 150) // Small delay to allow moving to dropdown
  }, [])

  // Handle click on section label → navigate to first item
  const handleTriggerClick = useCallback(() => {
    router.push(section.defaultHref)
    setOpen(false)
  }, [router, section.defaultHref])

  // Handle item selection
  const handleItemClick = useCallback(
    (href: string) => {
      router.push(href)
      setOpen(false)
    },
    [router]
  )

  return (
    <Menu.Root open={open} onOpenChange={setOpen}>
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Menu.Trigger
          onClick={handleTriggerClick}
          className={cn(
            'flex items-center gap-1 px-3 py-2 transition-colors',
            'rounded-lg cursor-pointer',
            getNavItemClasses(navItemSize, navItemWeight, color),
            isSectionActive && showNavItemActiveBackground && 'bg-secondary',
            !isSectionActive && showNavItemHoverBackground && 'hover:bg-secondary/50'
          )}
          style={getOpacityStyle(opacity)}
        >
          <span>{section.label}</span>
          {showDropdownIcon && (
            <HugeIcon
              icon={ArrowDown01Icon}
              size={iconSize}
              className={cn(
                'text-tertiary transition-transform duration-200',
                open && 'rotate-180'
              )}
            />
          )}
        </Menu.Trigger>

        <Menu.Portal>
          <Menu.Positioner
            sideOffset={8}
            side="bottom"
            align="start"
            className="z-50"
          >
            <Menu.Popup
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className={cn(
                'min-w-[180px] rounded-xl p-1',
                'bg-secondary border border-primary',
                'shadow-lg',
                'origin-top-left',
                'transition-all duration-200 ease-out',
                'data-[starting-style]:scale-95 data-[starting-style]:opacity-0',
                'data-[ending-style]:scale-95 data-[ending-style]:opacity-0',
                'corner-squircle'
              )}
            >
              {section.items.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon

                return (
                  <Menu.Item
                    key={item.id}
                    onClick={() => handleItemClick(item.href)}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 rounded-lg',
                      'cursor-pointer select-none outline-none',
                      'transition-colors duration-150',
                      isActive
                        ? 'bg-tertiary text-primary'
                        : 'text-secondary hover:bg-tertiary/50 hover:text-primary',
                      'data-[highlighted]:bg-tertiary/50 data-[highlighted]:text-primary'
                    )}
                  >
                    {Icon && (
                      <HugeIcon icon={Icon} size={16} className="shrink-0" />
                    )}
                    <span className="text-sm font-medium">{item.label}</span>
                  </Menu.Item>
                )
              })}
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </div>
    </Menu.Root>
  )
}
