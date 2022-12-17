# Relationships

Entities have the ability to reference one another in your model, establishing
intuitive relationships between items of data. You can specify a either a
[direct](#direct-relationships) or [indirect](#indirect-relationships) reference
to another entity. This documentation will use the term "referring" entity as
the entity that contains a property that contains a reference to a "referred"
entity.

## Direct relationships

### Expression

Direct references use the type of the referred entity for the property of the
referring entity.

Consider the following example that defines a referring `BlogPost` entity with a
property for a directly referred `BlogAuthor` entity:

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

and a route for each entity:

```ts title="routes/blog-authors.ts"
export default BlogAuthor.crud();
```

```ts title="routes/blog-posts.ts"
export default BlogPost.crud();
```

Each entity can be operated on individually through the routes. This is
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

### Eager loading {#eager-loading}

ChiselStrike eagerly loads referred entity instances when loading the referring
instance. This makes all entities available immediately after the referring
entity loads.

:::warning

This eager loading behavior may change in a future version of ChiselStrike.

:::

## Indirect relationships

Indirect references use a special generic type `Id<>` as the referred property
type.

### Expression

Use the generic type `Id<>` for an entity property to indirectly refer to the ID
of another entity. The generic type must be a subclass of ChiselEntity. It is
typed, read, and written as a primitive string.

Consider the following example, similar to above, that defines a referring
`BlogPost` entity with a property for an indirectly referred `BlogAuthor`
entity:

```ts title="model/entities.ts"
export class BlogAuthor extends ChiselEntity {
    name: string
    title: string
}

export class BlogPost extends ChiselEntity {
    author: Id<BlogAuthor>
    content: string
}
```

When performing CRUD API operations on `BlogPost`, `author` is surfaced as the
string ID of the referred `BlogAuthor`. Unlike direct references, indirect
references are not loaded eagerly at the time of a query.


[entity basics]: ./entity-basics
[crud-api-relationships]: ../entity-crud-api/relationships
[optional]: ./entity-basics#optional-properties
