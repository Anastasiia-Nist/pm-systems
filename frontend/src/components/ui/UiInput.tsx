import '@/styles/components/ui/UiInput.css'

interface UiInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  type?: React.HTMLInputTypeAttribute
  value?: string | number
  checked?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: () => void
  placeholder?: string
}

export default function UiInput({
  label,
  value,
  type = 'text',
  onChange,
  onKeyDown,
  checked,
  placeholder = 'Введите текст...',
  ...commonProps
}: UiInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onKeyDown?.()
    }
  }

  return (
    <div className="input">
      {label && <label className="input__label">{label}</label>}
      <input
        type={type}
        value={value}
        checked={type === 'radio' ? checked : undefined}
        placeholder={placeholder}
        {...commonProps}
        onChange={onChange}
        onKeyDown={type === 'text' ? handleKeyDown : undefined}
      />
    </div>
  )
}
