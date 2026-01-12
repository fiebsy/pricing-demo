# Base UI

This is the documentation for the `@base-ui/react` package.
It contains a collection of components and utilities for building user interfaces in React.
The library is designed to be composable and styling agnostic.

**Package**: `@base-ui/react` (previously `@base-ui-components/react`)

---

## Overview

- [Quick start](./overview/quick-start.md): A quick guide to getting started with Base UI.
- [Accessibility](./overview/accessibility.md): Learn how to make the most of Base UI's accessibility features and guidelines.
- [Releases](./overview/releases.md): Changelogs for each Base UI release.
- [About Base UI](./overview/about.md): An overview of Base UI, providing information on its history, team, and goals.

---

## Handbook

- [Styling](./handbook/styling.md): Learn how to style Base UI components with your preferred styling engine.
- [Animation](./handbook/animation.md): A guide to animating Base UI components.
- [Composition](./handbook/composition.md): A guide to composing Base UI components with your own React components.
- [Customization](./handbook/customization.md): A guide to customizing the behavior of Base UI components.
- [Forms](./handbook/forms.md): A guide to building forms with Base UI components.
- [TypeScript](./handbook/typescript.md): A guide to using TypeScript with Base UI.

---

## Components

### Layout & Navigation
- [Accordion](./components/accordion.md): Collapsible panels with headings.
- [Collapsible](./components/collapsible.md): Panel controlled by a button.
- [Navigation Menu](./components/navigation-menu.md): Links and menus for website navigation.
- [Scroll Area](./components/scroll-area.md): Native scroll container with custom scrollbars.
- [Separator](./components/separator.md): Accessible divider between content.
- [Tabs](./components/tabs.md): Toggle between related panels.
- [Toolbar](./components/toolbar.md): Groups buttons and controls.

### Dialogs & Popups
- [Alert Dialog](./components/alert-dialog.md): Requires user response to proceed.
- [Dialog](./components/dialog.md): Opens on top of the entire page.
- [Popover](./components/popover.md): Accessible popup anchored to a button.
- [Preview Card](./components/preview-card.md): Appears on link hover with preview.
- [Tooltip](./components/tooltip.md): Hint on hover or focus.
- [Toast](./components/toast.md): Generate notifications.

### Menus
- [Menu](./components/menu.md): Dropdown list of actions with keyboard navigation.
- [Menubar](./components/menubar.md): Application commands and options.
- [Context Menu](./components/context-menu.md): Appears on right-click or long press.

### Form Controls
- [Button](./components/button.md): Can be rendered as another tag or focusable when disabled.
- [Checkbox](./components/checkbox.md): Easy to customize checkbox.
- [Checkbox Group](./components/checkbox-group.md): Shared state for series of checkboxes.
- [Field](./components/field.md): Labeling and validation for form controls.
- [Fieldset](./components/fieldset.md): Groups fields with stylable legend.
- [Form](./components/form.md): Consolidated error handling.
- [Input](./components/input.md): Text input component.
- [Number Field](./components/number-field.md): Increment/decrement buttons and scrub area.
- [Radio](./components/radio.md): Radio button selection.
- [Slider](./components/slider.md): Range input with easy styling.
- [Switch](./components/switch.md): On/off toggle indicator.
- [Toggle](./components/toggle.md): Two-state button.
- [Toggle Group](./components/toggle-group.md): Shared state for toggle buttons.

### Selection & Search
- [Autocomplete](./components/autocomplete.md): Input with filtered options list.
- [Combobox](./components/combobox.md): Input with predefined items to select.
- [Select](./components/select.md): Dropdown menu for predefined values.

### Display
- [Avatar](./components/avatar.md): User profile display with fallback.
- [Meter](./components/meter.md): Graphical display of numeric value.
- [Progress](./components/progress.md): Task completion status.

---

## Utilities

- [Portal](./utilities/portal.md): Renders children in a different part of the DOM.
- [Direction Provider](./utilities/direction-provider.md): Enables RTL behavior for Base UI components.

---

## Quick Reference

### Installation
```bash
npm i @base-ui/react
```

### Import Pattern
```tsx
import { Dialog } from '@base-ui/react/dialog';
import { Popover } from '@base-ui/react/popover';
import { Menu } from '@base-ui/react/menu';
```

### Common Data Attributes
| Attribute | Description |
|-----------|-------------|
| `data-open` | Element is open/visible |
| `data-closed` | Element is closed/hidden |
| `data-disabled` | Element is disabled |
| `data-highlighted` | Element is highlighted (menus) |
| `data-checked` | Checkbox/radio is selected |
| `data-starting-style` | Initial animation state |
| `data-ending-style` | Exit animation state |

### CSS Variables (Positioning)
```css
--anchor-width      /* Trigger element width */
--anchor-height     /* Trigger element height */
--available-width   /* Available viewport width */
--available-height  /* Available viewport height */
--transform-origin  /* Animation anchor point */
```

---

## External Resources

- [Base UI Website](https://base-ui.com)
- [GitHub Repository](https://github.com/mui/base-ui)
- [Discord Community](https://base-ui.com/r/discord)
