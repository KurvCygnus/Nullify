# NL-I14: Exclusion of Leading Non-Nullability Annotations from Fold Ranges

* Resolved(`0.0.1`)

* Found on version `0.0.1` by `Kurv Cygnus`


## Description

When a non-nullability annotation (e.g., `@MyAnno`) preceded the first nullability annotation (e.g., `@NotNull`), the leading annotation was left outside the calculated fold range and omitted from the placeholder text — logically correct, but bad on UX.

## Solution Result

Leading non-nullability annotations are now included in the fold range and preserved in the placeholder text.
