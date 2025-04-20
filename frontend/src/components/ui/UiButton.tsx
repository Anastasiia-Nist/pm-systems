import clsx from 'clsx'
import '@/styles/components/ui/UiButton.css'

type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  className?: string
}

export default function UiButton({
  children,
  onClick,
  type = 'button',
  disabled = false,
  className,
}: ButtonProps) {
  return (
    <button className={clsx('button', className)} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}
