# Optionals, defaults, and required properties

When an entity property is defined optional or has a default assigned value, it
is not required to provide a value when adding a new entity instance.

For example, consider the following entity definition:

```ts title="models/Example.ts"
import { ChiselEntity } from "@chiselstrike/api"

export class Example extends ChiselEntity {
    optString?: string
    defNumber: number = 42
    reqBoolean: boolean
}
```

and route generating a CRUD API for `Example`:

```ts title="routes/examples.ts"
import { Example } from '../models/Example';

export default Example.crud();
```

The following attempts to add new instances with curl yield results as
illustrated.

### Example 1: All properties provided values

```bash
# OK, all properties are provided values
curl \
    -X POST \
    -d '{"optString": "foo", "defNumber": 1, "reqBoolean": false}' \
    "https://host/dev/examples"
```
```json
{
  "id": "[GENERATED-ID]",
  "optString": "foo",
  "defNumber": 1,
  "reqBoolean": false
}
```

### Example 2: Default value used when not provided

Entity properties with default assigned values use that value if not
provided in the request.

Entity properties specified as optional are missing from the entity instance
if not provided in the request.

```bash
# OK, required `reqBoolean` is provided, `defNumber` and `optString` are not
curl \
    -X POST \
    -d '{"reqBoolean": false}' \
    "https://host/dev/examples"
```
```json
{
  "id": "[GENERATED-ID]",
  "defNumber": 42,
  "reqBoolean": false
}
```

Note that `defNumber` took the default value of 42, and the optional `optString`
does not appear at all.

### Example 3: Required property not provided

If a required property isn't provided when adding or updating an instance, the
request yields an error.

```bash
# Fails, required property `reqBoolean` not provided
curl \
    -X POST \
    -d '{optString: "foo"}' \
    "https://host/dev/examples"
```
```
Error: provided data for field `reqBoolean` are incompatible with given type `Example`
```

:::caution

Currently, `chiseld` returns an HTTP status code 500 for this error. This is
technically incorrect for a REST API, and should be changed to 400 in the
future.

:::
