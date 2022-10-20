# Filtering, ordering, and limiting query results

This page describes how to compose queries for entities using the generated CRUD
API. All filtering, ordering, and limiting is done using query string parameters
added to the base entity endpoint URL with the HTTP GET method.

All of the examples below assume the following entity definition:

```ts title="models/BlogPost.ts"
export class BlogPost extends ChiselEntity {
    author: string
    content: string
    publishedAt: number
    hidden: boolean
}
```

as well as the following base endpoint URL:

```
https://host/dev/entity
```

When copying the following examples, be sure to replace this with your own
entity's endpoint URL.

## Filtering query results {#filter-results}

ChiselStrike can filter the results of a query. A filter is similar to a SQL
WHERE clause.

### Get all entities {#get-all-entities}

The entity endpoint with no query string parameters returns all entities with no
filter:

```bash
curl "https://host/dev/entity"
```

### Equality filter {#equality-filter}

To filter entities on a property value with an exact value, specify the name and
value of the property to filter on.

- **Parameter name**: A string composed of the name of the entity property
  prefixed with a period character (e.g. ".hidden")
- **Parameter value**: The property value

```bash
# Filter by hidden with boolean value true
curl "https://host/dev/entity?.hidden=true"
```

### Types of filter comparisons {#filter-types}

ChiselStrike supports the several types of comparisons for filtering by entity
property values. A filter is similar to a SQL WHERE clause. The default
comparison is exact equality, which does not use an operator, as seen in the
example above.

| Operator token | Description |
|----------|-------------|
| `ne` | Not Equals (inequality) |
| `lt` | Less Than |
| `lte` | Less Than or Equal |
| `gt` | Greater Than |
| `gte` | Greater Than or Equal |
| `like` | Similar to SQL LIKE, includes wildcards `%` and `_` |
| `unlike` | Similar to SQL NOT LIKE, includes wildcards `%` and `_` |

You can specify the operator to apply to a filter by appending a tilde character
(`~`) to the query string filter parameter followed by the operator token.

- **Parameter name**: A string composed of the name of the entity property
  prefixed with a period character and suffixed with a tilde character and the
  operator (e.g. ".author~ne")
- **Parameter value**: The property value

```bash
# Filter by author that is not equal to "Mark"
curl "https://host/dev/entity?.author~ne=Mark"

# Filter by publishedAt greater than or equal to 1000
curl "https://host/dev/entity?.publishedAt~gte=1000"

# Filter by content containing the string "ChiselStrike"
curl "https://host/dev/entity?.content~like=%25ChiselStrike%25"
```

:::tip

The wildcard percent character (`%`) used with the`like` and `unlike` operators
is a special character in HTTP query strings and must be escaped as `%25` prior
to insertion, as you can see from the example above. We recommend using an HTTP
client library to build URLs so that all query string parameter names and values
are escaped correctly and automatically.

:::

### Filter by multiple entity properties {#filter-multiple-properties}

To filter using multiple fields combined with a logical AND, add one query
string parameters for each condition:

```bash
# Filter by hidden = true AND author = "Pam"
curl "https://host/dev/entity?.hidden=true&.author=Pam"

# Filter by publishedAt between 1000 (inclusive) and 2000 (exclusive)
curl "https://host/dev/entity?.publishedAt~gte=1000&.publishedAt~lt=2000"
```

:::info

ChiselStrike does not support property filter conditions combined with a logical
OR. To implement a logical OR with two conditions, you must perform two queries,
one for each condition, and merge the results in your app's code.

:::

### Filter using entity relationship {#filter-relationships}

You can filter referring entities using properties of their related entity. See
[this section][filter-relationships] for details.

## Ordering query results {#order}

You can sort the results of query using the `sort` parameter in the query
string.

- **Parameter name**: `sort`
- **Parameter value**: The entity property to sort on. The default sort order is
  ascending. Prefix the property with a hyphen character (`-`) for a descending
  (reverse) sort.

```bash
# Get all entities ordered by publishedAt
curl "https://host/dev/entity?sort=publishedAt"

# Filter by hidden = true, reverse sort by publishedAt
curl "https://host/dev/entity?.hidden=true&sort=-publishedAt"
```

## Limiting query results {#limit}

You can limit the number of results returned by a query using the "limit"
parameter in the query string. The default limit is 1000.

- **Parameter name**: `limit`
- **Parameter value**: The maximum number of entities to return

```bash
# Get the last 5 entities determined by the publishedAt property
curl "https://host/dev/entity?sort=-publishedAt&limit=5"
```

[filter-relationships]: ./relationships#filter
