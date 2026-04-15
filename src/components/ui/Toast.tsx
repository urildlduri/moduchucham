'use client'
import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

type ToastType = 'success' | 'info' | 'error'
interface Toast { id: number; message: string; type: ToastType }

const ToastCtx = createContext<{ show: (msg: string, type?: ToastType) => void }>({ show: () => {} })

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const show = useCallback((message: string, type: ToastType = 'info') => {
    const id = Date.now()
    setToasts(t => [...t, { id, message, type }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000)
  }, [])

  const borderColors = { success: '#4ade80', info: 'var(--gold3)', error: 'var(--red)' }

  return (
    <ToastCtx.Provider value={{ show }}>
      {children}
      <div className="fixed top-20 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
        {toasts.map(t => (
          <div
            key={t.id}
            className="animate-fade-up rounded-xl px-4 py-3 text-sm font-semibold text-white max-w-xs pointer-events-none"
            style={{
              background: 'var(--dark)',
              borderLeft: `3px solid ${borderColors[t.type]}`,
              boxShadow: '0 4px 20px rgba(0,0,0,.25)',
            }}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  )
}

export const useToast = () => useContext(ToastCtx)
