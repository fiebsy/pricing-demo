# Context

State management for advanced composition and custom sub-components.

## Overview

The `PanelProvider` wraps the panel internals and exposes state via `usePanelContext`. This is primarily for building custom compositions using the exported sub-components.

## PanelProvider

Manages active tab and minimize state.

```tsx
import { PanelProvider, usePanelContext } from '@/modules/design-system/v2/components/ui/prod/base/control-panel'
```

### Props

```typescript
interface PanelProviderProps {
  children: ReactNode
  defaultActiveTab: string
  defaultMinimized?: boolean
  minimized?: boolean            // Controlled mode
  onMinimizedChange?: (minimized: boolean) => void
}
```

### Usage

The `UnifiedControlPanel` component automatically wraps content in `PanelProvider`. You only need to use it directly when building custom compositions.

```tsx
<PanelProvider
  defaultActiveTab="layout"
  defaultMinimized={false}
>
  {/* Custom panel implementation */}
</PanelProvider>
```

---

## usePanelContext

Access panel state from any child component.

```tsx
function CustomComponent() {
  const {
    activeTab,
    setActiveTab,
    isMinimized,
    setIsMinimized,
    toggleMinimized,
  } = usePanelContext()

  return (
    <button onClick={toggleMinimized}>
      {isMinimized ? 'Expand' : 'Minimize'}
    </button>
  )
}
```

### Return Value

```typescript
interface PanelContextValue {
  activeTab: string
  setActiveTab: (id: string) => void
  isMinimized: boolean
  setIsMinimized: (minimized: boolean) => void
  toggleMinimized: () => void
}
```

### Methods

| Method | Description |
|--------|-------------|
| `setActiveTab(id)` | Switch to a specific tab by section ID |
| `setIsMinimized(value)` | Set minimize state directly |
| `toggleMinimized()` | Toggle between minimized/expanded |

---

## Controlled vs Uncontrolled

### Uncontrolled (default)

State managed internally. Use `defaultMinimized` for initial state.

```tsx
<UnifiedControlPanel
  config={config}
  onChange={handleChange}
  defaultMinimized={true}
/>
```

### Controlled

State managed externally. Useful for:
- Persisting state to localStorage
- Syncing with URL params
- Coordinating multiple panels

```tsx
const [minimized, setMinimized] = useState(false)

<UnifiedControlPanel
  config={config}
  onChange={handleChange}
  minimized={minimized}
  onMinimizedChange={setMinimized}
/>
```

---

## Custom Composition Example

Build a custom panel using exported primitives:

```tsx
import {
  PanelProvider,
  usePanelContext,
  ScrollableTabList,
  TabTrigger,
  MinimizeButton,
  ActiveSectionContent,
  ActionBar,
} from '@/modules/design-system/v2/components/ui/prod/base/control-panel'
import { Tabs, TabList, Tab, TabPanel } from 'react-aria-components'

function CustomPanel({ sections, onChange }) {
  return (
    <PanelProvider defaultActiveTab={sections[0].id}>
      <CustomPanelInner sections={sections} onChange={onChange} />
    </PanelProvider>
  )
}

function CustomPanelInner({ sections, onChange }) {
  const { activeTab, setActiveTab, toggleMinimized } = usePanelContext()

  return (
    <Tabs selectedKey={activeTab} onSelectionChange={setActiveTab}>
      <TabList>
        {sections.map(section => (
          <Tab key={section.id} id={section.id}>
            {section.label}
          </Tab>
        ))}
      </TabList>

      {sections.map(section => (
        <TabPanel key={section.id} id={section.id}>
          <ActiveSectionContent
            section={section}
            onChange={(controlId, value) => {
              onChange({ controlId, sectionId: section.id, value })
            }}
          />
        </TabPanel>
      ))}
    </Tabs>
  )
}
```

---

## Error Handling

`usePanelContext` throws if used outside a provider:

```
Error: usePanelContext must be used within a PanelProvider
```

Always ensure components using the hook are descendants of `PanelProvider` or `UnifiedControlPanel`.

---

## Related

- [Types](./types.md) - PanelContextValue type
- [Components](../components/init.md) - Sub-components for composition
- [Advanced](../examples/advanced.md) - Custom composition examples
