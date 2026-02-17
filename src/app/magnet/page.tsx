'use client'

import {
  MagneticMenu,
  MagneticMenuItem,
  MagneticMenuSeparator,
} from '../playground/magnetic-menu/core/magnetic-menu-item'
import { DEFAULT_MAGNETIC_MENU_CONFIG } from '../playground/magnetic-menu/config/presets'

import { HugeIcon } from '@/components/ui/patterns/control-panel'
import Home01Icon from '@hugeicons-pro/core-stroke-rounded/Home01Icon'
import UserIcon from '@hugeicons-pro/core-stroke-rounded/UserIcon'
import Settings01Icon from '@hugeicons-pro/core-stroke-rounded/Settings01Icon'
import FolderOpenIcon from '@hugeicons-pro/core-stroke-rounded/FolderOpenIcon'
import InboxIcon from '@hugeicons-pro/core-stroke-rounded/InboxIcon'
import Calendar03Icon from '@hugeicons-pro/core-stroke-rounded/Calendar03Icon'
import Search01Icon from '@hugeicons-pro/core-stroke-rounded/Search01Icon'
import HelpCircleIcon from '@hugeicons-pro/core-stroke-rounded/HelpCircleIcon'
import Logout01Icon from '@hugeicons-pro/core-stroke-rounded/Logout01Icon'

// ============================================================================
// SVG Pattern Component
// ============================================================================

function SVGPattern({ type, opacity }: { type: string; opacity: number }) {
  if (type === 'none') return null

  const patterns: Record<string, React.ReactNode> = {
    dots: (
      <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill="currentColor" />
      </pattern>
    ),
    grid: (
      <pattern id="grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
      </pattern>
    ),
    diagonal: (
      <pattern id="diagonal" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
        <path d="M 0 10 L 10 0" stroke="currentColor" strokeWidth="0.5" />
      </pattern>
    ),
  }

  return (
    <svg className="absolute inset-0 w-full h-full text-primary" style={{ opacity }}>
      <defs>{patterns[type]}</defs>
      <rect width="100%" height="100%" fill={`url(#${type})`} />
    </svg>
  )
}

// ============================================================================
// Menu Items Data
// ============================================================================

type MenuItem =
  | { type: 'item'; id: string; label: string; icon: typeof Home01Icon }
  | { type: 'separator'; id: string }

const MENU_ITEMS: MenuItem[] = [
  { type: 'item', id: 'home', label: 'Home', icon: Home01Icon },
  { type: 'item', id: 'search', label: 'Search', icon: Search01Icon },
  { type: 'item', id: 'inbox', label: 'Inbox', icon: InboxIcon },
  { type: 'item', id: 'calendar', label: 'Calendar', icon: Calendar03Icon },
  { type: 'item', id: 'projects', label: 'Projects', icon: FolderOpenIcon },
  { type: 'separator', id: 'separator-1' },
  { type: 'item', id: 'profile', label: 'Profile', icon: UserIcon },
  { type: 'item', id: 'settings', label: 'Settings', icon: Settings01Icon },
  { type: 'item', id: 'help', label: 'Help & Support', icon: HelpCircleIcon },
  { type: 'separator', id: 'separator-2' },
  { type: 'item', id: 'logout', label: 'Log Out', icon: Logout01Icon },
]

// ============================================================================
// Page Component
// ============================================================================

export default function MagnetPage() {
  const config = DEFAULT_MAGNETIC_MENU_CONFIG

  return (
    <div className="relative h-screen bg-primary overflow-hidden">
      {/* SVG Pattern - fixed to viewport */}
      {config.background.showPattern && (
        <div className="fixed inset-0 pointer-events-none z-0">
          <SVGPattern
            type={config.background.patternType}
            opacity={config.background.patternOpacity}
          />
        </div>
      )}

      {/* Blur circle - fixed centered in viewport */}
      {config.background.showBlurCircle && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
          <div
            className="rounded-full"
            style={{
              width: config.background.blurCircleSize,
              height: config.background.blurCircleSize,
              opacity: config.background.blurCircleOpacity,
              filter: `blur(${config.background.blurAmount}px)`,
              backgroundColor: `var(--color-bg-${config.background.blurCircleColor})`,
            }}
          />
        </div>
      )}

      {/* Menu - fixed centered in viewport */}
      <div className="fixed inset-0 flex items-center justify-center z-10">
        <MagneticMenu
          hoverIndicatorMode={config.hoverIndicator.mode}
          unifiedHoverConfig={config.hoverIndicator.unified}
          hoverBackground={config.hover.background}
          hoverBackgroundOpacity={config.hover.backgroundOpacity}
          borderRadius={config.hover.borderRadius}
          shadowIntensity={config.shadow.intensity}
        >
          {MENU_ITEMS.map((item) => {
            if (item.type === 'separator') {
              return <MagneticMenuSeparator key={item.id} />
            }

            return (
              <MagneticMenuItem
                key={item.id}
                id={item.id}
                label={item.label}
                icon={
                  config.icons.show ? (
                    <HugeIcon
                      icon={item.icon}
                      size={config.icons.size}
                      style={{ opacity: config.icons.opacity }}
                    />
                  ) : undefined
                }
                pullMode={config.pullMode}
                pullStrength={config.pullStrength}
                pullDirection={config.pullDirection}
                clampToParent={config.clampToParent}
                animation={config.animation}
                hoverBackground={config.hover.background}
                hoverBackgroundOpacity={config.hover.backgroundOpacity}
                borderRadius={config.hover.borderRadius}
              />
            )
          })}
        </MagneticMenu>
      </div>
    </div>
  )
}
