/**
 * Orders Page - Combined Panel Configuration
 *
 * Combines panel sections from all sections into a unified control panel config.
 */

import type { PanelConfig } from '@/components/ui/patterns/control-panel'
import type { OrdersPageConfig } from '../types'
import { PAGE_BACKGROUND_OPTIONS, PRESET_OPTIONS } from '../config/options'
import {
  createLayoutSection,
  createTypographySection,
  createPaddingSection,
  createStyleSection,
  createShadySection,
} from '../sections/header-metrics'
import { createColumnsSection, createTableSection } from '../sections/table'

// =============================================================================
// MAIN PANEL CONFIG
// =============================================================================

export function createPanelConfig(config: OrdersPageConfig): PanelConfig {
  // Get section configs
  const layoutSection = createLayoutSection(config)
  const typographySection = createTypographySection(config)
  const paddingSection = createPaddingSection(config)
  const styleSection = createStyleSection(config)
  const shadySection = createShadySection(config)
  const columnsSection = createColumnsSection(config)
  const tableSection = createTableSection(config)

  // Add preset and page controls to layout section
  const enhancedLayoutSection = {
    ...layoutSection,
    groups: [
      {
        title: 'Preset',
        controls: [
          {
            id: 'preset',
            type: 'select' as const,
            label: 'Preset',
            value: 'custom',
            options: PRESET_OPTIONS,
          },
        ],
      },
      {
        title: 'Page',
        controls: [
          {
            id: 'pageBackground',
            type: 'select' as const,
            label: 'Background',
            value: config.pageBackground,
            options: PAGE_BACKGROUND_OPTIONS,
          },
          {
            id: 'layoutTopGap',
            type: 'slider' as const,
            label: 'Top Gap',
            value: config.layoutTopGap,
            min: 0,
            max: 96,
            step: 8,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'metricsToTableGap',
            type: 'slider' as const,
            label: 'Metrics → Table',
            value: config.metricsToTableGap,
            min: 0,
            max: 48,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      ...(layoutSection.groups ?? []),
    ],
  }

  return {
    sections: [
      enhancedLayoutSection,
      typographySection,
      paddingSection,
      styleSection,
      shadySection,
      columnsSection,
      tableSection,
    ],
    defaultActiveTab: 'layout',
    position: {
      top: '16px',
      bottom: '16px',
      right: '16px',
      width: '320px',
    },
    showReset: true,
    resetLabel: 'Reset All',
  }
}
