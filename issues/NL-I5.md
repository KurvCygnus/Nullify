# NL-I5: Introduce `IrNode.Ignored` for Primitives and Unannotated `var`

* Resolved

* Found on version `0.0.1` by `Kurv Cygnus`


## Description

The "unknown" marker was over-used for simple non-foldable constructs like primitive types and unannotated `var` declarations, which obscured genuine parsing errors.

## Solution Result

Simple non-foldable constructs now use a dedicated "ignored" marker, so genuine parsing failures remain easy to spot.
