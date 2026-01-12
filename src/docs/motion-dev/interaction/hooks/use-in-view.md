# useInView

Detect when elements enter or leave the viewport.

## Overview

`useInView` returns a boolean indicating whether a referenced element is currently within the viewport. It uses the Intersection Observer API for efficient viewport detection.

## Basic Usage

```tsx
import { useInView } from 'motion/react'
import { useRef } from 'react'

function Component() {
  const ref = useRef(null)
  const isInView = useInView(ref)

  return (
    <div ref={ref}>
      {isInView ? 'In view!' : 'Not in view'}
    </div>
  )
}
```

## Options

### `once`

Only trigger once when entering view:

```tsx
const isInView = useInView(ref, { once: true })
```

After the element enters the viewport, `isInView` stays `true` even when scrolled out.

### `amount`

How much of the element must be visible:

```tsx
// Trigger when any part is visible (default)
const isInView = useInView(ref, { amount: 'some' })

// Trigger when fully visible
const isInView = useInView(ref, { amount: 'all' })

// Trigger when 50% visible
const isInView = useInView(ref, { amount: 0.5 })
```

### `margin`

Offset from the viewport edge:

```tsx
// Trigger 100px before entering viewport
const isInView = useInView(ref, { margin: '-100px' })

// Different margins per edge (top, right, bottom, left)
const isInView = useInView(ref, { margin: '-50px 0px -100px 0px' })
```

### `root`

Custom scroll container:

```tsx
const containerRef = useRef(null)
const itemRef = useRef(null)

const isInView = useInView(itemRef, { root: containerRef })

return (
  <div ref={containerRef} className="overflow-auto h-96">
    <div ref={itemRef}>Target element</div>
  </div>
)
```

## Common Patterns

### Scroll Reveal Animation

```tsx
function ScrollReveal({ children }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}
```

### Lazy Loading

```tsx
function LazyImage({ src, alt }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '100px' })

  return (
    <div ref={ref}>
      {isInView ? (
        <img src={src} alt={alt} />
      ) : (
        <div className="placeholder" />
      )}
    </div>
  )
}
```

### Count-Up Animation

```tsx
function CountUp({ target }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (isInView) {
      let current = 0
      const interval = setInterval(() => {
        current += Math.ceil(target / 50)
        if (current >= target) {
          setCount(target)
          clearInterval(interval)
        } else {
          setCount(current)
        }
      }, 20)
      return () => clearInterval(interval)
    }
  }, [isInView, target])

  return <span ref={ref}>{count}</span>
}
```

### Staggered List Reveal

```tsx
function StaggeredList({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        <ListItem key={item.id} item={item} index={index} />
      ))}
    </ul>
  )
}

function ListItem({ item, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ delay: index * 0.1 }}
    >
      {item.content}
    </motion.li>
  )
}
```

### Section Progress Indicator

```tsx
function SectionIndicator({ sections }) {
  return (
    <nav className="fixed right-4 top-1/2 -translate-y-1/2">
      {sections.map((section) => (
        <SectionDot key={section.id} section={section} />
      ))}
    </nav>
  )
}

function SectionDot({ section }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.5 })

  // Find the section element
  useEffect(() => {
    ref.current = document.getElementById(section.id)
  }, [section.id])

  return (
    <motion.div
      animate={{
        scale: isInView ? 1.5 : 1,
        backgroundColor: isInView ? '#3b82f6' : '#d1d5db',
      }}
      className="w-2 h-2 rounded-full mb-2"
    />
  )
}
```

### Video Autoplay on View

```tsx
function AutoplayVideo({ src }) {
  const ref = useRef<HTMLVideoElement>(null)
  const isInView = useInView(ref, { amount: 0.5 })

  useEffect(() => {
    if (ref.current) {
      if (isInView) {
        ref.current.play()
      } else {
        ref.current.pause()
      }
    }
  }, [isInView])

  return (
    <video ref={ref} src={src} muted loop playsInline />
  )
}
```

## Comparison with whileInView

| `useInView` | `whileInView` |
|-------------|---------------|
| Returns boolean | Applies animation state |
| Use in hooks/effects | Declarative on elements |
| More control | Simpler API |
| Any side effect | Animation only |

### When to Use Each

**Use `whileInView`** for simple scroll-triggered animations:

```tsx
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
/>
```

**Use `useInView`** when you need:
- To trigger side effects (API calls, analytics)
- Conditional rendering (lazy loading)
- Complex animation logic with `useAnimate`
- Boolean state in other components

## TypeScript

```tsx
import { useInView, type InViewOptions } from 'motion/react'

const options: InViewOptions = {
  once: true,
  amount: 0.5,
  margin: '-100px',
}

const isInView = useInView(ref, options)
```

## Related

- [Gestures](../gestures.md): whileInView prop
- [useAnimate](./use-animate.md): Trigger animations on view
- [useScroll](./use-scroll.md): Scroll-linked animations
