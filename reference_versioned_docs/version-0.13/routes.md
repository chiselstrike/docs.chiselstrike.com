# More About Routes

In this section we'll show how to move beyond simple CRUD requests, as shown in
the [Getting started tutorial](/tutorials/getting-started/).

## Full Custom Routes

Being able to just get started very quickly and spawn a CRUD API is great, but
as your project evolves in complexity you may find yourself needing custom
business logic and routes that don't fit neatly into REST workflows. This is
a big advantage of ChiselStrike, since you will be able to express complex
logic, sometimes dealing with multiple models and queries, with a single
roundtrip.

ChiselStrike allows each route file to export a default method implementing
your custom logic. You can return any type you want, either an existing model or
a user-defined type.

For example, here's how you can have a specialized route that returns all posts:

```ts title="my-backend/routes/allcomments.ts"
import { RouteMap } from "@chiselstrike/api";
import { BlogComment } from "../models/BlogComment"

export default new RouteMap()
    .get("/", async function() : Promise<Array<BlogComment>> {
        return BlogComment.findAll()
    });
```

Optionally, your function can take as a parameter a [Request], or the
specialized `ChiselRequest`, a subclass with a few convenience fields added. In
the following example, we can use the `params` property of `ChiselRequest` to
implement path-based finding:

```ts title="my-backend/routes/onecomment.ts"
import { BlogComment } from "../models/BlogComment"
import { ChiselRequest, RouteMap } from "@chiselstrike/api"

export default new RouteMap()
    .get("/:id", async function (req: ChiselRequest) : Promise<BlogComment> {
        const id = req.params.get("id");
        return BlogComment.findOne({id});
    });
```

Ultimately, you can code routes of arbitrary complexity. For example, having a
single route that handles multiple methods, returning either one of your types
or an HTTP [Response]. You can then add whatever logic you want.

:::tip

You can't change data during a `GET` request. Make sure that if you are making
changes to the backend state, they happen under `PUT`, `POST`, or `DELETE`!

:::

Now let's edit our route's code to show off a "full customization" example.

```ts title="my-backend/routes/comments.ts"
import { ChiselRequest, RouteMap, responseFromJson } from "@chiselstrike/api"
import { BlogComment } from "../models/BlogComment"

async function handlePost(req: ChiselRequest): Promise<BlogComment> {
    const payload = await req.json();
    const by = payload["by"] || "anonymous";
    const content = payload["content"];
    return await BlogComment.create({ content, by });
}

async function handleGetOne(req: ChiselRequest): Promise<Response> {
    const id = req.params.get("id");
    const comment = await BlogComment.findOne({id})
    const status = comment ? 200 : 404;
    // notice how now we had to await findOne, as we wanted to build a Response
    return responseFromJson(comment, status)
}

async function handleGetAll(req: ChiselRequest): Promise<Array<BlogComment>> {
    return await BlogComment.findAll();
}

export default new RouteMap()
    .post("/", handlePost)
    .get("/:id", handleGetOne)
    .get("/", handleGetAll);
```

:::tip

Remember how we didn't have to specify an `id` in the model? We can now access
it as `created.id` in the example above. If the object doesn't have an `id`, one
is created for you after `create` or `save`.

:::

:::tip

Notice that right now using `findOne` to access an object that does not exist
returns a null value, rather than raising an error. This may change in the near
future. We do our own explicit error checking in this example.

:::

With this route example, we're now getting to know ChiselStrike's API and
runtime better. Notice how we were able to parse the request under `POST` with
our own custom validation, and then use the `build` API to construct an object
that is then persisted with `save`.

Finally, notice the `responseFromJson` convenience method, which takes a
JavaScript object and serializes it into a `Response` ready to be returned.

Let's now test our route with a POST, and see it works similarly to the
automatic "CRUD" example above.

```bash
curl -X POST -d '{"content": "Fifth comment", "by": "Jill"}' localhost:8080/dev/comments
```

and `curl` should return something like:

```console
{"id":"7190f1c5-7b81-4180-9db5-2d9c6ce17d6d","content":"Fifth comment","by":"Jill"}
```

Now lets fetch the entire list of comments:


```bash
curl -s localhost:8080/dev/comments
```

and we should see something like the following:

```json
{
    "results": [
        {
            "content": "First comment",
            "by": "Jill"
        },
        {
            "content": "Second comment",
            "by": "Jack"
        },
        {
            "content": "Third comment",
            "by": "Jim"
        },
        {
            "content": "Fourth comment",
            "by": "Jack"
        },
        {
            "content": "Fifth comment",
            "by": "Jill"
        }
    ]
}
```


🎉 Nice! You've gone from a simple REST API for learning how to write full
custom routes using the full data model. It's time to explore our API in
greater depth, then you can set out and explore other documentation sections
according to your interests!

## Code sharing between routes

It is common for routes to share more code than just the models. If the
common code is already published as module, the module can be imported directly:

```ts title="my-backend/routes/indented.ts"
import { RouteMap } from '@chiselstrike/api';
import indent from 'https://deno.land/x/text_indent@v0.1.0/mod.ts';

export default new RouteMap()
    .get("/", (req: Request) => "the following is indented" + indent("foo", 16));
```

But for code that is specific to a project and not publicly available, the
module can be placed in a directory next to the routes. By convention that
directory is named lib, but any other name would work. For example:

```ts title="my-backend/lib/hello.ts"
export function hello(): string {
    return "Welcome to ChiselStrike";
}
```

```ts title="my-backend/routes/day.ts"
import { RouteMap } from "@chiselstrike/api";
import { hello } from "../lib/hello.ts";

export default new RouteMap()
    .get("/", async function (req: Request) {
        const msg = hello();
        return new Response(`${msg}\n Have a nice day.`);
    });
```

## CRUD paging

Most of the examples we have used so far used rather small datasets. In the real
world, datasets tend to grow rather quickly and, for example, we can easily
imagine storing thousands of comments. Retrieving them all at once would be
inefficient and usually unnecessary. That's where CRUD's built-in paging comes
into play.

The default page size is set to be 1000 elements. Let's restrict that a bit more
to see how it works:

```bash
curl -g localhost:8080/dev/comments?sort=by&.by~like=Ji%25&page_size=2
```

which gives us

```json
{
    "results": [
        {
            "content": "First comment",
            "by": "Jill"
        },
        {
            "content": "Fifth comment",
            "by": "Jill"
        }
    ],
    "next_page": "/dev/comments?.by~like=Ji%25&page_size=2&cursor=eyJheGV..."
}
```

Apparently, we got a new entry in the response - `next_page`. This is a link
that will take us to the next page of results. You can notice that the `sort`
parameter is gone. That is because it's now embedded in a new parameter `cursor`
in which we encoded how to get to the next page. While you can't modify the
sort, you can freely modify other parameters like filtering or page size.

Based on the parameters, the **cursor will ensure that you will only get
entities that come after the last element on the current page**. This is a very
useful property as it makes sure that you don't get duplicate elements if
insertion happens when transitioning between pages (similarly for deletions).

So let's continue and follow the next_page link:

```bash
curl -g localhost:8080/dev/comments?.by~like=Ji%25&page_size=2&cursor=eyJheGV...
```

```json
{
    "results": [
        {
            "content": "Third comment",
            "by": "Jim"
        },
    ],
    "prev_page": "/dev/comments?.by~like=Ji%25&page_size=2&cursor=GVzIjpe..."
}
```

This gives us the reminder of the results as well as a link to the previous page
that would take us back where we came from. Similarly to the next page
situation, the `cursor` parameter in this case ensures that you will get
elements that come before the first element of current page, in current sort.

### Why cursor-based paging?

Compared to the classical offset-based paging, cursor paging has two main
benefits.

First big advantage is that cursor-based paging is **stable**. This means that
if you do insertions resp. deletions while transitioning between pages, you
won't miss entries resp. won't get duplicates. Those problems can be very
annoying to deal with.

Second advantage is **efficiency**. Paging using the standard offset approach
can be very inefficient when filters are used. The reason for this is that the
database needs to go through all candidate rows and apply the filter until it
finds offset-number of valid entries and only then it starts filling the page.

Cursor-based paging on the other hand leverages the user-specified sort (primary
key sorting is used if no sort is specified) and uses the elements as pivots.
This way we can directly jump to the pivot using index and start filling the
page from there.


[Request]: https://developer.mozilla.org/en-US/docs/Web/API/Request
[Response]: https://developer.mozilla.org/en-US/docs/Web/API/Response
