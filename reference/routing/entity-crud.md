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


[crud-api]: ../entity-crud-api
[entity-basics]: ../data-modeling/entity-basics
