# NL-I23: Inconsistent QuickFix Display Order Across Minority/Majority Annotations

* Resolved(`0.8.2`)

* Found on version `0.7.0` by `Kurv Cygnus`


## Description

When annotations from different nullability namespaces are present in the same file, the inspection's quick fixes show different options depending on the element the user clicks:

1. **Minority annotation** (e.g., `@lombok.NonNull` when the majority uses `@javax.annotation.Nonnull`):
   - Shows **"Replace with `@javax.annotation.Nonnull`"**
   - Shows **"Set `@javax.annotation.Nonnull` as project @NotNull default"**

2. **Majority annotation** (e.g., `@javax.annotation.Nonnull` itself):
   - Shows **"Remove annotation"** (if it's a per-element duplicate on the SAME element as another mark)
   - Shows **"Set `@javax.annotation.Nonnull` as project @NotNull default"** (if it causes no conflict by itself)

This asymmetry is confusing — the majority annotation user might not understand why "Replace" doesn't appear, while the minority user gets both Replace + SetDefault.

## Root Cause

The quick-fix pool was built per-annotation, so each annotation offered a different set of fixes depending on whether it was the majority or the minority — instead of a single symmetric fix list per scenario.

## Solution Result

Flagging and quick fixes are now order-independent and symmetric: exactly the inconsistent (non-majority / non-default) annotations are flagged, each offering the same quick-fix set regardless of which annotation the user clicks.
