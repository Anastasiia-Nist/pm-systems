type ButtonProps = {
  buttonText: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

export default function UiButton({
  buttonText,
  onClick,
  type = 'button',
  disabled = false,
}: ButtonProps) {
  return (
    <button type={type} onClick={onClick} disabled={disabled}>
      {buttonText}
    </button>
  )
}
