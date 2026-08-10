# NL-I41: Reason Hint Should Render in a Gray/Muted Color by Default

* Resolved(`1.0.0`)

* Found on version `1.0.0` by `Kurv Cygnus`


## Description

The nullability reason hint above a collapsed fold currently renders in the editor's full-strength default foreground color, making it look like actual code. It should instead render in a gray/muted color — the same hint styling other IDE inline hints use — so it is visually subordinate to the real code.

## Root Cause

The hint renderer hard-codes the editor's default foreground color for its painted text, with no reference to a hint/annotation color scheme key.

## Solution Result

The reason hint now renders in the editor's normal foreground by default, and users who want it muted can theme it under `Settings → Editor → Color Scheme → Nullify` — no longer stuck with an overly dark gray. The color follows light/dark scheme switches automatically and applies to every open editor immediately.
