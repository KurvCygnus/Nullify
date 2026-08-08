# NL-F14: Auto-Collapse Nullify Folds After Project Analysis Completes

* Completed(`1.0.0`)

* Suggested on version `1.0.0` by `Kurv Cygnus`


## Description

When a project finishes its analysis (indexing), the fold regions Nullify created in the editor tab the user is currently using are collapsed automatically, so the compact `String?`/`Foo!` syntax is visible without the user having to fold them manually. Only the active editor tab is affected — background tabs, and non-Nullify folds such as method bodies and imports, are left untouched. The behavior is user-configurable.

## Solution

After the project finishes its analysis, the Nullify fold regions in the editor tab you are currently using are collapsed automatically, so the compact folded syntax is shown immediately. Other tabs and non-Nullify folds are not affected. This can be turned off under `Settings → Editor → Nullify → Folding Behavior`.
