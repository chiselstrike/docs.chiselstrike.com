# Supported HTTP methods

The generated CRUD API follows REST conventions, using the HTTP method to
determine what sort of operation to perform. The supported methods are:

- [GET](#get)
- [POST](#post)
- [PUT](#put)
- [PATCH](#patch)
- [DELETE](#delete)

All of the examples below assume the following entity definition:

```ts title="models/BlogPost.ts"
export class BlogPost extends ChiselEntity {
    author: string
    content: string
    publishedAt: number
    hidden: boolean
}
```

## GET {#get}

The GET method implements read-only operations, including queries.

### Get all entities

Use the endpoint with only the entity path:

```bash
# Get all entities
curl "https://host/dev/entity"
```

This is effectively an unfiltered query. Learn more about [filtering, ordering,
and limiting query results][folq].

The response contains a JSON object with the query results. It has the following
fields:

| Field | Description |
|-------|-------------|
| `results` | A JSON array whose elements are JSON objects. Each element contains the data from an entity matched by the query. |
| `next_page` | A full URL for the next page of results. |
| `prev_page` | A full URL for the previous page of results. |

The default limit for a page of results is 1000. This limit can be [specified in
the query][folq-limit].

### Get a single entity by generated ID

Append the entity ID as a path component after the entity path:

```bash
# Get a single entity whose generated ID is [GENERATED-ID]
curl "https://host/dev/entity/[GENERATED-ID]"
```

The response contains a JSON object with the entity data.

## POST {#post}

The POST method implements the creation of a new entity.

- The payload provided in the HTTP request must contain a JSON object whose
  fields match the properties of the entity.
- The supplied JSON must contain all entity properties that are not marked as
  optional or do not have default values in its definition.

```bash
# Create a new entity
curl \
    -X POST \
    -d '{"author": "Glauber", "content": "...", "publishedAt": 999, "hidden": false}' \
    "https://host/dev/entity"
```

The response will echo the provided JSON, plus a randomly generated unique ID
for the entity in the "id" field:

```json
{
  "id": "[GENERATED-ID]",
  "author": "Glauber",
  "content": "...",
  "publishedAt": 999,
  "hidden": false
}
```

## PUT {#put}

The PUT method implements the full update of an entity specified by its
generated ID.

- The entity ID must be provided in the endpoint path.
- The payload provided in the HTTP request must contain a JSON object whose
  fields match the properties of the entity.
- The supplied JSON must contain all entity properties that are not marked as
  optional or do not have default values in its definition.

The contents of the JSON will fully replace any existing data for that entity;
none of the prior entity fields will retain their original values.

```bash
# Fully update an existing entity
curl \
    -X PUT \
    -d '{"author": "Glauber", "content": "...", "publishedAt": 999, "hidden": false}' \
    "https://host/dev/entity/[GENERATED-ID]"
```

The response will echo the provided JSON, including the unique ID of the entity
that was specified in the endpoint path.

```json
{
  "id": "[GENERATED-ID]",
  "author": "Glauber",
  "content": "...",
  "publishedAt": 999,
  "hidden": false
}
```

## PATCH {#patch}

The PATCH method implements the partial update of an existing entity identified
by its generated unique ID.

- The entity ID must be provided in the endpoint path.
- The payload provided in the HTTP request must contain a JSON object whose
  fields match the properties of the entity.
- The supplied JSON may contain a subset of entity properties to update.

```bash
# Update an existing entity with a new value for the hidden property
curl \
    -X PATCH \
    -d '{"hidden": true}' \
    "https://host/dev/entity/[GENERATED-ID]"
```

The response contains a JSON object with all of the entity properties after the
update was applied, including the unique ID of the entity that was specified in
the endpoint path.

## DELETE {#delete}

The DELETE method implements the deletion of an existing entity identified by
its generated unique ID.

- The entity ID must be provided in the endpoint path.

```bash
# Delete an existing entity
curl \
    -X DELETE \
    "https://host/dev/entity/[GENERATED-ID]"
```

The response contains a JSON string describing the result.

```json
"Deleted ID [GENERATED-ID]"
```

[folq]: ./filter-order-limit-query
[folq-limit]: ./filter-order-limit-query#limit