/**
 * Carousel animation variants and transitions
 *
 * Modify slide enter/exit animations here.
 */

export const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
  }),
}

export const slideTransition = {
  x: { type: 'spring' as const, stiffness: 300, damping: 30 },
  opacity: { duration: 0.2 },
}

/** Stagger delays for content animations within slides */
export const contentDelays = {
  subtitle: 0.1,
  title: 0.15,
  description: 0.2,
  image: 0.3,
}
