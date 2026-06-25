---
version: "alpha"
name: "Espacio Dialogo Design System"
description: "Core design tokens generated from raw-primitives (relume)"

base_primitives:
  palette:
    brand_primary: "#213A78"
    brand_secondary: "#232B3D"
    brand_accent: "#ECA313"
    neutral_light: "#B3B3B4"
    neutral: "#808182"
    neutral_dark: "#4D4E50"
  fonts:
    headline: "Lora, serif"
    body: "Inter, sans-serif"

applied_semantics:
  radius:
    outer_surface: "lg"
    body_image: "lg"
    surface_image: "md"
    button: "md"
    input: "md"
  layout_containers:
    max_width: "7xl"
    page_gutters: "clamp(1rem, 0.471rem + 2.254vw, 2.5rem)"
  vertical_hierarchy:
    section_gap: "clamp(3rem, 1.239rem + 7.512vw, 8rem)"
    component_gap: "clamp(1rem, 0.648rem + 1.502vw, 2rem)"
  typography_sizes:
    h1: "clamp(2.25rem, 1.722rem + 2.254vw, 3.75rem)"
    h2: "clamp(1.75rem, 1.486rem + 1.127vw, 2.5rem)"
    h3: "clamp(1.25rem, 1.074rem + 0.751vw, 1.75rem)"
    body: "clamp(1rem, 0.956rem + 0.188vw, 1.125rem)"
    button: "md"
    ghost_link: "sm"
    input: "md"
    small: "xs"
  typography_weights:
    h1: "bold"
    h2: "bold"
    h3: "semibold"
    body: "medium"
    button: "semibold"
    ghost_link: "semibold"
    input: "semibold"
    small: "medium"

responsiveness_anchors:
  viewports:
    min_width: 375
    max_width: 1440
  typography_ranges:
    h1: [2.25rem, 3.75rem]
    h2: [1.75rem, 2.5rem]
    h3: [1.25rem, 1.75rem]
    body: [1rem, 1.125rem]
  spacing_ranges:
    section_gap: [3rem, 8rem]
    component_gap: [1rem, 2rem]
    page_gutters: [1rem, 2.5rem]

light_mode:
  page_bg: "#F2F2F2"
  page_text: "#232B3D"
  surface_bg: "#FFFFFF"
  surface_text: "#232B3D"
  contrast_text: "#FFFFFF"
  border_base: "#D1D1D2"
  border_focus: "#213A78"
  components:
    button_primary:
      bg: "#213A78"
      text: "#FFFFFF"
      hover_bg: "#1A2F5F"
      active_bg: "#142348"
      disabled_bg: "#E5E7EB"
      disabled_text: "#9CA3AF"
    button_secondary:
      bg: "#B3B3B4"
      text: "#232B3D"
      hover_bg: "#9E9E9F"
      active_bg: "#88898A"
      disabled_bg: "#E5E7EB"
      disabled_text: "#9CA3AF"
    ghost_link:
      text: "#213A78"
      hover_text: "#1A2F5F"
      active_text: "#142348"
      disabled_text: "#9CA3AF"
    input:
      bg: "#FFFFFF"
      text: "#232B3D"
      placeholder: "#B3B3B4"
      border: "#D1D1D2"
      focus_border: "#213A78"
      focus_bg: "#FFFFFF"
      disabled_bg: "#F3F4F6"

dark_mode:
  page_bg: "#232B3D"
  page_text: "#FFFFFF"
  surface_bg: "#000000"
  surface_text: "#FFFFFF"
  contrast_text: "#FFFFFF"
  border_base: "#4D4E50"
  border_focus: "#B3B3B4"
  components:
    button_primary:
      bg: "#B3B3B4"
      text: "#232B3D"
      hover_bg: "#C8C8C9"
      active_bg: "#D5D5D6"
      disabled_bg: "#4D4E50"
      disabled_text: "#808182"
    button_secondary:
      bg: "#232B3D"
      text: "#FFFFFF"
      hover_bg: "#2D3648"
      active_bg: "#374053"
      disabled_bg: "#4D4E50"
      disabled_text: "#808182"
    ghost_link:
      text: "#B3B3B4"
      hover_text: "#D1D1D2"
      active_text: "#E8E8E8"
      disabled_text: "#808182"
    input:
      bg: "#000000"
      text: "#FFFFFF"
      placeholder: "#808182"
      border: "#4D4E50"
      focus_border: "#B3B3B4"
      focus_bg: "#0A0A0A"
      disabled_bg: "#1A1C1E"
---

## Colors

- **Primary (#213A78):** Main brand color for CTAs, links, and focus indicators in light mode.
- **Secondary (#232B3D):** Dark anchor for text and dark mode page backgrounds.
- **Accent (#ECA313):** Highlight and badge color.
- **Neutral scale (#B3B3B4 / #808182 / #4D4E50):** Borders, placeholders, disabled states, and secondary surfaces.
- **Contrast text (#FFFFFF):** Universal text-on-image / text-on-surface overlay — theme-independent.

Light mode: page bg #F2F2F2, surfaces #FFFFFF, text #232B3D. Dark mode: page bg #232B3D, surfaces #000000, text #FFFFFF.

## Typography

| Level | Font | Weight | Fluid Range |
|-------|------|--------|-------------|
| H1 | Lora | Bold | `clamp(2.25rem, 1.722rem + 2.254vw, 3.75rem)` |
| H2 | Lora | Bold | `clamp(1.75rem, 1.486rem + 1.127vw, 2.5rem)` |
| H3 | Lora | Semibold | `clamp(1.25rem, 1.074rem + 0.751vw, 1.75rem)` |
| Body | Inter | Medium | `clamp(1rem, 0.956rem + 0.188vw, 1.125rem)` |
| Button | Inter | Semibold | md |
| Link | Inter | Semibold | sm |
| Input | Inter | Semibold | md |
| Small | Inter | Medium | xs |

Import: `@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Lora:ital,wght@0,400..700;1,400..700&display=swap');`

## Layout

- **Max container width:** 7xl (80rem / 1280px)
- **Page gutters:** `clamp(1rem, 0.471rem + 2.254vw, 2.5rem)` — 375px→1440px
- **Section gap:** `clamp(3rem, 1.239rem + 7.512vw, 8rem)`
- **Component gap:** `clamp(1rem, 0.648rem + 1.502vw, 2rem)`

## Shapes

| Surface | Radius |
|---------|--------|
| Outer cards / body images | `rounded-lg` (0.5rem) |
| Buttons, inputs, inner cards, surface images | `rounded-md` (0.375rem) |

## Components

- **Button Primary (light):** #213A78 bg / #FFF text → hover #1A2F5F → active #142348. Dark: #B3B3B4 bg / #232B3D text → hover #C8C8C9 → active #D5D5D6.
- **Button Secondary (light):** #B3B3B4 bg / #232B3D text → hover #9E9E9F → active #88898A. Dark: #232B3D bg / #FFF text → hover #2D3648 → active #374053.
- **Ghost Link (light):** #213A78 → hover #1A2F5F → active #142348. Dark: #B3B3B4 → hover #D1D1D2 → active #E8E8E8.
- **Input (light):** #FFF bg, #232B3D text, #D1D1D2 border → focus border #213A78. Dark: #000 bg, #FFF text, #4D4E50 border → focus border #B3B3B4.
- **Disabled:** All components degrade to gray swatches (#E5E7EB / #9CA3AF light, #4D4E50 / #808182 dark) with no interactive states.