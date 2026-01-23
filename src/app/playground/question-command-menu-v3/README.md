# Question Command Menu V3

A content-first architecture for the Question Command Menu playground.

## Key Improvements Over V2

### 1. Unified Slot Configuration

V2 had separate `TopSlotConfig` and `BottomSlotConfig` types with ~80% overlap:

```typescript
// V2: Separate types with duplicated fields
interface TopSlotConfig {
  enabled?: boolean
  height?: number
  background?: BackgroundOption
  // ...10+ more fields
}

interface BottomSlotConfig {
  enabled?: boolean
  height?: number  // Same as TopSlotConfig
  background?: BackgroundOption  // Same as TopSlotConfig
  // ...10+ more fields (almost identical)
}
```

V3 uses a single `UnifiedSlotConfig` for both:

```typescript
// V3: One type for all slots
interface UnifiedSlotConfig {
  enabled: boolean
  heightMode: 'fixed' | 'dynamic' | 'auto'
  appearance: SlotAppearanceConfig
  animation: SlotAnimationConfig
  scroll: SlotScrollConfig
}
```

### 2. Content-First Design

V2 tightly coupled content type to slot position:

```typescript
// V2: Content type is part of slot config
topSlot: { contentType: 'filters', ... }
bottomSlot: { contentType: 'questions', ... }
```

V3 separates content assignment from slot configuration:

```typescript
// V3: Content declares where it goes
content: [
  { id: 'top-filters', type: 'filters', slot: 'top' },
  { id: 'bottom-questions', type: 'questions', slot: 'bottom' },
]
```

**Benefits:**
- Swap content between slots with a single config change
- Share scroll/animation behavior regardless of slot
- Add new content types without modifying slot configs

### 3. Reusable Control Panel Groups

V2 had separate panel builders for top/bottom with duplicate code:

```typescript
// V2: Two separate functions
buildTopSection(state)
buildBottomSection(state)
```

V3 reuses the same control groups:

```typescript
// V3: One function, different prefix
buildSlotSection(state, 'top')
buildSlotSection(state, 'bottom')
```

## File Structure

```
question-command-menu-v3/
├── page.tsx                        # Playground page
│
├── config/                         # Configuration & types
│   ├── options/                    # Control panel options (by domain)
│   │   ├── appearance.ts           # Background, shine, shadow, gradient, border
│   │   ├── animation.ts            # Backdrop mode, expand origin
│   │   ├── buttons.ts              # All button-related options
│   │   ├── content.ts              # Content type, slot position
│   │   ├── icons.ts                # Icon selection options
│   │   ├── sizing.ts               # Height mode, border radius, cursor
│   │   └── index.ts                # Barrel export
│   ├── content-types.ts            # Content type definitions
│   ├── defaults.ts                 # Default configuration values
│   ├── presets.ts                  # Preset configurations
│   ├── slots.ts                    # Slot system configuration
│   ├── types.ts                    # TypeScript types
│   └── index.ts                    # Config exports
│
├── data/                           # Sample data by content type
│   ├── questions.ts                # SAMPLE_QUESTIONS
│   ├── filters.ts                  # DEFAULT_FILTER_OPTIONS
│   ├── tabs.ts                     # DEFAULT_TAB_OPTIONS
│   └── index.ts                    # Barrel export
│
├── strings/                        # Centralized UI text
│   ├── status.ts                   # Status badge config (icons + classes)
│   ├── content.ts                  # Empty states, placeholders
│   └── index.ts                    # Barrel export
│
├── core/                           # Core logic
│   ├── context.tsx                 # V3 context provider
│   ├── hooks.ts                    # Custom hooks
│   ├── height-calculator.ts        # Dynamic height logic
│   └── index.ts
│
├── components/                     # UI components
│   ├── Preview.tsx                 # Main preview wrapper
│   ├── UniversalSlot.tsx           # Position-agnostic slot
│   ├── ContentRenderer.tsx         # Content type dispatcher
│   ├── InputWithButtons.tsx        # Trigger input
│   └── index.ts
│
├── content/                        # Content type components
│   ├── ScrollableWrapper.tsx       # Shared scroll container
│   ├── QuestionsContent.tsx        # Questions list
│   ├── ButtonsContent.tsx          # Action buttons
│   ├── FiltersContent.tsx          # Filter tabs
│   └── index.ts
│
└── panels/                         # Control panel configuration
    ├── panel-config.ts             # Main panel builder
    ├── shared-groups.ts            # Reusable control groups
    ├── content-section.ts          # Content configuration
    ├── slot-section.ts             # Slot configuration (both slots)
    └── index.ts
```

## Usage

### Import Sample Data

```typescript
import { SAMPLE_QUESTIONS } from './data'
// or via content barrel
import { SAMPLE_QUESTIONS, DEFAULT_FILTER_OPTIONS } from './content'
```

### Import Options

```typescript
// All options via config barrel
import { BACKGROUND_OPTIONS, BUTTON_VARIANT_OPTIONS } from './config'

// Or specific domain
import { BACKGROUND_OPTIONS } from './config/options/appearance'
import { BUTTON_VARIANT_OPTIONS } from './config/options/buttons'
```

### Import Strings

```typescript
import { STATUS_CONFIG, CONTENT_STRINGS } from './strings'
```

### Swapping Content Between Slots

To move questions from bottom to top:

```typescript
// Before
content: [
  { id: 'filters', type: 'filters', slot: 'top' },
  { id: 'questions', type: 'questions', slot: 'bottom' },
]

// After - just change the slot property
content: [
  { id: 'questions', type: 'questions', slot: 'top' },
  { id: 'buttons', type: 'buttons', slot: 'bottom' },
]
```

### Height Modes

Each slot supports three height modes:

1. **fixed** - Use `fixedHeight` value
2. **dynamic** - Calculate based on content, cap at `maxHeight`
3. **auto** - Use actual content height (no cap)

```typescript
slots: {
  top: {
    heightMode: 'fixed',
    fixedHeight: 48,  // Always 48px
  },
  bottom: {
    heightMode: 'dynamic',
    maxHeight: 340,   // Grows with content up to 340px
    minHeight: 100,   // Never smaller than 100px
  },
}
```

## Adding New Content Types

1. Create data file in `data/[type].ts`
2. Add empty state message in `strings/content.ts`
3. Create component in `content/[Type]Content.tsx`
4. Register in `config/content-types.ts`
5. Add to `ContentRenderer.tsx`

## Presets

- **Default** - Filters on top, questions on bottom
- **Minimal** - No top section, clean design
- **Elevated** - Premium look with shine and depth
- **With Action Buttons** - Buttons on bottom instead of questions
- **Questions on Top** - Demonstrates slot flexibility
- **Question Review** - Optimized for reviewing questions with status
- **With Indicator** - Arrow indicator for navigation hint

## Notes

- `config/options/sizing.ts` is named `sizing` instead of `layout` to avoid Next.js App Router reserved name conflict
