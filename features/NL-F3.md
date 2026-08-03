# NL-F3: New Lint: Duplicated Nullability Annotation Usage

* Completed(`0.6.0`)


## Description

For projects like CRUD, related framework often depends on `Jakarta`, `Javax`, `Lombok`, etc. All of them has their own nullability annotation. `Jakarta` (`jakarta.annotation.Nonnull`), `Lombok` (`lombok.NonNull`) and `Javax` (`javax.annotation.Nonnull`)'s annotation name is very similar to each other, making it easy to import multi `NotNull`s when developer didn't keep eyes on code.

## Solution

A new "Inconsistent Nullability Annotation" inspection detects duplicated and mixed-namespace nullability annotations within a file, with quick fixes to remove a duplicate annotation or replace it with the file's canonical one.
