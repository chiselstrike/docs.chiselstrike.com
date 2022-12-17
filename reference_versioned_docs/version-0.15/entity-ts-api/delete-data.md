# Delete data

To delete entity instances, use the static function `delete()` on the entity
class. It accepts a [restrictions object] that describes the instance(s) to
delete and returns a promise indicating when the operation is complete.

To delete an entity instance with a specific ID:

```ts
await BlogPost.delete({
    id: "[UNIQUE ID]"
})
```

To delete all entity instances that have a specific value for both `author` and
`hidden` properties:

```ts
await BlogPost.delete({
    author: "Me",
    hidden: true
})
```


[restrictions object]: ./matching-entities#restrictions
