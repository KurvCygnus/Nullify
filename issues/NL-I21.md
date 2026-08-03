# NL-I21: Configurable Wildcard Symbol & Settings UI I18n

* Resolved(`0.5.0`)

* Found on version `0.4.1` by `Kurv Cygnus`


## Description

Wildcards were always folded using `*` for unbounded wildcards (e.g. `?` → `*`). This behavior should be user-configurable to allow choosing between `*` and `?`. Additionally, the settings UI text lacked internationalization (i18n) support — all UI strings in the configuration panel should be localizable.

## Solution Result

The unbounded-wildcard symbol is now user-configurable (`?` or `*`, default `?`), and the settings UI is fully localized.
