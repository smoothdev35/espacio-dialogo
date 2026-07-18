# Epic0-chore-02: Strapi 5 Data Adapter

## Objective
Create the foundational data layer for the frontend — a typesafe fetch wrapper around Strapi 5 REST API that handles the flattened response format (`documentId`-based, no `data.attributes`) and provides typed helper functions for content types.

## Architecture Decisions
- **Generic + typed helpers**: Low-level `fetchCollection<T>()` for any content type + dedicated `getArticles()`, `getCategories()` etc. that call it with proper typing.
- **Manual query serialization**: Purpose-built `buildQueryString()` for LHS bracket syntax (~40 lines). No `qs` dependency.
- **Module-level config**: `configureStrapi({ url?, token? })` instead of class instances. Stateless, fits SSG build-time context.
- **Errors throw**: Build fails if Strapi unreachable at build time — intentional fail-fast for SSG.

## New Files

### `src/types/strapi.ts`
| Export | Kind | Purpose |
|---|---|---|
| `StrapiPagination` | interface | `page`, `pageSize`, `pageCount`, `total` |
| `StrapiMeta` | interface | Wraps optional pagination |
| `StrapiDocument` | interface | Base document fields (`id`, `documentId`, timestamps, locale) |
| `StrapiQueryParams` | interface | `populate`, `filters`, `sort`, `fields`, `pagination`, `locale`, `status` |
| `Media` | interface | Strapi upload file type |
| `Block`, `ParagraphBlock`, `HeadingBlock`, etc. | types | Rich text AST block types (simplified) |
| `Category`, `Tag`, `Author`, `Article` | interfaces | Content type interfaces extending `StrapiDocument` |

### `src/lib/strapi.ts`
| Export | Kind | Purpose |
|---|---|---|
| `configureStrapi(opts)` | function | Set base URL (defaults to `STRAPI_URL` env) and optional API token |
| `fetchCollection<T>(pluralApiId, params?)` | function | Generic collection fetcher → `{ data: T[], meta: StrapiMeta }` |
| `fetchSingle<T>(pluralApiId, documentId, params?)` | function | Generic single fetcher → `T \| null` |
| `StrapiError` | class | `Error` subclass with `status` and `url` properties |
| `getArticles(params?)` | function | Typed helper → `fetchCollection<Article>('articles', params)` |
| `getArticle(documentId, params?)` | function | Typed helper → `fetchSingle<Article>('articles', documentId, params)` |
| `getCategories(params?)` | function | Typed helper → `fetchCollection<Category>('categories', params)` |
| `getCategory(documentId, params?)` | function | Typed helper → `fetchSingle<Category>('categories', documentId, params)` |
| `getAuthors(params?)` | function | Typed helper → `fetchCollection<Author>('authors', params)` |
| `getAuthor(documentId, params?)` | function | Typed helper → `fetchSingle<Author>('authors', documentId, params)` |
| `getTags(params?)` | function | Typed helper → `fetchCollection<Tag>('tags', params)` |
| `getTag(documentId, params?)` | function | Typed helper → `fetchSingle<Tag>('tags', documentId, params)` |

Internal functions (not exported):
- `buildQueryString(params)` — recursive LHS bracket serialization
- `request<T>(path, params?)` — native `fetch` wrapper with error handling

### `src/lib/index.ts`
Barrel export re-exporting all public functions from `lib/strapi.ts`.

## Files Unchanged
- `frontend/.env`, `frontend/.env.example` — `STRAPI_URL` already defined
- `src/env.d.ts` — `ImportMetaEnv` already typed with `STRAPI_URL`
- `astro.config.mjs` — stays SSG, no SSR adapter needed yet

## Verification
- `npx astro check` passes (no TS errors in new files)
- `npx astro build` succeeds (adapter imported but empty SSG still builds)

## Future Work (not in scope)
- SSR adapter switch (comes with dynamic routes in Epic 1)
- Content type rendering components (US-03: Article Detail)
- Caching / stale-while-revalidate
