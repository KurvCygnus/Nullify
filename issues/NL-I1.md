# NL-I1: Poor `var` Support

* Resolved(`0.0.1`)

* Found on version `0.0.1` by `Kurv Cygnus`


## Description

Local variables declared with `var` were not recognized as fold targets. Annotated `var` declarations behaved exactly like unannotated ones, instead of inferring the type, parsing its annotations, and folding the type accordingly.

## Solution Result

Annotated `var` local variables now infer their type and fold accordingly; unannotated ones are left untouched.
