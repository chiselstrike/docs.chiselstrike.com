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

[date-time] INFO - RPC is ready. URL: 127.0.0.1:50051
[date-time] INFO - ChiselStrike is ready 🚀 - URL: http://localhost:8080
End point defined: /dev/hello
```

From the output, you can see that `chiseld` runs with a base URL of
http://localhost:8080.  You will use this to access any endpoints and REST APIs
while you build locally.

:::tip

`chiseld` will not terminate until you choose to do so by typing CTRL-c in the
shell. You will need to open a second shell in order to run curl commands to
complete this tutorial.

:::

The generated project includes a sample `hello` endpoint in the endpoints
directory:

```ts title="my-backend/endpoints/hello.ts"
export default async function (req: Request): Promise<string> {
    return await req.text() || "hello world";
}
```

Endpoints allow you to write code to handle HTTP requests at a URL specific
path.

You can use curl to invoke the endpoint.  It will return "hello world", or
whatever payload it received from the request. Open another shell and run the
command:

```bash
curl localhost:8080/dev/hello
```

The endpoint return the default "hello world" string as JSON:

```json
"hello world"
```

In the next step, we'll discuss endpoints in more detail.
