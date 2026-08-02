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
import { FOOTER_CONTACT } from '../../lib/content'

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
    copyState === 'idle' ? FOOTER_CONTACT.copyEmail : copyState === 'copied' ? FOOTER_CONTACT.copied : FOOTER_CONTACT.copyFailed

  const announceMsg =
    copyState === 'copied'
      ? FOOTER_CONTACT.copiedAnnounce
      : copyState === 'error'
        ? FOOTER_CONTACT.copyFailedAnnounce
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

      <div className="flex flex-col gap-6">
        <div>
          <p className="text-large font-semibold">{FOOTER_CONTACT.heading}</p>
          <p className="mt-2 text-body">{FOOTER_CONTACT.subtitle}</p>
        </div>

        <div className="flex flex-row flex-wrap gap-4 mt-4">
          <Button label={FOOTER_CONTACT.sendEmail} variant="primary" size="md" class="lg:px-(--spacing-btn-x-sm) lg:py-(--spacing-btn-y-sm)" href={`mailto:${EMAIL}`} />

          <Button
            label={copyLabel}
            variant="secondary"
            size="md"
            icon={copyIcon}
            iconPosition="trailing"
            onClick={handleCopy}
            class={`${copyState === 'error' ? 'wiggle ' : ''}lg:px-(--spacing-btn-x-sm) lg:py-(--spacing-btn-y-sm)`}
          />
        </div>

        <div role="status" aria-live="polite" className="sr-only">
          {announceMsg}
        </div>
      </div>
    </>
  )
}
