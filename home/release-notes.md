# Release notes

## 0.13 (October 20, 2022)

### API changes

- ✨ **BREAKING CHANGE:** The endpoint API has been replaced with an improved
  routing API. The now a `RouteMap` API supports path-based parameters and
  allows you to specify routes by HTTP method and path. See the
  [documentation](/reference/routing/) for details.

- ✨ Entities now support indirect entity relationship references using the `Id`
  type. Indirect references store the string ID of the referred entity and are
  not eagerly loaded.

- ✨ Entities now support native JavaScript `Date` objects for properties.

- ✨ Feature preview of TypeScript policies.

### CLI changes

- ✨ The `create-chiselstrike-app` tool now generates a `Dockerfile` for building
  Docker images of your ChiselStrike application. This is useful for deployment
  to Kubernetes, Fly.io, and others services that accept containers.

### Internal changes

- 🐛 Fixed Node.js compatibility issues. Many `npm` packages such as Axios
  resulted in errors such as `Error: Dynamic require of "buffer" is not
  supported` on ChiselStrike. The problem is now fixed with Deno's Node
  polyfills imported into the ChiselStrike runtime.

- ✨ Deno upgraded to v1.25.4.

- 🛠 The runtime has had significant re-work under the hood, which is a
  prerequisite for improving stability and performance.
