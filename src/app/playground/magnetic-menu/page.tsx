/**
 * Magnetic Menu Playground
 *
 * Core component: ./core/magnetic-menu-item.tsx
 * Migration target: src/components/ui/prod/features/menu
 *
 * Features:
 * - Three pull modes: text, background, both
 * - Configurable pull strength
 * - Semantic background color selection
 * - Adjustable opacity and border radius
 *
 * @package motion-plus
 */

'use client'

import { useCallback, useMemo, useState } from 'react'
import {
  UnifiedControlPanel,
  PlaygroundLayout,
  type ControlChangeEvent,
} from '@/components/ui/patterns/control-panel'

import {
  MagneticMenu,
  MagneticMenuItem,
  MagneticMenuSeparator,
} from './core/magnetic-menu-item'
import type { MagneticMenuConfig } from './config/types'
import {
  DEFAULT_MAGNETIC_MENU_CONFIG,
  MAGNETIC_MENU_PRESETS,
  getSpringPresetById,
  getUnifiedHoverPresetById,
} from './config/presets'
import { buildMagneticMenuPanelConfig } from './panels/panel-config'

// Icons (inline SVG for simplicity)
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
// Utility: Deep set nested value
// ============================================================================

function setNestedValue<T>(obj: T, path: string, value: unknown): T {
  const keys = path.split('.')
  const result = structuredClone(obj) as Record<string, unknown>
  let current = result

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    if (typeof current[key] !== 'object' || current[key] === null) {
      current[key] = {}
    } else {
      current[key] = { ...(current[key] as Record<string, unknown>) }
    }
    current = current[key] as Record<string, unknown>
  }

  current[keys[keys.length - 1]] = value
  return result as T
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
// Page Component
// ============================================================================

export default function MagneticMenuPlayground() {
  const [config, setConfig] = useState<MagneticMenuConfig>(DEFAULT_MAGNETIC_MENU_CONFIG)
  const [activePresetId, setActivePresetId] = useState<string | null>('default')

  // Handle control changes
  const handleChange = useCallback((event: ControlChangeEvent) => {
    // Handle spring preset selection specially
    if (event.controlId === 'springPreset') {
      const springPreset = getSpringPresetById(event.value as string)
      if (springPreset) {
        setConfig((prev) => ({
          ...prev,
          animation: { ...springPreset.data },
        }))
      }
      // Don't clear main preset when changing spring preset
      return
    }

    // Handle unified hover preset selection specially
    if (event.controlId === 'unifiedHoverPreset') {
      const unifiedPreset = getUnifiedHoverPresetById(event.value as string)
      if (unifiedPreset) {
        setConfig((prev) => ({
          ...prev,
          hoverIndicator: {
            ...prev.hoverIndicator,
            unified: { ...unifiedPreset.data },
          },
        }))
      }
      // Don't clear main preset when changing unified hover preset
      return
    }

    setConfig((prev) => setNestedValue(prev, event.controlId, event.value))
    setActivePresetId(null)
  }, [])

  // Handle preset selection
  const handlePresetChange = useCallback((presetId: string) => {
    const preset = MAGNETIC_MENU_PRESETS.find((p) => p.id === presetId)
    if (preset) {
      setConfig(preset.data)
      setActivePresetId(presetId)
    }
  }, [])

  // Handle reset
  const handleReset = useCallback(() => {
    setConfig(DEFAULT_MAGNETIC_MENU_CONFIG)
    setActivePresetId('default')
  }, [])

  // Build panel configuration
  const panelConfig = useMemo(
    () => buildMagneticMenuPanelConfig(config, MAGNETIC_MENU_PRESETS, activePresetId),
    [config, activePresetId]
  )

  return (
    <PlaygroundLayout
      className="bg-primary"
      panelWidth={0}
      controlPanel={
        <UnifiedControlPanel
          config={panelConfig}
          onChange={handleChange}
          onPresetChange={handlePresetChange}
          onReset={handleReset}
          getConfigForCopy={() => config}
        />
      }
    >
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
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="pointer-events-auto">
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
    </PlaygroundLayout>
  )
}
