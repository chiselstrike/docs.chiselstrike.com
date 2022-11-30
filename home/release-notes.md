# Release notes

## 0.14 (November 29, 2022) {#0.14}

### API changes

- Improvements to the query API to provide a MongoDB-like syntax for filtering
  entities with arbitrarily complex conditions. See the documentation for
  [filter expressions](/reference/entity-ts-api/matching-entities#filter-expression).

- Preview: Kafka event publishing support. See [this
  example](https://github.com/chiselstrike/chiselstrike-examples/pull/13).

- Preview: Policies written in TypeScript that allow you to specify rules for
  data creation, access, and filtering. See [this
  blog](https://blog.chiselstrike.com/why-middleware-may-not-be-the-right-abstraction-for-your-data-policies-daf8a0c2172f)
  for more information.

### Internal changes

- Deno upgraded to v1.26.2.


## 0.13.2 {#0.13.2}

### chiseld changes

- Add a `--secrets-polling-period-s` TIME option to chiseld that can be used to
  reduce polling load on some systems.


## 0.13.1 {#0.13.1}

### chiseld changes

- Don't fail server startup if the events directory is missing.

### CLI changes

- Make create-chiselstrike-app generate an events directory with .gitkeep.


## 0.13 (October 20, 2022) {#0.13}

### API changes

- **BREAKING CHANGE:** The endpoint API has been replaced with an improved
  routing API. The now a `RouteMap` API supports path-based parameters and
  allows you to specify routes by HTTP method and path. See the
  [documentation](/reference/routing/) for details.

- Entities now support indirect entity relationship references using the `Id`
  type. Indirect references store the string ID of the referred entity and are
  not eagerly loaded.

- Entities now support native JavaScript `Date` objects for properties.

- Feature preview of TypeScript policies.

### CLI changes

- The `create-chiselstrike-app` tool now generates a `Dockerfile` for building
  Docker images of your ChiselStrike application. This is useful for deployment
  to Kubernetes, Fly.io, and others services that accept containers.

### Internal changes

- Fixed Node.js compatibility issues. Many `npm` packages such as Axios
  resulted in errors such as `Error: Dynamic require of "buffer" is not
  supported` on ChiselStrike. The problem is now fixed with Deno's Node
  polyfills imported into the ChiselStrike runtime.

- Deno upgraded to v1.25.4.

- The runtime has had significant re-work under the hood, which is a
  prerequisite for improving stability and performance.
