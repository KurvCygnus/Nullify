# NL-F15: Runnable Folding Demo (`NullifyDemo`)

* Completed(`1.0.0`)

* Suggested on version `1.0.0` by `Kurv Cygnus`


## Description

A small set of runnable Java demo files that showcase every folding capability the plugin provides. Opening them in the IDE with Nullify installed shows the compact `String?`/`Map!<String!>`-style syntax immediately, and each file has a `main` method so the underlying code also runs. The core `NullifyDemo` class demonstrates nullity annotations (`?`/`!`), preserved non-nullity annotations, qualified types and annotated `var` locals, while the companion files cover `var` inference, arrays/varargs, and wildcards/generics/intersection casts.

## Solution

Opening `NullifyDemo` (or any demo file in `kurvcygnus.nullify.demo`) with Nullify installed folds every annotated element into its compact form, and running the `main` method prints the values those types actually hold, proving the demo is real, compilable Java.
