# NL-F16: Nullability Reason Inline Hints — `value` Reason Displayed Above Collapsed Folds

* Completed(`1.0.0`)

* Suggested on version `1.0.0` by `Kurv Cygnus`


## Description

When Nullify collapses `@NotNull`/`@Nullable` into compact `!`/`?` markers, the annotation's optional, documentation-oriented `value` member — e.g. `@Nullable("returns null when no entry matches")` — is swallowed entirely. That reason text is exactly what a reader of collapsed code is missing. This feature restores it as a hint rendered in the line gap directly above the collapsed fold — the same presentation style Better Highlights uses for method complexity — reading `This is nullable because "returns null when no entry matches".`

The hint targets the **top-level type's** nullability: for `List<Map<String, Pair<Integer, Char>>>` it is the `List`'s `?`/`!` mark that is described. It appears only while the fold is collapsed (expanding the fold reveals the source and removes the hint), and only when the annotation actually supplies a reason — no `value`, no hint. A `Settings → Editor → Nullify` toggle switches it off entirely.

## Solution

Nullify now shows the reason a value is nullable or not-null right above the collapsed fold — `This is nullable because "returns null when no entry matches".` — exactly where a reader of collapsed code is missing it. The hint describes the top-level type's nullability (the `List` in `List<Map<String, Pair<Integer, Char>>>`), appears only while the fold is collapsed, and is suppressed when the annotation carries no reason. It can be turned off under `Settings → Editor → Nullify`.
