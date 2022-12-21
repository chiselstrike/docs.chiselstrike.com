---
title: Data modeling
description: Use TypeScript classes to declare your data models with ChiselStrike.
keywords: [ChiselStrike, documentation, data modeling, TypeScript]
---

# Data modeling

Data modeling is the process of designing the structure and contents of
persistent data in your application. With ChiselStrike, you express the data
model using one or more entities defined by TypeScript classes.

## Automatically generated CRUD API {#crud-api}

After defining an entity using a subclass of `ChiselEntity` and declaring an
route using the `crud()` function on that entity, ChiselStrike will
[automatically generate a CRUD API][crud-api] that provides read and write
access to the data represented by that entity. The API includes query operations
that allow [filtering, sorting, ordering, and limiting query
results][query-api]. This CRUD API is commonly used in Jamstack projects at
build time to prerender dynamic content, or in frontend code to dynamically
query entities in response to user activity in the app.

## TypeScript API {#typescript-api}

Subclasses of `ChiselEntity` inherit a [TypeScript API] that provides read and
write access to use in your backend [route] code. This avoids the need for your
route to make HTTP requests to the generated CRUD API, which is inefficient.


[crud-api]: ../entity-crud-api/
[query-api]: ../entity-crud-api/filter-order-limit-query
[TypeScript API]: ../entity-ts-api/
[route]: ../routing/
