# NL-I27: Annotation Picker Candidates Display Bare FQCN — Should Show `simpleName (package)`

* Resolved(`0.9.1`)

* Found on version `0.9.0` by `Kurv Cygnus`


## Description

In the annotation FQCN completion popup, every candidate is rendered as the full FQCN (e.g. `org.jetbrains.annotations.Nullable`). The idiomatic IntelliJ presentation is the **simple name followed by its package** (rendered as a gray tail text):

```
Nullable org.jetbrains.annotations
```

i.e. `${simple_name} ${package_name}`, where the tail is the FQCN **with the simple name itself removed** (package only). Long library FQCNs are then much easier to scan, and the annotation family (JetBrains / Jakarta / Lombok / …) becomes visible at a glance.

## Root Cause

The completion descriptor rendered the bare FQCN because only the insert string was defined — the display hooks that render the item text and type text were never overridden.

## Solution Result

The picker now renders candidates as `simpleName` with the package as a gray tail text (e.g. `Nullable org.jetbrains.annotations`), while the inserted value stays the full FQCN.
