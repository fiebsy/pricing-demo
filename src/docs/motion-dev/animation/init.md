# Animation

Core animation APIs for creating smooth, declarative animations in React.

---

## Topics

- [Basics](./basics.md): The `animate`, `initial`, and `exit` props
- [Transitions](./transitions.md): Duration, easing, spring physics, and timing
- [Layout](./layout.md): Animate layout changes and shared elements

---

## Components

- [Motion Component](./components/motion-component.md): The `<motion.*>` element factory
- [AnimatePresence](./components/animate-presence.md): Enable exit animations

---

## Quick Reference

### Animation Props
| Prop | Description |
|------|-------------|
| `initial` | Starting state (set to `false` to disable) |
| `animate` | Target state to animate to |
| `exit` | State when unmounting (requires AnimatePresence) |
| `transition` | Timing and easing configuration |

### Common Animations
```tsx
// Fade in
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}

// Slide up
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}

// Scale
initial={{ scale: 0.9 }}
animate={{ scale: 1 }}

// Combined
initial={{ opacity: 0, scale: 0.9, y: 20 }}
animate={{ opacity: 1, scale: 1, y: 0 }}
exit={{ opacity: 0, scale: 0.9, y: 20 }}
```
