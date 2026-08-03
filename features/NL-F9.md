# NL-F9: Smart Annotation FQCN Selection

* Completed(`0.9.0`)


## Description

Every annotation FQCN input in the settings currently uses plain text entry with no completion hints, only rejecting empty input on validation.

Users should be able to:
1. Get completion suggestions as they type, sourced from the project's Java PSI index
2. See only annotation classes valid at the current call site (filtered by `@Target`)
3. Have the picker gracefully degrade when no project is open (fall back to manual text entry with validation only)

## Solution

All annotation FQCN inputs now offer live completion popups, filtered by the call-site target. Built-in annotations are hidden and rejected in the registry tables, and the fields gracefully fall back to plain text entry when no project is open.
