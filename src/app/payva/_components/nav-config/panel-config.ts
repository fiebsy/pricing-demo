/**
 * Navigation Control Panel Configuration
 *
 * Defines the sections and controls for the UnifiedControlPanel.
 *
 * Structure:
 * - Site: Top-level container settings (content width, nav match)
 * - Page: Page-level settings (header, tabs, spacing)
 * - Nav: Navigation-specific controls (layout, logo, nav items, dropdown)
 */

import type { ReactNode } from 'react'
import type {
  PanelConfig,
  Section,
  SelectControl,
  ToggleControl,
  SliderControl,
  CustomControl,
  FontWeightSelectControl,
  ColorEnhancedSelectControl,
} from '@/components/ui/patterns/control-panel'
import type { FontWeightOption } from '@/components/ui/patterns/control-panel/tokens/typography'
import type { SemanticColorOption } from '@/components/ui/patterns/control-panel/tokens/colors'
import type { NavConfig } from './types'
import { NAV_PRESETS } from './presets'

interface UserNavPreset {
  id: string
  name: string
}

export interface NavPanelOptions {
  /** Render function for the reorderable nav items (Custom preset only) */
  renderNavItems?: () => ReactNode
  /** User-created nav item presets */
  userPresets?: UserNavPreset[]
}

// =============================================================================
// Enhanced Control Options
// =============================================================================

// Text size options - standard select (no visual preview needed)
const TEXT_SIZE_OPTIONS = [
  { label: 'XS', value: 'xs' },
  { label: 'SM', value: 'sm' },
  { label: 'Base', value: 'base' },
  { label: 'LG', value: 'lg' },
  { label: 'XL', value: 'xl' },
  { label: '2XL', value: '2xl' },
  { label: '3XL', value: '3xl' },
]

// Font weight options - uses font-weight-select with visual weight preview
const FONT_WEIGHT_OPTIONS: FontWeightOption[] = [
  { label: 'Normal', value: 'normal', weight: 400 },
  { label: 'Medium', value: 'medium', weight: 500 },
  { label: 'Semibold', value: 'semibold', weight: 600 },
  { label: 'Bold', value: 'bold', weight: 700 },
]

// Text color options - uses color-enhanced-select with color swatches
// Note: values must match TextColor type in types.ts
const TEXT_COLOR_OPTIONS: SemanticColorOption[] = [
  { label: 'Primary', value: 'primary', cssVar: '--text-color-primary', category: 'neutral' },
  { label: 'Secondary', value: 'secondary', cssVar: '--text-color-secondary', category: 'neutral' },
  { label: 'Tertiary', value: 'tertiary', cssVar: '--text-color-tertiary', category: 'neutral' },
  { label: 'Quaternary', value: 'quaternary', cssVar: '--text-color-quaternary', category: 'neutral' },
  { label: 'Brand', value: 'brand', cssVar: '--color-brand-500', category: 'brand' },
]

export function createNavPanelConfig(
  config: NavConfig,
  activePresetId?: string | null,
  options?: NavPanelOptions
): PanelConfig {
  const isCustomNavItems = config.navItemsPreset === 'custom'
  // =============================================================================
  // Section 1: Site
  // Top-level container settings affecting the entire site
  // =============================================================================
  const siteSection: Section = {
    id: 'site',
    label: 'Site',
    title: 'Site Settings',
    groups: [
      {
        controls: [
          {
            id: 'contentMaxWidth',
            type: 'select',
            label: 'Content Width',
            value: String(config.contentMaxWidth),
            options: [
              { label: '700px', value: '700' },
              { label: '800px', value: '800' },
              { label: '900px', value: '900' },
              { label: '1000px', value: '1000' },
              { label: '1100px', value: '1100' },
              { label: '1200px', value: '1200' },
              { label: '1400px', value: '1400' },
              { label: '1600px', value: '1600' },
              { label: 'Full', value: '9999' },
            ],
          } satisfies SelectControl,
          {
            id: 'navMatchContent',
            type: 'toggle',
            label: 'Nav Match Content',
            value: config.navMatchContent,
          } satisfies ToggleControl,
        ],
      },
    ],
  }

  // =============================================================================
  // Section 2: Page
  // Page-level settings including header and tabs
  // =============================================================================
  const pageSection: Section = {
    id: 'page',
    label: 'Page',
    title: 'Page Settings',
    groups: [
      {
        title: 'Header',
        controls: [
          {
            id: 'pageHeader.showTitle',
            type: 'toggle',
            label: 'Show Title',
            value: config.pageHeader.showTitle,
          } satisfies ToggleControl,
          {
            id: 'pageHeader.titleSize',
            type: 'select',
            label: 'Title Size',
            value: config.pageHeader.titleSize,
            options: [
              { label: 'LG', value: 'lg' },
              { label: 'XL', value: 'xl' },
              { label: '2XL', value: '2xl' },
              { label: '3XL', value: '3xl' },
            ],
            disabled: !config.pageHeader.showTitle,
          } satisfies SelectControl,
          {
            id: 'pageHeader.showDescription',
            type: 'toggle',
            label: 'Show Description',
            value: config.pageHeader.showDescription,
            disabled: !config.pageHeader.showTitle,
          } satisfies ToggleControl,
        ],
      },
      {
        title: 'Tabs',
        controls: [
          {
            id: 'tabBar.show',
            type: 'toggle',
            label: 'Show Tab Bar',
            value: config.tabBar.show,
          } satisfies ToggleControl,
          {
            id: 'tabBar.indicatorStyle',
            type: 'select',
            label: 'Indicator Style',
            value: config.tabBar.indicatorStyle,
            options: [
              { label: 'Underline', value: 'underline' },
              { label: 'Pill', value: 'pill' },
              { label: 'None', value: 'none' },
            ],
            disabled: !config.tabBar.show,
          } satisfies SelectControl,
          {
            id: 'tabBar.gap',
            type: 'select',
            label: 'Tab Gap',
            value: config.tabBar.gap,
            options: [
              { label: 'Small', value: 'sm' },
              { label: 'Medium', value: 'md' },
              { label: 'Large', value: 'lg' },
            ],
            disabled: !config.tabBar.show,
          } satisfies SelectControl,
          {
            id: 'tabBar.showContainerBorder',
            type: 'toggle',
            label: 'Container Border',
            value: config.tabBar.showContainerBorder,
            disabled: !config.tabBar.show || config.tabBar.indicatorStyle !== 'underline',
          } satisfies ToggleControl,
          {
            id: 'tabBar.showHoverBackground',
            type: 'toggle',
            label: 'Hover Background',
            value: config.tabBar.showHoverBackground,
            disabled: !config.tabBar.show,
          } satisfies ToggleControl,
          {
            id: 'tabBar.showActiveBackground',
            type: 'toggle',
            label: 'Active Background',
            value: config.tabBar.showActiveBackground,
            disabled: !config.tabBar.show || config.tabBar.indicatorStyle !== 'pill',
          } satisfies ToggleControl,
        ],
      },
      {
        title: 'Tab Text',
        controls: [
          {
            id: 'tabBar.textSize',
            type: 'select',
            label: 'Size',
            value: config.tabBar.textSize,
            options: TEXT_SIZE_OPTIONS,
            disabled: !config.tabBar.show,
          } satisfies SelectControl,
          {
            id: 'tabBar.textWeight',
            type: 'font-weight-select',
            label: 'Weight',
            value: config.tabBar.textWeight,
            options: FONT_WEIGHT_OPTIONS,
            disabled: !config.tabBar.show,
          } satisfies FontWeightSelectControl,
        ],
      },
      {
        title: 'Tab Default Color',
        controls: [
          {
            id: 'tabBar.textColor',
            type: 'color-enhanced-select',
            label: 'Color',
            value: config.tabBar.textColor,
            options: TEXT_COLOR_OPTIONS,
            showGroups: false,
            disabled: !config.tabBar.show,
          } satisfies ColorEnhancedSelectControl,
          {
            id: 'tabBar.textOpacity',
            type: 'slider',
            label: 'Opacity',
            value: config.tabBar.textOpacity,
            min: 0,
            max: 100,
            step: 5,
            formatLabel: (v) => `${v}%`,
            disabled: !config.tabBar.show,
          } satisfies SliderControl,
        ],
      },
      {
        title: 'Tab Active Color',
        controls: [
          {
            id: 'tabBar.activeColor',
            type: 'color-enhanced-select',
            label: 'Color',
            value: config.tabBar.activeColor,
            options: TEXT_COLOR_OPTIONS,
            showGroups: false,
            disabled: !config.tabBar.show,
          } satisfies ColorEnhancedSelectControl,
          {
            id: 'tabBar.activeOpacity',
            type: 'slider',
            label: 'Opacity',
            value: config.tabBar.activeOpacity,
            min: 0,
            max: 100,
            step: 5,
            formatLabel: (v) => `${v}%`,
            disabled: !config.tabBar.show,
          } satisfies SliderControl,
        ],
      },
      {
        title: 'Tab Position',
        controls: [
          {
            id: 'pageHeader.tabBarPosition',
            type: 'select',
            label: 'Position',
            value: config.pageHeader.tabBarPosition,
            options: [
              { label: 'Above Metrics', value: 'above-metrics' },
              { label: 'Below Metrics', value: 'below-metrics' },
            ],
          } satisfies SelectControl,
        ],
      },
      {
        title: 'Spacing',
        controls: [
          {
            id: 'pageHeader.topSpacing',
            type: 'slider',
            label: 'Top Spacing',
            value: config.pageHeader.topSpacing,
            min: 0,
            max: 64,
            step: 4,
            formatLabel: (v) => `${v}px`,
          } satisfies SliderControl,
          {
            id: 'pageHeader.bottomSpacing',
            type: 'slider',
            label: 'Bottom Spacing',
            value: config.pageHeader.bottomSpacing,
            min: 0,
            max: 64,
            step: 4,
            formatLabel: (v) => `${v}px`,
          } satisfies SliderControl,
        ],
      },
    ],
  }

  // =============================================================================
  // Section 3: Nav
  // Navigation-specific controls grouped together
  // =============================================================================
  const navSection: Section = {
    id: 'nav',
    label: 'Nav',
    title: 'Navigation Settings',
    groups: [
      {
        title: 'Layout',
        controls: [
          {
            id: 'navLayout',
            type: 'select',
            label: 'Nav Layout',
            value: config.navLayout,
            options: [
              { label: 'Inline', value: 'inline' },
              { label: 'Stacked', value: 'stacked' },
            ],
          } satisfies SelectControl,
          {
            id: 'showBorder',
            type: 'toggle',
            label: 'Bottom Border',
            value: config.showBorder,
          } satisfies ToggleControl,
          {
            id: 'navHeight',
            type: 'slider',
            label: 'Nav Height',
            value: config.navHeight,
            min: 40,
            max: 200,
            step: 4,
            formatLabel: (v) => `${v}px`,
          } satisfies SliderControl,
          {
            id: 'logoNavGap',
            type: 'slider',
            label: 'Logo-Nav Gap',
            value: config.logoNavGap,
            min: 0,
            max: 32,
            step: 2,
            formatLabel: (v) => `${v}px`,
            disabled: config.navLayout !== 'stacked',
          } satisfies SliderControl,
          {
            id: 'pageTopGap',
            type: 'slider',
            label: 'Page Top Gap',
            value: config.pageTopGap,
            min: 0,
            max: 200,
            step: 4,
            formatLabel: (v) => `${v}px`,
          } satisfies SliderControl,
          {
            id: 'searchPosition',
            type: 'select',
            label: 'Search Position',
            value: config.searchPosition,
            options: [
              { label: 'Center', value: 'center' },
              { label: 'Right', value: 'right' },
              { label: 'Hidden', value: 'hidden' },
            ],
          } satisfies SelectControl,
        ],
      },
      {
        title: 'Mode',
        controls: [
          {
            id: 'navMode',
            type: 'select',
            label: 'Nav Mode',
            value: config.navMode,
            options: [
              { label: 'Flat', value: 'flat' },
              { label: 'Grouped', value: 'grouped' },
            ],
          } satisfies SelectControl,
          {
            id: 'subNavStyle',
            type: 'select',
            label: 'Sub-nav Style',
            value: config.subNavStyle,
            options: [
              { label: 'Dropdown', value: 'dropdown' },
              { label: 'Tabs', value: 'tabs' },
              { label: 'None', value: 'none' },
            ],
          } satisfies SelectControl,
        ],
      },
      {
        title: 'Nav Items',
        controls: [
          {
            id: 'navItemsPreset',
            type: 'select',
            label: 'Preset',
            value: config.navItemsPreset,
            options: [
              { label: 'Default', value: 'default' },
              { label: 'Minimal', value: 'minimal' },
              { label: 'Expanded', value: 'expanded' },
              { label: 'Custom', value: 'custom' },
              // Add user-created presets
              ...(options?.userPresets?.map((preset) => ({
                label: preset.name,
                value: preset.id,
              })) ?? []),
            ],
          } satisfies SelectControl,
          // Show reorderable items only when Custom is selected
          ...(isCustomNavItems && options?.renderNavItems
            ? [
                {
                  id: 'navItemsReorderable',
                  type: 'custom',
                  label: 'Items',
                  render: options.renderNavItems,
                } satisfies CustomControl,
              ]
            : []),
        ],
      },
      {
        title: 'Logo Image',
        controls: [
          {
            id: 'showLogoImage',
            type: 'toggle',
            label: 'Show Image',
            value: config.showLogoImage,
          } satisfies ToggleControl,
          {
            id: 'logoImageSize',
            type: 'select',
            label: 'Size',
            value: config.logoImageSize,
            options: [
              { label: 'XS', value: 'xs' },
              { label: 'SM', value: 'sm' },
              { label: 'MD', value: 'md' },
              { label: 'LG', value: 'lg' },
            ],
            disabled: !config.showLogoImage,
          } satisfies SelectControl,
          {
            id: 'logoImageRadius',
            type: 'select',
            label: 'Radius',
            value: config.logoImageRadius,
            options: [
              { label: 'None', value: 'none' },
              { label: 'SM', value: 'sm' },
              { label: 'MD', value: 'md' },
              { label: 'LG', value: 'lg' },
              { label: 'Full', value: 'full' },
            ],
            disabled: !config.showLogoImage,
          } satisfies SelectControl,
          {
            id: 'logoImageSquircle',
            type: 'toggle',
            label: 'Squircle',
            value: config.logoImageSquircle,
            disabled: !config.showLogoImage,
          } satisfies ToggleControl,
        ],
      },
      {
        title: 'Logo Text',
        controls: [
          {
            id: 'logoText.size',
            type: 'select',
            label: 'Size',
            value: config.logoText.size,
            options: TEXT_SIZE_OPTIONS,
          } satisfies SelectControl,
          {
            id: 'logoText.weight',
            type: 'font-weight-select',
            label: 'Weight',
            value: config.logoText.weight,
            options: FONT_WEIGHT_OPTIONS,
          } satisfies FontWeightSelectControl,
          {
            id: 'logoText.color',
            type: 'color-enhanced-select',
            label: 'Color',
            value: config.logoText.color,
            options: TEXT_COLOR_OPTIONS,
            showGroups: false,
          } satisfies ColorEnhancedSelectControl,
          {
            id: 'logoText.opacity',
            type: 'slider',
            label: 'Opacity',
            value: config.logoText.opacity,
            min: 0,
            max: 100,
            step: 5,
            formatLabel: (v) => `${v}%`,
          } satisfies SliderControl,
        ],
      },
      {
        title: 'Nav Item Style',
        controls: [
          {
            id: 'navItemSize',
            type: 'select',
            label: 'Size',
            value: config.navItemSize,
            options: TEXT_SIZE_OPTIONS,
          } satisfies SelectControl,
          {
            id: 'navItemWeight',
            type: 'font-weight-select',
            label: 'Weight',
            value: config.navItemWeight,
            options: FONT_WEIGHT_OPTIONS,
          } satisfies FontWeightSelectControl,
        ],
      },
      {
        title: 'Nav Item Default',
        controls: [
          {
            id: 'navItemColor',
            type: 'color-enhanced-select',
            label: 'Color',
            value: config.navItemColor,
            options: TEXT_COLOR_OPTIONS,
            showGroups: false,
          } satisfies ColorEnhancedSelectControl,
          {
            id: 'navItemOpacity',
            type: 'slider',
            label: 'Opacity',
            value: config.navItemOpacity,
            min: 0,
            max: 100,
            step: 5,
            formatLabel: (v) => `${v}%`,
          } satisfies SliderControl,
        ],
      },
      {
        title: 'Nav Item Active',
        controls: [
          {
            id: 'navItemActiveColor',
            type: 'color-enhanced-select',
            label: 'Color',
            value: config.navItemActiveColor,
            options: TEXT_COLOR_OPTIONS,
            showGroups: false,
          } satisfies ColorEnhancedSelectControl,
          {
            id: 'navItemActiveOpacity',
            type: 'slider',
            label: 'Opacity',
            value: config.navItemActiveOpacity,
            min: 0,
            max: 100,
            step: 5,
            formatLabel: (v) => `${v}%`,
          } satisfies SliderControl,
        ],
      },
      {
        title: 'Nav Item Background',
        controls: [
          {
            id: 'showNavItemHoverBackground',
            type: 'toggle',
            label: 'Hover Background',
            value: config.showNavItemHoverBackground,
          } satisfies ToggleControl,
          {
            id: 'showNavItemActiveBackground',
            type: 'toggle',
            label: 'Active Background',
            value: config.showNavItemActiveBackground,
          } satisfies ToggleControl,
        ],
      },
      {
        title: 'Dropdown',
        controls: [
          {
            id: 'showDropdownIcon',
            type: 'toggle',
            label: 'Show Arrow Icon',
            value: config.showDropdownIcon,
          } satisfies ToggleControl,
          {
            id: 'dropdownIconSize',
            type: 'select',
            label: 'Icon Size',
            value: config.dropdownIconSize,
            options: [
              { label: 'Small', value: 'sm' },
              { label: 'Medium', value: 'md' },
              { label: 'Large', value: 'lg' },
            ],
            disabled: !config.showDropdownIcon,
          } satisfies SelectControl,
        ],
      },
    ],
  }

  return {
    sections: [siteSection, pageSection, navSection],
    title: 'Nav Experiment',
    minimizedTitle: 'Nav',
    showReset: true,
    resetLabel: 'Reset',
    position: {
      top: '72px',
      bottom: '16px',
      right: '16px',
      width: '240px',
    },
    presetConfig: {
      presets: NAV_PRESETS,
      activePresetId: activePresetId ?? null,
      showCopyButton: true,
      copyLabel: 'Copy Config',
    },
  }
}
