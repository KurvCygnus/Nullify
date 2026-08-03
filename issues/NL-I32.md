# NL-I32: Navigation UX Regressions — Final Review

Two **UX-level** navigation regressions found during the final bug review (post-NL-I31). Neither is a resolution-logic failure — fold targets resolve correctly when the right token is hit — but click-zone coverage and no-target feedback degrade the Ctrl+Click / F12 experience:

1. A nullability-annotated `var` in a generic method has a navigation gap on the boundaries to the right of its type parameters.
2. Navigating on a placeholder position with no resolvable target silently fails and unfolds the fold text.


---

## NL-I32.1: Generic-method `var` — Right-Edge Navigation Gap on Method Type Parameters

* Pending(1)

* Found on version `0.9.7` by `Kurv Cygnus`


### Description

In a generic method, a `var` declared with a nullability annotation whose inferred type is (or contains) a **method type parameter** navigates fine on the type parameters themselves, but the caret positioned to the **right** of a type parameter cannot jump — the same UX-gap class as [NL-I16.5](NL-I16.md#nl-i165-suffix-adjacent-delimiter-click-gap-ux).

### Root Cause

A delimiter or whitespace immediately following a type argument maps to a token that returns no targets and is never delegated back to the type argument — the NL-I16.5-style gap persists on the type-argument side.

---

## NL-I32.2: No-Target Navigation Silently Fails and Unfolds

* Pending(2)

* Found on version `0.9.7` by `Kurv Cygnus`


### Description

When the user Ctrl+Clicks (or F12/Ctrl+B) on a folded placeholder position that has **no resolvable navigation target**, the current behavior is a **silent failure combined with the fold text being unfolded**:

- The handler returns `null` — silent fail, no feedback.
- IntelliJ's default Ctrl+click behavior on a collapsed fold region then expands the fold, replacing the placeholder with the full verbose source.

Desired behavior: **cancel the unfold** and let IntelliJ show its native "cannot find declaration to go to" guidance (the status-bar hint shown for failed goto-declaration), instead of silently expanding the folded text.

### Root Cause

An empty target list is reported as the standard "decline" signal, so the platform runs its default goto-declaration on the underlying source — which, on a collapsed fold region, expands the fold. No feedback tells the user that Nullify recognized the placeholder but could not resolve a target.
