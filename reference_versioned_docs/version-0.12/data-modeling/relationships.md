# Relationships

Entities have the ability to reference one another in your model, establishing
intuitive relationships between items of data. To express a relationship where
entity A "contains" an entity B, define a field in A with type B.

This documentation will refer to A as the "referring" entity, and B as the
"referred" entity.

## Expressing relationships {#expressing-relationships}

Consider the following example that defines a referring `BlogPost` entity with a
property for a referred `BlogAuthor` entity:

```ts title="model/entities.ts"
export class BlogAuthor extends ChiselEntity {
    name: string
    title: string
}

export class BlogPost extends ChiselEntity {
    author: BlogAuthor
    content: string
}
```

and an endpoint for each entity:

```ts title="endpoints/blog-authors.ts"
export default BlogAuthor.crud();
```

```ts title="endpoints/blog-posts.ts"
export default BlogPost.crud();
```

Each entity can be operated on individually through the endpoints. This is
explained in the prior section on [entity basics].

However, note that a `BlogPost` requires a `BlogAuthor` property value. This
requires that all new `BlogPost` instances include a `BlogAuthor` instance to go
along with it. When using the CRUD API or TypeScript API, you are required to
provide all required relationships at the time of creation.

If the `BlogAuthor` entity was defined [optional], it will not be required at
the time of `BlogPost` creation:

```ts
export class BlogPost extends ChiselEntity {
    author?: BlogAuthor
    content: string
}
```

To manage with relationship using the CRUD API, refer to the [CRUD API
relationships documentation][crud-api-relationships].

## Eager loading {#eager-loading}

ChiselStrike eagerly loads referred entity instances when loading the referring
instance. This makes all entities available immediately after the referring
entity loads.

:::warning

This eager loading behavior may change in a future version of ChiselStrike.

:::


[entity basics]: ./entity-basics
[crud-api-relationships]: ../entity-crud-api/relationships
[optional]: ./entity-basics#optional-properties
