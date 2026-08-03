# NL-I7: Scope Coverage for Declaration-Site Nullability Annotations

* Resolved(`0.0.1`)

* Found on version `0.0.1` by `Kurv Cygnus`


## Description

Declaration-site nullability annotations (e.g., `@NotNull String foo;`) were left outside the fold region, so only the type folded and the placeholder rendered redundant forms like `@NotNull String!` instead of `String!`.

## Solution Result

Declaration-site nullability annotations are now covered by the fold region, so placeholders fold to the clean compact form.
