# NL-I19: Qualified Type Issues

Qualified types carrying type-use nullability annotations on intermediate segments folded incorrectly or not at all. This parent issue tracks the two related problems found with qualified types.


---

## NL-I19.1: Qualified Types' Incorrect Folding Result

* Resolved(`0.2.1`)


### Description

`A.@NotNull B` folded to the broken `A.A.B!` — the leading qualifier `A.` stayed visible outside the fold and was duplicated — while `@NotNull A.B` folded correctly.

### Root Cause

The fold range started at the annotation instead of the start of the type element, leaving the leading qualifier outside the fold and duplicating it in the rendered result.

### Solution Result

Qualified types with an annotation between the qualifier and identifier now fold correctly, with the fold range covering the whole type.

---

## NL-I19.2: Qualified Type Annotation Resolution Misses Annotations on Intermediate Qualifier Segments

* Resolved(`0.2.2`)


### Description

A type-use nullability annotation on an **intermediate qualifier segment** of a deeply qualified type (e.g., `A.@NotNull B.C`) produced **no folding at all** for the whole type.

### Root Cause

The pipeline could only see annotations placed directly on the type element; annotations buried inside the qualified-reference chain were invisible, and the qualifier text kept annotation markup — so such types fell through to "no fold".

### Solution Result

Nullability annotations on any segment of a qualified type are now resolved, and such types fold correctly — e.g., `A.@NotNull B.C` → `A.B.C!`, `A.@Nullable B.C` → `A.B.C?`.
