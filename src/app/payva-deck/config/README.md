# Unified Slide Configuration System

## Overview

The slide deck now uses a centralized configuration system that makes editing slides incredibly easy and ensures visual consistency across the entire presentation.

## Quick Start: Editing Slides

### 1. Edit Slide Content
All slide content is in one file: `config/slides-config.ts`

```typescript
// To edit any slide, just modify its content object:
createSlide({
  id: 'problem',
  layout: 'two-column',
  theme: 'insight',
  content: {
    title: 'The problem',
    subtitle: 'Not built for digital economy',
    bullets: [
      { bold: 'Conversion struggles', text: 'from upfront costs' },
      // Add or edit bullets here
    ],
    supporting: 'Traditional financing wasn\'t built for digital goods',
  },
})
```

### 2. Choose a Layout
Available layouts (automatically handle styling):
- `hero` - Centered large text (title, closing slides)
- `two-column` - Title left, bullets right
- `two-column-stats` - Title left, stat cards right  
- `centered-stat` - Title with single large stat below
- `chart` - Bar chart visualization
- `grid` - Grid of cards (team, logos)

### 3. Apply a Theme
Themes control the visual tone:
- `impact` - High-impact opening/closing
- `insight` - Key insights and revelations
- `evidence` - Supporting data and proof points
- `punchline` - Major metrics and achievements
- `professional` - Default professional look

## File Structure

```
config/
├── slides-config.ts    # ALL slide content (edit here!)
├── layouts.ts          # Layout definitions
├── slide-styles.ts     # Typography, spacing, colors
├── types.ts           # TypeScript types
└── README.md          # This file
```

## Common Tasks

### Add a New Slide

```typescript
// In slides-config.ts, add to the slides array:
createSlide({
  id: 'new-slide',
  layout: 'two-column',  // Choose appropriate layout
  theme: 'insight',       // Choose appropriate theme
  label: 'NEW SECTION',   // Optional header badge
  content: {
    title: 'New Slide Title',
    subtitle: 'Subtitle text',
    bullets: [
      { bold: 'Key point', text: 'supporting detail' },
    ],
  },
})
```

### Change Typography Globally

Edit `config/slide-styles.ts`:

```typescript
export const TYPOGRAPHY = {
  section: {
    title: 'font-display text-display-lg font-semibold', // Edit here
  },
}
```

### Adjust Spacing

Edit `config/slide-styles.ts`:

```typescript
export const SPACING = {
  layout: {
    twoColumn: 'gap-16',  // Change gap between columns
  },
}
```

### Modify Visual Rhythm

Edit `config/slides-config.ts`:

```typescript
export const DECK_CONFIG = {
  settings: {
    visualRhythm: 'progressive',  // or 'alternating', 'consistent'
  },
}
```

## Benefits

1. **Single Source of Truth**: All content in one file
2. **Automatic Consistency**: Layouts enforce consistent styling
3. **Type Safety**: TypeScript ensures valid configurations
4. **Easy Updates**: Change content without touching components
5. **Visual Rhythm**: Automatic variant assignment for flow

## Tips

- Keep titles concise (they're styled large)
- Use `bold` in bullets for emphasis on key terms
- Supporting text appears below main content
- Labels appear as badges in the top-left
- Subtitles replace labels when both are present

## Export/Print

The system automatically handles print layouts. Just use the Export button in the UI or visit `/payva-deck/print` for the print view.