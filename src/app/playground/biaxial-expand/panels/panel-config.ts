/**
 * Panel Configuration for BiaxialExpand Playground
 *
 * Modular builder for UnifiedControlPanel sections.
 */

import type { PanelConfig, Section } from '@/components/ui/patterns/control-panel'
import type { BiaxialExpandPlaygroundConfig, BiaxialExpandPresetMeta } from '../config/types'
import {
  DEMO_VARIANT_OPTIONS,
  PAGE_BACKGROUND_OPTIONS,
  BACKGROUND_OPTIONS,
  BORDER_COLOR_OPTIONS,
  BORDER_RADIUS_OPTIONS,
  SHADOW_OPTIONS,
  SHINE_OPTIONS,
  GRADIENT_PATTERN_OPTIONS,
  GRADIENT_COLOR_OPTIONS,
  BACKDROP_MODE_OPTIONS,
  EXPAND_ORIGIN_OPTIONS,
  EXPAND_ORIGIN_X_OPTIONS,
  POSITION_MODE_OPTIONS,
  HEIGHT_MODE_OPTIONS,
  SLOT_SHINE_OPTIONS,
  VERTICAL_ALIGN_OPTIONS,
  TEXT_COLOR_OPTIONS,
  FONT_WEIGHT_OPTIONS,
  FONT_SIZE_OPTIONS,
  OPACITY_OPTIONS,
  PRICE_ROW_ALIGN_OPTIONS,
  DISPLAY_MODE_OPTIONS,
  BADGE_COLOR_OPTIONS,
  LABEL_LAYOUT_OPTIONS,
  SEPARATOR_OPTIONS,
  TIER_OPTIONS,
  RIGHT_SOURCE_OPTIONS,
  HEADER_MODE_OPTIONS,
  VARIANT_TRANSITION_TYPE_OPTIONS,
} from '../config/options'

// ============================================================================
// MAIN BUILDER
// ============================================================================

export function buildBiaxialExpandPanelConfig(
  config: BiaxialExpandPlaygroundConfig,
  presets: BiaxialExpandPresetMeta[],
  activePresetId: string | null
): PanelConfig {
  // Build conditional sections
  const selectMenuSection = buildSelectMenuSection(config)
  const variantBSection = buildVariantBSection(config)

  return {
    sections: [
      buildDemoSection(config),
      ...(selectMenuSection ? [selectMenuSection] : []),
      ...(variantBSection ? [variantBSection] : []),
      buildLayoutSection(config),
      buildTriggerSection(config),
      buildAnimationSection(config),
      buildAppearanceSection(config),
      buildTopSlotSection(config),
      buildBottomSlotSection(config),
      buildLeftSlotSection(config),
      buildRightSlotSection(config),
      buildDebugSection(config),
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
// SECTION BUILDERS
// ============================================================================

function buildDemoSection(config: BiaxialExpandPlaygroundConfig): Section {
  return {
    id: 'demo',
    label: 'Demo',
    title: 'Demo Settings',
    groups: [
      {
        title: 'Variant',
        controls: [
          {
            id: 'demo.variant',
            type: 'select',
            label: 'Demo Type',
            value: config.demo.variant,
            options: [...DEMO_VARIANT_OPTIONS],
          },
          {
            id: 'demo.pageBackground',
            type: 'select',
            label: 'Page Background',
            value: config.demo.pageBackground,
            options: [...PAGE_BACKGROUND_OPTIONS],
          },
        ],
      },
    ],
  }
}

/**
 * Select Menu section - only shown for pricing-select variant
 */
function buildSelectMenuSection(config: BiaxialExpandPlaygroundConfig): Section | null {
  // Only show for pricing-select variant
  if (config.demo.variant !== 'pricing-select') return null

  return {
    id: 'selectMenu',
    label: 'Menu Items',
    title: 'Select Menu Styling',
    groups: [
      {
        title: 'Trigger',
        controls: [
          {
            id: 'selectMenu.showDropdownIcon',
            type: 'toggle',
            label: 'Dropdown Icon',
            value: config.selectMenu.showDropdownIcon,
          },
          ...(config.selectMenu.showDropdownIcon
            ? [
                {
                  id: 'selectMenu.dropdownIconRotates',
                  type: 'toggle' as const,
                  label: 'Rotate on Expand',
                  value: config.selectMenu.dropdownIconRotates,
                },
              ]
            : []),
        ],
      },
      {
        title: 'Trigger Padding (A)',
        controls: [
          {
            id: 'selectMenu.triggerPaddingX',
            type: 'slider',
            label: 'Padding X',
            value: config.selectMenu.triggerPaddingX,
            min: 0,
            max: 32,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'selectMenu.triggerPaddingTop',
            type: 'slider',
            label: 'Padding Top',
            value: config.selectMenu.triggerPaddingTop,
            min: 0,
            max: 32,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'selectMenu.triggerPaddingBottom',
            type: 'slider',
            label: 'Padding Bottom',
            value: config.selectMenu.triggerPaddingBottom,
            min: 0,
            max: 32,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Available Tiers',
        controls: TIER_OPTIONS.map((tier) => ({
          id: `selectMenu.availableTiers.${tier.value}`,
          type: 'toggle' as const,
          label: tier.label,
          value: config.selectMenu.availableTiers.includes(tier.value),
        })),
      },
      {
        title: 'Upgrade Mode',
        controls: [
          {
            id: 'selectMenu.upgradeMode',
            type: 'toggle',
            label: 'Upgrade Mode',
            value: config.selectMenu.upgradeMode,
          },
        ],
      },
      {
        title: 'Synced Subtext',
        controls: [
          {
            id: 'selectMenu.syncedSubtext.syncWithSelection',
            type: 'toggle',
            label: 'Sync with Selection',
            value: config.selectMenu.syncedSubtext.syncWithSelection,
          },
          ...(config.selectMenu.syncedSubtext.syncWithSelection
            ? [
                {
                  id: 'selectMenu.syncedSubtext.separator',
                  type: 'select' as const,
                  label: 'Separator',
                  value: config.selectMenu.syncedSubtext.separator,
                  options: [...SEPARATOR_OPTIONS],
                },
                {
                  id: 'selectMenu.syncedSubtext.gap',
                  type: 'slider' as const,
                  label: 'Gap',
                  value: config.selectMenu.syncedSubtext.gap,
                  min: 0,
                  max: 16,
                  step: 1,
                  formatLabel: (v: number) => `${v}px`,
                },
              ]
            : []),
        ],
      },
      // Subtext Plan Name styling - only show when synced
      ...(config.selectMenu.syncedSubtext.syncWithSelection
        ? [
            {
              title: 'Subtext: Plan Name',
              controls: [
                {
                  id: 'selectMenu.syncedSubtext.planName.show',
                  type: 'toggle' as const,
                  label: 'Show',
                  value: config.selectMenu.syncedSubtext.planName.show,
                },
                ...(config.selectMenu.syncedSubtext.planName.show
                  ? [
                      {
                        id: 'selectMenu.syncedSubtext.planName.displayMode',
                        type: 'select' as const,
                        label: 'Display',
                        value: config.selectMenu.syncedSubtext.planName.displayMode,
                        options: [...DISPLAY_MODE_OPTIONS],
                      },
                      {
                        id: 'selectMenu.syncedSubtext.planName.fontSize',
                        type: 'select' as const,
                        label: 'Size',
                        value: config.selectMenu.syncedSubtext.planName.fontSize,
                        options: [...FONT_SIZE_OPTIONS],
                      },
                      {
                        id: 'selectMenu.syncedSubtext.planName.fontWeight',
                        type: 'select' as const,
                        label: 'Weight',
                        value: config.selectMenu.syncedSubtext.planName.fontWeight,
                        options: [...FONT_WEIGHT_OPTIONS],
                      },
                      {
                        id: 'selectMenu.syncedSubtext.planName.textColor',
                        type: 'select' as const,
                        label: 'Color',
                        value: config.selectMenu.syncedSubtext.planName.textColor,
                        options: [...TEXT_COLOR_OPTIONS],
                      },
                      {
                        id: 'selectMenu.syncedSubtext.planName.opacity',
                        type: 'select' as const,
                        label: 'Opacity',
                        value: config.selectMenu.syncedSubtext.planName.opacity,
                        options: [...OPACITY_OPTIONS],
                      },
                      ...(config.selectMenu.syncedSubtext.planName.displayMode === 'badge'
                        ? [
                            {
                              id: 'selectMenu.syncedSubtext.planName.badgeColor',
                              type: 'select' as const,
                              label: 'Badge Color',
                              value: config.selectMenu.syncedSubtext.planName.badgeColor,
                              options: [...BADGE_COLOR_OPTIONS],
                            },
                          ]
                        : []),
                    ]
                  : []),
              ],
            },
            {
              title: 'Subtext: Credits',
              controls: [
                {
                  id: 'selectMenu.syncedSubtext.credits.show',
                  type: 'toggle' as const,
                  label: 'Show',
                  value: config.selectMenu.syncedSubtext.credits.show,
                },
                ...(config.selectMenu.syncedSubtext.credits.show
                  ? [
                      {
                        id: 'selectMenu.syncedSubtext.credits.displayMode',
                        type: 'select' as const,
                        label: 'Display',
                        value: config.selectMenu.syncedSubtext.credits.displayMode,
                        options: [...DISPLAY_MODE_OPTIONS],
                      },
                      {
                        id: 'selectMenu.syncedSubtext.credits.fontSize',
                        type: 'select' as const,
                        label: 'Size',
                        value: config.selectMenu.syncedSubtext.credits.fontSize,
                        options: [...FONT_SIZE_OPTIONS],
                      },
                      {
                        id: 'selectMenu.syncedSubtext.credits.fontWeight',
                        type: 'select' as const,
                        label: 'Weight',
                        value: config.selectMenu.syncedSubtext.credits.fontWeight,
                        options: [...FONT_WEIGHT_OPTIONS],
                      },
                      {
                        id: 'selectMenu.syncedSubtext.credits.textColor',
                        type: 'select' as const,
                        label: 'Color',
                        value: config.selectMenu.syncedSubtext.credits.textColor,
                        options: [...TEXT_COLOR_OPTIONS],
                      },
                      {
                        id: 'selectMenu.syncedSubtext.credits.opacity',
                        type: 'select' as const,
                        label: 'Opacity',
                        value: config.selectMenu.syncedSubtext.credits.opacity,
                        options: [...OPACITY_OPTIONS],
                      },
                      ...(config.selectMenu.syncedSubtext.credits.displayMode === 'badge'
                        ? [
                            {
                              id: 'selectMenu.syncedSubtext.credits.badgeColor',
                              type: 'select' as const,
                              label: 'Badge Color',
                              value: config.selectMenu.syncedSubtext.credits.badgeColor,
                              options: [...BADGE_COLOR_OPTIONS],
                            },
                          ]
                        : []),
                    ]
                  : []),
              ],
            },
          ]
        : []),
      {
        title: 'Header',
        controls: [
          {
            id: 'selectMenu.showHeader',
            type: 'toggle',
            label: 'Show Header',
            value: config.selectMenu.showHeader,
          },
          // Only show header styling controls when header is enabled
          ...(config.selectMenu.showHeader
            ? [
                {
                  id: 'selectMenu.headerLabel',
                  type: 'text' as const,
                  label: 'Text',
                  value: config.selectMenu.headerLabel,
                  placeholder: 'Header text...',
                },
                {
                  id: 'selectMenu.headerTextColor',
                  type: 'select' as const,
                  label: 'Color',
                  value: config.selectMenu.headerTextColor,
                  options: [...TEXT_COLOR_OPTIONS],
                },
                {
                  id: 'selectMenu.headerFontWeight',
                  type: 'select' as const,
                  label: 'Weight',
                  value: config.selectMenu.headerFontWeight,
                  options: [...FONT_WEIGHT_OPTIONS],
                },
                {
                  id: 'selectMenu.headerFontSize',
                  type: 'select' as const,
                  label: 'Size',
                  value: config.selectMenu.headerFontSize,
                  options: [...FONT_SIZE_OPTIONS],
                },
                {
                  id: 'selectMenu.headerOpacity',
                  type: 'select' as const,
                  label: 'Opacity',
                  value: config.selectMenu.headerOpacity,
                  options: [...OPACITY_OPTIONS],
                },
                {
                  id: 'selectMenu.headerUppercase',
                  type: 'toggle' as const,
                  label: 'Uppercase',
                  value: config.selectMenu.headerUppercase,
                },
                {
                  id: 'selectMenu.headerPaddingBottom',
                  type: 'slider' as const,
                  label: 'Bottom Padding',
                  value: config.selectMenu.headerPaddingBottom,
                  min: 0,
                  max: 24,
                  step: 2,
                  formatLabel: (v: number) => `${v}px`,
                },
              ]
            : []),
        ],
      },
      {
        title: 'Container',
        controls: [
          {
            id: 'selectMenu.containerPadding',
            type: 'slider',
            label: 'Padding',
            value: config.selectMenu.containerPadding,
            min: 0,
            max: 16,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Items',
        controls: [
          {
            id: 'selectMenu.itemPaddingX',
            type: 'slider',
            label: 'Padding X',
            value: config.selectMenu.itemPaddingX,
            min: 4,
            max: 24,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'selectMenu.itemPaddingY',
            type: 'slider',
            label: 'Padding Y',
            value: config.selectMenu.itemPaddingY,
            min: 4,
            max: 20,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'selectMenu.itemBorderRadius',
            type: 'slider',
            label: 'Border Radius',
            value: config.selectMenu.itemBorderRadius,
            min: 0,
            max: 16,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'selectMenu.itemGap',
            type: 'slider',
            label: 'Gap',
            value: config.selectMenu.itemGap,
            min: 0,
            max: 8,
            step: 1,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Background',
        controls: [
          {
            id: 'selectMenu.itemHoverBackground',
            type: 'select',
            label: 'Hover',
            value: config.selectMenu.itemHoverBackground,
            options: [...BACKGROUND_OPTIONS],
          },
        ],
      },
      {
        title: 'Selection',
        controls: [
          {
            id: 'selectMenu.showSelectedIndicator',
            type: 'toggle',
            label: 'Show Checkmark',
            value: config.selectMenu.showSelectedIndicator,
          },
        ],
      },
      {
        title: 'Trigger Label',
        controls: [
          {
            id: 'selectMenu.triggerTypography.label.show',
            type: 'toggle',
            label: 'Show',
            value: config.selectMenu.triggerTypography.label.show,
          },
          ...(config.selectMenu.triggerTypography.label.show
            ? [
                {
                  id: 'selectMenu.triggerTypography.label.text',
                  type: 'text' as const,
                  label: 'Text',
                  value: config.selectMenu.triggerTypography.label.text,
                  placeholder: 'Upgrade',
                },
                {
                  id: 'selectMenu.triggerTypography.label.fontSize',
                  type: 'select' as const,
                  label: 'Size',
                  value: config.selectMenu.triggerTypography.label.fontSize,
                  options: [...FONT_SIZE_OPTIONS],
                },
                {
                  id: 'selectMenu.triggerTypography.label.fontWeight',
                  type: 'select' as const,
                  label: 'Weight',
                  value: config.selectMenu.triggerTypography.label.fontWeight,
                  options: [...FONT_WEIGHT_OPTIONS],
                },
                {
                  id: 'selectMenu.triggerTypography.label.textColor',
                  type: 'select' as const,
                  label: 'Color',
                  value: config.selectMenu.triggerTypography.label.textColor,
                  options: [...TEXT_COLOR_OPTIONS],
                },
              ]
            : []),
        ],
      },
      {
        title: 'Trigger Price',
        controls: [
          {
            id: 'selectMenu.triggerTypography.price.show',
            type: 'toggle',
            label: 'Show',
            value: config.selectMenu.triggerTypography.price.show,
          },
          ...(config.selectMenu.triggerTypography.price.show
            ? [
                {
                  id: 'selectMenu.triggerTypography.price.prefix',
                  type: 'text' as const,
                  label: 'Prefix',
                  value: config.selectMenu.triggerTypography.price.prefix,
                  placeholder: '$',
                },
                {
                  id: 'selectMenu.triggerTypography.price.fontSize',
                  type: 'select' as const,
                  label: 'Size',
                  value: config.selectMenu.triggerTypography.price.fontSize,
                  options: [...FONT_SIZE_OPTIONS],
                },
                {
                  id: 'selectMenu.triggerTypography.price.fontWeight',
                  type: 'select' as const,
                  label: 'Weight',
                  value: config.selectMenu.triggerTypography.price.fontWeight,
                  options: [...FONT_WEIGHT_OPTIONS],
                },
                {
                  id: 'selectMenu.triggerTypography.price.textColor',
                  type: 'select' as const,
                  label: 'Color',
                  value: config.selectMenu.triggerTypography.price.textColor,
                  options: [...TEXT_COLOR_OPTIONS],
                },
              ]
            : []),
        ],
      },
      {
        title: 'Price Suffix',
        controls: [
          {
            id: 'selectMenu.triggerTypography.priceSuffix.show',
            type: 'toggle',
            label: 'Show',
            value: config.selectMenu.triggerTypography.priceSuffix.show,
          },
          ...(config.selectMenu.triggerTypography.priceSuffix.show
            ? [
                {
                  id: 'selectMenu.triggerTypography.priceSuffix.text',
                  type: 'text' as const,
                  label: 'Text',
                  value: config.selectMenu.triggerTypography.priceSuffix.text,
                  placeholder: 'per month',
                },
                {
                  id: 'selectMenu.triggerTypography.priceSuffix.fontSize',
                  type: 'select' as const,
                  label: 'Size',
                  value: config.selectMenu.triggerTypography.priceSuffix.fontSize,
                  options: [...FONT_SIZE_OPTIONS],
                },
                {
                  id: 'selectMenu.triggerTypography.priceSuffix.fontWeight',
                  type: 'select' as const,
                  label: 'Weight',
                  value: config.selectMenu.triggerTypography.priceSuffix.fontWeight,
                  options: [...FONT_WEIGHT_OPTIONS],
                },
                {
                  id: 'selectMenu.triggerTypography.priceSuffix.textColor',
                  type: 'select' as const,
                  label: 'Color',
                  value: config.selectMenu.triggerTypography.priceSuffix.textColor,
                  options: [...TEXT_COLOR_OPTIONS],
                },
                {
                  id: 'selectMenu.triggerTypography.priceSuffix.opacity',
                  type: 'select' as const,
                  label: 'Opacity',
                  value: config.selectMenu.triggerTypography.priceSuffix.opacity,
                  options: [...OPACITY_OPTIONS],
                },
              ]
            : []),
        ],
      },
      {
        title: 'Price Row Layout',
        controls: [
          {
            id: 'selectMenu.triggerTypography.priceRowAlign',
            type: 'select',
            label: 'Alignment',
            value: config.selectMenu.triggerTypography.priceRowAlign,
            options: [...PRICE_ROW_ALIGN_OPTIONS],
          },
          {
            id: 'selectMenu.triggerTypography.priceRowGap',
            type: 'slider',
            label: 'Gap',
            value: config.selectMenu.triggerTypography.priceRowGap,
            min: 0,
            max: 16,
            step: 1,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'selectMenu.triggerTypography.rowGap',
            type: 'slider',
            label: 'Row Gap',
            value: config.selectMenu.triggerTypography.rowGap,
            min: 0,
            max: 16,
            step: 1,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Trigger Subtext',
        controls: [
          {
            id: 'selectMenu.triggerTypography.subtext.show',
            type: 'toggle',
            label: 'Show',
            value: config.selectMenu.triggerTypography.subtext.show,
          },
          ...(config.selectMenu.triggerTypography.subtext.show
            ? [
                {
                  id: 'selectMenu.triggerTypography.subtext.text',
                  type: 'text' as const,
                  label: 'Text',
                  value: config.selectMenu.triggerTypography.subtext.text,
                  placeholder: 'Cancel anytime',
                },
                {
                  id: 'selectMenu.triggerTypography.subtext.fontSize',
                  type: 'select' as const,
                  label: 'Size',
                  value: config.selectMenu.triggerTypography.subtext.fontSize,
                  options: [...FONT_SIZE_OPTIONS],
                },
                {
                  id: 'selectMenu.triggerTypography.subtext.fontWeight',
                  type: 'select' as const,
                  label: 'Weight',
                  value: config.selectMenu.triggerTypography.subtext.fontWeight,
                  options: [...FONT_WEIGHT_OPTIONS],
                },
                {
                  id: 'selectMenu.triggerTypography.subtext.textColor',
                  type: 'select' as const,
                  label: 'Color',
                  value: config.selectMenu.triggerTypography.subtext.textColor,
                  options: [...TEXT_COLOR_OPTIONS],
                },
                {
                  id: 'selectMenu.triggerTypography.subtext.opacity',
                  type: 'select' as const,
                  label: 'Opacity',
                  value: config.selectMenu.triggerTypography.subtext.opacity,
                  options: [...OPACITY_OPTIONS],
                },
              ]
            : []),
        ],
      },
      {
        title: 'Item Label Layout',
        controls: [
          {
            id: 'selectMenu.menuItemLabel.layout',
            type: 'select',
            label: 'Layout',
            value: config.selectMenu.menuItemLabel.layout,
            options: [...LABEL_LAYOUT_OPTIONS],
          },
          ...(config.selectMenu.menuItemLabel.layout === 'inline'
            ? [
                {
                  id: 'selectMenu.menuItemLabel.separator',
                  type: 'select' as const,
                  label: 'Separator',
                  value: config.selectMenu.menuItemLabel.separator,
                  options: [...SEPARATOR_OPTIONS],
                },
              ]
            : []),
          {
            id: 'selectMenu.menuItemLabel.gap',
            type: 'slider',
            label: 'Gap',
            value: config.selectMenu.menuItemLabel.gap,
            min: 0,
            max: 16,
            step: 1,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Item: Plan Name',
        controls: [
          {
            id: 'selectMenu.menuItemLabel.planName.show',
            type: 'toggle',
            label: 'Show',
            value: config.selectMenu.menuItemLabel.planName.show,
          },
          ...(config.selectMenu.menuItemLabel.planName.show
            ? [
                {
                  id: 'selectMenu.menuItemLabel.planName.displayMode',
                  type: 'select' as const,
                  label: 'Display',
                  value: config.selectMenu.menuItemLabel.planName.displayMode,
                  options: [...DISPLAY_MODE_OPTIONS],
                },
                {
                  id: 'selectMenu.menuItemLabel.planName.fontSize',
                  type: 'select' as const,
                  label: 'Size',
                  value: config.selectMenu.menuItemLabel.planName.fontSize,
                  options: [...FONT_SIZE_OPTIONS],
                },
                {
                  id: 'selectMenu.menuItemLabel.planName.fontWeight',
                  type: 'select' as const,
                  label: 'Weight',
                  value: config.selectMenu.menuItemLabel.planName.fontWeight,
                  options: [...FONT_WEIGHT_OPTIONS],
                },
                {
                  id: 'selectMenu.menuItemLabel.planName.textColor',
                  type: 'select' as const,
                  label: 'Color',
                  value: config.selectMenu.menuItemLabel.planName.textColor,
                  options: [...TEXT_COLOR_OPTIONS],
                },
                {
                  id: 'selectMenu.menuItemLabel.planName.opacity',
                  type: 'select' as const,
                  label: 'Opacity',
                  value: config.selectMenu.menuItemLabel.planName.opacity,
                  options: [...OPACITY_OPTIONS],
                },
                ...(config.selectMenu.menuItemLabel.planName.displayMode === 'badge'
                  ? [
                      {
                        id: 'selectMenu.menuItemLabel.planName.badgeColor',
                        type: 'select' as const,
                        label: 'Badge Color',
                        value: config.selectMenu.menuItemLabel.planName.badgeColor,
                        options: [...BADGE_COLOR_OPTIONS],
                      },
                    ]
                  : []),
              ]
            : []),
        ],
      },
      {
        title: 'Item: Credits',
        controls: [
          {
            id: 'selectMenu.menuItemLabel.credits.show',
            type: 'toggle',
            label: 'Show',
            value: config.selectMenu.menuItemLabel.credits.show,
          },
          ...(config.selectMenu.menuItemLabel.credits.show
            ? [
                {
                  id: 'selectMenu.menuItemLabel.credits.displayMode',
                  type: 'select' as const,
                  label: 'Display',
                  value: config.selectMenu.menuItemLabel.credits.displayMode,
                  options: [...DISPLAY_MODE_OPTIONS],
                },
                {
                  id: 'selectMenu.menuItemLabel.credits.fontSize',
                  type: 'select' as const,
                  label: 'Size',
                  value: config.selectMenu.menuItemLabel.credits.fontSize,
                  options: [...FONT_SIZE_OPTIONS],
                },
                {
                  id: 'selectMenu.menuItemLabel.credits.fontWeight',
                  type: 'select' as const,
                  label: 'Weight',
                  value: config.selectMenu.menuItemLabel.credits.fontWeight,
                  options: [...FONT_WEIGHT_OPTIONS],
                },
                {
                  id: 'selectMenu.menuItemLabel.credits.textColor',
                  type: 'select' as const,
                  label: 'Color',
                  value: config.selectMenu.menuItemLabel.credits.textColor,
                  options: [...TEXT_COLOR_OPTIONS],
                },
                {
                  id: 'selectMenu.menuItemLabel.credits.opacity',
                  type: 'select' as const,
                  label: 'Opacity',
                  value: config.selectMenu.menuItemLabel.credits.opacity,
                  options: [...OPACITY_OPTIONS],
                },
                ...(config.selectMenu.menuItemLabel.credits.displayMode === 'badge'
                  ? [
                      {
                        id: 'selectMenu.menuItemLabel.credits.badgeColor',
                        type: 'select' as const,
                        label: 'Badge Color',
                        value: config.selectMenu.menuItemLabel.credits.badgeColor,
                        options: [...BADGE_COLOR_OPTIONS],
                      },
                    ]
                  : []),
              ]
            : []),
        ],
      },
      {
        title: 'Item Label (Legacy)',
        controls: [
          {
            id: 'selectMenu.itemTypography.label.fontSize',
            type: 'select',
            label: 'Size',
            value: config.selectMenu.itemTypography.label.fontSize,
            options: [...FONT_SIZE_OPTIONS],
          },
          {
            id: 'selectMenu.itemTypography.label.fontWeight',
            type: 'select',
            label: 'Weight',
            value: config.selectMenu.itemTypography.label.fontWeight,
            options: [...FONT_WEIGHT_OPTIONS],
          },
          {
            id: 'selectMenu.itemTypography.label.textColor',
            type: 'select',
            label: 'Color',
            value: config.selectMenu.itemTypography.label.textColor,
            options: [...TEXT_COLOR_OPTIONS],
          },
        ],
      },
      {
        title: 'Item Price',
        controls: [
          {
            id: 'selectMenu.itemTypography.price.fontSize',
            type: 'select',
            label: 'Size',
            value: config.selectMenu.itemTypography.price.fontSize,
            options: [...FONT_SIZE_OPTIONS],
          },
          {
            id: 'selectMenu.itemTypography.price.fontWeight',
            type: 'select',
            label: 'Weight',
            value: config.selectMenu.itemTypography.price.fontWeight,
            options: [...FONT_WEIGHT_OPTIONS],
          },
          {
            id: 'selectMenu.itemTypography.price.textColor',
            type: 'select',
            label: 'Color',
            value: config.selectMenu.itemTypography.price.textColor,
            options: [...TEXT_COLOR_OPTIONS],
          },
          {
            id: 'selectMenu.itemTypography.price.opacity',
            type: 'select',
            label: 'Opacity',
            value: config.selectMenu.itemTypography.price.opacity,
            options: [...OPACITY_OPTIONS],
          },
        ],
      },
    ],
  }
}

/**
 * Variant B section - only shown for pricing-select variant
 * Organized by slot: Trigger (plan row) and Bottom Slot (due row + subtext)
 */
function buildVariantBSection(config: BiaxialExpandPlaygroundConfig): Section | null {
  // Only show for pricing-select variant
  if (config.demo.variant !== 'pricing-select') return null

  const { variantB } = config

  return {
    id: 'variantB',
    label: 'Variant B',
    title: 'Pricing Select B Layout',
    groups: [
      // TRIGGER SECTION - Plan Row (Row 1)
      {
        title: 'Trigger: Plan Row',
        controls: [
          {
            id: 'variantB.trigger.planRow.show',
            type: 'toggle',
            label: 'Show',
            value: variantB.trigger.planRow.show,
          },
          ...(variantB.trigger.planRow.show
            ? [
                // Left side (plan name)
                {
                  id: 'variantB.trigger.planRow.leftFontSize',
                  type: 'select' as const,
                  label: 'Left Size',
                  value: variantB.trigger.planRow.leftFontSize,
                  options: [...FONT_SIZE_OPTIONS],
                },
                {
                  id: 'variantB.trigger.planRow.leftFontWeight',
                  type: 'select' as const,
                  label: 'Left Weight',
                  value: variantB.trigger.planRow.leftFontWeight,
                  options: [...FONT_WEIGHT_OPTIONS],
                },
                {
                  id: 'variantB.trigger.planRow.leftTextColor',
                  type: 'select' as const,
                  label: 'Left Color',
                  value: variantB.trigger.planRow.leftTextColor,
                  options: [...TEXT_COLOR_OPTIONS],
                },
                {
                  id: 'variantB.trigger.planRow.leftOpacity',
                  type: 'select' as const,
                  label: 'Left Opacity',
                  value: variantB.trigger.planRow.leftOpacity,
                  options: [...OPACITY_OPTIONS],
                },
                // Right side (events)
                {
                  id: 'variantB.trigger.planRow.rightSource',
                  type: 'select' as const,
                  label: 'Right Content',
                  value: variantB.trigger.planRow.rightSource,
                  options: [...RIGHT_SOURCE_OPTIONS],
                },
                {
                  id: 'variantB.trigger.planRow.rightFontSize',
                  type: 'select' as const,
                  label: 'Right Size',
                  value: variantB.trigger.planRow.rightFontSize,
                  options: [...FONT_SIZE_OPTIONS],
                },
                {
                  id: 'variantB.trigger.planRow.rightFontWeight',
                  type: 'select' as const,
                  label: 'Right Weight',
                  value: variantB.trigger.planRow.rightFontWeight,
                  options: [...FONT_WEIGHT_OPTIONS],
                },
                {
                  id: 'variantB.trigger.planRow.rightTextColor',
                  type: 'select' as const,
                  label: 'Right Color',
                  value: variantB.trigger.planRow.rightTextColor,
                  options: [...TEXT_COLOR_OPTIONS],
                },
                {
                  id: 'variantB.trigger.planRow.rightOpacity',
                  type: 'select' as const,
                  label: 'Right Opacity',
                  value: variantB.trigger.planRow.rightOpacity,
                  options: [...OPACITY_OPTIONS],
                },
              ]
            : []),
        ],
      },
      // Trigger Spacing
      {
        title: 'Trigger: Spacing (B)',
        controls: [
          {
            id: 'variantB.trigger.paddingX',
            type: 'slider',
            label: 'Padding X',
            value: variantB.trigger.paddingX,
            min: 0,
            max: 32,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'variantB.trigger.paddingTop',
            type: 'slider',
            label: 'Padding Top',
            value: variantB.trigger.paddingTop,
            min: 0,
            max: 32,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'variantB.trigger.paddingBottom',
            type: 'slider',
            label: 'Padding Bottom',
            value: variantB.trigger.paddingBottom,
            min: 0,
            max: 32,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      // BOTTOM SLOT SECTION - Due Row (Row 2)
      {
        title: 'Bottom: Due Row',
        controls: [
          {
            id: 'variantB.bottomSlot.dueRow.show',
            type: 'toggle',
            label: 'Show',
            value: variantB.bottomSlot.dueRow.show,
          },
          ...(variantB.bottomSlot.dueRow.show
            ? [
                {
                  id: 'variantB.bottomSlot.dueRow.leftText',
                  type: 'text' as const,
                  label: 'Left Text',
                  value: variantB.bottomSlot.dueRow.leftText,
                  placeholder: 'Due today',
                },
                {
                  id: 'variantB.bottomSlot.dueRow.leftFontSize',
                  type: 'select' as const,
                  label: 'Left Size',
                  value: variantB.bottomSlot.dueRow.leftFontSize,
                  options: [...FONT_SIZE_OPTIONS],
                },
                {
                  id: 'variantB.bottomSlot.dueRow.leftFontWeight',
                  type: 'select' as const,
                  label: 'Left Weight',
                  value: variantB.bottomSlot.dueRow.leftFontWeight,
                  options: [...FONT_WEIGHT_OPTIONS],
                },
                {
                  id: 'variantB.bottomSlot.dueRow.leftTextColor',
                  type: 'select' as const,
                  label: 'Left Color',
                  value: variantB.bottomSlot.dueRow.leftTextColor,
                  options: [...TEXT_COLOR_OPTIONS],
                },
                {
                  id: 'variantB.bottomSlot.dueRow.leftOpacity',
                  type: 'select' as const,
                  label: 'Left Opacity',
                  value: variantB.bottomSlot.dueRow.leftOpacity,
                  options: [...OPACITY_OPTIONS],
                },
                {
                  id: 'variantB.bottomSlot.dueRow.rightSource',
                  type: 'select' as const,
                  label: 'Right Content',
                  value: variantB.bottomSlot.dueRow.rightSource,
                  options: [...RIGHT_SOURCE_OPTIONS],
                },
                {
                  id: 'variantB.bottomSlot.dueRow.rightFontSize',
                  type: 'select' as const,
                  label: 'Right Size',
                  value: variantB.bottomSlot.dueRow.rightFontSize,
                  options: [...FONT_SIZE_OPTIONS],
                },
                {
                  id: 'variantB.bottomSlot.dueRow.rightFontWeight',
                  type: 'select' as const,
                  label: 'Right Weight',
                  value: variantB.bottomSlot.dueRow.rightFontWeight,
                  options: [...FONT_WEIGHT_OPTIONS],
                },
                {
                  id: 'variantB.bottomSlot.dueRow.rightTextColor',
                  type: 'select' as const,
                  label: 'Right Color',
                  value: variantB.bottomSlot.dueRow.rightTextColor,
                  options: [...TEXT_COLOR_OPTIONS],
                },
                {
                  id: 'variantB.bottomSlot.dueRow.rightOpacity',
                  type: 'select' as const,
                  label: 'Right Opacity',
                  value: variantB.bottomSlot.dueRow.rightOpacity,
                  options: [...OPACITY_OPTIONS],
                },
              ]
            : []),
        ],
      },
      // Bottom Slot - Subtext (Row 3)
      {
        title: 'Bottom: Subtext',
        controls: [
          {
            id: 'variantB.bottomSlot.subtext.show',
            type: 'toggle',
            label: 'Show',
            value: variantB.bottomSlot.subtext.show,
          },
          ...(variantB.bottomSlot.subtext.show
            ? [
                {
                  id: 'variantB.bottomSlot.subtext.template',
                  type: 'text' as const,
                  label: 'Template',
                  value: variantB.bottomSlot.subtext.template,
                  placeholder: 'Then {price}/mo. Cancel anytime.',
                },
                {
                  id: 'variantB.bottomSlot.subtext.fontSize',
                  type: 'select' as const,
                  label: 'Size',
                  value: variantB.bottomSlot.subtext.fontSize,
                  options: [...FONT_SIZE_OPTIONS],
                },
                {
                  id: 'variantB.bottomSlot.subtext.fontWeight',
                  type: 'select' as const,
                  label: 'Weight',
                  value: variantB.bottomSlot.subtext.fontWeight,
                  options: [...FONT_WEIGHT_OPTIONS],
                },
                {
                  id: 'variantB.bottomSlot.subtext.textColor',
                  type: 'select' as const,
                  label: 'Color',
                  value: variantB.bottomSlot.subtext.textColor,
                  options: [...TEXT_COLOR_OPTIONS],
                },
                {
                  id: 'variantB.bottomSlot.subtext.opacity',
                  type: 'select' as const,
                  label: 'Opacity',
                  value: variantB.bottomSlot.subtext.opacity,
                  options: [...OPACITY_OPTIONS],
                },
              ]
            : []),
        ],
      },
      // Bottom Slot - Spacing
      {
        title: 'Bottom: Spacing (B)',
        controls: [
          {
            id: 'variantB.bottomSlot.rowGap',
            type: 'slider',
            label: 'Row Gap',
            value: variantB.bottomSlot.rowGap,
            min: 0,
            max: 16,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'variantB.bottomSlot.paddingX',
            type: 'slider',
            label: 'Padding X',
            value: variantB.bottomSlot.paddingX,
            min: 0,
            max: 32,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'variantB.bottomSlot.paddingTop',
            type: 'slider',
            label: 'Padding Top',
            value: variantB.bottomSlot.paddingTop,
            min: 0,
            max: 32,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'variantB.bottomSlot.paddingBottom',
            type: 'slider',
            label: 'Padding Bottom',
            value: variantB.bottomSlot.paddingBottom,
            min: 0,
            max: 32,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      // Transition Animation (A ↔ B switch)
      {
        title: 'Transition',
        controls: [
          {
            id: 'variantB.transition.enabled',
            type: 'toggle',
            label: 'Enable Animation',
            value: variantB.transition.enabled,
          },
          // Only show animation controls when enabled
          ...(variantB.transition.enabled
            ? [
                {
                  id: 'variantB.transition.type',
                  type: 'select' as const,
                  label: 'Type',
                  value: variantB.transition.type,
                  options: [...VARIANT_TRANSITION_TYPE_OPTIONS],
                },
                {
                  id: 'variantB.transition.duration',
                  type: 'slider' as const,
                  label: 'Duration',
                  value: variantB.transition.duration,
                  min: 0.1,
                  max: 1.0,
                  step: 0.05,
                  formatLabel: (v: number) => `${v}s`,
                },
                // Only show bounce for spring type
                ...(variantB.transition.type === 'spring'
                  ? [
                      {
                        id: 'variantB.transition.bounce',
                        type: 'slider' as const,
                        label: 'Bounce',
                        value: variantB.transition.bounce,
                        min: 0,
                        max: 0.5,
                        step: 0.05,
                        formatLabel: (v: number) => `${v}`,
                      },
                    ]
                  : []),
                {
                  id: 'variantB.transition.yOffset',
                  type: 'slider' as const,
                  label: 'Y Offset',
                  value: variantB.transition.yOffset,
                  min: 0,
                  max: 20,
                  step: 1,
                  formatLabel: (v: number) => `${v}px`,
                },
              ]
            : []),
        ],
      },
      // Header
      {
        title: 'Header',
        controls: [
          {
            id: 'variantB.headerMode',
            type: 'select',
            label: 'Mode',
            value: variantB.headerMode,
            options: [...HEADER_MODE_OPTIONS],
          },
          ...(variantB.headerMode === 'separate'
            ? [
                {
                  id: 'variantB.headerText',
                  type: 'text' as const,
                  label: 'Text',
                  value: variantB.headerText,
                  placeholder: 'Upgrade fee',
                },
              ]
            : []),
        ],
      },
    ],
  }
}

function buildLayoutSection(config: BiaxialExpandPlaygroundConfig): Section {
  return {
    id: 'layout',
    label: 'Layout',
    title: 'Layout Configuration',
    groups: [
      {
        title: 'Panel',
        controls: [
          {
            id: 'layout.panelWidth',
            type: 'slider',
            label: 'Width',
            value: config.layout.panelWidth,
            min: 200,
            max: 800,
            step: 20,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'layout.borderRadius',
            type: 'slider',
            label: 'Border Radius',
            value: config.layout.borderRadius,
            min: 0,
            max: 40,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Positioning',
        controls: [
          {
            id: 'layout.expandOriginX',
            type: 'select',
            label: 'Horizontal Origin',
            value: config.layout.expandOriginX,
            options: [...EXPAND_ORIGIN_X_OPTIONS],
          },
          {
            id: 'layout.positionMode',
            type: 'select',
            label: 'Position Mode',
            value: config.layout.positionMode,
            options: [...POSITION_MODE_OPTIONS],
          },
        ],
      },
      {
        title: 'Heights',
        controls: [
          {
            id: 'layout.maxTopHeight',
            type: 'slider',
            label: 'Max Top',
            value: config.layout.maxTopHeight,
            min: 0,
            max: 400,
            step: 1,
            formatLabel: (v: number) => v === 0 ? 'None' : `${v}px`,
          },
          {
            id: 'layout.maxBottomHeight',
            type: 'slider',
            label: config.demo.variant === 'pricing-select' ? 'Max Bottom (A)' : 'Max Bottom',
            value: config.layout.maxBottomHeight,
            min: 0,
            max: 600,
            step: 1,
            formatLabel: (v: number) => v === 0 ? 'None' : `${v}px`,
          },
          // Show Max Bottom B slider only for pricing-select variant
          ...(config.demo.variant === 'pricing-select'
            ? [
                {
                  id: 'layout.maxBottomHeightB',
                  type: 'slider' as const,
                  label: 'Max Bottom (B)',
                  value: config.layout.maxBottomHeightB,
                  min: 0,
                  max: 600,
                  step: 1,
                  formatLabel: (v: number) => v === 0 ? 'None' : `${v}px`,
                },
              ]
            : []),
        ],
      },
      {
        title: 'Widths',
        controls: [
          {
            id: 'layout.maxLeftWidth',
            type: 'slider',
            label: 'Max Left',
            value: config.layout.maxLeftWidth,
            min: 0,
            max: 400,
            step: 20,
            formatLabel: (v: number) => v === 0 ? 'None' : `${v}px`,
          },
          {
            id: 'layout.maxRightWidth',
            type: 'slider',
            label: 'Max Right',
            value: config.layout.maxRightWidth,
            min: 0,
            max: 400,
            step: 20,
            formatLabel: (v: number) => v === 0 ? 'None' : `${v}px`,
          },
        ],
      },
      {
        title: 'Gaps',
        controls: [
          {
            id: 'layout.topGap',
            type: 'slider',
            label: 'Top Gap',
            value: config.layout.topGap,
            min: 0,
            max: 24,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'layout.bottomGap',
            type: 'slider',
            label: 'Bottom Gap',
            value: config.layout.bottomGap,
            min: 0,
            max: 24,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'layout.leftGap',
            type: 'slider',
            label: 'Left Gap',
            value: config.layout.leftGap,
            min: 0,
            max: 24,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'layout.rightGap',
            type: 'slider',
            label: 'Right Gap',
            value: config.layout.rightGap,
            min: 0,
            max: 24,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'layout.backdropTopOffset',
            type: 'slider',
            label: 'Backdrop Top Offset',
            value: config.layout.backdropTopOffset,
            min: 0,
            max: 20,
            step: 1,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
    ],
  }
}

function buildTriggerSection(config: BiaxialExpandPlaygroundConfig): Section {
  return {
    id: 'trigger',
    label: 'Trigger',
    title: 'Trigger Configuration',
    groups: [
      {
        title: 'Size',
        controls: [
          {
            id: 'layout.syncTriggerWidth',
            type: 'toggle',
            label: 'Sync to Panel Width',
            value: config.layout.syncTriggerWidth,
          },
          // Only show trigger width slider when not synced
          ...(!config.layout.syncTriggerWidth
            ? [
                {
                  id: 'layout.triggerWidth',
                  type: 'slider' as const,
                  label: 'Width',
                  value: config.layout.triggerWidth,
                  min: 120,
                  max: 600,
                  step: 10,
                  formatLabel: (v: number) => `${v}px`,
                },
              ]
            : []),
          {
            id: 'layout.triggerHeight',
            type: 'slider',
            label: config.demo.variant === 'pricing-select' ? 'Height (A)' : 'Height',
            value: config.layout.triggerHeight,
            min: 32,
            max: 100,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
          // Show Height B slider only for pricing-select variant
          ...(config.demo.variant === 'pricing-select'
            ? [
                {
                  id: 'layout.triggerHeightB',
                  type: 'slider' as const,
                  label: 'Height (B)',
                  value: config.layout.triggerHeightB,
                  min: 32,
                  max: 100,
                  step: 4,
                  formatLabel: (v: number) => `${v}px`,
                },
              ]
            : []),
        ],
      },
      {
        title: 'Collapsed Style',
        controls: [
          {
            id: 'trigger.collapsed.background',
            type: 'select',
            label: 'Background',
            value: config.trigger.collapsed.background,
            options: [...BACKGROUND_OPTIONS],
          },
          {
            id: 'trigger.collapsed.shine',
            type: 'select',
            label: 'Shine',
            value: config.trigger.collapsed.shine,
            options: [...SLOT_SHINE_OPTIONS],
          },
          {
            id: 'trigger.collapsed.borderRadius',
            type: 'slider',
            label: 'Border Radius',
            value: config.trigger.collapsed.borderRadius,
            min: 0,
            max: 24,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'trigger.collapsed.borderWidth',
            type: 'slider',
            label: 'Border Width',
            value: config.trigger.collapsed.borderWidth,
            min: 0,
            max: 4,
            step: 1,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'trigger.collapsed.borderColor',
            type: 'select',
            label: 'Border Color',
            value: config.trigger.collapsed.borderColor,
            options: [...BORDER_COLOR_OPTIONS],
          },
        ],
      },
      {
        title: 'Expanded Style',
        controls: [
          {
            id: 'trigger.expanded.background',
            type: 'select',
            label: 'Background',
            value: config.trigger.expanded.background,
            options: [...BACKGROUND_OPTIONS],
          },
          {
            id: 'trigger.expanded.shine',
            type: 'select',
            label: 'Shine',
            value: config.trigger.expanded.shine,
            options: [...SLOT_SHINE_OPTIONS],
          },
          {
            id: 'trigger.expanded.borderRadius',
            type: 'slider',
            label: 'Border Radius',
            value: config.trigger.expanded.borderRadius,
            min: 0,
            max: 24,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'trigger.expanded.borderWidth',
            type: 'slider',
            label: 'Border Width',
            value: config.trigger.expanded.borderWidth,
            min: 0,
            max: 4,
            step: 1,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'trigger.expanded.borderColor',
            type: 'select',
            label: 'Border Color',
            value: config.trigger.expanded.borderColor,
            options: [...BORDER_COLOR_OPTIONS],
          },
        ],
      },
    ],
  }
}

function buildAnimationSection(config: BiaxialExpandPlaygroundConfig): Section {
  return {
    id: 'animation',
    label: 'Animation',
    title: 'Animation Configuration',
    groups: [
      {
        title: 'Timing',
        controls: [
          {
            id: 'animation.duration',
            type: 'slider',
            label: 'Expand Duration',
            value: config.animation.duration,
            min: 100,
            max: 800,
            step: 25,
            formatLabel: (v: number) => `${v}ms`,
          },
          {
            id: 'animation.collapseDuration',
            type: 'slider',
            label: 'Collapse Duration',
            value: config.animation.collapseDuration,
            min: 50,
            max: 400,
            step: 25,
            formatLabel: (v: number) => `${v}ms`,
          },
        ],
      },
      {
        title: 'Content Fade',
        controls: [
          {
            id: 'animation.contentFadeDuration',
            type: 'slider',
            label: 'Duration',
            value: config.animation.contentFadeDuration,
            min: 0,
            max: 400,
            step: 25,
            formatLabel: (v: number) => v === 0 ? 'Off' : `${v}ms`,
          },
          {
            id: 'animation.contentFadeDelay',
            type: 'slider',
            label: 'Delay',
            value: config.animation.contentFadeDelay,
            min: 0,
            max: 200,
            step: 25,
            formatLabel: (v: number) => `${v}ms`,
          },
        ],
      },
      {
        title: 'Backdrop',
        controls: [
          {
            id: 'animation.backdropMode',
            type: 'select',
            label: 'Mode',
            value: config.animation.backdropMode,
            options: [...BACKDROP_MODE_OPTIONS],
          },
          {
            id: 'animation.backdropDelay',
            type: 'slider',
            label: 'Delay',
            value: config.animation.backdropDelay,
            min: 0,
            max: 200,
            step: 10,
            formatLabel: (v: number) => `${v}ms`,
          },
          {
            id: 'animation.backdropDurationOffset',
            type: 'slider',
            label: 'Duration Offset',
            value: config.animation.backdropDurationOffset,
            min: -200,
            max: 200,
            step: 25,
            formatLabel: (v: number) => `${v}ms`,
          },
        ],
      },
      {
        title: 'Slot Containers',
        controls: [
          {
            id: 'animation.animateSlotContainers',
            type: 'toggle',
            label: 'Animate',
            value: config.animation.animateSlotContainers,
          },
          {
            id: 'animation.slotContainerDelay',
            type: 'slider',
            label: 'Delay',
            value: config.animation.slotContainerDelay,
            min: 0,
            max: 200,
            step: 10,
            formatLabel: (v: number) => `${v}ms`,
          },
          {
            id: 'animation.slotContainerDurationOffset',
            type: 'slider',
            label: 'Duration Offset',
            value: config.animation.slotContainerDurationOffset,
            min: -200,
            max: 200,
            step: 25,
            formatLabel: (v: number) => `${v}ms`,
          },
        ],
      },
      {
        title: 'Expand Origin',
        controls: [
          {
            id: 'animation.expandOrigin',
            type: 'select',
            label: 'Bottom Slot',
            value: config.animation.expandOrigin,
            options: [...EXPAND_ORIGIN_OPTIONS],
          },
          {
            id: 'animation.topExpandOrigin',
            type: 'select',
            label: 'Top Slot',
            value: config.animation.topExpandOrigin,
            options: [...EXPAND_ORIGIN_OPTIONS],
          },
          {
            id: 'animation.leftExpandOrigin',
            type: 'select',
            label: 'Left Slot',
            value: config.animation.leftExpandOrigin,
            options: [...EXPAND_ORIGIN_X_OPTIONS],
          },
          {
            id: 'animation.rightExpandOrigin',
            type: 'select',
            label: 'Right Slot',
            value: config.animation.rightExpandOrigin,
            options: [...EXPAND_ORIGIN_X_OPTIONS],
          },
        ],
      },
    ],
  }
}

function buildAppearanceSection(config: BiaxialExpandPlaygroundConfig): Section {
  return {
    id: 'appearance',
    label: 'Style',
    title: 'Appearance',
    groups: [
      {
        title: 'Container',
        controls: [
          {
            id: 'appearance.background',
            type: 'select',
            label: 'Background',
            value: config.appearance.background,
            options: BACKGROUND_OPTIONS.filter(o => o.value !== 'none'),
          },
          {
            id: 'appearance.borderRadius',
            type: 'select',
            label: 'Border Radius',
            value: config.appearance.borderRadius,
            options: [...BORDER_RADIUS_OPTIONS],
          },
          {
            id: 'appearance.squircle',
            type: 'toggle',
            label: 'Squircle Corners',
            value: config.appearance.squircle,
          },
        ],
      },
      {
        title: 'Effects',
        controls: [
          {
            id: 'appearance.shadow',
            type: 'select',
            label: 'Shadow',
            value: config.appearance.shadow,
            options: [...SHADOW_OPTIONS],
          },
          {
            id: 'appearance.shine',
            type: 'select',
            label: 'Shine',
            value: config.appearance.shine,
            options: [...SHINE_OPTIONS],
          },
        ],
      },
      {
        title: 'Gradient',
        controls: [
          {
            id: 'appearance.gradient',
            type: 'select',
            label: 'Pattern',
            value: config.appearance.gradient,
            options: [...GRADIENT_PATTERN_OPTIONS],
          },
          {
            id: 'appearance.gradientColor',
            type: 'select',
            label: 'Color',
            value: config.appearance.gradientColor,
            options: [...GRADIENT_COLOR_OPTIONS],
          },
        ],
      },
    ],
  }
}

function buildTopSlotSection(config: BiaxialExpandPlaygroundConfig): Section {
  return {
    id: 'topSlot',
    label: 'Top Slot',
    title: 'Top Slot Configuration',
    groups: [
      {
        title: 'Enable',
        controls: [
          {
            id: 'topSlot.enabled',
            type: 'toggle',
            label: 'Enabled',
            value: config.topSlot.enabled,
          },
          {
            id: 'topSlot.drivesPanelHeight',
            type: 'toggle',
            label: 'Drives Panel Height',
            value: config.topSlot.drivesPanelHeight ?? false,
          },
        ],
      },
      {
        title: 'Size',
        controls: [
          {
            id: 'topSlot.heightMode',
            type: 'select',
            label: 'Height Mode',
            value: config.topSlot.heightMode,
            options: [...HEIGHT_MODE_OPTIONS],
          },
          {
            id: 'topSlot.height',
            type: 'slider',
            label: 'Height',
            value: config.topSlot.height,
            min: 32,
            max: 200,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Style',
        controls: [
          {
            id: 'topSlot.background',
            type: 'select',
            label: 'Background',
            value: config.topSlot.background,
            options: [...BACKGROUND_OPTIONS],
          },
          {
            id: 'topSlot.shine',
            type: 'select',
            label: 'Shine',
            value: config.topSlot.shine,
            options: [...SLOT_SHINE_OPTIONS],
          },
          {
            id: 'topSlot.borderRadius',
            type: 'slider',
            label: 'Border Radius',
            value: config.topSlot.borderRadius,
            min: 0,
            max: 24,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'topSlot.inset',
            type: 'slider',
            label: 'Inset',
            value: config.topSlot.inset,
            min: 0,
            max: 16,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Border',
        controls: [
          {
            id: 'topSlot.borderWidth',
            type: 'slider',
            label: 'Width',
            value: config.topSlot.borderWidth,
            min: 0,
            max: 4,
            step: 1,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'topSlot.borderColor',
            type: 'select',
            label: 'Color',
            value: config.topSlot.borderColor,
            options: [...BORDER_COLOR_OPTIONS],
          },
        ],
      },
    ],
  }
}

function buildBottomSlotSection(config: BiaxialExpandPlaygroundConfig): Section {
  return {
    id: 'bottomSlot',
    label: 'Bottom Slot',
    title: 'Bottom Slot Configuration',
    groups: [
      {
        title: 'Enable',
        controls: [
          {
            id: 'bottomSlot.enabled',
            type: 'toggle',
            label: 'Enabled',
            value: config.bottomSlot.enabled,
          },
          {
            id: 'bottomSlot.drivesPanelHeight',
            type: 'toggle',
            label: 'Drives Panel Height',
            value: config.bottomSlot.drivesPanelHeight ?? true,
          },
        ],
      },
      {
        title: 'Size',
        controls: [
          {
            id: 'bottomSlot.heightMode',
            type: 'select',
            label: 'Height Mode',
            value: config.bottomSlot.heightMode,
            options: [...HEIGHT_MODE_OPTIONS],
          },
          {
            id: 'bottomSlot.height',
            type: 'slider',
            label: 'Height',
            value: config.bottomSlot.height,
            min: 50,
            max: 400,
            step: 10,
            formatLabel: (v: number) => `${v}px`,
          },
          // Only show scrollable toggle when height is constrained (not auto mode)
          ...(config.bottomSlot.heightMode !== 'auto'
            ? [
                {
                  id: 'bottomSlot.scrollable',
                  type: 'toggle' as const,
                  label: 'Scrollable',
                  value: config.bottomSlot.scrollable ?? false,
                },
              ]
            : []),
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
            id: 'bottomSlot.shine',
            type: 'select',
            label: 'Shine',
            value: config.bottomSlot.shine,
            options: [...SLOT_SHINE_OPTIONS],
          },
          {
            id: 'bottomSlot.borderRadius',
            type: 'slider',
            label: 'Border Radius',
            value: config.bottomSlot.borderRadius,
            min: 0,
            max: 24,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'bottomSlot.inset',
            type: 'slider',
            label: 'Inset',
            value: config.bottomSlot.inset,
            min: 0,
            max: 16,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Border',
        controls: [
          {
            id: 'bottomSlot.borderWidth',
            type: 'slider',
            label: 'Width',
            value: config.bottomSlot.borderWidth,
            min: 0,
            max: 4,
            step: 1,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'bottomSlot.borderColor',
            type: 'select',
            label: 'Color',
            value: config.bottomSlot.borderColor,
            options: [...BORDER_COLOR_OPTIONS],
          },
        ],
      },
    ],
  }
}

function buildLeftSlotSection(config: BiaxialExpandPlaygroundConfig): Section {
  // Determine which height control to show
  const showDrivingHeight = config.leftSlot.drivesPanelHeight
  const showMaxHeight = !config.leftSlot.drivesPanelHeight && config.leftSlot.verticalAlign !== 'full'

  return {
    id: 'leftSlot',
    label: 'Left Slot',
    title: 'Left Slot Configuration',
    groups: [
      {
        title: 'Enable',
        controls: [
          {
            id: 'leftSlot.enabled',
            type: 'toggle',
            label: 'Enabled',
            value: config.leftSlot.enabled,
          },
          {
            id: 'leftSlot.drivesPanelHeight',
            type: 'toggle',
            label: 'Drives Panel Height',
            value: config.leftSlot.drivesPanelHeight ?? false,
          },
        ],
      },
      {
        title: 'Size',
        controls: [
          {
            id: 'layout.maxLeftWidth',
            type: 'slider',
            label: 'Width',
            value: config.layout.maxLeftWidth,
            min: 40,
            max: 400,
            step: 10,
            formatLabel: (v: number) => `${v}px`,
          },
          // Show Driving Height when driving panel height
          ...(showDrivingHeight
            ? [
                {
                  id: 'leftSlot.drivingHeight',
                  type: 'slider' as const,
                  label: 'Height',
                  value: config.leftSlot.drivingHeight ?? 200,
                  min: 50,
                  max: 500,
                  step: 10,
                  formatLabel: (v: number) => `${v}px`,
                },
              ]
            : []),
          // Show Max Height when NOT driving and NOT full align
          ...(showMaxHeight
            ? [
                {
                  id: 'leftSlot.maxHeight',
                  type: 'slider' as const,
                  label: 'Max Height',
                  value: config.leftSlot.maxHeight ?? 300,
                  min: 50,
                  max: 500,
                  step: 10,
                  formatLabel: (v: number) => `${v}px`,
                },
              ]
            : []),
        ],
      },
      {
        title: 'Alignment',
        controls: [
          {
            id: 'leftSlot.verticalAlign',
            type: 'select',
            label: 'Vertical Align',
            value: config.leftSlot.verticalAlign,
            options: [...VERTICAL_ALIGN_OPTIONS],
          },
        ],
      },
      {
        title: 'Style',
        controls: [
          {
            id: 'leftSlot.background',
            type: 'select',
            label: 'Background',
            value: config.leftSlot.background,
            options: [...BACKGROUND_OPTIONS],
          },
          {
            id: 'leftSlot.shine',
            type: 'select',
            label: 'Shine',
            value: config.leftSlot.shine,
            options: [...SLOT_SHINE_OPTIONS],
          },
          {
            id: 'leftSlot.borderRadius',
            type: 'slider',
            label: 'Border Radius',
            value: config.leftSlot.borderRadius,
            min: 0,
            max: 24,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'leftSlot.inset',
            type: 'slider',
            label: 'Inset',
            value: config.leftSlot.inset,
            min: 0,
            max: 16,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Border',
        controls: [
          {
            id: 'leftSlot.borderWidth',
            type: 'slider',
            label: 'Width',
            value: config.leftSlot.borderWidth,
            min: 0,
            max: 4,
            step: 1,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'leftSlot.borderColor',
            type: 'select',
            label: 'Color',
            value: config.leftSlot.borderColor,
            options: [...BORDER_COLOR_OPTIONS],
          },
        ],
      },
    ],
  }
}

function buildRightSlotSection(config: BiaxialExpandPlaygroundConfig): Section {
  // Determine which height control to show
  const showDrivingHeight = config.rightSlot.drivesPanelHeight
  const showMaxHeight = !config.rightSlot.drivesPanelHeight && config.rightSlot.verticalAlign !== 'full'

  return {
    id: 'rightSlot',
    label: 'Right Slot',
    title: 'Right Slot Configuration',
    groups: [
      {
        title: 'Enable',
        controls: [
          {
            id: 'rightSlot.enabled',
            type: 'toggle',
            label: 'Enabled',
            value: config.rightSlot.enabled,
          },
          {
            id: 'rightSlot.drivesPanelHeight',
            type: 'toggle',
            label: 'Drives Panel Height',
            value: config.rightSlot.drivesPanelHeight ?? false,
          },
        ],
      },
      {
        title: 'Size',
        controls: [
          {
            id: 'layout.maxRightWidth',
            type: 'slider',
            label: 'Width',
            value: config.layout.maxRightWidth,
            min: 40,
            max: 400,
            step: 10,
            formatLabel: (v: number) => `${v}px`,
          },
          // Show Driving Height when driving panel height
          ...(showDrivingHeight
            ? [
                {
                  id: 'rightSlot.drivingHeight',
                  type: 'slider' as const,
                  label: 'Height',
                  value: config.rightSlot.drivingHeight ?? 200,
                  min: 50,
                  max: 500,
                  step: 10,
                  formatLabel: (v: number) => `${v}px`,
                },
              ]
            : []),
          // Show Max Height when NOT driving and NOT full align
          ...(showMaxHeight
            ? [
                {
                  id: 'rightSlot.maxHeight',
                  type: 'slider' as const,
                  label: 'Max Height',
                  value: config.rightSlot.maxHeight ?? 300,
                  min: 50,
                  max: 500,
                  step: 10,
                  formatLabel: (v: number) => `${v}px`,
                },
              ]
            : []),
        ],
      },
      {
        title: 'Alignment',
        controls: [
          {
            id: 'rightSlot.verticalAlign',
            type: 'select',
            label: 'Vertical Align',
            value: config.rightSlot.verticalAlign,
            options: [...VERTICAL_ALIGN_OPTIONS],
          },
        ],
      },
      {
        title: 'Style',
        controls: [
          {
            id: 'rightSlot.background',
            type: 'select',
            label: 'Background',
            value: config.rightSlot.background,
            options: [...BACKGROUND_OPTIONS],
          },
          {
            id: 'rightSlot.shine',
            type: 'select',
            label: 'Shine',
            value: config.rightSlot.shine,
            options: [...SLOT_SHINE_OPTIONS],
          },
          {
            id: 'rightSlot.borderRadius',
            type: 'slider',
            label: 'Border Radius',
            value: config.rightSlot.borderRadius,
            min: 0,
            max: 24,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'rightSlot.inset',
            type: 'slider',
            label: 'Inset',
            value: config.rightSlot.inset,
            min: 0,
            max: 16,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Border',
        controls: [
          {
            id: 'rightSlot.borderWidth',
            type: 'slider',
            label: 'Width',
            value: config.rightSlot.borderWidth,
            min: 0,
            max: 4,
            step: 1,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'rightSlot.borderColor',
            type: 'select',
            label: 'Color',
            value: config.rightSlot.borderColor,
            options: [...BORDER_COLOR_OPTIONS],
          },
        ],
      },
    ],
  }
}

function buildDebugSection(config: BiaxialExpandPlaygroundConfig): Section {
  return {
    id: 'debug',
    label: 'Debug',
    title: 'Debug Options',
    groups: [
      {
        title: 'Animation',
        controls: [
          {
            id: 'demo.slowMo',
            type: 'toggle',
            label: 'Slow Motion (5x)',
            value: config.demo.slowMo,
          },
        ],
      },
      {
        title: 'Visibility',
        controls: [
          {
            id: 'demo.showDebug',
            type: 'toggle',
            label: 'Show Debug Outlines',
            value: config.demo.showDebug,
          },
        ],
      },
      {
        title: 'Debug Container',
        controls: [
          {
            id: 'demo.debugContainer.enabled',
            type: 'toggle',
            label: 'Show Container',
            value: config.demo.debugContainer.enabled,
          },
          // Show width/padding/showLines only when enabled
          ...(config.demo.debugContainer.enabled
            ? [
                {
                  id: 'demo.debugContainer.showLines',
                  type: 'toggle' as const,
                  label: 'Show Lines',
                  value: config.demo.debugContainer.showLines,
                },
                {
                  id: 'demo.debugContainer.width',
                  type: 'slider' as const,
                  label: 'Width',
                  value: config.demo.debugContainer.width,
                  min: 300,
                  max: 800,
                  step: 20,
                  formatLabel: (v: number) => `${v}px`,
                },
                {
                  id: 'demo.debugContainer.padding',
                  type: 'slider' as const,
                  label: 'Padding',
                  value: config.demo.debugContainer.padding,
                  min: 0,
                  max: 40,
                  step: 4,
                  formatLabel: (v: number) => `${v}px`,
                },
                {
                  id: 'demo.debugContainer.fixedHeight',
                  type: 'toggle' as const,
                  label: 'Fixed Height',
                  value: config.demo.debugContainer.fixedHeight,
                },
                ...(config.demo.debugContainer.fixedHeight
                  ? [
                      {
                        id: 'demo.debugContainer.height',
                        type: 'slider' as const,
                        label: 'Height',
                        value: config.demo.debugContainer.height,
                        min: 100,
                        max: 600,
                        step: 20,
                        formatLabel: (v: number) => `${v}px`,
                      },
                    ]
                  : []),
              ]
            : []),
        ],
      },
      // Container Header - only shown when debug container is enabled
      ...(config.demo.debugContainer.enabled
        ? [
            {
              title: 'Container Header',
              controls: [
                {
                  id: 'demo.debugContainer.header.show',
                  type: 'toggle' as const,
                  label: 'Show Header',
                  value: config.demo.debugContainer.header.show,
                },
                // Show header styling controls only when header is enabled
                ...(config.demo.debugContainer.header.show
                  ? [
                      {
                        id: 'demo.debugContainer.header.text',
                        type: 'text' as const,
                        label: 'Text',
                        value: config.demo.debugContainer.header.text,
                        placeholder: 'Select a plan',
                      },
                      {
                        id: 'demo.debugContainer.header.fontSize',
                        type: 'select' as const,
                        label: 'Font Size',
                        value: config.demo.debugContainer.header.fontSize,
                        options: [...FONT_SIZE_OPTIONS],
                      },
                      {
                        id: 'demo.debugContainer.header.fontWeight',
                        type: 'select' as const,
                        label: 'Font Weight',
                        value: config.demo.debugContainer.header.fontWeight,
                        options: [...FONT_WEIGHT_OPTIONS],
                      },
                      {
                        id: 'demo.debugContainer.header.textColor',
                        type: 'select' as const,
                        label: 'Text Color',
                        value: config.demo.debugContainer.header.textColor,
                        options: [...TEXT_COLOR_OPTIONS],
                      },
                      {
                        id: 'demo.debugContainer.header.opacity',
                        type: 'select' as const,
                        label: 'Opacity',
                        value: config.demo.debugContainer.header.opacity,
                        options: [...OPACITY_OPTIONS],
                      },
                      {
                        id: 'demo.debugContainer.header.marginBottom',
                        type: 'slider' as const,
                        label: 'Bottom Margin',
                        value: config.demo.debugContainer.header.marginBottom,
                        min: 0,
                        max: 32,
                        step: 2,
                        formatLabel: (v: number) => `${v}px`,
                      },
                    ]
                  : []),
              ],
            },
          ]
        : []),
    ],
  }
}
