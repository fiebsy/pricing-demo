# useScroll

Track scroll position and create scroll-linked animations.

## Overview

`useScroll` returns motion values that update as the page or a container scrolls. Use these values with `useTransform` to create scroll-driven animations.

## Basic Usage

```tsx
import { useScroll, motion } from 'motion/react'

function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left"
    />
  )
}
```

## Return Values

`useScroll` returns four motion values:

| Value | Description |
|-------|-------------|
| `scrollX` | Horizontal scroll position in pixels |
| `scrollY` | Vertical scroll position in pixels |
| `scrollXProgress` | Horizontal progress (0-1) |
| `scrollYProgress` | Vertical progress (0-1) |

```tsx
const {
  scrollX,
  scrollY,
  scrollXProgress,
  scrollYProgress,
} = useScroll()
```

## Options

### Track Element

Track an element's position relative to the viewport:

```tsx
function Component() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
  })

  return (
    <div ref={ref}>
      {/* scrollYProgress is 0 when element enters, 1 when it exits */}
    </div>
  )
}
```

### Scroll Container

Track scroll within a specific container:

```tsx
function ScrollContainer() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    container: containerRef,
  })

  return (
    <div ref={containerRef} className="overflow-auto h-96">
      <motion.div style={{ opacity: scrollYProgress }}>
        Content
      </motion.div>
    </div>
  )
}
```

### Offset

Control when progress starts and ends:

```tsx
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ['start end', 'end start'],
})
```

#### Offset Syntax

Each offset is `[targetEdge containerEdge]`:

| Edge | Description |
|------|-------------|
| `start` | Top of element / viewport |
| `center` | Center of element / viewport |
| `end` | Bottom of element / viewport |
| `0` | Same as `start` |
| `1` | Same as `end` |
| `0.5` | Same as `center` |
| `100px` | Pixel offset |

#### Common Offsets

```tsx
// Element entering viewport to leaving (default for target)
offset: ['start end', 'end start']

// Element at viewport top to element at viewport bottom
offset: ['start start', 'end end']

// Element center reaches viewport center
offset: ['center center', 'center center']

// Start 100px before entering
offset: ['start end', 'end start-100px']
```

## useTransform

Map scroll progress to animation values:

```tsx
import { useScroll, useTransform, motion } from 'motion/react'

function ParallaxImage() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -200])

  return (
    <motion.img
      style={{ y }}
      src="/hero.jpg"
      className="w-full"
    />
  )
}
```

### Multi-Value Transform

```tsx
const { scrollYProgress } = useScroll()

const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 1])
const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])
```

### Color Transform

```tsx
const backgroundColor = useTransform(
  scrollYProgress,
  [0, 0.5, 1],
  ['#ffffff', '#3b82f6', '#1e1e1e']
)
```

## useSpring

Add spring physics to scroll-linked values:

```tsx
import { useScroll, useSpring, useTransform } from 'motion/react'

function SmoothProgress() {
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  })

  return (
    <motion.div
      style={{ scaleX: smoothProgress }}
      className="fixed top-0 left-0 right-0 h-1 bg-primary"
    />
  )
}
```

## Common Patterns

### Scroll Progress Bar

```tsx
function ProgressBar() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
      style={{ scaleX: scrollYProgress }}
    />
  )
}
```

### Parallax Hero

```tsx
function ParallaxHero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0"
      >
        <img src="/hero-bg.jpg" className="w-full h-full object-cover" />
      </motion.div>
      <div className="relative z-10 flex items-center justify-center h-full">
        <h1>Hero Content</h1>
      </div>
    </section>
  )
}
```

### Sticky Header Shrink

```tsx
function StickyHeader() {
  const { scrollY } = useScroll()
  const height = useTransform(scrollY, [0, 100], [80, 60])
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255,255,255,0)', 'rgba(255,255,255,1)']
  )

  return (
    <motion.header
      style={{ height, backgroundColor }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <nav>Navigation</nav>
    </motion.header>
  )
}
```

### Section Reveal

```tsx
function SectionReveal({ children }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100])

  return (
    <section ref={ref} className="min-h-screen">
      <motion.div style={{ opacity, y }}>
        {children}
      </motion.div>
    </section>
  )
}
```

### Horizontal Scroll

```tsx
function HorizontalScroll({ items }) {
  const containerRef = useRef(null)
  const { scrollXProgress } = useScroll({ container: containerRef })

  return (
    <div>
      <motion.div
        style={{ scaleX: scrollXProgress }}
        className="h-1 bg-primary origin-left"
      />
      <div
        ref={containerRef}
        className="flex overflow-x-auto"
      >
        {items.map((item) => (
          <div key={item.id} className="flex-shrink-0 w-80">
            {item.content}
          </div>
        ))}
      </div>
    </div>
  )
}
```

### Text Reveal on Scroll

```tsx
function TextReveal({ text }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'start 0.3'],
  })

  const words = text.split(' ')

  return (
    <p ref={ref} className="flex flex-wrap">
      {words.map((word, i) => {
        const start = i / words.length
        const end = start + 1 / words.length
        return (
          <Word key={i} range={[start, end]} progress={scrollYProgress}>
            {word}
          </Word>
        )
      })}
    </p>
  )
}

function Word({ children, range, progress }) {
  const opacity = useTransform(progress, range, [0.2, 1])
  return (
    <motion.span style={{ opacity }} className="mr-2">
      {children}
    </motion.span>
  )
}
```

## Performance Tips

1. **Use `will-change`** on animated elements
2. **Avoid layout animations** (width, height) during scroll
3. **Stick to transforms and opacity** for GPU acceleration
4. **Use `useSpring` sparingly** - it adds computation

```tsx
<motion.div
  style={{
    y,
    willChange: 'transform',
  }}
/>
```

## Related

- [useTransform](../../advanced/motion-values.md#usetransform): Map values
- [useSpring](../../advanced/motion-values.md#usespring): Add physics
- [useInView](./use-in-view.md): Viewport detection
