# BhuMitra

BhuMitra is a National Land Governance Research and Policy Innovation Platform prototype for India. It includes a research library, land intelligence view, policy lab, collaborative workspaces, and an innovation hub.

## Run locally

```bash
npm install
npm run dev
```

The app works in demo data mode without external services.

## Connect Supabase

1. Create a project at [supabase.com](https://supabase.com/).
2. Open the Supabase SQL Editor and run [`supabase/schema.sql`](supabase/schema.sql).
3. Copy `.env.example` to `.env.local`.
4. Add the project URL and anon key:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

5. Restart the Vite server.

The client reads resources, policy experiments, innovation calls, and saved resources through Supabase. If the environment variables are missing, the app automatically uses demo data so the interface remains usable.

## Deploy to Vercel

Use the Vite defaults:

```text
Build command: npm run build
Output directory: dist
```

Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` under Vercel Project Settings > Environment Variables before deploying.

## Validation

```bash
npm run lint
npm run build
```
