import React from 'react'

export interface ToggleProps {
  label: string
  id: string
  name?: string
  checked?: boolean
  disabled?: boolean
  required?: boolean
  errorMessage?: string
  class?: string
  onChange?: (checked: boolean) => void
}

export function Toggle({
  label,
  id,
  name,
  checked = false,
  disabled = false,
  required = false,
  errorMessage,
  class: className = '',
  onChange,
}: ToggleProps) {
  const hasError = !!errorMessage
  const errorId = `${id}-error`

  const trackClasses = [
    'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-60',
    checked
      ? 'bg-toggle-track-on'
      : 'bg-toggle-track border border-toggle-track-border',
    hasError ? 'border-[var(--color-error)]' : '',
    className,
  ].join(' ')

  const thumbClasses = [
    'pointer-events-none inline-block h-4 w-4 rounded-full shadow-sm ring-0 transition-transform duration-200',
    checked
      ? 'translate-x-5 bg-toggle-thumb-on'
      : 'translate-x-1 bg-toggle-thumb',
  ].join(' ')

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="flex items-center gap-2">
        <button
          type="button"
          role="switch"
          id={id}
          name={name}
          checked={checked}
          disabled={disabled}
          aria-checked={checked}
          aria-required={required ? 'true' : undefined}
          aria-invalid={hasError ? 'true' : undefined}
          aria-describedby={hasError ? errorId : undefined}
          className={trackClasses}
          onClick={() => onChange?.(!checked)}
        >
          <span className={thumbClasses} aria-hidden="true" />
        </button>
        <span className="text-sm text-surface-text">{label}</span>
      </label>
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
