# Nullify

![Plugin Icon](https://raw.githubusercontent.com/KurvCygnus/Nullify/main/assets/pluginIcon.svg)

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![IntelliJ IDEA](https://img.shields.io/badge/IntelliJ%20IDEA-2025.3.4%2B-purple)

> Read your Java code the way it was meant to be read.
> Nullify folds noisy annotations and wildcards into clean `?`/`!`/`out`/`in` syntax — without changing a single line of your source.

---

## Table of Contents

- [See it in action](#see-it-in-action)
- [Why Nullify?](#why-nullify)
- [Features](#features)
- [What gets folded](#what-gets-folded)
- [Installation](#installation)
- [Compatibility](#compatibility)
- [Feedback & Roadmap](#feedback--roadmap)

---

## See it in action

![All annotated stuff gets folded automatically, once the project analysis is done](https://raw.githubusercontent.com/KurvCygnus/Nullify/main/assets/startup_fold.gif)

Type `@Nullable String`, and it folds to `String?` right before your eyes. Hover or Ctrl+click the folded text, and it still jumps to the declaration. It's just a view — your source never changes.

---

## Why Nullify?

Java's annotations are powerful, but they come with a lot of noise. A single field can pile on a wall of text:

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

Same code. Same behavior. Only the noise is gone.

**Folding is a view, not a rewrite** — the source file stays exactly as you wrote it, so your diffs, CI, and teammates' tools all see the same Java as always.

Why you'll love it:

- **Reads like Kotlin.** `?` and `!`, `out` and `in`, clean array syntax — the compact style you already know, applied to your Java.
- **One style for the whole type system.** Nullity markers, wildcards, arrays & varargs, `var` inference, qualified types, intersection casts — all fold into one consistent, familiar look.
- **Finds annotations wherever Java hides them.** On the type, on the declaration, on the class, on the whole package — no matter which of the four spots a nullability annotation lives in, Nullify resolves it correctly.
- **Nothing breaks.** Navigation, completion, and other plugins keep working on folded code. Folded placeholders even keep non-nullity annotations like `@Value("${app.name}")` and can still jump to what they point at.
- **Catches annotation chaos.** A built-in inspection flags duplicated and mixed-library nullability annotations, with one-click fixes.
- **Your editor, your rules.** Turn each kind of folding on or off, register your own annotations, and choose the style that fits your team.

---

## Features

### 1. Nullity at a glance — `Foo?` / `Bar!`

![Nullity marker folding](https://raw.githubusercontent.com/KurvCygnus/Nullify/main/assets/fold-nullity.png)

`@Nullable Foo` → `Foo?`, `@NotNull Bar` → `Bar!`. Nullify understands annotations wherever Java puts them — on the type, the declaration, the class, or the whole package — and gets every position right.

### 2. Variance that reads itself — `out` / `in`

![Wildcard variance folding](https://raw.githubusercontent.com/KurvCygnus/Nullify/main/assets/fold-wildcards.png)

`? extends Foo` → `out Foo`, `? super @Nullable Bar` → `in Bar?` — the same variance words Kotlin uses, so generic signatures finally read the way they *mean*.

### 3. Arrays & varargs, normalized — `Array?<String!>` / `Vararg?<Object?>`

![Array and vararg folding](https://raw.githubusercontent.com/KurvCygnus/Nullify/main/assets/fold-arrays.png)

Arrays and varargs fold into clean generic syntax — `Array?<String!>`, `Vararg?<Object?>` — with every dimension's annotation placed exactly where it belongs. Nothing is flattened, nothing is misattributed.

### 4. Navigation never breaks

![Folded placeholder navigation](https://raw.githubusercontent.com/KurvCygnus/Nullify/main/assets/navigation.gif)

Folding should never cost you navigation. Ctrl+click any part of a folded placeholder — the type, a type argument, the `?`/`!` marker, even a preserved annotation's value literal — and you land exactly where the IDE would have taken you before folding.

### 5. Catch annotation chaos

![Inconsistent nullability inspection](https://raw.githubusercontent.com/KurvCygnus/Nullify/main/assets/inspection.gif)

Nullify ships the **Inconsistent Nullability Annotation** inspection: it spots duplicated or mixed-library nullability annotations (`@javax.Nonnull` vs `@org.jetbrains.annotations.NotNull`, `@NotNullByDefault` vs `@ParametersAreNonnullByDefault`, …) and offers one-click quick fixes — remove the duplicate, or align it with the file's / project's standard annotation. An **Aggressive analysis** mode (on by default) keeps the whole file's warnings up to date as you type; switch to **Prudence mode** to re-analyze only the edited region when large files need snappier feedback.

### 6. Your rules, your defaults

![Nullify settings](https://raw.githubusercontent.com/KurvCygnus/Nullify/main/assets/settings.png)

Under **Settings → Editor → Nullify** you control everything:

- Toggle nullity and wildcard folding independently, and pick Kotlin-style marker placement.
- Register your own `@Nullable` / `@NotNull` annotations — Nullify understands them just like the built-ins.
- Configure class/package/project-level nullability defaults (`@NotNullByDefault`, `@ParametersAreNonnullByDefault`, …).
- Built-in support for the popular libraries: JetBrains, JSpecify, Spring, AndroidX, Eclipse JDT, Checker Framework, FindBugs/SpotBugs, and more.
- Choose the symbol for unbounded wildcards — `?` or `*`.
- FQCN inputs with code completion, and an interface that speaks your IDE's language (English, Simplified Chinese, Japanese, French, and German).
- Show or hide the nullability reason hint above collapsed folds — its look (including color) is themed through the editor color scheme.

### 7. Reasons that stay with you

![Nullity reason hints](https://raw.githubusercontent.com/KurvCygnus/Nullify/main/assets/reason-hint.png)

When Nullify collapses `@Nullable("some reason")` into `String?`, the reason doesn't vanish — it reappears as a hint right above the folded code: *"This is nullable because "some reason"."* It appears only while the fold is collapsed, resolves constant reasons too (`@Nullable(REASON)`), and follows your editor's colors.

Long reasons stay out of your way: a hint that exceeds the inline length collapses to a truncated one-liner — *"This is nullable because "returns null when no entry mat…"."* — and expands to the full multi-line text when you click the hint, click the fold arrow beside it, or press the expand/collapse shortcut. The threshold is **adaptive** by default, scaling with your editor's font size.

The hint is a first-class editor citizen: its **Reason hint** attribute under `Settings → Editor → Color Scheme → Nullify` themes foreground, background, and effects like any editor text, its font size can be nudged relative to the code font, and a leading prefix — none, `*`, `•`, `§`, your own symbol, or Nullify's gutter icon — sets it apart at a glance. Everything down to the whole feature is tunable under `Settings → Editor → Nullify → Folding Behavior`.

### 8. The compact view, automatically

As you could see from above, Nullify folds collapse by themselves the moment the project finishes its analysis — and keep folding live while you type (`final @NotNull var foo = ""` becomes `final String! foo = ""` as soon as the initializer is written). Folds you expanded manually stay expanded, and the whole behavior can be switched off under `Settings → Editor → Nullify → Folding Behavior`.

### 9. Comments become reasons

![Comment-to-reason migration](https://raw.githubusercontent.com/KurvCygnus/Nullify/main/assets/migrate-comment.gif)

Documenting *why* something can be null is good practice — retyping it into the annotation is not. When a `@Nullable`/`@NotNull` that supports a reason sits next to a comment (on the line above, trailing the annotation, or closing the declaration line), `Alt+Enter` offers **Migrate comment to annotation reason**: the comment's text becomes the annotation's reason — `@Nullable("Returns null when no entry matches")` — and the comment is removed. The intention never highlights anything by itself, and Javadoc or reason-less annotations are left untouched.

### 10. See every trick in one place

The repository ships four runnable demo files — `NullifyDemo` (the tour-de-force with its own `main`) plus `VarInference`, `ArrayVararg`, and `WildcardsGenerics` — each showcasing a slice of the folding: nullity markers, preserved non-nullity annotations, annotated `var` inference, arrays & varargs, wildcards, qualified types, and intersection casts. Open them in a dev instance of the plugin to watch every capability at once.

---

## What gets folded

A quick tour of the folding you'll see every day — including the less obvious spots:


| Java you write                                | What Nullify shows                     |
| --------------------------------------------- | -------------------------------------- |
| `@Nullable Foo`                               | `Foo?`                                 |
| `@NotNull Bar`                                | `Bar!`                                 |
| `@Nullable Foo<@NotNull Bar>`                 | `Foo?<Bar!>`                           |
| `? extends Foo`                               | `out Foo`                              |
| `? super Bar`                                 | `in Bar`                               |
| `@NotNull String[]`                           | `Array<String!>`                       |
| `Object @Nullable ...`                        | `Vararg?<Object>`                      |
| `@Nullable Foo @NotNull []`                   | `Array!<Foo?>`                         |
| `? extends @Nullable Foo`                     | `out Foo?`                             |
| `@NotNull String @Nullable [] @NotNull []`    | `Array?<Array!<String!>>`              |
| `@Nullable var name = ...`                    | `String?` (inferred type)              |
| `@ConfigValue("${app.name}") @NotNull String` | `@ConfigValue("${app.name}") String!`  |
| `(Serializable & @NotNull Consumer<...>)`     | `Serializable & Consumer!<in String!>` |
| `@Nullable final var foo = ...`               | `final String? foo` (modifier kept)    |

Nullify can even take such a complex type:

```java
@NotNull List<
    ? extends @Nullable Supplier<
        Map<
            ? extends @NotNull CharSequence,
            @Nullable Consumer<? super CharSequence>
            >
        >
    > @NotNull [] list;

// Folds to `Array!<List!<out Supplier?<Map<out CharSequence!, Consumer?<in CharSequence>>>>>`.
```

---

## Installation

**From the JetBrains Marketplace:** `Settings → Plugins → Marketplace → search "Nullify" → Install`.

**From disk:** `Settings → Plugins → ⚙️ → Install Plugin from Disk…` and select the downloaded `.zip`.

After installation, restart your IDE and open any Java file. Folding is on by default — just start reading.

---

## Compatibility

- **IDEs:** IntelliJ IDEA 2025.3.4+ (Ultimate & Community) and compatible JetBrains IDEs.
- **Language:** Java.
- **License:** [Proprietary](https://github.com/KurvCygnus/Nullify/blob/main/LICENSE.txt).

---

## Feedback & Roadmap

Found a bug? Want a feature? Nullify tracks everything transparently:

- **Issues & Feature Proposals** — [Tracking Document Site](https://kurvcygnus.github.io/Nullify/) | [Report Site](https://github.com/KurvCygnus/Nullify/issues)
- [**Changelog**](https://kurvcygnus.github.io/Nullify/changelog.html)
- **Rate & Review** — your review on the Marketplace makes a real difference
- **Contact** — [Kurv Cygnus](https://github.com/KurvCygnus)

---

*Made with ☕ and a healthy impatience for annotation noise.*
