# Tracking Index

> [!NOTE]
> This index tracks all issues (NL-I) and feature proposals (NL-F) for Nullify.\
> Each entry links to its dedicated tracking file.

---

## Issues

### Open

*None*

### Ditched

- [NL-I16.3](issues/NL-I16.md#nl-i163-keyboard-only-navigation-f12-lacks-precise-token-targeting-for-ideavim-users) — Keyboard-Only Navigation (F12) Lacks Precise Token Targeting for IDEAVim Users

### Researching

*None*

### Handling

*None*

### Pending

- [NL-I34](issues/NL-I34.md) — Keyboard (F12/Ctrl+B) Navigation Can't Reach Interior Placeholder Tokens on Collapsed Folds

### Resolved

- [NL-I1](issues/NL-I1.md) — Poor `var` Support
- [NL-I2](issues/NL-I2.md) — Custom Annotation Registry Support in Folding Configuration
- [NL-I3](issues/NL-I3.md) — Pipeline Logging and Observability
- [NL-I4](issues/NL-I4.md) — Preservation of Non-Nullability Annotations in Fold Placeholders
- [NL-I5](issues/NL-I5.md) — Introduce `IrNode.Ignored` for Primitives and Unannotated `var`
- [NL-I6](issues/NL-I6.md) — Array and Vararg Folding Redesign via Type Normalization
- [NL-I7](issues/NL-I7.md) — Scope Coverage for Declaration-Site Nullability Annotations
- [NL-I8](issues/NL-I8.md) — Trailing Whitespace Absorption Before Variable Names
- [NL-I9](issues/NL-I9.md) — Cross-File Placeholder Cache Pollution
- [NL-I10](issues/NL-I10.md) — Multidimensional Array Folding Flattening and Misattribution
- [NL-I11](issues/NL-I11.md) — Array Type-Use Annotation Misattribution Strategy
- [NL-I12](issues/NL-I12.md) — Vararg Fold Range Trailing Space Inconsistency
- [NL-I13](issues/NL-I13.md) — Component Type Annotation Misattribution in Array Dimensions
- [NL-I14](issues/NL-I14.md) — Exclusion of Leading Non-Nullability Annotations from Fold Ranges
- [NL-I15](issues/NL-I15.md) — Unrecognized Qualified Generic Types and Type Variables
- [NL-I16.1](issues/NL-I16.md#nl-i161-resolution-limitation--annotations-dont-navigate-to-declarations-click-zones-not-refined) — Resolution Limitation — Annotations Don't Navigate to Declarations, Click Zones Not Refined
- [NL-I16.2](issues/NL-I16.md#nl-i162-navigation-all-click-gives-same-target-regression) — Navigation All-Click-Gives-Same-Target Regression
- [NL-I16.4](issues/NL-I16.md#nl-i164-generic-type-arguments-cannot-be-navigated-independently) — Generic Type Arguments Cannot Be Navigated Independently
- [NL-I16.5](issues/NL-I16.md#nl-i165-suffix-adjacent-delimiter-click-gap-ux) — Suffix-Adjacent Delimiter Click Gap (UX)
- [NL-I16.6](issues/NL-I16.md#nl-i166-caretlistener-tramples-mouseadapters-placeholderclickinfo) — CaretListener Tramples MouseAdapter's PlaceholderClickInfo
- [NL-I16.7](issues/NL-I16.md#nl-i167-smart-filling-this-will-be-the-final) — Smart filling: This will be the final!!!
- [NL-I17](issues/NL-I17.md) — Back to `IrNode`: Refocus on Intersection
- [NL-I18](issues/NL-I18.md) — Config Sync Redesign — On-Demand Registry/Pipeline Re-creation
- [NL-I19.1](issues/NL-I19.md#nl-i191-qualified-types-incorrect-folding-result) — Qualified Types' Incorrect Folding Result
- [NL-I19.2](issues/NL-I19.md#nl-i192-qualified-type-annotation-resolution-misses-annotations-on-intermediate-qualifier-segments) — Qualified Type Annotation Resolution Misses Annotations on Intermediate Qualifier Segments
- [NL-I20](issues/NL-I20.md) — Class/package scope-default nullability does not propagate to type arguments and array components
- [NL-I21](issues/NL-I21.md) — Configurable Wildcard Symbol & Settings UI I18n
- [NL-I22](issues/NL-I22.md) — Settings Change Does Not Refresh Existing Fold Regions
- [NL-I23](issues/NL-I23.md) — Inconsistent QuickFix Display Order Across Minority/Majority Annotations
- [NL-I24](issues/NL-I24.md) — `inspection.inconsistent.nullability.message` Not Following IDE Language
- [NL-I25](issues/NL-I25.md) — Scope-Level Override Anti-Design — `ScopeEntry(scopeName, fqcn)` Mapping
- [NL-I26](issues/NL-I26.md) — QuickFix Standards Conformance — `InconsistentNullabilityInspection`
- [NL-I27](issues/NL-I27.md) — Annotation Picker Candidates Display Bare FQCN — Should Show `simpleName (package)`
- [NL-I28.1](issues/NL-I28.md#nl-i281-uppercase-first-typed-character-yields-no-completion-candidates) — Uppercase First Typed Character Yields No Completion Candidates
- [NL-I28.2](issues/NL-I28.md#nl-i282-completion-inserts-without-replacing-the-typed-prefix-and-loses-match-highlighting) — Completion Inserts Without Replacing the Typed Prefix and Loses Match Highlighting
- [NL-I29](issues/NL-I29.md) — Project-Default FQCN Fields Collapsed Height, Not Focusable, Not Editable
- [NL-I30](issues/NL-I30.md) — `ClassCastException` in `determineScope` on Mid-Typing Type-Use Annotations
- [NL-I31.1](issues/NL-I31.md#nl-i311-notnull-var-folds-to-mapsetstring-pairinteger-double-despite-nullify-style-configuration) — `@NotNull var` folds to `Map<Set<String>, Pair<Integer, Double>>!` despite nullify-style configuration
- [NL-I31.2](issues/NL-I31.md#nl-i312-navigation-on-folded-var-placeholder-is-broken) — Navigation on folded `var` placeholder is broken
- [NL-I32.1](issues/NL-I32.md#nl-i321-generic-method-var--right-edge-navigation-gap-on-method-type-parameters) — Generic-method `var` — Right-Edge Navigation Gap on Method Type Parameters
- [NL-I32.2](issues/NL-I32.md#nl-i322-no-target-navigation-silently-fails-and-unfolds) — No-Target Navigation Silently Fails and Unfolds
- [NL-I33](issues/NL-I33.md) — Annotation Picker Hardcodes `AllIcons.Nodes.Annotationtype` — Custom Icon Plugins Ignored

---

## Features

### Open

*None*

### Ditched

- [NL-F2](features/NL-F2.md) — Better Local Variable Support: Dataflow Integration
- [NL-F11](features/NL-F11.md) — Mixed Nullability Namespace Check (File-Level Consistency) — Merged into NL-F3

### Considering

*None*

### Implementing

*None*

### Accepted

- [NL-F7](features/NL-F7.md) — "Template Mode"

### Completed

- [NL-F1](features/NL-F1.md) — Navigation Support
- [NL-F3](features/NL-F3.md) — New Lint: Duplicated Nullability Annotation Usage
- [NL-F4](features/NL-F4.md) — More Folding Support on Generics
- [NL-F5](features/NL-F5.md) — UI Config
- [NL-F6](features/NL-F6.md) — Real Kotlin Styled Folded Type
- [NL-F8](features/NL-F8.md) — Class-Level & Package-Level Nullability Default Annotation Support
- [NL-F9](features/NL-F9.md) — Smart Annotation FQCN Selection
- [NL-F10](features/NL-F10.md) — Project-Level Default Nullability Annotation Configuration + Smart Quick Fix
