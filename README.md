# Karachi Computer

Implement exactly the screenshot and nothing else

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/7f53dcc2-ca9f-47cb-961f-5bcbca7471ac).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Supabase catalog

The storefront reads its catalog from the public `categories` and `products`
tables. Copy `.env.example` to `.env` and set `VITE_SUPABASE_URL` and
`VITE_SUPABASE_KEY` to your Supabase project URL and publishable key. Never put
a Supabase `service_role` key in a `VITE_` variable or browser code.

Apply the SQL in
[`supabase/migrations/20261119000000_catalog.sql`](./supabase/migrations/20261119000000_catalog.sql)
in the Supabase SQL Editor. It creates the tables, indexes, public read-only
Row Level Security policies, and starter catalog rows. The app maps those
rows through `src/lib/catalog-api.ts`; if Supabase is not configured or a
request fails, it reports the error and keeps the bundled demo catalog
available. Provide public image URLs in `categories.image_url` and
`products.image_urls` to use uploaded product images.
