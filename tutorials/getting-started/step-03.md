---
description: Learn about routes and the RouteMap object for writing backend endpoint code in TypeScript.
keywords: [ChiselStrike, documentation, tutorial, route, RouteMap, TypeScript]
---

# Step 3: Understanding routes

The sample route is built using a RouteMap object:

```ts title="my-backend/routes/hello.ts"
import { ChiselRequest, RouteMap } from "@chiselstrike/api";

export default new RouteMap()
    .get("/", function (): string {
        return "hello world";
    })
    .post("/", async function (req: ChiselRequest): Promise<unknown> {
        return await req.json();
    });
```

Let's break down some of the details of what you see here.

## File name

Route code always goes in your project's `routes` directory, which was defined
in the project's Chisel.toml. The name of the file defines the URL path of the
route.  During local development with the ChiselStrike CLI, the presence of
`routes/hello.ts` creates an endpoint URL path of `/dev/hello`.

## Default export

The route file is understood to implement a node module that exports a single
`RouteMap` object that defines the behavior of the route.

## HTTP methods and paths

The route can specify behavior for different HTTP methods. This route defines
behavior for GET and POST using `get()` and `post()` methods with a path to
append to the base endpoint URL path of `/dev/hello`. In this case, `/`
specifies no additional path components to append.

## Handler functions

`get()` and `post()` accept a function that implements the behavior of the
route.

### ChiselRequest parameter

Handler functions are passed a `ChiselRequest` which describes the client's
request. It is a subclass of [Request][1] from the standard web [fetch API][2].
It contains all of the data sent by the client's HTTP request.

### Sync or async

The exported function may return immediately with the response to send, or it
may return a Promise that becomes fulfilled with the data to send back to the
client.


[1]: https://developer.mozilla.org/en-US/docs/Web/API/Request
[2]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
