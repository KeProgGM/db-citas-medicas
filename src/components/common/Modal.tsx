
import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { X } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description?: string
  children: ReactNode
  footer?: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
}: ModalProps) {

  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={`
          flex max-h-[90vh] w-full flex-col
          overflow-hidden rounded-2xl bg-white shadow-xl
          ${sizes[size]}
        `}
      >

        {/* ENCABEZADO */}

        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-6 py-4">

          <div>
            <h2
              id="modal-title"
              className="text-lg font-bold text-slate-800"
            >
              {title}
            </h2>

            {description && (
              <p className="mt-1 text-sm text-slate-500">
                {description}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar ventana"
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
          >
            <X size={20} />
          </button>

        </div>

        {/* CONTENIDO */}

        <div className="min-h-0 flex-1 overflow-y-auto p-6">
          {children}
        </div>

        {/* PIE */}

        {footer && (
          <div className="shrink-0 border-t border-slate-200 bg-slate-50 px-6 py-4">
            {footer}
          </div>
        )}

      </div>

    </div>
  )
}
