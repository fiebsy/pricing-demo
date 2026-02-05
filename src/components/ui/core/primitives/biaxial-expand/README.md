# BiaxialExpand

A composable, slot-based animation primitive for building expandable UI components. Expands bidirectionally (up and down) from a trigger element with smooth clip-path animations.

## Why Use This?

BiaxialExpand handles the hard parts of expandable UIs:
- **Biaxial animation**: Expands upward AND downward simultaneously from a trigger
- **Clip-path reveals**: Smooth content reveal without layout shifts
- **Slot-based architecture**: Drop in any content for top/bottom slots
- **Configurable timing**: Per-slot animation delays and durations

**Use cases**: Command menus, expandable search, filter panels, action menus, chat interfaces, or any UI that needs to reveal content above and below a trigger.

---

## Quick Start

```tsx
import { BiaxialExpand, useBiaxialExpand } from '@/components/ui/core/primitives/biaxial-expand'

function MyExpandableComponent() {
  return (
    <BiaxialExpand.Root config={myConfig}>
      {/* Content that expands UPWARD (outside ContentLayer) */}
      <BiaxialExpand.TopSlot>
        <MyTopContent />
      </BiaxialExpand.TopSlot>

      {/* Visual backdrop (background, shadow) */}
      <BiaxialExpand.Backdrop />

      {/* Main content layer - unified clip-path for trigger, bottom, and horizontal slots */}
      <BiaxialExpand.Content>
        {/* Horizontal slots go INSIDE Content for unified clipping */}
        <BiaxialExpand.LeftSlot>
          <MyLeftContent />
        </BiaxialExpand.LeftSlot>

        <BiaxialExpand.RightSlot>
          <MyRightContent />
        </BiaxialExpand.RightSlot>

        <BiaxialExpand.Trigger>
          <MyTriggerInput />
        </BiaxialExpand.Trigger>

        <BiaxialExpand.ContentWrapper>
          {/* Content that expands DOWNWARD */}
          <BiaxialExpand.BottomSlot>
            <MyBottomContent />
          </BiaxialExpand.BottomSlot>
        </BiaxialExpand.ContentWrapper>
      </BiaxialExpand.Content>
    </BiaxialExpand.Root>
  )
}
```

---

## Architecture

```
                     TopSlot (outside)
                         ↑
┌────────────────────────┴────────────────────────┐
│                                                 │
│   ┌─────────┬───────────────────┬──────────┐   │
│   │LeftSlot │     Trigger       │ RightSlot│   │  ← ContentLayer (unified clip-path)
│   │    ←    │                   │    →     │   │
│   ├─────────┴───────────────────┴──────────┤   │
│   │              BottomSlot                │   │
│   │          (expands DOWNWARD)            │   │
│   └────────────────────────────────────────┘   │
│                                                 │
└─────────────────────────────────────────────────┘
                         ↑
              Backdrop (background, shadow, shine)
```

### Component Hierarchy

| Component | Purpose |
|-----------|---------|
| `Root` | Provider + state management |
| `Backdrop` | Visual styling layer (bg, shadow, shine) |
| `TopSlot` | Upward-expanding content area (outside ContentLayer) |
| `Content` | Main clip-path container (includes horizontal slots) |
| `LeftSlot` | Leftward-expanding content (inside ContentLayer) |
| `RightSlot` | Rightward-expanding content (inside ContentLayer) |
| `Trigger` | Always-visible trigger element |
| `ContentWrapper` | Positions bottom content |
| `BottomSlot` | Downward-expanding content area |

---

## Building Custom Components

### Example 1: Expandable Search with Results

```tsx
import { BiaxialExpand } from '@/components/ui/core/primitives/biaxial-expand'

const SEARCH_CONFIG = {
  layout: {
    triggerWidth: 400,
    triggerHeight: 48,
    panelWidth: 500,
    fillWidth: false,
    borderRadius: 16,
    topGap: 8,
    bottomGap: 0,
  },
  animation: {
    duration: 350,
    collapseDuration: 250,
  },
  topSlot: { enabled: false },
  bottomSlot: {
    enabled: true,
    height: 300,
    background: 'secondary',
  },
}

function ExpandableSearch() {
  return (
    <BiaxialExpand.Root config={SEARCH_CONFIG}>
      <BiaxialExpand.Backdrop />
      <BiaxialExpand.Content>
        <BiaxialExpand.Trigger>
          <SearchInput placeholder="Search..." />
        </BiaxialExpand.Trigger>
        <BiaxialExpand.ContentWrapper>
          <BiaxialExpand.BottomSlot>
            <SearchResults />
          </BiaxialExpand.BottomSlot>
        </BiaxialExpand.ContentWrapper>
      </BiaxialExpand.Content>
    </BiaxialExpand.Root>
  )
}
```

### Example 2: Filter Bar with Options Below

```tsx
const FILTER_CONFIG = {
  layout: {
    triggerWidth: 600,
    triggerHeight: 56,
    panelWidth: 600,
    fillWidth: true,
  },
  topSlot: { enabled: false },
  bottomSlot: {
    enabled: true,
    heightMode: 'auto', // Size to content
    background: 'tertiary',
  },
}

function FilterBar() {
  return (
    <BiaxialExpand.Root config={FILTER_CONFIG}>
      <BiaxialExpand.Backdrop />
      <BiaxialExpand.Content>
        <BiaxialExpand.Trigger>
          <FilterTrigger label="Filters" count={3} />
        </BiaxialExpand.Trigger>
        <BiaxialExpand.ContentWrapper>
          <BiaxialExpand.BottomSlot>
            <FilterOptions categories={['Status', 'Date', 'Type']} />
          </BiaxialExpand.BottomSlot>
        </BiaxialExpand.ContentWrapper>
      </BiaxialExpand.Content>
    </BiaxialExpand.Root>
  )
}
```

### Example 3: Command Menu with Tabs Above

```tsx
const COMMAND_CONFIG = {
  layout: {
    triggerWidth: 500,
    triggerHeight: 48,
    panelWidth: 500,
    topGap: 8,
  },
  topSlot: {
    enabled: true,
    height: 44,
    background: 'secondary',
  },
  bottomSlot: {
    enabled: true,
    height: 320,
    background: 'secondary',
  },
}

function CommandMenu() {
  return (
    <BiaxialExpand.Root config={COMMAND_CONFIG}>
      {/* Tabs expand ABOVE the input */}
      <BiaxialExpand.TopSlot>
        <TabBar tabs={['All', 'Commands', 'Files', 'Settings']} />
      </BiaxialExpand.TopSlot>

      <BiaxialExpand.Backdrop />

      <BiaxialExpand.Content>
        <BiaxialExpand.Trigger>
          <CommandInput placeholder="Type a command..." />
        </BiaxialExpand.Trigger>
        <BiaxialExpand.ContentWrapper>
          {/* Results expand BELOW the input */}
          <BiaxialExpand.BottomSlot>
            <CommandList items={commands} />
          </BiaxialExpand.BottomSlot>
        </BiaxialExpand.ContentWrapper>
      </BiaxialExpand.Content>
    </BiaxialExpand.Root>
  )
}
```

---

## Controlling Expand/Collapse

Use the `useBiaxialExpand` hook inside any child component:

```tsx
import { useBiaxialExpand } from '@/components/ui/core/primitives/biaxial-expand'

function MyTrigger() {
  const { expanded, expand, collapse, toggle } = useBiaxialExpand()

  return (
    <input
      onFocus={expand}
      onBlur={collapse}
      placeholder={expanded ? 'Type to search...' : 'Click to expand'}
    />
  )
}
```

### Available Context Values

```tsx
const {
  // State
  expanded,           // boolean - current expand state
  config,             // BiaxialExpandConfig - full config
  dimensions,         // { topHeight, bottomHeight } - measured slot heights

  // Actions
  expand,             // () => void
  collapse,           // () => void
  toggle,             // () => void
  setTopHeight,       // (height: number) => void
  setBottomHeight,    // (height: number) => void
} = useBiaxialExpand()
```

---

## Configuration Reference

### Layout Config

```tsx
layout: {
  triggerWidth: 400,      // Collapsed width (px)
  triggerHeight: 48,      // Collapsed height (px)
  panelWidth: 500,        // Expanded width (px) - ignored if fillWidth=true
  fillWidth: false,       // If true, expanded width = trigger width
  borderRadius: 16,       // Corner radius
  topGap: 8,              // Gap between top slot and trigger
  bottomGap: 0,           // Gap between trigger and bottom slot
  backdropTopOffset: 0,   // Extra offset for backdrop positioning
}
```

### Slot Config (topSlot / bottomSlot)

```tsx
topSlot: {
  enabled: true,          // Show this slot when expanded
  heightMode: 'fixed',    // 'fixed' | 'auto' | 'dynamic'
  height: 200,            // Fixed height (px) - used when heightMode='fixed'
  background: 'secondary', // 'none' | 'primary' | 'secondary' | 'tertiary'
  shine: 'shine-subtle',  // Shine effect class
  borderRadius: 14,       // Inner content radius
  inset: 4,               // Padding from slot edge
  delayOffset: 0,         // Animation delay offset (ms)
  durationOffset: 0,      // Animation duration offset (ms)
}
```

### Animation Config

```tsx
animation: {
  duration: 350,              // Expand duration (ms)
  collapseDuration: 250,      // Collapse duration (ms)
  contentFadeDuration: 200,   // Content fade duration (ms)
  contentFadeDelay: 50,       // Content fade delay (ms)
  backdropMode: 'clip-path',  // 'size' | 'clip-path'
  backdropDelay: 0,           // Backdrop animation delay (ms)
}
```

### Appearance Config

```tsx
appearance: {
  shadow: 'xl',           // 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  background: 'primary',  // Background color token
  squircle: true,         // Use squircle corners
}
```

---

## Height Modes Explained

| Mode | Behavior | Use When |
|------|----------|----------|
| `fixed` | Uses `height` prop exactly | Known, static content height |
| `auto` | Measures content, animates to fit | Dynamic content that changes |
| `dynamic` | Uses `maxHeight`, scrolls if exceeded | Long lists, chat messages |

```tsx
// Fixed: Always 200px
bottomSlot: { heightMode: 'fixed', height: 200 }

// Auto: Measures and animates to content
bottomSlot: { heightMode: 'auto' }

// Dynamic: Up to 400px, then scrolls
bottomSlot: { heightMode: 'dynamic', height: 400 }
```

---

## Built-in Variants

The primitive includes ready-to-use variants for common patterns:

```tsx
import { BiaxialExpand } from '@/components/ui/core/primitives/biaxial-expand'

// Pre-styled search input
<BiaxialExpand.SearchInput placeholder="Search..." />

// Action button with icon
<BiaxialExpand.ActionButton icon={PlusIcon} label="Add item" />

// Filter bar with options
<BiaxialExpand.FilterBar options={filterOptions} />

// Grouped menu content
<BiaxialExpand.MenuContent groups={menuGroups} />
```

---

## Tips

### Slot Content Guidelines

- **TopSlot**: Best for navigation, tabs, filters, breadcrumbs
- **BottomSlot**: Best for results, menus, forms, chat messages
- Keep trigger content minimal (input, button, summary text)

### Animation Performance

- The component uses `clip-path` animations (GPU-accelerated)
- Avoid animating `height` or `width` directly in slot content
- Use `transform` and `opacity` for any content animations

### Measuring Dynamic Content

For `heightMode: 'auto'`, ensure content has a measurable height:

```tsx
// ✅ Good - has intrinsic height
<BiaxialExpand.BottomSlot>
  <ul>{items.map(item => <li key={item.id}>{item.name}</li>)}</ul>
</BiaxialExpand.BottomSlot>

// ❌ Bad - height depends on parent
<BiaxialExpand.BottomSlot>
  <div className="h-full">...</div>
</BiaxialExpand.BottomSlot>
```

---

## Related

- [Expandable Input](/src/components/ui/features/expandable-input) - Full-featured question/answer component built on this primitive
- [Animation Preferences](/docs/ANIMATION-PREFERENCES.md) - Project animation guidelines
