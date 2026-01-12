# UnifiedControlPanel

A fully-featured control panel component for building interactive configuration interfaces with tabs, presets, and collapsible sections.

**Location**: `@/modules/design-system/v2/components/ui/prod/base/control-panel`

---

## API Reference

- [Types](./api/types.md): Control types, section definitions, and event interfaces
- [Props](./api/props.md): Component props and configuration options
- [Context](./api/context.md): Panel state management and hooks

---

## Controls

- [Slider](./controls/slider.md): Numeric range inputs with formatted labels
- [Select](./controls/select.md): Dropdown selection with color swatches
- [Toggle](./controls/toggle.md): Boolean checkbox controls
- [Custom](./controls/custom.md): Render arbitrary content as a control

---

## Components

- [ActionBar](./components/action-bar.md): Presets, copy config, and reset buttons
- [TabNavigation](./components/tab-navigation.md): Scrollable tab list with minimize
- [SectionRenderer](./components/section-renderer.md): Collapsible control groups
- [MinimizedHeader](./components/minimized-header.md): Compact expand button

---

## Examples

- [Basic Usage](./examples/basic-usage.md): Minimal panel setup
- [Presets](./examples/presets.md): Preset management and switching
- [Advanced](./examples/advanced.md): Custom controls and composition

---

## Quick Reference

### Import

```tsx
import {
  UnifiedControlPanel,
  type PanelConfig,
  type ControlChangeEvent,
} from '@/modules/design-system/v2/components/ui/prod/base/control-panel'
```

### Minimal Example

```tsx
const config: PanelConfig = {
  sections: [
    {
      id: 'layout',
      label: 'Layout',
      title: 'Layout Settings',
      groups: [
        {
          controls: [
            {
              id: 'columns',
              type: 'slider',
              label: 'Columns',
              value: 3,
              min: 1,
              max: 6,
              step: 1,
            },
          ],
        },
      ],
    },
  ],
}

function MyPanel() {
  const handleChange = (event: ControlChangeEvent) => {
    console.log(event.controlId, event.value)
  }

  return <UnifiedControlPanel config={config} onChange={handleChange} />
}
```

---

## Related Documentation

| Topic | Location |
|-------|----------|
| Design System Architecture | `docs/v2/ARCHITECTURE.md` |
| Base UI Components | `docs/v2/base-ui/init.md` |
