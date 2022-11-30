# Response types

Routes may return various types of data to the caller. The return type of the
handler function determines what the caller will receive.

## JSON

A Handler function may return any of the following types to be serialized as
JSON, or any JavaScript object that has a `toJSON()` method:

- object
- array
- [Map]
- [Set]

For Map type objects, the key must a string, and values may be any of the above
JSON-compatible types.

For all of these data types, the content type of the response is
`application/json`.

## string

When a handler function returns a string, it returns that string unmodified in
the response body with content type `text/plain`.

## Response (fetch API) {#response}

To fully customize the response, return a [Response] object. For example, the
following route will return an HTTP status code 400 (bad request) with a plain
text message.

```ts
export default new RouteMap()
    .get("/", function (): Response {
        return new Response("Oops", { status: 400 })
    })
```


[Map]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
[Set]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
[Response]: https://developer.mozilla.org/en-US/docs/Web/API/Response
