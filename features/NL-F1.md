# NL-F1: Navigation Support

* Completed(`0.1.0`)

* Suggested on version `0.0.1` by `Kurv Cygnus`


## Description

Folding is quite stable now, but with types folded, **"Go to Definition"** no longer works. Doing `Ctrl + left-click` just unfolds the placeholder text, while `F12` just does nothing.

## Solution

Ctrl+clicking a folded type now navigates to the type or annotation declaration. Simple types map the click position to the type name or the `?`/`!` marker; complex generic types show all candidate targets for IntelliJ's navigation popup. Known limitations are tracked in [NL-I16](../issues/NL-I16.md).
