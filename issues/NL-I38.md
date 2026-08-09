# NL-I38: `Slow operations are prohibited on EDT` When Typing a Reason in a Nullability Annotation

* Open

* Found on version `1.0.0` by `Kurv Cygnus`


## Description

While typing a reason string inside a nullability annotation (e.g. `@Nullable("")`), just after the opening quote — when the value is still an empty string — Nullify throws an `java.lang.Throwable: Slow operations are prohibited on EDT` error into the log, triggered from the hint manager re-rendering the collapsed fold.

## Root Cause

Every time a fold collapses the hint manager re-runs the full folding pipeline to read the annotation's reason — and that pipeline resolves the type (a slow, index-backed operation). When it runs on the UI thread (which inlays require), the IDE flags it as a slow operation on the EDT and reports the error.

## Solution Result

_Not yet resolved._
