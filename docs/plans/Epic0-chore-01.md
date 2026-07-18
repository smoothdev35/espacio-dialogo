# Epic0-chore-01: Environment Variable Hygiene

## Objective
Clean up env var definitions across the full stack — sync `.env.example` files with reality, add missing vars, rename frontend var for convention, and add TypeScript types for frontend.

## Changes

### 1. Backend `.env.example` — trim noise
- Remove `BROWSER=none` (Strapi internal, not consumed in project code)
- Remove `JWT_SECRET` (not consumed anywhere in project; Strapi loads internally)
- Keep everything else — correct for Postgres

### 2. Root `.env.example` — new file
- Document the 5 `DB_*` vars from `docker-compose.yml` that drive the Postgres container.
- These are only consumed in `docker-compose.yml`, not in backend code.

### 3. Frontend env vars — rename and add
- `frontend/.env`: rename `PUBLIC_STRAPI_API_URL` → `PUBLIC_STRAPI_URL`, add `STRAPI_URL`
- `frontend/.env.example`: same changes (template stays in sync)
- Rationale: `_API_` is redundant (Strapi is an API). Astro docs use short naming like `PUBLIC_POKEAPI`.

### 4. Frontend `src/env.d.ts` — TypeScript types
- Extend `ImportMetaEnv` with typed `PUBLIC_STRAPI_URL` and `STRAPI_URL`
- Enables IntelliSense in Astro frontmatter and client code

### 5. Backlog update
- Update Epic0-chore-01 description to reflect actual deliverables
- Set status to `[ACTIVE]`

## Files Affected
- `backend/.env.example` (edit)
- `.env.example` (create)
- `frontend/.env` (edit)
- `frontend/.env.example` (edit)
- `frontend/src/env.d.ts` (create)
- `docs/backlog.md` (edit)
- `docs/plans/Epic0-chore-01.md` (this file — create)

## Verification
- `docker compose config` confirms `DB_*` vars resolve from root `.env`
- Frontend builds with `astro build`— no TS errors on `import.meta.env`
