# NL-F12: PSI-Anchored Fold Navigation — Replace Placeholder Text Re-Parsing with Fold-Time Segment Mapping

* Completed(`1.0.0`)

* Suggested on version `0.9.10` by `Kurv Cygnus`


## Description

Fold navigation today works by **reparsing the folded placeholder text** and guessing which declaration a clicked part refers to. This is fragile: the placeholder is only a compact rendering, so the parser must re-derive the original meaning from a lossy string. Each new fold form (arrays, varargs, wildcards, `var`, generics, annotation arguments) has repeatedly required a matching navigation patch, and annotation arguments are not understood at all — clicking `name`/`value` inside a preserved `@MyAnno(name = "foo", value = "bar")` jumps to the field's type instead of the annotation's element methods (see [NL-I35](../issues/NL-I35.md)).

A more compatible architecture is to **never reparse the placeholder**. Since the folded text is produced *from* the original PSI at fold time, the fold itself should record a mapping from each placeholder segment back to the originating PSI element. Navigation then becomes a trivial lookup plus delegation to that original element's **native** navigation — the IDE already knows how to navigate annotation arguments to element methods, type references to declarations, and imports to their targets. Navigation configuration (custom annotation registries, import disambiguation) is inherited from the platform for free.

## Solution

Navigation on folded types no longer reparses the displayed text. Each fold records where its visible parts came from in the original code, and clicking any part — including annotation arguments like `name = "foo"` — jumps to the exact declaration the IDE would have shown before folding. This also fixes the annotation-argument navigation regression in [NL-I35](../issues/NL-I35.md).
