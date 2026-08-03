# NL-I4: Preservation of Non-Nullability Annotations in Fold Placeholders

* Resolved(`0.0.1`)

* Found on version `0.0.1` by `Kurv Cygnus`


## Description

Non-nullability annotations (such as `@Value("...")`) were stripped or lost from fold placeholders. In addition, types annotated with only a non-nullability annotation — no `@Nullable`/`@NotNull` — were incorrectly folded.

## Solution Result

Non-nullability annotations are preserved in fold placeholders, and types carrying only non-nullability annotations no longer fold.
