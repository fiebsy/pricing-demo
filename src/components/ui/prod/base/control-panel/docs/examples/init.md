# Examples

Working examples demonstrating UnifiedControlPanel usage patterns.

---

## Topics

- [Basic Usage](./basic-usage.md): Minimal setup with essential controls
- [Presets](./presets.md): Preset management and state restoration
- [Advanced](./advanced.md): Custom controls, composition, and patterns

---

## Quick Start

```tsx
import {
  UnifiedControlPanel,
  type PanelConfig,
  type ControlChangeEvent,
} from '@/modules/design-system/v2/components/ui/prod/base/control-panel'

function Demo() {
  const [columns, setColumns] = useState(3)

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
                value: columns,
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

  const handleChange = (event: ControlChangeEvent) => {
    if (event.controlId === 'columns') {
      setColumns(event.value as number)
    }
  }

  return <UnifiedControlPanel config={config} onChange={handleChange} />
}
```
