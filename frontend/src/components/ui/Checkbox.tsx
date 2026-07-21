import React from 'react'

export interface CheckboxProps {
  label: string
  id: string
  name: string
  value: string
  checked?: boolean
  disabled?: boolean
  errorMessage?: string
  class?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

export function Checkbox({
  label,
  id,
  name,
  value,
  checked = false,
  disabled = false,
  errorMessage,
  class: className = '',
  onChange,
}: CheckboxProps) {
  const hasError = !!errorMessage
  const errorId = `${id}-error`

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label htmlFor={id} className="flex cursor-pointer items-center gap-2">
        <input
          type="checkbox"
          id={id}
          name={name}
          value={value}
          checked={checked}
          disabled={disabled}
          aria-invalid={hasError ? 'true' : undefined}
          aria-describedby={hasError ? errorId : undefined}
          onChange={onChange}
          className="peer sr-only"
        />
        <span
          className="flex h-4 w-4 shrink-0 items-center justify-center rounded-checkbox border border-checkbox-border bg-checkbox-bg transition-colors peer-checked:border-checkbox-bg-checked peer-checked:bg-checkbox-bg-checked peer-focus-visible:ring-2 peer-focus-visible:ring-border-focus peer-focus-visible:ring-offset-2 peer-disabled:opacity-50"
          aria-hidden="true"
        >
          <svg
            className="h-3 w-3 text-checkbox-check opacity-0 transition-opacity peer-checked:opacity-100"
            viewBox="0 0 12 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M1 5l3.5 3.5L11 1" />
          </svg>
        </span>
        <span className="text-sm text-surface-text">
          {label}
        </span>
      </label>
      {hasError && (
        <p
          id={errorId}
          className="ml-6 text-sm text-[var(--color-error)]"
          role="alert"
        >
          {errorMessage}
        </p>
      )}
    </div>
  )
}
