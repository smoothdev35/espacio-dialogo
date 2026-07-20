import React from 'react'

export interface LinkProps {
  label: string
  href: string
  external?: boolean
  class?: string
}

export function Link({
  label,
  href,
  external = false,
  class: className = '',
}: LinkProps) {
  return (
    <a
      href={href}
      className={`text-[var(--color-link-text)] underline-offset-4 transition-colors duration-150 hover:text-[var(--color-link-hover)] hover:underline active:text-[var(--color-link-active)] ${className}`}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      aria-label={external ? `${label} (opens in new tab)` : undefined}
    >
      {label}
      {external && <span className="sr-only"> (opens in new tab)</span>}
    </a>
  )
}
