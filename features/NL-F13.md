# NL-F13: Generic Annotation Value Navigation — Folded Literals Delegate to the Platform

* Completed(`1.0.0`)

* Suggested on version `0.9.10` by `Kurv Cygnus`


## Description

When a non-nullity annotation with a value member is preserved inside a folded placeholder (e.g. `@Value("${app.name}") Foo!`), the value literal currently has no navigation target — even though the same literal clicked *outside* a fold would navigate somewhere meaningful (Spring's `@Value` jumps to the config key, `@Qualifier` to the bean, `@Profile` to the profile, …). Nullify must not hard-code any of these domains: it hands the literal back to the IDE's own navigation machinery, and installed framework plugins resolve it exactly as if the user had clicked the literal in unfolded code.

## Solution

Clicking an annotation value literal inside a folded placeholder — e.g. Spring's `@Value("${app.name}")` — now navigates exactly as it would in unfolded code: the IDE's own machinery (installed framework plugins, native references) resolves it to the config key, bean, profile, or whatever that framework defines. Literals with nothing to resolve keep the current no-target behavior, and the fold stays collapsed.
