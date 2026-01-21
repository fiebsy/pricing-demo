# Biaxial Command Menu V3 - Preset Guide

This document explains the animation presets and how to customize them.

## Animation Layers

The command menu uses three animation layers:

| Layer | Purpose | Animation Options |
|-------|---------|-------------------|
| **Backdrop** | Visual shell (shadow, shine, gradient) | Size-based or clip-path reveal |
| **Content** | Main container with clip-path reveal | Always uses clip-path |
| **Menu Container** | Inner menu area | Optional clip-path grow animation |

## Preset Breakdown

### 1. Default

**Use case:** General starting point for customization.

```typescript
animationSync: {
  backdropMode: 'size',           // Backdrop animates dimensions
  animateMenuContainer: true,      // Menu grows independently
  expandOrigin: 'top',            // Expands downward
  menuContainerDurationOffset: 100 // Menu slightly slower
}
```

**Behavior:** Backdrop expands via width/height, menu container grows downward with slightly slower timing.

---

### 2. Clip-Path Sync

**Use case:** Perfect synchronization between backdrop and content.

```typescript
animationSync: {
  backdropMode: 'clip-path',      // Backdrop uses same reveal as content
  animateMenuContainer: false,    // No separate menu animation
  backdropDelay: 0,               // Simultaneous start
  backdropDurationOffset: 0       // Same duration
}
```

**Behavior:** Backdrop and content reveal together using identical clip-path animations.

---

### 3. Menu Grows

**Use case:** Distinct "card growing" effect for the menu area.

```typescript
animationSync: {
  backdropMode: 'size',
  animateMenuContainer: true,
  menuContainerDelay: 50,         // Menu starts slightly after
  menuContainerDurationOffset: 100,
  expandOrigin: 'top'
}
```

**Behavior:** Backdrop expands first, then menu container grows into view.

---

### 4. Staggered Reveal

**Use case:** Dramatic three-layer sequential animation.

```typescript
animationSync: {
  backdropMode: 'size',
  backdropDelay: -30,             // Backdrop starts BEFORE content
  backdropDurationOffset: 50,     // Backdrop slightly slower
  animateMenuContainer: true,
  menuContainerDelay: 100,        // Menu starts last
  expandOrigin: 'top'
}
```

**Behavior:** Backdrop leads, content follows, menu reveals last.

---

### 5. Perfect Sync

**Use case:** Clean, synchronized motion across all layers.

```typescript
animationSync: {
  backdropMode: 'clip-path',
  backdropDelay: 0,
  backdropDurationOffset: 0,
  animateMenuContainer: true,
  menuContainerDelay: 0,
  menuContainerDurationOffset: 0,
  expandOrigin: 'top'
}
```

**Behavior:** All layers animate together with identical timing.

---

## Key Properties Reference

| Property | Type | Description |
|----------|------|-------------|
| `backdropMode` | `'size' \| 'clip-path'` | How backdrop animates |
| `backdropDelay` | `number` | Delay in ms (negative = start earlier) |
| `backdropDurationOffset` | `number` | Duration difference from base |
| `animateMenuContainer` | `boolean` | Enable menu container animation |
| `menuContainerDelay` | `number` | Menu animation delay in ms |
| `menuContainerDurationOffset` | `number` | Menu duration difference |
| `expandOrigin` | `'top' \| 'center' \| 'bottom'` | Where menu expands from |

## Creating Custom Presets

1. **Start with the closest existing preset**
2. **Adjust timing values:**
   - Increase `duration` for slower animations (300-500ms)
   - Use `backdropDelay` to offset layers (-50 to +100ms)
   - Use `menuContainerDelay` for staggered reveal
3. **Choose backdrop mode:**
   - `'size'` for traditional expand
   - `'clip-path'` for reveal sync with content
4. **Pick expand origin:**
   - `'top'` for dropdown feel
   - `'center'` for focused reveal
   - `'bottom'` for bottom-sheet feel

### Example: Custom Dramatic Preset

```typescript
const DRAMATIC_PRESET: Preset<PlaygroundState> = {
  id: 'dramatic',
  name: 'Dramatic',
  data: {
    config: {
      duration: 500,                    // Slow expand
      collapseDuration: 150,            // Fast collapse
      contentFadeDuration: 200,
      contentFadeDelay: 100,
      animationSync: {
        backdropMode: 'size',
        backdropDelay: -50,             // Backdrop leads
        backdropDurationOffset: 100,    // Backdrop slower
        animateMenuContainer: true,
        menuContainerDelay: 150,        // Menu enters late
        menuContainerDurationOffset: 0,
        backdropScaleStart: 1,
        expandOrigin: 'center',         // Dramatic center reveal
      },
      // ... rest of config
    },
  },
}
```

## Tips

- **Keep delays under 150ms** - longer feels laggy
- **Use negative backdrop delays** for lead-in effects
- **Match expand/collapse ratio** - collapse should be ~25-50% of expand duration
- **Test on mobile** - complex animations may need simplification
