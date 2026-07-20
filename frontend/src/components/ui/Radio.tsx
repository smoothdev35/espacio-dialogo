import React from 'react'

export interface RadioOption {
  value: string
  label: string
  disabled?: boolean
  checked?: boolean
}

export interface RadioGroupProps {
  legend: string
  name: string
  options: RadioOption[]
  errorMessage?: string
  class?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

export function RadioGroup({
  legend,
  name,
  options,
  errorMessage,
  class: className = '',
  onChange,
}: RadioGroupProps) {
  const hasError = !!errorMessage
  const groupId = `radio-group-${name}`
  const errorId = `${groupId}-error`

  return (
    <fieldset className={`flex flex-col gap-2 ${className}`}>
      <legend className="text-sm font-medium text-[var(--color-surface-text)]">
        {legend}
      </legend>
      {options.map((opt) => {
        const optId = `${groupId}-${opt.value}`
        return (
          <label
            key={opt.value}
            htmlFor={optId}
            className="flex cursor-pointer items-center gap-2"
          >
            <input
              type="radio"
              id={optId}
              name={name}
              value={opt.value}
              checked={opt.checked}
              disabled={opt.disabled}
              aria-invalid={hasError ? 'true' : undefined}
              aria-describedby={hasError ? errorId : undefined}
              onChange={onChange}
              className="peer sr-only"
            />
            <span
              className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-[var(--color-radio-border)] bg-[var(--color-radio-bg)] transition-colors peer-checked:border-[var(--color-radio-bg-checked)] peer-checked:bg-[var(--color-radio-bg-checked)] peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--color-border-focus)] peer-focus-visible:ring-offset-2 peer-disabled:opacity-50"
              aria-hidden="true"
            >
              <span className="h-2 w-2 rounded-full bg-[var(--color-radio-dot)] opacity-0 transition-opacity peer-checked:opacity-100" />
            </span>
            <span className="text-sm text-[var(--color-surface-text)]">
              {opt.label}
            </span>
          </label>
        )
      })}
      {hasError && (
        <p
          id={errorId}
          className="text-sm text-[var(--color-error)]"
          role="alert"
        >
          {errorMessage}
        </p>
      )}
    </fieldset>
  )
}
