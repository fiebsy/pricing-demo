# Route-Scoped Theming System

This directory contains route-specific theme overrides that transform the PAYVA design system colors for specific pages without affecting the rest of the application.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│  Global Theme (theme.css)                                       │
│  ├── Primitives: --color-brand-*, --color-gray-*, etc.         │
│  ├── Semantic Tokens: --color-text-primary, --color-bg-*, etc. │
│  └── Tailwind Properties: --text-color-*, --background-color-* │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  Route Theme Override (.theme-delphi)                           │
│  ├── Overrides primitives with new color values                │
│  ├── Overrides semantic tokens                                  │
│  └── Overrides Tailwind properties (explicit RGB values)       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  Components use semantic classes (text-primary, bg-secondary)   │
│  └── Automatically inherit themed values via CSS cascade       │
└─────────────────────────────────────────────────────────────────┘
```

## Files

| File | Purpose |
|------|---------|
| `theme-delphi.css` | CSS custom property overrides for Delphi.ai color system |
| `delphi-theme-provider.tsx` | Client component that applies theme class to document root |
| `README.md` | This documentation |

---

## Delphi Theme (`theme-delphi.css`)

### Source Analysis

The Delphi.ai color system was extracted from [delphi.ai](https://www.delphi.ai/):

| Delphi Element | Color | Usage |
|----------------|-------|-------|
| Brand Primary | `#ff5c00` / `rgb(255 92 0)` | CTAs, buttons, accents |
| Background | `#fdf6ee` / `rgb(253 246 238)` | Page canvas (cream) |
| Surface | `#f7f0e8` / `rgb(247 240 232)` | Cards, elevated surfaces |
| Border | `#ede4da` / `rgb(237 228 218)` | Dividers, borders |
| Text Primary | `#2b180a` | Headings (deep brown) |
| Text Secondary | `#796758` | Body text |
| Text Muted | `#ad9e8e` | Tertiary text |

### Color Philosophy

| Aspect | PAYVA Default | Delphi Override |
|--------|---------------|-----------------|
| **Mood** | Cool, professional | Warm, earthy, sophisticated |
| **Brand Hue** | Purple | Vibrant Orange |
| **Neutral Base** | Cool gray (blue undertone) | Warm brown (red undertone) |
| **Background** | Pure white `#fff` | Warm cream `#fdf6ee` |
| **Shadows** | Cool gray alpha | Warm brown alpha |

### Token Mapping Strategy

The theme overrides work at three levels:

#### 1. Primitive Level
Raw color values that form the palette foundation.

```css
/* PAYVA Default */
--color-gray-900: rgb(24 29 39);     /* Cool blue-black */
--color-brand-500: rgb(158 119 237); /* Purple */

/* Delphi Override */
--color-gray-900: rgb(20 18 16);     /* Warm near-black */
--color-brand-500: rgb(255 92 0);    /* Orange */
```

#### 2. Semantic Level
Contextual tokens that reference primitives.

```css
/* These reference primitives, so they auto-update */
--color-text-primary: var(--color-gray-900);
--color-bg-primary: var(--color-white);
--color-border-primary: var(--color-gray-300);
```

#### 3. Tailwind Property Level
Direct overrides for Tailwind utility classes. **Uses explicit RGB values** for reliable CSS cascade.

```css
/* Explicit values ensure cascade override works */
--text-color-primary: rgb(20 18 16);           /* NOT var(--color-text-primary) */
--background-color-primary: rgb(253 246 238);  /* NOT var(--color-bg-primary) */
```

> **Why explicit values?** CSS custom property references can have cascade issues when the same property is defined in multiple scopes. Explicit RGB values guarantee the override takes effect.

### Complete Gray Scale

The Delphi gray scale transitions from cream to near-black with warm undertones:

```
Light Mode:
┌────────────────────────────────────────────────────────────────┐
│ gray-25   rgb(253 250 246)  ░░░░░░░░░░░░░░░░░░░░  Warmest white│
│ gray-50   rgb(253 246 238)  ░░░░░░░░░░░░░░░░░░░   Delphi cream │
│ gray-100  rgb(247 240 232)  ░░░░░░░░░░░░░░░░░░    Tan          │
│ gray-200  rgb(237 228 218)  ░░░░░░░░░░░░░░░░░     Border tone  │
│ gray-300  rgb(210 198 184)  ░░░░░░░░░░░░░░░░      Mid-light    │
│ gray-400  rgb(130 118 105)  ░░░░░░░░░░░░          Muted text   │
│ gray-500  rgb(100 88 78)    ░░░░░░░░░░            Mid brown    │
│ gray-600  rgb(75 65 56)     ░░░░░░░░              Secondary    │
│ gray-700  rgb(55 48 42)     ░░░░░░                Dark         │
│ gray-800  rgb(35 30 26)     ░░░░                  Near black   │
│ gray-900  rgb(20 18 16)     ░░░                   Primary text │
│ gray-950  rgb(12 10 9)      ░                     Deepest      │
└────────────────────────────────────────────────────────────────┘
```

### Dark Mode Support

The theme includes complete dark mode overrides. In dark mode:
- Backgrounds become warm dark browns
- Text flips to cream/light tones
- Brand orange brightens for visibility

```css
.theme-delphi.dark-mode,
.dark-mode .theme-delphi {
  --text-color-primary: rgb(253 246 238);      /* Cream text */
  --background-color-primary: rgb(25 22 18);   /* Dark warm surface */
  --color-brand-500: rgb(255 130 60);          /* Brightened orange */
}
```

---

## Usage

### Applying to a Route

1. **Import the CSS file** in your layout:

```tsx
import '@/styles/themes/theme-delphi.css'
```

2. **Use the provider** to apply the theme class to `<html>`:

```tsx
import { DelphiThemeProvider } from '@/styles/themes/delphi-theme-provider'

export default function MyLayout({ children }) {
  return (
    <DelphiThemeProvider>
      <div className="min-h-screen bg-primary">
        {children}
      </div>
    </DelphiThemeProvider>
  )
}
```

### Why Use DelphiThemeProvider?

React portals (used by dropdowns, modals, popovers, tooltips) render **outside** the normal React component tree, typically directly to `document.body`.

If you only add `.theme-delphi` to a wrapper div:

```tsx
// ❌ Portals won't inherit the theme
<div className="theme-delphi">
  <Dropdown /> {/* Portal renders to body, outside .theme-delphi */}
</div>
```

The provider adds the class to `<html>`, ensuring all elements inherit:

```tsx
// ✅ Portals inherit theme from html element
<html class="theme-delphi">
  <body>
    <div id="root">...</div>
    <div id="portal-root">  {/* Dropdown portal - now themed! */}
      ...
    </div>
  </body>
</html>
```

### Full Example: Studio Layout

```tsx
// src/app/studio/layout.tsx

import '@/styles/themes/theme-delphi.css'
import { DelphiThemeProvider } from '@/styles/themes/delphi-theme-provider'

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <DelphiThemeProvider>
      {/* Optional: Hide global nav elements */}
      <style>{`
        nav[class*="fixed"][class*="right-4"] {
          display: none !important;
        }
      `}</style>
      <div className="min-h-screen bg-primary">
        {children}
      </div>
    </DelphiThemeProvider>
  )
}
```

---

## Creating a New Theme

### Step 1: Analyze the Target Design System

Extract key colors from the target brand:
- Primary brand color (buttons, CTAs)
- Background colors (canvas, surfaces, cards)
- Text hierarchy (primary, secondary, muted)
- Border/divider colors
- Shadow tint color

### Step 2: Create the CSS File

```css
/* src/styles/themes/theme-[name].css */

.theme-[name] {
  /* 1. Override primitives */
  --color-brand-500: rgb(...);
  --color-gray-900: rgb(...);
  /* ... full scale ... */

  /* 2. Override semantic tokens */
  --color-text-primary: var(--color-gray-900);
  --color-bg-primary: var(--color-white);
  /* ... */

  /* 3. Override Tailwind properties (EXPLICIT VALUES) */
  --text-color-primary: rgb(...);
  --background-color-primary: rgb(...);
  /* ... */
}

/* Dark mode variant */
.theme-[name].dark-mode,
.dark-mode .theme-[name] {
  /* Inverted values... */
}
```

### Step 3: Create the Provider

```tsx
// src/styles/themes/[name]-theme-provider.tsx

'use client'

import { useEffect } from 'react'

export function [Name]ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.classList.add('theme-[name]')
    return () => {
      document.documentElement.classList.remove('theme-[name]')
    }
  }, [])

  return <>{children}</>
}
```

### Step 4: Apply to Route Layout

```tsx
import '@/styles/themes/theme-[name].css'
import { [Name]ThemeProvider } from '@/styles/themes/[name]-theme-provider'

export default function MyLayout({ children }) {
  return (
    <[Name]ThemeProvider>
      <div className="min-h-screen bg-primary">{children}</div>
    </[Name]ThemeProvider>
  )
}
```

---

## Token Reference

### Background Tokens

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `bg-primary` | Cream | Dark brown | Page background |
| `bg-secondary` | Cream | Darker brown | Cards, elevated |
| `bg-tertiary` | Tan | Even darker | Nested surfaces |
| `bg-quaternary` | Light tan | Darkest | Deep nesting |
| `bg-brand-solid` | Orange | Bright orange | Brand buttons |

### Text Tokens

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `text-primary` | Near-black | Cream | Headings, body |
| `text-secondary` | Dark brown | Light tan | Secondary text |
| `text-tertiary` | Medium brown | Muted tan | Muted text |
| `text-quaternary` | Light brown | Dark tan | Disabled text |
| `text-brand-primary` | Orange | Bright orange | Brand text |

### Border Tokens

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `border-primary` | Warm tan | Dark brown | Primary borders |
| `border-secondary` | Light tan | Darker brown | Subtle borders |
| `border-tertiary` | Cream | Darkest | Faint borders |
| `border-brand` | Orange | Bright orange | Brand borders |

---

## Troubleshooting

### Theme Not Applying

1. **Check CSS import** - Ensure the CSS file is imported in the layout
2. **Check provider** - Ensure `DelphiThemeProvider` wraps the content
3. **Check specificity** - Theme uses `.theme-delphi` selector; ensure no higher-specificity rules override

### Portals Not Themed

The provider must add the class to `document.documentElement`:

```tsx
// ✅ Correct - applies to <html>
document.documentElement.classList.add('theme-delphi')

// ❌ Wrong - only affects wrapper div
<div className="theme-delphi">
```

### Dark Mode Not Working

Ensure both selectors are present in the CSS:

```css
.theme-delphi.dark-mode,      /* When .dark-mode is on same element */
.dark-mode .theme-delphi {    /* When .dark-mode is on ancestor */
  /* overrides */
}
```

### Colors Look Wrong

Check that Tailwind property tokens use **explicit RGB values**, not CSS variable references:

```css
/* ✅ Works reliably */
--text-color-primary: rgb(20 18 16);

/* ❌ May have cascade issues */
--text-color-primary: var(--color-text-primary);
```

---

## Performance Considerations

- **CSS-only** - No JavaScript color calculations at runtime
- **Scoped cleanup** - Provider removes class on unmount, no style leakage
- **No flash** - Theme applies before first paint via CSS cascade
- **Tree-shakeable** - Unused themes don't affect bundle size

---

## Related Files

- `/src/styles/theme.css` - Global PAYVA design system tokens
- `/src/styles/globals.css` - Global styles and imports
- `/src/app/studio/layout.tsx` - Example usage of Delphi theme
