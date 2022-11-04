# Query with cursors

The ChiselStrike cursor API enables more advanced query capabilities, including
pagination, filtering, and sorting entities. You obtain a ChiselCursor object
from any ChiselEntity subclass with its `cursor()` function, and use it to
consume query results. When fetched, this cursor queries and returns all
BlogPost entity instances:

```ts
const cursor: ChiselCursor<BlogPost> = BlogPost.cursor()
const blogPosts: BlogPost[] = await cursor.toArray()
```

The above code using a cursor is equivalent to
[`findAll()`](./read-data.md#findall):

```ts
const blogPosts: BlogPost[] = await BlogPost.findAll()
```

ChiselCursor has two sets of methods: one for building new cursors that will
query for a modified result set, and another for fetching those results.

The following builder methods on ChiselCursor each return another ChiselCursor
configured to modify the results of the original:

| Builder method | Description |
| --- | --- |
| [`filter()`](#filter) | Return only entity instances that match some criteria |
| [`select()`](#select) | Return only certain entity properties (projection) |
| [`sortBy()`](#sortby) | Return entities sorted by a property |
| [`skip(n)`](#skip) | Skips first n instances |
| [`take(n)`](#take) | Return at most n instances |
| [`map()`](#map) | Apply a function to entity instances (does not alter query) |

The above methods that build cursors are intended to be chained in order to
execute complex queries. As much as possible, ChiselStrike strives to combine
all cursor operations internally in order to avoid scanning an unnecessarily
large number of entity instances.

The following fetcher methods begin a query on the cursor and provide a way to
process the results.

| Fetcher method | Return type | Description |
| --- | --- | --- |
| [`forEach()`](#foreach) | `Promise<void>` | Run a function for every returned entity |
| [`toArray()`](#toarray) | `Promise<T[]>` | Returns an array of entity instances, `T` is entity type |
| [`minBy(K)`](#minby) | `Promise<T[K]>` | Returns the min value of instances, `T[K]` is type of entity property `K` |
| [`maxBy(K)`](#maxby) | `Promise<T[K]>` | Returns the max value of instances, `T[K]` is type of entity property `K` |
| [`count()`](#count) | `Promise<number>` | Returns count of instances |
| [`for await of`](#async-iteration) | `AsyncIterator<T>` | Enables use of [async iteration] syntax e.g. `for await (x of cursor)` |

## Query builder methods

### `filter()`

`filter()` accepts an expression for [matching entities] to indicate which
entity instances the cursor will yield.

To create a cursor that filters all posts for the author "Me" using a
[restrictions object] :

```ts
const cursor: ChiselCursor<BlogPost> = BlogPost
    .cursor()
    .filter({
        author: "Me"
    })
```

### `select()`

`select()` accepts a list of strings (as TypeScript rest parameters) that must
be names of entity properties and returns a cursor that yields entity instances
containing only those properties. This is similar to a SQL projection.

To create a cursor that yields all entity instances with only `author` and
`content` properties:

```ts
await BlogPost
    .cursor()
    .select("author", "content")
    .forEach(post => {
        // post contains only author and content properties
        // Its TypeScript type is Pick<BlogPost, "author" | "content">
        console.log(post.author, post.content)
    })
```

### `sortBy()`

`sortBy()` accepts the name of an entity property to sort on and an optional
boolean indicating the direction of the sort. It returns a cursor that yields
all entities in sorted order. The default sort order is ascending (`true`).

To sort all posts by their `publishedAt` property in reverse order:

```ts
const cursor: ChiselCursor<BlogPost> = BlogPost
    .cursor()
    .sortBy("publishedAt", false)
```

### `skip()`

`skip()` accepts a count N of entity instances to skip from a cursor's query
results and returns a new cursor yielding everything after those first N
instances.

To skip the first 10 entity instances in a query and start at the 11th:

```ts
const cursor: ChiselCursor<BlogPost> = BlogPost
    .cursor()
    .skip(10)
```

### `take()`

`take()` accepts a count N of initial entity instances to yield from a cursor's
query and returns a cursor that yields up to those first N instances.

To get the first 10 (or possibly fewer) entity instances from a query:

```ts
const cursor: ChiselCursor<BlogPost> = BlogPost
    .cursor()
    .take(10)
```

### `map()`

`map()` accepts a lambda function that implements a transformation of each
original entity to to some other data type. It works similar to the normal
JavaScript array `map()` function.

To transform all entity instances to some other type T:

```ts
const cursor: ChiselCursor<T> = BlogPost
    .cursor()
    .map(post => {
        return new T(...)
    })
```

### Chaining cursor builder methods

You can chain cursor builder methods to build more complex queries. Each cursor
method operates on the output type from the prior cursor.

For example, to get the top 10 posts authored by "Me" sorted by the publication time:

```ts
const posts = await BlogPost
    .cursor()
    .filter({ author: "Me" })
    .sortBy("publishedAt")
    .take(10)
    .toArray()
```

## Fetch results methods

### `forEach()`

`forEach()` accepts a lambda function that is invoked for each entity instance
passed as the first argument. It returns a promise indicating when the iteration
is complete.

To iterate and take some action on each entity instance:

```ts
await BlogPost
    .cursor()
    .forEach(post => {
        // post is a BlogPost type object
    })
```

### `toArray()`

`toArray()` returns a promise with an array of entity instances yielded by the
cursor.

To read all entity instances into an array:

```ts
const posts: BlogPost[] = await BlogPost.cursor().toArray()
```

### `minBy()`

`minBy()` accepts the name of an entity property and returns a promise with the
minimum value of this property among all entities that would be yielded by the
cursor, or undefined if there are no entity instances.

To find the time of the earliest BlogPost using its `publishedAt` property:

```ts
const earliest = await BlogPost.cursor().minBy("publishedAt")
if (typeof earliest !== "undefined") {
    console.log(`Earliest is $earliest`)
}
```

### `maxBy()`

`minBy()` accepts the name of an entity property and returns a promise with the
maximum value of this property among all entities that would be yielded by the
cursor, or undefined if there are no entity instances.

To find the time of the latest BlogPost using its `publishedAt` property:

```ts
const latest = await BlogPost.cursor().maxBy("publishedAt")
if (typeof latest !== "undefined") {
    console.log(`Latest is $latest`)
}
```

### `count()`

`count()` returns a promise with the number of entity instances that would be
returned by this cursor.

```ts
const count = await BlogPost.cursor().count()
```


### Async iteration

ChiselCursor implements [async iteration], enabling the use of syntax like the
following to iterate query results:

```ts
const cursor = BlogPost.cursor()
for await (const post of cursor) {
    // do something with the next BlogPost instance, for example,
    // modifying it and saving it,
    post.author = "You"
    await post.save()
}
```

[matching entities]: ./matching-entities
[restrictions object]: ./matching-entities#restrictions
[async iteration]: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-3.html#async-iteration
