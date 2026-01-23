import type { PanelConfig, Section } from '@/components/ui/prod/base/control-panel'
import type { SuccessToastConfig, SuccessToastPresetMeta } from '../config/types'
import {
  BACKGROUND_OPTIONS,
  SHINE_TYPE_OPTIONS,
  SHINE_INTENSITY_OPTIONS,
  CORNER_OPTIONS,
  ICON_BACKGROUND_OPTIONS,
  ICON_COLOR_OPTIONS,
  TEXT_SIZE_OPTIONS,
  TEXT_WEIGHT_OPTIONS,
  TEXT_COLOR_OPTIONS,
  PROGRESS_BG_OPTIONS,
  PROGRESS_FILL_OPTIONS,
  ANIMATION_DIRECTION_OPTIONS,
} from '../config/options'

export function buildSuccessToastPanelConfig(
  config: SuccessToastConfig,
  presets: SuccessToastPresetMeta[],
  activePresetId: string | null
): PanelConfig {
  return {
    sections: [
      buildContainerSection(config),
      buildIconSection(config),
      buildTypographySection(config),
      buildProgressSection(config),
      buildBehaviorSection(config),
      buildContentSection(config),
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

function buildContainerSection(config: SuccessToastConfig): Section {
  return {
    id: 'container',
    label: 'Container',
    title: 'Container Styling',
    groups: [
      {
        title: 'Background',
        controls: [
          {
            id: 'container.background',
            type: 'select',
            label: 'Background',
            value: config.container.background,
            options: [...BACKGROUND_OPTIONS],
          },
        ],
      },
      {
        title: 'Shine Effect',
        controls: [
          {
            id: 'container.shine',
            type: 'select',
            label: 'Type',
            value: config.container.shine,
            options: [...SHINE_TYPE_OPTIONS],
          },
          {
            id: 'container.shineIntensity',
            type: 'select',
            label: 'Intensity',
            value: config.container.shineIntensity,
            options: [...SHINE_INTENSITY_OPTIONS],
          },
        ],
      },
      {
        title: 'Shape',
        controls: [
          {
            id: 'container.cornerShape',
            type: 'select',
            label: 'Corner Style',
            value: config.container.cornerShape,
            options: [...CORNER_OPTIONS],
          },
          {
            id: 'container.borderRadius',
            type: 'slider',
            label: 'Border Radius',
            value: config.container.borderRadius,
            min: 0,
            max: 32,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Padding',
        controls: [
          {
            id: 'container.paddingTop',
            type: 'slider',
            label: 'Top',
            value: config.container.paddingTop,
            min: 0,
            max: 32,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'container.paddingBottom',
            type: 'slider',
            label: 'Bottom',
            value: config.container.paddingBottom,
            min: 0,
            max: 32,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'container.paddingLeft',
            type: 'slider',
            label: 'Left',
            value: config.container.paddingLeft,
            min: 0,
            max: 32,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'container.paddingRight',
            type: 'slider',
            label: 'Right',
            value: config.container.paddingRight,
            min: 0,
            max: 32,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
    ],
  }
}

function buildIconSection(config: SuccessToastConfig): Section {
  return {
    id: 'icon',
    label: 'Icon',
    title: 'Icon Styling',
    groups: [
      {
        title: 'Size',
        controls: [
          {
            id: 'icon.containerSize',
            type: 'slider',
            label: 'Container Size',
            value: config.icon.containerSize,
            min: 24,
            max: 48,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'icon.iconSize',
            type: 'slider',
            label: 'Icon Size',
            value: config.icon.iconSize,
            min: 14,
            max: 32,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Colors',
        controls: [
          {
            id: 'icon.containerBackground',
            type: 'select',
            label: 'Container BG',
            value: config.icon.containerBackground,
            options: [...ICON_BACKGROUND_OPTIONS],
          },
          {
            id: 'icon.iconColor',
            type: 'select',
            label: 'Icon Color',
            value: config.icon.iconColor,
            options: [...ICON_COLOR_OPTIONS],
          },
        ],
      },
      {
        title: 'Shape',
        controls: [
          {
            id: 'icon.containerBorderRadius',
            type: 'slider',
            label: 'Corner Radius',
            value: config.icon.containerBorderRadius,
            min: 0,
            max: 24,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
    ],
  }
}

function buildTypographySection(config: SuccessToastConfig): Section {
  return {
    id: 'typography',
    label: 'Text',
    title: 'Typography',
    groups: [
      {
        title: 'Title',
        controls: [
          {
            id: 'typography.titleSize',
            type: 'select',
            label: 'Size',
            value: config.typography.titleSize,
            options: [...TEXT_SIZE_OPTIONS],
          },
          {
            id: 'typography.titleWeight',
            type: 'select',
            label: 'Weight',
            value: config.typography.titleWeight,
            options: [...TEXT_WEIGHT_OPTIONS],
          },
          {
            id: 'typography.titleColor',
            type: 'select',
            label: 'Color',
            value: config.typography.titleColor,
            options: [...TEXT_COLOR_OPTIONS],
          },
        ],
      },
      {
        title: 'Subtitle',
        controls: [
          {
            id: 'typography.subtitleSize',
            type: 'select',
            label: 'Size',
            value: config.typography.subtitleSize,
            options: [...TEXT_SIZE_OPTIONS],
          },
          {
            id: 'typography.subtitleWeight',
            type: 'select',
            label: 'Weight',
            value: config.typography.subtitleWeight,
            options: [...TEXT_WEIGHT_OPTIONS],
          },
          {
            id: 'typography.subtitleColor',
            type: 'select',
            label: 'Color',
            value: config.typography.subtitleColor,
            options: [...TEXT_COLOR_OPTIONS],
          },
        ],
      },
    ],
  }
}

function buildProgressSection(config: SuccessToastConfig): Section {
  return {
    id: 'progress',
    label: 'Progress',
    title: 'Progress Bar',
    groups: [
      {
        title: 'Size',
        controls: [
          {
            id: 'progress.height',
            type: 'slider',
            label: 'Height',
            value: config.progress.height,
            min: 1,
            max: 8,
            step: 1,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'progress.borderRadius',
            type: 'slider',
            label: 'Corner Radius',
            value: config.progress.borderRadius,
            min: 0,
            max: 4,
            step: 1,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Colors',
        controls: [
          {
            id: 'progress.background',
            type: 'select',
            label: 'Track Color',
            value: config.progress.background,
            options: [...PROGRESS_BG_OPTIONS],
          },
          {
            id: 'progress.fillColor',
            type: 'select',
            label: 'Fill Color',
            value: config.progress.fillColor,
            options: [...PROGRESS_FILL_OPTIONS],
          },
        ],
      },
    ],
  }
}

function buildBehaviorSection(config: SuccessToastConfig): Section {
  return {
    id: 'behavior',
    label: 'Behavior',
    title: 'Animation & Timing',
    groups: [
      {
        title: 'Timing',
        controls: [
          {
            id: 'behavior.duration',
            type: 'slider',
            label: 'Auto-dismiss',
            value: config.behavior.duration,
            min: 1000,
            max: 10000,
            step: 500,
            formatLabel: (v: number) => `${v / 1000}s`,
          },
          {
            id: 'behavior.animationDuration',
            type: 'slider',
            label: 'Animation',
            value: config.behavior.animationDuration,
            min: 100,
            max: 500,
            step: 50,
            formatLabel: (v: number) => `${v}ms`,
          },
        ],
      },
      {
        title: 'Direction',
        controls: [
          {
            id: 'behavior.animationDirection',
            type: 'select',
            label: 'Slide From',
            value: config.behavior.animationDirection,
            options: [...ANIMATION_DIRECTION_OPTIONS],
          },
        ],
      },
    ],
  }
}

function buildContentSection(config: SuccessToastConfig): Section {
  return {
    id: 'content',
    label: 'Content',
    title: 'Preview Content',
    groups: [
      {
        title: 'Text',
        controls: [
          {
            id: 'content.title',
            type: 'text',
            label: 'Title',
            value: config.content.title,
          },
          {
            id: 'content.subtitle',
            type: 'text',
            label: 'Subtitle',
            value: config.content.subtitle,
          },
        ],
      },
    ],
  }
}
