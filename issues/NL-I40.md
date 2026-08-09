# NL-I40: Reason Hint Renders CJK Text as Tofu Blocks (`□□□`)

* Open

* Found on version `1.0.0` by `Kurv Cygnus`


## Description

When the nullability reason contains Chinese (or other CJK) characters, the hint above the collapsed fold displays them as tofu/placeholder blocks (`□□□`) instead of the actual glyphs. Latin text renders fine.

## Root Cause

The hint renderer paints text with a raw AWT `Font` resolved from the editor color scheme, which does not carry the IDE's CJK font-fallback chain. The IDE normally renders mixed-script editor text through its own fallback-aware text layout; bypassing that with `Graphics.drawString` loses the CJK fallback font, so unsupported glyphs come out as boxes.

## Solution Result

_Not yet resolved._
