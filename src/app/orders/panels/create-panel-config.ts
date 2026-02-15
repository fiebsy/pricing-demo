/**
 * Orders Page - Combined Panel Configuration
 *
 * Organizes controls into 4 logical sections:
 * 1. Page Layout - Overall page settings (preset, background, gaps)
 * 2. Metrics - Header metrics tiles (typography, padding, style, shady)
 * 3. Toolbar - Filter toolbar configuration (placeholder)
 * 4. Table - Table columns and styling
 */

import type { PanelConfig, Section } from '@/components/ui/patterns/control-panel'
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
import { createChartSection } from '../sections/chart'
import { createFilterSection } from '../sections/filter-toolbar'

// =============================================================================
// SECTION 1: PAGE LAYOUT
// =============================================================================

function createPageLayoutSection(config: OrdersPageConfig): Section {
  const metricsLayoutSection = createLayoutSection(config)

  return {
    id: 'page-layout',
    title: 'Page Layout',
    tabLabel: 'Page',
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
      // Include metrics container size and stack order from layout section
      ...(metricsLayoutSection.groups ?? []),
    ],
  }
}

// =============================================================================
// SECTION 2: METRICS HEADER
// =============================================================================

function createMetricsSection(config: OrdersPageConfig): Section {
  const typographySection = createTypographySection(config)
  const paddingSection = createPaddingSection(config)
  const styleSection = createStyleSection(config)
  const shadySection = createShadySection(config)

  return {
    id: 'metrics',
    title: 'Metrics Header',
    tabLabel: 'Metrics',
    groups: [
      // Typography groups
      ...(typographySection.groups ?? []),
      // Padding groups
      ...(paddingSection.groups ?? []),
      // Style groups (background, border, corner, shine)
      ...(styleSection.groups ?? []),
      // Shady container groups
      ...(shadySection.groups ?? []),
    ],
  }
}

// =============================================================================
// SECTION 3: TOOLBAR
// =============================================================================

function createToolbarSection(config: OrdersPageConfig): Section {
  const filterSection = createFilterSection(config)

  return {
    id: 'toolbar',
    title: 'Toolbar',
    tabLabel: 'Toolbar',
    groups: filterSection.groups ?? [],
  }
}

// =============================================================================
// SECTION 4: TABLE
// =============================================================================

function createTableConfigSection(config: OrdersPageConfig): Section {
  const columnsSection = createColumnsSection(config)
  const tableStyleSection = createTableSection(config)

  return {
    id: 'table-config',
    title: 'Table',
    tabLabel: 'Table',
    groups: [
      // Column visibility and reorder
      ...(columnsSection.groups ?? []),
      // Table border styling
      ...(tableStyleSection.groups ?? []),
    ],
  }
}

// =============================================================================
// MAIN PANEL CONFIG
// =============================================================================

export function createPanelConfig(config: OrdersPageConfig): PanelConfig {
  return {
    sections: [
      createPageLayoutSection(config),
      createMetricsSection(config),
      createChartSection(config),
      createToolbarSection(config),
      createTableConfigSection(config),
    ],
    defaultActiveTab: 'page-layout',
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
