# NL-I37: Auto-Collapse (NL-F14) Fails in Real IDE — Races the Async Fold Pass

* Resolved(`1.0.0`)

* Found on version `1.0.0` by `Kurv Cygnus`


## Description

The "auto-collapse Nullify folds after project analysis completes" behavior worked in unit tests but had no effect in a real IDE: after indexing finished, the Nullify folds stayed expanded instead of collapsing automatically.

## Root Cause

The collapse was triggered at the exact moment analysis finished, but the fold regions Nullify creates are actually materialized by the IDE a moment later, on a background pass. The collapse ran before they existed — or was silently overwritten by that very pass, which creates new folds expanded by default.

## Solution Result

Nullify folds now collapse reliably after project analysis in a real IDE, while folds the user expands manually stay expanded.
