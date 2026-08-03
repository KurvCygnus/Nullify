# NL-F2: Better Local Variable Support: Dataflow Integration

* Ditched(not worthy to be implemented)

* Suggested on version `0.0.1` by `Kurv Cygnus`


## Description

IntelliJ does a lot of jobs on local variable's dataflow analyzing. It is smart enough to tell you whether this invoke may cause `NPE`, or guarantees the safety of this external variable, however, it is not care enough for reviewing, since IntelliJ knows dataflow, **not user**. So, it is a good idea to infer the nullability from dataflow, and fold to make dataflow explicit.
