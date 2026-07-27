/**
 * FooterContact
 *
 * Props: none
 * Slots: none
 * Tokens: --color-btn-primary, --color-btn-primary-text, --color-btn-primary-border,
 *         --color-btn-secondary, --color-btn-secondary-border,
 *         --spacing-btn-x-sm, --spacing-btn-y-sm, --font-body, --text-sm
 * Hardcoded literals: EMAIL ("hello@ndtc.org"), heading/copy text
 * Context variants: not needed (inherits footer surface)
 * Composed from: Button (React variant — mailto link)
 */

import { useState, useCallback } from 'react'
import { Button } from '../../components/ui/Button'

const EMAIL = 'hello@ndtc.org'

type CopyState = 'idle' | 'copied' | 'error'

function ClipboardIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

export default function FooterContact() {
  const [copyState, setCopyState] = useState<CopyState>('idle')

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopyState('copied')
    } catch {
      setCopyState('error')
    }
    setTimeout(() => setCopyState('idle'), 2000)
  }, [])

  const copyLabel =
    copyState === 'idle' ? 'Copy email' : copyState === 'copied' ? 'Copied!' : 'Failed!'

  const announceMsg =
    copyState === 'copied'
      ? 'Email address copied'
      : copyState === 'error'
        ? 'Failed to copy. Try again.'
        : ''

  const copyIcon =
    copyState === 'copied' ? <CheckIcon /> : copyState === 'error' ? <XIcon /> : <ClipboardIcon />

  return (
    <>
      <style>{`
        @keyframes wiggle {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-2px); }
          75% { transform: translateX(2px); }
        }
        .wiggle {
          animation: wiggle 0.2s ease;
        }
      `}</style>

      <div className="flex flex-col gap-4">
        <div>
          <p className="text-large font-semibold">Have a question ?</p>
          <p className="mt-2 text-base">Feel free to reach out!</p>
        </div>

        <div className="flex flex-col gap-4 mt-2 sm:flex-row sm:flex-wrap sm:gap-4">
          <Button label="Send email" variant="primary" size="sm" href={`mailto:${EMAIL}`} />

          <Button
            label={copyLabel}
            variant="secondary"
            size="sm"
            icon={copyIcon}
            iconPosition="trailing"
            onClick={handleCopy}
            class={copyState === 'error' ? 'wiggle' : ''}
          />
        </div>

        <div role="status" aria-live="polite" className="sr-only">
          {announceMsg}
        </div>
      </div>
    </>
  )
}
