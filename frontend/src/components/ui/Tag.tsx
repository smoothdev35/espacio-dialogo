import React from 'react'

export interface TagProps {
  label: string
  icon?: React.ReactNode
  iconPosition?: 'leading' | 'trailing'
  onDismiss?: () => void
  class?: string
}

export function Tag({
  label,
  icon,
  iconPosition = 'leading',
  onDismiss,
  class: className = '',
}: TagProps) {
  const hasIcon = !!icon

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-[var(--radius-tag)] border border-[var(--color-tag-border)] bg-[var(--color-tag)] px-2 py-0.5 text-sm text-[var(--color-tag-text)] ${className}`}
    >
      {hasIcon && iconPosition === 'leading' && (
        <span className="inline-flex shrink-0">{icon}</span>
      )}
      <span>{label}</span>
      {hasIcon && iconPosition === 'trailing' && (
        <span className="inline-flex shrink-0">{icon}</span>
      )}
      {onDismiss && (
        <button
          type="button"
          aria-label={`Remove ${label}`}
          onClick={onDismiss}
          className="ml-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full text-current opacity-60 transition-opacity hover:opacity-100"
        >
          <svg
            className="h-3 w-3"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M2 2l8 8M10 2l-8 8" />
          </svg>
        </button>
      )}
    </span>
  )
}
