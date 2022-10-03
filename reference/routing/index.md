# Routing API

ChiselStrike allows you to write backend code that responds to HTTP requests.
You can specify the HTTP method, endpoint URL path, and behavior using the
TypeScript API described in this section.

Routes must be declared in TypeScript source files (JavaScript is not supported,
though you may invoke JavaScript code from within routes).

## Source files

All TypeScript source files containing a route definition must exist in the
`routes` directory by default. The file paths that ChiselStrike uses to find
routes is specified in the project Chisel.toml. The system will use all source
files in the project to assemble a final list of active routes.

The name of the file determines the base endpoint URL path. For example, if a
route is defined in `routes/hello.ts`, the endpoint URL during development
becomes `[YOUR-HOST]/dev/hello`.

The source file for a route must `export default` a single `RouteMap` object or
`Handler` function that defines the behavior of all child paths under the base
endpoint URL path for the route. The `RouteMap` defines which methods and
relative paths ChiselStrike will respond to, and how it will respond.

## A simple route example

`RouteMap` uses a builder-like API for defining which methods and relative paths
ChiselStrike will respond to, and how it will respond. The required elements for
building a route are:

- An HTTP method
- A relative path
- A Handler function that performs any work and sends a response

The following is a simple route in a file `routes/hello.ts`:

```ts title="routes/hello.ts"
import { RouteMap } from "@chiselstrike/api";

export default new RouteMap()
    .get("/", function (): string {
        return "hello world";
    })
```

When `chiseld` runs during development with this file in place, it will create a
route with the endpoint URL `http://localhost:8080/dev/hello`. When that URL is
accessed with the HTTP GET method, it will return a plain text response
containing the string "hello world".
