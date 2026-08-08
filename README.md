# Nullify

> Nullify is a plugin that makes your Java codebase as readable as its Kotlin sibling, without changing a single byte of your source.

![Nullify: all annotated stiff get folded automatically, once the project analysis is done](docs/assets/uwu.gif)

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![IntelliJ IDEA](https://img.shields.io/badge/IntelliJ%20IDEA-2025.3.4%2B-purple)

---

## See it in action

<!--
  GIF: docs/assets/hero-fold.gif
  Record: type `@Nullable Foo` in an editor and watch it fold to `Foo?` in real
  time; then hover / Ctrl+click the placeholder to show it still navigates to the
  declaration. Dark theme recommended for contrast.
-->
![Nullify folding `@Nullable Foo` into `Foo?`](docs/assets/hero-fold.gif)

No more wading through walls of `@NotNull` and `@Nullable`. Nullify collapses the noise into the compact, universally-understood `!` and `?` — the exact syntax Kotlin developers already know.

---

## Why Nullify?

Java's annotation ecosystem is powerful but *loud*. A single field can carry:

```java
@NotNull
@Unmodifiable
private final Map<@NotNull String, @Nullable List<@NotNull Token>> cache;
```

With Nullify, that reads as:

```java
@Unmodifiable
private final Map!<String!, List?<Token!>> cache;
```

Your code **behaves** exactly the same — only the ceremony is gone. Folding is a view, not a transformation: the underlying source never changes, and your team's tools, diffs, and CI are untouched.

### What gets folded

| Java you write                | What Nullify shows |
|-------------------------------|--------------------|
| `@Nullable Foo`               | `Foo?`             |
| `@NotNull Bar`                | `Bar!`             |
| `@Nullable Foo<@NotNull Bar>` | `Foo?<Bar!>`       |
| `? extends Foo`               | `out Foo`          |
| `? super Bar`                 | `in Bar`           |
| `@NotNull String[]`           | `Array<String!>`   |
| `Object @Nullable ...`        | `Vararg?<Object>`  |
| `@Nullable Foo @NotNull []`   | `Array!<Foo?>`     |
| `? extends @Nullable Foo`     | `out Foo?`         |

*Intersection type is also supported.*

---

## Features

### 1. Nullity folding — `?` and `!`

<!--
  GIF: docs/assets/fold-nullity.gif
  Record: fold `@Nullable`/`@NotNull` in a mix of fields, parameters, and return
  types; unfold one placeholder to prove the original annotation is still there.
-->
![Nullity marker folding](docs/assets/fold-nullity.gif)

`@Nullable Foo` → `Foo?`, `@NotNull Bar` → `Bar!`. Nullify resolves annotations wherever Java puts them — type-use, declaration-site, class defaults, package defaults — and decides each position with a precise 4-level fallback (type-use → declaration → class → package).

### 2. Wildcard folding — `out` and `in`

<!--
  GIF: docs/assets/fold-wildcards.gif
  Record: a generic signature like `List<? extends Foo>` folding to
  `List<out Foo>` and `Consumer<? super Bar>` to `Consumer<in Bar>`.
-->
![Wildcard variance folding](docs/assets/fold-wildcards.gif)

`? extends Foo` → `out Foo`, `? super Bar` → `in Bar` — matching Kotlin's `out`/`in` variance projection so familiar generic signatures finally read the way they *mean*.

### 3. Arrays & varargs — normalized, not mangled

<!--
  GIF: docs/assets/fold-arrays.gif
  Record: `@NotNull String[]` folding to `Array<String!>` and a vararg parameter
  folding to `Vararg?<...>`, including multidimensional annotation placement.
-->
![Array and vararg folding](docs/assets/fold-arrays.gif)

Arrays and varargs fold to clean generic syntax: `Array<String!>`, `Vararg?<Object>`. Per-dimension annotations are placed precisely per the JLS ordering — nothing is flattened or misattributed.

### 4. Navigation still works — everywhere

<!--
  GIF: docs/assets/navigation.gif
  Record: Ctrl+click (or Ctrl+B) on `Foo?` jumps to the Foo class, on the `?`
  marker jumps to the annotation declaration, and on a preserved annotation
  value literal (e.g. Spring's @Value("${app.name}")) jumps to the config key.
-->
![Folded placeholder navigation](docs/assets/navigation.gif)

Folding should never cost you navigation. Ctrl+click any part of a folded placeholder — the type, a type argument, the `?`/`!` marker, even a preserved annotation's value literal — and you land on exactly what the IDE would have resolved before folding. Even `@Value("${app.name}")` literals inside folds delegate to the platform's own framework-aware navigation.

### 5. Smarter inspections

<!--
  GIF: docs/assets/inspection.gif
  Record: two conflicting nullability annotations on one element being flagged,
  with the quick fix replacing the non-conforming one with the file/project
  default.
-->
![Inconsistent nullability inspection](docs/assets/inspection.gif)

Nullify ships the **Inconsistent Nullability Annotation** inspection: it detects duplicated or mixed-namespace nullability annotations (`@javax.Nonnull` vs `@org.jetbrains.annotations.NotNull`, `@NotNullByDefault` vs `@ParametersAreNonnullByDefault`, …) and offers one-click quick fixes — remove the duplicate, or align with the file's / project's canonical annotation.

### 6. Fully configurable

<!--
  GIF: docs/assets/settings.gif
  Record: opening Settings → Editor → Nullify and toggling options / registering
  a custom annotation FQCN.
-->
![Nullify settings](docs/assets/settings.gif)

Under **Settings → Editor → Nullify** you control everything:

- Toggle nullity and wildcard folding independently, and pick Kotlin-style marker placement.
- Register your own `@Nullable` / `@NotNull` annotation FQCNs — Nullify understands them just like the built-ins.
- Configure class/package/project-level nullability defaults (`@NotNullByDefault`, `@ParametersAreNonnullByDefault`, …).
- Built-in support for the popular libraries: JetBrains, JSpecify, Spring, AndroidX, Eclipse JDT, Checker Framework, FindBugs/SpotBugs, and more.
- Completion-enabled FQCN inputs and an interface that follows your IDE's language.

---

## Installation

**From the JetBrains Marketplace:** `Settings → Plugins → Marketplace → search "Nullify" → Install`.

**From disk:** `Settings → Plugins → ⚙️ → Install Plugin from Disk…` and select the downloaded `.zip`.

After installation, restart your IDE and open any Java file. Folding is on by default — just start reading.

---

## Compatibility

- **IDEs:** IntelliJ IDEA 2025.3.4+ (Ultimate & Community) and compatible JetBrains IDEs.
- **Language:** Java.
- **License:** [Proprietary](LICENSE.txt).

---

## Feedback & Roadmap

Found a bug? Want a feature? Nullify tracks everything transparently:

- **Issues & Feature Proposals** — [Public Tracking Repository](<PUBLIC_TRACKING_URL>)
- **Changelog** — [CHANGELOG.md](CHANGELOG.md)
- **Rate & Review** — your review on the Marketplace makes a real difference
- **Source & Contact** — [GitHub](<GITHUB_URL>) · [Kurv Cygnus](https://github.com/KurvCygnus)

---

<!--
  NOTE: this README is also mirrored to the public tracking repository
  (workflow/sync-documents.ps1). The relative GIF paths below only resolve in
  this repository; on the tracking repository, swap them for absolute URLs
  (e.g. https://<host>/raw/.../docs/assets/hero-fold.gif) when adding real media.
-->
*Made with ☕ and a healthy impatience for annotation noise.*
