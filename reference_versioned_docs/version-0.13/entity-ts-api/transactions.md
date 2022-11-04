# Transactions

Just before your [route] handler begins execution, a transaction is implicitly
started and affects all use of the TypeScript API documented in this section.
The transaction ensures that all writes during its execution are performed
atomically. The transaction is them implicitly committed when the route returns
successfully. If your code crashes, throws an exception, or returns a rejected
promise, the transaction is rolled back.

In the case where your code returns a Response with streaming output (as opposed
to simply returning the content to send), the transaction will still be
committed after the function returns but before the stream is fully sent. If you
have any entity operations in code that gets executed while the stream is being
sent to the caller, you might observe a crash. As such, all of your database
operations should be complete before you return the Response object from the
handler.

If you require more granular control of transactions, please [reach out to us]
to discuss.

[route]: ../routing/
[reach out to us]: /community
