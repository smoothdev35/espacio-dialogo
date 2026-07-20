import React from 'react'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectGroup {
  label: string
  options: SelectOption[]
}

export interface SelectProps {
  label: string
  id: string
  name: string
  options: SelectOption[]
  groups?: SelectGroup[]
  placeholder?: string
  value?: string
  disabled?: boolean
  errorMessage?: string
  helperText?: string
  required?: boolean
  leftIcon?: React.ReactNode
  class?: string
}

export function Select({
  label,
  id,
  name,
  options,
  groups,
  placeholder,
  value,
  disabled = false,
  errorMessage,
  helperText,
  required = false,
  leftIcon,
  class: className = '',
}: SelectProps) {
  const hasError = !!errorMessage
  const errorId = `${id}-error`
  const helperId = `${id}-helper`
  const describedBy =
    [helperText && !hasError ? helperId : '', hasError ? errorId : '']
      .filter(Boolean)
      .join(' ') || undefined

  const hasLeftIcon = !!leftIcon

  const selectClasses = [
    'w-full rounded-[var(--radius-input)] border bg-[var(--color-input)] text-[var(--color-input-text)] py-2 text-[var(--text-select)] font-[var(--font-body)]',
    'focus:bg-[var(--color-input-focus)] focus:border-[var(--color-input-focus-border)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]',
    'disabled:bg-[var(--color-input-disabled)] disabled:cursor-not-allowed disabled:opacity-60',
    hasError
      ? 'border-[var(--color-error)]'
      : 'border-[var(--color-input-border)]',
    // Adjust padding based on icon presence
    hasLeftIcon ? 'pl-9' : 'pl-3',
    'pr-3',
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
        <select
          id={id}
          name={name}
          value={value}
          disabled={disabled}
          required={required}
          aria-required={required ? 'true' : undefined}
          aria-invalid={hasError ? 'true' : undefined}
          aria-describedby={describedBy}
          className={selectClasses}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {groups
            ? groups.map((group) => (
                <optgroup key={group.label} label={group.label}>
                  {group.options.map((opt) => (
                    <option
                      key={opt.value}
                      value={opt.value}
                      disabled={opt.disabled}
                    >
                      {opt.label}
                    </option>
                  ))}
                </optgroup>
              ))
            : options.map((opt) => (
                <option
                  key={opt.value}
                  value={opt.value}
                  disabled={opt.disabled}
                >
                  {opt.label}
                </option>
              ))}
        </select>
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
