# NL-I17: Back to `IrNode`: Refocus on Intersection

* Resolved(`0.1.6`)

* Found on version `0.0.2` by `Kurv Cygnus`


## Description

Intersection types existed in the folding engine's internal model, but their folding was barely tested and could not be seen working in a real IDE — only the internal representation was verified, never the actual fold in the editor.

## Solution Result

Intersection types in cast expressions now fold correctly in the editor, including those carrying nullability annotations and wildcards.
