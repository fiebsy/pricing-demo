/**
 * Pricing Select Menu Playground - Panel Configuration
 *
 * Modular builder for UnifiedControlPanel sections.
 */

import type { Section } from '@/components/ui/patterns/control-panel'
import type { PricingSelectMenuPlaygroundConfig } from '../config/types'
import {
  PAGE_BACKGROUND_OPTIONS,
  BACKGROUND_OPTIONS,
  BORDER_COLOR_OPTIONS,
  BORDER_RADIUS_OPTIONS,
  SHADOW_OPTIONS,
  SHINE_OPTIONS,
  GRADIENT_OPTIONS,
  GRADIENT_COLOR_OPTIONS,
  HEIGHT_MODE_OPTIONS,
  EXPAND_ORIGIN_OPTIONS,
  TEXT_COLOR_OPTIONS,
  FONT_WEIGHT_OPTIONS,
  FONT_SIZE_OPTIONS,
  OPACITY_OPTIONS,
  VERTICAL_ALIGN_OPTIONS,
  DISPLAY_MODE_OPTIONS,
  LABEL_LAYOUT_OPTIONS,
} from '../config/options'

// ============================================================================
// SECTION BUILDERS
// ============================================================================

function buildLayoutSection(config: PricingSelectMenuPlaygroundConfig): Section {
  return {
    id: 'layout',
    label: 'Layout',
    title: 'Layout Settings',
    groups: [
      {
        title: 'Dimensions',
        controls: [
          {
            id: 'layout.panelWidth',
            type: 'slider',
            label: 'Panel Width',
            value: config.layout.panelWidth,
            min: 200,
            max: 500,
            step: 10,
          },
          {
            id: 'layout.triggerHeight',
            type: 'slider',
            label: 'Trigger Height (A)',
            value: config.layout.triggerHeight,
            min: 40,
            max: 120,
            step: 4,
          },
          {
            id: 'layout.triggerHeightB',
            type: 'slider',
            label: 'Trigger Height (B)',
            value: config.layout.triggerHeightB,
            min: 32,
            max: 80,
            step: 4,
          },
          {
            id: 'layout.maxBottomHeight',
            type: 'slider',
            label: 'Max Menu Height (A)',
            value: config.layout.maxBottomHeight,
            min: 100,
            max: 400,
            step: 10,
          },
          {
            id: 'layout.maxBottomHeightB',
            type: 'slider',
            label: 'Max Menu Height (B)',
            value: config.layout.maxBottomHeightB,
            min: 40,
            max: 200,
            step: 10,
          },
        ],
      },
      {
        title: 'Spacing',
        controls: [
          {
            id: 'layout.borderRadius',
            type: 'slider',
            label: 'Border Radius',
            value: config.layout.borderRadius,
            min: 0,
            max: 32,
            step: 2,
          },
          {
            id: 'layout.bottomGap',
            type: 'slider',
            label: 'Bottom Gap',
            value: config.layout.bottomGap,
            min: 0,
            max: 24,
            step: 2,
          },
          {
            id: 'layout.syncTriggerWidth',
            type: 'toggle',
            label: 'Sync Trigger Width',
            value: config.layout.syncTriggerWidth,
          },
        ],
      },
    ],
  }
}

function buildAnimationSection(config: PricingSelectMenuPlaygroundConfig): Section {
  return {
    id: 'animation',
    label: 'Animation',
    title: 'Animation Settings',
    groups: [
      {
        title: 'Timing',
        controls: [
          {
            id: 'animation.duration',
            type: 'slider',
            label: 'Expand Duration (ms)',
            value: config.animation.duration,
            min: 100,
            max: 600,
            step: 25,
          },
          {
            id: 'animation.collapseDuration',
            type: 'slider',
            label: 'Collapse Duration (ms)',
            value: config.animation.collapseDuration,
            min: 50,
            max: 400,
            step: 25,
          },
        ],
      },
      {
        title: 'Behavior',
        controls: [
          {
            id: 'animation.expandOrigin',
            type: 'select',
            label: 'Expand Origin',
            value: config.animation.expandOrigin,
            options: [...EXPAND_ORIGIN_OPTIONS],
          },
          {
            id: 'animation.animateSlotContainers',
            type: 'toggle',
            label: 'Animate Slot Containers',
            value: config.animation.animateSlotContainers,
          },
        ],
      },
    ],
  }
}

function buildAppearanceSection(config: PricingSelectMenuPlaygroundConfig): Section {
  return {
    id: 'appearance',
    label: 'Appearance',
    title: 'Appearance Settings',
    groups: [
      {
        title: 'Surface',
        controls: [
          {
            id: 'appearance.background',
            type: 'select',
            label: 'Background',
            value: config.appearance.background,
            options: BACKGROUND_OPTIONS.filter((o) => o.value !== 'none'),
          },
          {
            id: 'appearance.borderRadius',
            type: 'select',
            label: 'Border Radius',
            value: config.appearance.borderRadius,
            options: [...BORDER_RADIUS_OPTIONS],
          },
          {
            id: 'appearance.shadow',
            type: 'select',
            label: 'Shadow',
            value: config.appearance.shadow,
            options: [...SHADOW_OPTIONS],
          },
        ],
      },
      {
        title: 'Effects',
        controls: [
          {
            id: 'appearance.shine',
            type: 'select',
            label: 'Shine',
            value: config.appearance.shine,
            options: [...SHINE_OPTIONS],
          },
          {
            id: 'appearance.gradient',
            type: 'select',
            label: 'Gradient',
            value: config.appearance.gradient,
            options: [...GRADIENT_OPTIONS],
          },
          {
            id: 'appearance.gradientColor',
            type: 'select',
            label: 'Gradient Color',
            value: config.appearance.gradientColor,
            options: [...GRADIENT_COLOR_OPTIONS],
          },
          {
            id: 'appearance.squircle',
            type: 'toggle',
            label: 'Squircle Corners',
            value: config.appearance.squircle,
          },
        ],
      },
    ],
  }
}

function buildBottomSlotSection(config: PricingSelectMenuPlaygroundConfig): Section {
  return {
    id: 'bottomSlot',
    label: 'Menu Slot',
    title: 'Menu Slot Settings',
    groups: [
      {
        title: 'Behavior',
        controls: [
          {
            id: 'bottomSlot.enabled',
            type: 'toggle',
            label: 'Enabled',
            value: config.bottomSlot.enabled,
          },
          {
            id: 'bottomSlot.heightMode',
            type: 'select',
            label: 'Height Mode',
            value: config.bottomSlot.heightMode,
            options: [...HEIGHT_MODE_OPTIONS],
          },
          {
            id: 'bottomSlot.scrollable',
            type: 'toggle',
            label: 'Scrollable',
            value: config.bottomSlot.scrollable ?? true,
          },
        ],
      },
      {
        title: 'Style',
        controls: [
          {
            id: 'bottomSlot.background',
            type: 'select',
            label: 'Background',
            value: config.bottomSlot.background,
            options: [...BACKGROUND_OPTIONS],
          },
          {
            id: 'bottomSlot.borderRadius',
            type: 'slider',
            label: 'Border Radius',
            value: config.bottomSlot.borderRadius,
            min: 0,
            max: 24,
            step: 2,
          },
          {
            id: 'bottomSlot.inset',
            type: 'slider',
            label: 'Inset',
            value: config.bottomSlot.inset,
            min: 0,
            max: 12,
            step: 1,
          },
          {
            id: 'bottomSlot.borderWidth',
            type: 'slider',
            label: 'Border Width',
            value: config.bottomSlot.borderWidth,
            min: 0,
            max: 4,
            step: 1,
          },
          {
            id: 'bottomSlot.borderColor',
            type: 'select',
            label: 'Border Color',
            value: config.bottomSlot.borderColor,
            options: [...BORDER_COLOR_OPTIONS],
          },
        ],
      },
    ],
  }
}

function buildSelectMenuSection(config: PricingSelectMenuPlaygroundConfig): Section {
  return {
    id: 'selectMenu',
    label: 'Menu',
    title: 'Select Menu Settings',
    groups: [
      {
        title: 'Trigger',
        controls: [
          {
            id: 'selectMenu.showDropdownIcon',
            type: 'toggle',
            label: 'Show Dropdown Icon',
            value: config.selectMenu.showDropdownIcon,
          },
          {
            id: 'selectMenu.dropdownIconRotates',
            type: 'toggle',
            label: 'Icon Rotates',
            value: config.selectMenu.dropdownIconRotates,
          },
          {
            id: 'selectMenu.upgradeMode',
            type: 'toggle',
            label: 'Upgrade Mode',
            value: config.selectMenu.upgradeMode,
          },
          {
            id: 'selectMenu.triggerHoverBackground',
            type: 'select',
            label: 'Trigger Hover Background',
            value: config.selectMenu.triggerHoverBackground,
            options: [...BACKGROUND_OPTIONS],
          },
        ],
      },
      {
        title: 'Header',
        controls: [
          {
            id: 'selectMenu.showHeader',
            type: 'toggle',
            label: 'Show Header',
            value: config.selectMenu.showHeader,
          },
          {
            id: 'selectMenu.headerUppercase',
            type: 'toggle',
            label: 'Uppercase Header',
            value: config.selectMenu.headerUppercase,
          },
          {
            id: 'selectMenu.showSelectedIndicator',
            type: 'toggle',
            label: 'Show Selection Indicator',
            value: config.selectMenu.showSelectedIndicator,
          },
        ],
      },
      {
        title: 'Item Style',
        controls: [
          {
            id: 'selectMenu.itemHoverBackground',
            type: 'select',
            label: 'Item Hover Background',
            value: config.selectMenu.itemHoverBackground,
            options: [...BACKGROUND_OPTIONS],
          },
          {
            id: 'selectMenu.itemPaddingX',
            type: 'slider',
            label: 'Item Padding X',
            value: config.selectMenu.itemPaddingX,
            min: 4,
            max: 24,
            step: 2,
          },
          {
            id: 'selectMenu.itemPaddingY',
            type: 'slider',
            label: 'Item Padding Y',
            value: config.selectMenu.itemPaddingY,
            min: 4,
            max: 20,
            step: 2,
          },
          {
            id: 'selectMenu.itemBorderRadius',
            type: 'slider',
            label: 'Item Border Radius',
            value: config.selectMenu.itemBorderRadius,
            min: 0,
            max: 16,
            step: 2,
          },
          {
            id: 'selectMenu.itemGap',
            type: 'slider',
            label: 'Item Gap',
            value: config.selectMenu.itemGap,
            min: 0,
            max: 8,
            step: 1,
          },
        ],
      },
    ],
  }
}

function buildTypographySection(config: PricingSelectMenuPlaygroundConfig): Section {
  return {
    id: 'typography',
    label: 'Typography',
    title: 'Typography Settings',
    groups: [
      {
        title: 'Price Display',
        controls: [
          {
            id: 'selectMenu.triggerTypography.price.show',
            type: 'toggle',
            label: 'Show Price',
            value: config.selectMenu.triggerTypography.price.show,
          },
          {
            id: 'selectMenu.triggerTypography.price.fontSize',
            type: 'select',
            label: 'Price Font Size',
            value: config.selectMenu.triggerTypography.price.fontSize,
            options: [...FONT_SIZE_OPTIONS],
          },
          {
            id: 'selectMenu.triggerTypography.price.fontWeight',
            type: 'select',
            label: 'Price Font Weight',
            value: config.selectMenu.triggerTypography.price.fontWeight,
            options: [...FONT_WEIGHT_OPTIONS],
          },
        ],
      },
      {
        title: 'Price Suffix',
        controls: [
          {
            id: 'selectMenu.triggerTypography.priceSuffix.show',
            type: 'toggle',
            label: 'Show Price Suffix',
            value: config.selectMenu.triggerTypography.priceSuffix.show,
          },
          {
            id: 'selectMenu.triggerTypography.priceSuffix.fontSize',
            type: 'select',
            label: 'Suffix Font Size',
            value: config.selectMenu.triggerTypography.priceSuffix.fontSize,
            options: [...FONT_SIZE_OPTIONS],
          },
        ],
      },
      {
        title: 'Layout',
        controls: [
          {
            id: 'selectMenu.triggerTypography.priceRowAlign',
            type: 'select',
            label: 'Price Row Align',
            value: config.selectMenu.triggerTypography.priceRowAlign,
            options: [...VERTICAL_ALIGN_OPTIONS],
          },
          {
            id: 'selectMenu.triggerTypography.priceRowGap',
            type: 'slider',
            label: 'Price Row Gap',
            value: config.selectMenu.triggerTypography.priceRowGap,
            min: 0,
            max: 16,
            step: 2,
          },
          {
            id: 'selectMenu.triggerTypography.rowGap',
            type: 'slider',
            label: 'Row Gap',
            value: config.selectMenu.triggerTypography.rowGap,
            min: 0,
            max: 12,
            step: 1,
          },
        ],
      },
    ],
  }
}

function buildSyncedSubtextSection(config: PricingSelectMenuPlaygroundConfig): Section {
  return {
    id: 'syncedSubtext',
    label: 'Subtext',
    title: 'Synced Subtext Settings',
    groups: [
      {
        title: 'Behavior',
        controls: [
          {
            id: 'selectMenu.syncedSubtext.syncWithSelection',
            type: 'toggle',
            label: 'Sync with Selection',
            value: config.selectMenu.syncedSubtext.syncWithSelection,
          },
          {
            id: 'selectMenu.syncedSubtext.gap',
            type: 'slider',
            label: 'Gap',
            value: config.selectMenu.syncedSubtext.gap,
            min: 0,
            max: 12,
            step: 1,
          },
        ],
      },
      {
        title: 'Plan Name',
        controls: [
          {
            id: 'selectMenu.syncedSubtext.planName.show',
            type: 'toggle',
            label: 'Show Plan Name',
            value: config.selectMenu.syncedSubtext.planName.show,
          },
          {
            id: 'selectMenu.syncedSubtext.planName.displayMode',
            type: 'select',
            label: 'Display Mode',
            value: config.selectMenu.syncedSubtext.planName.displayMode,
            options: [...DISPLAY_MODE_OPTIONS],
          },
          {
            id: 'selectMenu.syncedSubtext.planName.fontSize',
            type: 'select',
            label: 'Font Size',
            value: config.selectMenu.syncedSubtext.planName.fontSize,
            options: [...FONT_SIZE_OPTIONS],
          },
        ],
      },
      {
        title: 'Credits',
        controls: [
          {
            id: 'selectMenu.syncedSubtext.credits.show',
            type: 'toggle',
            label: 'Show Credits',
            value: config.selectMenu.syncedSubtext.credits.show,
          },
          {
            id: 'selectMenu.syncedSubtext.credits.displayMode',
            type: 'select',
            label: 'Display Mode',
            value: config.selectMenu.syncedSubtext.credits.displayMode,
            options: [...DISPLAY_MODE_OPTIONS],
          },
          {
            id: 'selectMenu.syncedSubtext.credits.fontSize',
            type: 'select',
            label: 'Font Size',
            value: config.selectMenu.syncedSubtext.credits.fontSize,
            options: [...FONT_SIZE_OPTIONS],
          },
        ],
      },
    ],
  }
}

function buildMenuItemLabelSection(config: PricingSelectMenuPlaygroundConfig): Section {
  return {
    id: 'menuItemLabel',
    label: 'Item Label',
    title: 'Menu Item Label Settings',
    groups: [
      {
        title: 'Layout',
        controls: [
          {
            id: 'selectMenu.menuItemLabel.layout',
            type: 'select',
            label: 'Layout',
            value: config.selectMenu.menuItemLabel.layout,
            options: [...LABEL_LAYOUT_OPTIONS],
          },
          {
            id: 'selectMenu.menuItemLabel.gap',
            type: 'slider',
            label: 'Gap',
            value: config.selectMenu.menuItemLabel.gap,
            min: 0,
            max: 12,
            step: 1,
          },
        ],
      },
      {
        title: 'Plan Name',
        controls: [
          {
            id: 'selectMenu.menuItemLabel.planName.show',
            type: 'toggle',
            label: 'Show Plan Name',
            value: config.selectMenu.menuItemLabel.planName.show,
          },
          {
            id: 'selectMenu.menuItemLabel.planName.fontSize',
            type: 'select',
            label: 'Font Size',
            value: config.selectMenu.menuItemLabel.planName.fontSize,
            options: [...FONT_SIZE_OPTIONS],
          },
        ],
      },
      {
        title: 'Credits',
        controls: [
          {
            id: 'selectMenu.menuItemLabel.credits.show',
            type: 'toggle',
            label: 'Show Credits',
            value: config.selectMenu.menuItemLabel.credits.show,
          },
          {
            id: 'selectMenu.menuItemLabel.credits.fontSize',
            type: 'select',
            label: 'Font Size',
            value: config.selectMenu.menuItemLabel.credits.fontSize,
            options: [...FONT_SIZE_OPTIONS],
          },
        ],
      },
    ],
  }
}

function buildDemoSection(config: PricingSelectMenuPlaygroundConfig): Section {
  return {
    id: 'demo',
    label: 'Demo',
    title: 'Demo Settings',
    groups: [
      {
        title: 'Page',
        controls: [
          {
            id: 'demo.pageBackground',
            type: 'select',
            label: 'Page Background',
            value: config.demo.pageBackground,
            options: [...PAGE_BACKGROUND_OPTIONS],
          },
          {
            id: 'demo.showDebug',
            type: 'toggle',
            label: 'Show Debug',
            value: config.demo.showDebug,
          },
          {
            id: 'demo.slowMo',
            type: 'toggle',
            label: 'Slow Motion',
            value: config.demo.slowMo,
          },
        ],
      },
      {
        title: 'Container',
        controls: [
          {
            id: 'demo.debugContainer.enabled',
            type: 'toggle',
            label: 'Debug Container',
            value: config.demo.debugContainer.enabled,
          },
          {
            id: 'demo.debugContainer.showLines',
            type: 'toggle',
            label: 'Show Container Lines',
            value: config.demo.debugContainer.showLines,
          },
          {
            id: 'demo.debugContainer.width',
            type: 'slider',
            label: 'Container Width',
            value: config.demo.debugContainer.width,
            min: 300,
            max: 600,
            step: 10,
          },
          {
            id: 'demo.debugContainer.fixedHeight',
            type: 'toggle',
            label: 'Fixed Height',
            value: config.demo.debugContainer.fixedHeight,
          },
          {
            id: 'demo.debugContainer.height',
            type: 'slider',
            label: 'Container Height',
            value: config.demo.debugContainer.height,
            min: 200,
            max: 500,
            step: 10,
          },
          {
            id: 'demo.debugContainer.header.show',
            type: 'toggle',
            label: 'Show Header',
            value: config.demo.debugContainer.header.show,
          },
          {
            id: 'demo.debugContainer.header.text',
            type: 'text',
            label: 'Header Text',
            value: config.demo.debugContainer.header.text,
            placeholder: 'Upgrade fee',
          },
        ],
      },
    ],
  }
}

// ============================================================================
// MAIN EXPORT
// ============================================================================

export function getPanelSections(
  config: PricingSelectMenuPlaygroundConfig
): Section[] {
  return [
    buildLayoutSection(config),
    buildAnimationSection(config),
    buildAppearanceSection(config),
    buildBottomSlotSection(config),
    buildSelectMenuSection(config),
    buildTypographySection(config),
    buildSyncedSubtextSection(config),
    buildMenuItemLabelSection(config),
    buildDemoSection(config),
  ]
}
