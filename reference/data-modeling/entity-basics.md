# Entity basics

An entity is defined by creating a subclass of `ChiselEntity`. By default, when
you use `create-chiselstrike-app` to create a scaffold project, a top-level
directory called `models` is created for you, and its relative path is specified
in the `Chisel.toml` manifest. ChiselStrike will scan this directory for
subclasses of `ChiselEntity` and automatically use them to define and manage the
underlying database.

## Extending `ChiselEntity`

Entities should subclass `ChiselEntity` from the `@chiselstrike/api` module.

```ts title="models/YourClass.ts"
import { ChiselEntity } from "@chiselstrike/api"

export class YourClass extends ChiselEntity {
    // your properties here
}
```

- Source files containing entities must be placed in your `models` directory.
- You may export more than one entity per source file, or use multiple source
  files.
- ChiselStrike recognizes an exported class that doesn't extend `ChiselEntity`,
  but you will not be able to create generated CRUD APIs nor use the
  `ChiselEntity` TypeScript API with it. Otherwise it behaves as a normal
  TypeScript class.

## Supported property types

ChiselStrike supports the following types for properties of ChiselEntity
subclasses:

- `string`
- `number`
- `boolean`
- `Date`
- Arrays of the above primitive types (e.g. `string[]`)
- Nested arrays (e.g. `string[][]`)
- Other entity types (see [relationships])

The following is a class that defines one of each supported type:

```ts title="models/AllTypes.ts"
export class AllTypes extends ChiselEntity {
    s: string
    n: number
    b: boolean
    d: Date
    as: string[]
    aan: number[][]
}
```

## Optional properties {#optional-property}

Entity properties may be declared optional using the standard TypeScript
question mark syntax for [optional properties][ts-optional]:

```ts
export class Optionals extends ChiselEntity {
    optString?: string
}
```

## Default property values {#default-property}

Entity properties may provide a default value in the property initializer:

```ts
export class Defaults extends ChiselEntity {
    defaultNumber: number = 42
}
```

You can use any valid TypeScript expressions in the initializer:

```ts
    createdAt: number = Date.now()
```

:::warning

While it is possible to use an arbitrarily complex expression for a default
value, it's recommended not to do so, as it makes your entity definitions more
difficult to read and understand its behavior. We are working on a way to make
it more clear how to enforce constraints and default values at the time an
entity is read or written.

:::

## Required properties {#required-property}

Entity properties are all considered to be required by ChiselStrike unless
marked optional or have an inline default initialized value. If your TypeScript
compiler is set to use [strictPropertyInitialization], it will not allow a
required property to exist without a default value. To bypass the compiler
error, you can use the [definite assignment assertion
operator][definite-assignment] (`!`):

```ts
export class Required extends ChiselEntity {
    reqBoolean!: boolean
}
```

This tells the TypeScript compiler that the property will definitely be assigned
a value, after the object is created (by ChiselStrike) outside of the class and
its constructor.

## Migration

After adding a new entity, it can be changed over time. Not all changes are
allowed. Refer to the section on [migration] for more information.


[ts-optional]: https://www.typescriptlang.org/docs/handbook/2/objects.html#optional-properties
[relationships]: ./relationships
[strictPropertyInitialization]: https://www.typescriptlang.org/tsconfig#strictPropertyInitialization
[definite-assignment]: https://www.typescriptlang.org/docs/handbook/2/classes.html#--strictpropertyinitialization
[migration]: ./migration
