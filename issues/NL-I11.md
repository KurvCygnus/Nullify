# NL-I11: Array Type-Use Annotation Misattribution Strategy

* Resolved

* Found on version `0.0.1` by `Kurv Cygnus`


## Description

It was unclear whether declaration-site annotations on array parameters (e.g., `@NotNull Object[]`) should apply to the array container itself or to the element type.

## Solution Result

The behavior is confirmed intentional: declaration-site annotations constrain the array reference itself, while explicit type-use annotations distribute per dimension.
