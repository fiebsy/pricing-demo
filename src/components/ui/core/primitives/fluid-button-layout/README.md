# Fluid Button Layout

State machine-driven button layout system with automatic secondary button visibility and auto-progression through pricing flows.

## Overview

The Fluid Button Layout handles the complete lifecycle of upgrade/purchase button flows:

```
A (single "Upgrade" button)
  ↓ click
B1 (two buttons: "Back" + "Upgrade")
  ↓ click
B2 (two buttons: "Back" + "Upgrading..." with spinner)
  ↓ auto (3.1s)
C1 (single button with checkmark)
  ↓ auto (1.3s)
C2 (single "Let's create" button)
  ↓ click
A (restart)
```

## Quick Start

### Basic Usage with `useFluidButtonLayout`

The composite hook is the simplest way to get started:

```tsx
import {
  useFluidButtonLayout,
  FluidButtonGroup,
  AnimatedRightButton,
  DEFAULT_STATE_TRANSITION,
} from '@/components/ui/core/primitives/fluid-button-layout'
import { Button } from '@/components/ui/core/primitives/button'

function PricingUpgradeButtons() {
  const {
    stateId,
    state,
    showSecondary,
    transitionTo,
    cancelPendingTransitions,
  } = useFluidButtonLayout({
    initialState: 'A',
    onStateChange: (id) => console.log('State:', id),
  })

  const handlePrimaryClick = () => {
    if (stateId === 'A') transitionTo('B1')
    else if (stateId === 'B1') transitionTo('B2')
    else if (stateId === 'C2') transitionTo('A') // Restart
    // B2 → C1 → C2 happens automatically
  }

  const handleBack = () => {
    cancelPendingTransitions()
    transitionTo('A')
  }

  return (
    <FluidButtonGroup
      visible={showSecondary ? 'both' : 'primary'}
      secondaryButton={
        <Button variant="secondary" onClick={handleBack}>
          Back
        </Button>
      }
      primaryButton={
        <button onClick={handlePrimaryClick}>
          <AnimatedRightButton
            state={state}
            transition={DEFAULT_STATE_TRANSITION}
          />
        </button>
      }
    />
  )
}
```

### Using Presets

Pre-configured presets for common scenarios:

```tsx
import {
  PRICING_FLOW_PRESET,
  QUICK_FLOW_PRESET,
  MODAL_SYNC_PRESET,
} from '@/components/ui/core/primitives/fluid-button-layout'

// Standard pricing flow (default timing, auto-transitions enabled)
const layout = useFluidButtonLayout({
  autoTransition: PRICING_FLOW_PRESET.autoTransition,
})

// Quick flow (snappy timing, faster delays)
const quickLayout = useFluidButtonLayout({
  autoTransition: QUICK_FLOW_PRESET.autoTransition,
})

// Modal sync (auto-transitions disabled, parent controls state)
const modalLayout = useFluidButtonLayout({
  autoTransition: MODAL_SYNC_PRESET.autoTransition,
})
```

## State Flow & Visibility

The `SHOW_SECONDARY_MAP` is the single source of truth:

| State ID | Description | `showSecondary` |
|----------|-------------|-----------------|
| `A` | Upgrade alone | `false` |
| `B1` | Upgrade + Back | `true` |
| `B2` | Upgrading + Back (with spinner) | `true` |
| `C1` | Checkmark only (success) | `false` |
| `C2` | "Let's create" (next action) | `false` |

## Hooks

### `useFluidButtonLayout` (Recommended)

Composite hook combining state machine + auto-transitions:

```tsx
interface UseFluidButtonLayoutOptions {
  initialState?: ButtonStateId          // Default: 'A'
  stateId?: ButtonStateId               // For controlled mode
  onStateChange?: (id, state) => void   // State change callback
  autoTransition?: Partial<AutoTransitionConfig>
  states?: Partial<ButtonStatesMap>     // Custom state definitions
  slowMo?: boolean                      // Debug mode (5x slower)
}

interface UseFluidButtonLayoutReturn {
  // From state machine
  stateId: ButtonStateId
  state: ButtonState
  showSecondary: boolean
  transitionTo: (id: ButtonStateId) => boolean
  canTransitionTo: (id: ButtonStateId) => boolean
  states: ButtonStatesMap

  // From auto-transitions
  cancelPendingTransitions: () => void
  restartFlow: () => void
}
```

### `useButtonStateMachine` (Lower-level)

State machine without auto-transitions. Use when you need manual control:

```tsx
const { stateId, state, transitionTo, showSecondary } = useButtonStateMachine({
  initialState: 'A',
})
```

### `useAutoTransitions` (Lower-level)

Auto-transitions without state machine. Use when integrating with external state:

```tsx
const { cancelPendingTransitions, restartFlow } = useAutoTransitions({
  stateId: externalStateId,
  config: { enabled: true, b2ToC1Delay: 3100, c1ToC2Delay: 1300 },
  transitionTo: externalTransitionFn,
  slowMo: false,
})
```

## Constants & Presets

### Constants

```tsx
import {
  DEFAULT_AUTO_TRANSITION,    // { enabled: true, b2ToC1Delay: 3100, c1ToC2Delay: 1300 }
  DEFAULT_STATE_TRANSITION,   // Animation timing config
  DEFAULT_BUTTON_STATES,      // State text/spinner/checkmark config
  SHOW_SECONDARY_MAP,         // State → showSecondary mapping
} from '@/components/ui/core/primitives/fluid-button-layout'
```

### Presets

| Preset | Timing | Auto-Transitions | Use Case |
|--------|--------|-----------------|----------|
| `PRICING_FLOW_PRESET` | default | enabled (3.1s, 1.3s) | Standard upgrade flows |
| `QUICK_FLOW_PRESET` | snappy | enabled (2s, 0.8s) | Fast demos, quick actions |
| `MODAL_SYNC_PRESET` | default | disabled | Modal-controlled state |

## Components

### `AnimatedRightButton`

Renders the primary button with text sliding, spinner, and checkmark animations:

```tsx
<AnimatedRightButton
  state={state}                    // ButtonState from hook
  transition={stateTransition}     // StateTransitionConfig
  variant="primary"                // Button visual variant
  slowMo={false}                   // Debug slow motion
/>
```

### `FluidButtonGroup`

Handles the expand/collapse animation between one and two buttons:

```tsx
<FluidButtonGroup
  visible="both"                   // 'primary' | 'both'
  timing="default"                 // FluidTimingPreset | FluidTiming
  gap={12}                         // Gap between buttons
  syncToExpand={true}              // Sync collapse timing to expand
  exitBlur={{ enabled: true }}     // Blur effect on exit
  primaryButton={<Button>...</Button>}
  secondaryButton={<Button>...</Button>}
/>
```

## Configuration Types

### `AutoTransitionConfig`

```tsx
interface AutoTransitionConfig {
  enabled: boolean      // Enable B2 → C1 → C2 auto-progression
  b2ToC1Delay: number   // ms before B2 → C1 (processing time)
  c1ToC2Delay: number   // ms before C1 → C2 (success display)
}
```

### `StateTransitionConfig`

```tsx
interface StateTransitionConfig {
  textSlideDuration: number           // Text animation duration (ms)
  textSlideEasing: string             // CSS easing function
  spinnerToCheckmarkDuration: number  // Crossfade duration (ms)
  checkmarkDrawDuration: number       // Checkmark animation (ms)
  checkmarkEntranceStyle: 'draw' | 'flip'
}
```

## Modal Integration

For modal contexts, use the adapters:

```tsx
import {
  stageToStateId,
  stageButtonConfigToState,
  deriveFluidTimingFromMaster,
  buildStateTransitionConfig,
  getFluidVisibility,
} from '@/components/ui/core/primitives/fluid-button-layout'

// Convert modal stage to button state
const buttonStateId = stageToStateId(modalStage)

// Get visibility for FluidButtonGroup
const visible = getFluidVisibility(buttonStateId)

// Derive timing from modal's master duration
const timing = deriveFluidTimingFromMaster(masterDuration)
```

## Controlled vs Uncontrolled

### Uncontrolled (Internal State)

Pass `initialState`, hook manages state:

```tsx
const { stateId, transitionTo } = useFluidButtonLayout({
  initialState: 'A',
})
```

### Controlled (External State)

Pass `stateId`, parent manages state:

```tsx
const [externalState, setExternalState] = useState<ButtonStateId>('A')

const { state, showSecondary } = useFluidButtonLayout({
  stateId: externalState,
  onStateChange: (id) => setExternalState(id),
})
```

## Customizing States

Override default button states:

```tsx
const { state, transitionTo } = useFluidButtonLayout({
  initialState: 'A',
  states: {
    'A': {
      id: 'custom-a',
      text: 'Get Started',
      showSpinner: false,
      showCheckmark: false,
      showText: true,
    },
    'C2': {
      id: 'custom-complete',
      text: 'Continue to Dashboard',
      showSpinner: false,
      showCheckmark: false,
      showText: true,
    },
  },
})
```

## Testing in Playground

Visit `/playground/button-fluid-layout` to test:

1. **Click flow**: Click the button to progress A → B1 → B2 → (auto) → C1 → (auto) → C2
2. **State selector**: Jump to any state directly
3. **Presets**: Try different timing/transition configurations
4. **Slow-mo**: Enable to see animations at 5x slower speed
5. **Back button**: Test canceling auto-transitions

## File Structure

```
fluid-button-layout/
├── index.ts                    # Main exports
├── types.ts                    # Type definitions
├── constants.ts                # Default configs, state maps
├── state-machine.ts            # Pure state machine functions
├── README.md                   # This file
├── hooks/
│   ├── use-button-state-machine.ts   # State management hook
│   ├── use-auto-transitions.ts       # Auto-progression hook
│   └── use-fluid-button-layout.ts    # Composite hook (recommended)
├── components/
│   ├── animated-right-button.tsx     # Primary button component
│   ├── animated-checkmark.tsx        # Checkmark animation
│   └── loading-spinner.tsx           # Spinner animation
├── adapters/
│   └── modal-adapter.ts              # Modal integration helpers
└── presets/
    ├── index.ts                      # Preset exports
    ├── types.ts                      # Preset type definition
    └── flow-presets.ts               # PRICING, QUICK, MODAL presets
```

## Migration from Old Pattern

### Before (Manual Sync)

```tsx
const [config, setConfig] = useState(DEFAULT_CONFIG)
const [showBothButtons, setShowBothButtons] = useState(false)

const handleStateChange = (state: ButtonStateId) => {
  const stateKey = `state${state}`
  setConfig((prev) => {
    const newState = prev.buttonStates.states[stateKey]
    setShowBothButtons(newState.showLeftButton) // Manual sync!
    return { ...prev, buttonStates: { ...prev.buttonStates, activeState: state } }
  })
}
```

### After (Automatic)

```tsx
const {
  stateId,
  transitionTo,
  showSecondary,           // Derived automatically
  cancelPendingTransitions // For interrupting auto-flow
} = useFluidButtonLayout({
  initialState: 'A',
})

const handleStateChange = (state: ButtonStateId) => {
  cancelPendingTransitions()
  transitionTo(state) // showSecondary updates automatically!
}
```
