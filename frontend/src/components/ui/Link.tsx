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
      className={`underline-offset-4 hover:underline ${className}`}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      aria-label={external ? `${label} (opens in new tab)` : undefined}
    >
      {label}
      {external && <span className="sr-only"> (opens in new tab)</span>}
    </a>
  )
}
