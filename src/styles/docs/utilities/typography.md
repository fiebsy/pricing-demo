# Typography Utilities

Font families and display text size utilities.

## Overview

Typography utilities provide access to custom font families and display-scale text sizes. Standard body text sizes use Tailwind's default scale.

**File Location:** `src/styles/utilities/typography.css`

## Font Families

### Available Fonts

| Utility | Font Stack | Usage |
|---------|------------|-------|
| `font-body` | Neue Haas Grotesk Text + fallbacks | Body text |
| `font-display` | Neue Haas Grotesk Display + fallbacks | Headings |
| `font-mono` | Roboto Mono + fallbacks | Code |

### Font Stack Details

```css
--font-body: 'Neue Haas Grotesk Text', -apple-system, 'Segoe UI', Roboto, Arial, sans-serif;
--font-display: 'Neue Haas Grotesk Display', -apple-system, 'Segoe UI', Roboto, Arial, sans-serif;
--font-mono: ui-monospace, 'Roboto Mono', SFMono-Regular, Menlo, Monaco, Consolas, monospace;
```

### Usage Examples

```tsx
// Body text (default)
<p className="font-body text-primary">
  Regular paragraph text uses the body font.
</p>

// Display headings
<h1 className="font-display text-display-xl text-primary">
  Hero Heading
</h1>

// Code blocks
<code className="font-mono text-sm bg-secondary px-1 rounded">
  const x = 42;
</code>

// Mixed usage
<article>
  <h2 className="font-display text-display-md">Article Title</h2>
  <p className="font-body text-md">Body content...</p>
  <pre className="font-mono text-sm">Code example</pre>
</article>
```

## Display Text Sizes

Display sizes are for headings and hero text. They include optimized line-height and letter-spacing.

### Size Scale

| Utility | Font Size | Line Height | Letter Spacing |
|---------|-----------|-------------|----------------|
| `text-display-xs` | 24px | 32px | — |
| `text-display-sm` | 30px | 38px | — |
| `text-display-md` | 36px | 44px | -0.72px |
| `text-display-lg` | 48px | 60px | -0.96px |
| `text-display-xl` | 60px | 72px | -1.2px |
| `text-display-2xl` | 72px | 90px | -1.44px |

**Note:** Larger sizes have negative letter-spacing for optical balance.

### Usage Examples

```tsx
// Hero section
<h1 className="text-display-2xl font-display text-primary">
  Welcome to PAYVA
</h1>

// Page title
<h1 className="text-display-xl font-display text-primary">
  Dashboard
</h1>

// Section heading
<h2 className="text-display-lg font-display text-primary">
  Recent Activity
</h2>

// Subsection heading
<h3 className="text-display-md font-display text-primary">
  Transaction Details
</h3>

// Card title
<h4 className="text-display-sm font-display text-primary">
  Order Summary
</h4>

// Small heading
<h5 className="text-display-xs font-display text-primary">
  Notes
</h5>
```

### Responsive Display Sizes

```tsx
<h1 className="
  text-display-sm
  sm:text-display-md
  md:text-display-lg
  lg:text-display-xl
  font-display
  text-primary
">
  Responsive Hero Heading
</h1>
```

## Body Text Sizes

Standard Tailwind text utilities with custom values:

| Utility | Font Size | Line Height |
|---------|-----------|-------------|
| `text-xs` | 12px | 18px |
| `text-sm` | 14px | 20px |
| `text-md` | 16px | 24px |
| `text-lg` | 18px | 28px |
| `text-xl` | 20px | 30px |

```tsx
<p className="text-xs text-tertiary">Caption text</p>
<p className="text-sm text-secondary">Small text</p>
<p className="text-md text-primary">Default body text</p>
<p className="text-lg text-primary">Large text</p>
<p className="text-xl text-primary">Lead paragraph</p>
```

## Typography Patterns

### Page Header

```tsx
<header className="mb-8">
  <h1 className="text-display-lg font-display text-primary">
    Page Title
  </h1>
  <p className="text-lg text-secondary mt-2">
    Page description with supporting context.
  </p>
</header>
```

### Article Layout

```tsx
<article className="max-w-prose">
  <h1 className="text-display-xl font-display text-primary mb-4">
    Article Title
  </h1>

  <p className="text-lg text-secondary mb-6">
    Lead paragraph introducing the article content.
  </p>

  <h2 className="text-display-sm font-display text-primary mt-8 mb-4">
    Section Heading
  </h2>

  <p className="text-md text-primary mb-4">
    Body text content...
  </p>

  <h3 className="text-display-xs font-display text-primary mt-6 mb-3">
    Subsection
  </h3>

  <p className="text-md text-primary">
    More content...
  </p>
</article>
```

### Card with Typography

```tsx
<div className="bg-secondary rounded-xl p-6">
  <h3 className="text-display-xs font-display text-primary">
    Card Title
  </h3>
  <p className="text-sm text-secondary mt-2">
    Card description text with additional context.
  </p>
  <span className="text-xs text-tertiary mt-4 block">
    Updated 2 hours ago
  </span>
</div>
```

### Data Display

```tsx
<div className="text-center">
  <span className="text-display-lg font-display text-primary">
    $12,345
  </span>
  <span className="text-sm text-secondary block mt-1">
    Total Revenue
  </span>
</div>
```

### Form Labels

```tsx
<label className="block">
  <span className="text-sm font-medium text-primary">
    Email Address
  </span>
  <input
    type="email"
    className="mt-1 w-full text-md text-primary"
  />
  <span className="text-xs text-tertiary mt-1 block">
    We'll never share your email.
  </span>
</label>
```

## Font Weight Pairing

Display fonts typically use medium or semibold weights:

```tsx
// Heading with medium weight
<h1 className="text-display-xl font-display font-medium text-primary">
  Heading
</h1>

// Heading with semibold
<h2 className="text-display-lg font-display font-semibold text-primary">
  Subheading
</h2>

// Body with regular weight (default)
<p className="text-md font-body text-primary">
  Body text
</p>

// Emphasized body
<p className="text-md font-body font-medium text-primary">
  Important text
</p>
```

## Accessibility Notes

1. **Minimum font size**: Use `text-xs` (12px) as minimum for readability
2. **Line height**: All sizes include appropriate line-height for readability
3. **Color contrast**: Pair with appropriate text color utilities for WCAG compliance
4. **Font scaling**: Sizes use rem units, respecting user preferences

## Related

- [Spacing & Sizing](../tokens/spacing-sizing.md): Complete typography token reference
- [Colors](./colors.md): Text color utilities
- [All Utilities](../reference/all-utilities.md): Complete utility list
