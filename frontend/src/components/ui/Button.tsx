import React from 'react'

export interface ButtonProps {
  label: string
  variant?: 'primary' | 'secondary' | 'nav'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  icon?: React.ReactNode
  iconPosition?: 'leading' | 'trailing' | 'only'
  id?: string
  class?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
}

const variantStyles: Record<string, string> = {
  primary:
    'bg-btn-primary text-btn-primary-text border border-btn-primary-border shadow-btn-primary hover:bg-btn-primary-hover hover:text-btn-primary-text focus-visible:text-btn-primary-text active:shadow-btn-primary-active disabled:bg-btn-primary-disabled disabled:text-btn-primary-disabled-text disabled:shadow-none duration-150',
  secondary:
    'bg-btn-secondary text-page-text border border-btn-secondary-border shadow-btn-secondary hover:bg-btn-secondary-hover hover:text-page-text focus-visible:text-page-text active:shadow-btn-secondary-active disabled:bg-btn-secondary-disabled disabled:text-btn-secondary-disabled-text disabled:shadow-none duration-150',
  nav: 'bg-nav-bg text-nav-btn-fg hover:bg-nav-arrow-hover focus-visible:bg-nav-arrow-hover disabled:opacity-30 disabled:!cursor-default disabled:pointer-events-none active:!translate-y-0',
}

const navIconSizes: Record<string, string> = {
  sm: 'h-10 w-10',
  md: 'h-12 w-12',
  lg: 'h-14 w-14',
}

const sizeStyles: Record<
  string,
  (iconPosition?: string, variant?: string) => string
> = {
  sm: (ip, v) =>
    ip === 'only'
      ? v === 'nav'
        ? navIconSizes.sm
        : 'p-btn-icon-sm'
      : 'px-btn-x-sm py-btn-y-sm text-small',
  md: (ip, v) =>
    ip === 'only'
      ? v === 'nav'
        ? navIconSizes.md
        : 'p-btn-icon-md'
      : 'px-btn-x-md py-btn-y-md',
  lg: (ip, v) =>
    ip === 'only'
      ? v === 'nav'
        ? navIconSizes.lg
        : 'p-btn-icon-lg'
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
    'inline-flex items-center justify-center gap-2 rounded-md disabled:cursor-not-allowed translate-y-0 active:translate-y-1 pointer-coarse:active:duration-0'

  const v = variantStyles[variant]
  const s = sizeStyles[size]?.(iconPosition, variant) ?? ''

  const classes = `${base} ${v} ${s} ${className}`.trim()

  const content = (
    <>
      {iconPosition === 'only' && <span className="sr-only">{label}</span>}
      {icon && (iconPosition === 'leading' || iconPosition === 'only') && icon}
      {iconPosition !== 'only' && <span>{label}</span>}
      {icon && iconPosition === 'trailing' && icon}
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
