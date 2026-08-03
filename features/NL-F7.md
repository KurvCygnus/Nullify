# NL-F7: "Template Mode"

* Accepted(1)

* Suggested on version `0.0.1` by `Kurv Cygnus`


## Description

Nullify does a lot of things on `ASTNode` Parsing. Of course, this is a good QoL, but reversing this process will be also useful and attractive.

1. What is "Template Mode"?
   Most IntelliJ Users have been used **"Living Templates"**, `sout`, `fori`, `C`... "Template Mode" is similar to this, it transforms DSL that Nullify uses in folding placeholder texts to corresponding type, and supports other nullability-related template snippets.

2. Why not Living Templates?

   1. Living Templates supports no target/one target to manipulate.
   2. Any symbols are all illegal in Living Templates.
   3. Template Mode is aimed to support completion hint, its final UX could be as good as Living Templates.

3. How to use?

   Using it could be very easy: since templates are all focused on `!`, `?` and `.` (*may also invoke `in`, `out`, `Array` and `Vararg`*), the former 2 are completely illegal chars in Java, making this feature's implementation much easier.

   Examples:
   1. `Foo?` → `Enter`/`Tab` → Select Nullables to import → `@Nullable Foo`
   2. `Map!<out CharSequence!, Array?<Object!>>` → `Enter`/`Tab` → Select Nullables and NotNulls to import → `@NotNull Map<? extends @NotNull CharSequence, @NotNull Object @Nullable []>`
   3. `final var foo = bar!!` → `Enter`/`Tab` → `final var foo = Objects.requireNonNull(bar, "Some Message That is Customizable")`
   4. `foo.bar()?.baz()` → `Enter`/`Tab` → if chains(when target type is not configured); fluent APIs(when type is `Optional`, `Stream` or configured)

4. Lint Designs

   As mentioned above, `!` and `?` are completely illegal in Java, and all templates need to use at least one of these chars. This means we can intercept lint on detecting these chars usage, then check grammar legality.

   Template Mode should support 2 entrances:
   1. **Literally "mode"**: Turn on/off by hotkey (e.g. `alt` + `*`)
   2. **Automatic** (as above)

   1 should be default, since 2 needs long-term feedback, enhances and bug-fixing.
