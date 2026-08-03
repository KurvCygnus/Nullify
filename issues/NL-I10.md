# NL-I10: Multidimensional Array Folding Flattening and Misattribution

* Resolved(`0.0.1`)

* Found on version `0.0.1` by `Kurv Cygnus`


## Description

Multidimensional arrays (e.g., `@NotNull Object @Nullable [] @Nullable []`) did not fold into nested structures, and inner-dimension annotations were misattributed. The PSI tree for multidimensional arrays is flat, and searching it returned the leaf component instead of the intermediate dimensions.

## Solution Result

Multidimensional arrays now fold into correct nested forms, with annotations applied to the right dimensions.
