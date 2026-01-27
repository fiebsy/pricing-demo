# Question Command Menu V4

A state machine-based command menu component with expandable content slots, multiple trigger modes, and comprehensive configuration options.

**Playground URL:** `/playground/question-command-menu-v4`

---

## Architecture Overview

V4 follows the **reducer pattern** established in [`/playground/edit-questions`](/playground/edit-questions). This pattern consolidates all state into a single `useReducer` hook, making state transitions predictable and debuggable.

### Reference Implementation: Edit Questions

The edit-questions playground (`/playground/edit-questions/hooks/use-modal-state.ts`) demonstrates the core pattern:

```typescript
// edit-questions pattern
interface ModalFullState {
  view: 'closed' | 'main' | 'revision-flow' | 'processing'
  selectedQuestionId: string | null
  answerState: AnswerState
  // ... all state in one place
}

type ModalAction =
  | { type: 'OPEN_MODAL' }
  | { type: 'CLOSE_MODAL' }
  | { type: 'SELECT_QUESTION'; questionId: string }
  // ... all actions as discriminated union

function modalReducer(state: ModalFullState, action: ModalAction): ModalFullState {
  switch (action.type) {
    case 'OPEN_MODAL':
      return { ...state, view: 'main' }
    // ... pure state transitions
  }
}
```

V4 applies this same pattern to the command menu trigger:

```typescript
// V4 pattern (state/reducer.ts)
interface TriggerFullState {
  mode: TriggerMode        // 'input' | 'question' | 'display'
  editing: boolean
  expanded: boolean
  view: ViewState
  inputValue: string
  savedValue: string | null
  searchQuery: string
  activeTab: string
  topSlotOpen: boolean
  bottomSlotOpen: boolean
}

type TriggerAction =
  | { type: 'CLICK_TRIGGER' }
  | { type: 'ESCAPE' }
  | { type: 'SAVE'; value: string }
  | { type: 'SET_INPUT'; value: string }
  // ... all transitions
```

### Key Differences from V3

| Aspect | V3 | V4 |
|--------|----|----|
| State management | 4 separate `useState` calls | Single `useReducer` |
| Trigger modes | 2 components (`InputWithButtons`, `QuestionTrigger`) | 1 component (`UnifiedTrigger`) |
| Button visibility | 3 options (`always`, `expanded`, `collapsed`) | 7 predicates (+ `editing`, `has-value`, `saved`, `not-saved`) |
| File organization | Large monolithic files | Modular by domain |

---

## Directory Structure

```
question-command-menu-v4/
├── page.tsx                    # Playground entry point
├── README.md                   # This file
│
├── types/                      # Type definitions split by domain
│   ├── state.ts               # TriggerFullState, TriggerAction, ViewState
│   ├── trigger.ts             # ButtonVisibility, TriggerButtonConfig
│   ├── content.ts             # ContentTypeId, ChatMessage, etc.
│   ├── slots.ts               # UnifiedSlotConfig, SlotPosition
│   ├── config.ts              # QuestionCommandMenuV4Config
│   └── index.ts               # Re-exports
│
├── state/                      # State management (reducer pattern)
│   ├── reducer.ts             # triggerReducer + action creators
│   ├── initial.ts             # INITIAL_STATE factory
│   ├── context.tsx            # V4Provider + useV4Context
│   └── index.ts
│
├── hooks/                      # Derived state hooks
│   ├── use-slot.ts            # Slot visibility and content
│   ├── use-height.ts          # Dynamic height calculations
│   ├── use-trigger.ts         # Button visibility predicates
│   └── index.ts
│
├── components/                 # UI components
│   ├── UnifiedTrigger.tsx     # Single trigger for all modes
│   ├── TriggerDisplay.tsx     # Read-only display state
│   ├── TriggerInput.tsx       # Input field with buttons
│   ├── TriggerButtons.tsx     # Button rendering
│   ├── UniversalSlot.tsx      # Slot wrapper
│   ├── ContentRenderer.tsx    # Content type dispatcher
│   ├── Preview.tsx            # Main preview orchestration
│   └── index.ts
│
├── content/                    # Content type renderers
│   ├── QuestionsContent.tsx   # Question list
│   ├── ButtonsContent.tsx     # Action buttons
│   ├── ChatContent.tsx        # AI chat interface
│   ├── SuggestionsContent.tsx # AI suggestions
│   ├── FiltersContent.tsx     # Filter tabs
│   └── ScrollableWrapper.tsx  # Scroll container
│
├── presets/                    # Configuration presets
│   ├── default.ts             # DEFAULT_CONFIG, DEFAULT_PRESET
│   ├── chat-mode.ts           # Chat interaction presets
│   ├── question-mode.ts       # Question entry presets
│   ├── helpers.ts             # createPreset, COMMON_BUTTONS
│   └── index.ts               # PRESETS array, utilities
│
├── panels/                     # Control panel configuration
│   ├── panel-config.ts        # buildPanelConfig, updateNestedValue
│   └── sections/              # Modular section builders
│       ├── trigger-section.ts
│       ├── content-section.ts
│       ├── slot-section.ts
│       ├── appearance-section.ts
│       ├── layout-section.ts
│       ├── animation-section.ts
│       └── shared-groups.ts   # Reusable control groups
│
├── config/options/             # Control panel options
│   ├── appearance.ts
│   ├── animation.ts
│   ├── buttons.ts
│   ├── content.ts
│   ├── icons.ts
│   └── sizing.ts
│
└── data/                       # Mock data
    ├── questions.ts
    ├── suggestions.ts
    ├── filters.ts
    └── status.ts
```

---

## State Machine

### TriggerFullState

All component state lives in a single object:

```typescript
interface TriggerFullState {
  // Mode & view state
  mode: 'input' | 'question' | 'display'
  editing: boolean
  expanded: boolean
  view: 'collapsed' | 'expanded' | 'editing'

  // Value state
  inputValue: string         // Current input value
  savedValue: string | null  // Persisted value (question mode)

  // Content state
  searchQuery: string        // For filtering content
  activeTab: string          // Active tab/filter

  // Slot state
  topSlotOpen: boolean
  bottomSlotOpen: boolean
}
```

### Actions

State transitions are explicit and traceable:

```typescript
// Trigger interactions
dispatch({ type: 'CLICK_TRIGGER' })    // Open/edit based on mode
dispatch({ type: 'FOCUS_INPUT' })
dispatch({ type: 'BLUR_INPUT' })
dispatch({ type: 'ESCAPE' })           // Cancel and collapse

// Value changes
dispatch({ type: 'SET_INPUT', value: 'text' })
dispatch({ type: 'SAVE', value: 'question text' })
dispatch({ type: 'CLEAR_VALUE' })

// Content filtering
dispatch({ type: 'SET_SEARCH', value: 'filter text' })
dispatch({ type: 'SET_TAB', value: 'tab-id' })

// Expansion
dispatch({ type: 'EXPAND' })
dispatch({ type: 'COLLAPSE' })
dispatch({ type: 'TOGGLE_EXPANDED' })

// Slot control
dispatch({ type: 'OPEN_TOP_SLOT' })
dispatch({ type: 'CLOSE_TOP_SLOT' })
dispatch({ type: 'TOGGLE_TOP_SLOT' })
// (same for bottom slot)

// Mode switching
dispatch({ type: 'SET_MODE', mode: 'question' })
dispatch({ type: 'RESET' })
```

### Mode Behaviors

| Mode | Collapsed State | Expanded State |
|------|-----------------|----------------|
| `input` | Shows placeholder, keyboard hint | Input active, slots open |
| `question` | Shows saved value or placeholder | Editing mode, input active |
| `display` | Shows saved value (read-only) | Not expandable |

---

## Using the Context

### Basic Usage

```tsx
import { V4Provider, useV4Context } from './state'

function MyComponent() {
  const {
    // State
    state,
    isExpanded,
    isEditing,
    hasSavedValue,

    // Config helpers
    getContentForSlot,
    getSlotConfig,

    // Actions
    clickTrigger,
    setInput,
    save,
    escape,
    expand,
    collapse,
  } = useV4Context()

  return (
    <div onClick={clickTrigger}>
      {isExpanded ? 'Expanded' : 'Collapsed'}
    </div>
  )
}

// Wrap with provider
function App() {
  return (
    <V4Provider config={myConfig}>
      <MyComponent />
    </V4Provider>
  )
}
```

### Accessing Config

```tsx
const { config, getContentForSlot, getSlotConfig } = useV4Context()

// Get content assigned to a slot
const topContent = getContentForSlot('top')
// => { id: 'top-chat', type: 'chat', slot: 'top' }

// Get slot configuration
const topSlotConfig = getSlotConfig('top')
// => { enabled: true, heightMode: 'dynamic', maxHeight: 300, ... }
```

---

## Adding New State

### Step 1: Add to TriggerFullState

```typescript
// types/state.ts
interface TriggerFullState {
  // ... existing fields

  // Add your new state
  isProcessing: boolean
  processingProgress: number
}
```

### Step 2: Add Actions

```typescript
// types/state.ts
type TriggerAction =
  // ... existing actions

  // Add your new actions
  | { type: 'START_PROCESSING' }
  | { type: 'UPDATE_PROGRESS'; progress: number }
  | { type: 'COMPLETE_PROCESSING' }
```

### Step 3: Update Initial State

```typescript
// state/initial.ts
export const INITIAL_STATE: TriggerFullState = {
  // ... existing fields

  isProcessing: false,
  processingProgress: 0,
}
```

### Step 4: Handle in Reducer

```typescript
// state/reducer.ts
function triggerReducer(state: TriggerFullState, action: TriggerAction): TriggerFullState {
  switch (action.type) {
    // ... existing cases

    case 'START_PROCESSING':
      return {
        ...state,
        isProcessing: true,
        processingProgress: 0,
      }

    case 'UPDATE_PROGRESS':
      return {
        ...state,
        processingProgress: action.progress,
      }

    case 'COMPLETE_PROCESSING':
      return {
        ...state,
        isProcessing: false,
        processingProgress: 100,
      }
  }
}

// Add action creators
export const actions = {
  // ... existing

  startProcessing: (): TriggerAction => ({ type: 'START_PROCESSING' }),
  updateProgress: (progress: number): TriggerAction => ({ type: 'UPDATE_PROGRESS', progress }),
  completeProcessing: (): TriggerAction => ({ type: 'COMPLETE_PROCESSING' }),
}
```

### Step 5: Expose in Context

```typescript
// state/context.tsx
export interface V4ContextValue {
  // ... existing

  // Add derived state
  isProcessing: boolean
  processingProgress: number

  // Add actions
  startProcessing: () => void
  updateProgress: (progress: number) => void
  completeProcessing: () => void
}

export function V4Provider({ config, children }: V4ProviderProps) {
  // ... existing

  const isProcessing = state.isProcessing
  const processingProgress = state.processingProgress

  const startProcessing = useCallback(() => {
    dispatch({ type: 'START_PROCESSING' })
  }, [])

  const updateProgress = useCallback((progress: number) => {
    dispatch({ type: 'UPDATE_PROGRESS', progress })
  }, [])

  const completeProcessing = useCallback(() => {
    dispatch({ type: 'COMPLETE_PROCESSING' })
  }, [])

  // Add to value object
}
```

### Step 6: Use in Components

```tsx
function ProcessingIndicator() {
  const { isProcessing, processingProgress } = useV4Context()

  if (!isProcessing) return null

  return (
    <div className="processing-bar">
      <div style={{ width: `${processingProgress}%` }} />
    </div>
  )
}
```

---

## Configuration

### Config Structure

```typescript
interface QuestionCommandMenuV4Config {
  // Animation timing
  animation: {
    duration: number              // Expand duration (ms)
    collapseDuration: number      // Collapse duration (ms)
    backdropMode: 'size' | 'clip-path'
    // ...
  }

  // Dimensions
  layout: {
    triggerWidth: number          // Collapsed width (px)
    triggerHeight: number         // Collapsed height (px)
    panelWidth: number            // Expanded width (px)
    fillWidth: boolean            // Match trigger width when expanded
    borderRadius: number
    topGap: number                // Space above top slot
    bottomGap: number             // Space below bottom slot
  }

  // Visual appearance
  appearance: {
    background: 'primary' | 'secondary' | 'tertiary' | 'quaternary'
    shadow: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
    shine: 'none' | 'shine-1' | 'shine-2' | 'shine-2-subtle' | ...
    gradient: 'none' | 'subtle-depth-sm' | 'subtle-depth-md' | ...
    squircle: boolean
  }

  // Trigger configuration
  trigger: {
    defaultMode: 'input' | 'question' | 'display'
    showSearchIcon: boolean
    showKeyboardHint: boolean
    keyboardHintText: string
    cursor: 'text' | 'pointer'
    buttons: TriggerButtonConfig[]
    // padding options...
  }

  // Slot configuration
  slots: {
    top: UnifiedSlotConfig
    bottom: UnifiedSlotConfig
  }

  // Content assignment
  content: ContentInstance[]

  // Content-specific config
  contentConfigs: {
    questions: { ... }
    buttons: { ... }
    chat: { ... }
    suggestions: { ... }
  }

  placeholder: string
  defaultMode: 'input' | 'question' | 'display'
  debug: boolean
}
```

### Content Assignment

Content-first design: configure WHAT appears, then WHERE:

```typescript
content: [
  { id: 'top-chat', type: 'chat', slot: 'top' },
  { id: 'bottom-buttons', type: 'buttons', slot: 'bottom' },
]
```

Available content types:
- `questions` - Scrollable question list
- `buttons` - Action button row
- `filters` / `tabs` - Tab-style filters
- `chat` - AI chat interface
- `suggestions` - AI suggestion list

### Button Visibility

Extended visibility predicates:

```typescript
buttons: [
  {
    id: 'save-btn',
    showWhen: 'editing',        // Only when editing (question mode)
    // ...
  },
  {
    id: 'clear-btn',
    showWhen: 'has-value',      // Only when there's content
    // ...
  },
  {
    id: 'edit-btn',
    showWhen: 'saved',          // Only after save in question mode
    // ...
  },
  {
    id: 'send-btn',
    showWhen: 'expanded',       // When panel is expanded
    // ...
  },
]
```

All visibility options:
- `'always'` - Always visible
- `'expanded'` - Only when expanded
- `'collapsed'` - Only when collapsed
- `'editing'` - Only in editing state (question mode)
- `'has-value'` - Only when input has content
- `'saved'` - Only after value is saved
- `'not-saved'` - Only before value is saved

---

## Presets

### Available Presets

| Preset ID | Description |
|-----------|-------------|
| `default` | Questions in top slot, buttons below |
| `chat-mode` | Chat interface with AI responses |
| `chat-inline-edit` | Chat with inline edit button |
| `chat-inline-edit-v2` | Chat with bottom slot buttons |
| `add-question` | Two-state trigger with suggestions |
| `question-mode` | Explicit question mode with display/edit toggle |

### Creating a Preset

```typescript
import { createPreset, COMMON_BUTTONS } from './presets/helpers'
import { DEFAULT_CONFIG } from './presets/default'

export const MY_PRESET: QuestionCommandMenuV4Preset = {
  id: 'my-preset',
  name: 'My Preset',
  category: 'custom',
  description: 'Custom configuration for my use case',
  data: createPreset(DEFAULT_CONFIG, {
    // Override specific fields
    layout: {
      ...DEFAULT_CONFIG.layout,
      panelWidth: 500,
    },
    trigger: {
      ...DEFAULT_CONFIG.trigger,
      defaultMode: 'question',
      buttons: [
        COMMON_BUTTONS.saveExpanded,
        COMMON_BUTTONS.arrowCollapsed,
      ],
    },
    content: [
      { id: 'top-chat', type: 'chat', slot: 'top' },
      { id: 'bottom-suggestions', type: 'suggestions', slot: 'bottom' },
    ],
  }),
}
```

### Common Buttons

Pre-configured button configurations:

```typescript
COMMON_BUTTONS.sendExpanded      // Send icon, primary, shown when expanded
COMMON_BUTTONS.arrowCollapsed    // Arrow indicator, shown when collapsed
COMMON_BUTTONS.deleteExpanded    // Delete icon, destructive variant
COMMON_BUTTONS.editExpanded      // "Edit" text button, shine variant
COMMON_BUTTONS.saveExpanded      // "Save" text button, primary variant
```

---

## Integration Example

Full integration with external state:

```tsx
'use client'

import { useState, useCallback } from 'react'
import { V4Provider } from './state'
import { Preview } from './components'
import { DEFAULT_CONFIG } from './presets'

export default function MyPage() {
  // External chat state
  const [messages, setMessages] = useState<ChatMessage[]>([])

  const handleSend = useCallback(async (content: string) => {
    // Add user message
    setMessages(prev => [...prev, { id: Date.now(), role: 'user', content }])

    // Simulate AI response
    const response = await fetchAIResponse(content)
    setMessages(prev => [...prev, { id: Date.now(), role: 'assistant', content: response }])
  }, [])

  const handleSave = useCallback((question: string) => {
    // Save question to database
    saveQuestion(question)
  }, [])

  return (
    <V4Provider config={DEFAULT_CONFIG}>
      <Preview
        config={DEFAULT_CONFIG}
        chatMessages={messages}
        onChatSend={handleSend}
        onQuestionSave={handleSave}
      />
    </V4Provider>
  )
}
```

---

## Debugging

Enable debug mode in config:

```typescript
const config = {
  ...DEFAULT_CONFIG,
  debug: true,  // Shows state in console
}
```

Track state changes:

```tsx
const { state } = useV4Context()

useEffect(() => {
  console.log('[V4 State]', state)
}, [state])
```

---

## Related Files

- **Edit Questions Reference:** `/playground/edit-questions/hooks/use-modal-state.ts`
- **BiaxialExpandV4:** `/components/ui/prod/base/biaxial-command-menu-v4/`
- **Control Panel:** `/components/ui/prod/base/control-panel/`
- **V3 Reference:** `/playground/question-command-menu-v3/`
