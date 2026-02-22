/**
 * Modal Presets
 *
 * Preset categories:
 * - default: Standard starting point
 */

import type { ModalPlaygroundConfig, ModalPresetMeta, StagesConfig } from './types'

// ============================================================================
// Default Configuration
// ============================================================================

export const DEFAULT_MODAL_CONFIG: ModalPlaygroundConfig = {
  container: {
    width: 400,
    minHeight: 120,
    maxHeight: 600,
    padding: 24,
    gap: 16,
    borderRadius: 16,
    cornerShape: 'round',
    background: 'secondary',
    shine: 'shine-1-intense',
    depth: 'depth-gradient-2',
    shadow: 'lg',
    dropShadow: 'none',
    borderWidth: 0,
    borderColor: 'border-secondary',
    pushButtonsToBottom: true,
  },
  header: {
    showAsset: false,
    assetHeight: 48,
    title: {
      color: 'text-primary',
      size: 'lg',
      weight: '600',
    },
    titleContent: 'Modal Title',
  },
  contentTop: {
    show: true,
    height: 48,
    lineCount: 3,
    lineGap: 8,
    text: {
      color: 'text-secondary',
      size: 'sm',
      weight: '400',
    },
  },
  contentBottom: {
    show: true,
    height: 32,
    lineCount: 2,
    lineGap: 8,
    text: {
      color: 'text-tertiary',
      size: 'xs',
      weight: '400',
    },
  },
  buttons: {
    buttonCount: 2,
    primary: {
      variant: 'primary',
      size: 'md',
      label: 'Confirm',
    },
    secondary: {
      variant: 'secondary',
      size: 'md',
      label: 'Cancel',
    },
    layout: 'horizontal',
    gap: 12,
    buttonRadius: 'default',
    cornerSquircle: true,
  },
  closeButton: {
    show: true,
    position: 'top-right',
    offset: 16,
    size: 'md',
    iconStrokeWidth: 1.5,
    iconColor: 'text-secondary',
    backgroundMode: 'always',
    backgroundColor: 'bg-quaternary',
    backgroundOpacity: 50,
    backgroundRadius: 'full',
  },
  backdrop: {
    blur: 4,
    opacity: 50,
    dismissable: true,
  },
  animation: {
    preset: 'scale-fade',
    duration: 300,
    bounce: 0.15,
    delay: 0,
    scale: {
      initial: 0.95,
      animate: 1,
    },
    translateY: {
      initial: 0,
      animate: 0,
    },
  },
  textTransition: {
    mode: 'flip',
    yOffset: 8,
    easing: 'spring',
    duration: 200,
  },
  demo: {
    pageBackground: 'primary',
    showDebug: false,
    slowMo: false,
    autoOpen: true,
    showContainerOutlines: false,
  },
  stages: {
    1: {
      headerTitle: 'Modal Title 1',
      contentA: { type: 'wireframe', height: 48, lineCount: 3 },
      contentB: { type: 'wireframe', height: 32, lineCount: 2 },
      buttons: { primary: 'Confirm', secondary: 'Cancel' },
    },
    2: {
      headerTitle: 'Modal Title 2',
      contentA: { type: 'wireframe', height: 80, lineCount: 5 },
      contentB: { type: 'wireframe', height: 48, lineCount: 3 },
      buttons: { primary: 'Continue', secondary: 'Back' },
    },
    3: {
      headerTitle: 'Modal Title 3',
      contentA: { type: 'wireframe', height: 32, lineCount: 2 },
      contentB: { type: 'wireframe', height: 64, lineCount: 4 },
      buttons: { primary: 'Submit', secondary: 'Cancel' },
    },
    4: {
      headerTitle: 'Modal Title 4',
      contentA: { type: 'wireframe', height: 64, lineCount: 4 },
      contentB: { type: 'wireframe', height: 16, lineCount: 1 },
      buttons: { primary: 'Done', secondary: 'Close' },
    },
  },
}

// ============================================================================
// Presets
// ============================================================================

export const MODAL_PRESETS: ModalPresetMeta[] = [
  // Default
  {
    id: 'default',
    name: 'Default',
    category: 'default',
    description: 'Standard modal with scale-fade animation',
    data: DEFAULT_MODAL_CONFIG,
  },
  // Flip Text
  {
    id: 'flip-text',
    name: 'Flip Text',
    category: 'default',
    description: 'Sequential text flip with elastic easing',
    data: {
      ...DEFAULT_MODAL_CONFIG,
      textTransition: {
        mode: 'flip',
        yOffset: 12,
        easing: 'elastic',
        duration: 200,
      },
    },
  },
]

// ============================================================================
// Helpers
// ============================================================================

export const getPresetById = (id: string): ModalPresetMeta | undefined =>
  MODAL_PRESETS.find((p) => p.id === id)

export const getPresetsByCategory = (category: string): ModalPresetMeta[] =>
  MODAL_PRESETS.filter((p) => p.category === category)
