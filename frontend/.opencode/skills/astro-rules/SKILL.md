---
name: astro-rules
description: Non-negotiable architectural laws for handling Astro page structures, layout components, slot definitions, content collections, and zero-FOUC theme scripts.
---

# Architectural Specification: Pure Astro Multi-Page Application (MPA)

You must execute all Astro layout and component generation tasks in strict compliance with these operational structural boundaries. There are no exceptions.

## 1. The Scaffold Standard & Page Composition

- Every page file inside `src/pages/` must compile to an independent HTML document by streaming through a unified layout file (e.g., `src/layouts/BaseLayout.astro`).
- Standalone pages are strictly prohibited from declaring outer HTML structures (`<html>`, `<head>`, `<body>`). They must compose via Astro's native slot mechanism.
- **Composition Syntax:** Use the default `<slot />` tag for primary body injections. Implement optional, page-specific configuration points using named slots:

```astro
  <!-- Inside src/layouts/BaseLayout.astro -->
  <head>
    <slot name="page-head" />
  </head>

  <!-- Inside src/pages/example.astro -->
  <BaseLayout title="Example">
    <link rel="canonical" href="..." slot="page-head" />
    <main>Page Content</main>
  </BaseLayout>
```

- Named slots are optional by default. If a page omits content for a named slot, it must resolve cleanly to nothing without breaking compilation.

## 2. The Zero-FOUC Guarantee

- To eliminate the Flash of Unstyled Content during server-side theme rendering, the layout component MUST execute theme detection synchronously within the `<head>` block before any body content parses or paints.
- **The Execution Law:** Embed this exact, blocking `is:inline` IIFE script directly inside the layout `<head>`:

```astro
  <script is:inline>
    (function () {
      const t = localStorage.getItem("theme");
      if (t === "dark" || (!t && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    })();
  </script>
```

## 3. Native Routing & View Transitions

- This application runs as a pure web-standards MPA. Intercepting links or using client-side JavaScript routers is strictly forbidden.
- Navigation shifts must be animated natively by the browser using the cross-document CSS View Transitions API. Ensure this rule is established globally inside your main stylesheet:

```css
@view-transition {
  navigation: auto;
}
```

## 4. Data Integrity & Frontmatter Schemas

- All static content routing, markdown, or MDX records must be managed inside strict Astro Content Collections (`src/content/config.ts`).
- Every collection must enforce frontmatter metadata validity at build time using explicit Zod type definitions:

```ts
import { defineCollection, z } from "astro:content";
const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
  }),
});
```

## 5. Component Co-Location & Styling Limits

- **Inline Co-location:** For all interactive UI component files (`.astro`, `.tsx`), you must declare your Tailwind v4 utility class strings directly inline within the element markup. Do not abstract component styles into custom CSS utility selectors.
- **Restricted Scope for `@apply`:** The usage of the `@apply` directive is strictly bottlenecked. You are only permitted to use it for global HTML element style resets (`body`, `h1`, `a`), structural macro-layout primitives, or third-party/CMS text container wrappers where you do not control the underlying HTML markup nodes.
