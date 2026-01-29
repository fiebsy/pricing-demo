# Portal

A utility component that renders its children in a different part of the DOM.

## Overview

Portal moves its children to a specified container in the DOM, useful for modals, tooltips, and popovers that need to escape their parent's stacking context.

## Basic Usage

```tsx
import { Portal } from '@base-ui/react/portal';

<Portal>
  <div className="modal">
    Modal content rendered at the end of document.body
  </div>
</Portal>
```

## Key Props

| Prop | Type | Default | Purpose |
|------|------|---------|---------|
| `container` | Element \| null | document.body | Target container |
| `keepMounted` | boolean | false | Keep children mounted when hidden |
| `children` | ReactNode | - | Content to portal |

## Custom Container

```tsx
const containerRef = React.useRef<HTMLDivElement>(null);

<div ref={containerRef} id="portal-container" />

<Portal container={containerRef.current}>
  <div>Rendered inside #portal-container</div>
</Portal>
```

## Keep Mounted

Useful when you need to preserve state or avoid remounting:

```tsx
<Portal keepMounted>
  <Dialog.Popup>
    {/* Dialog content stays mounted even when closed */}
  </Dialog.Popup>
</Portal>
```

## Usage in Components

Most Base UI popup components use Portal internally:

```tsx
<Popover.Root>
  <Popover.Trigger>Open</Popover.Trigger>
  <Popover.Portal>
    {/* Content rendered in portal */}
    <Popover.Positioner>
      <Popover.Popup>Content</Popover.Popup>
    </Popover.Positioner>
  </Popover.Portal>
</Popover.Root>
```

## Stacking Context

To ensure portaled content appears above your app:

```css
/* In your layout */
.app-root {
  isolation: isolate;
}
```

This creates a separate stacking context so popups always appear on top.

## Server-Side Rendering

Portal safely handles SSR by checking for document availability before rendering.
