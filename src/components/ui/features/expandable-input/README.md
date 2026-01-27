# Expandable Input

A production-ready expandable input system built on the [BiaxialExpand primitive](../../core/primitives/biaxial-expand/README.md). Designed for question-answer flows, chat interfaces, and AI-powered interactions.

## When to Use What

| Use Case | Component |
|----------|-----------|
| Building a completely custom expandable UI | Use [BiaxialExpand primitive](../../core/primitives/biaxial-expand) directly |
| Question/answer with AI responses | Use **Expandable Input** (this component) |
| Chat interface with history | Use **Expandable Input** with chat content |
| Simple expandable search or menu | Use [BiaxialExpand primitive](../../core/primitives/biaxial-expand) directly |

---

## Overview

Expandable Input adds a complete state management layer on top of BiaxialExpand:

- **Flow state machine**: idle → adding → processing → response ↔ editing
- **Multiple trigger modes**: input, question, and display
- **Configurable slot content**: Questions, chat messages, buttons, filters, suggestions
- **Deep merge configuration**: Easily override just what you need

---

## Quick Start

```tsx
import {
  ExpandableInputProvider,
  useExpandableInput,
  DEFAULT_CONFIG,
} from '@/components/ui/features/expandable-input'

function App() {
  return (
    <ExpandableInputProvider config={DEFAULT_CONFIG}>
      <MyInputComponent />
    </ExpandableInputProvider>
  )
}

function MyInputComponent() {
  const {
    state,
    expanded,
    expand,
    collapse,
    flowStateId,
    startAdding,
    submitQuestion,
    receiveResponse,
  } = useExpandableInput()

  return (
    // Your UI here - use BiaxialExpand components for the visual layer
  )
}
```

---

## Architecture

```
expandable-input/
├── types/           # TypeScript definitions
│   ├── config.ts    # Main config (animation, layout, appearance)
│   ├── state.ts     # State + flow types
│   ├── content.ts   # Content types (questions, buttons, chat)
│   ├── trigger.ts   # Trigger configuration
│   └── slots.ts     # Slot configuration
│
├── state/           # State management
│   ├── context.tsx  # ExpandableInputProvider + useExpandableInput
│   ├── reducer.ts   # State reducer with all actions
│   └── initial.ts   # Initial state factories
│
├── config/          # Default configurations
│   └── defaults.ts  # DEFAULT_CONFIG, COMMON_BUTTONS
│
└── utils/
    └── deep-merge.ts # Config composition utility
```

---

## Flow States

The component manages a complete question/response lifecycle:

```
┌─────────┐     ┌─────────┐     ┌────────────┐     ┌──────────┐
│  idle   │ ──► │ adding  │ ──► │ processing │ ──► │ response │
└─────────┘     └─────────┘     └────────────┘     └──────────┘
                    ▲                                    │
                    │            ┌─────────┐             │
                    └─────────── │ editing │ ◄───────────┘
                                 └─────────┘
```

| State | Description | Typical UI |
|-------|-------------|------------|
| `idle` | No question, waiting for input | Empty input, placeholder shown |
| `adding` | User typing a question | Input focused, suggestions shown |
| `processing` | Question submitted, awaiting AI | Loading spinner, input disabled |
| `response` | AI response received | Response displayed, action buttons |
| `editing` | User editing submitted question | Input editable, original preserved |

### Flow Actions

```tsx
const {
  flowStateId,      // Current state: 'idle' | 'adding' | 'processing' | 'response' | 'editing'
  startAdding,      // idle → adding
  submitQuestion,   // adding → processing (with optional confidence score)
  receiveResponse,  // processing → response (with response text)
  startEditing,     // response → editing
  cancelEditing,    // editing → response
  deleteQuestion,   // any → idle
} = useExpandableInput()
```

---

## Configuration

### Creating Custom Configs

Use `deepMerge` to override only what you need:

```tsx
import { DEFAULT_CONFIG, deepMerge } from '@/components/ui/features/expandable-input'

const MY_CONFIG = deepMerge(DEFAULT_CONFIG, {
  layout: {
    triggerWidth: 500,
    panelWidth: 600,
  },
  slots: {
    top: { enabled: false },
    bottom: {
      enabled: true,
      height: 400,
    },
  },
  placeholder: 'Ask me anything...',
})
```

### Full Config Structure

```tsx
interface ExpandableInputConfig {
  // Animation timing
  animation: {
    duration: number           // Expand duration (ms)
    collapseDuration: number   // Collapse duration (ms)
    contentFadeDuration: number
    contentFadeDelay: number
    backdropMode: 'size' | 'clip-path'
  }

  // Layout dimensions
  layout: {
    triggerWidth: number       // Collapsed width
    triggerHeight: number      // Collapsed height
    panelWidth: number         // Expanded width
    fillWidth: boolean         // Match trigger width when expanded
    borderRadius: number
    topGap: number
    bottomGap: number
  }

  // Visual appearance
  appearance: {
    shadow: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
    background: 'primary' | 'secondary' | 'tertiary'
    shine: 'none' | 'shine-subtle' | 'shine-medium'
    squircle: boolean
  }

  // Slot configurations
  slots: {
    top: UnifiedSlotConfig
    bottom: UnifiedSlotConfig
  }

  // Content assignment
  content: ContentInstance[]   // What content goes in which slot

  // Content-specific configs
  contentConfigs: {
    questions: QuestionsConfig
    buttons: ButtonsConfig
    chat: ChatConfig
    filters: FiltersConfig
    suggestions: SuggestionsConfig
  }

  // Trigger configuration
  trigger: TriggerConfig
  triggerDisplay: TriggerDisplayConfig

  // Behavior
  placeholder: string
  defaultMode: 'input' | 'question' | 'display'

  // Per-flow-state overrides
  flowConfigs?: FlowConfigs
}
```

---

## Slot Content Types

Configure what appears in each slot:

```tsx
const config = {
  content: [
    // Top slot content
    { type: 'filters', slot: 'top' },

    // Bottom slot content
    { type: 'chat', slot: 'bottom' },
    { type: 'buttons', slot: 'bottom' },
  ],
}
```

### Available Content Types

| Type | Description | Best For |
|------|-------------|----------|
| `questions` | Selectable question list | FAQ, suggested questions |
| `chat` | Chat message history | Conversational UI |
| `buttons` | Action buttons | Edit, delete, improve actions |
| `filters` | Filter/category chips | Narrowing options |
| `suggestions` | Autocomplete suggestions | Type-ahead |

---

## Flow State Overrides

Override config per flow state for dynamic UI:

```tsx
const config = {
  // Base slot config
  slots: {
    bottom: { enabled: true, height: 300 },
  },

  // Override in specific states
  flowConfigs: {
    idle: {
      slots: {
        bottom: { enabled: false }, // Hide bottom in idle
      },
    },
    response: {
      slots: {
        bottom: {
          enabled: true,
          height: 400, // Taller for response
        },
      },
      buttons: [
        { id: 'edit', label: 'Edit', icon: 'edit' },
        { id: 'improve', label: 'Improve answer', icon: 'sparkle' },
      ],
    },
  },
}
```

---

## Building on This Component

### Option 1: Use as-is with custom config

```tsx
<ExpandableInputProvider config={myCustomConfig}>
  <PreviewComponent />  {/* Use existing Preview component */}
</ExpandableInputProvider>
```

### Option 2: Use the hooks with custom UI

```tsx
function MyCustomUI() {
  const { state, flowStateId, expand, collapse } = useExpandableInput()

  // Build completely custom UI using the state
  return (
    <BiaxialExpand.Root config={state.config}>
      {/* Your custom slot content */}
    </BiaxialExpand.Root>
  )
}
```

### Option 3: Start fresh with just BiaxialExpand

If you don't need flow states, use the [primitive directly](../../core/primitives/biaxial-expand/README.md).

---

## Migration from V4

This is the production-ready version of `question-command-menu-v4`.

### Import Changes

```tsx
// Before
import { V4Provider, useV4Context } from '@/app/playground/question-command-menu-v4/state'

// After
import { ExpandableInputProvider, useExpandableInput } from '@/components/ui/features/expandable-input'
```

### Backwards Compatibility Aliases

These aliases are provided for gradual migration:

| Old Name | New Name |
|----------|----------|
| `V4Provider` | `ExpandableInputProvider` |
| `useV4Context` | `useExpandableInput` |
| `QuestionCommandMenuV4Config` | `ExpandableInputConfig` |
| `TriggerFullState` | `ExpandableInputState` |
| `TriggerAction` | `ExpandableInputAction` |

---

## Related

- **[BiaxialExpand Primitive](../../core/primitives/biaxial-expand/README.md)** - The underlying animation system. Read this to understand how slots work.
- **[Playground](/app/playground/question-command-menu-v4)** - Interactive demo with all options
