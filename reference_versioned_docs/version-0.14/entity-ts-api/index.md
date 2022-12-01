---
title: Entity TypeScript API
description: The ChiselStrike entity TypeScript API provides CRUD operations for your route code.
keywords: [ChiselStrike, documentation, TypeScript, API]
---

# Entity TypeScript API

When writing backend [routes] to build an API for your app, it's common to
programmatically access entity data and use it to generate a response to the
caller. It's possible to use the [generated REST API] for your entities, but
this incurs unnecessary overhead of calling back into your backend API, and
without the benefit of having type information from your entity classes.
Instead, use ChiselStrike's TypeScript API for each entity class to read and
write entity instances directly from your route code.

Subclasses of `ChiselEntity` have a collection of functions and methods that
allow you to [create], [read], [update], and [delete] entity instances, as well
as perform more complex queries using [cursors]. It is assumed in this section
of the documentation that you are already familiar with [data modeling] in
ChiselStrike to build subclasses of `ChiselEntity`.

The TypeScript API works only in the context of a route. It can't be used
independently.


[routes]: ../routing/
[generated REST API]: ../entity-crud-api/
[data modeling]: ../data-modeling/
[create]: ./create-data
[read]: ./read-data
[update]: ./update-data
[delete]: ./delete-data
[cursors]: ./query-cursors
