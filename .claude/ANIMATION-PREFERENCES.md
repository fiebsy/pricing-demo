# Animation Preferences — Tailwind CSS v4

> **Purpose**: Keep UI animations **buttery smooth, accessible, and maintainable**. These rules translate Motion's *Web Animation Performance Tier List* into concrete Tailwind v4 practices for our app.

---

## TL;DR (what to do 90% of the time)

- **Prefer compositor‑only animations** → Animate **`transform`** and **`opacity`** (e.g., `translate-*`, `scale-*`, `rotate-*`, `opacity-*`). These avoid layout/paint and are the smoothest. See Motion's tier list and performance guide. [motion.dev/blog/web-animation-performance-tier-list](https://motion.dev/blog/web-animation-performance-tier-list) • [motion.dev/docs/performance](https://motion.dev/docs/performance)
- **Gate motion for accessibility** → Use Tailwind's `motion-safe:` / `motion-reduce:` variants so users with **reduced motion** preferences aren't forced to watch animations. [tailwindcss.com/docs/animation](https://tailwindcss.com/docs/animation) • [MDN prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- **Use data attributes to toggle states** (e.g., `data-open`) and dynamic variants (e.g., `data-open:opacity-100`). This plays nicely with Tailwind v4. [Tailwind v4 announcement](https://tailwindcss.com/blog/tailwindcss-v4)
- **Promote to its own layer only while animating** → temporarily add `will-change` (via arbitrary property utility) then remove it. Excess layers = memory cost. [motion.dev/blog/web-animation-performance-tier-list](https://motion.dev/blog/web-animation-performance-tier-list)
- **Avoid per‑frame layout/paint** → Don't animate `width/height/top/left/margin` in a loop. If layout must change, **measure once (FLIP)** then animate with transforms. [motion.dev/blog/web-animation-performance-tier-list](https://motion.dev/blog/web-animation-performance-tier-list)

---

## Performance "tier" rules (adapted for Tailwind v4)

### ✅ S‑Tier (Prefer)
Runs entirely on the **compositor thread** — smooth even if JS is busy.

**Do this:**  
- Animate `transform`/`opacity` using utilities like:  
  ```html
  <div class="transition-transform transition-opacity duration-300 ease-[cubic-bezier(.2,.8,.2,1)] transform-gpu translate-x-0 opacity-100"></div>
  ```
  - `transform-gpu` uses GPU acceleration when beneficial. [tailwindcss.com/docs/transform](https://tailwindcss.com/docs/transform)
- Use **data variants** to toggle states:  
  ```html
  <aside
    data-open
    class="fixed inset-y-0 right-0 w-80 translate-x-full opacity-0
           data-open:translate-x-0 data-open:opacity-100
           transition-transform transition-opacity duration-300">
  </aside>
  ```
  *(Boolean data variant is built-in in v4.)* [tailwindcss.com/blog/tailwindcss-v4](https://tailwindcss.com/blog/tailwindcss-v4)

**Be careful with:** very large layers (e.g., huge carousels/tickers) and big `blur()` radii — GPU memory and fill‑rate can tank performance. Keep blurred/composited areas small. [motion.dev/blog/web-animation-performance-tier-list](https://motion.dev/blog/web-animation-performance-tier-list)

---

### ✅ A‑Tier (Usually fine)
Main thread **drives** transforms/opacity (e.g., `requestAnimationFrame`, libraries), but frames can hiccup if JS is busy.

**Do this:**  
- Use **Intersection Observer** (or framework equivalents) to add/remove a `data-inview` attribute — don't poll `scrollTop` each frame.  
- Then animate with data variants:  
  ```html
  <section
    class="opacity-0 translate-y-4
           motion-safe:data-inview:opacity-100 motion-safe:data-inview:translate-y-0
           transition duration-300">
  </section>
  ```
- If you *must* keep a layer promoted, scope `will-change` narrowly and only while animating:  
  ```html
  <div class="[will-change:transform,opacity] data-animating:[will-change:transform,opacity]"></div>
  ```

---

### 🟨 B‑Tier (Layout changes done the smart way)
You need a true layout change, but you avoid per‑frame layout by **measuring once** (FLIP) then animating with transforms.

**Rule:** Measure initial/final boxes once, then animate with `transform`. Example (vanilla WAAPI):

```js
// FLIP: First, Last, Invert, Play
const first = el.getBoundingClientRect();
// Apply final layout (e.g., add a class that expands or reorders content)
el.toggleAttribute('data-expanded', true);
const last = el.getBoundingClientRect();

const dx = first.left - last.left;
const dy = first.top - last.top;
const sx = first.width / last.width;
const sy = first.height / last.height;

el.animate(
  [{ transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})` }, { transform: 'none' }],
  { duration: 300, easing: 'cubic-bezier(.2,.8,.2,1)' }
);
```
This *looks* like width/height moved but stays compositor‑only during the animation phase. [motion.dev/blog/web-animation-performance-tier-list](https://motion.dev/blog/web-animation-performance-tier-list)

---

### 🟧 C‑Tier (OK in small doses)
Triggers **paint** — fine on small surfaces, risky on large ones.

**Use sparingly:**  
- Color/shape effects like `background-color`, `border-radius`, gradients, masks.  
- Filters like `blur()` — keep radii small and surfaces small; prefer static blur assets if heavy. [motion.dev/blog/web-animation-performance-tier-list](https://motion.dev/blog/web-animation-performance-tier-list)

**Tailwind tips:**  
- Prefer opacity fades over color tweens for large blocks.  
- If animating CSS variables, scope them narrowly; variable changes can invalidate large subtrees.

---

### 🟥 D/F‑Tier (Avoid by default)
- **Per‑frame layout** (`width`, `height`, `top`, `left`, `margin`, etc.).  
- **Layout/style thrashing** (read → write → read → … in one frame).  
If you must, isolate with `contain`/subtrees, or convert to B‑Tier via FLIP. [motion.dev/blog/web-animation-performance-tier-list](https://motion.dev/blog/web-animation-performance-tier-list)

---

## Tailwind v4 setup (tokens, variants, and keyframes)

> v4 is **CSS‑first**: configure tokens and variants in CSS (`@theme`, `@custom-variant`). [tailwindcss.com/blog/tailwindcss-v4](https://tailwindcss.com/blog/tailwindcss-v4)

### 1) Define motion tokens once

```css
@import "tailwindcss";

@theme {
  /* Easing & durations for consistent feel */
  --ease-standard: cubic-bezier(.2,.8,.2,1);
  --ease-snappy: cubic-bezier(.2, 0, 0, 1);
  --duration-fast: 150ms;
  --duration-base: 300ms;
  --duration-slow: 500ms;

  /* Optional: canned animations */
  --animate-fade-in: fade-in var(--duration-base) var(--ease-standard) both;
  --animate-scale-in: scale-in var(--duration-base) var(--ease-standard) both;

  @keyframes fade-in { from { opacity: 0 } to { opacity: 1 } }
  @keyframes scale-in { from { transform: scale(.98) } to { transform: none } }
}
```
(Custom animations via `@theme` are the v4 way.) See also: [Tailwind v4 keyframes via @theme](https://stackoverflow.com/questions/79393540/how-to-use-keyframes-in-tailwind-css-version-4).

### 2) App‑level motion switches

```css
/* Respect OS setting */
@custom-variant motion-safe {
  @media (prefers-reduced-motion: no-preference) { @slot; }
}
@custom-variant motion-reduce {
  @media (prefers-reduced-motion: reduce) { @slot; }
}

/* Optional: allow in‑app override using a boolean data attribute */
@custom-variant motion-ok (&:where([data-motion-ok] *));
```
Tailwind v4 supports creating **custom variants** with `@custom-variant`. [tailwindcss.com/docs/adding-custom-styles](https://tailwindcss.com/docs/adding-custom-styles)

### 3) Reusable utilities (optional)

```css
/* Promote only while animating */
@utility will-change-transform-opacity { will-change: transform, opacity; }

/* 3D transforms and perspective helpers are built-in in v4 */
```

---

## Component recipes (copy/paste)

### 1) **Drawer / Panel** (S‑Tier: transform + opacity)
```html
<aside
  aria-label="Side panel"
  class="fixed inset-y-0 right-0 w-80 max-w-[90vw] translate-x-full opacity-0
         transition-transform transition-opacity duration-[var(--duration-base)]
         ease-[var(--ease-standard)] transform-gpu
         data-open:translate-x-0 data-open:opacity-100">
  <!-- content -->
</aside>
```

### 2) **Modal fade+scale** (S‑Tier)
```html
<div
  role="dialog"
  class="opacity-0 translate-y-2 scale-[0.98] transform-gpu
         transition duration-[var(--duration-base)] ease-[var(--ease-standard)]
         data-open:opacity-100 data-open:translate-y-0 data-open:scale-100
         motion-reduce:transition-none motion-reduce:data-open:opacity-100">
  <!-- modal content -->
</div>
```

### 3) **Scroll‑reveal sections** (A‑Tier trigger, S‑Tier motion)
```html
<section
  class="opacity-0 translate-y-4 transition duration-[var(--duration-base)]
         ease-[var(--ease-standard)]
         motion-safe:data-inview:opacity-100 motion-safe:data-inview:translate-y-0">
  <!-- content -->
</section>
<script type="module">
  const revealEls = document.querySelectorAll('section');
  const io = new IntersectionObserver((entries)=>{
    for (const e of entries) e.target.toggleAttribute('data-inview', e.isIntersecting);
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
  revealEls.forEach(el => io.observe(el));
</script>
```

### 4) **FLIP for grid re-order** (B‑Tier)
Pair your DOM change with the FLIP snippet from above. The visible motion is transform‑only even though the layout changes.

---

## Guardrails & "foot‑guns"

- **`transform-gpu` wisely.** Great for complex transforms — measure real perf; don't blanket‑apply. [tailwindcss.com/docs/transform](https://tailwindcss.com/docs/transform)  
- **`will-change` only in-flight.** Add `[will-change:transform,opacity]` when starting an animation; remove when done to free memory. [motion.dev/blog/web-animation-performance-tier-list](https://motion.dev/blog/web-animation-performance-tier-list)  
- **Filters & large layers:** `blur()` on big elements or giant composited layers can crush mobile GPUs. Prefer tiny radii, masks, or pre-rendered assets. [motion.dev/blog/web-animation-performance-tier-list](https://motion.dev/blog/web-animation-performance-tier-list)  
- **Respect reduced motion** with `motion-reduce:` fallbacks. It's both good UX and aligns with standards. [MDN prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)  
- **Avoid per‑frame layout/paint.** If you need layout, do **FLIP**. [motion.dev/blog/web-animation-performance-tier-list](https://motion.dev/blog/web-animation-performance-tier-list)

---

## References

- Motion: **Web Animation Performance Tier List** (concepts/tiering, will‑change guidance, filter/blur cautions) — <https://motion.dev/blog/web-animation-performance-tier-list>  
- Tailwind v4: **Blog / Release notes** (v4, dynamic variants, CSS‑first config) — <https://tailwindcss.com/blog/tailwindcss-v4>  
- Tailwind docs: **transform‑gpu**, 3D transforms, translate/rotate/scale utilities — <https://tailwindcss.com/docs/transform>, <https://tailwindcss.com/docs/translate>, <https://tailwindcss.com/docs/rotate>, <https://tailwindcss.com/docs/scale>  
- Tailwind v4: **@theme** (custom animations & keyframes) — Example: <https://stackoverflow.com/questions/79393540/how-to-use-keyframes-in-tailwind-css-version-4>  
- Tailwind v4: **@custom-variant** (custom variants) — <https://tailwindcss.com/docs/adding-custom-styles>  
- MDN: **prefers-reduced-motion** — <https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion>







