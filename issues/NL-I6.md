# NL-I6: Array and Vararg Folding Redesign via Type Normalization

* Resolved(`0.0.1`)

* Found on version `0.0.1` by `Kurv Cygnus`


## Description

Array and vararg folding produced fragile fold ranges because the PSI text range does not reliably cover `[]` or `...`, making the anchor points for fold regions unreliable.

## Solution Result

Arrays and varargs now fold through the same generic-type path as normal types, giving stable ranges and clean compact notation.
