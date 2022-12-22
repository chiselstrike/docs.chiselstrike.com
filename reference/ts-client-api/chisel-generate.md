# Generate code with `chisel generate`

Consider the following entity and route:

```ts title="backend/models/BlogPost.ts"
export class BlogPost extends ChiselEntity {
    author: string = "Anonymous"
    content: string
    publishedAt: number
    hidden: boolean
}
```

```ts title="backend/routes/posts.ts"
import { BlogPost } from "../models/BlogPost.ts"

export default BlogPost.crud()
```

With this code, ChiselStrike automatically creates a RESTful CRUD API at the
path "/dev/posts" during development. You can then instruct the ChiselStrike CLI
to generate a client library using the current "dev" version in a location
of your choosing. Run the following command while the ChiselStrike server is
running on your machine:

```bash
npm exec chisel generate [path/to/dir]
```

The location you provide should be somewhere within your web application's
TypeScript source code. The directory will be created if it didn't previously
exist.

To specify a version other than the default, use the `--version` flag on
the command line to provide that string.

`chisel generate` will create several source files that compose an API that
matches the entity and route definitions that it detected from the running
ChiselStrike server. For the above entity and route, it will generate an API
that exports:

- A factory function `createChiselClient` that creates an instance of the client
  API.
- A TypeScript type whose name and fields match the BlogPost entity.

```ts title="path/to/dir/client.ts"
export function createChiselClient(config: ClientConfig) {
    // implementation redacted
}
```

```ts title="path/to/dir/models.ts"
export type BlogPost = {
    id: string;
    author: string;
    content: string;
    publishedAt: number;
    hidden: boolean;
};
```

You can import them into your code as follows, using the location you provided
to `chisel generate`:

```ts
import { createChiselClient } from "path/to/dir/client"
import { BlogPost } from "path/to/dir/models"
```
