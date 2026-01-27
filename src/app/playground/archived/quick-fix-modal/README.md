# Quick Fix Modal Framework

A configurable modal flow framework with clip-path height transitions, stack sheet navigation, and island/toast integration.

## Overview

The Quick Fix Modal provides a structured approach to multi-step flows within a modal:

- **Clip-path height transitions** - S-tier animation performance (no layout thrashing)
- **Stack sheet navigation** - iOS-style push/pop transitions
- **Island & toast integration** - Real-time feedback components
- **Gold borders, shine, corners** - Premium styling options
- **Control panel** - Full configurability for testing

## Architecture

### Three-Layer System

```
┌─────────────────────────────────────────┐
│ Layer 3: Overlay (Toast via Portal)     │
├─────────────────────────────────────────┤
│ Layer 2: Content (Sheet Stack)          │
│   ┌─────────────────────────────────┐   │
│   │ Sheet 2 (current - full scale)  │   │
│   └─────────────────────────────────┘   │
│   ┌─────────────────────────────────┐   │
│   │ Sheet 1 (behind - scaled down)  │   │
│   └─────────────────────────────────┘   │
├─────────────────────────────────────────┤
│ Layer 1: Backdrop (shine, shadow, blur) │
└─────────────────────────────────────────┘
│ StatusIsland (fixed bottom)             │
└─────────────────────────────────────────┘
```

### Clip-Path Animation (S-Tier)

```typescript
// Content reveals via clip-path - no layout thrashing
clip-path: inset(0 0 ${hiddenHeight}px 0 round ${borderRadius}px);  // Hidden
clip-path: inset(0 0 0 0 round ${borderRadius}px);                  // Revealed

// Transition (compositor-only)
transition: clip-path 300ms cubic-bezier(0.16, 1, 0.3, 1);
```

## File Structure

```
src/app/playground/quick-fix-modal/
├── page.tsx                              # Playground with control panel
├── README.md                             # This documentation
├── config/
│   ├── types.ts                          # All type definitions
│   ├── defaults.ts                       # Default configuration
│   ├── presets.ts                        # Solution A/B presets
│   ├── options.ts                        # Control panel options
│   └── panel-config.ts                   # Control panel builder
├── core/
│   ├── index.ts                          # Core exports
│   ├── QuickFixModal.tsx                 # Main modal (Base UI Dialog)
│   ├── SheetStack.tsx                    # Stack navigation controller
│   ├── Sheet.tsx                         # Individual sheet with depth
│   ├── SheetHeader.tsx                   # Back button, title, close
│   ├── ClipPathContainer.tsx             # Clip-path animation wrapper
│   └── context.tsx                       # Stack state context
├── flows/
│   ├── index.ts                          # Flow exports
│   ├── FlowSelectorSheet.tsx             # Method selection
│   ├── QuickFixSheet.tsx                 # Card swipe flow
│   ├── AddToMindSheet.tsx                # Upload options
│   └── ManualFixSheet.tsx                # Text/voice input
├── hooks/
│   ├── index.ts                          # Hook exports
│   ├── useSheetStack.ts                  # Push/pop/reset operations
│   └── useContentMeasurement.ts          # ResizeObserver for heights
└── integration/
    ├── index.ts                          # Integration exports
    ├── StatusIslandAdapter.tsx           # Modal-positioned island
    └── ToastPortal.tsx                   # Completion notifications
```

## Usage

### Basic Modal

```tsx
import { QuickFixModal, createFlowSelectorSheet } from './quick-fix-modal'
import { DEFAULT_QUICK_FIX_MODAL_CONFIG } from './quick-fix-modal/config/defaults'

function MyComponent() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen(true)}>Open</button>
      <QuickFixModal
        open={open}
        onOpenChange={setOpen}
        config={DEFAULT_QUICK_FIX_MODAL_CONFIG}
        initialSheet={createFlowSelectorSheet()}
        onComplete={() => setOpen(false)}
      />
    </>
  )
}
```

### With Solution Preset

```tsx
import { EDIT_QUESTIONS_MODAL_PRESET, PROFILE_MODAL_PRESET } from './config/presets'

// Solution A: Edit Questions
<QuickFixModal
  config={EDIT_QUESTIONS_MODAL_PRESET.config}
  integration={EDIT_QUESTIONS_MODAL_PRESET.integration}
  // ...
/>

// Solution B: Profile V3
<QuickFixModal
  config={PROFILE_MODAL_PRESET.config}
  integration={PROFILE_MODAL_PRESET.integration}
  categoryName="Work Experience"
  // ...
/>
```

### Sheet Stack Navigation

```tsx
import { useSheetStack } from './hooks'
import { createQuickFixSheet, createAddToMindSheet } from './flows'

function FlowContent() {
  const { pushSheet, popSheet, canPop, currentSheet } = useSheetStack({
    initialSheet: createFlowSelectorSheet(),
  })

  // Push a new sheet
  const handleFlowSelect = (flowId) => {
    if (flowId === 'quick-fix') {
      pushSheet(createQuickFixSheet())
    }
  }

  // Pop to previous
  const handleBack = () => {
    if (canPop) popSheet()
  }
}
```

### Clip-Path Animation

```tsx
import { ClipPathContainer } from './core'

<ClipPathContainer
  isRevealed={isExpanded}
  borderRadius={24}
  duration={300}
  easing="cubic-bezier(0.16, 1, 0.3, 1)"
>
  <div className="p-6">
    Content that reveals with clip-path animation
  </div>
</ClipPathContainer>
```

## Solution Presets

### Solution A: Edit Questions

- Modal width: 480px
- Subtle shine (`shine-2-subtle`)
- No gold border
- On complete: Close modal

### Solution B: Profile V3

- Modal width: 520px
- Premium shine (`shine-3`)
- Gold border enabled
- On complete: Show toast
- Dynamic title: "Improve {category}"

## Configuration

### Modal Config

```typescript
interface ModalConfig {
  maxWidth: number          // 320-640px
  maxHeight: number         // 400-900px
  borderRadius: number      // 12-40px
  padding: number           // 12-40px
  background: 'primary' | 'secondary' | 'tertiary'
  shine: string             // none | shine-0/1/2/3 | shine-brand
  shineIntensity: string    // '' | '-subtle' | '-intense'
  cornerShape: 'round' | 'squircle'
  goldBorder: boolean
  backdropOpacity: number   // 20-90%
  backdropBlur: number      // 0-24px
}
```

### Stack Config

```typescript
interface StackConfig {
  depthScale: number        // 0.90-1.00 (scale per sheet)
  depthOffset: number       // -32 to 0px (vertical offset)
  depthOpacity: number      // 0.30-1.00 (opacity for stacked)
  maxVisibleSheets: number  // 1-5
  pushDirection: 'up' | 'down' | 'left' | 'right'
  popDirection: 'up' | 'down' | 'left' | 'right'
}
```

### Animation Config

```typescript
interface AnimationConfig {
  clipRevealDuration: number  // 150-500ms
  clipRevealDelay: number     // 0-200ms
  sheetTransition: number     // 200-600ms
  pushDuration: number        // 200-600ms
  popDuration: number         // 150-500ms
  easing: string              // CSS timing function
  staggerDelay: number        // 0-150ms
}
```

## Preview Modes

1. **Full Flow** - Complete modal with all flows
2. **Sheet Stack** - Stack navigation testing
3. **Clip Path** - Clip-path animation testing
4. **Island** - Status island integration
5. **Toast** - Toast notification testing

## Animation Guidelines

All animations follow S-Tier (compositor-only) performance:

```typescript
// Allowed (GPU-accelerated)
transform: scale(), translateX(), translateY(), rotate()
opacity: 0-1
clip-path: inset()

// Avoid (causes layout)
width, height, top, left, margin, padding

// Accessibility
className="motion-safe:transition motion-reduce:transition-none"
```

## Dependencies

- `@base-ui/react/dialog` - Accessible dialog
- `@hugeicons-pro/core-stroke-rounded` - Icons
- Components from `quick-fix-interactions` - Reused flows

## Migration Target

```
src/components/ui/prod/features/quick-fix-modal/
```
