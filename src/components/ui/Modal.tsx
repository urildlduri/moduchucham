'use client'
import { ReactNode, useEffect } from 'react'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  subtitle?: string
  children: ReactNode
  maxWidth?: string
}

export default function Modal({ open, onClose, title, subtitle, children, maxWidth = '480px' }: ModalProps) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center p-5"
      style={{ background: 'rgba(0,0,0,.55)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="bg-white rounded-3xl p-8 w-full animate-fade-up"
        style={{ maxWidth }}
      >
        <h3 className="text-xl font-extrabold tracking-tight mb-1" style={{ color: 'var(--text)' }}>
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm mb-6" style={{ color: 'var(--text4)' }}>{subtitle}</p>
        )}
        {children}
      </div>
    </div>
  )
}
