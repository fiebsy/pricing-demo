# 📝 EDIT ALL SLIDES HERE

## Quick Start

**ALL slide content is now in ONE file:** `all-slides-config.ts`

Open that file to edit any slide. The existing layout and design remain exactly the same - this just makes editing much easier!

## How to Edit

### 1. Change Text
```typescript
// Just edit the strings directly:
title: 'New Title Here',
subtitle: 'New Subtitle',
```

### 2. Edit Bullets
```typescript
bulletConfig: {
  bullets: [
    { bold: 'Key point', text: 'explanation' },
    { bold: 'Another point', text: 'more details' },
    // Add more bullets here
  ],
}
```

### 3. Update Stats
```typescript
statConfig: {
  stats: [
    { value: '$50M', label: 'New metric' },
    { value: '200%', label: 'Growth rate' },
  ],
}
```

### 4. Modify Chart Data
```typescript
chartConfig: {
  data: [
    { label: '2024', value: 20, displayValue: '$20M' },
    { label: '2025', value: 50, displayValue: '$50M' },
    // Add more data points
  ],
}
```

## Slide Order

The slides appear in the order they're listed in the array:
1. Title
2. Problem
3. Solution
4. Why Now
5. Market Opportunity
6. Traction
7. Portfolio
8. Business Model
9. Distribution
10. Team
11. Financials
12. Closing

## Tips for Consistency

### Typography Rules
- **Titles**: Keep concise (they display large)
- **Bold text**: Use for key terms in bullets
- **Supporting text**: Appears below main content

### Visual Variants
- `'light'` - White background (most slides)
- `'dark'` - Dark background (title & closing for impact)
- `'bordered'` - White with border (not currently used)

### Stat Formatting
- Use `→` for transitions: `'3→36'`
- Use `–` for ranges: `'$10M–$15M'`
- Add `subtext` for sources/notes

## After Editing

Your changes automatically apply to:
- ✅ Screen view (http://localhost:3002/payva-deck)
- ✅ Print view (http://localhost:3002/payva-deck/print)
- ✅ PDF export (Export button in top-right)

No need to touch any other files - everything updates from this one configuration!