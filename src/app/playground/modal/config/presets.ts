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
    pushButtonsToBottom: false,
    showSeparator: false,
  },
  header: {
    showAsset: true,
    assetHeight: 72,
    asset: {
      type: 'coin-stack',
      height: 32,
      alignment: 'left',
      offsetX: -10,
      coinStack: {
        width: 60,
        stateId: 1,
        transitionEnabled: true,
        transitionDuration: 0.4,
        transitionBounce: 0.15,
      },
    },
    title: {
      color: 'text-primary',
      size: 'xl',
      weight: '600',
    },
    titleContent: 'Daily limit reached',
    subheader: {
      show: true,
      color: 'text-quaternary',
      size: 'sm',
      weight: '400',
    },
    subheaderContent: 'Supporting text for the modal',
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
    fluid: {
      enabled: true,
      timing: 'default',
      gap: 12,
      exitBlur: false,
      checkmarkStyle: 'flip',
      textSlideDuration: 200,
      checkmarkDrawDuration: 250,
    },
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
    duration: 150,
    bounce: 0,
    delay: 0,
    scale: {
      initial: 0.95,
      animate: 1,
    },
    translateY: {
      initial: 0,
      animate: 0,
    },
    syncMode: 'synced',
    master: {
      duration: 0.2,
      bounce: 0.12,
      stagger: 0.025,
    },
    layout: {
      style: 'spring',
      duration: 0.3,
      bounce: 0.1,
      easing: 'easeOut',
    },
  },
  textTransition: {
    enabled: false,
    mode: 'flip',
    yOffset: 6,
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
  // Global Pro Card configuration (used when content type is 'pro-card')
  proCard: {
    title: 'Pro',
    multiplier: 2,
    height: 152,
    gradient: 'arcade-blue',
    text: {
      fontSize: 36,
      fontWeight: '700',
      letterSpacing: -0.02,
      titleGradient: 'text-primary',
      multiplierGradient: 'ocean-depth',
    },
    container: {
      background: 'secondary',
      shine: 'shine-1-subtle',
      borderRadius: 12,
      padding: 16,
    },
    glow: {
      enabled: true,
      color: 'blue-500',
      blur: 24,
      opacity: 40,
      hideOnMobile: false,
    },
  },
  // Global Checklist configuration (used when content type is 'checklist')
  checklist: {
    title: 'Next billing cycle (Mar 20th 2026)',
    items: [
      'Your plan will update to $50 / month for 200 credits',
      'Downgrade anytime',
      'Credits rollover',
    ],
    titleSize: 'sm',
    titleWeight: '500',
    titleColor: 'text-primary',
    itemSize: 'sm',
    itemWeight: '400',
    itemColor: 'text-tertiary',
    checkColor: 'text-primary',
    gap: 8,
  },
  stages: {
    // Stage 1: Limit reached - single "Upgrade" button
    1: {
      headerTitle: 'Limit reached',
      headerSubheader: "You've used up your monthly credits. Upgrade to keep creating.",
      contentA: { type: 'wireframe', height: 48, lineCount: 3 },
      contentB: { type: 'checklist', height: 32, lineCount: 2 },
      buttons: {
        primary: { text: 'Upgrade', showSpinner: false, showCheckmark: false, showText: true },
        secondary: null,
      },
      asset: { coinStackStateId: 1 },
      pushButtonsToBottom: true,
    },
    // Stage 2: Review Modal - "Back" + "Upgrade"
    2: {
      headerTitle: 'Review Your Upgrade',
      headerSubheader: 'Confirm your selection below',
      contentA: { type: 'wireframe', height: 64, lineCount: 4 },
      contentB: { type: 'wireframe', height: 48, lineCount: 3 },
      buttons: {
        primary: { text: 'Upgrade', showSpinner: false, showCheckmark: false, showText: true },
        secondary: 'Back',
      },
      asset: { coinStackStateId: 1 },
    },
    // Stage 3: Review Modal (same content) - Processing
    3: {
      headerTitle: 'Review Your Upgrade',
      headerSubheader: 'Confirm your selection below',
      contentA: { type: 'wireframe', height: 64, lineCount: 4 },
      contentB: { type: 'wireframe', height: 48, lineCount: 3 },
      buttons: {
        primary: { text: 'Upgrading', showSpinner: true, showCheckmark: false, showText: true },
        secondary: 'Back',
      },
      asset: { coinStackStateId: 1 },
    },
    // Stage 4: Confirmation Modal - Checkmark only
    4: {
      headerTitle: 'Upgrade Complete',
      headerSubheader: "You're all set to start creating",
      contentA: { type: 'pro-card', height: 80 },
      contentB: { type: 'wireframe', height: 16, lineCount: 1, show: false },
      buttons: {
        primary: { text: '', showSpinner: false, showCheckmark: true, showText: false },
        secondary: null,
      },
      asset: { coinStackStateId: 2 },
    },
    // Stage 5: Confirmation Modal (same content) - "Let's create"
    5: {
      headerTitle: 'Upgrade Complete',
      headerSubheader: "You're all set to start creating",
      contentA: { type: 'pro-card', height: 80 },
      contentB: { show: false, type: 'wireframe', height: 16, lineCount: 1 },
      buttons: {
        primary: { text: "Let's create", showSpinner: false, showCheckmark: false, showText: true },
        secondary: null,
      },
      pushButtonsToBottom: false,
      asset: { coinStackStateId: 2 },
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
        enabled: true,
        mode: 'flip',
        yOffset: 12,
        easing: 'elastic',
        duration: 200,
      },
    },
  },
  // Smooth Sync
  {
    id: 'smooth-sync',
    name: 'Smooth Sync',
    category: 'default',
    description: 'All animations synchronized',
    data: {
      ...DEFAULT_MODAL_CONFIG,
      animation: {
        ...DEFAULT_MODAL_CONFIG.animation,
        syncMode: 'synced',
        master: {
          duration: 0.4,
          bounce: 0.15,
          stagger: 0.025,
        },
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
