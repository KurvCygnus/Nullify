# NL-I42: Reason Hint Rendering Issues

The nullability reason hint (NL-F16) renders mostly as expected, but three presentation problems remain: the Editor Color Scheme preview shows effects and bold/italic that the real editor ignores, overlong reasons overflow the screen horizontally because they never wrap (and the default max-inline length is small enough to make collapse feel premature), and the hint has no fold arrow in the gutter to collapse/expand it. This parent issue tracks those three concrete problems.


---

## NL-I42.1: Color Scheme Effects and Bold/Italic Not Applied in the Editor

* Resolved(`1.0.0`)

* Found on version `1.0.0` by `Kurv Cygnus`


### Description

In `Settings → Editor → Color Scheme → Nullify`, the "Reason hint" attribute previews effects (strikethrough, underline, wave, …) and bold/italic correctly, but in the actual editor the hint ignores all of them — it always renders plain with only the foreground color applied.

### Root Cause

The hint's inlay renderer reads only the foreground color from the scheme attribute and never applies the attribute's font style, background, or effects.

### Solution Directions

The reason hint honors the full Editor Color Scheme attribute — bold/italic, background, and effects now render in the real editor exactly as the color page previews them, and the hint defaults to italic.

---

## NL-I42.2: Overlong Reason Text Overflows Horizontally — No Wrapping; Default Max-Inline Length Too Small

* Resolved(`1.0.0`)

* Found on version `1.0.0` by `Kurv Cygnus`


### Description

A very long reason, once expanded, is laid out as a single unbounded line and runs off the right edge of the screen — it never wraps to the next line. Separately, the default max-inline length (40) is small, so ordinary reasons collapse prematurely; the sensible default is 80, dynamically scaled by the user's editor font size.

### Root Cause

The hint's wrap width is computed from the editor's full content component width instead of the visible viewport, so when the file is wider than the window the wrap point lands off-screen and nothing wraps. The collapse threshold is a fixed character count that ignores the editor's font size.

### Solution Directions

Long reasons wrap neatly inside the editor's visible width instead of running off-screen, the collapsed one-liner always fits, and the default collapse threshold is **Adaptive** (80 characters at a 12px editor font, scaled to your editor's font size) so normal reasons stay readable.

---

## NL-I42.3: Long Hint Has No Fold Arrow in the Gutter

* Resolved(`1.0.0`)

* Found on version `1.0.0` by `Kurv Cygnus`


### Description

When a long reason is shown as a multi-line hint, there is no fold arrow in the editor gutter next to it, so the only way to collapse it back is to click the text — users expect the standard IDE fold arrow beside the hint.

### Root Cause

The hint renderer never provides a gutter icon renderer, so the platform shows nothing in the gutter for the block inlay.

### Solution Directions

Long reason hints show the standard IDE fold arrow in the gutter; clicking it collapses/expands the hint exactly like the built-in fold arrows.
