This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Demo accounts

Sign in at `/login`. These are test accounts in Supabase Auth; the role of each is in the `profiles` table. The admin is the store owner; a client is a customer.

| Role | Email | Password | Can do |
|---|---|---|---|
| admin | `admin@tindahan.test` | `tindahan-admin` | See customers, add a customer, add dues and payments |
| client | `client@tindahan.test` | `tindahan-client` | See customers and their dues and payments |

Anyone can create an account on the login page, and it is always a `client`. There is exactly one admin: the database refuses a second `profiles` row with the role `admin`.

## API contract, version 1

Every route answers `401` when it does not know the user. Send the session cookie (browser) or `Authorization: Bearer <access token>` (another app).

| Method | Route | Who | Body | Answers |
|---|---|---|---|---|
| GET | `/api/me` | signed in | | `200` `{ id, email, role }` |
| GET | `/api/customers` | signed in | | `200` list of `{ id, name, balance, lastPaid }` |
| POST | `/api/customers` | admin | `{ name, balance }` | `201` the new customer, `400` `{ message }`, `403` |
| GET | `/api/customers/:id` | signed in | | `200` one customer, `404` |
| GET | `/api/customers/:id/entries` | signed in | | `200` list of `{ id, customerId, kind, amount, createdAt }` |
| POST | `/api/customers/:id/entries` | admin | `{ kind: "due" or "payment", amount }` | `201` the new entry, `400` `{ message }`, `403`, `404` |
