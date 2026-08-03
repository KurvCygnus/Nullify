# NL-I34: Keyboard (F12/Ctrl+B) Navigation Can't Reach Interior Placeholder Tokens on Collapsed Folds

* Pending(1)

* Found on version `0.9.8` by `Kurv Cygnus`


## Description

Mouse Ctrl+Click navigation on a folded type can target every placeholder token, but keyboard-only navigation (F12 / Ctrl+B) on the same collapsed fold can only ever reach the first or the last token. In `EnumMap!<E, V>`, placing the caret with arrow keys and pressing F12 navigates to the outer `EnumMap` when the caret sits at the fold's left edge, and to the last token when it sits at the fold's right edge — the type arguments `E`/`V` and the `!` marker are unreachable. Moving the caret strictly inside the collapsed fold expands it, and navigation then falls back to the underlying source instead of a Nullify target.

## Root Cause

A collapsed fold is a single visual cell: the caret's visual position always maps back to the fold's start column, and arrow keys jump over the whole region, so the keyboard path only ever derives placeholder offset `0` (first token) or the clamped last character (last token). There is no way to address a middle token from the keyboard, and entering the fold expands it.
