# NL-I36: `final` Modifier Swallowed When Folding `@Nullable final var` / `@Nullable final String`

* Resolved(`1.0.0`)

* Found on version `1.0.0` by `Kurv Cygnus`


## Description

When a nullability annotation is written before a modifier keyword — e.g. `@Nullable final var foo = ...` or `@Nullable final String foo` — folding collapses the declaration to `String? foo`, silently dropping the `final` keyword. The folded line should read `final String? foo`. The same loss happens with any modifier keyword placed between a declaration annotation and the type (e.g. `@Nullable static String`, `@Nullable public String`).

## Root Cause

The fold region must span from the earliest declaration annotation (which sits *before* the modifier keyword) to the type element, and a fold region is one contiguous text range. Because the placeholder replaces that whole range, every modifier keyword inside it is erased unless the renderer explicitly reproduces it.

## Solution Result

Modifier keywords written between a declaration nullability annotation and the type are now preserved inside the folded placeholder, so `@Nullable final var foo = ...` folds to `final String? foo` and `@Nullable static String foo` folds to `static String? foo`. The fold range still spans the annotation through the type, and navigation behavior is unchanged.
