# Relationships

This section illustrates how the CRUD API works with entity relationships using
the following entity definitions:

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

We will use the general terms "referencing entity" to describe `BlogPost` and
"referred entity" to describe `BlogAuthor`.

## Add a new referred entity {#add}

To specify a new `BlogAuthor` entity instance to be created along with a new
`BlogPost` instance, nest the contents of the `BlogAuthor` entity into a JSON
object in the `author` field. Both entities will be created at the same time.

```bash
curl \
    -X POST \
    -d '{"content": "...", "author": {"name": "Foo", "title": "Me"}}' \
    "http://host/dev/blog-posts"
```
```json
{
  "id": "[GENERATED-POST-ID]",
  "author": {
    "name": "Foo",
    "title": "Me",
    "id": "[GENERATED-AUTHOR-ID]"
  },
  "content": "..."
}
```

Note that both referring and referred instances receive a new generated ID, with
the author's ID nested inside the `author` field. They be fetched individually
using those IDs.

```bash
# Get the BlogAuthor instance
curl "http://host/dev/blog-authors/[GENERATED-AUTHOR-ID]"
```

```json
{
  "id": "[GENERATED-AUTHOR-ID]",
  "name": "Foo",
  "title": "Me"
}
```

```bash
# Get the BlogPost instance
curl "http://host/dev/blog-authors/[GENERATED-POST-ID]"
```

```json
{
  "id": "[GENERATED-POST-ID]",
  "author": {
    "id": "[GENERATED-AUTHOR-ID]",
    "name": "Foo",
    "title": "Me"
  },
  "content": "..."
}
```

Note that `BlogPost` data always includes the `BlogAuthor` data in the result.
This is called [eager loading].

:::warning

This eager loading behavior may change in a future version of ChiselStrike.

:::

## Delete a referring instance {#delete}

If a referred entity is created at the same time as a referring entity as
illustrated in the prior section, deleting the referring entity will not cause
the referred entity to be deleted.

Specifically, in the above case, deleting a `BlogPost` will not cause the
`BlogAuthor` to be deleted along with it.

## Replace a referred instance {#replace}

The ChiselStrike CRUD API currently does not support changing a referred
instance property after the referring entity has been created. In the above
example, the value of `author` cannot be updated to a new `BlogAuthor` after the
`BlogPost` has been created. This functionality may change in the future.


[eager loading]: ../data-modeling/relationships#eager-loading
