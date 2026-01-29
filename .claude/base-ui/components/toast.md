# Toast

A high-quality, unstyled React toast component to generate notifications.

## Overview

The Toast component provides a notification system with stacking, anchoring, and swipe-to-dismiss gestures.

## Basic Usage

```tsx
import { Toast } from '@base-ui/react/toast';

function App() {
  return (
    <Toast.Provider>
      <YourApp />
      <Toast.Portal>
        <Toast.Viewport>
          {(toasts) =>
            toasts.map((toast) => (
              <Toast.Root key={toast.id} toast={toast}>
                <Toast.Title>{toast.title}</Toast.Title>
                <Toast.Description>{toast.description}</Toast.Description>
                <Toast.Close>Dismiss</Toast.Close>
              </Toast.Root>
            ))
          }
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  );
}
```

## Adding Toasts

```tsx
function MyComponent() {
  const toastManager = Toast.useToastManager();

  return (
    <button
      onClick={() =>
        toastManager.add({
          title: 'Success',
          description: 'Your changes have been saved.',
        })
      }
    >
      Show Toast
    </button>
  );
}
```

## Core Components

| Component | Purpose |
|-----------|---------|
| `Toast.Provider` | Context wrapper |
| `Toast.Portal` | Renders in portal |
| `Toast.Viewport` | Toast container |
| `Toast.Root` | Individual toast |
| `Toast.Title` | Toast heading |
| `Toast.Description` | Toast message |
| `Toast.Action` | Primary action button |
| `Toast.Close` | Dismiss button |
| `Toast.Positioner` | For anchored toasts |
| `Toast.Arrow` | Pointer for anchored toasts |

## Provider Props

| Prop | Default | Purpose |
|------|---------|---------|
| `limit` | 3 | Max displayed toasts |
| `timeout` | 5000 | Auto-dismiss duration (ms) |
| `toastManager` | - | Global manager instance |

## Root Props

| Prop | Default | Purpose |
|------|---------|---------|
| `toast` | - | Toast object to render |
| `swipeDirection` | ['down', 'right'] | Dismissal directions |

## Promise Toasts

```tsx
toastManager.promise(fetchData(), {
  loading: { title: 'Loading...' },
  success: { title: 'Data loaded!' },
  error: { title: 'Failed to load' },
});
```

## Anchored Toasts

```tsx
<Toast.Root toast={toast}>
  <Toast.Positioner anchor={buttonRef}>
    <Toast.Popup>
      <Toast.Arrow />
      <Toast.Description>Copied!</Toast.Description>
    </Toast.Popup>
  </Toast.Positioner>
</Toast.Root>
```

## Custom Toast Data

```tsx
interface CustomToast {
  type: 'success' | 'error' | 'info';
}

const toastManager = Toast.useToastManager<CustomToast>();

toastManager.add({
  description: 'Operation complete',
  data: { type: 'success' },
});
```

## CSS Variables

```css
--toast-index        /* Stacking order */
--toast-height       /* Toast height */
--toast-offset-y     /* Vertical position */
--toast-swipe-movement-x  /* Horizontal swipe distance */
--toast-swipe-movement-y  /* Vertical swipe distance */
```

## Data Attributes

- `data-expanded`: Viewport is expanded
- `data-swipe`: Swipe direction
- `data-index`: Toast position

## Accessibility

- Landmark region accessible via F6
- Keyboard navigation support
- Screen reader announcements
- ARIA labels on interactive elements
