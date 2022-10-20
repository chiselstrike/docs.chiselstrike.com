# Uniqueness

While ChiselStrike always generates a unique ID for an entity when it's created,
there are times when it's desirable to enforce uniqueness on a entity property
that you define. For example, you may wish to require that all User entity
instances have a different username.

## Expressing uniqueness with `@unique` {#unique-decorator}

```ts title="models/User.ts"
import { ChiselEntity } from "@chiselstrike/api"

export class User extends ChiselEntity {
    username: string
}
```

With the above declaration, any and all User instances may have the same value
for `username`. To enforce uniqueness, import the `@unique` decorator and apply
it to the property:

```ts
import { ChiselEntity, unique } from "@chiselstrike/api"

export class User extends ChiselEntity {
    @unique username: string
}
```

If a non-unique value is added, the request will fail with an error indicating
that the uniqueness constraint was violated on the `username` property.

## Migration constraint {#migration-constraint}

You may not add uniqueness to an existing property, as described by the section
on [adding uniqueness during migration][adding-uniqueness].

[adding-uniqueness]: ./migration#adding-uniqueness
