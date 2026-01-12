# Design Tokens

The foundational layer of the PAYVA style system.

---

## Topics

- [Architecture](./architecture.md): Token layers, naming conventions, and how they connect
- [Colors](./colors.md): Base palettes, semantic mappings, and property tokens
- [Spacing & Sizing](./spacing-sizing.md): Typography scales, radius, shadows

---

## Quick Reference

### Token Layers

```
Base Colors → Semantic Tokens → Property Tokens → Tailwind Utilities
```

| Layer | Example | Purpose |
|-------|---------|---------|
| Base | `--color-gray-900` | Raw RGB values |
| Semantic | `--color-text-primary` | Purpose-based naming |
| Property | `--text-color-primary` | CSS property binding |
| Utility | `text-primary` | Tailwind class |

### File Location

All tokens are defined in `src/styles/theme.css` (~1700 lines).
