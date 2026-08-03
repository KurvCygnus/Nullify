# NL-I9: Cross-File Placeholder Cache Pollution

* Resolved(`0.0.1`)

* Found on version `0.0.1` by `Kurv Cygnus`


## Description

A single placeholder cache shared across all files caused missing placeholder text when switching between open editor tabs.

## Solution Result

Placeholder text is now computed on demand, so switching files always shows the correct fold text.
