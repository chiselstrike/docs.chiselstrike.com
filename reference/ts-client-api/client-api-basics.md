# Client API basics

## Initialization

Import `createChiselClient` and call it with a configuration object that
describes the route URL endpoint to use that provides the underlying REST API.
To use the ChiselStrike server running on your local machine during development:

```ts
import { createChiselClient } from "path/to/dir/client"

const chiselClient = createChiselClient({
    serverUrl: "http://localhost:8080"
})
```

The configuration object provided to `createChiselClient` allows the following
properties:

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `serverUrl` | `string` | yes | The version if the API to use; defaults to the name of the version that was originally used by `chisel create`. This becomes the first path segment in the endpoint URL.
| `version` | `string` | no | The version if the API to use; defaults to the name of the version that was originally used by `chisel create`. This becomes the first path segment in the endpoint URL.
| `headers` | <code>[Headers] &#124; [Record]<string, string></code> | no | A set of HTTP headers to include with every request.

## Entity route objects

The object returned by `createChiselClient` has one property for each route that
was discovered by `chisel create` using the same name. The value of that
property is an "entity route" object with a collection of methods that perform
data access on instances of the entity for that route. This object enables
access to instances of the entity using the underlying REST API, offering
functions with names similar to the [supported HTTP methods].

Each entity route object has the following function properties:

| Function | Description |
| --- | --- |
| [`delete()`](./data-access-functions#entity-delete) | Deletes all instances matching a filter expression |
| [`get()`](./data-access-functions#entity-get) | Returns a GetResponse object with instances for manual pagination |
| [`getAll()`](./data-access-functions#entity-getall) | Returns an array of instances |
| [`getIter()`](./data-access-functions#entity-getiter) | Returns an async iterator of instances |
| [`post()`](./data-access-functions#entity-post) | Adds a new instance with a random ID |
| `id()` | Returns a new [instance route object](#instance-route-objects) for specific entity access |

Using the prior BlogPost example, the generated client is able to query for all
BlogPost instances through the "posts" route using the following code:

```ts
const posts = await chiselClient.posts.getAll()
```

:::note

If the name of the route contains characters that are not legal for a TypeScript
identifier, then you must use an alternate syntax to access the property. For
example, if the name of the route was "blog-posts":

```ts
const posts: BlogPost[] = await chiselClient["blog-posts"].getAll()
```

:::

## Instance route objects

Calling `id(someId)` on an entity route object returns a new "instance route"
object that enables direct access to the specific entity instance with the
provided ID. That object has methods to perform CRUD operations on it:

| Function | Description |
| --- | --- |
| [`delete()`](./data-access-functions#instance-delete) | Deletes the instance |
| [`get()`](./data-access-functions#instance-get) | Gets the instance |
| [`patch()`](./data-access-functions#instance-patch) | Updates the instance |
| [`put()`](./data-access-functions#instance-put) | Overwrites the instance |

Using the prior BlogPost example, the generated client is able to query for
a single BlogPost instance using the following code:

```ts
const post: BlogPost = await chiselClient.posts.id("[ID-OF-INSTANCE]").get()
```


[Headers]: https://developer.mozilla.org/en-US/docs/Web/API/Headers
[Record]: https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type
[AsyncIterator]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/asyncIterator
[supported HTTP methods]: ../entity-crud-api/supported-http-methods
