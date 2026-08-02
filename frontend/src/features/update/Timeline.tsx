/**
 * Timeline — React island
 *
 * Horizontal scroll timeline for update detail page.
 * Navigation is native scroll/swipe only (no arrow buttons — epurated design).
 *
 * Props: entries, currentSlug, class?
 * Slots: none
 * Tokens: --color-page-text, --color-accent
 * Hardcoded literals:
 *   - w-[260px] — mobile item width (design-specific, no token equivalent)
 *   - md:w-[calc((1280px-128px)/3)] — desktop item width (3 items + 2×64px gap fill 1280 max-width)
 *   - gap-x-8 md:gap-x-16 — inter-item gap (32px mobile, 64px desktop)
 *   - px-2 py-3 — scroll container padding so focus-visible outlines and bullet glow aren't clipped
 *   - Dynamic spacers — computed in JS as (containerWidth - itemWidth)/2 - gap so every item can snap centred at every viewport
 *   - top-[13px] — continuous timeline line vertical position, aligned to bullet centre
 *   - h-[2px] — line thickness (design-specific, no token equivalent)
 *   - w-[15px], h-[15px] — circle size (design-specific, no token equivalent)
 *   - px-8 — entry horizontal padding (design-specific, 32px)
 *   - gap-4 — progress→content gap (16px, Figma; Tailwind built-in)
 *   - mt-2 — month→title gap (8px, Figma; Tailwind built-in)
 * Context variants: not needed — section bg in TimelineSection.astro is surface-aware
 * Composed from: none
 *
 * Element selectors from global.css:
 *   h6 → --text-h6, Lora Bold, fluid 20→24px, tracking -0.01em, leading 1.4
 *   p  → body inheritance: Inter, --text-body fluid 16→18px
 */

import { useEffect, useRef, useCallback } from 'react'
import type { TimelineSectionProps } from './timeline.types'

export default function Timeline({
  entries,
  currentSlug,
  class: className,
}: TimelineSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const startSpacerRef = useRef<HTMLDivElement>(null)
  const endSpacerRef = useRef<HTMLDivElement>(null)

  const syncSpacersAndScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return

    const containerWidth = el.clientWidth
    const firstItem = el.querySelector<HTMLAnchorElement>('[data-slug]')
    if (!firstItem) return
    const itemWidth = firstItem.offsetWidth
    const gap = parseInt(getComputedStyle(firstItem.parentElement!).columnGap || '32')
    const spacerWidth = Math.max(0, (containerWidth - itemWidth) / 2 - gap)

    if (startSpacerRef.current)
      startSpacerRef.current.style.width = `${spacerWidth}px`
    if (endSpacerRef.current)
      endSpacerRef.current.style.width = `${spacerWidth}px`

    // Desktop (multiple items fit): when active is latest, centre the next one so items span both sides.
    // Mobile (single item): always centre the active item, even if latest.
    const activeIdx = entries.findIndex((e) => e.slug === currentSlug)
    const isSingleItemView = containerWidth < itemWidth * 2 + gap
    const centreSlug =
      entries.length > 1 && activeIdx === 0 && !isSingleItemView
        ? entries[1].slug
        : currentSlug

    const centreItem = el.querySelector<HTMLAnchorElement>(
      `[data-slug="${centreSlug}"]`,
    )
    if (!centreItem) return
    const containerRect = el.getBoundingClientRect()
    const itemRect = centreItem.getBoundingClientRect()
    const targetLeft =
      el.scrollLeft +
      (itemRect.left - containerRect.left) -
      (containerWidth - centreItem.offsetWidth) / 2
    el.scrollTo({ left: Math.max(0, targetLeft), behavior: 'smooth' })
  }, [entries, currentSlug])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    // Initial sync after layout settles
    requestAnimationFrame(() => syncSpacersAndScroll())

    const ro = new ResizeObserver(() => syncSpacersAndScroll())
    ro.observe(el)

    return () => ro.disconnect()
  }, [syncSpacersAndScroll])

  if (entries.length === 0) return null

  return (
    <div
      ref={scrollRef}
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 9%, black 91%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 9%, black 91%, transparent)',
      }}
      className={`relative overflow-x-auto snap-x snap-mandatory scrollbar-hide px-2 py-3${className ? ` ${className}` : ''}`}
    >
      <div className="relative flex items-stretch gap-x-8 md:gap-x-16 w-max">
        {/* Spacers so first/last items can snap to viewport centre */}
        <div ref={startSpacerRef} className="flex-shrink-0" style={{ width: '60px' }} aria-hidden="true" />

        {/* Continuous timeline line — spans full scroll width, bullets overlaid on top */}
        <div className="absolute top-[13px] left-0 w-full h-[2px] bg-(--color-page-text)" />

        {entries.map((entry) => {
          const isActive = entry.slug === currentSlug
          return (
            <a
              key={entry.slug}
              data-slug={entry.slug}
              href={`/updates/${entry.slug}`}
              style={{ scrollSnapAlign: 'center', scrollSnapStop: 'always' }}
              className="group relative z-10 flex flex-col items-center gap-4 w-[260px] md:w-[calc((1280px-128px)/3)] flex-shrink-0 hover:text-(--color-link-text) active:text-(--color-link-text) focus-visible:text-(--color-link-text)"
            >
              {/* Bullet overlaid on the continuous timeline line */}
              <div className="p-1.5 rounded-full bg-(--color-surface-alt)">
                <div
                  className={`w-[15px] h-[15px] rounded-full flex-shrink-0 ${isActive ? 'bg-(--color-filter-fg) [box-shadow:0_0_6px_var(--color-filter-fg),0_0_12px_var(--color-filter-fg)]' : 'bg-(--color-page-text) group-hover:bg-(--color-filter-fg)'}`}
                />
              </div>

              {/* Content */}
              <div className="px-8 text-center">
                <h6>
                  {entry.month}
                  <br />
                  {entry.year}
                </h6>
                <p className="line-clamp-3 mt-2">{entry.title}</p>
              </div>
            </a>
          )
        })}

        <div ref={endSpacerRef} className="flex-shrink-0" style={{ width: '60px' }} aria-hidden="true" />
      </div>
    </div>
  )
}
