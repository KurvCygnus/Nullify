# NL-I20: Class/package scope-default nullability does not propagate to type arguments and array components

* Resolved(`0.3.1`)

* Found on version `0.3.0` by `Kurv Cygnus`


## Description

When a scope-default annotation such as `@NotNullByDefault` is applied to a class or package, the type arguments of generic types and the component types of arrays are expected (per `@NotNullByDefault`'s Javadoc) to inherit the scope default as well. Currently, Nullify only resolves scope defaults at the top-level type-use position — type arguments like `List<@Nullable Foo>` in a `@NotNullByDefault` class are treated as unannotated rather than implicitly `@NotNull`.

## Root Cause

The scope default was resolved only at the outermost type position; type arguments and array components were resolved in isolation and never consulted the class/package default.

## Solution Result

Scope-default nullability now propagates into type arguments, array components, and wildcard bounds — unless an explicit annotation on the parent type overrides it.
