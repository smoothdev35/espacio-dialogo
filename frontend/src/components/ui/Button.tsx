import React from 'react'

export interface ButtonProps {
  label: string
  variant?: 'primary' | 'secondary' | 'tertiary' | 'link'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  icon?: React.ReactNode
  iconPosition?: 'leading' | 'trailing' | 'only'
  class?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
}

const variantStyles: Record<string, string> = {
  primary:
    'bg-[var(--color-btn-primary)] text-[var(--color-btn-primary-text)] hover:bg-[var(--color-btn-primary-hover)] active:bg-[var(--color-btn-primary-active)] disabled:bg-[var(--color-btn-primary-disabled)] disabled:text-[var(--color-btn-primary-disabled-text)]',
  secondary:
    'bg-[var(--color-btn-secondary)] text-[var(--color-btn-secondary-text)] border border-[var(--color-btn-secondary-border)] hover:bg-[var(--color-btn-secondary-hover)] active:bg-[var(--color-btn-secondary-active)] disabled:bg-[var(--color-btn-secondary-disabled)] disabled:text-[var(--color-btn-secondary-disabled-text)]',
  tertiary:
    'bg-[var(--color-btn-tertiary)] text-[var(--color-btn-tertiary-text)] hover:bg-[var(--color-btn-tertiary-hover)] active:bg-[var(--color-btn-tertiary-active)] disabled:bg-[var(--color-btn-tertiary-disabled)] disabled:text-[var(--color-btn-tertiary-disabled-text)]',
  link: 'bg-[var(--color-btn-link)] text-[var(--color-btn-link-text)] hover:text-[var(--color-btn-link-hover)] active:text-[var(--color-btn-link-active)] disabled:text-[var(--color-btn-link-disabled-text)] underline-offset-4 hover:underline',
}

const sizeStyles: Record<string, (iconPosition?: string) => string> = {
  sm: (ip) =>
    ip === 'only'
      ? 'p-[var(--spacing-btn-icon-sm)]'
      : 'px-[var(--spacing-btn-x-sm)] py-[var(--spacing-btn-y-sm)] text-[var(--text-small)]',
  md: (ip) =>
    ip === 'only'
      ? 'p-[var(--spacing-btn-icon-md)]'
      : 'px-[var(--spacing-btn-x-md)] py-[var(--spacing-btn-y-md)] text-[var(--text-button)]',
  lg: (ip) =>
    ip === 'only'
      ? 'p-[var(--spacing-btn-icon-lg)]'
      : 'px-[var(--spacing-btn-x-lg)] py-[var(--spacing-btn-y-lg)] text-[var(--text-large)]',
}

export function Button({
  label,
  variant = 'primary',
  size = 'md',
  href,
  disabled = false,
  type = 'button',
  icon,
  iconPosition,
  class: className = '',
  onClick,
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2 disabled:cursor-not-allowed'

  const v = variantStyles[variant]
  const s = sizeStyles[size]?.(iconPosition) ?? ''

  const classes = `${base} ${v} ${s} ${className}`.trim()

  const content = (
    <>
      {iconPosition === 'only' && <span className="sr-only">{label}</span>}
      {iconPosition === 'leading' && icon}
      {iconPosition !== 'only' && <span>{label}</span>}
      {iconPosition === 'trailing' && icon}
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={iconPosition === 'only' ? label : undefined}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={classes}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
    >
      {content}
    </button>
  )
}
