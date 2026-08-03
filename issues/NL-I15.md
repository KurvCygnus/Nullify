# NL-I15: Unrecognized Qualified Generic Types and Type Variables

* Resolved(`0.0.1`)

* Found on version `0.0.1` by `Kurv Cygnus`


## Description

Types structured like `@NotNull Foo.Bar<E>` were not recognized as valid parse targets and fell through to an unknown state instead of folding.

## Root Cause

Nested qualifier references were matched before the full qualified reference, and type variables had no dedicated parsing branch.

## Solution Result

Qualified generic types and type variables now parse and fold correctly.
