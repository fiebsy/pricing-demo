'use client'

/**
 * Pricing Select Menu Playground
 *
 * Isolated component: @/components/ui/features/pricing-select-menu
 * This playground demonstrates the standalone pricing select menu component
 * that was extracted from the biaxial-expand system.
 */

import { useMemo, useState, useCallback } from 'react'
import {
  UnifiedControlPanel,
  PlaygroundLayout,
} from '@/components/ui/patterns/control-panel'

import { PricingSelectDemo } from './core/pricing-select-demo'
import { VariantControls } from './components/variant-controls'
import { LayoutWrapper } from './components/layout-wrapper'
import { ModalPreview } from './components/modal-preview'
import { PRICING_SELECT_MENU_PRESETS } from './config/presets'
import { getPanelSections } from './panels/panel-config'
import { usePlaygroundState } from './hooks/use-playground-state'
import { useComputedConfig } from './hooks/use-computed-config'
import { getPageBackgroundClass } from './utils/style-mappers'

// ============================================================================
// PLAYGROUND PAGE
// ============================================================================

export default function PricingSelectMenuPlayground() {
  const [state, actions] = usePlaygroundState()
  const { config, activePresetId, resetKey, autoOpen, pricingVariant } = state
  const {
    handleChange,
    handlePresetChange,
    handleReset,
    handleSlowMoChange,
    handleShowDebugChange,
    handleAutoOpenChange,
    handlePricingVariantChange,
  } = actions

  // Measured wrapper width for fill mode
  const [measuredWrapperWidth, setMeasuredWrapperWidth] = useState<number | undefined>(undefined)
  const handleWrapperWidthChange = useCallback((width: number) => {
    setMeasuredWrapperWidth(width)
  }, [])

  const { effectiveConfig, computedContainerHeight } = useComputedConfig(
    config,
    pricingVariant,
    measuredWrapperWidth
  )

  const panelSections = useMemo(() => getPanelSections(config), [config])

  // Build unified control panel config
  const panelConfig = useMemo(
    () => ({
      sections: panelSections,
      presets: PRICING_SELECT_MENU_PRESETS.map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description,
      })),
      activePresetId,
      componentName: 'PricingSelectMenu',
    }),
    [panelSections, activePresetId]
  )

  return (
    <PlaygroundLayout
      controlPanel={
        <UnifiedControlPanel
          config={panelConfig}
          onChange={handleChange}
          onPresetChange={handlePresetChange}
          onReset={handleReset}
          getConfigForCopy={() => config}
        />
      }
      debugControls={{
        slowMo: config.demo.slowMo,
        onSlowMoChange: handleSlowMoChange,
        showDebug: config.demo.showDebug,
        onShowDebugChange: handleShowDebugChange,
        autoOpen,
        onAutoOpenChange: handleAutoOpenChange,
      }}
      className={getPageBackgroundClass(config.demo.pageBackground)}
    >
      <ModalPreview
        config={config.layout.modalPreview}
        controls={
          <VariantControls
            activeVariant={pricingVariant}
            onVariantChange={handlePricingVariantChange}
          />
        }
      >
        <LayoutWrapper
          config={config.layout.wrapper}
          computedHeight={computedContainerHeight}
          onWidthChange={config.layout.panelWidthMode === 'fill' ? handleWrapperWidthChange : undefined}
        >
          <div key={resetKey}>
            <PricingSelectDemo
              config={effectiveConfig}
              autoOpen={autoOpen}
              pricingVariant={pricingVariant}
            />
          </div>
        </LayoutWrapper>
      </ModalPreview>
    </PlaygroundLayout>
  )
}
