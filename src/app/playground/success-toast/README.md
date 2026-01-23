# SuccessToast Playground

## Status
- [x] Incubating

## Overview

Auto-dismissing success toast with:
- Vertically centered icon
- Progress bar showing time until dismissal
- Configurable styling (shine, corners, colors)
- Adjustable content

## Files

| File | Purpose | Migrate? |
|------|---------|----------|
| `page.tsx` | Playground wrapper | Delete |
| `core/ConfigurableToast.tsx` | Configurable version | Reference only |
| `config/types.ts` | Type definitions | Yes |
| `config/presets.ts` | Preset definitions | Yes (as variants) |
| `config/options.ts` | Control options | No |
| `panels/panel-config.ts` | Panel config | No |

## Production Component

The simplified production component lives at:
`src/components/ui/prod/features/success-toast/success-toast.tsx`

### Usage

```tsx
import { SuccessToast } from '@/components/ui/prod/features/success-toast'

<SuccessToast
  title="Changes saved"
  subtitle="Your profile has been updated"
  visible={showToast}
  onDismiss={() => setShowToast(false)}
  duration={3000}
  padding={16}
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | required | Main message |
| `subtitle` | string | optional | Secondary text |
| `visible` | boolean | required | Show/hide state |
| `onDismiss` | function | optional | Called when progress completes |
| `duration` | number | 3000 | Time in ms before dismiss |
| `padding` | number | 16 | Padding in pixels |
| `icon` | ComponentType | CheckmarkCircle01Icon | Custom icon |

## Presets

| Preset | Description |
|--------|-------------|
| Default | Standard success toast with subtle shine |
| Minimal | Clean, no effects |
| Elevated | Premium with enhanced shine |
| Brand | Brand-colored accents |

## Migration Checklist

- [x] Production component created
- [x] Playground with full configuration
- [ ] Document final preset values
- [ ] Add to component exports
