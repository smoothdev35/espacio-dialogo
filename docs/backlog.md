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

> **Figma Policy:** Figma designs will be provided during implementation for all new UI. Backlog entries define functional scope only — no design-specific details (spacing, colors, exact dimensions) are included.

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
| **Epic1-chore-05** | `[chore]` | Seed Hero single type with default title/subtitle/image. Idempotent via findOne guard. Updated seed EXPECTED_COUNTS.                                                                                                            | P0  | S    | `[MERGED]` | 🔗 Related to US-01          |

#### US-01: Hero Section Content Type

- **Intent:** As an Editor, I want to update the blog's hero section (title, subtitle, hero image) directly from the Strapi admin panel, so that I can manage landing page content without code changes.
- **Scope Bounds:** Strapi single type `Hero` with title (string), subtitle (text), heroImage (media). Public `find` permission in bootstrap. Shared TypeScript contract in `types/strapi.ts`.
- **Figma:** TBD — provided during implementation.
- **Artifact Link:** `backend/src/api/hero/`

#### US-02: BlogPost Content Type

- **Intent:** As an Editor, I want to manage blog posts (title, subtitle, body, featured image, author, tags) from the admin panel, so that I can publish long-form content separate from news updates.
- **Scope Bounds:** Strapi collection type `BlogPost`. Fields: title, slug, subtitle, body (blocks), featuredImage (media), author (relation), tags (relation). No category. Public find/findOne permissions. Shared TypeScript contract in `types/strapi.ts`.
- **Figma:** TBD — provided during implementation.
- **Artifact Link:** `backend/src/api/blog-post/`

### Epic 2: Site Foundation

- **Core Domain Statement:** Base frontend infrastructure — layout, navigation, SEO, shared components, error handling, filtering/search.
- **Success Criteria:** Site has consistent layout, responsive design, basic SEO metadata, shared component library, and graceful error handling.
- **Out-of-Scope:** Analytics, cookie consent, multi-language i18n.

#### 🛠️ Technical Subtasks — Shared Components & QA

| Task ID            | Type      | Target Technical Scope / Objective                                                                                                                                                           | Pri | Size | Status     | Relations / Lineage                                         |
| :----------------- | :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-- | :--- | :--------- | :---------------------------------------------------------- |
| **Epic2-chore-01** | `[chore]` | Frontend hero section — consume Strapi Hero single type, render title/subtitle/image on homepage with responsive fallback. Companion to US-01.                                               | P1  | S    | `[MERGED]` | 🔗 Related to US-01                                         |
| **Epic2-chore-02** | `[chore]` | Design token system — Tailwind v4 CSS custom properties, semantic token tiers, dark mode support                                                                                             | P0  | M    | `[MERGED]` | None                                                        |
| **Epic2-chore-03** | `[chore]` | Base UI component library — Button, Input, Select, Checkbox, Radio, Toggle, Tag, Tabs, Link, Modal, Accordion (Astro + React variants)                                                      | P0  | L    | `[MERGED]` | None                                                        |
| **Epic2-chore-04** | `[chore]` | Site footer — copyright line, credits, responsive layout                                                                                                                                     | P2  | S    | `[DRAFT]`  | None                                                        |
| **Epic2-chore-05** | `[chore]` | Responsiveness QA — verify all sections at mobile/tablet/desktop breakpoints against Figma, test in browser                                                                                  | P2  | S    | `[DRAFT]`  | None                                                        |
| **Epic2-chore-06** | `[chore]` | Accessibility QA — keyboard navigation, screen reader, contrast ratios, focus management                                                                                                     | P2  | S    | `[DRAFT]`  | None                                                        |
| **Epic2-chore-07** | `[chore]` | Shared FilterPills component — reusable pill-style filter nav + search input. Takes filter options. Emits pill-change / search-change events. Used by homepage (categories) and blog listing (tags). | P1  | M    | `[MERGED]` | 🔗 Related to US-10                                         |
| **Epic2-chore-08** | `[chore]` | Shared LoadMoreButton component — append-on-click button with scroll context preservation. Generic: accepts item count + load callback.                                                      | P1  | S    | `[DRAFT]`  | 🔗 Related to US-07                                         |
| **Epic2-chore-09** | `[chore]` | Shared Breadcrumb component — generic breadcrumb nav rendering from an array of {label, href} items. Used by update detail page.                                                             | P1  | S    | `[DRAFT]`  | 🔗 Related to US-06                                         |
| **Epic2-chore-10** | `[chore]` | Shared TableOfContents sidebar component — auto-generates from h2/h3 headings, sticky positioning, scroll-spy active state, smooth scroll to sections.                                       | P1  | M    | `[DRAFT]`  | 🔗 Related to US-08                                         |
| **Epic2-chore-11** | `[chore]` | Shared RelatedPosts horizontal list component — renders 3–4 post cards in a horizontal scrollable row. Generic across Updates and BlogPosts.                                                  | P1  | S    | `[DRAFT]`  | 🔗 Related to US-06, US-08                                  |
| **Epic2-chore-12** | `[chore]` | Shared PressCards horizontal scroll component — renders custom link cards (title, thumbnail, source, URL) in horizontal scroll. For third-party content embedding.                            | P1  | M    | `[DRAFT]`  | 🔗 Related to US-07                                         |
| **Epic2-chore-13** | `[chore]` | NotFound / 404 page layout — error message + two CTA buttons (Home, Blog). Uses BaseLayout with nav + footer.                                                                               | P1  | S    | `[MERGED]` | 🔗 Related to US-12                                         |
| **Epic2-chore-14** | `[chore]` | Shared PrevNextNav component — previous/next navigation pair with slugs and titles. Used by update detail page for chronological navigation.                                                  | P1  | S    | `[DRAFT]`  | 🔗 Related to US-06                                         |
| **Epic2-chore-15** | `[chore]` | Shared UpdatePagination component — client-side pagination controls for the updates grid on homepage (page indicators + prev/next). Featured update stays fixed above paginated grid.           | P1  | M    | `[MERGED]` | 🔗 Related to US-10                                         |

#### US-03: Base Layout & Navigation

- **Intent:** As a Reader, I want a consistent site layout with header, footer, and navigation, so that I can move around the site intuitively.
- **Scope Bounds:** Header with site name + nav links. Footer with copyright/credits. Responsive mobile menu. Reusable layout component.
- **Figma:** TBD — provided during implementation.
- **Artifact Link:** `docs/stories/US-03.md`

#### US-04: SEO Metadata

- **Intent:** As a Reader, I want article pages to have proper meta tags and Open Graph data, so that shared links render attractively on social media.
- **Scope Bounds:** Dynamic title/meta/OG tags per page. Canonical URLs. Structured article schema markup.
- **Figma:** TBD — provided during implementation.
- **Artifact Link:** `docs/stories/US-04.md`

#### US-10: Filtering (Cross-Page)

- **Intent:** As a Reader, I want to filter content by category on the homepage and by tags on the blog listing, so that I can find content relevant to my interests.
- **Scope Bounds:** Functional US spanning homepage and blog listing. FilterPills shared component (Epic2-chore-07). Client-side category filtering on homepage updates grid. Client-side tag filtering on blog listing grid. Filter options extracted from loaded posts. URL-based filter state for shareability. Filter resets pagination to page 1.
- **Figma:** TBD — provided during implementation.
- **Artifact Link:** `docs/stories/US-10.md`

| Task ID            | Type     | Target Technical Scope / Objective                                                                                                                                                             | Pri | Size | Status    | Relations / Lineage                              |
| :----------------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-- | :--- | :-------- | :----------------------------------------------- |
| **US-10-feat-01**  | `[feat]` | Integrate FilterPills on homepage — wire category filter pills to updates grid. Filtering resets to page 1, pagination operates within active filter. Empty state when no results.              | P0  | M    | `[MERGED]` | None                                             |
| **US-10-feat-02**  | `[feat]` | Integrate FilterPills on blog listing — wire tag filter pills to blog post grid. Tag options extracted from loaded posts. Filters client-side.                                                   | P1  | M    | `[DRAFT]` | 🛑 Blocked by Epic2-chore-07                     |
| **US-10-chore-01** | `[chore]` | Add pagination state management to client-side script (currentPage, totalPages, show/hide grid items by page index).                                                                             | P1  | S    | `[MERGED]` | 🔗 Related to US-10-feat-01                      |

#### US-11: Search (Blog Listing)

- **Intent:** As a Reader, I want to search blog posts by keyword, so that I can find specific topics quickly.
- **Scope Bounds:** Search input with debounced client-side filtering on blog listing page. Filters by title, excerpt, author name. Works in conjunction with tag filter. Empty state for no results.
- **Figma:** TBD — provided during implementation.
- **Artifact Link:** `docs/stories/US-11.md`

| Task ID            | Type     | Target Technical Scope / Objective                                                                                                                            | Pri | Size | Status    | Relations / Lineage                              |
| :----------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ | :-- | :--- | :-------- | :----------------------------------------------- |
| **US-11-feat-01**  | `[feat]` | Implement client-side search with debounce — filters loaded blog posts by title, excerpt, author name. Works in conjunction with tag filter.              | P1  | M    | `[DRAFT]` | 🛑 Blocked by Epic2-chore-07                     |

#### US-12: 404 Not Found Page

- **Intent:** As a Visitor, I want a friendly 404 page with clear actions to return to Home or Blog, so I don't get stuck on broken links.
- **Scope Bounds:** Astro catch-all route or `404.astro`. Error message with brief explanation. Two action buttons: "Go to Home" (`/`) and "Browse Blog" (`/blog`). Uses BaseLayout with nav + footer.
- **Figma:** Provided during implementation.
- **Artifact Link:** `docs/stories/US-12.md`

| Task ID            | Type     | Target Technical Scope / Objective                                                                                                                            | Pri | Size | Status    | Relations / Lineage             |
| :----------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ | :-- | :--- | :-------- | :------------------------------ |
| **US-12-feat-01**  | `[feat]` | Create 404 page with error message, illustration/icon, and two CTA buttons (Home, Blog). Uses BaseLayout.                                                     | P1  | S    | `[MERGED]` | 🛑 Blocked by Epic2-chore-13    |
| **US-12-chore-01** | `[chore]` | Configure Astro 404 handling — implement catch-all route or `src/pages/404.astro` depending on Astro 5 conventions.                                            | P1  | S    | `[MERGED]` | 🔗 Related to US-12-feat-01     |

---

### Epic 3: Content Consumption

- **Core Domain Statement:** Public-facing browsing, reading, and discovery of Updates and BlogPosts for the Latin American audience.
- **Success Criteria:** Readers can browse, filter, and read both Updates and BlogPosts. Content renders correctly on desktop and mobile. Each content type has its own section.
- **Out-of-Scope:** Comments, social sharing, newsletter, user accounts.
- **Governing Constraints:** Astro 5.1.1 with Strapi headless CMS integration via REST. Strapi 5 flattened API (documentId, no data.attributes).

#### 🛠️ Technical Subtasks

| Task ID            | Type      | Target Technical Scope / Objective                                                                                                                                                                                                                           | Pri | Size | Status     | Relations / Lineage |
| :----------------- | :-------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-- | :--- | :--------- | :------------------ |
| **Epic3-chore-01** | `[chore]` | Create Strapi 5 data adapter — fetchApi wrapper handling flattened REST responses (documentId extraction, unwrapped attributes). Adds src/lib/strapi.ts, src/types/strapi.ts, src/lib/index.ts. Generic fetchCollection<T> + typed helpers per content type. | P0  | M    | `[MERGED]` | None                |
| **Epic3-chore-02** | `[chore]` | Align UpdateFilters pill styling with Figma                                                                                                                                                                                                                  | P2  | S    | `[MERGED]` | None                |
| **Epic3-chore-03** | `[chore]` | Implement client-side update filtering by category                                                                                                                                                                                                           | P1  | M    | `[MERGED]` | None                |
| **Epic3-chore-05** | `[chore]` | Create `BlogPostAction` single type in Strapi — heading (string), description (text), buttonLabel (string), buttonUrl (string). Public find permission. Seed with default CTA values. Companion to US-08-feat-03.                                              | P1  | S    | `[MERGED]` | 🔗 Related to US-08-feat-03 |

#### US-05: Home Page

- **Intent:** As a Reader, I want to browse updates and recent blog posts on the homepage, so that I can discover content from the landing page.
- **Scope Bounds:** Homepage sections: (1) Hero (already merged); (2) Featured update card above filters, always visible; (3) Category filter pills below featured (integration with US-10); (4) Update grid with client-side pagination; (5) BlogPost horizontal slider below updates with "View All" link to `/blog`. Filtering and pagination handled by US-10.
- **Figma:** Provided during implementation.
- **Artifact Link:** `docs/stories/US-05.md`

| Task ID            | Type     | Target Technical Scope / Objective                                                                                                                                                             | Pri | Size | Status    | Relations / Lineage                              |
| :----------------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-- | :--- | :-------- | :----------------------------------------------- |
| **US-05-feat-01**  | `[feat]` | Restructure Updates.astro — move featured update above category filters, paginated grid below filters. Featured stays fixed; grid pages through remaining updates.                              | P0  | M    | `[MERGED]` | None                                             |
| **US-05-feat-02**  | `[feat]` | Add "View All" button in BlogPostSlider header row — links to `/blog`. Styled consistently with existing tagline + heading + description pattern.                                               | P1  | S    | `[DRAFT]` | None                                             |

#### US-06: Update Detail Page

- **Intent:** As a Reader, I want to open a full update by its slug, so that I can read the complete content with featured image, author attribution, and navigate between updates.
- **Scope Bounds:** Dynamic route `/updates/[slug].astro`. Rich text body rendering. Featured image with caption. Author byline with link to profile. Breadcrumb navigation (Home → Updates → Current Update, where "Updates" links to homepage updates section). Previous/Next update navigation (chronological by publishedAt). Tags and category display. Nav + footer from base layout.
- **Figma:** Provided during implementation.
- **Artifact Link:** `docs/stories/US-06.md`

| Task ID            | Type     | Target Technical Scope / Objective                                                                                                                                                                  | Pri | Size | Status    | Relations / Lineage                              |
| :----------------- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-- | :--- | :-------- | :----------------------------------------------- |
| **US-06-feat-01**  | `[feat]` | Create `/updates/[slug].astro` dynamic route — self-fetches update by slug, renders heading, body (rich text blocks), featured image, author byline, date, tags, category badge.                    | P0  | M    | `[DRAFT]` | 🛑 Blocked by Epic2-chore-09, Epic2-chore-11     |
| **US-06-feat-02**  | `[feat]` | Implement Breadcrumb — renders Home → Updates (→ homepage #updates) → current update title. Uses shared Breadcrumb component.                                                                       | P1  | S    | `[DRAFT]` | 🛑 Blocked by Epic2-chore-09                     |
| **US-06-feat-03**  | `[feat]` | Implement Previous/Next navigation — chronological prev/next links using shared PrevNextNav component.                                                                                              | P1  | S    | `[DRAFT]` | 🛑 Blocked by Epic2-chore-14                     |
| **US-06-feat-04**  | `[feat]` | Render related updates horizontal list — 3–4 related updates (same category or shared tags) using shared RelatedPosts component.                                                                     | P1  | S    | `[DRAFT]` | 🛑 Blocked by Epic2-chore-11                     |
| **US-06-chore-01** | `[chore]` | Add prev/next slug fetch to update.api.ts — single query returning adjacent updates by publishedAt for prev/next navigation.                                                                         | P1  | S    | `[DRAFT]` | 🔗 Related to US-06-feat-03                      |

#### US-07: Blog Listing Page

- **Intent:** As a Reader, I want to browse blog posts with tag filters, search, and load-more, and see a press section with third-party content, so I can discover long-form articles and related coverage.
- **Scope Bounds:** Page route `/blog`. Heading + FilterPills integration (US-10) + search integration (US-11). 3-column responsive grid of transparent cards: featured media, excerpt, author, read time. Load More button (appends items, preserves scroll context). Horizontal Press section: custom link cards (title, thumbnail, source, URL) — editorially curated, not iframe/oEmbed. Nav + footer from base layout.
- **Figma:** Provided during implementation.
- **Artifact Link:** `docs/stories/US-07.md`

| Task ID            | Type     | Target Technical Scope / Objective                                                                                                                                                                    | Pri | Size | Status    | Relations / Lineage                              |
| :----------------- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-- | :--- | :-------- | :----------------------------------------------- |
| **US-07-feat-01**  | `[feat]` | Create `/blog` page route with self-fetching BlogListing section component. Fetches all blog posts, renders heading + FilterPills + grid.                                                             | P0  | M    | `[DRAFT]` | 🛑 Blocked by Epic2-chore-07, Epic2-chore-08     |
| **US-07-feat-02**  | `[feat]` | Build 3-column transparent card grid with LoadMore button — cards show featured media (3:2), title, excerpt, author avatar+name, read time. LoadMore appends next batch, preserves scroll position. | P0  | M    | `[DRAFT]` | 🛑 Blocked by Epic2-chore-08                     |
| **US-07-feat-03**  | `[feat]` | Build horizontal PressCards section — editorially curated custom link cards (title, thumbnail, source name, external URL). Horizontal scroll.                                                        | P1  | M    | `[DRAFT]` | 🛑 Blocked by Epic2-chore-12                     |
| **US-07-chore-01** | `[chore]` | Extract readTime computation to shared utility `src/lib/read-time.ts` — calculates from body block word count. Generic across Update and BlogPost content types. Used by homepage cards, update detail page, and blog post detail page. | P1  | S    | `[MERGED]` | 🔗 Related to US-07-feat-01                      |
| **US-07-chore-02** | `[chore]` | Extend blogpost.api.ts — fetchBlogPostsForListing with populate: featuredImage, author, tags. Returns BlogPostCardProps[] with all grid fields.                                                      | P1  | S    | `[DRAFT]` | 🔗 Related to US-07-feat-01                      |

#### US-08: BlogPost Detail Page

- **Intent:** As a Reader, I want to open a full blog post by its slug, so that I can read the complete content with a table of contents, take action via CTA, and discover related posts.
- **Scope Bounds:** Dynamic route `/blog/[slug].astro`. Post heading, rich text body rendering, featured image. Metadata: author byline with avatar, date, read time. Sticky sidebar Table of Contents: auto-generated from h2/h3 headings in body, scroll-spy highlights active section, click to smooth-scroll. CTA section: configurable primary action (support, join, donate — content managed per-post or global). Horizontal related posts list: 3–4 posts (same tags) using shared RelatedPosts component. Nav + footer from base layout.
- **Figma:** Provided during implementation.
- **Artifact Link:** `docs/stories/US-08.md`

| Task ID            | Type     | Target Technical Scope / Objective                                                                                                                                                                      | Pri | Size | Status    | Relations / Lineage                              |
| :----------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :-- | :--- | :-------- | :----------------------------------------------- |
| **US-08-feat-01**  | `[feat]` | Create `/blog/[slug].astro` dynamic route — self-fetches blog post by slug, renders heading, featured image, rich text body, author/date/readTime metadata. Layout: content area + sticky sidebar.       | P0  | M    | `[DRAFT]` | 🛑 Blocked by Epic2-chore-10, Epic2-chore-11     |
| **US-08-feat-02**  | `[feat]` | Implement TableOfContents sidebar — parse h2/h3 from rich text blocks, render as nested list, sticky positioning, scroll-spy active state, smooth scroll on click. Uses shared TableOfContents component. | P1  | M    | `[DRAFT]` | 🛑 Blocked by Epic2-chore-10                     |
| **US-08-feat-03**  | `[feat]` | Build CTA section component — configurable primary action (heading, description, button label, URL). Rendered after post body, before related posts. Consumes BlogPostAction single type.            | P1  | S    | `[DRAFT]` | 🛑 Blocked by Epic3-chore-05                                  |
| **US-08-feat-04**  | `[feat]` | Render related posts horizontal list — 3–4 related posts (shared tags) using shared RelatedPosts component.                                                                                    | P1  | S    | `[DRAFT]` | 🛑 Blocked by Epic2-chore-11                     |
| **US-08-chore-01** | `[chore]` | Add TOC heading extraction utility — parse Strapi blocks response to extract h2/h3 text + generated IDs for scroll targeting.                                                                             | P1  | S    | `[DRAFT]` | 🔗 Related to US-08-feat-02                      |


---

### Epic 4: API Security & Access Control `[MERGED]`

- **Core Domain Statement:** Lock down content API write endpoints while preserving public read access.
- **Success Criteria:** Anonymous visitors can read all content via GET. Authenticated users and API token holders can create, update, and delete Updates and BlogPosts. Admin panel operation unaffected.
- **Out-of-Scope:** Custom user registration flows, OAuth, rate limiting.
- **Governing Constraints:** Strapi 5 content API dual auth (Users & Permissions JWT + API Tokens). Route-level `auth` flag controls guard.

#### 🛠️ Technical Subtasks

| Task ID            | Type      | Target Technical Scope / Objective                                                                                                                                                                                                                                                                          | Pri | Size | Status    | Relations / Lineage |
| :----------------- | :-------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-- | :--- | :-------- | :------------------ |
| **Epic4-chore-01** | `[chore]` | Lock write routes — remove `auth: false` from POST/PUT/DELETE on Update and BlogPost route configs. GET routes keep `auth: false`. Hero, Author, Category, Tag remain read-only (GET only).                                                                                                                 | P0  | S    | `[MERGED]` | None                |

#### US-09: Write Endpoint Authorization `[MERGED]`

- **Intent:** As an Editor, Super Admin, or Authenticated user, I can create, edit, and delete Updates and BlogPosts through the content API, but anonymous visitors cannot.
- **Scope Bounds:**
  - POST/PUT/DELETE on `/updates` and `/blog-posts` require authentication (default Strapi content API auth)
  - GET on all endpoints stays public (`auth: false`)
  - Write access via **API Tokens** only — create in admin panel (Settings → API Tokens) scoped to full CRUD. No user registration needed; no Users & Permissions bootstrap manipulation.
  - Admin panel operation unaffected.
- **Figma:** N/A — API configuration only.
- **Artifact Link:** `backend/src/api/update/routes/update.ts`, `backend/src/api/blog-post/routes/blog-post.ts`

---

## 📋 Execution Dependency Graph

```
Phase 1 — Shared Components + Backend Chores (parallel, no deps):
  Epic2-chore-07  (FilterPills)
  Epic2-chore-08  (LoadMoreButton)
  Epic2-chore-09  (Breadcrumb)
  Epic2-chore-10  (TableOfContents)
  Epic2-chore-11  (RelatedPosts)
  Epic2-chore-12  (PressCards)
  Epic2-chore-13  (NotFound)
  Epic2-chore-14  (PrevNextNav)
  Epic2-chore-15  (UpdatePagination)
  Epic3-chore-05  (BlogPostAction single type)

Phase 2 — Feature Implementation (depends on Phase 1):
  US-05-feat-01   (homepage restructure)
  US-05-feat-02   (blog slider "View All")
  US-06-feat-01   → US-06-feat-02, US-06-feat-03, US-06-feat-04
  US-07-feat-01   → US-07-feat-02, US-07-feat-03
  US-08-feat-01   → US-08-feat-02, US-08-feat-03, US-08-feat-04
  US-10-feat-01   (homepage filtering integration)
  US-10-feat-02   (blog listing filtering integration)
  US-11-feat-01   (blog listing search)
  US-12-feat-01   (404 page)

Phase 3 — Polish & QA:
  Epic2-chore-04  (Footer)
  Epic2-chore-05  (Responsiveness QA)
  Epic2-chore-06  (Accessibility QA)
```
