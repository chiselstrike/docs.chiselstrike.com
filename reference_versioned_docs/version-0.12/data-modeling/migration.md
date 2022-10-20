# Migration

As your application changes and grows, it is common to want to modify entity
definitions to better suit the requirements of the application. ChiselStrike
performs these migrations for you, under the constraints in this section.

:::warning

Migrations are permanent and their effects cannot be reversed. Take special care
when removing entities and properties.

:::

## ✅ Allowed: Adding an entity

Adding a new entity is always allowed.

## ✅ Allowed (conditionally): Removing an entity

Removing an entity is allowed only if there are no instances of that entity.

### When developing locally

When `chiseld` detects that an entity is missing from your model, by default, it
will not perform the deletion if there are any instances of that entity.
Instead, it will warn with the following message:

```
Trying to remove models from the models file, but the following models still have data:

        [YOUR-ENTITY] ([N] elements)

To proceed, try:

   'npx chisel apply --allow-type-deletion' (if installed from npm)

or

   'chisel apply --allow-type-deletion' (otherwise)
```

Running the given command will instruct `chiseld` to restart and apply the
entity deletion.

## ✅ Allowed: Removing an optional or default-valued property

Removing an [optional property] or [default-valued property][default property]
is fully destructive to the property to all entity instances. `chiseld` will not
warn as described above when removing an entity.

## ✅ Allowed: Adding a new optional or default-valued property

You may add properties only if ChiselStrike can ensure that any and all existing
entity instances are valid with the new definition.

## ❌ Disallowed: Adding a new required property

You may not add a [required property], as ChiselStrike would not be able to
determine what the value should be for any existing instances.

## ❌ Disallowed: Removing a required property

You may not remove a [required property]. Attempting to do so will cause
`chisel` to yield a message:

> unsafe to replace type: [YOUR-ENTITY]. Reason: non-optional field [YOUR-FIELD] doesn't have a default value, so it is unsafe to remove

## ❌ Disallowed: Adding uniqueness to an existing property {#adding-uniqueness}

If an entity property was first declared and used without `@unique`, it is not
allowed to add uniqueness to it later. ChiselStrike would not know what to do if
uniqueness on that property was already violated in the existing entity
instances, and what to do to resolve it. An attempt to run `chiseld` in this case
will yield the following error during migration:

> unsafe to replace type: [ENTITY-NAME]. Reason: adding uniqueness to field
> [FIELD-NAME]. Incompatible change

A possible workaround involves performing a manual migration with the following
steps:

1. Add a new replacement property with `@unique`
1. Query for all entities, iterate the results, and copy the old property value
   to the new property.
1. Decide what to do with any uniqueness violations as they occur.


[required property]: ./entity-basics#required-property
[optional property]: ./entity-basics#optional-property
[default property]: ./entity-basics#default-property
