---
title: ChiselStrike documentation
description: Detailed documentation about ChiselStrike APIs and configuration
keywords: [ChiselStrike, documentation, API]
pagination_next: null
---

# Welcome to ChiselStrike!

ChiselStrike is a code-driven solution that enables you to quickly build and
deploy your application’s backend. Use TypeScript to define your data model, and
we will create and a scalable, serverless, secure backend. Build and test
locally with our CLI, then deploy to our cloud simply by pushing to a GitHub
branch.

ChiselStrike integrates easily with [Gatsby][gatsby], [Next.js][nextjs], or any
of your preferred Jamstack frameworks. You can also use it standalone to build a
backend for any application.

## Features

- Automatic generation of a fully-functional CRUD API. You just define the
  entity model with TypeScript classes. The API can be customized to meet
  specific needs.
- Create your own API endpoints with custom code.
- End user authentication supported with [NextAuth.js][nextauth].
- Data policy definitions with field- and user-level granularity.

## Develop locally, deploy globally

Local development is facilitited with the ChiselStrike CLI, which runs a server
`chiseld` on your machine. When you are satisfied with the way your backend
works locally, you can configure ChiselStrike to observe a GitHub repository,
and simply push the project code to your production branch to deploy it.

ChiselStrike's managed service handles scaling, upgrades, security, and data
persistence. You invest nothing into traditional DevOps activities.

:::note

The ChiselStrike managed backend service is currently in beta.

:::

## Ready to get started?

- We recommend beginning with the [Getting Started tutorial][gs-tutorial], which
  provides step-by-step instructions to build and deploy your first ChiselStrike
  project.
- Read the [reference documentation][reference] for details on how the product
  works.
- Join our [Discord][discord] to chat with the team and others using
  ChiselStrike.


[gatsby]: https://www.gatsbyjs.com/
[nextjs]: https://nextjs.org/
[nextauth]: https://next-auth.js.org/
[gs-tutorial]: /tutorials/getting-started/
[reference]: /reference/
[discord]: https://discord.gg/GHNN9CNAZe
