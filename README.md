# share-link-frontend

Modern Next.js landing page for Share Link, an Instagram comment reply and DM automation product.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Shards UI CSS kit
- Framer Motion

## Getting started

```bash
npm install
npm run dev
```

The frontend runs on `http://localhost:3001` so the backend can use port `3000`.

Create `.env.local` when the API URL differs from the local default:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
```

API calls live under `lib/api` by backend domain. Components should call providers or domain API functions instead of using `fetch` inline.
