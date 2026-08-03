# NL-I24: `inspection.inconsistent.nullability.message` Not Following IDE Language

* Resolved(`0.8.0`)

* Found on version `0.7.0` by `Kurv Cygnus`


## Description

All other Nullify i18n keys (settings UI labels, etc.) correctly follow the IDE's display language (e.g., 简体中文). However, the inspection's display name `inspection.inconsistent.nullability.display.name` always rendered as English text, because it was hardcoded in `plugin.xml` as `displayName="Inconsistent nullability annotation"` which took precedence over the bundle-based i18n.

## Root Cause

The inspection's display name was hardcoded in `plugin.xml`, so the platform always used that English text and never consulted the localized message bundles.

## Solution Result

The inspection's display name now follows the IDE's display language instead of always showing English.
