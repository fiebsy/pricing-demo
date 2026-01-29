# Dialog

A high-quality, unstyled React dialog component that opens on top of the entire page.

## Overview

The Dialog component renders content in a portal above the main page, supporting both controlled and uncontrolled states with focus trapping and keyboard navigation.

## Basic Usage

```tsx
import { Dialog } from '@base-ui/react/dialog';

<Dialog.Root>
  <Dialog.Trigger>Open Dialog</Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Backdrop />
    <Dialog.Popup>
      <Dialog.Title>Dialog Title</Dialog.Title>
      <Dialog.Description>Dialog description text</Dialog.Description>
      <Dialog.Close>Close</Dialog.Close>
    </Dialog.Popup>
  </Dialog.Portal>
</Dialog.Root>
```

## Core Components

| Component | Purpose |
|-----------|---------|
| `Dialog.Root` | Container grouping all parts |
| `Dialog.Trigger` | Button to open the dialog |
| `Dialog.Portal` | Renders dialog in separate DOM location |
| `Dialog.Backdrop` | Semi-transparent overlay |
| `Dialog.Popup` | Main content container |
| `Dialog.Title` | Heading element |
| `Dialog.Description` | Additional context text |
| `Dialog.Close` | Button to dismiss dialog |

## Controlled Mode

```tsx
const [open, setOpen] = React.useState(false);

<Dialog.Root open={open} onOpenChange={setOpen}>
  <Dialog.Trigger>Open</Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Backdrop />
    <Dialog.Popup>
      <Dialog.Title>Controlled Dialog</Dialog.Title>
      <Dialog.Close>Close</Dialog.Close>
    </Dialog.Popup>
  </Dialog.Portal>
</Dialog.Root>
```

## Multiple Triggers

```tsx
const handle = Dialog.createHandle();

<>
  <Dialog.Trigger handle={handle}>Open from here</Dialog.Trigger>
  <Dialog.Trigger handle={handle}>Or from here</Dialog.Trigger>
  <Dialog.Root handle={handle}>
    <Dialog.Portal>
      <Dialog.Popup>
        <Dialog.Title>Shared Dialog</Dialog.Title>
      </Dialog.Popup>
    </Dialog.Portal>
  </Dialog.Root>
</>
```

## Nested Dialogs

Child dialogs automatically style parent with semi-transparent overlay:

```tsx
<Dialog.Root>
  <Dialog.Trigger>Open Parent</Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Backdrop />
    <Dialog.Popup>
      <Dialog.Title>Parent Dialog</Dialog.Title>

      <Dialog.Root>
        <Dialog.Trigger>Open Child</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Backdrop />
          <Dialog.Popup>
            <Dialog.Title>Child Dialog</Dialog.Title>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </Dialog.Popup>
  </Dialog.Portal>
</Dialog.Root>
```

Use `[data-nested-dialog-open]` selector for custom parent styling and `--nested-dialogs` CSS variable to track nesting depth.

## Focus Management

```tsx
<Dialog.Popup
  initialFocus={inputRef}
  finalFocus={triggerRef}
>
  ...
</Dialog.Popup>
```

## Scrollable Content

For scrollable dialogs, use `Dialog.Viewport`:

```tsx
<Dialog.Popup>
  <Dialog.Viewport className="max-h-[80vh] overflow-auto">
    <Dialog.Title>Scrollable Content</Dialog.Title>
    {/* Long content here */}
  </Dialog.Viewport>
</Dialog.Popup>
```

## Data Attributes

- `data-open` / `data-closed`: Current state
- `data-starting-style` / `data-ending-style`: Animation states
- `data-nested-dialog-open`: Has open nested dialog
- `data-popup-open`: Trigger state when open

## CSS Variables

- `--nested-dialogs`: Number of nested dialogs open
