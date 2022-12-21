# Path placeholders

For RESTful APIs that work with collections of uniquely identified resources,
it's typically required for the caller of the API to provide the ID of the
resource to read or write in the path of the URL. For example, if your
application works with a collection of books, the endpoint URL path that
identifies book `ABC` during development might be `/dev/books/ABC`. You can
extract the value `ABC` from the URL using RouteMap API.

## Basic placeholder example

In order for your route to extract variable IDs from the URL, use a placeholder
in the path pattern. Placeholders begin with a colon character (`:`) followed by
a name you choose.

A route for books specifying a unique ID might look like this in a file called
`books.ts`:

```ts title="routes/books.ts"
import { ChiselRequest } from "@chiselstrike/api"

export default new RouteMap()
    .get("/:id", (req: ChiselRequest) => {
        const id = req.params.get("id")
        // Fetch and return the book data...
    })
```

In the above example, note that:

- The endpoint URL path during development is `/dev/books/[ID]` where [ID] is
  the book ID provided in the path. `dev` is the local environment and `books`
  is the base name of the TypeScript source file.
- The placeholder in the path pattern is named `id` and prefixed by a colon (`:`).
- The string value of the ID provided in the path is found using the `params`
  property of the `ChiselRequest` parameter using the named placeholder.

## Multiple placeholders

You can use multiple placeholders in the path pattern. For example, if each
chapter of a book was accessible as a distinct resource, it could be
specified like this:

```ts title="routes/books.ts"
import { ChiselRequest } from "@chiselstrike/api"

export default new RouteMap()
    .get("/:book_id/chapter/:chapter_id", (req: ChiselRequest) => {
        const book_id = req.params.get("book_id")
        const chapter_id = req.params.get("chapter_id")
    })
```
