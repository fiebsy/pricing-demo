/**
 * Quick Fix Modal - Panel Configuration
 *
 * Builds the UnifiedControlPanel configuration from the current config.
 *
 * @module playground/quick-fix-modal/config
 */

import type { PanelConfig, Section } from '@/components/ui/patterns/control-panel'
import type { QuickFixModalConfig, QuickFixModalPresetMeta } from './types'
import { MODAL_SOLUTION_PRESETS } from './presets'
import {
  BACKGROUND_OPTIONS,
  SHINE_TYPE_OPTIONS,
  SHINE_INTENSITY_OPTIONS,
  CORNER_SHAPE_OPTIONS,
  MODAL_PREVIEW_MODE_OPTIONS,
  MODAL_SOLUTION_OPTIONS,
  STACK_DIRECTION_OPTIONS,
  EASING_OPTIONS,
} from './options'


// =============================================================================
// MAIN BUILDER
// =============================================================================

export function buildQuickFixModalPanelConfig(
  config: QuickFixModalConfig,
  presets: QuickFixModalPresetMeta[],
  activePresetId: string | null,
  activeSolutionId: string | null = 'standalone'
): PanelConfig {
  return {
    sections: [
      buildSolutionSection(activeSolutionId || 'standalone'),
      buildPreviewSection(config),
      buildModalSection(config),
      buildStackSection(config),
      buildAnimationSection(config),
      // Include inherited sections from base config
      ...getInheritedSections(config),
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

// =============================================================================
// SOLUTION SECTION
// =============================================================================

function buildSolutionSection(activeSolutionId: string): Section {
  return {
    id: 'solution',
    label: 'Solution',
    title: 'Solution Preset',
    groups: [
      {
        title: 'Integration Target',
        controls: [
          {
            id: 'solutionPreset',
            type: 'select',
            label: 'Solution',
            value: activeSolutionId,
            options: MODAL_SOLUTION_PRESETS.map((p) => ({
              label: p.name,
              value: p.id,
            })),
          },
        ],
      },
    ],
  }
}

// =============================================================================
// PREVIEW SECTION
// =============================================================================

function buildPreviewSection(config: QuickFixModalConfig): Section {
  return {
    id: 'preview',
    label: 'Preview',
    title: 'Preview Mode',
    groups: [
      {
        title: 'Display Mode',
        controls: [
          {
            id: 'modalPreviewMode',
            type: 'select',
            label: 'Preview',
            value: config.modalPreviewMode,
            options: [...MODAL_PREVIEW_MODE_OPTIONS],
          },
        ],
      },
    ],
  }
}

// =============================================================================
// MODAL SECTION
// =============================================================================

function buildModalSection(config: QuickFixModalConfig): Section {
  return {
    id: 'modal',
    label: 'Modal',
    title: 'Modal Appearance',
    groups: [
      {
        title: 'Sizing',
        controls: [
          {
            id: 'modal.maxWidth',
            type: 'slider',
            label: 'Max Width',
            value: config.modal.maxWidth,
            min: 320,
            max: 640,
            step: 20,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'modal.maxHeight',
            type: 'slider',
            label: 'Max Height',
            value: config.modal.maxHeight,
            min: 400,
            max: 900,
            step: 20,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'modal.borderRadius',
            type: 'slider',
            label: 'Border Radius',
            value: config.modal.borderRadius,
            min: 12,
            max: 40,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'modal.padding',
            type: 'slider',
            label: 'Padding',
            value: config.modal.padding,
            min: 12,
            max: 40,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Appearance',
        controls: [
          {
            id: 'modal.background',
            type: 'select',
            label: 'Background',
            value: config.modal.background,
            options: [...BACKGROUND_OPTIONS],
          },
          {
            id: 'modal.goldBorder',
            type: 'toggle',
            label: 'Gold Border',
            value: config.modal.goldBorder,
          },
        ],
      },
      {
        title: 'Shine & Corner',
        controls: [
          {
            id: 'modal.shine',
            type: 'select',
            label: 'Shine Type',
            value: config.modal.shine,
            options: [...SHINE_TYPE_OPTIONS],
          },
          {
            id: 'modal.shineIntensity',
            type: 'select',
            label: 'Shine Intensity',
            value: config.modal.shineIntensity,
            options: [...SHINE_INTENSITY_OPTIONS],
          },
          {
            id: 'modal.cornerShape',
            type: 'select',
            label: 'Corner Shape',
            value: config.modal.cornerShape,
            options: [...CORNER_SHAPE_OPTIONS],
          },
        ],
      },
      {
        title: 'Backdrop',
        controls: [
          {
            id: 'modal.backdropOpacity',
            type: 'slider',
            label: 'Opacity',
            value: config.modal.backdropOpacity,
            min: 20,
            max: 90,
            step: 10,
            formatLabel: (v: number) => `${v}%`,
          },
          {
            id: 'modal.backdropBlur',
            type: 'slider',
            label: 'Blur',
            value: config.modal.backdropBlur,
            min: 0,
            max: 24,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
    ],
  }
}

// =============================================================================
// STACK SECTION
// =============================================================================

function buildStackSection(config: QuickFixModalConfig): Section {
  return {
    id: 'stack',
    label: 'Stack',
    title: 'Sheet Stack',
    groups: [
      {
        title: 'Depth Appearance',
        controls: [
          {
            id: 'stack.depthScale',
            type: 'slider',
            label: 'Scale',
            value: config.stack.depthScale * 100,
            min: 90,
            max: 100,
            step: 1,
            formatLabel: (v: number) => `${v}%`,
          },
          {
            id: 'stack.depthOffset',
            type: 'slider',
            label: 'Offset',
            value: Math.abs(config.stack.depthOffset),
            min: 0,
            max: 32,
            step: 4,
            formatLabel: (v: number) => `-${v}px`,
          },
          {
            id: 'stack.depthOpacity',
            type: 'slider',
            label: 'Opacity',
            value: config.stack.depthOpacity * 100,
            min: 30,
            max: 100,
            step: 10,
            formatLabel: (v: number) => `${v}%`,
          },
          {
            id: 'stack.maxVisibleSheets',
            type: 'slider',
            label: 'Max Visible',
            value: config.stack.maxVisibleSheets,
            min: 1,
            max: 5,
            step: 1,
          },
        ],
      },
      {
        title: 'Animation Direction',
        controls: [
          {
            id: 'stack.pushDirection',
            type: 'select',
            label: 'Push From',
            value: config.stack.pushDirection,
            options: [...STACK_DIRECTION_OPTIONS],
          },
          {
            id: 'stack.popDirection',
            type: 'select',
            label: 'Pop To',
            value: config.stack.popDirection,
            options: [...STACK_DIRECTION_OPTIONS],
          },
        ],
      },
    ],
  }
}

// =============================================================================
// ANIMATION SECTION
// =============================================================================

function buildAnimationSection(config: QuickFixModalConfig): Section {
  return {
    id: 'animation',
    label: 'Animation',
    title: 'Animation Timing',
    groups: [
      {
        title: 'Clip-Path Reveal',
        controls: [
          {
            id: 'animation.clipRevealDuration',
            type: 'slider',
            label: 'Duration',
            value: config.animation.clipRevealDuration,
            min: 150,
            max: 500,
            step: 50,
            formatLabel: (v: number) => `${v}ms`,
          },
          {
            id: 'animation.clipRevealDelay',
            type: 'slider',
            label: 'Delay',
            value: config.animation.clipRevealDelay,
            min: 0,
            max: 200,
            step: 25,
            formatLabel: (v: number) => `${v}ms`,
          },
        ],
      },
      {
        title: 'Sheet Transitions',
        controls: [
          {
            id: 'animation.sheetTransition',
            type: 'slider',
            label: 'Base Duration',
            value: config.animation.sheetTransition,
            min: 200,
            max: 600,
            step: 50,
            formatLabel: (v: number) => `${v}ms`,
          },
          {
            id: 'animation.pushDuration',
            type: 'slider',
            label: 'Push Duration',
            value: config.animation.pushDuration,
            min: 200,
            max: 600,
            step: 50,
            formatLabel: (v: number) => `${v}ms`,
          },
          {
            id: 'animation.popDuration',
            type: 'slider',
            label: 'Pop Duration',
            value: config.animation.popDuration,
            min: 150,
            max: 500,
            step: 50,
            formatLabel: (v: number) => `${v}ms`,
          },
        ],
      },
      {
        title: 'Timing Function',
        controls: [
          {
            id: 'animation.easing',
            type: 'select',
            label: 'Easing',
            value: config.animation.easing,
            options: [...EASING_OPTIONS],
          },
          {
            id: 'animation.staggerDelay',
            type: 'slider',
            label: 'Stagger Delay',
            value: config.animation.staggerDelay,
            min: 0,
            max: 150,
            step: 25,
            formatLabel: (v: number) => `${v}ms`,
          },
        ],
      },
    ],
  }
}

// =============================================================================
// INHERITED SECTIONS
// =============================================================================

/**
 * Get inherited sections from the base quick-fix-interactions panel config.
 * Includes Card, Swipe, Buttons, Progress, Completion, Toast, Island, Options.
 */
function getInheritedSections(config: QuickFixModalConfig): Section[] {
  // Return empty sections for now since the types are incompatible
  return []
}
