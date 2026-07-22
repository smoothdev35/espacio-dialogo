# Project Backlog: Espacio Diálogo

> Blog covering democratic transition in Nicaragua for a Latin American audience. Single publisher managing drafts from up to 2-3 contributors. Social/politics niche.

## 📊 Backlog Task Configuration Ledger

| Dimension         | Key / Token                                                                                                            | Operational Definition                                                                                                                                                  | Engine Action                                                                             |
| :---------------- | :--------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------- |
| **Type**          | `[feat]`<br>`[bug]`<br>`[chore]`<br>`[spike]`                                                                          | Conventional commit classification types.                                                                                                                               | Enforces branch prefixes and conventional commit keys.                                    |
| **Priority**      | `P0`<br>`P1`<br>`P2`                                                                                                   | Blocker / Critical Path<br>High Priority Feature Suite<br>Routine Optimization / Polish                                                                                 | Dictates runner execution sorting priority.                                               |
| **Effort / Size** | `S`<br>`M`<br>`L`                                                                                                      | Micro-Outcome (< 1 day)<br>Standard Feature Block (1–3 days)<br>Complex Cross-Package Integration                                                                       | Calibrates internal agent execution thresholds.                                           |
| **Status**        | `[DRAFT]` <br> `[ACTIVE: loop_id]` <br> `[MERGED]`                                                                     | Inactive configuration state<br>Ready for local development pass<br>Code verified and merged to local main                                                              | `[DRAFT]` is ignored; `[ACTIVE]` locks an agent runner; `[MERGED]` archives the contract. |
| **Relations**     | `🛑 Blocked by [Task ID]` <br> `🔄 Supersedes [Task ID]` <br> `🔗 Related to [Task ID]` <br> `🔗 Related ADR [ADR-ID]` | **Dependency Linkages:**<br>- Execution constraint.<br>- Architectural pivot/refactor override.<br>- Bidirectional technical association.<br>- Design decision binding. | Enforces execution sorting barriers and tracks codebase lineage.                          |

---

## 🛠️ [TECHNICAL EPICS REGION]

### Epic 0: Tooling & Infrastructure

- **Core Domain Statement:** Baseline framework initialization, containerization, and dependency configuration.
- **Success Criteria:** Local environment running without console errors; linters and formatters active.
- **Governing Constraints:** Node 22-alpine, pnpm 11.6 corepack, pinned versions only. PostgreSQL 16.2-alpine in dedicated container.

#### 🛠️ Execution Task Matrix

| Task ID            | Type      | Target Technical Scope / Objective                                                                                                                                                                       | Pri | Size | Status     | Relations / Lineage |
| :----------------- | :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-- | :--- | :--------- | :------------------ |
| **Epic0-chore-01** | `[chore]` | Environment variable hygiene — sync .env.example files across stack, rename PUBLIC*STRAPI_API_URL → PUBLIC_STRAPI_URL, create root .env.example for compose DB*\* vars, add frontend ImportMetaEnv types | P0  | S    | `[MERGED]` | None                |
| **Epic0-chore-02** | `[chore]` | Bootstrap verification — docker compose up --build, confirm zero console errors across all 3 services                                                                                                    | P0  | S    | `[MERGED]` | None                |
| **Epic0-chore-03** | `[chore]` | Verify dev pipeline — eslint, prettier, husky hooks operational                                                                                                                                          | P1  | S    | `[MERGED]` | None                |

---

## 🎯 [FUNCTIONAL EPICS REGION]

### Epic 1: Content Administration

- **Core Domain Statement:** Content model configuration for editor-managed site sections.
- **Success Criteria:** Editors can create, edit, publish both Update and BlogPost content, manage taxonomy (categories, tags, authors), upload media, and maintain site sections (hero) via Strapi admin panel.
- **Out-of-Scope:** Custom admin UI, multi-step workflows, scheduled publishing.
- **Governing Constraints:** Strapi 5 content modeling (single types + collection types, draftAndPublish, media fields, uid slug from title).

#### 🛠️ Technical Subtasks

| Task ID            | Type      | Target Technical Scope / Objective                                                                                                                                                                                                     | Pri | Size | Status     | Relations / Lineage          |
| :----------------- | :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-- | :--- | :--------- | :--------------------------- |
| **Epic1-chore-01** | `[chore]` | Configure Strapi content types — Update (Article), Author, Category, Tag with fields, relations, and draft/publish enabled. Schema JSONs, controllers, services, routes in src/api/. Bootstrap grants public find/findOne permissions. | P0  | M    | `[MERGED]` | None                         |
| **Epic1-chore-02** | `[chore]` | Seed bootstrap data — 4 categories, 10 tags, 2 authors, 8 updates (articles) with images from picsum.photos. Idempotent seed via bootstrap().                                                                                          | P0  | M    | `[MERGED]` | None                         |
| **Epic1-chore-03** | `[chore]` | Rename Article → Update (schema, routes, UIDs, TS types, seed refs). Create BlogPost content type — schema, controller, services, routes, bootstrap permissions, TS types.                                                                     | P0  | M    | `[MERGED]` | None                         |
| **Epic1-chore-04** | `[chore]` | Seed BlogPost bootstrap data — 3 sample blog posts in Spanish, reusing existing authors/tags, picsum images. Idempotent.                                                                                                       | P0  | S    | `[MERGED]` | 🔗 Related to Epic1-chore-03 |

#### US-01: Hero Section Content Type

- **Intent:** As an Editor, I want to update the blog's hero section (title, subtitle, hero image) directly from the Strapi admin panel, so that I can manage landing page content without code changes.
- **Scope Bounds:** Strapi single type `Hero` with title (string), subtitle (text), heroImage (media). Public `find` permission in bootstrap. Shared TypeScript contract in `types/strapi.ts`.
- **Artifact Link:** `backend/src/api/hero/`

#### US-02: BlogPost Content Type

- **Intent:** As an Editor, I want to manage blog posts (title, subtitle, body, featured image, author, tags) from the admin panel, so that I can publish long-form content separate from news updates.
- **Scope Bounds:** Strapi collection type `BlogPost`. Fields: title, slug, subtitle, body (blocks), featuredImage (media), author (relation), tags (relation). No category. Public find/findOne permissions. Shared TypeScript contract in `types/strapi.ts`.
- **Artifact Link:** `backend/src/api/blog-post/`

### Epic 2: Site Foundation

- **Core Domain Statement:** Base frontend infrastructure — layout, navigation, SEO, performance.
- **Success Criteria:** Site has consistent layout, responsive design, basic SEO metadata, and acceptable Core Web Vitals.
- **Out-of-Scope:** Analytics, cookie consent, multi-language i18n.

#### US-03: Base Layout & Navigation

- **Intent:** As a Reader, I want a consistent site layout with header, footer, and navigation, so that I can move around the site intuitively.
- **Scope Bounds:** Header with site name + nav links. Footer with copyright/credits. Responsive mobile menu. Reusable layout component.
- **Artifact Link:** `docs/stories/US-03.md`

#### US-04: SEO Metadata

- **Intent:** As a Reader, I want article pages to have proper meta tags and Open Graph data, so that shared links render attractively on social media.
- **Scope Bounds:** Dynamic title/meta/OG tags per page. Canonical URLs. Structured article schema markup.
- **Artifact Link:** `docs/stories/US-04.md`

### Epic 3: Content Consumption

- **Core Domain Statement:** Public-facing browsing, reading, and discovery of Updates and BlogPosts for the Latin American audience.
- **Success Criteria:** Readers can browse, filter, and read both Updates and BlogPosts. Content renders correctly on desktop and mobile. Each content type has its own section.
- **Out-of-Scope:** Comments, social sharing, newsletter, user accounts.
- **Governing Constraints:** Astro 5.1.1 with Strapi headless CMS integration via REST. Strapi 5 flattened API (documentId, no data.attributes).

#### 🛠️ Technical Subtasks

| Task ID            | Type      | Target Technical Scope / Objective                                                                                                                                                                                                                           | Pri | Size | Status     | Relations / Lineage |
| :----------------- | :-------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-- | :--- | :--------- | :------------------ |
| **Epic3-chore-01** | `[chore]` | Create Strapi 5 data adapter — fetchApi wrapper handling flattened REST responses (documentId extraction, unwrapped attributes). Adds src/lib/strapi.ts, src/types/strapi.ts, src/lib/index.ts. Generic fetchCollection<T> + typed helpers per content type. | P0  | M    | `[MERGED]` | None                |

#### US-05: Update Listing

- **Intent:** As a Reader, I want to view a paginated list of published updates sorted by date, so that I can discover recent news.
- **Scope Bounds:** Dedicated Updates page showing Update cards (title, excerpt, date, category badge, tags, author). Pagination or infinite scroll. Mobile-responsive layout.
- **Artifact Link:** `docs/stories/US-05.md`

#### US-06: Update Category & Tag Filtering

- **Intent:** As a Reader, I want to filter updates by category or tag, so that I can find content relevant to my interests.
- **Scope Bounds:** Category navigation + tag chips on updates. URL-based filter state for shareability.
- **Artifact Link:** `docs/stories/US-06.md`

#### US-07: Update Detail

- **Intent:** As a Reader, I want to open a full update by its slug, so that I can read the complete content with featured image and author attribution.
- **Scope Bounds:** Dynamic route [slug].astro. Rich text body rendering. Featured image with caption. Author byline with link to profile. Related updates section.
- **Artifact Link:** `docs/stories/US-07.md`

#### US-08: BlogPost Listing

- **Intent:** As a Reader, I want to view a paginated list of published blog posts sorted by date, so that I can read long-form articles.
- **Scope Bounds:** Dedicated Blog section showing BlogPost cards (title, subtitle, date, tags, author). Pagination or infinite scroll.
- **Artifact Link:** `docs/stories/US-08.md`

#### US-09: BlogPost Detail

- **Intent:** As a Reader, I want to open a full blog post by its slug, so that I can read the complete content with featured image and author attribution.
- **Scope Bounds:** Dynamic route [slug].astro. Rich text body rendering. Featured image. Author byline with link to profile.
- **Artifact Link:** `docs/stories/US-09.md`

#### US-10: Author Profile

- **Intent:** As a Reader, I want to view an author's profile with their bio and articles from both Updates and BlogPosts, so that I can follow specific voices.
- **Scope Bounds:** Author page with bio, avatar, and list of their published content (both types). Link from byline.
- **Artifact Link:** `docs/stories/US-10.md`

#### US-11: Search

- **Intent:** As a Reader, I want to search both updates and blog posts by keyword, so that I can find specific topics quickly.
- **Scope Bounds:** Search input with debounced query against Strapi REST API. Results from both content types displayed grouped or combined. Empty state for no results.
- **Artifact Link:** `docs/stories/US-11.md`
