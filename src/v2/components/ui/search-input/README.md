# SearchInput Component

Production-ready search input component built on Squircle + Huge Icons with semantic design tokens and advanced shadow system.

## ✨ Features

- **Optimized Squircle Container**: Smooth superellipse shape with 6 roundness levels
- **GPU-Accelerated Shadows**: CSS filter drop-shadow for optimal performance
- **Huge Icons Integration**: Search01 icon with muted color pattern (utility-gray-500)
- **2 Size Variants**: sm (16px icon) / md (20px icon)
- **Clearable**: Built-in clear button when value exists
- **Keyboard Shortcut**: Optional shortcut display (⌘K)
- **Focus States**: Dynamic border color changes on focus
- **Validation States**: Invalid/error state styling
- **Disabled State**: Full disabled styling support
- **Label & Hint**: Optional label above and hint text below
- **Immediate Rendering**: No FOUC - content visible immediately
- **Semantic Tokens**: Full V2 design system integration
- **Type Safe**: Full TypeScript support

## 🚀 Quick Start

```tsx
import { SearchInput } from '@/v2/components/ui/custom/search-input'

// Basic usage
<SearchInput
  placeholder="Search..."
  value={query}
  onChange={setQuery}
/>

// With clearable
<SearchInput
  placeholder="Search products..."
  value={query}
  onChange={setQuery}
  clearable
/>

// With label and hint
<SearchInput
  size="md"
  label="Search products"
  hint="Search by name, SKU, or category"
  value={query}
  onChange={setQuery}
  clearable
/>

// Custom styling
<SearchInput
  roundness={3}
  shadow="md"
  placeholder="Advanced search..."
  value={query}
  onChange={setQuery}
/>
```

## 📖 API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md'` | `'sm'` | Input size variant |
| `placeholder` | `string` | `'Search...'` | Placeholder text |
| `value` | `string` | `''` | Input value |
| `onChange` | `(value: string) => void` | - | Change handler |
| `disabled` | `boolean` | `false` | Disabled state |
| `invalid` | `boolean` | `false` | Invalid/error state |
| `label` | `string` | - | Label text (above input) |
| `hint` | `ReactNode` | - | Hint text (below input) |
| `roundness` | `0 \| 1 \| 2 \| 3 \| 4 \| 5` | `2` | Squircle roundness level |
| `shadow` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'sm'` | Shadow preset |
| `backgroundColor` | `string` | `'background-primary'` | Background semantic token |
| `borderColor` | `string` | `'border-primary'` | Border semantic token |
| `className` | `string` | - | Additional CSS class |
| `ariaLabel` | `string` | - | ARIA label for accessibility |
| `autoFocus` | `boolean` | `false` | Auto focus on mount |
| `clearable` | `boolean` | `false` | Show clear button |
| `onClear` | `() => void` | - | Clear button callback |
| `shortcut` | `string` | - | Keyboard shortcut display |
| `fullWidth` | `boolean` | `false` | Full width container |

## 🎨 Size Configuration

| Size | Icon | Vertical Padding | Horizontal Padding | Text Size |
|------|------|------------------|-------------------|-----------|
| **sm** | 16px | 8px | 36px left / 12px right | text-sm |
| **md** | 20px | 10px | 44px left / 14px right | text-md |

**Icon Sizing**: Based on Huge Icons with consistent stroke width (2px)
- sm: 16px icon
- md: 20px icon (matches Untitled UI 20px standard)

## 🌈 Color Scheme

### Default State
- **Background**: `background-primary` (white in light mode)
- **Border**: `border-primary` (gray-300)
- **Text**: `text-primary`
- **Placeholder**: `text-placeholder`
- **Icon**: `utility-gray-500` (muted)

### Focus State
- **Border**: `border-brand` (brand-500) with 1px width (consistent, no layout shift)

### Disabled State
- **Background**: `background-disabled_subtle`
- **Border**: `border-disabled`
- **Text**: `text-disabled`
- **Icon**: `utility-gray-300`

### Invalid State
- **Border**: `border-error_subtle` (default - matches Untitled UI `ring-error_subtle`)
- **Border on Focus**: `border-error` (1px, consistent width)
- **Hint Text**: `text-error-primary`
- **No Layout Shift**: 1px border width always

## 🎯 Common Patterns

### Basic Search

```tsx
<SearchInput
  placeholder="Search..."
  value={query}
  onChange={setQuery}
/>
```

### With Label & Clearable

```tsx
<SearchInput
  label="Search products"
  placeholder="Search by name or SKU..."
  value={query}
  onChange={setQuery}
  clearable
  onClear={() => {
    setQuery('')
    // Additional logic...
  }}
/>
```

### With Hint Text

```tsx
<SearchInput
  label="Search"
  placeholder="Enter keywords..."
  hint="Search by product name, category, or SKU"
  value={query}
  onChange={setQuery}
/>
```

### With Validation

```tsx
<SearchInput
  label="Search"
  placeholder="Minimum 3 characters..."
  value={query}
  onChange={setQuery}
  invalid={query.length > 0 && query.length < 3}
  hint={query.length > 0 && query.length < 3 ? 'Please enter at least 3 characters' : 'Search by keyword'}
/>
```

### With Keyboard Shortcut

```tsx
<SearchInput
  placeholder="Quick search..."
  shortcut="⌘K"
  value={query}
  onChange={setQuery}
/>
```

### Custom Roundness & Shadow

```tsx
<SearchInput
  roundness={3}
  shadow="md"
  placeholder="Advanced search..."
  value={query}
  onChange={setQuery}
/>
```

### Full Width

```tsx
<SearchInput
  fullWidth
  placeholder="Search across all records..."
  value={query}
  onChange={setQuery}
  clearable
/>
```

## 🔧 Advanced Usage

### Custom Styling

```tsx
<SearchInput
  roundness={4}
  shadow="lg"
  backgroundColor="background-secondary"
  borderColor="border-secondary"
  placeholder="Custom styled search..."
  value={query}
  onChange={setQuery}
/>
```

### Controlled Clear Button

```tsx
const handleClear = () => {
  setQuery('')
  // Log analytics event
  analytics.track('search_cleared')
  // Reset filters
  resetFilters()
}

<SearchInput
  clearable
  onClear={handleClear}
  value={query}
  onChange={setQuery}
/>
```

### With Auto Focus

```tsx
<SearchInput
  autoFocus
  placeholder="Start typing..."
  value={query}
  onChange={setQuery}
/>
```

## 🎭 States

### Default
```tsx
<SearchInput placeholder="Search..." value={query} onChange={setQuery} />
```

### Focus
Automatically handled - border color changes to `border-brand`

### Disabled
```tsx
<SearchInput disabled placeholder="Search disabled..." value="" onChange={() => {}} />
```

### Invalid
```tsx
<SearchInput
  invalid
  placeholder="Search..."
  value={query}
  onChange={setQuery}
  hint="Please enter a valid search query"
/>
```

### With Value (Clearable)
```tsx
<SearchInput
  clearable
  placeholder="Search..."
  value="existing search"
  onChange={setQuery}
/>
```

## 🧪 Interactive Gallery

Visit the interactive gallery to experiment with all features:

```
http://localhost:3001/v2/playground/ui/gallery/search-comparison
```

Gallery features:
- Side-by-side comparison with Untitled UI Input
- Live configuration controls (size, roundness, shadow, states)
- Interactive state toggles (disabled, invalid, clearable)
- Code examples
- Technical implementation details

## 🔄 vs Untitled UI Input

| Feature | SearchInput (Squircle) | Untitled UI Input |
|---------|------------------------|-------------------|
| Container | Squircle SVG (superellipse) | Standard border-radius |
| Shadow | Duplicate method (6 presets) | Ring-based shadow-xs |
| Icons | Huge Icons (16-20px scaled) | Untitled UI (20px) |
| Roundness | 6 levels (0-5) | Fixed 8px (rounded-lg) |
| Clear Button | Built-in | Manual implementation |
| FOUC Prevention | fadeInOnMount | N/A |
| Border System | 1px border always (no layout shift) | ring-1 + ring-2 on focus (shadow-based) |
| Focus State | border-brand (1px) | ring-brand ring-2 (shadow-based 2px) |
| Invalid State | border-error_subtle → border-error (1px) | ring-error_subtle → ring-error ring-2 |
| Layout Shift | **None** (consistent 1px border) | **None** (shadow-based rings) |
| Transition | duration-100 ease-linear | duration-100 ease-linear |
| Disabled Hover | No hover effect | No hover effect |
| Accessibility | Standard input | React Aria (enhanced) |

**Key Differences from Untitled UI:**
- 🔶 Border width: 1px always (vs Untitled UI's ring-2 shadow for 2px appearance)
- ✅ Invalid state colors (`ring-error_subtle` → `ring-error`)
- ✅ Transition timing (100ms linear)
- ✅ No hover effects when disabled
- ✅ Hint text size consistency (text-xs)
- ✅ Zero layout shift on focus (consistent 1px border)

**Note:** Squircle uses SVG-based borders, so we maintain 1px consistently to prevent layout shift. Untitled UI uses shadow-based `ring-2` for 2px appearance without layout shift. The visual difference is minimal (1px vs 2px border on focus).

**When to use SearchInput:**
- Need custom roundness and shadow control
- Want Squircle aesthetic consistency with Badge/Button
- Prefer Huge Icons integration
- Need built-in clearable functionality
- Building V2 dashboard components

**When to use Untitled UI Input:**
- Need React Aria accessibility features
- Want tooltip support
- Prefer production-tested reliability
- Building standard forms

## 📁 File Structure

```
src/v2/components/ui/custom/search-input/
├── README.md              # Documentation
├── index.tsx              # Public exports
├── component.tsx          # Main SearchInput component
├── types.ts              # TypeScript interfaces
└── config.ts             # Size/color configurations
```

## 🎨 Technical Implementation

### Squircle Integration
- Uses optimized Squircle component as container (replaces `<AriaGroup>`)
- CSS filter drop-shadow for GPU-accelerated rendering
- Dynamic roundness and shadow configuration
- Immediate content rendering (no FOUC)

### Icon Integration
- Search01 icon from Huge Icons (`@hugeicons-pro/core-stroke-rounded`)
- Positioned absolutely within Squircle content area
- Muted color pattern: `var(--color-utility-gray-500)`
- Clear button uses CancelCircle icon

### Focus Management
- State-driven focus tracking (`isFocused`)
- Dynamic border color changes based on state
- Maintains focus when clear button clicked

### Performance
- Memoized with useCallback for handlers
- Optimized Squircle rendering
- ResizeObserver for dynamic sizing

## 🐛 Troubleshooting

### Icon not showing?
- Verify Huge Icons Pro is installed: `@hugeicons-pro/core-stroke-rounded`
- Check icon imports in component.tsx

### Clear button not appearing?
- Ensure `clearable={true}` prop is set
- Verify `value` prop has content

### Focus state not working?
- Check that input is not disabled
- Verify border color tokens are loaded

### Shadow not rendering?
- Ensure `shadow` prop is not set to `'none'`
- CSS filter shadows are GPU-accelerated (check browser compatibility)
- Try larger shadow preset (md, lg, xl)

### Styling conflicts?
- Use `className` prop to add additional styles
- Override colors with `backgroundColor` and `borderColor` props
- Check for parent container overflow hidden

## 📚 Types

```typescript
export interface SearchInputProps {
  size?: 'sm' | 'md'
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  invalid?: boolean
  label?: string
  hint?: ReactNode
  roundness?: 0 | 1 | 2 | 3 | 4 | 5
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  backgroundColor?: string
  borderColor?: string
  className?: string
  ariaLabel?: string
  autoFocus?: boolean
  clearable?: boolean
  onClear?: () => void
  shortcut?: string
  fullWidth?: boolean
}
```

## ✅ Success Criteria

- [x] Component matches Untitled UI Input functionality
- [x] Follows Badge/Button pattern for Squircle integration
- [x] Huge Icons properly integrated with muted colors
- [x] All states working (focus, disabled, invalid)
- [x] Gallery page shows side-by-side comparison
- [x] Accessibility maintained (keyboard nav, ARIA)
- [x] Performance optimized (no FOUC, smooth animations)
- [x] TypeScript types fully defined
- [x] Semantic tokens integrated
- [x] Clearable functionality working

## 🎉 Credits

Built with precision for the PAYVA V2 design system following the proven Badge/Button Squircle pattern.

---

_For live examples and interactive testing, visit `/v2/playground/ui/gallery/search-comparison`_
