# NL-F8: Class-Level & Package-Level Nullability Default Annotation Support

* Completed(`0.3.0`)


## Description

Annotations like `org.jetbrains.annotations.NotNullByDefault` (targets `TYPE` and `PACKAGE`) establish a default nullability for all elements within that scope. Currently, Nullify only supports:
- **Direct annotations** — type-use and declaration-site.
- **Package-level parameter-only defaults** — `@ParametersAreNonnullByDefault` / `@ParametersAreNullableByDefault` (javax/Jakarta), resolved from `package-info.java`.

This feature adds full support for:
1. **Class-level defaults** — e.g. `@NotNullByDefault` on a class declaration makes all fields, parameters, and return types within that class default to `@NotNull`.
2. **Package-level all-elements defaults** — e.g. `@NotNullByDefault` on `package-info.java` should affect fields and return types too, not just parameters.
3. **Custom scope-default registration in settings** — Users should be able to register arbitrary FQCNs as scope-level default annotations via the config UI, just as they can for direct nullability annotations today.

## Solution

Class-level and package-level nullability defaults are fully supported, and custom scope-default annotations can be registered in the settings UI. A related gap — scope defaults not propagating into nested type positions — is tracked in [NL-I20](../issues/NL-I20.md).
