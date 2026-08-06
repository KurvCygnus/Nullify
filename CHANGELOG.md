# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **Automated public tracking-document publishing**: The public tracking repository is now validated, generated, and published automatically on every push to `main` (requires the `PUBLIC_TRACKING_REPO` repository variable and `PUBLIC_TRACKING_TOKEN` secret to be configured).

## [1.0.0] - 2026-08-06

### Added

- **Fold navigation jumps to the exact declaration (NL-F12)**: Clicking any part of a folded placeholder now navigates to the declaration the IDE would have shown before folding. Type names jump to their classes, nullability markers to their annotations, and wildcard-only folds such as `List<out Foo>` navigate to the bound type.

### Fixed

- **Annotation arguments navigate to their element methods (NL-I35)**: Clicking an argument inside a preserved annotation — e.g. `name` or `value` in `@MyAnno(name = "foo", value = "bar") String!` — now jumps to the annotation's element method (`MyAnno#name()` / `MyAnno#value()`) instead of the field's type.
- **Clicking structural parts keeps the fold collapsed**: Clicking synthetic parts of a folded placeholder (whitespace, delimiters, `Array`/`Vararg` markers) keeps the fold collapsed, and IntelliJ shows its native "cannot find declaration to go to" guidance instead of navigating to a wrong declaration.

## [0.9.10] - 2026-08-03

### Fixed

- **Annotation picker icons follow your IDE's icon theme (NL-I33)**: The annotation completion popup now renders each candidate with the icon the IDE resolves for that annotation class, so icon plugins that restyle annotation glyphs are honored everywhere instead of only in the project/structure views. The stock annotation icon is kept as the fallback when an annotation cannot be resolved.

## [0.9.9] - 2026-08-03

### Fixed

- **Ctrl+clicking a folded placeholder with no target no longer unfolds the fold (NL-I32.2)**: When a folded placeholder position has nothing to navigate to (whitespace, synthetic `Array`/`Vararg` tokens), Ctrl+click (or Ctrl+B/F12) keeps the fold collapsed instead of silently expanding it, and IntelliJ shows its native "cannot find declaration to go to" guidance when nothing can be resolved.

## [0.9.8] - 2026-08-03

### Fixed

- **Type-argument boundary navigation on folded types (NL-I32.1)**: Ctrl+clicking just to the right of a type argument inside a folded type — on the `,` after `E` or the closing `>` after `V` in e.g. `EnumMap!<E, V>` — now navigates to that type argument's declaration instead of doing nothing.

## [0.9.7] - 2026-08-02

### Fixed

- **Navigation on folded `var` locals works (NL-I31.2)**: Ctrl+clicking a folded annotated `var` placeholder now navigates like any explicit type — the type name and type arguments jump to their declarations, and the `?`/`!` marker jumps to the nullability annotation.

## [0.9.6] - 2026-08-02

### Fixed

- **Folded `var` locals place the marker correctly in Nullify style (NL-I31.1)**: For an annotated `var` local whose inferred type is a complex generic, Nullify-style folding now hugs the marker to the outer type name (`Map!<Set<String>, Pair<Integer, Double>>`) instead of appending it to the end of the whole type. Kotlin-style folding keeps its trailing marker.

## [0.9.5] - 2026-08-02

### Fixed

- **The inconsistent-nullability inspection no longer crashes while typing (NL-I30)**: Typing a field whose type carries a complex generic nullability annotation (e.g. `@NotNull Map<Set<String>, Pair<Integer, Double>>`) could make the inspection throw and stop flagging the rest of the file. Flagging now completes even for malformed mid-typing annotations.

## [0.9.4] - 2026-08-01

### Fixed

- **Completing an annotation replaces the typed prefix again (NL-I28.2)**: In any annotation FQCN field, pressing Enter on a suggestion now replaces the characters you already typed instead of appending the full name after them, and the typed prefix is highlighted in the suggestion list again.

## [0.9.3] - 2026-08-01

### Fixed

- **Project-default FQCN fields are usable again (NL-I29)**: The six element/class/package-level default fields render at a normal height and can be clicked, focused, and typed into; they are no longer collapsed to a thin bar.

## [0.9.2] - 2026-08-01

### Fixed

- **Uppercase-first typing now yields suggestions (NL-I28.1)**: Typing an uppercase first character (e.g. `N`) in any annotation FQCN field no longer results in an empty popup — suggestions appear exactly as they do for the lowercase form.

## [0.9.1] - 2026-08-01

### Fixed

- **Annotation picker suggestions show `simpleName (package)` (NL-I27)**: Completion popup candidates are now rendered as `Nullable (org.jetbrains.annotations)` instead of the full FQCN, so long library names are easier to scan and the annotation family is visible at a glance. The inserted value remains the FQCN.

## [0.9.0] - 2026-07-31

### Added

- **Smart annotation FQCN completion (NL-F9)**: Every annotation FQCN input in the settings now offers live completion popups — the custom `@Nullable`/`@NotNull` and scope-default registry tables, plus the element/class/package project-default fields. Suggestions are gathered from the annotations available in the project and filtered by the `@Target` element types each input accepts, so only annotations valid at that call site appear.
- **Built-in annotations are rejected in the registry (NL-F9)**: Adding an annotation that Nullify already supports out of the box to the annotation registry is now blocked with a clear message, and such annotations are hidden from the completion popup.
- **Graceful fallback without an open project (NL-F9)**: When no project is open, the FQCN inputs fall back to plain text entry with validation only, and the project-default sections show a placeholder.

## [0.8.2] - 2026-07-31

### Added

- **Analysis mode for the inconsistent-nullability inspection (NL-I26)**: Added an **"Aggressive analysis"** toggle under `Settings → Editor → Nullify → Code Inspections`. When enabled (default), the whole file is re-analyzed on every change so warnings and quick fixes are always up to date. When disabled (**Prudence mode**), only the edited region is re-analyzed for faster response on large files — the file-majority check may lag behind edits.

### Fixed

- **Flagging is now order-independent and symmetric (NL-I26)**: When several same-mark annotations from different namespaces sit on one element, exactly the inconsistent (non-majority / non-default) ones are flagged, each with the same quick fixes — regardless of the order they are written in. Previously both annotations could be flagged with different fix sets.
- **Handles three or more conflicting annotations (NL-I26)**: Multiple same-mark annotations on one element (e.g. `@org.jetbrains.NotNull @javax.Nonnull @jakarta.Nonnull`) are now each flagged and individually removable, instead of assuming a single minority annotation.
- **"Set as default" and "Replace with default" converge the element in one step (NL-I26)**: Applying either fix leaves the element with a single canonical annotation, so no follow-up fix is needed.

### Changed

- **Majority detection requires a clear majority (NL-I26)**: The file's canonical annotation is now chosen only when it clearly outnumbers all other candidates combined. Tied or near-tied usage is no longer flagged, reducing warnings that flicker while typing near a 50/50 boundary.

## [0.8.1] - 2026-07-30

### Changed

- **Scope-level defaults redesigned (NL-I25)**: Nullability default annotations are now configured independently for three scope levels — **Element**, **Class**, and **Package** — each with a single global `@Nullable`/`@NotNull` FQCN under `Settings → Editor → Nullify`. This replaces the previous class/package-name-to-FQCN override mapping, which was unintuitive and error-prone.

## [0.8.0] - 2026-07-30

### Added

- **Project-level default nullability annotation configuration (NL-F10)**: Nullify now supports storing a project-wide default `@Nullable` and `@NotNull` annotation FQCN, shared with the whole team through VCS. The `Inconsistent Nullability Annotation` inspection offers two smart quick fixes: **"Set as project default"** (adopts the file's majority annotation as the project's default) and **"Replace with project default"** (replaces non-conforming annotations with the project's preferred annotation). Defaults are configured under `Settings → Editor → Nullify`.
- **Extended annotation registry**: Added out-of-the-box support for JSpecify (`org.jspecify.annotations.Nullable/NonNull/NullMarked`), Spring Framework (`org.springframework.lang.Nullable/NonNull/NonNullApi`), Eclipse JDT (`org.eclipse.jdt.annotation.Nullable/NonNull`), AndroidX (`androidx.annotation.Nullable/NonNull`), Checker Framework Compat (`org.checkerframework.checker.nullness.compatqual.NullableDecl/NonNullDecl`), and FindBugs/SpotBugs (`edu.umd.cs.findbugs.annotations.Nullable/NonNull`).

### Fixed

- **Fold regions refresh on settings change (NL-I22)**: Changing folding behavior in settings now updates the fold regions in all open editors immediately — previously the new placeholder text only appeared after reopening the file or manually toggling a fold.
- **Inspection display name follows the IDE language (NL-I24)**: The inspection's display name now follows the IDE's display language instead of always showing English.

### Changed

- **Inspection renamed (NL-F3/NL-F11)**: `Duplicated Nullability Annotation` has been renamed to **`Inconsistent Nullability Annotation`** to reflect its broader scope — it covers per-element duplicates and file-level namespace mixing.

## [0.6.0] - 2026-07-29

### Added

- **New inspection: Duplicated Nullability Annotation (NL-F3/NL-F11)**: Detects inconsistent nullability annotation usage within a file — multiple same-mark annotations from different libraries on the same element, and file-level namespace mixing where different elements use annotations from different libraries for the same nullability mark. Quick fixes: remove the duplicate annotation, or replace it with the file's canonical annotation.

### Changed

- **Settings page restructured**: The settings page is now organized into "Folding Behavior" and "Annotation Registry" sections, with the annotation tables labelled by `@Nullable`/`@NotNull` icons.

## [0.5.0] - 2026-07-29

### Added

- **Configurable wildcard symbol (NL-I21)**: Choose the symbol used when folding unbounded wildcards — `?` or `*` — from the wildcard folding settings. The default is now `?`.

### Changed

- **Settings UI is now localized (NL-I21)**: The settings page follows the IDE's display language, with support for English, Simplified Chinese, Japanese, French, and German.

## [0.4.1] - 2026-07-29

### Changed

- **Improved editing responsiveness (NL-I18)**: The folding engine now reinitializes only when settings actually change, reducing overhead during editing and repaints.

## [0.4.0] - 2026-07-29

### Added

- **Kotlin-style nullity markers**: Added `kotlinStyleNullityMarkers` config option. When enabled, `?` and `!` markers are placed after generic type arguments (e.g., `List<String!>?`) matching Kotlin syntax. Closes NL-F6.

## [0.3.1] - 2026-07-28

### Fixed

- NL-I20: Scope-default nullability annotations (`@NotNullByDefault`, `@ParametersAreNonnullByDefault`) now propagate to type arguments, array components, and wildcard bounds. Previously, only the outermost type position inherited the scope default; nested positions were silently treated as unannotated.

## [0.3.0] - 2026-07-28

### Added

- NL-F8: Class-level and package-level nullability default annotations (e.g., `@NotNullByDefault`) are now fully supported. Elements within a scope annotated with a nullability default automatically fold according to that default, unless overridden by an explicit annotation. Custom scope-default annotations can also be registered in the settings UI.

## [0.2.2] - 2026-07-28

### Fixed

- NL-I19.2: Qualifier type-use annotations on intermediate segments of deeply qualified types (e.g., `A.@NotNull B.C`) are now correctly resolved and folded.

## [0.2.1] - 2026-07-27

### Fixed

- NL-I19: Qualified types with a type annotation between the qualifier and identifier (e.g., `A.@NotNull B`) no longer produce incorrect fold placeholders (`A.A.B!`). The fold range now correctly covers the full type element.

## [0.2.0] - 2026-07-27

### Added

- NL-F5: Settings UI page under `Settings → Editor → Nullify`. Users can now toggle nullity folding and wildcard folding independently, and register custom `@Nullable`/`@NotNull` annotation types through an editable table. Configuration changes take effect immediately without restarting the IDE.

## [0.1.6] - 2026-07-27

### Added

- NL-I17: Intersection types in cast expressions (e.g., `(Serializable & Consumer<? super String>)`) now fold correctly.

## [0.1.5] - 2026-07-26

### Fixed

- NL-I16.7: The first navigation action (Ctrl+Click / F12) in any newly opened editor now always returns a target.

## [0.1.4]

### Fixed

- NL-I16.6: Ctrl+Click navigation no longer misfires when the caret moves during a simultaneous mouse click.

## [0.1.3]

### Fixed

- NL-I16.5: Clicking on generic delimiters (`<`, `>`) adjacent to nullity suffixes (`!`, `?`) now produces the correct navigation target.

## [0.1.2]

### Fixed

- NL-I16.4: Generic type arguments inside folded types (e.g., `Foo` in `Map!<Foo?, Bar!>`) now navigate to the correct declaration instead of the outermost enclosing type.

## [0.1.1]

### Fixed

- NL-I16.2: Navigation threading fixed to eliminate IDE freezes and deadlocks when clicking or using keyboard shortcuts on folded types.

## [0.1.0]

### Added

- NL-F1: Navigation support for folded types. Ctrl+click on folded type placeholders now navigates to the type or annotation declaration. Each visual segment (type name, `?`/`!` suffix, annotation, generic delimiter) is resolved independently.
- NL-I16.1: Placeholder navigation now correctly targets each visual segment. Annotations navigate to their declaration using the file's import system for deterministic disambiguation.

## [0.0.1] - 2026-07-24

### Added

- Smart folding for `@Nullable Foo` → `Foo?` and `@NotNull Bar` → `Bar!` with precise annotation placement.
- Wildcard folding: `? extends Foo` → `out Foo`, `? super Bar` → `in Bar`.
- Array type normalization: `@NotNull String[]` → `Array<String!>`, `Object @Nullable ...` → `Vararg?<Object>`.
- Custom annotation support: configure your own `@Nullable`/`@NotNull` equivalents in settings.
- `var` local variable inference: `@Nullable var bar = ""` now folds to the concrete type (`String?`).
- Non-nullity annotations preserved in fold placeholders: `@NotNull @Value("key") TokenService` folds to `@Value("key") TokenService!`.
- Package-level default annotation support: respects `@ParametersAreNonnullByDefault`, `@ParametersAreNullableByDefault` and friends.
- Folding configuration: toggle nullity folding and wildcard folding independently in plugin settings.

### Fixed

- Leading non-nullity annotations (e.g., `@MyAnno @NotNull Foo`) are now included in the fold range and preserved in the placeholder text.
- Qualified types with type variables (e.g., `@NotNull Foo.Bar<E>`) now correctly produce fold regions.
- Multidimensional array annotations: `@NotNull Object @Nullable [] @Nullable []` now correctly folds to `Array?<Array?<Object!>>`.
- Array dimension vs component annotation resolution: `@NotNull Object @Nullable []` now correctly produces `Array?<Object!>`.
- Vararg fold range trailing space: `Object @Nullable ... arr` no longer swallows the space before the parameter name.
- Declaration-site annotations are now included in fold regions — `@NotNull String!` no longer occurs with `@NotNull` visible outside the fold.
- Cross-file placeholder cache pollution fixed: switching between files no longer causes missing placeholder text.
- Non-nullity-only annotations (e.g., `@Value("key") TokenService`) no longer incorrectly produce fold regions.

### Changed

- Arrays and varargs now fold using generic syntax instead of array suffix notation.
- Fold placeholders are now computed on-demand, fixing cross-file consistency issues.

### Removed

- Array suffix folding notation removed in favor of generic-style normalization.
