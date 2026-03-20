# Eclipse Learners Website

Next.js website for an edtech platform connecting students and mentors with study rooms, automation flows, AI-assisted experiences, and collaborative learning tools.

## Pages

- `/` Home page (logo in navbar points here)
- `/courses`
- `/mentors`
- `/team`
- `/studyroom`

## Admin Profile

- Admin email: `rakibul.rir06@gmail.com`
- Role: `super_admin`
- Source: `src/lib/admin-profile.ts`
- API endpoint: `GET /api/admin/profile`

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Supabase Setup

This project now includes a reusable Supabase foundation for browser, server, and admin usage:

- `src/lib/supabase/browser.ts`
- `src/lib/supabase/server.ts`
- `src/lib/supabase/admin.ts`
- `.env.example`

Create a Supabase project, then copy the keys into a local `.env.local` file:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Keep `SUPABASE_SERVICE_ROLE_KEY` server-only and never expose it in client components.

## Is Supabase Free?

Yes. Supabase has a free tier that is suitable for prototyping and early product development. The free tier has usage, storage, and compute limits, so it is good for building and testing, but you should expect to move to a paid tier once traffic, realtime usage, storage, or auth volume grows.
