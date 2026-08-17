# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-08-06

### Added

- **Nullability reason hints above collapsed folds (NL-F16)**: When Nullify collapses `@Nullable`/`@NotNull` into `?`/`!` markers, the annotation's `value` reason (e.g. `@Nullable("returns null when no entry matches")`) is now shown as a hint right above the collapsed fold — reading `This is nullable because "returns null when no entry matches".` The hint targets the top-level type's nullability (the `List` in `List<Map<String, Pair<Integer, Char>>>`), appears only while the fold is collapsed, and disappears when it expands. No `value`, no hint. Can be turned off under `Settings → Editor → Nullify → Folding Behavior`.
- **Runnable folding demos (NL-F15)**: A set of independent Java demo files — `NullifyDemo` (the core entry with `main`) plus `VarInference`, `ArrayVararg` and `WildcardsGenerics` under `kurvcygnus.nullify.demo` — showcase every folding capability: nullity `?`/`!` markers, preserved non-nullity annotations, annotated `var` inference, arrays/varargs, wildcards, qualified types and intersection casts. Each file has its own runnable `main`.
- **Nullify folds collapse automatically after project analysis completes (NL-F14)**: Once the project finishes its analysis (indexing), the Nullify fold regions in the editor tab you are currently using are collapsed automatically, so the compact `String?`/`Foo!` syntax is shown without manual folding. Background tabs and non-Nullify folds (method bodies, imports) are left untouched. Can be turned off under `Settings → Editor → Nullify → Folding Behavior`.
- **Fold navigation jumps to the exact declaration (NL-F12)**: Clicking any part of a folded placeholder now navigates to the declaration the IDE would have shown before folding. Type names jump to their classes, nullability markers to their annotations, and wildcard-only folds such as `List<out Foo>` navigate to the bound type.
- **Annotation value literals navigate to whatever the IDE resolves (NL-F13)**: Clicking a literal inside a preserved annotation in a folded placeholder — e.g. Spring's `@Value("${app.name}")` — now jumps to the same target the IDE would resolve in unfolded code (config key, bean, profile, …), including config keys defined in several files (e.g. Quarkus Standard/Dev/Test profiles), where the IDE offers a target chooser — thanks to the IDE's own navigation machinery rather than framework-specific support.
- **Long nullability reasons collapse and expand (NL-F20)**: When a reason exceeds the max inline length, the hint now starts collapsed to a truncated one-liner — `This is nullable because "returns null when no entry mat…".` — and expands to the complete multi-line text on a click over the hint, via the IDE's fold arrow, or with a keyboard shortcut (the expand/collapse action is discoverable in Find Action and assignable in the Keymap). The length threshold defaults to **Adaptive**: it treats 80 characters at a 12px editor font as the base and scales with your editor's font size, so ordinary reasons stay readable regardless of font. Toggle the default-collapse behavior and the threshold (Adaptive or a fixed count) under `Settings → Editor → Nullify → Folding Behavior`.
- **Reason hint colors live in the Editor Color Scheme (NL-F20)**: The hint is now a first-class editor color — a "Reason hint" attribute under `Settings → Editor → Color Scheme → Nullify` with theme-able foreground/background/effects that follow light/dark scheme switches automatically. The old single-hex color setting is gone.
- **Configurable reason hint prefix (NL-F20)**: The hint can carry a leading prefix chosen under `Settings → Editor → Nullify → Folding Behavior` — none, `*`, `•`, `§`, your own symbol, or Nullify's gutter icon (`Nullable.svg` for nullable, `NotNull.svg` for not-null) — with exactly one space separating it from the sentence.
- **Reason hint font size is adjustable (NL-F20)**: The hint renders one pixel smaller than code by default; a relative font-size offset under `Settings → Editor → Nullify → Folding Behavior` lets you make it smaller or larger than the editor font.
- **Searchable HTML tracking site (NL-F21)**: The public tracking repository now serves a generated HTML site instead of raw Markdown — every issue (NL-I) and feature proposal (NL-F) has its own page, and a search box on the landing page finds any document by number (`16`, `I16`, `NL-I16`, `F9`) or by title. The published site lives under `tracking/`, and the README's demo gifs are served from `assets/`.
- **Migrate adjacent comments into nullability annotation reasons (NL-F21)**: When a nullability annotation that supports a reason field (e.g. JetBrains `@Nullable`/`@NotNull`) sits directly next to a comment — on the line above it or trailing on its right — and carries no reason of its own, `Alt+Enter` on the annotation offers **Migrate comment to annotation reason**: the comment's text moves into the annotation as its reason (e.g. `@Nullable("Returns null when no entry matches")`) and the comment is removed. The feature never highlights anything by itself — Javadoc comments and annotations without a reason field are left untouched.
- **Append nullability Javadoc (NL-F22)**: When a nullability-annotated element's Javadoc does not document it yet — a method parameter without its `@param` tag, a return type without `@return`, a thrown type without `@throws`, a type parameter without its `@param <T>` tag, or a field/class without any Javadoc at all — `Alt+Enter` offers **Append nullability Javadoc**. It appends the kind-adaptive sentence (`@param key a String which is nullable`, `@return an Integer which is not null`, `@throws IOException …`, or a prose sentence for fields and classes), creating a `/** … */` comment when the element has none. The reason clause ` because ` is inserted **selected** — with the closing period left in place — and the caret right after `because `: type a reason to replace it in one stroke, or press Backspace to drop the clause and keep a complete sentence (`@param key a String which is nullable.`). The English article (`a`/`an`) follows the type's sound (`an HTTP server`, `a URL`). The sentence is English by default; under `Settings → Editor → Nullify` a project-level option switches it to *Follow IDE language* or one of *Deutsch*, *Français*, *日本語* or *简体中文*.

### Fixed

- **Auto-collapse now reliably triggers in real IDE usage (NL-F14)**: The post-analysis auto-collapse previously raced the platform's asynchronous fold computation and could be silently overwritten by it, leaving Nullify folds expanded. The collapse now happens the moment each Nullify fold first appears, so it can never be lost to the very pass that created the region — while manual expands are still respected.
- **Annotation arguments navigate to their element methods (NL-I35)**: Clicking an argument inside a preserved annotation — e.g. `name` or `value` in `@MyAnno(name = "foo", value = "bar") String!` — now jumps to the annotation's element method (`MyAnno#name()` / `MyAnno#value()`) instead of the field's type.
- **Clicking structural parts keeps the fold collapsed**: Clicking synthetic parts of a folded placeholder (whitespace, delimiters, `Array`/`Vararg` markers) keeps the fold collapsed, and IntelliJ shows its native "cannot find declaration to go to" guidance instead of navigating to a wrong declaration.
- **Modifier keywords between a declaration annotation and the type are no longer swallowed (NL-I36)**: `@Nullable final var foo = ...` now folds to `final String? foo` instead of `String? foo`, and similarly for any modifier keyword (e.g. `@Nullable static String`) written between the annotation and the type.
- **Typing a nullability annotation no longer triggers a `Slow operations are prohibited on EDT` error (NL-I38)**: The reason hint shown above a collapsed fold is now read without re-running the folding engine, so writing any `@Nullable`/`@NotNull` — even one without a reason — is handled safely on the UI thread.
- **Reason hints resolve constant reasons**: A reason given as a compile-time constant — e.g. `@Nullable(REASON)` where `REASON` is a `static final String` — is now shown in the hint, not just a bare string literal.
- **Reason hints align with the folded declaration (NL-I39)**: The hint's left edge now lines up with the first visible character of the folded line below it (following horizontal scroll), so it reads as an annotation attached to that declaration instead of hugging the editor's left edge.
- **CJK text renders correctly in reason hints (NL-I40)**: Chinese (and other non-Latin) reason strings now show real glyphs instead of `□□□` placeholder boxes, using the editor's own font-fallback chain.
- **Reason hint color is configurable (NL-I41)**: The hint text uses the editor's normal foreground by default and can be given a custom color under `Settings → Editor → Nullify → Folding Behavior` — no longer forced into an overly dark muted gray.
- **Qualifier parts of folded qualified types navigate again (NL-I16.8)**: In a folded qualified type such as `Map.Entry`, Ctrl+clicking the qualifier (`Map`) now jumps to the qualifier class (`java.util.Map`). The segment-driven navigation rewrite had left the qualifier without a navigation target, while the identifier (`Entry`) kept navigating correctly.
- **Reason hints honor bold/italic, background, and effects from the color scheme (NL-I42.1)**: The "Reason hint" attribute under `Settings → Editor → Color Scheme → Nullify` previously applied only its foreground in the editor; now strikethrough, underline/wave effects, background, and bold/italic all render exactly as the color page previews them. The hint defaults to italic.
- **Long reasons no longer overflow the screen (NL-I42.2)**: Expanded hints now wrap within the editor's visible width instead of running off the right edge, and the collapsed one-liner always fits. The default max inline length is raised to 80 and scaled to your editor's font size, so ordinary reasons stay readable instead of collapsing early.
- **Long hints show the IDE fold arrow in the gutter (NL-I42.3)**: A long, multi-line reason hint now has the standard fold arrow beside it; clicking it collapses/expands the hint just like the built-in fold arrows.
- **Reason hints no longer trigger `Slow operations are prohibited on EDT` errors (NL-I44)**: The reason extraction behind a collapsed fold's hint now runs on a background thread, so writing or folding nullability annotations no longer performs index resolution on the UI thread.
- **Reason hints now appear right after migrating a comment into an annotation reason (NL-I43)**: Applying **Migrate comment to annotation reason** to a collapsed declaration no longer requires a manual expand/re-collapse round-trip — the hint appears as soon as the IDE finishes recomputing the fold, and expanding the fold manually is never undone by the auto-collapse.
- **Trailing comments on the declaration line migrate too (NL-I45)**: **Migrate comment to annotation reason** now also fires when the comment closes the whole declaration line — e.g. `final @NotNull var foo = "";// Assigned with a literal value.` — instead of only comments directly next to the annotation or on the line above. The intention works from the annotation and from the trailing comment itself.

### Changed

- **The auto-collapse setting is renamed and clarified**: The checkbox under `Settings → Editor → Nullify → Folding Behavior` previously read "Auto-collapse Nullify folds in the current editor after project analysis completes"; it is now simply **"Auto-collapse"**, with a description making clear that Nullify folds are collapsed as soon as they are created — after the project finishes its analysis and live while you type (e.g. `final @NotNull var foo = ""` folds to `final String! foo = ""` as soon as the initializer is written).
- **The reason hint color setting moved to the Editor Color Scheme**: The custom color checkbox under `Settings → Editor → Nullify → Folding Behavior` is replaced by a "Reason hint" attribute under `Settings → Editor → Color Scheme → Nullify`, which themes the hint like any editor text and follows scheme switches automatically (NL-F20).
- **Reason-hint pickers are now single controls (NL-F20)**: The reason-hint prefix and the max-inline-length settings each used to be a combo box plus a separate "custom value" field that only became enabled when `Custom...` was selected. Each pair is now one component: choosing `Custom...` turns the box itself into an editable field, so the value is typed in place.
- **Tracking site redesign**: modern dashboard with a public-facing intro, live search and filters, status icons, natural numeric ordering, dark/light themes, and fixed cross-document links and anchors.
- **The reason-hint prefix now defaults to Nullify's gutter icon**: Fresh installs draw the `Nullable.svg`/`NotNull.svg` gutter icon before the reason-hint sentence by default instead of no prefix. Existing installs keep their saved choice.
- **The Marketplace description stays in sync with the README**: The plugin's `<description>`, shown on JetBrains Marketplace and in the IDE's Plugins dialog, is now generated from `README.md` at build time — the store listing always reflects the latest docs instead of a hand-maintained paragraph.
- **The plugin icon renders on the public README and tracking site**: The tracking-site sync now publishes `pluginIcon.svg` into the public repository's `assets/`, and the README's icon link points there — previously the icon link referenced a repo-local path that did not exist in the published copy.
- **The settings page is redesigned into a welcome panel with section links**: Folding Behavior, Edit Behavior, Annotation Registry, Scope Defaults and Code Inspections now live on separate sub-pages reachable from the Nullify welcome panel, and the section titles follow the IDE's display language.
- **The "Append nullability Javadoc" sentence language offers fixed modes**: The project-level language option under `Settings → Editor → Nullify` now lists fixed choices — *Always English* (default), *Follow IDE language*, *Deutsch*, *Français*, *日本語* and *简体中文* — replacing the free-form custom language tag.

## [0.9.10] - 2026-08-03

### Added

- **Smart annotation FQCN completion (NL-F9)**: Every annotation FQCN input in the settings now offers live completion popups — the custom `@Nullable`/`@NotNull` and scope-default registry tables, plus the element/class/package project-default fields. Suggestions are gathered from the annotations available in the project and filtered by the `@Target` element types each input accepts, so only annotations valid at that call site appear.
- **Built-in annotations are rejected in the registry (NL-F9)**: Adding an annotation that Nullify already supports out of the box to the annotation registry is now blocked with a clear message, and such annotations are hidden from the completion popup.
- **Graceful fallback without an open project (NL-F9)**: When no project is open, the FQCN inputs fall back to plain text entry with validation only, and the project-default sections show a placeholder.

### Fixed

- **Annotation picker icons follow your IDE's icon theme (NL-I33)**: The annotation completion popup now renders each candidate with the icon the IDE resolves for that annotation class, so icon plugins that restyle annotation glyphs are honored everywhere instead of only in the project/structure views. The stock annotation icon is kept as the fallback when an annotation cannot be resolved.
- **Ctrl+clicking a folded placeholder with no target no longer unfolds the fold (NL-I32.2)**: When a folded placeholder position has nothing to navigate to (whitespace, synthetic `Array`/`Vararg` tokens), Ctrl+click (or Ctrl+B/F12) keeps the fold collapsed instead of silently expanding it, and IntelliJ shows its native "cannot find declaration to go to" guidance when nothing can be resolved.
- **Type-argument boundary navigation on folded types (NL-I32.1)**: Ctrl+clicking just to the right of a type argument inside a folded type — on the `,` after `E` or the closing `>` after `V` in e.g. `EnumMap!<E, V>` — now navigates to that type argument's declaration instead of doing nothing.
- **Navigation on folded `var` locals works (NL-I31.2)**: Ctrl+clicking a folded annotated `var` placeholder now navigates like any explicit type — the type name and type arguments jump to their declarations, and the `?`/`!` marker jumps to the nullability annotation.
- **Folded `var` locals place the marker correctly in Nullify style (NL-I31.1)**: For an annotated `var` local whose inferred type is a complex generic, Nullify-style folding now hugs the marker to the outer type name (`Map!<Set<String>, Pair<Integer, Double>>`) instead of appending it to the end of the whole type. Kotlin-style folding keeps its trailing marker.
- **The inconsistent-nullability inspection no longer crashes while typing (NL-I30)**: Typing a field whose type carries a complex generic nullability annotation (e.g. `@NotNull Map<Set<String>, Pair<Integer, Double>>`) could make the inspection throw and stop flagging the rest of the file. Flagging now completes even for malformed mid-typing annotations.
- **Completing an annotation replaces the typed prefix again (NL-I28.2)**: In any annotation FQCN field, pressing Enter on a suggestion now replaces the characters you already typed instead of appending the full name after them, and the typed prefix is highlighted in the suggestion list again.
- **Project-default FQCN fields are usable again (NL-I29)**: The six element/class/package-level default fields render at a normal height and can be clicked, focused, and typed into; they are no longer collapsed to a thin bar.
- **Uppercase-first typing now yields suggestions (NL-I28.1)**: Typing an uppercase first character (e.g. `N`) in any annotation FQCN field no longer results in an empty popup — suggestions appear exactly as they do for the lowercase form.
- **Annotation picker suggestions show `simpleName (package)` (NL-I27)**: Completion popup candidates are now rendered as `Nullable (org.jetbrains.annotations)` instead of the full FQCN, so long library names are easier to scan and the annotation family is visible at a glance. The inserted value remains the FQCN.

## [0.8.2] - 2026-07-31

### Added

- **Analysis mode for the inconsistent-nullability inspection (NL-I26)**: Added an **"Aggressive analysis"** toggle under `Settings → Editor → Nullify → Code Inspections`. When enabled (default), the whole file is re-analyzed on every change so warnings and quick fixes are always up to date. When disabled (**Prudence mode**), only the edited region is re-analyzed for faster response on large files — the file-majority check may lag behind edits.
- **Project-level default nullability annotation configuration (NL-F10)**: Nullify now supports storing a project-wide default `@Nullable` and `@NotNull` annotation FQCN, shared with the whole team through VCS. The `Inconsistent Nullability Annotation` inspection offers two smart quick fixes: **"Set as project default"** (adopts the file's majority annotation as the project's default) and **"Replace with project default"** (replaces non-conforming annotations with the project's preferred annotation). Defaults are configured under `Settings → Editor → Nullify`.
- **Extended annotation registry**: Added out-of-the-box support for JSpecify (`org.jspecify.annotations.Nullable/NonNull/NullMarked`), Spring Framework (`org.springframework.lang.Nullable/NonNull/NonNullApi`), Eclipse JDT (`org.eclipse.jdt.annotation.Nullable/NonNull`), AndroidX (`androidx.annotation.Nullable/NonNull`), Checker Framework Compat (`org.checkerframework.checker.nullness.compatqual.NullableDecl/NonNullDecl`), and FindBugs/SpotBugs (`edu.umd.cs.findbugs.annotations.Nullable/NonNull`).

### Fixed

- **Flagging is now order-independent and symmetric (NL-I26)**: When several same-mark annotations from different namespaces sit on one element, exactly the inconsistent (non-majority / non-default) ones are flagged, each with the same quick fixes — regardless of the order they are written in. Previously both annotations could be flagged with different fix sets.
- **Handles three or more conflicting annotations (NL-I26)**: Multiple same-mark annotations on one element (e.g. `@org.jetbrains.NotNull @javax.Nonnull @jakarta.Nonnull`) are now each flagged and individually removable, instead of assuming a single minority annotation.
- **"Set as default" and "Replace with default" converge the element in one step (NL-I26)**: Applying either fix leaves the element with a single canonical annotation, so no follow-up fix is needed.
- **Fold regions refresh on settings change (NL-I22)**: Changing folding behavior in settings now updates the fold regions in all open editors immediately — previously the new placeholder text only appeared after reopening the file or manually toggling a fold.
- **Inspection display name follows the IDE language (NL-I24)**: The inspection's display name now follows the IDE's display language instead of always showing English.

### Changed

- **Majority detection requires a clear majority (NL-I26)**: The file's canonical annotation is now chosen only when it clearly outnumbers all other candidates combined. Tied or near-tied usage is no longer flagged, reducing warnings that flicker while typing near a 50/50 boundary.
- **Scope-level defaults redesigned (NL-I25)**: Nullability default annotations are now configured independently for three scope levels — **Element**, **Class**, and **Package** — each with a single global `@Nullable`/`@NotNull` FQCN under `Settings → Editor → Nullify`. This replaces the previous class/package-name-to-FQCN override mapping, which was unintuitive and error-prone.
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

### Added

- **Kotlin-style nullity markers**: Added `kotlinStyleNullityMarkers` config option. When enabled, `?` and `!` markers are placed after generic type arguments (e.g., `List<String!>?`) matching Kotlin syntax. Closes NL-F6.

### Changed

- **Improved editing responsiveness (NL-I18)**: The folding engine now reinitializes only when settings actually change, reducing overhead during editing and repaints.

## [0.3.1] - 2026-07-28

### Added

- NL-F8: Class-level and package-level nullability default annotations (e.g., `@NotNullByDefault`) are now fully supported. Elements within a scope annotated with a nullability default automatically fold according to that default, unless overridden by an explicit annotation. Custom scope-default annotations can also be registered in the settings UI.

### Fixed

- NL-I20: Scope-default nullability annotations (`@NotNullByDefault`, `@ParametersAreNonnullByDefault`) now propagate to type arguments, array components, and wildcard bounds. Previously, only the outermost type position inherited the scope default; nested positions were silently treated as unannotated.

## [0.2.2] - 2026-07-28

### Added

- NL-F5: Settings UI page under `Settings → Editor → Nullify`. Users can now toggle nullity folding and wildcard folding independently, and register custom `@Nullable`/`@NotNull` annotation types through an editable table. Configuration changes take effect immediately without restarting the IDE.

### Fixed

- NL-I19.2: Qualifier type-use annotations on intermediate segments of deeply qualified types (e.g., `A.@NotNull B.C`) are now correctly resolved and folded.
- NL-I19: Qualified types with a type annotation between the qualifier and identifier (e.g., `A.@NotNull B`) no longer produce incorrect fold placeholders (`A.A.B!`). The fold range now correctly covers the full type element.

## [0.1.6] - 2026-07-27

### Added

- NL-I17: Intersection types in cast expressions (e.g., `(Serializable & Consumer<? super String>)`) now fold correctly.
- NL-F1: Navigation support for folded types. Ctrl+click on folded type placeholders now navigates to the type or annotation declaration. Each visual segment (type name, `?`/`!` suffix, annotation, generic delimiter) is resolved independently.
- NL-I16.1: Placeholder navigation now correctly targets each visual segment. Annotations navigate to their declaration using the file's import system for deterministic disambiguation.

### Fixed

- NL-I16.7: The first navigation action (Ctrl+Click / F12) in any newly opened editor now always returns a target.
- NL-I16.6: Ctrl+Click navigation no longer misfires when the caret moves during a simultaneous mouse click.
- NL-I16.5: Clicking on generic delimiters (`<`, `>`) adjacent to nullity suffixes (`!`, `?`) now produces the correct navigation target.
- NL-I16.4: Generic type arguments inside folded types (e.g., `Foo` in `Map!<Foo?, Bar!>`) now navigate to the correct declaration instead of the outermost enclosing type.
- NL-I16.2: Navigation threading fixed to eliminate IDE freezes and deadlocks when clicking or using keyboard shortcuts on folded types.

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
