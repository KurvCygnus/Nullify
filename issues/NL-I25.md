# NL-I25: Scope-Level Override Anti-Design — `ScopeEntry(scopeName, fqcn)` Mapping

* Resolved(`0.8.1`)

* Found on version `0.8.0` by `Kurv Cygnus`


## Description

The project-level config used a per-name override model that let users map **specific class/package names** to **specific annotation FQCNs** (e.g. `com.example.Foo=some.Annotation`). This was an anti-design — the original intent was a **single global FQCN per scope level**:

- Element-Level `@Nullable`/`@NotNull` — annotations on parameters, return values, fields, locals, type-use positions.
- Class-Level `@Nullable`/`@NotNull` — scope defaults such as `@NotNullByDefault` on a class.
- Package-Level `@Nullable`/`@NotNull` — scope defaults such as `@ParametersAreNonnullByDefault` in `package-info.java`.

## Root Cause

The config stored a list of per-name FQCN mappings for class/package overrides, adding a layer of per-name complexity that was neither intended nor meaningful.

## Solution Result

Nullability default annotations are now configured independently for three scope levels (Element, Class, Package), each with a single global `@Nullable`/`@NotNull` FQCN — the confusing per-name override mapping is gone.
