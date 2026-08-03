# NL-I29: Project-Default FQCN Fields Collapsed Height, Not Focusable, Not Editable

* Resolved(`0.9.3`)

* Found on version `0.9.0` by `Kurv Cygnus`


## Description

The **6 project-default annotation FQCN input fields** (`Settings → Editor → Nullify` Element/Class/Package-Level Defaults → `@Nullable`/`@NotNull`) render with a collapsed height — nearly as thin as a progress bar — cannot be clicked / focused, and cannot accept typed text. The registry-table "+" dialogs (which also use the completion field, but inside a `DialogWrapper`) are unaffected; only the inline project-default section fields are broken.

## Root Cause

The completion field's preferred size was pinned to its pre-realization height — which reports a minimal value before the embedded editor exists — so the row collapsed and the field became non-interactive.

## Solution Result

The six project-default fields render at a normal height and can be clicked, focused, and typed into again.
