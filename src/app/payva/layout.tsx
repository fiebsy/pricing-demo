'use client'

import { useState, useCallback, useEffect } from 'react'
import { ExperimentalNav } from './_components/experimental-nav'
import { NavigationProvider } from './_components/nav-context'
import { UnifiedControlPanel, type ControlChangeEvent } from '@/components/ui/patterns/control-panel'
import {
  type NavConfig,
  DEFAULT_NAV_CONFIG,
  NAV_ITEMS_PRESETS,
  createNavPanelConfig,
  getPresetById,
} from './_components/nav-config'
import { ReorderableNavItems } from './_components/nav-config/reorderable-nav-items'

// Visibility key mapping for nav items
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

// User preset storage key
const USER_PRESETS_KEY = 'payva-nav-user-presets'

interface UserNavPreset {
  id: string
  name: string
  visibility: Record<NavVisibilityKey, boolean>
  order: string[]
  customItems: NavConfig['customNavItems']
}

interface PayvaLayoutProps {
  children: React.ReactNode
}

export default function PayvaLayout({ children }: PayvaLayoutProps) {
  const [navConfig, setNavConfig] = useState<NavConfig>(DEFAULT_NAV_CONFIG)
  const [activePresetId, setActivePresetId] = useState<string | null>('default')
  const [userPresets, setUserPresets] = useState<UserNavPreset[]>([])

  // Load user presets from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(USER_PRESETS_KEY)
    if (stored) {
      try {
        setUserPresets(JSON.parse(stored))
      } catch {
        // Invalid JSON, ignore
      }
    }
  }, [])

  // Save user presets to localStorage
  useEffect(() => {
    localStorage.setItem(USER_PRESETS_KEY, JSON.stringify(userPresets))
  }, [userPresets])

  const handleConfigChange = useCallback((event: ControlChangeEvent) => {
    const { controlId, value } = event

    // Clear active preset when user manually changes a control
    setActivePresetId(null)

    setNavConfig((prev) => {
      // Handle navItemsPreset change - apply visibility settings
      if (controlId === 'navItemsPreset' && typeof value === 'string') {
        // Check built-in presets first
        const presetVisibility = NAV_ITEMS_PRESETS[value]
        if (presetVisibility) {
          return {
            ...prev,
            navItemsPreset: value as NavConfig['navItemsPreset'],
            ...presetVisibility,
          }
        }

        // Check user presets
        const userPreset = userPresets.find((p) => p.id === value)
        if (userPreset) {
          return {
            ...prev,
            navItemsPreset: 'custom', // User presets use custom mode
            ...userPreset.visibility,
            navItemOrder: userPreset.order,
            customNavItems: userPreset.customItems,
          }
        }

        // For 'custom', just update the preset without changing visibility
        return {
          ...prev,
          navItemsPreset: value as NavConfig['navItemsPreset'],
        }
      }

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
  }, [userPresets])

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

  // Handlers for reorderable nav items (Custom preset only)
  const handleNavOrderChange = useCallback((newOrder: string[]) => {
    // Separate built-in items from custom items
    const builtInItems = newOrder.filter((id) => id in NAV_VISIBILITY_MAP)
    const customItemIds = newOrder.filter((id) => !(id in NAV_VISIBILITY_MAP))

    setNavConfig((prev) => {
      // Reorder custom items to match the new order
      const reorderedCustomItems = customItemIds
        .map((id) => prev.customNavItems.find((item) => item.id === id))
        .filter((item): item is NonNullable<typeof item> => item !== undefined)

      return {
        ...prev,
        navItemOrder: builtInItems,
        customNavItems: reorderedCustomItems,
      }
    })
  }, [])

  const handleNavVisibilityChange = useCallback((itemId: string, visible: boolean) => {
    const visibilityKey = NAV_VISIBILITY_MAP[itemId]
    if (visibilityKey) {
      setNavConfig((prev) => ({
        ...prev,
        [visibilityKey]: visible,
      }))
    }
  }, [])

  // Custom item handlers
  const handleAddCustomItem = useCallback((label: string) => {
    const id = `custom-${Date.now()}`
    setNavConfig((prev) => ({
      ...prev,
      customNavItems: [
        ...prev.customNavItems,
        { id, label, visible: true },
      ],
    }))
  }, [])

  const handleUpdateCustomItem = useCallback((itemId: string, label: string) => {
    setNavConfig((prev) => ({
      ...prev,
      customNavItems: prev.customNavItems.map((item) =>
        item.id === itemId ? { ...item, label } : item
      ),
    }))
  }, [])

  const handleRemoveCustomItem = useCallback((itemId: string) => {
    setNavConfig((prev) => ({
      ...prev,
      customNavItems: prev.customNavItems.filter((item) => item.id !== itemId),
    }))
  }, [])

  const handleToggleCustomItem = useCallback((itemId: string, visible: boolean) => {
    setNavConfig((prev) => ({
      ...prev,
      customNavItems: prev.customNavItems.map((item) =>
        item.id === itemId ? { ...item, visible } : item
      ),
    }))
  }, [])

  // Save current config as a new preset
  const handleSaveAsPreset = useCallback((name: string) => {
    const id = `user-${Date.now()}`

    // Extract current visibility settings
    const visibility: Record<NavVisibilityKey, boolean> = {
      showOverviewNav: navConfig.showOverviewNav,
      showSales: navConfig.showSales,
      showOrders: navConfig.showOrders,
      showProducts: navConfig.showProducts,
      showPayouts: navConfig.showPayouts,
      showPayments: navConfig.showPayments,
      showCollections: navConfig.showCollections,
      showRisk: navConfig.showRisk,
      showDocuments: navConfig.showDocuments,
      showTeam: navConfig.showTeam,
      showAgreements: navConfig.showAgreements,
      showWebhooks: navConfig.showWebhooks,
    }

    const newPreset: UserNavPreset = {
      id,
      name,
      visibility,
      order: navConfig.navItemOrder,
      customItems: navConfig.customNavItems,
    }

    setUserPresets((prev) => [...prev, newPreset])
  }, [navConfig])

  // Render function for reorderable nav items
  const renderNavItems = useCallback(
    () => (
      <ReorderableNavItems
        config={navConfig}
        onOrderChange={handleNavOrderChange}
        onVisibilityChange={handleNavVisibilityChange}
        onAddCustomItem={handleAddCustomItem}
        onUpdateCustomItem={handleUpdateCustomItem}
        onRemoveCustomItem={handleRemoveCustomItem}
        onToggleCustomItem={handleToggleCustomItem}
        onSaveAsPreset={handleSaveAsPreset}
      />
    ),
    [
      navConfig,
      handleNavOrderChange,
      handleNavVisibilityChange,
      handleAddCustomItem,
      handleUpdateCustomItem,
      handleRemoveCustomItem,
      handleToggleCustomItem,
      handleSaveAsPreset,
    ]
  )

  const panelConfig = createNavPanelConfig(navConfig, activePresetId, {
    renderNavItems,
    userPresets,
  })

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
