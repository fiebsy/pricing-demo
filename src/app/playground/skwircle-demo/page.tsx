/**
 * Skwircle Demo Page
 *
 * Interactive playground for Skwircle design system components.
 * Features unified control panel for real-time configuration.
 */

'use client'

import { useCallback, useMemo, useState } from 'react'
import { Breadcrumbs } from '@/components/ui/nav'

import {
  UnifiedControlPanel,
  type ControlChangeEvent,
  type UnifiedControlPanelConfig,
} from '@/components/ui/controls/unified-control-panel'

import type {
  ButtonConfig,
  InputConfig,
  BadgeConfig,
  CardConfig,
  DashboardConfig,
  DemoTab,
} from './types'

import {
  DEFAULT_BUTTON_CONFIG,
  DEFAULT_INPUT_CONFIG,
  DEFAULT_BADGE_CONFIG,
  DEFAULT_CARD_CONFIG,
  DEFAULT_DASHBOARD_CONFIG,
} from './constants'

import {
  createButtonPanelConfig,
  createInputPanelConfig,
  createBadgePanelConfig,
  createCardPanelConfig,
  createDashboardPanelConfig,
} from './panels'

import {
  ButtonPreview,
  InputPreview,
  BadgePreview,
  CardPreview,
  DashboardPreview,
} from './components'

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function SkwircleDemoPage() {
  // Component configs
  const [buttonConfig, setButtonConfig] = useState<ButtonConfig>(DEFAULT_BUTTON_CONFIG)
  const [inputConfig, setInputConfig] = useState<InputConfig>(DEFAULT_INPUT_CONFIG)
  const [badgeConfig, setBadgeConfig] = useState<BadgeConfig>(DEFAULT_BADGE_CONFIG)
  const [cardConfig, setCardConfig] = useState<CardConfig>(DEFAULT_CARD_CONFIG)
  const [dashboardConfig, setDashboardConfig] = useState<DashboardConfig>(DEFAULT_DASHBOARD_CONFIG)

  // Active tab
  const [activeTab, setActiveTab] = useState<DemoTab>('button')

  // Control panel configuration
  const panelConfig = useMemo<UnifiedControlPanelConfig>(() => ({
    sections: [
      createButtonPanelConfig(buttonConfig),
      createInputPanelConfig(inputConfig),
      createBadgePanelConfig(badgeConfig),
      createCardPanelConfig(cardConfig),
      createDashboardPanelConfig(dashboardConfig),
    ],
    defaultActiveTab: activeTab,
    position: {
      top: '16px',
      bottom: '16px',
      right: '16px',
      width: '320px',
    },
    showReset: true,
    resetLabel: 'Reset All',
  }), [buttonConfig, inputConfig, badgeConfig, cardConfig, dashboardConfig, activeTab])

  // Handle control changes
  const handleControlChange = useCallback((event: ControlChangeEvent) => {
    const { sectionId, controlId, value } = event

    // Update active tab when section changes
    setActiveTab(sectionId as DemoTab)

    // Update the appropriate config based on section
    switch (sectionId) {
      case 'button':
        setButtonConfig(prev => ({ ...prev, [controlId]: value }))
        break
      case 'input':
        setInputConfig(prev => ({ ...prev, [controlId]: value }))
        break
      case 'badge':
        setBadgeConfig(prev => ({ ...prev, [controlId]: value }))
        break
      case 'card':
        setCardConfig(prev => ({ ...prev, [controlId]: value }))
        break
      case 'dashboard':
        setDashboardConfig(prev => ({ ...prev, [controlId]: value }))
        break
    }
  }, [])

  // Handle reset
  const handleReset = useCallback(() => {
    setButtonConfig(DEFAULT_BUTTON_CONFIG)
    setInputConfig(DEFAULT_INPUT_CONFIG)
    setBadgeConfig(DEFAULT_BADGE_CONFIG)
    setCardConfig(DEFAULT_CARD_CONFIG)
    setDashboardConfig(DEFAULT_DASHBOARD_CONFIG)
  }, [])

  // Get current config for copy
  const getConfigForCopy = useCallback(() => {
    switch (activeTab) {
      case 'button':
        return buttonConfig
      case 'input':
        return inputConfig
      case 'badge':
        return badgeConfig
      case 'card':
        return cardConfig
      case 'dashboard':
        return dashboardConfig
      default:
        return {}
    }
  }, [activeTab, buttonConfig, inputConfig, badgeConfig, cardConfig, dashboardConfig])

  // Render active preview
  const renderPreview = () => {
    switch (activeTab) {
      case 'button':
        return <ButtonPreview config={buttonConfig} />
      case 'input':
        return (
          <InputPreview
            config={inputConfig}
            onValueChange={(value) => setInputConfig(prev => ({ ...prev, value }))}
          />
        )
      case 'badge':
        return <BadgePreview config={badgeConfig} />
      case 'card':
        return <CardPreview config={cardConfig} />
      case 'dashboard':
        return <DashboardPreview config={dashboardConfig} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen">
      {/* Breadcrumbs */}
      <div className="nav-clearance px-6">
        <div className="flex items-center justify-between">
          <Breadcrumbs
            items={[
              { label: 'Playground', href: '/playground' },
              { label: 'Skwircle Demo' },
            ]}
          />

          {/* Tab indicators */}
          <div className="flex items-center gap-1">
            {(['button', 'input', 'badge', 'card', 'dashboard'] as DemoTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                  activeTab === tab
                    ? 'bg-brand-secondary text-brand-secondary'
                    : 'text-tertiary hover:text-primary hover:bg-secondary'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Preview Area */}
      <div className="pr-[352px] pb-24 md:pb-0">
        <div className="flex min-h-[calc(100vh-120px)] items-center justify-center">
          {renderPreview()}
        </div>
      </div>

      {/* Control Panel */}
      <UnifiedControlPanel
        config={panelConfig}
        onChange={handleControlChange}
        onReset={handleReset}
        getConfigForCopy={getConfigForCopy}
      />
    </div>
  )
}
