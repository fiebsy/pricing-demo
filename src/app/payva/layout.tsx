'use client'

import { useState, useCallback } from 'react'
import { ExperimentalNav } from './_components/experimental-nav'
import { NavigationProvider } from './_components/nav-context'
import { UnifiedControlPanel, type ControlChangeEvent } from '@/components/ui/patterns/control-panel'
import {
  type NavConfig,
  DEFAULT_NAV_CONFIG,
  createNavPanelConfig,
  getPresetById,
} from './_components/nav-config'

interface PayvaLayoutProps {
  children: React.ReactNode
}

export default function PayvaLayout({ children }: PayvaLayoutProps) {
  const [navConfig, setNavConfig] = useState<NavConfig>(DEFAULT_NAV_CONFIG)
  const [activePresetId, setActivePresetId] = useState<string | null>('default')

  const handleConfigChange = useCallback((event: ControlChangeEvent) => {
    const { controlId, value } = event

    // Clear active preset when user manually changes a control
    setActivePresetId(null)

    setNavConfig((prev) => {
      // Handle contentMaxWidth conversion from string to number
      if (controlId === 'contentMaxWidth') {
        return {
          ...prev,
          contentMaxWidth: Number(value),
        }
      }

      // Handle nested properties like "logoText.size" or "tabBar.tabText.size"
      if (controlId.includes('.')) {
        const parts = controlId.split('.')

        if (parts.length === 2) {
          // Simple nesting: parent.child (e.g., "logoText.size")
          const [parent, child] = parts
          const parentKey = parent as keyof NavConfig
          const parentValue = prev[parentKey]

          if (typeof parentValue === 'object' && parentValue !== null) {
            return {
              ...prev,
              [parent]: {
                ...(parentValue as object),
                [child]: value,
              },
            }
          }
        } else if (parts.length === 3) {
          // Deep nesting: parent.nested.child (e.g., "tabBar.tabText.size")
          const [parent, nested, child] = parts
          const parentKey = parent as keyof NavConfig
          const parentValue = prev[parentKey]

          if (typeof parentValue === 'object' && parentValue !== null) {
            // Cast through unknown to satisfy TypeScript
            const parentObj = parentValue as unknown as Record<string, unknown>
            const nestedValue = parentObj[nested]
            if (typeof nestedValue === 'object' && nestedValue !== null) {
              return {
                ...prev,
                [parent]: {
                  ...parentObj,
                  [nested]: {
                    ...(nestedValue as object),
                    [child]: value,
                  },
                },
              }
            }
          }
        }
      }

      return {
        ...prev,
        [controlId]: value,
      }
    })
  }, [])

  const handleReset = useCallback(() => {
    setNavConfig(DEFAULT_NAV_CONFIG)
    setActivePresetId('default')
  }, [])

  const handlePresetChange = useCallback((presetId: string) => {
    const presetData = getPresetById(presetId)
    if (presetData) {
      setNavConfig(presetData)
      setActivePresetId(presetId)
    }
  }, [])

  const panelConfig = createNavPanelConfig(navConfig, activePresetId)

  return (
    <div className="relative flex min-h-screen flex-col bg-primary">
      <ExperimentalNav config={navConfig} />
      <NavigationProvider config={navConfig}>
        <main
          className="relative z-10 flex-1 px-6 pb-6"
          style={{ paddingTop: navConfig.pageTopGap }}
        >
          <div
            className="mx-auto"
            style={{ maxWidth: navConfig.contentMaxWidth === 9999 ? 'none' : navConfig.contentMaxWidth }}
          >
            {children}
          </div>
        </main>
      </NavigationProvider>

      {/* Control Panel for live experimentation */}
      <UnifiedControlPanel
        config={panelConfig}
        onChange={handleConfigChange}
        onReset={handleReset}
        onPresetChange={handlePresetChange}
        getConfigForCopy={() => navConfig}
        className="!z-[60]"
      />
    </div>
  )
}
