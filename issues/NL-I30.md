# NL-I30: `ClassCastException` in `determineScope` on Mid-Typing Type-Use Annotations

* Resolved(`0.9.5`)

* Found on version `0.9.4` by `Kurv Cygnus`


## Description

While typing a field declaration whose type carries a type-use nullability annotation, e.g.

## Root Cause

The scope classifier blindly cast the annotation's owner to a modifier list. During mid-typing / incomplete-parse states the owner can be some other runtime type, so the cast threw and aborted the whole file's inspection.

## Solution Result

The inspection no longer crashes while typing such fields, and flagging completes for the whole file even when one annotation is malformed mid-typing.
