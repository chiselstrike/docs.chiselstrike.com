# Step 4: Define an entity

The endpoints you learned about in the previous step give you flexibility to
implement whatever behavior you want for client HTTP requests. However, for
reading and writing application data, ChiselStrike provides an easy way to build
an API that performs [CRUD][2] (Create, Read, Update, Delete) operations on
entities you define. The only thing you are required to do is write TypeScript
classes to express your data model.

Here is code for a sample entity:

```ts title="my-backend/models/BlogPost.ts"
import { ChiselEntity } from "@chiselstrike/api"

export class BlogPost extends ChiselEntity {
    author: string = "Anonymous"
    content: string
    publishedAt: number
    hidden: boolean
}
```

In your ChiselStrike project, create a new file in the existing models directory
and call it `BlogPost.ts`. Copy the above code into it and save the file. Upon
saving the file, `chiseld` will automatically restart and pick up the new
entity. You can verify this in its output:

```
Model defined: BlogPost
```

Let's break down some of the details of what you see here.

## @chiselstrike/api module

This nodejs module exports the API used to define and operate the backend
services provided by ChiselStrike. In this sample, you are only using
`ChiselEntity` to define a single entity.

## `ChiselEntity`

This is the base class for all entities that you define.  `ChiselEntity`
provides a number of functions for working with the entity programmatically.
Later in this tutorial, you will see how ChiselStrike can automatically generate
a CRUD API using the definition of an entity.

## `export class BlogPost`

You must export any `ChiselEntity` classes from TypeScript source files in the
models directory in order for ChiselStrike to recognize and work with them. The
name of the class is used to build the path of the generated CRUD API.

## Property types

This example uses three different types of properties, which are standard primitive
TypeScript `string`, `number`, and `boolean`. ChiselStrike also allows arrays of
these types.

## Default values

The `author` property defines a default value of "Anonymous". This value will be
used by ChiselStrike when adding an instance of this entity when no value was
provided. ChiselStrike also allows TypeScript [optional properties][1] for
fields that don't require a value at all.


[1]: https://www.typescriptlang.org/docs/handbook/interfaces.html#optional-properties
[2]: https://en.wikipedia.org/wiki/Create,_read,_update_and_delete
