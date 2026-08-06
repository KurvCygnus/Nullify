# NL-F13: Domain-Specific Annotation Value Navigation — Spring `@Value` → Config Key

* Open

* Suggested on version `0.9.10` by `Kurv Cygnus`


## Description

When a non-nullity annotation with a value member is preserved inside a folded placeholder (e.g. `@Value("${app.name}") Foo!`), the value literal — the string the IDE would normally resolve — currently has no navigation target. For Spring's `@Value`, that literal (`"${app.name}"`) should jump to the matching key in the project's configuration file (`application.properties`, `application.yml`, …). This is the flagship example of *domain-specific* navigation that the generic IR must not hard-code.

## Solution

Clicking a Spring `@Value("${app.name}")` literal inside a folded placeholder jumps to `app.name` in the active configuration file. Non-Spring value literals keep current behavior (no navigation target).
