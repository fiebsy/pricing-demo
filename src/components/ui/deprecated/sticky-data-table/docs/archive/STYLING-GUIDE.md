# StickyDataTable Styling Guide (ARCHIVED)

> **⚠️ DEPRECATED**: This documentation is archived. See [../STYLING.md](../STYLING.md) for current styling documentation.

---

> **⚠️ CRITICAL: Read this guide before implementing any cell rendering logic.**

This document defines the **strict styling rules** for the StickyDataTable component. All implementations MUST follow these guidelines to ensure visual consistency across the PAYVA platform.

---

## 🎯 Core Principles

1. **Text-based font sizes only** - Use semantic size classes, never arbitrary values
2. **Normal weight fonts by default** - Avoid bold unless explicitly instructed
3. **No extra colors** - Use semantic tokens only, avoid decorative colors
4. **Untitled UI components first** - Always prefer Untitled UI over custom implementations
5. **Monospace for codes** - Status codes, IDs, and technical values use `font-mono`

---

## 📏 Typography Rules

### Font Size Hierarchy

| Use Case | Class | Size | When to Use |
|----------|-------|------|-------------|
| **Body text** | `text-sm` | 14px | ✅ DEFAULT - All primary cell content |
| **Descriptions/Subtext** | `text-xs` | 12px | Secondary info, metadata, supporting details |
| **Headers** | `text-xs` | 12px | Column headers only |
| **Status codes** | `text-xs font-mono` | 12px | HTTP codes, IDs, technical values |
| **Badges** | `text-xs` | 12px | Via Untitled UI Badge component |

### Font Weight Rules

| Weight | Class | When to Use |
|--------|-------|-------------|
| **Normal** | `font-normal` | ✅ DEFAULT - All body text |
| **Medium** | `font-medium` | Column headers only, count labels |
| **Semibold** | `font-semibold` | ⚠️ RARELY - Only for emphasis when instructed |
| **Bold** | `font-bold` | ❌ NEVER - Do not use in tables |

### ❌ NEVER DO THIS

```tsx
// Wrong: Using bold for emphasis
<span className="font-bold text-lg">{value}</span>

// Wrong: Arbitrary font sizes
<span className="text-[13px]">{value}</span>

// Wrong: Using colored text for decoration
<span className="text-blue-500">{status}</span>
```

### ✅ ALWAYS DO THIS

```tsx
// Correct: Default body text (14px)
<span className="text-sm font-normal text-primary">{value}</span>

// Correct: Descriptions/subtext (12px)
<span className="text-xs font-normal text-secondary">{description}</span>

// Correct: Mono for status codes (12px)
<span className="text-xs font-mono text-tertiary">{statusCode}</span>
```

---

## 🎨 Color Rules

### Semantic Text Colors

| Token | Use Case |
|-------|----------|
| `text-primary` | ✅ DEFAULT - Main content text |
| `text-secondary` | Supporting text, less important info |
| `text-tertiary` | Headers, labels, metadata |
| `text-disabled` | Disabled/inactive states |
| `text-brand-primary` | Brand-related text (rare) |
| `text-error-primary` | Error states only |
| `text-success-primary` | Success states only |
| `text-warning-primary` | Warning states only |

### ❌ Colors to AVOID

```tsx
// Wrong: Raw color scales
<span className="text-gray-900">{value}</span>
<span className="text-blue-600">{link}</span>

// Wrong: CSS variables directly
<span style={{ color: 'var(--color-gray-500)' }}>{value}</span>

// Wrong: Decorative colors
<span className="text-purple-500">{status}</span>
```

### ✅ Correct Color Usage

```tsx
// Default body text
<span className="text-primary">{value}</span>

// Supporting/secondary info
<span className="text-secondary">{metadata}</span>

// Headers and labels
<span className="text-tertiary">{label}</span>

// Status indicators (only when semantically appropriate)
<span className="text-success-primary">{successMessage}</span>
<span className="text-error-primary">{errorMessage}</span>
```

---

## 💻 Code & Status Display

### When to Use Monospace (`font-mono`)

Use monospace font for:
- HTTP status codes (200, 404, 500)
- Transaction IDs
- Contract IDs
- API keys (truncated)
- Technical identifiers
- Timestamps in ISO format

### Code Cell Pattern

```tsx
/**
 * Pattern for displaying status codes, IDs, or technical values
 */
const CodeCell = ({ value }: { value: string }) => (
  <span className="text-xs font-mono text-tertiary">
    {value}
  </span>
)

// Usage in renderCell:
case 'statusCode':
  return <span className="text-xs font-mono text-tertiary">{row.statusCode}</span>

case 'transactionId':
  return <span className="text-xs font-mono text-tertiary">{row.id}</span>
```

### Numeric Values

For numerical data that needs alignment:

```tsx
// Enable tabular numbers in column config
{ key: 'amount', width: 120, align: 'right', useTabularNums: true }

// Render with proper formatting
case 'amount':
  return (
    <span className="text-sm font-normal text-primary">
      ${row.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
    </span>
  )
```

---

## 🧩 Component Usage Rules

### Untitled UI Components - ALWAYS USE

The following Untitled UI components MUST be used instead of custom implementations:

| Component | Import Path | Use Case |
|-----------|-------------|----------|
| `Badge` | `@/modules/design-system/v2/components/ui/untitled-ui/base/badge` | Status indicators |
| `Checkbox` | `@/modules/design-system/v2/components/ui/untitled-ui/base/checkbox` | Selection |
| `Button` | `@/modules/design-system/v2/components/ui/untitled-ui/base/button` | Actions |
| `Tooltip` | `@/modules/design-system/v2/components/ui/untitled-ui/base/tooltip` | Hover info |
| `Avatar` | `@/modules/design-system/v2/components/ui/untitled-ui/base/avatar` | User images |

### Badge Usage for Status

```tsx
import { Badge } from '@/modules/design-system/v2/components/ui/untitled-ui/base/badge'

// Status badge pattern
case 'status':
  return (
    <Badge variant={getStatusVariant(row.status)} size="sm">
      {row.status}
    </Badge>
  )

// Helper function for status → variant mapping
function getStatusVariant(status: string): BadgeVariant {
  switch (status) {
    case 'active': return 'success'
    case 'pending': return 'warning'
    case 'inactive': return 'gray'
    case 'error': return 'error'
    default: return 'gray'
  }
}
```

### ❌ Custom Implementations to AVOID

```tsx
// Wrong: Custom status badge
<div className="rounded-full bg-green-100 px-2 py-0.5 text-green-700">
  Active
</div>

// Wrong: Custom checkbox
<input type="checkbox" checked={isSelected} />

// Wrong: Custom styled button
<button className="bg-blue-500 text-white rounded">Click</button>
```

---

## 📋 Cell Rendering Patterns

### Standard Text Cell

```tsx
case 'name':
  return (
    <span className="text-sm font-normal text-primary">
      {row.name}
    </span>
  )
```

### Cell with Description

```tsx
case 'product':
  return (
    <div className="flex flex-col">
      <span className="text-sm font-normal text-primary">{row.productName}</span>
      <span className="text-xs font-normal text-secondary">{row.productDescription}</span>
    </div>
  )
```

### Date Cell

```tsx
case 'createdAt':
  return (
    <span className="text-sm font-normal text-primary">
      {formatDate(row.createdAt)}
    </span>
  )
```

### Currency Cell

```tsx
case 'amount':
  return (
    <span className="text-sm font-normal text-primary">
      {formatCurrency(row.amount)}
    </span>
  )
```

### Status with Code

```tsx
case 'status':
  return (
    <div className="flex items-center gap-2">
      <Badge variant={getStatusVariant(row.status)} size="sm">
        {row.statusLabel}
      </Badge>
      <span className="text-xs font-mono text-tertiary">
        {row.statusCode}
      </span>
    </div>
  )
```

### User/Avatar Cell

```tsx
import { Avatar } from '@/modules/design-system/v2/components/ui/untitled-ui/base/avatar'

case 'user':
  return (
    <div className="flex items-center gap-2">
      <Avatar src={row.avatarUrl} fallback={row.initials} size="sm" />
      <span className="text-sm font-normal text-primary">{row.userName}</span>
    </div>
  )
```

### Link/Action Cell

```tsx
case 'viewDetails':
  return (
    <Button variant="link" size="sm" onClick={() => onViewDetails(row.id)}>
      View Details
    </Button>
  )
```

---

## 🎛️ Column Configuration

### Type Definitions for Styling

```tsx
interface ColumnConfig {
  key: string
  width: number
  align: 'left' | 'center' | 'right'
  // ... other props

  /**
   * Enable tabular numbers for proper digit alignment
   * @default true - Enabled by default for numeric alignment
   * Set to false for text-only columns
   */
  useTabularNums?: boolean

  /**
   * Allow text wrapping in cells
   * @default false - Single line, truncated
   */
  allowTextWrap?: boolean
}
```

### Column Config Examples

```tsx
const columns: ColumnConfig[] = [
  // ID column - mono font, no tabular nums needed
  { key: 'id', width: 80, align: 'left', useTabularNums: false },

  // Name - text column
  { key: 'name', width: 200, align: 'left', useTabularNums: false },

  // Description - wrapped text
  { key: 'description', width: 250, align: 'left', allowTextWrap: true, useTabularNums: false },

  // Amount - right aligned, tabular nums for alignment
  { key: 'amount', width: 120, align: 'right', useTabularNums: true },

  // Date - standard text
  { key: 'date', width: 150, align: 'left', useTabularNums: false },

  // Status - centered badge
  { key: 'status', width: 100, align: 'center', useTabularNums: false },
]
```

---

## ⚠️ Exception Handling

### When Different Styling is Needed

If a specific use case requires deviation from these rules:

1. **Document the exception** - Add a comment explaining why
2. **Get approval** - Check with design team
3. **Use sparingly** - Exceptions should be rare
4. **Keep it minimal** - Smallest possible deviation

```tsx
// EXCEPTION: Highlighted row for current user
// Approved by design team for user identification
// Ticket: PAY-1234
case 'userName':
  return (
    <span className={cn(
      'text-sm font-normal',
      row.isCurrentUser ? 'text-brand-primary font-medium' : 'text-primary'
    )}>
      {row.userName}
    </span>
  )
```

---

## 📝 Checklist for New Implementations

Before implementing `renderCell` for a new table:

- [ ] **Text sizes**: Only using `text-sm` (body) and `text-xs` (descriptions/codes)
- [ ] **Font weights**: Using `font-normal` by default, `font-medium` only for headers
- [ ] **Colors**: Only using semantic tokens (`text-primary`, `text-secondary`, etc.)
- [ ] **Status displays**: Using `Badge` component from Untitled UI
- [ ] **Code/IDs**: Using `font-mono` for technical values
- [ ] **Numbers**: Using `useTabularNums: true` for numeric columns
- [ ] **Components**: Using Untitled UI components (Badge, Checkbox, Button, etc.)
- [ ] **No custom styling**: No arbitrary colors or font sizes

---

## 📚 Related Documentation

- [README.md](../README.md) - Main component documentation
- [DESIGN-TOKENS.md](/.claude/DESIGN-TOKENS.md) - Semantic token reference
- [V2-FRONTEND-PATTERNS.md](/.claude/V2-FRONTEND-PATTERNS.md) - Component patterns

---

**PAYVA Platform** | V2 Design System | Last Updated: December 2024









