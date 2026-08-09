# NL-I39: Reason Hint Block Inlay Not Aligned With the Fold — Should Align to the Next Line's First Visible Character

* Open

* Found on version `1.0.0` by `Kurv Cygnus`


## Description

The nullability reason hint shown above a collapsed fold does not line up with the fold itself — its left edge is offset from where the folded placeholder sits. The best UX is to align the hint's left edge with the **first visible character of the next line**, so the hint reads as an annotation attached to that line.

## Root Cause

A block inlay is anchored to a document offset, not to a visual column. The current placement anchors the inlay at the fold's start offset (`region.startOffset`) and lets the editor decide the horizontal origin, which does not coincide with the folded placeholder's visual column or the next line's content indentation.

## Solution Result

_Not yet resolved._
