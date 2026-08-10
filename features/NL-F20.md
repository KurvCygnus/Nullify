# NL-F20: Reason Hint Enhancements — Multi-Line Reasons, Editor Color Scheme, Configurable Prefix, and Font Size

* Completed(`1.0.0`)

* Suggested on version `1.0.0` by `Kurv Cygnus`


## Description

The nullability reason hint (NL-F16) is a single-line sentence rendered in the editor's normal font and color, with no way to read a long reason in full, tie the hint to Nullify at a glance, or make it visually distinct from code. This feature package turns the hint into a fully customizable, first-class editor citizen: long reasons collapse into a truncated one-liner and expand to the complete multi-line text (by clicking the hint, using the gutter's standard fold arrow, or a keyboard shortcut); the hint's color becomes a proper **Editor Color Scheme** attribute (`Settings → Editor → Color Scheme → Nullify`) instead of a single hard-coded hex; an optional leading prefix (`*`, `•`, `§`, a custom symbol, or Nullify's `Nullable.svg`/`NotNull.svg` gutter icon) marks the hint at a glance; and the hint font can be sized relative to the editor font (default: one pixel smaller) so it reads as a layered annotation rather than ordinary code.

This feature consolidates NL-F17 (multi-line + expand/collapse), NL-F18 (color scheme integration), and NL-F19 (configurable prefix) into one package, and adds the configurable font size.

## Solution

The nullability reason hint is now a theme-able, configurable editor citizen: long reasons collapse into a compact truncated sentence (`This is nullable because "returns null when no entry matches …"`) and expand to the full multi-line text on click, via the fold arrow, or with a keyboard shortcut; its color lives under `Settings → Editor → Color Scheme → Nullify` (foreground/background/effects, following light/dark scheme switches); it can carry a leading prefix (`*`, `•`, `§`, a custom symbol, or the Nullify gutter icon matching the fold's nullability); and its font size is adjustable relative to the editor font (default one pixel smaller). The old single-hex color setting is gone.
