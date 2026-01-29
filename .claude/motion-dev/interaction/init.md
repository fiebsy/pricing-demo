# Interaction

Gesture animations and React hooks for interactive components.

---

## Topics

- [Gestures](./gestures.md): `whileHover`, `whileTap`, `whileFocus`, `whileInView`
- [Drag](./drag.md): Draggable elements with constraints and elasticity

---

## Hooks

- [useAnimate](./hooks/use-animate.md): Imperative animation control
- [useInView](./hooks/use-in-view.md): Viewport intersection detection
- [useScroll](./hooks/use-scroll.md): Scroll-linked animations

---

## Quick Reference

### Gesture Props
| Prop | Trigger |
|------|---------|
| `whileHover` | Mouse over (desktop only) |
| `whileTap` | Mouse down or touch |
| `whileFocus` | Keyboard focus |
| `whileDrag` | During drag |
| `whileInView` | Element in viewport |

### Common Patterns
```tsx
// Button feedback
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
/>

// Focus ring
<motion.input
  whileFocus={{ boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.5)' }}
/>

// Scroll reveal
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
/>
```
