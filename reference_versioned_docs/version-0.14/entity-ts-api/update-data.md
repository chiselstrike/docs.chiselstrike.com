# Update data

## Updating an existing entity instance

To update an existing instance, you must either:

- [Read] the existing instance into memory, make modifications to the object,
  then `save()` it.
- Build a new entity object with the unique ID of the instance to modify, then
  `save()` it.

In both cases, the existing instance is overwritten in the persistence layer.

:::info

If you want to do a partial update instead, you must follow the prior example
that reads, modifies, then saves the instance. This restriction is [expected to
change](https://github.com/chiselstrike/chiselstrike/issues/1693) in the future.

:::

The examples here assume an existing BlogPost entity defined as:

```ts title="models/BlogPost.ts"
export class BlogPost extends ChiselEntity {
    author: string = "Anonymous"
    content: string
    publishedAt: number
    hidden: boolean
}
```

### Example: Read, modify, then save

To change the value of a property in an existing BlogPost instance:

```ts
export default new RouteMap()
    .post("/update", async (req: ChiselRequest): Promise<void> => {
        const post = await BlogPost.findById("[EXISTING-ID]")
        post.author = "Updated value"
        await post.save()
    }
```

### Example: Build with the same ID, then save

To update the entire contents of a BlogPost instance:

```ts
export default new RouteMap()
    .post("/update", async (req: ChiselRequest): Promise<void> => {
        const post = BlogPost.build({
            id: "[EXISTING-ID]",
            author: "...",
            content: "...",
            publishedAt: 999,
            hidden: true,
        })
        await post.save()
    }
```

Note that the ID of the existing instance is provided in the object passed to
`build()`. You must specify (or accept defaults) all of the values of the entity
in order to use `save()` since it will completely overwrite all of the
properties of the existing instance.

## Upsert (update or insert) {#upsert}

In some cases it might be necessary to ensure that only one instance of an
entity exists using some criteria other than and automatically generated ID. For
that case, the `upsert()` function can be useful to either insert the instance
if it doesn't already exist, or update it if it does exist.

An upsert in ChiselStrike requires an object with three fields:

| Upsert object field | Description |
| --- | --- |
| `restrictions` | A [restrictions object] with the names and values of the fields that should be unique (when combined with a logical AND) among all instances
| `create` | An object with the instance properties to use for a newly created instance, if an instance does not already exist using the criteria in `restrictions`
| `update` | An object with the instance properties to update an instance that already exists using the criteria in `restrictions`

If a BlogPost is uniquely identified by a `publishedAt` value of 999, the
following code will either create or update an entity instance, returning the
instance that was created or updated:

```ts
export default new RouteMap()
    .post("/upsert", async (req: ChiselRequest): Promise<BlogPost> => {
        return await BlogPost.upsert({
            restrictions: { publishedAt: 999 },
            create: { author: "Me", content: "...", hidden: false },
            update: { author: "Me", content: "... (updated)", hidden: false },
        })
    }
```

If multiple entity instances match the provided restrictions, only the first one
(sorted by entity ID) will be modified.


[Read]: ./read-data
[restrictions object]: ./matching-entities#restrictions
