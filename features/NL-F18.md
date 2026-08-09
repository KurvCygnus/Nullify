# NL-F18: Reason Hint Colors Through the Editor Color Scheme — Replace the Single-Hex Setting

* Open

* Suggested on version `1.0.0` by `Kurv Cygnus`


## Description

The reason hint currently supports only a single custom foreground color chosen under `Settings → Editor → Nullify` (one `RRGGBB` value, off by default). That does not play well with IntelliJ's theming: switching between light/dark schemes keeps one hard-coded color, and there is no way to theme background/effects or preview the hint in the IDE's color scheme editor.

This feature makes the reason hint a first-class citizen of the **Editor Color Scheme**: a new `Nullify` color page under `Settings → Editor → Color Scheme` with a theme-able "Reason hint" attribute (foreground, background, effects, bold/italic), sharing the look of the rest of the editor's hints and following scheme switches automatically.

## Solution

The nullability reason hint is now a fully theme-able editor color: it appears as a "Reason hint" attribute under `Settings → Editor → Color Scheme → Nullify` (foreground, background, effects), follows light/dark scheme switches automatically, and the old single-hex color setting is gone.
