---
description: Learn how to start the ChiselStrike local server (chiseld) for development and testing.
keywords: [ChiselStrike, documentation, tutorial, chiseld]
---

# Step 2: Start the ChiselStrike local server

After creating a project with `create-chiselstrike-app`, you can start building
locally with the provided ChiselStrike CLI.  Start the local server `chiseld` in
development mode by running the provided npm dev script:

```bash
npm run dev
```

The output will look similar to this:

```
> my-backend@1.0.0 dev
> chisel dev

🚀 Thank you for your interest in the ChiselStrike beta! 🚀

⚠️  This software is for evaluation purposes only. Do not use it in production. ⚠️

📚 Docs:    https://docs.chiselstrike.com
💬 Discord: https://discord.gg/4B5D7hYwub
📧 Email:   beta@chiselstrike.com

For any question, concerns, or early feedback, please contact us via email or Discord!

[date-time] INFO - ChiselStrike server is ready 🚀
[date-time] INFO - URL: http://127.0.0.1:8080
[date-time] INFO - URL: http://[::1]:8080
[date-time] INFO - Version "dev" is ready
```

From the output, you can see that `chiseld` runs with a base endpoint URL of
http://127.0.0.1:8080 (localhost).  You will use this to access any routes and
REST APIs while you build locally.

:::tip

`chiseld` will not terminate until you choose to do so by typing CTRL-c in the
shell. You will need to open a second shell in order to run curl commands to
complete this tutorial.

:::

The generated project includes a sample `hello` route in the routes directory:

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

Routes allow you to write code to handle HTTP requests at a URL specific path.
The above code defines a route that handles both HTTP GET and POST requests.

You can use curl to invoke the route with a GET request. Open another shell and
run the command:

```bash
curl localhost:8080/dev/hello
```

The route responds with a plain text "hello world":

```
hello world
```

In the next step, we'll discuss routes in more detail.
