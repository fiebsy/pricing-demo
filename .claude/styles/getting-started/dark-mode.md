# Dark Mode

How the PAYVA style system handles light and dark themes automatically.

## Overview

Dark mode is implemented via CSS custom properties that automatically swap when the `.dark-mode` class is applied to the `<html>` element. You don't need `dark:` variants in your code.

## How It Works

### 1. Light Mode (Default)

```css
/* theme.css - @theme block */
--color-bg-primary: var(--color-white);
--color-text-primary: var(--color-gray-900);
```

### 2. Dark Mode Override

```css
/* theme.css - .dark-mode class */
.dark-mode {
  --color-bg-primary: var(--color-gray-950);
  --color-text-primary: var(--color-gray-50);
}
```

### 3. Automatic Swap

When you use `bg-primary`, it references `--background-color-primary`, which references `--color-bg-primary`. In dark mode, that variable changes automatically.

```tsx
// This ONE class works in both modes
<div className="bg-primary text-primary" />
```

## Activating Dark Mode

### React Implementation

```tsx
// Add/remove .dark-mode on <html>
document.documentElement.classList.toggle('dark-mode', isDark);
```

### Next.js with ThemeProvider

```tsx
import { useTheme } from 'next-themes';

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Toggle
    </button>
  );
}
```

## Token Mapping

### Background Colors

| Token | Light Mode | Dark Mode |
|-------|------------|-----------|
| `bg-primary` | White | Gray 950 |
| `bg-secondary` | Gray 50 | Gray 900 |
| `bg-tertiary` | Gray 100 | Gray 800 |
| `bg-quaternary` | Gray 200 | Gray 700 |

### Text Colors

| Token | Light Mode | Dark Mode |
|-------|------------|-----------|
| `text-primary` | Gray 900 | Gray 50 |
| `text-secondary` | Gray 700 | Gray 300 |
| `text-tertiary` | Gray 600 | Gray 400 |
| `text-disabled` | Gray 500 | Gray 500 |

### Border Colors

| Token | Light Mode | Dark Mode |
|-------|------------|-----------|
| `border-primary` | Gray 300 | Gray 700 |
| `border-secondary` | Gray 200 | Gray 800 |
| `border-tertiary` | Gray 100 | Gray 800 |

### Status Colors

Status colors also shift for better contrast:

| Token | Light Mode | Dark Mode |
|-------|------------|-----------|
| `bg-error-primary` | Error 50 | Error 950 |
| `text-error-primary` | Error 600 | Error 400 |
| `bg-success-primary` | Success 50 | Success 950 |
| `text-success-primary` | Success 600 | Success 400 |

## Special Tokens

### Alpha Colors

```css
/* These swap black/white for overlays */
--color-alpha-white: rgb(255 255 255);  /* Light mode */
--color-alpha-black: rgb(0 0 0);

.dark-mode {
  --color-alpha-white: rgb(12 14 18);   /* Swapped in dark */
  --color-alpha-black: rgb(255 255 255);
}
```

### Inverted Backgrounds

For elements that need to be dark in light mode and light in dark mode:

```tsx
// Tooltips, toasts that need opposite contrast
<div className="bg-inverted-primary text-on-inverted-primary">
  This is always high contrast
</div>
```

| Token | Light Mode | Dark Mode |
|-------|------------|-----------|
| `bg-inverted-primary` | Gray 900 | White |
| `text-on-inverted-primary` | White | Gray 900 |

### Intermediate Steps

Fine-grained background variations between primary/secondary/tertiary:

```tsx
// Subtle step toward secondary
<div className="bg-primary_s1" />

// Subtle step toward primary from secondary
<div className="bg-secondary_p1" />

// Steps toward tertiary
<div className="bg-secondary_t1" />
<div className="bg-secondary_t2" />
```

## Chart Colors

Chart colors adjust for dark mode readability:

```tsx
// Chart series (auto-adjusts)
<div className="bg-chart-1" />      // Green - Active
<div className="bg-chart-2" />      // Lavender - At Risk
<div className="bg-chart-3" />      // Magenta - Clawback
<div className="bg-chart-4" />      // Teal - Paid Off

// Alpha variants for fills
<div className="bg-chart-1-alpha-20" />
```

## Testing Dark Mode

```bash
# In browser DevTools console
document.documentElement.classList.add('dark-mode')
document.documentElement.classList.remove('dark-mode')
```

## Common Mistakes

### Using dark: variants

```tsx
// BAD: Manual dark mode
<div className="bg-white dark:bg-gray-900" />

// GOOD: Semantic tokens handle it
<div className="bg-primary" />
```

### Forgetting _hover tokens

```tsx
// BAD: Only base color
<button className="bg-secondary hover:bg-gray-100" />

// GOOD: Semantic hover token
<button className="bg-secondary hover:bg-secondary_hover" />
```

### Hardcoding contrast colors

```tsx
// BAD: Assumes light mode
<div className="bg-gray-900 text-white" />

// GOOD: Use inverted tokens
<div className="bg-inverted-primary text-on-inverted-primary" />
```

## Related

- [Colors](../tokens/colors.md): Complete color token reference
- [Architecture](../tokens/architecture.md): How tokens are structured
