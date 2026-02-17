# Magnetic Menu Playground

Demonstrates `useMagneticPull` from `motion-plus/react` applied to menu items with three distinct pull modes.

## Pull Modes

| Mode | Description | Use Case |
|------|-------------|----------|
| **None** | Standard menu hover | Traditional UI |
| **Text** | Text/label moves toward cursor | Subtle interaction |
| **Background** | Hover background slides toward cursor | Visual feedback |
| **Both** | Text and background move together | iOS-style interaction |

## Key Pattern

```tsx
const pull = useMagneticPull(ref, strength)
// Returns { x, y } motion values
// Apply via style={pull} to any element
```

## Configuration Options

- **Pull Mode**: none | text | background | both
- **Pull Strength**: 0.05 - 0.3 (5% to 30%)
- **Hover Background**: Semantic color tokens with swatches
- **Background Opacity**: 0.5 - 1.0
- **Border Radius**: 0 - 16px

## Migration Target

`src/components/ui/prod/features/menu`

## Presets

1. **Default (No Pull)** - Standard menu hover
2. **Text Pull** - Text pulls toward cursor
3. **Background Pull** - Background slides toward cursor
4. **Full Pull** - Both pull together (iOS-style)
5. **Subtle Pull** - Very light pull effect (5%)
6. **Brand Accent** - Brand-colored hover with subtle pull

## File Structure

```
magnetic-menu/
├── page.tsx                    # Playground page
├── core/
│   └── magnetic-menu-item.tsx  # Core component
├── config/
│   ├── types.ts               # TypeScript types
│   ├── options.ts             # Control options
│   └── presets.ts             # Preset configurations
├── panels/
│   └── panel-config.ts        # Control panel config
└── README.md                   # This file
```

## Dependencies

- `motion/react` - Animation
- `motion-plus/react` - `useMagneticPull` hook
- `@hugeicons-pro/core-stroke-rounded` - Icons
