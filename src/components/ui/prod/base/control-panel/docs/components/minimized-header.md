# MinimizedHeader

Compact expand button shown when the panel is minimized.

## Overview

The MinimizedHeader displays a small button with a plus icon that expands the panel when clicked. It uses the panel context to toggle the minimized state.

## Import

```typescript
import { MinimizedHeader } from '@/modules/design-system/v2/components/ui/prod/base/control-panel'
```

## Basic Usage

```tsx
<MinimizedHeader title="Controls" />
```

## Props

```typescript
interface MinimizedHeaderProps {
  title: string
  className?: string
}
```

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | Yes | Tooltip/aria-label text |
| `className` | `string` | No | Additional CSS classes |

## Context Dependency

Requires `PanelProvider` ancestor. Uses `toggleMinimized` from context:

```tsx
const { toggleMinimized } = usePanelContext()
```

## Icon

Uses Hugeicons `Add01Icon` (plus sign) at 16px.

## Usage in UnifiedControlPanel

Rendered automatically when `isMinimized` is true:

```tsx
if (isMinimized) {
  return (
    <div
      className={cx('fixed z-30', className)}
      style={{
        top: 'var(--panel-top, 90px)',
        right: 'var(--panel-right, 16px)',
      }}
    >
      <MinimizedHeader title={minimizedTitle} />
    </div>
  )
}
```

## Standalone Usage

For custom panel implementations:

```tsx
function CustomPanel() {
  const { isMinimized } = usePanelContext()

  if (isMinimized) {
    return (
      <div className="fixed top-4 right-4">
        <MinimizedHeader title="Open Settings" />
      </div>
    )
  }

  return <ExpandedPanel />
}
```

## Accessibility

- `title` attribute for tooltip
- Inherits focus ring styling
- Clickable with keyboard (button element)

---

## Related

- [TabNavigation](./tab-navigation.md) - MinimizeButton for collapsing
- [Context](../api/context.md) - Panel state management
- [Props](../api/props.md) - Minimize state props
