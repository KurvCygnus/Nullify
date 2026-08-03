# NL-F10: Project-Level Default Nullability Annotation Configuration + Smart Quick Fix

* Completed(`0.8.0`)


## Description

When inconsistent nullability annotation usage from different namespaces appears on the same element (e.g., both `@javax.annotation.Nonnull` and `@lombok.NonNull`), users need a **one-click** solution that not only removes duplicates but also sets a **project-level default** annotation library, so future imports consistently use the same FQCN.

Currently, the only available quick fixes are "Remove annotation" (per-annotation deletion) and "Replace with canonical" (per-file majority vote). These are functional but do not address the root cause — the user has no configured preference for which nullability annotation library their project uses.

## Solution

Nullify now supports a project-wide default `@Nullable`/`@NotNull` annotation FQCN, shared with the whole team through VCS. The inconsistent-nullability inspection offers two smart quick fixes: **"Set as project default"** (adopts the file's majority annotation as the project's default) and **"Replace with project default"** (replaces non-conforming annotations with the project's preferred annotation).
