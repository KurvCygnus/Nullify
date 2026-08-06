# NL-I35: Navigation on Folded Annotation Arguments Jumps to the Type Instead of the Annotation's Element Methods

* Resolved(`1.0.0`)

* Found on version `0.9.10` by `Kurv Cygnus`


## Description

When a non-nullity annotation with arguments (e.g. `@MyAnno(name = "foo", value = "bar")`) is preserved inside a folded placeholder such as `@MyAnno(name = "foo", value = "bar") Foo!`, clicking on the annotation-argument part navigates to the field's type (`Foo`) instead of the annotation's element methods (`MyAnno#name()` / `MyAnno#value()`). Only the annotation name itself (`@MyAnno`) navigates correctly.

## Root Cause

The placeholder parser does not understand annotation argument lists. Inside `@MyAnno(name = "foo", value = "bar")` the characters `(`, `)`, `=`, and `"` are treated as unknown and skipped, while the argument names and values (`name`, `foo`, `value`, `bar`) are misclassified as type names. Clicking them therefore resolves to the field's type instead of the annotation's element methods.

## Solution Result

Clicking an annotation argument inside a preserved annotation on a folded type now navigates to the annotation's element method — e.g. `name` and `value` in `@MyAnno(name = "foo", value = "bar") String!` jump to `MyAnno#name()` and `MyAnno#value()` — instead of the field's type. This is delivered by the PSI-anchored fold-navigation redesign in [NL-F12](../features/NL-F12.md).
