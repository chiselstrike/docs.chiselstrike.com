# Step 3: Understanding endpoints

The sample endpoint code is implemented as a simple TypeScript function:

```ts title="my-backend/endpoints/hello.ts"
export default async function (req: Request): Promise<string> {
    return await req.text() || "hello world";
}
```

Let's break down some of the details of what you see here.

## File name

Endpoint code always goes in your project's `endpoints` directory, which was
defined in the project's Chisel.toml. The name of the file defines the URL path
of the endpoint.  During local development with the ChiselStrike CLI, the
presence of `endpoints/hello.ts` creates an endpoint path of `/dev/hello`.
Notice in the output from `chiseld` indicates that it recognized this endpoint:

```
End point defined: /dev/hello
```

## Default function export

The endpoint file is understood to implement a node module that exports a single
default function to invoke for each incoming HTTP request to the endpoint path.

## async / returned Promise

The exported function must return a Promise that becomes fulfilled with the data
to send back to the client. In the sample function, the data is a string, and it
will be serialized as a JSON string. The function could alternatively return a
promise that becomes fulfilled with an object, which would be serialized as a
JSON object.

## Request parameter

The function accepts a single `ChiselRequest` parameter which describes the
client's request. It is a subclass of [Request][1] from the standard web [fetch
API][2]. It contains all of the data sent by the client's HTTP request.


[1]: https://developer.mozilla.org/en-US/docs/Web/API/Request
[2]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
