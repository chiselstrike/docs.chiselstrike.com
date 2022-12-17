# Matching entity instances

In many cases, it's necessary to express in code how to find or filter one or
more entity instances, similar to a SQL WHERE clause. Depending on the context,
ChiselStrike offers three mechanisms to express these matches:

- a [predicate function](#predicate)
- a [restrictions object](#restrictions)
- a [filter expression object](#filter-expression)

The APIs that accept at least one of these types of expressions are:

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

## Filter expression object {#filter-expression}

Filter expressions are new in [version 0.14](/release-notes#0.14).

Filter expressions allow you to express arbitrarily complex conditions for
matching entity instances using a JavaScript object. The object you provide as a
filter expression is similar to a restrictions object in that each of its
properties define a condition that are combined with a logical AND. However, you
have access to a range of boolean and comparison operators to build a query
filter.

A filter expression object can contain object properties that are either:

- An entity property
- An operator token (see boolean operators and comparison operators below)

Entity property values can be either a primitive value (for strict equality
comparison) or a [nested filter expression](#nested-filter-expressions).

### Boolean operators

ChiselStrike provides operators for logical AND, OR, and NOT.

#### Boolean AND

Use the `$and` object property to provide an array of filter expressions that
are each combined with logical AND.

To filter entity instances where the author is exactly equal to "Me" that are
also not hidden:

```ts
const posts = await BlogPost.findMany({
    $and: [
        author: "Me",
        hidden: false
    ]
})
```

The above is functionally equivalent as the similar example in the prior section
where the logical AND expression is implicit in a restrictions object:

```ts
const posts = await BlogPost.findMany({
    author: "Me",
    hidden: false
})
```

#### Boolean OR

Use the `$or` object property to provide an array of nested filter expressions
that are each combined with logical OR.

To filter entity instances where the author is exactly equal to either "Me" or
"You":

```ts
const posts = await BlogPost.findMany({
    $or: [
        { author: "Me" },
        { author: "You" }
    ]
})
```

#### Boolean NOT

Use the `$not` object property to provide a filter expression whose result is
negated.

To filter entity instances where the author is not exactly equal to "Me":

```ts
const posts = await BlogPost.findMany({
    $not: { author: "Me" }
})
```

### Comparison operators

Comparison operators are used to filter using values of a single entity
property. They are used in a filter expression as a key of an object associated
with that property.

#### Equality operators (`$eq`, `$ne`)

The operators `$eq` (equal) and `$ne` (not equal) are used for filtering based
on strict equality and non-equality on an entity property value.

To filter entity instances where the author is exactly equal to "Me":

```ts
const posts = await BlogPost.findMany({
    author: { $eq: "Me" }
})
```

This is functionally equivalent to the shorter version that implicitly compares
for equality on a property:

```ts
const posts = await BlogPost.findMany({
    author: "Me"
})
```

To filter entity instances where the author is not exactly equal to "Me":

```ts
const posts = await BlogPost.findMany({
    author: { $ne: "Me" }
})
```

#### Range operators (`$gt`, `$gte`, `$lt`, `$lte`)

The operators `$gt`, `$gte`, `$lt` and `$lte` are used for filtering ranges of
values on and entity property value.

| Operator | Meaning |
| --- | --- |
| `$gt`  | Greater Than (but not equal) |
| `$gte` | Greater Than or Equal |
| `$lt`  | Less Than (but not equal) |
| `$lte` | Less Than or Equal |

To filter entity instances where publishedAt is greater than 900 (but not equal
to 900):

```ts
const posts = await BlogPost.findMany({
    publishedAt: { $gt: 900 }
})
```

### Nested filter expressions

You can nest boolean conditions to express the equivalent of parenthesis in most
programming languages to impose an order of evaluation for more complex filters.

Consider the following SQL WHERE clause:

```sql
((author = "Me" OR author = "You") AND (publishedAt <= 800 OR publishedAt > 900))
```

To filter entity instances using the same logic:

```ts
const posts = await BlogPost.findMany({
    $and: [
        $or: [
            { author: "Me" },
            { author: "You" }
        ],
        $or: [
            { publishedAt: { $lte: 800 } },
            { publishedAt: { $gt: 900 } }
        ]
    }
    publishedAt: { $gt: 900 }
})
```

Notice that the innermost parenthetical expressions are the most deeply nested.
