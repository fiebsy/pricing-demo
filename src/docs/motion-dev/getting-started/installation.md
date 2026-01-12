# Installation

Install Motion and set up your project for React animations.

## Overview

Motion is a production animation library for React. It provides hardware-accelerated animations with a simple, declarative API. Motion was previously known as Framer Motion.

## Install

```bash
npm install motion
```

Or with other package managers:

```bash
# Yarn
yarn add motion

# pnpm
pnpm add motion
```

## Import

Import Motion components from `motion/react`:

```tsx
import { motion, AnimatePresence } from 'motion/react'
```

### Available Exports

| Export | Description |
|--------|-------------|
| `motion` | Motion component factory (`motion.div`, `motion.button`, etc.) |
| `AnimatePresence` | Enables exit animations when components unmount |
| `useAnimate` | Imperative animation control hook |
| `useInView` | Viewport intersection detection |
| `useScroll` | Scroll position tracking |
| `useTransform` | Map values to animation properties |
| `useSpring` | Spring physics for values |
| `useMotionValue` | Create animatable values |
| `useReducedMotion` | Detect user's motion preference |

## TypeScript

Motion is written in TypeScript and provides full type definitions. No additional `@types` package is needed.

```tsx
import { motion, type Variants } from 'motion/react'

const variants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}
```

## Verify Installation

Create a simple animation to verify the installation:

```tsx
import { motion } from 'motion/react'

function App() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 bg-primary rounded-lg"
    >
      Motion is working!
    </motion.div>
  )
}
```

## Bundle Size

Motion is tree-shakable. Only import what you need:

```tsx
// Good - only imports what's used
import { motion } from 'motion/react'

// Also good - for hooks only
import { useAnimate } from 'motion/react'
```

For more aggressive bundle optimization, see [Performance](../advanced/performance.md).

## Related

- [Quick Start](./quick-start.md): Create your first animation
- [Base UI Setup](./base-ui-setup.md): Integrate with Base UI
