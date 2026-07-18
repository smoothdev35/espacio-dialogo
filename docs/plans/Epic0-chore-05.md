# Epic0-chore-05: Dev Pipeline Verification

## Objective
Verify eslint, prettier, and husky hooks operational across both frontend and backend apps. Fix broken config, add missing config for backend, move husky ownership to root.

## Steps

### 1. Fix frontend `.prettierrc` JSON error (missing comma)
### 2. Add backend `.prettierrc` (formatting rules only, no plugins)
### 3. Add backend `eslint.config.mjs` (typescript-eslint, Strapi-appropriate rules)
### 4. Add backend devDependencies (eslint, typescript-eslint, prettier) + lint-staged config
### 5. Create root `package.json` (husky, lint-staged — no workspace config)
### 6. Move `prepare` script from frontend to root; remove from frontend
### 7. Update root `.husky/pre-commit` to run lint-staged for both apps
### 8. Delete stale `frontend/.husky/` directory
### 9. `pnpm install` at root — installs husky/lint-staged, triggers prepare hook install
### 10. Verify: prettier check, eslint, backend build
### 11. Update backlog

## Files Created
- `backend/eslint.config.mjs`
- `backend/.prettierrc`
- `package.json` (root)

## Files Modified
- `frontend/.prettierrc` (fix JSON)
- `frontend/package.json` (remove `prepare`)
- `backend/package.json` (add devDeps + lint-staged)
- `.husky/pre-commit` (add backend lint-staged)
- `docs/backlog.md` (status)

## Files Deleted
- `frontend/.husky/pre-commit`
- `frontend/.husky/_` (entire directory)

## Verification
```bash
cd frontend && pnpm exec prettier --check "src/**/*.{ts,tsx,astro}"
cd frontend && pnpm exec eslint "src/"
cd backend && pnpm exec prettier --check "src/**/*.ts"
cd backend && pnpm exec eslint "src/"
```
