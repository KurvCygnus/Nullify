# NL-I18: Config Sync Redesign — On-Demand Registry/Pipeline Re-creation

* Resolved(`0.4.1`)

* Found on version `0.2.0` by `Kurv Cygnus`


## Description

The folding engine recreated its annotation registry and processing pipeline from scratch on every fold build, which is wasteful and becomes increasingly expensive as the plugin's configuration grows.

## Root Cause

The registry and pipeline were treated as short-lived per-build objects instead of long-lived components that react to configuration changes.

## Solution Result

The registry and pipeline are now created once and only recreated when the configuration actually changes, reducing overhead during editing and repaints.
