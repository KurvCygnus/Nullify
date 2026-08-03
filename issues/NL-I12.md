# NL-I12: Vararg Fold Range Trailing Space Inconsistency

* Resolved(`0.0.1`)

* Found on version `0.0.1` by `Kurv Cygnus`


## Description

Vararg declarations (e.g., `Object @Nullable ... arr`) swallowed the space preceding the parameter name, unlike standard arrays, due to inconsistent fold-end calculation.

## Solution Result

Vararg fold ranges no longer swallow the space before the parameter name.
