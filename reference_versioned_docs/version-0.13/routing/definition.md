# Definition

A route is defined by its [HTTP method](#http-method), [relative
path](#relative-path), and [handler function](#handler-function).

## HTTP method

Typically, you use a method on a RouteMap object to specify an HTTP method for
it to handle. There are methods for `get()`, `post()`, `put()`, `patch()`, and
`delete()`. Each method returns the same RouteMap instance, enabling you to
chain method calls to build a set of functionality for your route for a
combination of HTTP methods and relative paths.

```ts
export default new RouteMap()
    .get("/", () => { /* do GET work */ })
    .post("/", () => { /* do POST work */ })
    .put("/", () => { /* do PUT work */ })
```

You can also use the `route()` method to specify the HTTP method as a string
argument:

```ts
export default new RouteMap()
    .route("PATCH", "/", () => { /* do PATCH work */ })
```

or an array of HTTP method strings to handle in the same way:

```ts
export default new RouteMap()
    .route(["POST", "PUT"], "/", () => { /* do both POST and PUT work */ })
```

or the wildcard `*` to handle all HTTP methods:

```ts
export default new RouteMap()
    .route("*", "/", () => { /* handle all methods */ })
```

## Relative path

The path parameter is interpreted as a relative path under the base route path
generated for route. For this route in the file `routes/hello.ts`:

```ts title="routes/hello.ts"
export default new RouteMap()
    .get("/", () => { /* do GET work */ })
```

The resulting endpoint path during development is `/dev/hello`. In this case,
the string `hello` comes from the name of the TypeScript source file.

When you append path segments to the initial path string argument:

```ts title="routes/hello.ts"
export default new RouteMap()
    .get("/world", () => { /* do GET work */ })
```

The resulting URL path during development is `/dev/hello/world`. Appended path
segments can be arbitrarily deep.

You can also use the [source file organization] and [composition] to build the
file URL path for a route.

## Handler function

A Handler parameter is typically provided to `RouteMap` as a function. This
function performs any work required by the route. The function receives a single
`ChiselRequest` parameter and returns the response synchronously (returning the
response directly) or asynchronously (returning a Promise that becomes fulfilled
with the response).

### ChiselRequest parameter

A Handler function may optionally declare that it accepts a `ChiselRequest`
object as its first parameter. `ChiselRequest` is a subclass of the JavaScript
fetch API [Request] class that describes the request that was made by the
caller, including details such as HTTP headers, query string parameters, and
body contents.

```ts
import { ChiselRequest } from "@chiselstrike/api"

export default new RouteMap()
    .get("/world", (req: ChiselRequest) => {
        // req contains information about the request
    })
```


[Request]: https://developer.mozilla.org/en-US/docs/Web/API/Request
[path placeholders]: ./placeholders
[source file organization]: ./advanced-route-definitions#source-file-organization
[composition]: ./advanced-route-definitions#composition
