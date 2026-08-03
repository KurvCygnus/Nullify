# NL-I22: Settings Change Does Not Refresh Existing Fold Regions

* Resolved(`0.8.0`)

* Found on version `0.6.0` by `Kurv Cygnus`


## Description

When the user changes folding behavior settings in `Settings → Editor → Nullify`
(e.g., toggling **Kotlin-style nullity markers**, disabling **nullity folding**,
switching the **wildcard symbol**, or modifying the **custom annotation registry**),
existing fold regions in open editors display stale placeholder text based on
the old configuration.

## Root Cause

Applying settings recreated the folding engine but never told the open editors to rebuild their folds, so existing fold regions kept their old placeholder text.

## Solution Result

After applying settings, all open editors immediately display fold regions with the new placeholder text — no reopening or manual re-fold required.
