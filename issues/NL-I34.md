# NL-I34: Keyboard (F12/Ctrl+B) Navigation Can't Reach Interior Placeholder Tokens on Collapsed Folds

* Resolved(`0.9.10`)

* Found on version `0.9.8` by `Kurv Cygnus`


## Description

Mouse Ctrl+Click navigation on a folded type can target every placeholder token, but keyboard-only navigation (F12 / Ctrl+B) on the same collapsed fold was reported to reach only the first or the last token. In `EnumMap!<E, V>`, placing the caret with arrow keys and pressing F12 navigated to the outer `EnumMap` when the caret sits at the fold's left edge, and to the last token when it sits at the fold's right edge — the type arguments `E`/`V` and the `!` marker appeared unreachable. *(This symptom is no longer reproducible after the `CaretListener` refactor; the original premise — that moving the caret inside a collapsed fold expands it — is incorrect. See the corrected [Root Cause](#root-cause).)*

## Root Cause

The previously recorded root cause was wrong: moving the caret inside a collapsed fold does **not** expand the text in the standard IDE — expanding folded text on caret movement is an IdeaVim-only behavior (see [NL-I16.3](NL-I16.md#nl-i163-keyboard-only-navigation-f12-lacks-precise-token-targeting-for-ideavim-users)). In the normal editor, arrow-key movement never expands a collapsed fold, and the caret's *visual* position can rest on any interior column of the placeholder, so every placeholder token is addressable from the keyboard. The reported symptom is no longer reproducible after the `CaretListener` refactor.

## Solution Result

Keyboard navigation on a collapsed fold now resolves every placeholder token correctly: the caret can walk through the placeholder interior without unfolding the text (that unfold-on-caret-move behavior is IdeaVim-specific), so F12 / Ctrl+B from an interior caret position reaches the corresponding type, type argument, or `?`/`!` marker exactly like Ctrl+Click. The reported symptom is no longer reproducible.
