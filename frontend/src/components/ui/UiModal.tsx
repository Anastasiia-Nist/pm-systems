import React, { ReactNode, useEffect } from 'react'
import '@/styles/components/ui/UiModal.css'

type ModalProps = {
  open: boolean
  onClose: (event: React.MouseEvent<HTMLDivElement> | KeyboardEvent) => void
  children: ReactNode
  className?: string
}

export default function UiModal({ open, onClose, children, className = '' }: ModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose(e)
    }
    if (open) {
      window.addEventListener('keydown', handleEsc)
      document.body.classList.add('overflow')
    }
    return () => {
      window.removeEventListener('keydown', handleEsc)
      document.body.classList.remove('overflow')
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className={`modal-overlay ${open ? 'open' : ''}`} onMouseDown={(e) => onClose(e)}>
      <div className={`modal ${className}`} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}
