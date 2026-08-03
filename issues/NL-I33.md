# NL-I33: Annotation Picker Hardcodes `AllIcons.Nodes.Annotationtype` — Custom Icon Plugins Ignored

* Resolved(`0.9.10`)

* Found on version `0.9.7` by `Kurv Cygnus`


## Description

The annotation picker's completion popup renders every candidate with a hardcoded stock annotation glyph. Under a stock IntelliJ this matches the platform's own rendering, but when the user installs an icon plugin that customizes annotation icons, the picker keeps showing the stock glyph while every other IDE surface (Project View, Structure View, standard code completion) shows the plugin's icon — the picker no longer matches the user's icon theme.

## Root Cause

The picker bypassed the platform's PSI-based icon resolution and returned a hardcoded icon, and the candidate model dropped the resolved annotation class it could have asked for an icon.

## Solution Result

The annotation picker's icons now follow the IDE's icon theme. Each candidate is rendered with the icon the platform resolves for its annotation class, so custom icon plugins that restyle annotation glyphs are honored in the completion popup — exactly like the project view and standard code completion. The stock annotation icon remains as a fallback when an annotation cannot be resolved (e.g. during indexing or without a JDK).
