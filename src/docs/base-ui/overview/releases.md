# Releases

Changelogs for each Base UI release.

## v1.0.0

**Dec 11, 2025**

### General changes

- **Breaking change:** Rename packages to use the @base-ui org.
  The package name has changed from `@base-ui-components/react` to `@base-ui/react`.

### Combobox

- Respect `itemToStringValue` for `onFormSubmit`
- Add `null` as an option for the value prop

### Menu

- Fix submenu opens with 0 delay
- Fix focus not returning to trigger on <kbd>Esc</kbd> while pointer rests on popup
- Fix always `null` open method
- Allow side axis fallback for submenus by default

### Navigation Menu

- Fix mount transitions on `Positioner` in Firefox

### Number Field

- Fix multiple scrub area support

### Popover

- Fix mount transitions on `Positioner` in Firefox
- Fix skipped viewport transitions

### Select

- Respect `itemToStringValue` for `onFormSubmit`
- Add `null` as an option for the value prop

### Tabs

- Fix indicator positioning in transformed containers
- Do not initially select a disabled tab

### Toast

- Fix `flushSync` dev error when toast is added
- Fix `<Toast.Close>` emitting `aria-hidden` warning on click

### Toggle Group

- More permissive towards falsy toggle values

### Tooltip

- Fix mount transitions on `Positioner` in Firefox
- Fix shared tooltip closing with trigger gaps
- Fix skipped viewport transitions

---

*For complete release history, see the [Base UI GitHub releases](https://github.com/mui/base-ui/releases).*
