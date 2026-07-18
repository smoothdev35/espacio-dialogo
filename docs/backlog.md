# Project Backlog: Espacio Diálogo
> Blog covering democratic transition in Nicaragua for a Latin American audience. Single publisher managing drafts from up to 2-3 contributors. Social/politics niche.

## 📊 Backlog Task Configuration Ledger
| Dimension | Key / Token | Operational Definition | Engine Action |
| :--- | :--- | :--- | :--- |
| **Type** | `[feat]`<br>`[bug]`<br>`[chore]`<br>`[spike]` | Conventional commit classification types. | Enforces branch prefixes and conventional commit keys. |
| **Priority** | `P0`<br>`P1`<br>`P2` | Blocker / Critical Path<br>High Priority Feature Suite<br>Routine Optimization / Polish | Dictates runner execution sorting priority. |
| **Effort / Size** | `S`<br>`M`<br>`L` | Micro-Outcome (< 1 day)<br>Standard Feature Block (1–3 days)<br>Complex Cross-Package Integration | Calibrates internal agent execution thresholds. |
| **Status** | `[DRAFT]` <br> `[ACTIVE: loop_id]` <br> `[MERGED]` | Inactive configuration state<br>Ready for local development pass<br>Code verified and merged to local main | `[DRAFT]` is ignored; `[ACTIVE]` locks an agent runner; `[MERGED]` archives the contract. |
| **Relations** | `🛑 Blocked by [Task ID]` <br> `🔄 Supersedes [Task ID]` <br> `🔗 Related to [Task ID]` <br> `🔗 Related ADR [ADR-ID]` | **Dependency Linkages:**<br>- Execution constraint.<br>- Architectural pivot/refactor override.<br>- Bidirectional technical association.<br>- Design decision binding. | Enforces execution sorting barriers and tracks codebase lineage. |

---

## 🛠️ [TECHNICAL EPICS REGION]

### Epic 0: Tooling & Infrastructure
- **Core Domain Statement:** Baseline framework initialization, containerization, and dependency configuration.
- **Success Criteria:** Local environment running without console errors; linters and formatters active.
- **Governing Constraints:** Node 22-alpine, pnpm 11.6 corepack, pinned versions only. Strapi 5 flattened API (documentId, no data.attributes). Astro 5.1.1 with Strapi headless CMS integration via REST. PostgreSQL 16.2-alpine in dedicated container.

#### 🛠️ Execution Task Matrix
| Task ID | Type | Target Technical Scope / Objective | Pri | Size | Status | Relations / Lineage |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Epic0-chore-01** | `[chore]` | Environment variable hygiene — sync .env.example files across stack, rename PUBLIC_STRAPI_API_URL → PUBLIC_STRAPI_URL, add STRAPI_URL (Docker-internal), create root .env.example for compose DB_* vars, add frontend ImportMetaEnv types | P0 | S | `[ACTIVE]` | None |
| **Epic0-chore-02** | `[chore]` | Create Strapi 5 data adapter — fetchApi wrapper handling flattened REST responses (documentId extraction, unwrapped attributes). Adds src/lib/strapi.ts, src/types/strapi.ts, src/lib/index.ts. Generic fetchCollection<T> + typed helpers per content type. | P0 | M | `[ACTIVE]` | 🔗 Related ADR Epic0-chore-01 |
| **Epic0-chore-03** | `[chore]` | Configure Strapi content types — Article, Author, Category, Tag with fields, relations, and draft/publish enabled. Schema JSONs, controllers, services, routes in src/api/. Bootstrap grants public find/findOne permissions. | P0 | M | `[MERGED]` | 🔗 Related ADR Epic0-chore-02 |
| **Epic0-chore-04** | `[chore]` | Bootstrap verification — docker compose up --build, confirm zero console errors across all 3 services | P0 | S | `[ACTIVE]` | None |
| **Epic0-chore-05** | `[chore]` | Verify dev pipeline — eslint, prettier, husky hooks operational | P1 | S | `[ACTIVE]` | None |

---

## 🎯 [FUNCTIONAL EPICS REGION]

### Epic 1: Content Consumption
- **Core Domain Statement:** Public-facing article browsing, reading, and discovery for the Latin American audience.
- **Success Criteria:** Readers can browse, filter, read, and search articles. Content renders correctly on desktop and mobile.
- **Out-of-Scope:** Comments, social sharing, newsletter, user accounts.

#### US-01: Article Listing
- **Intent:** As a Reader, I want to view a paginated list of published articles sorted by date, so that I can discover recent content.
- **Scope Bounds:** Index page showing article cards (title, excerpt, date, category badge, author). Pagination or infinite scroll. Mobile-responsive layout.
- **Artifact Link:** `docs/stories/US-01.md`

#### US-02: Category & Tag Filtering
- **Intent:** As a Reader, I want to filter articles by category or tag, so that I can find content relevant to my interests.
- **Scope Bounds:** Category navigation (sidebar or top nav). Tag chips on articles. URL-based filter state for shareability.
- **Artifact Link:** `docs/stories/US-02.md`

#### US-03: Article Detail
- **Intent:** As a Reader, I want to open a full article by its slug, so that I can read the complete content with featured image and author attribution.
- **Scope Bounds:** Dynamic route [slug].astro. Rich text body rendering. Featured image with caption. Author byline with link to profile. Related articles section.
- **Artifact Link:** `docs/stories/US-03.md`

#### US-04: Author Profile
- **Intent:** As a Reader, I want to view an author's profile with their bio and article list, so that I can follow specific voices.
- **Scope Bounds:** Author page with bio, avatar, and list of their published articles. Link from article byline.
- **Artifact Link:** `docs/stories/US-04.md`

#### US-05: Search
- **Intent:** As a Reader, I want to search articles by keyword, so that I can find specific topics quickly.
- **Scope Bounds:** Search input with debounced query against Strapi REST API. Results displayed as article cards. Empty state for no results.
- **Artifact Link:** `docs/stories/US-05.md`

### Epic 2: Content Administration
- **Core Domain Statement:** Content lifecycle management — contributors submit drafts, publisher reviews and publishes.
- **Success Criteria:** Contributors can create/edit drafts via Strapi admin. Publisher can review, publish, or reject drafts. Taxonomy management operational.
- **Out-of-Scope:** Custom admin dashboard, analytics, scheduled publishing.

#### US-06: Draft Submission
- **Intent:** As a Contributor, I want to create and edit article drafts in Strapi admin with title, body, category, tags, and featured image, so that I can prepare content for review.
- **Scope Bounds:** Strapi admin Content Manager access restricted to Draft-only. Contributor cannot change status to Published. Media library access for uploads.
- **Artifact Link:** `docs/stories/US-06.md`

#### US-07: Publishing Workflow
- **Intent:** As a Publisher, I want to review submitted drafts, approve or reject them, and manage published articles, so that content quality is maintained.
- **Scope Bounds:** Publisher sees all Drafts in Strapi admin. Can publish, unpublish, or request changes. Role-based permission boundaries.
- **Artifact Link:** `docs/stories/US-07.md`

#### US-08: Taxonomy Management
- **Intent:** As a Publisher, I want to create and manage categories and tags, so that content is well-organized for reader navigation.
- **Scope Bounds:** Strapi admin CRUD for Category and Tag content types. Assignable during article creation/editing.
- **Artifact Link:** `docs/stories/US-08.md`

### Epic 3: Site Foundation
- **Core Domain Statement:** Base frontend infrastructure — layout, navigation, SEO, performance.
- **Success Criteria:** Site has consistent layout, responsive design, basic SEO metadata, and acceptable Core Web Vitals.
- **Out-of-Scope:** Analytics, cookie consent, multi-language i18n.

#### US-09: Base Layout & Navigation
- **Intent:** As a Reader, I want a consistent site layout with header, footer, and navigation, so that I can move around the site intuitively.
- **Scope Bounds:** Header with site name + nav links. Footer with copyright/credits. Responsive mobile menu. Reusable layout component.
- **Artifact Link:** `docs/stories/US-09.md`

#### US-10: SEO Metadata
- **Intent:** As a Reader, I want article pages to have proper meta tags and Open Graph data, so that shared links render attractively on social media.
- **Scope Bounds:** Dynamic title/meta/OG tags per page. Canonical URLs. Structured article schema markup.
- **Artifact Link:** `docs/stories/US-10.md`
