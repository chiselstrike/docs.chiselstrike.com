# Matching entity instances

In many cases, it's necessary to express in code how to find or filter one or
more entity instances, similar to a SQL WHERE clause. Depending on the context,
ChiselStrike offers two mechanisms to express these matches: a predicate
function and a restrictions object.

The APIs that accept one or both of these expressions are:

- [`ChiselEntity.findMany()`](./read-data#findmany)
- [`ChiselEntity.findOne()`](./read-data#findone)
- [`ChiselEntity.delete()`](./delete-data)
- [`ChiselEntity.upsert()`](./update-data#upsert)
- [`ChiselCursor.filter()`](./query-cursors#filter)

## Predicate function {#predicate}

A predicate function is typically a lambda that receives an entity instance as
an argument and returns a boolean to indicate if the instance should be included
in an entity operation.

For example, `findMany()` can be passed a predicate function to filter for posts
with a `publishedAt` value greater than 1000:

```ts
const posts = await BlogPost.findMany(blogPost => {
    // blogPost is a BlogPost type object
    return blogPost.publishedAt > 1000
})
```

## Restrictions object {#restrictions}

A restrictions object specifies the names and values of entity properties that
must be present, combined with a logical AND, for it to be included in an entity
operation. All values are compared using strict equality.

For example, `findMany` can be passed an restrictions object to filter for posts
with a particular author that are also not hidden:

```ts
const posts = await BlogPost.findMany({
    author: "Me",
    hidden: false
})
```
