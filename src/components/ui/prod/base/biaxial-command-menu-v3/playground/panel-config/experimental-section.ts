/**
 * Biaxial Command Menu V3 - Experimental Section Config
 *
 * Controls for experimental features like the top section that expands upward.
 * Includes animation sync controls matching menu container behavior.
 */

import type { Section } from '@/components/ui/prod/base/control-panel'
import type { PlaygroundState } from '../types'
import { AREA_BACKGROUND_OPTIONS, SHINE_OPTIONS } from '../options'

const BORDER_COLOR_OPTIONS = [
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Tertiary', value: 'tertiary' },
  { label: 'Quaternary', value: 'quaternary' },
  { label: 'Brand', value: 'brand' },
] as const

const TOP_SECTION_CONTENT_OPTIONS = [
  { label: 'Actions', value: 'actions' },
  { label: 'Breadcrumbs', value: 'breadcrumbs' },
  { label: 'Custom', value: 'custom' },
] as const

export function buildExperimentalSection(state: PlaygroundState): Section {
  const isEnabled = state.config.experimentalTopSection ?? false

  return {
    id: 'experimental',
    label: 'Top Section',
    title: 'Top Section (Experimental)',
    groups: [
      {
        title: 'Enable',
        controls: [
          {
            id: 'config.experimentalTopSection',
            label: 'Enable Top Section',
            type: 'toggle',
            value: state.config.experimentalTopSection ?? false,
            description: 'Expands upward above the search input',
          },
        ],
      },
      {
        title: 'Animation Sync',
        controls: [
          {
            id: 'config.topSectionDelay',
            label: 'Delay',
            type: 'slider',
            value: state.config.topSectionDelay ?? 0,
            min: -100,
            max: 150,
            step: 10,
            formatLabel: (v: number) => `${v}ms`,
            disabled: !isEnabled,
          },
          {
            id: 'config.topSectionDurationOffset',
            label: 'Duration Offset',
            type: 'slider',
            value: state.config.topSectionDurationOffset ?? 0,
            min: -100,
            max: 200,
            step: 10,
            formatLabel: (v: number) => `${v > 0 ? '+' : ''}${v}ms`,
            disabled: !isEnabled,
          },
        ],
      },
      {
        title: 'Size',
        controls: [
          {
            id: 'config.topSectionHeight',
            label: 'Height',
            type: 'slider',
            value: state.config.topSectionHeight ?? 48,
            min: 32,
            max: 120,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
            disabled: !isEnabled,
          },
          {
            id: 'config.topSectionBottomOffset',
            label: 'Bottom Offset',
            type: 'slider',
            value: state.config.topSectionBottomOffset ?? 0,
            min: 0,
            max: 24,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
            description: 'Gap between top section and search input',
            disabled: !isEnabled,
          },
          {
            id: 'config.topSectionInset',
            label: 'Inset',
            type: 'slider',
            value: state.config.topSectionInset ?? state.config.menuContainerInset,
            min: 0,
            max: 12,
            step: 1,
            formatLabel: (v: number) => `${v}px`,
            disabled: !isEnabled,
          },
        ],
      },
      {
        title: 'Appearance',
        controls: [
          {
            id: 'config.topSectionBackground',
            label: 'Background',
            type: 'select',
            value: state.config.topSectionBackground ?? state.config.menuBackground ?? 'secondary',
            options: [...AREA_BACKGROUND_OPTIONS],
            disabled: !isEnabled,
          },
          {
            id: 'config.topSectionShine',
            label: 'Shine',
            type: 'select',
            value: state.config.topSectionShine ?? 'none',
            options: [...SHINE_OPTIONS],
            disabled: !isEnabled,
          },
          {
            id: 'config.topSectionBorderRadius',
            label: 'Border Radius',
            type: 'slider',
            value: state.config.topSectionBorderRadius ?? 14,
            min: 0,
            max: 24,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
            disabled: !isEnabled,
          },
          {
            id: 'config.topSectionBorderWidth',
            label: 'Border Width',
            type: 'slider',
            value: state.config.topSectionBorderWidth ?? state.config.menuBorderWidth ?? 1,
            min: 0,
            max: 4,
            step: 0.5,
            formatLabel: (v: number) => `${v}px`,
            disabled: !isEnabled,
          },
          {
            id: 'config.topSectionBorderColor',
            label: 'Border Color',
            type: 'select',
            value: state.config.topSectionBorderColor ?? state.config.menuBorderColor ?? 'primary',
            options: [...BORDER_COLOR_OPTIONS],
            disabled: !isEnabled,
          },
        ],
      },
      {
        title: 'Content',
        controls: [
          {
            id: 'config.topSectionContent',
            label: 'Content Type',
            type: 'select',
            value: state.config.topSectionContent ?? 'actions',
            options: [...TOP_SECTION_CONTENT_OPTIONS],
            disabled: !isEnabled,
          },
        ],
      },
    ],
  }
}
