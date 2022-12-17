# Create data

Creating new entity instance involves two steps:

1. Build an object instance of a ChiselEntity subclass
1. Write its data to the ChiselStrike data persistence layer

The examples here assume an existing BlogPost entity defined as:

```ts title="models/BlogPost.ts"
export class BlogPost extends ChiselEntity {
    author: string = "Anonymous"
    content: string
    publishedAt: number
    hidden: boolean
}
```

## Build a ChiselEntity object instance

Subclasses of ChiselEntity have a static function called `build()` that creates
new object instance of the class. It accepts a single object argument whose
properties must match those of the subclass, both name and type.

The following code creates a new object instance of BlogPost, specifying values
for all properties. The resulting blogPost variable is of type `BlogPost`:

```ts
const blogPost = BlogPost.build({
    author: "Me",
    content: "...",
    publishedAt: 999,
    hidden: false,
})
```

:::info

The `build()` function does not ensure that all required properties are present
in the supplied object. If you try to write an entity without all required
properties, the call to `save()` will fail with an error message indicating what
was missing.

:::

## Writing a ChiselEntity object instance

Once you've built a ChiselEntity object instance, you can write it to the
ChiselStrike persistence layer using its `save()` method. `save()` returns a
promise to indicate completion.

```ts
await blogPost.save()
```

Just like the [generated CRUD API], ChiselStrike generates a new unique string
ID for the entity instance. It will be available in the original object instance
`id` property immediately after `save()` completes successfully.

```ts
await blogPost.save()
const id = blogPost.id // the generated string ID
```

You can use this ID to [read], [update], and [delete] the entity.

## Combine `build()` and `save()`

As a shortcut to the use of `build()` and `save()` separately, you can replace
them with a single function `create()`:

```ts
const blogPost = await BlogPost.create({
    author: "Me",
    content: "...",
    publishedAt: 999,
    hidden: false,
})
const id = blogPost.id
```

[generated CRUD API]: ../entity-crud-api/
[read]: ./read-data
[update]: ./update-data
[delete]: ./delete-data
