# Alert Dialog

A high-quality, unstyled React alert dialog component that requires a user response to proceed.

## Overview

The Alert Dialog is an unstyled React component that displays a dialog requiring user confirmation before proceeding. It provides accessible, keyboard-navigable dialogs with customizable styling.

## Core Components

```tsx
import { AlertDialog } from '@base-ui/react/alert-dialog';

<AlertDialog.Root>
  <AlertDialog.Trigger>Delete</AlertDialog.Trigger>
  <AlertDialog.Portal>
    <AlertDialog.Backdrop />
    <AlertDialog.Popup>
      <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
      <AlertDialog.Description>
        Are you sure you want to delete this item?
      </AlertDialog.Description>
      <AlertDialog.Close>Cancel</AlertDialog.Close>
      <button onClick={handleDelete}>Delete</button>
    </AlertDialog.Popup>
  </AlertDialog.Portal>
</AlertDialog.Root>
```

- **Root**: Container grouping all dialog parts
- **Trigger**: Button that opens the dialog
- **Portal**: Renders dialog outside normal DOM flow
- **Backdrop**: Semi-transparent overlay beneath the dialog
- **Popup**: Dialog content container
- **Title**: Heading element (renders as `<h2>`)
- **Description**: Supporting text (renders as `<p>`)
- **Close**: Button that closes the dialog

## Key Features

### Open State Management

The component supports both uncontrolled and controlled modes:

```tsx
// Uncontrolled
<AlertDialog.Root defaultOpen={false}>

// Controlled
const [open, setOpen] = React.useState(false);
<AlertDialog.Root open={open} onOpenChange={setOpen}>
```

### Multiple Triggers

A single dialog can have multiple trigger buttons:

```tsx
const handle = AlertDialog.createHandle();

<AlertDialog.Trigger handle={handle}>Trigger 1</AlertDialog.Trigger>
<AlertDialog.Trigger handle={handle}>Trigger 2</AlertDialog.Trigger>
<AlertDialog.Root handle={handle}>...</AlertDialog.Root>
```

### Nested Dialogs

Nested dialogs are supported with automatic styling adjustments. The parent dialog receives `data-nested-dialog-open` attributes and the CSS variable `--nested-dialogs` tracks nesting depth.

### Focus Management

Control initial and final focus with `initialFocus` and `finalFocus` props:

```tsx
<AlertDialog.Popup
  initialFocus={(interactionType) => interactionType === 'keyboard' ? confirmButtonRef : false}
  finalFocus={triggerRef}
>
```

## Data Attributes

- `data-open` / `data-closed`: Current open state
- `data-starting-style` / `data-ending-style`: Animation states
- `data-nested`: Nested dialog indicator
- `data-popup-open`: Trigger state when dialog is open

## API Quick Reference

**Root Props**: `defaultOpen`, `open`, `onOpenChange`, `handle`, `triggerId`, `children`

**Trigger Props**: `handle`, `payload`, `id`, `className`, `style`, `render`

**Popup Props**: `initialFocus`, `finalFocus`, `className`, `style`, `render`

**Portal Props**: `container`, `keepMounted`
