---
description: Learn about how to order and limit query results with the automatic CRUD API.
keywords: [ChiselStrike, documentation, tutorial, query, order, limit, CRUD, API]
---

# Step 7: Ordering and limiting query results

To sort the results of a query, use the `sort` parameter in the query string
with a value of the name of the entity property to sort by.

## Ascending (normal) sort

To sort all of the posts by `publishedAt`:

```bash
curl "localhost:8080/dev/posts?sort=publishedAt"
```

```json
{
  "results": [
    {
      "id": "[GENERATED-ID]",
      "author": "Dejan",
      "content": "...",
      "publishedAt": 777,
      "hidden": true
    },
    {
      "id": "[GENERATED-ID]",
      "author": "Pekka",
      "content": "...",
      "publishedAt": 888,
      "hidden": false
    },
    {
      "id": "[GENERATED-ID]",
      "author": "Glauber",
      "content": "...",
      "publishedAt": 999,
      "hidden": false
    }
  ]
}
```

## Descending (reverse) sort

To reverse the sort order, prefix the name of the property with a hyphen
character (`-`):

```bash
curl "localhost:8080/dev/posts?sort=-publishedAt"
```

```json
{
  "results": [
    {
      "id": "[GENERATED-ID]",
      "author": "Glauber",
      "content": "...",
      "publishedAt": 999,
      "hidden": false
    },
    {
      "id": "[GENERATED-ID]",
      "author": "Pekka",
      "content": "...",
      "publishedAt": 888,
      "hidden": false
    },
    {
      "id": "[GENERATED-ID]",
      "author": "Dejan",
      "content": "...",
      "publishedAt": 777,
      "hidden": true
    }
  ]
}
```

## Combine filtering and sorting

You can combine filtering with ordering in the same query in exactly the way you
would expect.

To query for all posts that are not hidden, ordered by `publishedAt`:

```bash
curl "localhost:8080/dev/posts?.hidden=false&sort=publishedAt"
```

```json
{
  "results": [
    {
      "id": "[GENERATED-ID]",
      "author": "Pekka",
      "content": "...",
      "publishedAt": 888,
      "hidden": false
    },
    {
      "id": "[GENERATED-ID]",
      "author": "Glauber",
      "content": "...",
      "publishedAt": 999,
      "hidden": false
    }
  ]
}
```

## Limiting query results

To limit the number of query results to only the number required, you can add
the query string parameter `limit` to indicate that number.

To get only the newest post, as determined by the `publishedAt` property, you
can reverse order by that property, then request only the first one:

```sh
curl "localhost:8080/dev/posts?sort=-publishedAt&limit=1"
```

```json
{
  "results": [
    {
      "id": "[GENERATED-ID]",
      "author": "Glauber",
      "content": "...",
      "publishedAt": 999,
      "hidden": false
    }
  ]
}
```

## Skipping query results (offset)

To skip a number of results, you can add the query string parameter `offset` to
indicate that number.

To get only the *second* newest post, as determined by the `publishedAt`
property, you can reverse order by that property, skip one result, and request
only the first one after that:

```sh
curl "localhost:8080/dev/posts?sort=-publishedAt&limit=1&offset=1"
```

```json
{
  "results": [
    {
      "id": "[GENERATED-ID]",
      "author": "Pekka",
      "content": "...",
      "publishedAt": 888,
      "hidden": false
    }
  ]
}
```

