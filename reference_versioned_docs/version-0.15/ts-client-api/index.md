---
title: TypeScript client API
description: The ChiselStrike TypeScript client API provides CRUD operations for your web app and nodejs code.
keywords: [ChiselStrike, documentation, TypeScript, API, web, nodejs]
---

# TypeScript client API

:::note

This is the documentation for the TypeScript client API for use with web and
nodejs applications. For ChiselStrike backend route code, use the [entity
TypeScript API](../entity-ts-api/).

:::

When building web applications, especially SPAs (single page apps), it is
necessary in some cases to read and write entity data directly from the app's
code running in the browser. While it's possible to use the [RESTful entity CRUD
API](../entity-crud-api/) directly with a general-purpose HTTP client library,
it's more convenient to use a dedicated client library that hides the
implementation details of the underlying protocol. ChiselStrike can generate a
TypeScript client library derived from your backend [data
model](../data-modeling/) and [route](../routing/) definitions.

Internally, the client API uses the standard web [Fetch API]. As such, it will
also work with nodejs 17.5 and later using its experimental fetch API
implementation, making it suitable for use in local scripts and other nodejs
runtime environments.

Generation of client code as described in this documentation is supported in
ChiselStrike version 0.15 and later.

[Fetch API]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
