# NL-F17: Long Nullability Reasons — Multi-Line Reason Hints with Expand/Collapse

* Ditched(merged into [NL-F20](NL-F20.md))

* Suggested on version `1.0.0` by `Kurv Cygnus`


## Description

When a nullability annotation carries a long reason, the current single-line hint truncates it and clips the tail — the reader loses the most important part. This feature lets the hint take multiple lines and gives the user control over how much of the reason is shown.

By default(configurable under `Settings → Editor → Nullify`), long reasons are **collapsed**: the hint shows a truncated sentence such as *"This is nullable because "returns null when no entry matches …""* — with the elided tail marked by `…`. Expanding the hint reveals the full reason on the **next line**, so the collapsed one-liner stays compact while the complete text is one click (or shortcut) away.

## Solution

Long nullability reasons no longer get clipped off-screen. The hint shows a compact truncated sentence — *"This is nullable because "returns null when no entry matches …""* — by default, and can be expanded to read the full reason on the following line, by clicking the hint, clicking a gutter icon, or via a keyboard shortcut. A `Settings → Editor → Nullify` toggle chooses whether long hints start collapsed.
