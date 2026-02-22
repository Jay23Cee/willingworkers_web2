# Willing Workers Web

Willing Workers is a Next.js web app for public organization pages and an admin dashboard that manages job postings and admin/moderator access.

## Tech Stack

- Next.js 13 (`app/` router + `pages/api` routes)
- TypeScript
- Prisma + MongoDB
- NextAuth (Google provider)
- Redux Toolkit
- React Query
- SendGrid (resume/application email delivery)
- Sass

## Project Structure

- `app/`: UI routes and client components
- `pages/api/`: API endpoints and NextAuth config
- `prisma/`: schema and Prisma client
- `styles/`: global/component SCSS
- `__test__/`: Jest tests

## Authentication And Authorization

- Sign-in is Google-only.
- Access is allow-list based via `AllowUser` in MongoDB.
- Session role is normalized from DB in NextAuth callback.
- Server-side role checks are enforced on mutating API routes:
  - Admin only: `/api/addAdmin`, `/api/updateUser`, `/api/deleteUser`
  - Admin + Moderator: `/api/addPost`, `/api/editPost`, `/api/deletePost`

## Environment Variables

Create `.env` and `.env.local` (or your deployment equivalents) with:

```env
# Database
DATABASE_URL=

# Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=

# Email
SENDGRID_API_KEY=
SENDGRID_API_EMAIL=

# Auth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
AUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
```

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Generate Prisma client:

```bash
npx prisma generate
```

3. Run development server:

```bash
npm run dev
```

4. Open:

`http://localhost:3000`

## Build And Run

```bash
npm run build
npm start
```

## Testing

```bash
npm test
npm run coverage
```

Type-check:

```bash
npx tsc --noEmit
```

Lint:

```bash
npm run lint
```

## Docker

Build and run using the included `Dockerfile`:

```bash
docker build -t willingworkers-web .
docker run -p 3000:3000 --env-file .env --env-file .env.local willingworkers-web
```

## Notes

- This repo currently keeps a hybrid routing model (`app/` + `pages/api`) intentionally.
- Prisma schema is configured for MongoDB and should not be switched without migration planning.
