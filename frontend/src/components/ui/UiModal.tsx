import { ReactNode, useEffect } from 'react'
import '@/styles/components/UiModal.css'

type ModalProps = {
  open: boolean
  onClose: () => void
  children: ReactNode
  className?: string
}

export default function UiModal({ open, onClose, children, className = '' }: ModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (open) window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className={`modal-overlay ${open ? 'open' : ''}`} onClick={onClose}>
      <div className={`modal ${className}`} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}
