# Motion

A production animation library for React. Motion provides a declarative API for animations, gestures, and scroll-linked effects.

**Package**: `motion`

---

## Getting Started

- [Installation](./getting-started/installation.md): Install Motion and set up imports
- [Quick Start](./getting-started/quick-start.md): Create your first animation
- [Base UI Setup](./getting-started/base-ui-setup.md): Integrate Motion with Base UI components

---

## Animation

- [Basics](./animation/basics.md): The `animate`, `initial`, and `exit` props
- [Transitions](./animation/transitions.md): Duration, easing, and spring physics
- [Layout](./animation/layout.md): Animate layout changes and shared elements
- [Components](./animation/components/init.md): `<motion.*>` and `<AnimatePresence>`

---

## Interaction

- [Gestures](./interaction/gestures.md): `whileHover`, `whileTap`, `whileFocus`
- [Drag](./interaction/drag.md): Draggable elements with constraints
- [Hooks](./interaction/hooks/init.md): `useAnimate`, `useInView`, `useScroll`

---

## Advanced

- [Motion Values](./advanced/motion-values.md): `useMotionValue`, `useTransform`, `useSpring`
- [Performance](./advanced/performance.md): Bundle optimization and GPU hints
- [Accessibility](./advanced/accessibility.md): Respecting `prefers-reduced-motion`
- [Patterns](./advanced/patterns.md): Base UI component animation recipes

---

## Quick Reference

### Installation
```bash
npm install motion
```

### Import Pattern
```tsx
import { motion, AnimatePresence } from 'motion/react'
```

### Basic Animation
```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
/>
```

### With Base UI
```tsx
<Dialog.Popup
  render={
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
    />
  }
/>
```

### Common Props
| Prop | Description |
|------|-------------|
| `initial` | Starting animation state |
| `animate` | Target animation state |
| `exit` | State when removed (requires AnimatePresence) |
| `transition` | Timing and easing configuration |
| `whileHover` | State while hovered |
| `whileTap` | State while pressed |
| `whileFocus` | State while focused |
| `whileInView` | State while in viewport |

---

## Related Documentation

| Topic | Location |
|-------|----------|
| Base UI Animation Guide | `../base-ui/handbook/animation.md` |
| Base UI Components | `../base-ui/components/` |

---

## External Resources

- [Motion Documentation](https://motion.dev/docs)
- [Motion Examples](https://motion.dev/examples)
- [GitHub Repository](https://github.com/motiondivision/motion)
