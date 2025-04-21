import React, { ReactNode, useEffect, useCallback } from 'react'
import '@/styles/components/ui/UiModal.css'

type ModalProps = {
  open: boolean
  onClose: () => void
  children: ReactNode
  className?: string
}

export default function UiModal({ open, onClose, children, className = '' }: ModalProps) {
  const handleEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    },
    [onClose]
  )

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onClose()
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (open) {
      window.addEventListener('keydown', handleEsc)
      document.body.classList.add('overflow')
    }

    return () => {
      window.removeEventListener('keydown', handleEsc)
      document.body.classList.remove('overflow')
    }
  }, [open, handleEsc])

  if (!open) return null

  return (
    <div className={`modal-overlay open`} onMouseDown={handleOverlayClick}>
      <div className={`modal ${className}`} onClick={(e) => e.stopPropagation()}>
        <div className="modal-overlay__close" onClick={onClose}>
          <span>&times;</span>
        </div>
        {children}
      </div>
    </div>
  )
}
