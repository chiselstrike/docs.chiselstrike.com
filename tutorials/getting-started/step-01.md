---
description: Learn how to create a project workspace to contain your code and configuration using create-chiselstrike-app.
keywords: [ChiselStrike, documentation, tutorial, create-chiselstrike-app]
---

# Step 1: Create a project workspace

Open a shell. Check the version of node to ensure that you're using at least
14.18.0:

```bash
node --version
```

Change to the directory where you want to create the project. Run the following
command:

```bash
npx create-chiselstrike-app@0.15.0 my-backend
```

:::tip

Throughout ChiselStrike documentation you can copy a code sample by clicking the
copy icon as you hover the mouse over the sample.

:::

`my-backend` is the name of directory that will be created in the current
directory.  You will see output that looks similar to this:

```
Creating a new ChiselStrike project in /your/path/my-backend ...
Installing packages. This might take a couple of minutes.

added 27 packages, and audited 28 packages in 7s

3 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

The command will create a project structure like this:

```
my-backend
├── Chisel.toml
├── Dockerfile
├── README.md
├── events
├── models
├── node_modules
├── package-lock.json
├── package.json
├── policies
├── routes
│   └── hello.ts
└── tsconfig.json
```

Take a quick look at the parts of the project that are not standard nodejs:

- **Chisel.toml**: This file contains the ChiselStrike configuration. For this
  tutorial, you will not modify this file.
- **events, models, policies, routes**: ChiselStrike uses the code in these
  directories for your backend. You will populate these folders with code for
  ChiselStrike to run.
- **tsconfig.json**: This file contains the project's TypeScript configuration.
  For this tutorial, you will not modify this file.

Open package.json and you will see that two ChiselStrike dependencies and two
scripts are already added to the project.

```json title="package.json"
    "scripts": {
        "dev": "chisel dev",
        "type-check": "tsc"
    },
    "dependencies": {
        "@chiselstrike/api": "0.15.0",
    },
    "devDependencies": {
        "@chiselstrike/cli": "0.15.0"
    }
```

- `@chiselstrike/cli` provides the ChiselStrike CLI used during development. Its
  most important feature is `chiseld`, the ChiselStrike server.
- `@chiselstrike/api` provides the runtime API for interacting programmatically
  with `chiseld` in your project.
