# Advanced route definitions

In order to give you more flexibility in how you organize your source code for
routes, you can use [source file organization](#source-file-organization) and
[composition](#composition) to build the final URL path for your routes.

## Source file organization

You can use files and subdirectories under `routes` to specify similarly
structured URL path patterns. The names of the file paths are used to build the
final path pattern for exported routes in those files.

### Example files mapped to URL paths

The following are example directory structures nested under `routes` along with
their resulting path patterns:

| File under `routes` | URL path pattern |
| --- | --- |
| `index.ts` | `/` |
| `books.ts` | `/books` |
| `books/index.ts` | `/books` |
| `books/chapters.ts` | `/books/chapters` |

:::note

Similar to nodejs modules, source files named `index.ts` have a special meaning
that is not interpreted literally like other directories and files.

:::

When defining a route in a nested subdirectory, the resulting URL path pattern
becomes a prefix for any additional paths defined in the RouteMap exported by
the source file.

For example, given this source file in `routes/foo/bar.ts`:

```ts title="routes/foo/bar.ts"
export default new RouteMap()
    .get("/baz", () => { /* ... */ })
```

The file and directory yield a URL path prefix of `foo/bar`, and the path
argument in the RouteMap declaration appends `/baz` to that. As such, the
handler function will be invoked when a request's URL path during development is
`/dev/foo/bar/baz`.

### Placeholders in file names

Similar to how [placeholders] work when defining a RouteMap, you can name source
files to indicate named placeholders that match variable values from a
requests's URL path. Use file and directory names enclosed with square brackets
to define these placeholders.

| File under `routes` | Equivalent route with placeholders |
| --- | --- |
| `books/[id].ts` | `/books/:id` |
| `books/[id]/chapters.ts` | `/books/:id/chapters` |
| `books/[id]/chapters/[cid].ts` | `/books/:id/chapters/:cid` |

With the above examples, the source files and directories named `[id]` and
`[cid]` are equivalent in function to placeholder strings passed to RouteMap,
and their runtime values can be read from `ChiselRequest` using the `params`
property.

## Composition

You can assemble a RouteMap using other nested RouteMaps using the `prefix()`
method. This allows you to "mount" a child RouteMap at a named URL path prefix
of a parent RouteMap. This works similarly to source file organization described
previously. You can duplicate the effect of the example in the prior section
like this:

```ts title="routes/foo.ts"
const barMap = RouteMap()
    .get("/baz", () => { /* ... */ })

export default new RouteMap()
    .prefix("/bar", barMap)
```

In this route, the URL path is still `/dev/foo/bar/baz` like the prior example.
`foo` comes from the name of the source file, `bar` comes from the name of the
prefix of the RouteMap exported by `foo.ts`, and `baz` comes from the route path
of the nested `barMap`.

[placeholders]: ./placeholders
