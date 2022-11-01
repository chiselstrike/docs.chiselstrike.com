# Entity CRUD routes

When you [define an entity][entity-basics] using a subclass of `ChiselEntity`,
the class exposes a `crud()` function that returns a `RouteMap` object. You can
export this `RouteMap` from a route source file to create a route with an
endpoint URL that provides [full CRUD functionality][crud-api] for that entity
built into it.

For example, given this entity definition in `models/ExampleEntity.ts`:

```ts title="models/ExampleEntity.ts"
import { ChiselEntity } from "@chiselstrike/api"

export class ExampleEntity extends ChiselEntity {
    // your properties here
}
```

you can create a route for it by exporting it from `routes/examples.ts`:

```ts title="routes/examples.ts"
import { ExampleEntity } from '../models/ExampleEntity';

export default ExampleEntity.crud();
```

The endpoint URL during development becomes
`http://localhost:8080/dev/examples`, queryable using the ChiselStrike [entity
CRUD API][crud-api].

## Customize entity CRUD routes

By default, the CRUD API creates routes for all [supported HTTP methods].
However, you may wish to disable some of that functionality or change the way
they output JSON to the caller.

Instead of using the `crud()` function provided by a ChiselEntity subclass, you
can use the top-level `crud()` function exported by the ChiselStrike API. It
allows you to configure the routes generated for a ChiselEntity subclass, and
returns a RouteMap object that you can export from a route source file.

The following example has the same behavior as the example in the prior section:

```ts title="routes/examples.ts"
import { crud } from "@chiselstrike/api";
import { ExampleEntity } from '../models/ExampleEntity';

export default crud(
    ExampleEntity,
    {} // no configuration change from the default
);
```

### Disable specific routes

The first argument to the top-level `crud()` function is the ChiselEntity
subclass, and the second is a configuration object. The config object has the
following properties that change the default behavior:

| Boolean property | Affected route(s)
| --- | ---
| deleteAll | `DELETE /` (delete all entities)
| deleteOne | `DELETE /:id`
| getAll | `GET /` (get all entities)
| getOne | `GET /:id`
| patch | `PATCH /:id`
| post | `POST /`
| put | `PUT /:id`
| write | all routes that write entity data

For each of the boolean properties, the default value is `true`, enabling all
routes. Providing a value of `false` for the property disables the associated
CRUD route of the resulting RouteMap.

Setting `write` to false disables all routes that write data (`deleteAll`,
`deleteOne`, `patch`, `post`, `put`) unless it is explicitly set to `true`.

In the following example, all routes that write an `ExampleEntity` are disabled,
except the `POST` route that creates new entities:

```ts title="routes/examples.ts"
import { crud } from "@chiselstrike/api";
import { ExampleEntity } from '../models/ExampleEntity';

export default crud(
    ExampleEntity,
    {
        write: false,
        post: true
    }
);
```

Disabled routes yield an HTTP 405 (Method Not Allowed) error response.

### Customize the response

By default, routes that query entity data using the HTTP GET method serialize
the response as JSON. This response can be customized using the raw data from
the query. The `crud()` config object has an additional property
`createResponse` that you can use to modify the output of these routes. To do
so, assign it a function that receives the raw response body data as input and
returns a [Response] object that yields the response to the caller. The
TypeScript signature of the function is this:

```ts
(body: unknown, status: number) => Promise<Response> | Response;
```

`status` is the HTTP status code that ChiselStrike would normally return to the
caller.

`body` is an object that contains the data to send to the caller and varies
based on the type of route that was invoked. `createResponse` implementations
typically iterate the properties of this object for serialization. For example:

```ts
export default crud(
    ExampleEntity,
    {
        createResponse: (body: unknown, status: number) => Response {
            // This function should return a Response with the data to send.
            const serializedBody = serializeResponse(body)
            return new Response(serializedBody, { status })
        }
    }
);
```



[crud-api]: ../entity-crud-api
[entity-basics]: ../data-modeling/entity-basics
[supported HTTP methods]: ../entity-crud-api/supported-http-methods
[Response]: https://developer.mozilla.org/en-US/docs/Web/API/Response
[query response]: ../entity-crud-api/supported-http-methods#get-all-entities
