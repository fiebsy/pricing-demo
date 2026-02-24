/**
 * Checklist Control Panel Configuration
 *
 * Builds the panel configuration for UnifiedControlPanel.
 */

import type { PanelConfig, Section, ControlGroup } from '@/components/ui/patterns/control-panel'
import type { ChecklistConfig, ChecklistPresetMeta } from '../config/types'
import {
  TEXT_SIZE_OPTIONS,
  TEXT_WEIGHT_OPTIONS,
  SEMANTIC_COLOR_OPTIONS,
  ICON_COLOR_OPTIONS,
  ICON_OPTIONS,
  ICON_WEIGHT_OPTIONS,
  ICON_SIZE_OPTIONS,
  GAP_OPTIONS,
  OPACITY_RANGE,
} from '../config/options'

// ============================================================================
// Panel Builder
// ============================================================================

export function buildChecklistPanelConfig(
  config: ChecklistConfig,
  presets: ChecklistPresetMeta[],
  activePresetId: string | null
): PanelConfig {
  return {
    sections: [
      buildItemsSection(config),
      buildTextStyleSection(config),
      buildDateStyleSection(config),
      buildIconStyleSection(config),
      buildLayoutSection(config),
    ],
    presetConfig: {
      presets: presets.map((p) => ({
        id: p.id,
        name: p.name,
        data: p.data,
      })),
      activePresetId,
      showCopyButton: true,
    },
    showReset: true,
  }
}

// ============================================================================
// Items Section
// ============================================================================

function buildItemsSection(config: ChecklistConfig): Section {
  const itemGroups: ControlGroup[] = []

  // Add/Remove controls at the top
  itemGroups.push({
    title: 'Manage Items',
    controls: [
      {
        id: 'items.add',
        type: 'custom',
        label: 'Add/Remove',
        render: () => null, // Placeholder - actual render handled by page component
      },
    ],
  })

  // Individual item controls
  config.items.forEach((item, index) => {
    itemGroups.push({
      title: `Item ${index + 1}`,
      controls: [
        {
          id: `items.${index}.text`,
          type: 'text',
          label: 'Text',
          value: item.text,
        },
        {
          id: `items.${index}.date`,
          type: 'text',
          label: 'Date',
          value: item.date || '',
        },
        {
          id: `items.${index}.icon`,
          type: 'select',
          label: 'Icon',
          value: item.icon,
          options: [...ICON_OPTIONS],
        },
      ],
    })
  })

  return {
    id: 'items',
    label: 'Items',
    title: 'Checklist Items',
    groups: itemGroups,
  }
}

// ============================================================================
// Text Style Section
// ============================================================================

function buildTextStyleSection(config: ChecklistConfig): Section {
  return {
    id: 'text',
    label: 'Text',
    title: 'Text Style',
    groups: [
      {
        title: 'Typography',
        controls: [
          {
            id: 'textStyle.size',
            type: 'select',
            label: 'Size',
            value: config.textStyle.size,
            options: [...TEXT_SIZE_OPTIONS],
          },
          {
            id: 'textStyle.weight',
            type: 'select',
            label: 'Weight',
            value: config.textStyle.weight,
            options: [...TEXT_WEIGHT_OPTIONS],
          },
        ],
      },
      {
        title: 'Color',
        controls: [
          {
            id: 'textStyle.color',
            type: 'select',
            label: 'Color',
            value: config.textStyle.color,
            options: [...SEMANTIC_COLOR_OPTIONS],
          },
          {
            id: 'textStyle.opacity',
            type: 'slider',
            label: 'Opacity',
            value: config.textStyle.opacity,
            min: OPACITY_RANGE.min,
            max: OPACITY_RANGE.max,
            step: OPACITY_RANGE.step,
            formatLabel: (v: number) => `${v}%`,
          },
        ],
      },
    ],
  }
}

// ============================================================================
// Date Style Section
// ============================================================================

function buildDateStyleSection(config: ChecklistConfig): Section {
  const dateStyle = config.dateStyle || config.textStyle

  return {
    id: 'date',
    label: 'Date',
    title: 'Date Style',
    groups: [
      {
        title: 'Typography',
        controls: [
          {
            id: 'dateStyle.size',
            type: 'select',
            label: 'Size',
            value: dateStyle.size,
            options: [...TEXT_SIZE_OPTIONS],
          },
          {
            id: 'dateStyle.weight',
            type: 'select',
            label: 'Weight',
            value: dateStyle.weight,
            options: [...TEXT_WEIGHT_OPTIONS],
          },
        ],
      },
      {
        title: 'Color',
        controls: [
          {
            id: 'dateStyle.color',
            type: 'select',
            label: 'Color',
            value: dateStyle.color,
            options: [...SEMANTIC_COLOR_OPTIONS],
          },
          {
            id: 'dateStyle.opacity',
            type: 'slider',
            label: 'Opacity',
            value: dateStyle.opacity,
            min: OPACITY_RANGE.min,
            max: OPACITY_RANGE.max,
            step: OPACITY_RANGE.step,
            formatLabel: (v: number) => `${v}%`,
          },
        ],
      },
    ],
  }
}

// ============================================================================
// Icon Style Section
// ============================================================================

function buildIconStyleSection(config: ChecklistConfig): Section {
  return {
    id: 'icon',
    label: 'Icon',
    title: 'Icon Style',
    groups: [
      {
        title: 'Appearance',
        controls: [
          {
            id: 'iconStyle.size',
            type: 'select',
            label: 'Size',
            value: config.iconStyle.size,
            options: [...ICON_SIZE_OPTIONS],
          },
          {
            id: 'iconStyle.weight',
            type: 'select',
            label: 'Weight',
            value: config.iconStyle.weight,
            options: [...ICON_WEIGHT_OPTIONS],
          },
        ],
      },
      {
        title: 'Color',
        controls: [
          {
            id: 'iconStyle.color',
            type: 'select',
            label: 'Color',
            value: config.iconStyle.color,
            options: [...ICON_COLOR_OPTIONS],
          },
          {
            id: 'iconStyle.opacity',
            type: 'slider',
            label: 'Opacity',
            value: config.iconStyle.opacity,
            min: OPACITY_RANGE.min,
            max: OPACITY_RANGE.max,
            step: OPACITY_RANGE.step,
            formatLabel: (v: number) => `${v}%`,
          },
        ],
      },
    ],
  }
}

// ============================================================================
// Layout Section
// ============================================================================

function buildLayoutSection(config: ChecklistConfig): Section {
  return {
    id: 'layout',
    label: 'Layout',
    title: 'Layout',
    groups: [
      {
        title: 'Spacing',
        controls: [
          {
            id: 'itemGap',
            type: 'select',
            label: 'Item Gap',
            value: config.itemGap,
            options: [...GAP_OPTIONS],
          },
        ],
      },
    ],
  }
}
