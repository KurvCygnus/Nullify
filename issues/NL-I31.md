# NL-I31: `var` Type Folding — Suffix Placement & Navigation Mismatch

For an annotated `var` local whose inferred type is a complex generic, two problems surfaced: the nullity marker was placed at the wrong position, and navigation on the folded placeholder was broken. Both symptoms indicate the `var` implementation shortcuts the normal type-adaptation path.


---

## NL-I31.1: `@NotNull var` folds to `Map<Set<String>, Pair<Integer, Double>>!` despite nullify-style configuration

* Resolved(`0.9.6`)

* Found on version `0.9.4` by `Kurv Cygnus`


### Description

`@NotNull var` is folded to `Map<Set<String>, Pair<Integer, Double>>!` — the `!` is appended at the very end of the fully-expanded inferred type — **with kotlin-style markers disabled**. In nullify style the suffix should hug the outer type name (`Map!<Set<String>, Pair<Integer, Double>>`); only kotlin style renders a trailing suffix.

### Root Cause

The `var` branch never reparsed the inferred type as a real annotated type element, so the nullity mark was applied against an assumed single-node structure and the suffix ended up trailing the whole expanded type instead of being re-placed per the configured style.

### Solution Result

Folded `var` locals now place the marker correctly in Nullify style — hugging the outer type name — while Kotlin style keeps its trailing marker.

---

## NL-I31.2: Navigation on folded `var` placeholder is broken

* Resolved(`0.9.7`)

* Found on version `0.9.4` by `Kurv Cygnus`


### Description

On the same folded `@NotNull var` placeholder, navigation misbehaves: the `!` (caret placed **after** the `!`; before the `!` does nothing) navigates to the declaration of `Map`, and every other position provides no navigation.

### Root Cause

The placeholder is built from the inferred type, but navigation resolves tokens against the raw `var` type element — whose structure is just a bare `var` keyword — so the token-to-PSI mapping never lines up.

### Solution Result

Ctrl+clicking a folded annotated `var` placeholder now navigates like any explicit type — the type name and type arguments jump to their declarations, and the marker jumps to the nullability annotation.
