# centivo-take-home-technical-challenge

## Installation

1. Install the dependencies.
2. Add the `MONGO_URI` to the `.env` file.
3. Run `node index.mjs`.
4. GET `/users/:id`.

## Approach

I use object destructuring to get the `id` route parameter and check if it's a valid ObjectId before making the query. We return 404 if `findOne()` returns `null` or if the user's age is 21 or below.
