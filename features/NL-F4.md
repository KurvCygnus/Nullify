# NL-F4: More Folding Support on Generics

* Completed

* Suggested on version `0.0.2` by `Kurv Cygnus`


## Description

Since `? extends` → `out` and `? super` → `in` is supported, why not adding these in independent generic declaration, instead of just showing this in nullability annotated targets?

## Solution

Confirmed that method-call type arguments are already handled and that Nullify does not create fold regions for them; a defensive guard prevents future regressions.
