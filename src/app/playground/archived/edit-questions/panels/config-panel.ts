/**
 * Edit Questions Playground - Control Panel Configuration
 *
 * Creates the sections and controls for the UnifiedControlPanel.
 *
 * @module playground/edit-questions/panels
 */

import type { Section } from '@/components/ui/prod/base/control-panel'
import type { PlaygroundConfig } from '../types'
import { PRESET_OPTIONS } from '../constants'

// =============================================================================
// MODAL PANEL
// =============================================================================

export function createModalPanel(config: PlaygroundConfig): Section {
  return {
    id: 'modal',
    title: 'Modal Settings',
    tabLabel: 'Modal',
    groups: [
      {
        title: 'Appearance',
        controls: [
          {
            id: 'modalWidth',
            label: 'Modal Width',
            type: 'select',
            value: config.modalWidth,
            options: [
              { label: 'Small', value: 'sm', description: '640px' },
              { label: 'Medium', value: 'md', description: '768px' },
              { label: 'Large', value: 'lg', description: '1024px' },
              { label: 'Custom', value: 'custom', description: 'Set manually' },
            ],
          },
          {
            id: 'customModalWidth',
            label: 'Custom Width',
            type: 'slider',
            value: config.customModalWidth,
            min: 320,
            max: 1200,
            step: 20,
            formatLabel: (v: number) => `${v}px`,
            disabled: config.modalWidth !== 'custom',
          },
          {
            id: 'backdropOpacity',
            label: 'Backdrop Opacity',
            type: 'slider',
            value: config.backdropOpacity,
            min: 0,
            max: 100,
            step: 5,
            formatLabel: (v: number) => `${v}%`,
          },
        ],
      },
      {
        title: 'Animation',
        controls: [
          {
            id: 'modalDuration',
            label: 'Animation Duration',
            type: 'slider',
            value: config.modalDuration,
            min: 100,
            max: 500,
            step: 50,
            formatLabel: (v: number) => `${v}ms`,
          },
        ],
      },
    ],
  }
}

// =============================================================================
// ANSWER PANEL
// =============================================================================

export function createAnswerPanel(config: PlaygroundConfig): Section {
  return {
    id: 'answer',
    title: 'Answer Simulation',
    tabLabel: 'Answer',
    groups: [
      {
        title: 'Response Type',
        controls: [
          {
            id: 'responseType',
            label: 'Simulated Response',
            description: 'Choose the type of answer to simulate',
            type: 'select',
            value: config.responseType,
            options: [
              { label: 'Good Answer', value: 'good', description: 'High confidence, detailed' },
              { label: 'Lousy Answer', value: 'lousy', description: 'Low confidence, vague' },
              { label: 'Unsure (Orphaned)', value: 'unsure', description: 'Triggers error state' },
            ],
          },
        ],
      },
      {
        title: 'Timing',
        controls: [
          {
            id: 'simulateDelay',
            label: 'Simulate Delay',
            description: 'Add LLM processing delay',
            type: 'toggle',
            value: config.simulateDelay,
          },
          {
            id: 'delayMs',
            label: 'Delay Duration',
            type: 'slider',
            value: config.delayMs,
            min: 500,
            max: 5000,
            step: 250,
            formatLabel: (v: number) => `${v}ms`,
            disabled: !config.simulateDelay,
          },
        ],
      },
    ],
  }
}

// =============================================================================
// FLOW PANEL
// =============================================================================

export function createFlowPanel(config: PlaygroundConfig): Section {
  return {
    id: 'flow',
    title: 'Flow Settings',
    tabLabel: 'Flow',
    groups: [
      {
        title: 'Quick Fix',
        controls: [
          {
            id: 'quickFixCount',
            label: 'Question Count',
            description: 'Number of True/False statements',
            type: 'slider',
            value: config.quickFixCount,
            min: 5,
            max: 15,
            step: 1,
          },
        ],
      },
      {
        title: 'Default Flow',
        controls: [
          {
            id: 'defaultRevisionFlow',
            label: 'Default Revision Flow',
            description: 'Which flow opens when clicking "Revise"',
            type: 'select',
            value: config.defaultRevisionFlow,
            options: [
              { label: 'Quick Fix', value: 'quick-fix' },
              { label: 'Add to Mind', value: 'add-to-mind' },
              { label: 'Manual Fix', value: 'manual-fix' },
            ],
          },
        ],
      },
    ],
  }
}

// =============================================================================
// LAYOUT PANEL
// =============================================================================

export function createLayoutPanel(config: PlaygroundConfig): Section {
  return {
    id: 'layout',
    title: 'Layout Settings',
    tabLabel: 'Layout',
    groups: [
      {
        title: 'Menu View',
        controls: [
          {
            id: 'inputPosition',
            label: 'Input Field Position',
            description: 'Where the input appears relative to questions',
            type: 'select',
            value: config.inputPosition,
            options: [
              { label: 'Above questions', value: 'above' },
              { label: 'Below questions', value: 'below' },
            ],
          },
        ],
      },
      {
        title: 'Detail View',
        controls: [
          {
            id: 'answerPosition',
            label: 'Answer Position',
            description: 'Where the answer appears relative to input',
            type: 'select',
            value: config.answerPosition,
            options: [
              { label: 'Above input', value: 'above' },
              { label: 'Below input', value: 'below' },
            ],
          },
        ],
      },
    ],
  }
}

// =============================================================================
// OPTIONS PANEL
// =============================================================================

export function createOptionsPanel(
  activePresetId: string | null
): Section {
  return {
    id: 'options',
    title: 'Options',
    tabLabel: 'Options',
    groups: [
      {
        title: 'Presets',
        controls: [
          {
            id: 'preset',
            label: 'Configuration Preset',
            type: 'select',
            value: activePresetId || 'default',
            options: PRESET_OPTIONS,
          },
        ],
      },
    ],
  }
}
