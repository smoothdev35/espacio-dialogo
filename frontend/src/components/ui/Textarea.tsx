import React from 'react'

export interface TextareaProps {
  label: string
  id: string
  name: string
  placeholder?: string
  helperText?: string
  errorMessage?: string
  disabled?: boolean
  required?: boolean
  value?: string
  rows?: number
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
  class?: string
}

const resizeMap: Record<string, string> = {
  none: 'resize-none',
  vertical: 'resize-y',
  horizontal: 'resize-x',
  both: 'resize',
}

export function Textarea({
  label,
  id,
  name,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  required = false,
  value,
  rows = 4,
  resize = 'vertical',
  class: className = '',
}: TextareaProps) {
  const hasError = !!errorMessage
  const errorId = `${id}-error`
  const helperId = `${id}-helper`
  const describedBy =
    [helperText && !hasError ? helperId : '', hasError ? errorId : '']
      .filter(Boolean)
      .join(' ') || undefined

  const textareaClasses = [
    'w-full rounded-[var(--radius-input)] border bg-[var(--color-input)] text-[var(--color-input-text)] px-3 py-2 text-[var(--text-input)] font-[var(--font-body)]',
    'placeholder:text-[var(--color-input-placeholder)]',
    'focus:bg-[var(--color-input-focus)] focus:border-[var(--color-input-focus-border)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]',
    'disabled:bg-[var(--color-input-disabled)] disabled:cursor-not-allowed disabled:opacity-60',
    hasError
      ? 'border-[var(--color-error)]'
      : 'border-[var(--color-input-border)]',
    resizeMap[resize] ?? 'resize-y',
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
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        rows={rows}
        disabled={disabled}
        required={required}
        aria-required={required ? 'true' : undefined}
        aria-invalid={hasError ? 'true' : undefined}
        aria-describedby={describedBy}
        className={textareaClasses}
      />
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
