# Epic0-chore-04: Bootstrap Verification

## Objective
Verify `docker compose up --build` produces zero console errors across all 3 services (database, backend, frontend).

## Prerequisites
- Epic0-chore-01 (env vars) — `[ACTIVE]`
- Epic0-chore-02 (data adapter) — `[ACTIVE]`
- Epic0-chore-03 (content types) — `[MERGED]`

## Steps

### 1. Clean build and start
```bash
docker compose up --build -d
```

### 2. Verify database service
- Healthcheck passes (`container_healthy`)
- No connection errors in logs
- Postgres ready to accept connections

### 3. Verify backend service
- Strapi builds without compilation errors
- Admin panel accessible at `http://localhost:1337/admin`
- Public API responds:
  ```bash
  curl -s http://localhost:1337/api/articles | head -c 200
  # → 200 { "data": [], "meta": { "pagination": { ... } } }
  ```

### 4. Verify frontend service
- Astro dev server starts without errors
- Page renders at `http://localhost:4321`
- No module resolution failures

### 5. Cleanup
```bash
docker compose down
```

### 6. Update backlog
- Set Epic0-chore-04 status: `[DRAFT]` → `[ACTIVE]`

## Verification
```bash
docker compose ps                    # all 3 services "Up"
docker compose logs database         # no errors
docker compose logs backend          # no Strapi errors
docker compose logs frontend         # no Astro errors
curl -s -o /dev/null -w "%{http_code}" http://localhost:1337/api/articles  # 200
curl -s -o /dev/null -w "%{http_code}" http://localhost:4321               # 200
```

## Files Affected
- `docs/backlog.md` (edit — status change)
- `docs/plans/Epic0-chore-04.md` (create — this file)
