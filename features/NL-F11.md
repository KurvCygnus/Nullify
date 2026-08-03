# NL-F11: Mixed Nullability Namespace Check (File-Level Consistency)

* Ditched(merged into NL-F3)


## Description

The per-element duplicate check only catches the rare case where multiple `@NotNull`/`@Nullable` annotations are placed on the **same** element. Far more common in practice is **file-level namespace mixing** — different elements in the same file use nullability annotations from different libraries:

## Solution

This feature was merged into the inconsistent-nullability inspection (NL-F3): the file-level namespace check now reports annotations whose namespace differs from the file's canonical one, with a replace-with-canonical quick fix.
