import React from 'react'

export interface InputProps {
  label: string
  id: string
  name: string
  type?: 'text' | 'email' | 'tel' | 'url' | 'number' | 'search' | 'password'
  placeholder?: string
  helperText?: string
  errorMessage?: string
  disabled?: boolean
  required?: boolean
  value?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  class?: string
}

export function Input({
  label,
  id,
  name,
  type = 'text',
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  required = false,
  value,
  leftIcon,
  rightIcon,
  class: className = '',
}: InputProps) {
  const hasError = !!errorMessage
  const errorId = `${id}-error`
  const helperId = `${id}-helper`
  const describedBy =
    [helperText && !hasError ? helperId : '', hasError ? errorId : '']
      .filter(Boolean)
      .join(' ') || undefined

  const hasLeftIcon = !!leftIcon
  const hasRightIcon = !!rightIcon

  const inputClasses = [
    'w-full rounded-[var(--radius-input)] border bg-[var(--color-input)] text-[var(--color-input-text)] py-2 text-[var(--text-input)] font-[var(--font-body)]',
    'placeholder:text-[var(--color-input-placeholder)]',
    'focus:bg-[var(--color-input-focus)] focus:border-[var(--color-input-focus-border)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]',
    'disabled:bg-[var(--color-input-disabled)] disabled:cursor-not-allowed disabled:opacity-60',
    hasError
      ? 'border-[var(--color-error)]'
      : 'border-[var(--color-input-border)]',
    // Adjust padding based on icon presence
    hasLeftIcon ? 'pl-9' : 'pl-3',
    hasRightIcon ? 'pr-9' : 'pr-3',
    className,
  ].join(' ')

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className="text-sm font-medium text-[var(--color-surface-text)]"
      >
        {label}
        {required && (
          <span className="ml-1 text-[var(--color-error)]" aria-hidden="true">
            *
          </span>
        )}
      </label>
      <div className="relative">
        {hasLeftIcon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-input-placeholder)]">
            {leftIcon}
          </span>
        )}
        <input
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          required={required}
          aria-required={required ? 'true' : undefined}
          aria-invalid={hasError ? 'true' : undefined}
          aria-describedby={describedBy}
          className={inputClasses}
        />
        {hasRightIcon && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-input-placeholder)]">
            {rightIcon}
          </span>
        )}
      </div>
      {helperText && !hasError && (
        <p
          id={helperId}
          className="text-sm text-[var(--color-surface-text)] opacity-70"
        >
          {helperText}
        </p>
      )}
      {hasError && (
        <p
          id={errorId}
          className="text-sm text-[var(--color-error)]"
          role="alert"
        >
          {errorMessage}
        </p>
      )}
    </div>
  )
}
