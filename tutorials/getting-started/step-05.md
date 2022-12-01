---
description: Learn about how to create an automatic CRUD API for an entity.
keywords: [ChiselStrike, documentation, tutorial, entity, CRUD, API]
---

# Step 5: Entity CRUD operations

## Create a route for the entity

After defining an entity with TypeScript, you can write the minimal amount of
code required to generate a fully functional REST API for that entity that
implements CRUD operations:

```ts title="my-backend/routes/posts.ts"
import { BlogPost } from '../models/BlogPost';

export default BlogPost.crud();
```

In your ChiselStrike project, create a new file in the existing routes directory
and call it `posts.ts`. Copy the above code into it and save the file. Upon
saving the file, `chiseld` will automatically restart and pick up the new
route.

Like the "hello" route you saw earlier, the path of this route is generated from
the name of the TypeScript file in the routes directory. You can now use the
endpoint URL `http://localhost:8080/dev/posts` to perform CRUD operations on the
`BlogPost` entity.

:::note

The generated API makes use of an underlying database without exposing any of
its implementation details. When developing locally, `chiseld` uses SQLite
internally. When deploying a project to the ChiselStrike managed cloud service,
it uses a Postgres-compatible database. While the behavior of the REST API
should not change, `chiseld` running locally with SQLite does not scale or
perform in the same way as the managed cloud service.

:::

## Create an entity with HTTP POST

First, add an instance of `BlogPost` using curl on the command line with some
test data:

```bash
curl \
    -X POST \
    -d '{"author": "Glauber", "content": "...", "publishedAt": 999, "hidden": false}' \
    "localhost:8080/dev/posts"
```

:::tip

In ChiselStrike documentation and tutorials, as a standard practice, we always
put the URL in quotes when passing it to curl. Sometimes a URL can have shell
special characters which will cause the command to fail unless properly quoted.

We also split long shell commands on multiple lines with `\` to escape carriage
returns to make them easier to read.

:::

The JSON output from curl validates what was written:

```json
{
  "id": "[GENERATED-ID]",
  "author": "Glauber",
  "content": "...",
  "publishedAt": 999,
  "hidden": false
}
```

Note the following:

- The `-X` argument to curl specified use of the HTTP POST method to add data,
  which is standard for REST APIs. Other methods are used for other operations.

- The `-d` argument to curl specified a POST payload containing a stringified
  JSON object whose fields match the properties of the BlogPost entity.

- The entity is assigned a random unique ID string in its `id` property. This
  tutorial will only show "[GENERATED_ID]" in sample output because the ID you
  see will be unique to your commands.

:::tip

When providing a payload to curl using `-d`, the default HTTP method is POST.
You can omit that from the command line, but it's shown here for clarity.

:::

## Read a single entity with HTTP GET and unique ID

You can now get that entity back using its generated ID in an HTTP GET request.
Be sure to copy the ID for your entity and insert it in the path below:

```bash
curl "localhost:8080/dev/posts/[YOUR-GENERATED-ID]"
```

The output will be identical to the JSON above.

## Read all entities with HTTP GET

First, add two more entities as you did previously:

```bash
curl \
    -X POST \
    -d '{"author": "Pekka", "content": "...", "publishedAt": 888, "hidden": false}' \
    "localhost:8080/dev/posts"
```

```bash
curl \
    -X POST \
    -d '{"author": "Dejan", "content": "...", "publishedAt": 777, "hidden": true}' \
    "localhost:8080/dev/posts"
```

Now, use curl to get all BlogPost entities:

```bash
curl "localhost:8080/dev/posts"
```

The output will be similar to the following JSON:

```json
{
  "next_page": "http://localhost:8080/dev/posts?cursor=eyJheGVzIjpbeyJrZXkiOnsiZmllbGROYW1lIjoiaWQiLCJhc2NlbmRpbmciOnRydWV9LCJ2YWx1ZSI6ImIyZTM3NWI1LTJmMGYtNGM5NS1iMTFjLTU0YWU4MWNhNzU0ZSJ9XSwiZm9yd2FyZCI6dHJ1ZSwiaW5jbHVzaXZlIjpmYWxzZX0%3D",
  "prev_page": "http://localhost:8080/dev/posts?cursor=eyJheGVzIjpbeyJrZXkiOnsiZmllbGROYW1lIjoiaWQiLCJhc2NlbmRpbmciOnRydWV9LCJ2YWx1ZSI6Ijc5NjUxY2E5LTk3MTUtNDU3Yi1iNmY5LTk4NjY1OGQ4ZTdkNiJ9XSwiZm9yd2FyZCI6ZmFsc2UsImluY2x1c2l2ZSI6ZmFsc2V9",
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
    }
  ]
}
```

Note the following about the output:

- The `results` field is an array with all of the entities previously added.

- The `next_page` and `prev_page` fields are included to enable pagination,
  which is not covered in this tutorial. For the rest of this tutorial, we will
  not show these properties in query results to save space.

## Update an entity by ID

To update an entity using its unique ID, use the HTTP PATCH method to send a
JSON payload of the properties to the entity's URL.

First, add a new entity like you did before:

```bash
curl \
    -X POST \
    -d '{"author": "Jan", "content": "...", "publishedAt": 111, "hidden": false}' \
    "localhost:8080/dev/posts"
```

```json
{
  "id": "[GENERATED-ID]",
  "author": "Jan",
  "content": "...",
  "publishedAt": 111,
  "hidden": false
}
```

You can update the `content` property of this entity, replacing
"[YOUR-GENERATED-ID]" with the ID from the output above:

```bash
curl \
    -X PATCH \
    -d '{"content": "updated"}' \
    "localhost:8080/dev/posts/[YOUR-GENERATED-ID]"
```

```json
{
  "id": "[GENERATED-ID]",
  "author": "Jan",
  "content": "updated",
  "publishedAt": 111,
  "hidden": false
}
```

:::info

If you use the HTTP PUT method to update an entity, you must specify the entire
contents of the entity in the JSON payload, which will completely replace the
current entity.

:::

## Delete an entity by ID

Deleting an entity is performed using the HTTP DELETE method. To delete the
previously updated entity, first copy the generated ID from the output of the
delete command, and insert it into this command:

```bash
curl \
    -X DELETE \
    "localhost:8080/dev/posts/[YOUR-GENERATED-ID]"
```

```json
"Deleted ID [YOUR-GENERATED-ID]"
```
