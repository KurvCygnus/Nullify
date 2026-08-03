# NL-I8: Trailing Whitespace Absorption Before Variable Names

* Resolved

* Found on version `0.0.1` by `Kurv Cygnus`


## Description

Folding swallowed the space before a variable name, producing `Array!<Object>var` instead of `Array!<Object> var`.

## Solution Result

The space before the variable name is now preserved in fold placeholders.
