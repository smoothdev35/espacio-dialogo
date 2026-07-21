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
    'bg-btn-primary text-btn-primary-text border border-btn-primary-border hover:bg-btn-primary-hover active:bg-btn-primary-active disabled:bg-btn-primary-disabled disabled:text-btn-primary-disabled-text',
  secondary:
    'bg-btn-secondary text-btn-secondary-text border border-btn-secondary-border hover:bg-btn-secondary-hover active:bg-btn-secondary-active disabled:bg-btn-secondary-disabled disabled:text-btn-secondary-disabled-text',
  tertiary:
    'bg-btn-tertiary text-btn-tertiary-text hover:bg-btn-tertiary-hover active:bg-btn-tertiary-active disabled:bg-btn-tertiary-disabled disabled:text-btn-tertiary-disabled-text',
  link: 'bg-btn-link text-btn-link-text hover:text-btn-link-hover active:text-btn-link-active disabled:text-btn-link-disabled-text underline-offset-4 hover:underline',
}

const sizeStyles: Record<string, (iconPosition?: string) => string> = {
  sm: (ip) =>
    ip === 'only'
      ? 'p-btn-icon-sm'
      : 'px-btn-x-sm py-btn-y-sm text-small',
  md: (ip) =>
    ip === 'only'
      ? 'p-btn-icon-md'
      : 'px-btn-x-md py-btn-y-md',
  lg: (ip) =>
    ip === 'only'
      ? 'p-btn-icon-lg'
      : 'px-btn-x-lg py-btn-y-lg text-large',
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
    'inline-flex items-center justify-center rounded-(--radius-button) transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 disabled:cursor-not-allowed'

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
