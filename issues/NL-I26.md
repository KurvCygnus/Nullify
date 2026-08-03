# NL-I26: QuickFix Standards Conformance — `InconsistentNullabilityInspection`

* Resolved(`0.8.2`)

* Found on version `0.8.1` by `Kurv Cygnus`


## Description

The inspection's quick fixes did not always match the intended standard for each scenario: the fix set differed depending on which annotation was clicked, three or more conflicting annotations on one element were not handled, and incremental analysis produced inconsistent flagging decisions.

## Root Cause

Quick-fix pools were built per-annotation based on that annotation's relationship to the canonical one, producing asymmetric fix lists; removals assumed a small fixed set of annotations; and incremental analysis could base decisions on stale state.

## Solution Result

An "Aggressive analysis" toggle lets the inspection re-analyze the whole file (default) or only the edited region (Prudence mode). Flagging is now order-independent and symmetric — exactly the inconsistent annotations are flagged, each with the same quick-fix set — and three or more conflicting annotations on one element are each flagged and individually removable.
