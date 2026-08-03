# NL-I28: Annotation FQCN Completion — Uppercase Prefix & Insertion Regressions

The annotation FQCN completion popup regressed in two related ways: typing an uppercase first character produced no candidates, and after that was fixed, accepting a completion stopped replacing the typed prefix and lost its match highlighting.


---

## NL-I28.1: Uppercase First Typed Character Yields No Completion Candidates

* Resolved(`0.9.2`)

* Found on version `0.9.0` by `Kurv Cygnus`


### Description

In any annotation FQCN completion field, if the **first** character typed is uppercase (e.g. `N`), the popup shows **no candidates at all**. Typing the same letter lowercase (e.g. `n`) works and shows suggestions.

### Root Cause

The provider deliberately returned a `null` prefix matcher so the platform would not drop simple-name hits — but with no matcher, the completion session re-filtered candidates with its own **case-sensitive** matcher built from the typed prefix, which dropped every uppercase-first candidate.

### Solution Result

Typing an uppercase first character now yields the same suggestions as the lowercase form.

---

## NL-I28.2: Completion Inserts Without Replacing the Typed Prefix and Loses Match Highlighting

* Resolved(`0.9.4`)

* Found on version `0.9.3` by `Kurv Cygnus`


### Description

After the NL-I28.1 fix, accepting a completion in any annotation FQCN field **no longer replaces the typed prefix** and the **typed prefix is never highlighted** in the popup candidates.

### Root Cause

The always-true matcher used to fix NL-I28.1 has an **empty prefix**, and the platform derives both the text-to-replace and the highlight from that matcher's prefix — so nothing was replaced and nothing was highlighted.

### Solution Result

Accepting a completion now replaces the typed prefix, and the typed prefix is highlighted in the suggestion list again.
