# NL-I13: Component Type Annotation Misattribution in Array Dimensions

* Resolved(`0.0.1`)

* Found on version `0.0.1` by `Kurv Cygnus`


## Description

Annotations placed on component types (e.g., `@NotNull Object @Nullable []`) were attributed to the array dimension instead of the component type, failing to yield the correct compact form.

## Solution Result

Component-type annotations now resolve to the correct position, producing the expected fold output.
