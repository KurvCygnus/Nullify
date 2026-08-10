# NL-F19: Configurable Prefix for Nullability Reason Inline Hints

* Ditched(merged into [NL-F20](NL-F20.md))

* Suggested on version `1.0.0` by `Kurv Cygnus`


## Description

The nullability reason hint (NL-F16) currently renders as a bare sentence — `This is nullable because "returns null when no entry matches".` — with nothing to tie it to Nullify at a glance. This feature gives the **final rendered text** a configurable prefix: **none** (default), `*`, `•`, `§`, a user-typed custom symbol, or the Nullify **Gutter icons** (`Nullable.svg` / `NotNull.svg`), where the icon shown is chosen by the folded type's top-level nullability mark. Whenever a prefix is active, exactly one space separates it from the hint text so it never reads cramped.

## Solution

The nullability reason hint can now carry a leading prefix chosen under `Settings → Editor → Nullify → Folding Behavior`: none (default), `*`, `•`, `§`, your own symbol, or Nullify's Gutter icon — where the icon reflects the fold's nullability (`Nullable.svg` for nullable, `NotNull.svg` for not-null). As long as a prefix is set, exactly one space separates it from the hint text, and changes apply to every open editor immediately.
