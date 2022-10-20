# Data modeling

Data modeling is the process of designing the structure and contents of
persistent data in your application. With ChiselStrike, you express the data
model using one or more entities defined by TypeScript classes.

## Automatically generated CRUD API {#crud-api}

After defining an entity using a subclass of `ChiselEntity` and declaring an
endpoint using the `crud()` function on that entity, ChiselStrike will
[automatically generate a CRUD API][crud-api] that provides read and write
access to the data represented by that entity. The API includes query operations
that allow [filtering, sorting, ordering, and limiting query
results][query-api]. This CRUD API is commonly used in Jamstack projects at
build time to prerender dynamic content, or in frontend code to dynamically
query entities in response to user activity in the app.

## TypeScript API {#typescript-api}

Subclasses of `ChiselEntity` inherit an API that provides read and write access
to use in your backend endpoint code. This avoids the need for your endpoint to
make HTTP requests to the generated CRUD API, which is inefficient.


[crud-api]: ../entity-crud-api/
[query-api]: ../entity-crud-api/filter-order-limit-query