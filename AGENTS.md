<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## What this is

Single Next.js 16.3 App Router app (Carbonsynq carbon-accounting SaaS) at `src/app`, path alias `@/* -> ./src/*`. It is a **frontend only**: there is no `src/app/api`, no server actions, and `npx next build` prerenders every route as static. The real backend is a separate service; this repo only talks to it over REST from the browser.

## Commands

```bash
npm run dev            # next dev
npm run build          # next build (also typechecks)
npm run lint           # bare `eslint` -> lints "." via flat config
npx tsc --noEmit       # typecheck only (there is no `typecheck` script)
```

Verification order: `npm run lint` then `npx tsc --noEmit`. All three pass clean on a clean tree, so treat any new failure as yours.

No tests, no test runner, no CI (`.github/` does not exist), and no formatter (no Prettier). Don't invent a test command or add a formatter config.

- `eslint.config.mjs` is the **only** live ESLint config. The legacy `.eslintrc.json` is dead — ESLint 9 ignores it. Put rule changes in `eslint.config.mjs`.
- `no-explicit-any`, `no-unused-vars`, `react-hooks/exhaustive-deps`, and `react-hooks/set-state-in-effect` are all **off**. Lint will not catch unused imports or loose `any`; both are pervasive and accepted here.

## Data layer (`src/lib/api.ts`)

Single hand-rolled fetch wrapper. Read it before touching any page data.

- Base URL: `process.env.NEXT_PUBLIC_API_URL`, default `http://localhost:5000/api/v1`. It is the only env var the app reads, and **no `.env` / `.env.example` is committed** — create `.env.local` yourself to point at a backend.
- Add new endpoints as new exported functions here, not as ad-hoc `fetch` calls in components. Follow the existing shape: read scope from localStorage, then call `fetchAPI`.
- `fetchAPI` reads the JWT from `localStorage.token` and sends `Authorization: Bearer`. It reads the body defensively and throws on `401` / `!ok`, so callers get a plain `Error` with the backend `message`.

### localStorage is the tenancy scope — and it is never written

`universityId` and `reportingPeriodId` are read from localStorage by nearly every API call, but **no code in this repo ever writes them** (only `token` and `user` are written, by `AuthContext`; onboarding writes its own `carbonsynq_onboarding_v1` key). Out of the box every request goes out as `universityId=` and pages render empty. To exercise a page, set `localStorage.universityId` (and `reportingPeriodId`) by hand in devtools. Don't "fix" this by inventing a new source of truth for the id.

### The dashboard lies when the backend is down

`useDashboard` (`src/hooks/useDashboard.ts`) catches **any** error *and* any `response.success === false`, then silently swaps in fixtures from `src/lib/demo-data.ts`. A broken or missing backend still renders a full-looking dashboard. Never treat "the dashboard looks right" as proof the API works — check the network tab. Note `mapBackendToFrontend` also hardcodes `scope3: 0` ("backend doesn't return scope 3 trends right now"), and the hook's `error` state is never set to anything.

### Unused deps: do not build on these

`@supabase/ssr`, `@supabase/supabase-js`, `@neondatabase/auth`, and `dotenv` are in `package.json` but imported **nowhere** in `src`. Auth was migrated to the V2 REST backend's JWT flow; the Supabase/Neon entries are leftovers. Don't reach for them, and don't assume Supabase is the datastore.

## Auth and route protection

Client-side only. There is no `middleware.ts` / `proxy.ts`, and no server-side session.

- `src/context/AuthContext.tsx` exposes `useAuth()`: `token` + `user` in localStorage, hydrated in a `useEffect`, so it is `loading: true` on first paint. `login` / `register` hit `/auth/login` and `/auth/register`.
- **Two different `ProtectedRoute` components exist.** Use `@/components/auth/ProtectedRoute` for new pages — it takes an optional `allowedRoles` prop. Only four routes are actually guarded today (`documents`, `settings`, `emission-factors`, `activity-data/import`); the rest of the app pages, including `/dashboard` and all of `/admin`, are unguarded. The other component, `@/components/ProtectedRoute`, is imported but **not rendered** by both `src/app/dashboard/page.tsx` and `src/components/dashboard/Dashboard.tsx` — dead code that lint won't flag. Because the guard is a client component, even the guarded pages still ship their markup to unauthenticated visitors.

## Conventions

- Pages under `src/app/<route>/` are `"use client"` components holding their own `useState`/`useEffect` data loading. Don't convert one to a server component expecting server-side data — there is no server data source. Server components are only used for static marketing/legal pages that just export `metadata`.
- **Icons: two libraries are in active use.** `@phosphor-icons/react` (most of the app) and `lucide-react` (mostly `onboarding/` and `select.tsx`). Match whichever library the file already imports; don't introduce a third.
- Styling is Tailwind v4 with **no `tailwind.config.js`** — the theme is CSS-first in `src/app/globals.css` (`:root` custom properties mapped through `@theme inline`). Add or change design tokens there. Brand values: accent `#188f8b`, accent-deep `#0d4f4b`, ink `#0b1f1e`, background `#fbfcfa`.
- `src/app/onboarding/` is self-contained: `_components` / `_data` / `_lib` / `_types` underscore folders hold private modules, and the route imports its own `onboarding.css`. Persistence goes through `@/lib/storage` (`getStorageItem` / `setStorageItem`), which JSON-serializes values — unlike `token` / `user`, which are written as raw JSON strings directly.
- Fonts are DM Sans + DM Serif Display via `next/font/google`, exposed as `--font-dm-sans` / `--font-dm-serif-display` in `src/app/layout.tsx`. The Cal.com embed (`src/components/sections/CalCom/page.tsx`) is hardcoded to the `book-a-demo` namespace at `https://cal.com/carbonsynq/book-a-demo` — not env-driven.
