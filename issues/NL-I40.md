# NL-I40: CJK Rendering of Reason Hints

The nullability reason hint shown above a collapsed fold had two problems when the reason contained CJK characters. This parent issue tracks them — each sub-issue below covers one concrete problem.


---

## NL-I40.1: CJK Reason Hint Crashes With `NoSuchElementException` When No Configured Font Can Display the First Character

* Resolved(`1.0.0`)


### Description

In a Chinese-locale IDE, collapsing a fold whose reason begins with a CJK character made the hint disappear and the IDE log the error `java.util.NoSuchElementException: Collection contains no element matching the predicate` from `ReasonHintInlayRenderer`.

### Root Cause

The fallback renderer selected the first font in the chain that can display the sentence's first character with `fonts.first { it.canDisplay(text[0]) }`. When the sentence starts with a CJK glyph that neither the editor's base font nor `FontPreferences.getEffectiveFontFamilies` can display — the scheme does not always carry a CJK font — the predicate matches nothing and `.first` throws.

### Solution Result

The hint now always appears: the font selection falls back gracefully when no configured font can display a character, and the JDK's logical `Monospaced` font is appended as a guaranteed fallback — it carries the platform's composite font chain, so CJK reasons render real glyphs even when the scheme has no CJK font of its own.

---

## NL-I40.2: Reason Hint Renders CJK Text as Tofu Blocks

* Resolved(`1.0.0`)


### Description

When the nullability reason contains Chinese (or other CJK) characters, the hint above the collapsed fold displays them as tofu/placeholder blocks (`□□□`) instead of the actual glyphs. Latin text renders fine.

### Root Cause

The hint renderer paints text with a raw AWT `Font` resolved from the editor color scheme, which does not carry the IDE's CJK font-fallback chain. The IDE normally renders mixed-script editor text through its own fallback-aware text layout; bypassing that with `Graphics.drawString` loses the CJK fallback font, so unsupported glyphs come out as boxes.

### Solution Result

Chinese (and other CJK) characters in a nullability reason now render as real glyphs instead of `□□□` tofu blocks. Both the measured width and the painted text go through the editor's font-fallback chain, so mixed-script reasons look exactly as they would in the editor itself.
