# NL-I16: Navigation Issues

Navigation on folded placeholders fell short across several aspects of the fold-navigation feature. This parent issue tracks a family of navigation problems — each sub-issue below covers one concrete problem, from annotation resolution and click-zone accuracy to caret/mouse interaction.


---

## NL-I16.1: Resolution Limitation — Annotations Don't Navigate to Declarations, Click Zones Not Refined

* Resolved(`0.1.0`)


### Description

The initial navigation implementation had three limitations: annotations navigated to their literal source position instead of their declaration, click-zone detection was too coarse for complex generic types, and preserved non-nullity annotations were completely ignored for navigation.

### Solution Result

Every visible element in a folded placeholder — type name, `?`/`!` marker, or preserved annotation — now navigates directly to its corresponding declaration.

---

## NL-I16.2: Navigation All-Click-Gives-Same-Target Regression

* Resolved(`0.1.1`)


### Description

After most of NL-I16.1 was fixed, a regression appeared: clicking at **any** position on a folded placeholder now navigates to the definition of the outer type only — `!`, `?`, type arguments, everything resolves to the same target.

### Root Cause

Two independent failures: the click-to-token offset mapping was fundamentally wrong (so the first token was always selected), and the tests never verified token-level click resolution.

### Solution Result

Clicking each part of a folded placeholder now resolves that part's own navigation target, verified by tests on real collapsed fold regions.

---

## NL-I16.3: Keyboard-Only Navigation (F12) Lacks Precise Token Targeting for IDEAVim Users

* Ditched(IdeaVim always expands folded text on caret movement — no navigation issue exists)


### Description

Keyboard-only caret movement within a collapsed fold cannot determine which character of the placeholder the cursor is "on", because the underlying document offset is always the fold start. However, this turned out to be a non-issue for IdeaVim users and was ditched.

---

## NL-I16.4: Generic Type Arguments Cannot Be Navigated Independently

* Resolved(`0.1.2`)


### Description

When clicking on a type argument inside a generic fold placeholder (e.g., `Foo` in `Map!<Foo?, Bar!>`), navigation always falls back to the outermost type (`Map`'s class declaration).

### Root Cause

The resolver unconditionally resolved the outermost reference, and no logic mapped a type-token position to a specific type argument in the PSI.

### Solution Result

Clicking a type argument now navigates to its own declaration instead of the outermost enclosing type.

---

## NL-I16.5: Suffix-Adjacent Delimiter Click Gap (UX)

* Resolved(`0.1.3`)


### Description

For placeholders like `Uni!<Foo>`, clicking on `<` (placeholder offset 4) returns no navigation target because the delimiter has no target of its own.

### Solution Result

Delimiters adjacent to a nullity suffix now delegate to the suffix token, and a status-bar hint guides the user when no prefix delegation is possible.

---

## NL-I16.6: CaretListener Tramples MouseAdapter's PlaceholderClickInfo

* Resolved(`0.1.4`)


### Description

After the visual-position capture architecture was implemented, Ctrl+clicking at any position within the folded text always navigates to the type's class declaration.

### Root Cause

On the same UI turn, the mouse press and the caret positioning it triggers both fire — and the caret listener unconditionally overwrote the click info with a wrong value.

### Solution Result

Mouse and caret capture now write to separate keys, so neither can overwrite the other's data and click positions resolve correctly.

---

## NL-I16.7: Smart filling: This will be the final!!!

* Resolved(`0.1.5`)


### Description

Case: `Type!` → Try "Go Definition" at the right of `!` → falls back to `Type`'s navigation.

### Root Cause

The position-tracking listeners were installed too late — inside the navigation handler itself, after the click had already been dispatched — so the first navigation in an editor had no captured click position.

### Solution Result

Position tracking is installed eagerly for every new editor, right-edge clicks on a marker resolve correctly, and listeners are properly stored and cleaned up.
