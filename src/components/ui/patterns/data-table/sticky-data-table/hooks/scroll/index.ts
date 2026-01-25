/**
 * Scroll - Scroll and viewport hooks
 *
 * Handles scroll synchronization, wheel events, and infinite scroll.
 *
 * @module hooks/scroll
 */

export { useScrollSync } from './use-scroll-sync'

export { useWheelRedirect } from './use-wheel-redirect'

export {
  useInfiniteScroll,
  type UseInfiniteScrollOptions,
  type UseInfiniteScrollReturn,
} from './use-infinite-scroll'
