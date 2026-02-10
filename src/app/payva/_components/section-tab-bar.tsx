'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import type { NavSection, TabBarConfig, NavTextStyle, TextSize, FontWeight, TextColor } from './nav-config'

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

const TAB_GAP_CLASSES = {
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
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

// Helper for flattened tab styles
function getTabClasses(
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

interface SectionTabBarProps {
  section: NavSection
  config: TabBarConfig
}

export function SectionTabBar({ section, config }: SectionTabBarProps) {
  const pathname = usePathname()
  const {
    show,
    indicatorStyle,
    gap,
    textSize,
    textWeight,
    textColor,
    textOpacity,
    activeColor,
    activeOpacity,
    showContainerBorder,
    showHoverBackground,
    showActiveBackground,
  } = config

  if (!show) {
    return null
  }

  return (
    <nav
      className={cn(
        'flex items-center',
        TAB_GAP_CLASSES[gap],
        // Only show border if underline style AND showContainerBorder is true
        indicatorStyle === 'underline' && showContainerBorder && 'border-b border-primary'
      )}
    >
      {section.items.map((item) => {
        const isActive = pathname === item.href
        const color = isActive ? activeColor : textColor
        const opacity = isActive ? activeOpacity : textOpacity

        return (
          <Link
            key={item.id}
            href={item.href}
            className={cn(
              'relative py-2 transition-colors',
              getTabClasses(textSize, textWeight, color),
              // Underline indicator
              indicatorStyle === 'underline' && [
                '-mb-px',
                isActive && 'border-b-2 border-brand-solid',
              ],
              // Pill indicator - conditional backgrounds
              indicatorStyle === 'pill' && [
                'px-3 rounded-lg',
                isActive && showActiveBackground && 'bg-secondary',
                !isActive && showHoverBackground && 'hover:bg-secondary/50',
              ],
              // None - just text styling with optional hover
              indicatorStyle === 'none' && !isActive && showHoverBackground && 'hover:text-primary'
            )}
            style={getOpacityStyle(opacity)}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
