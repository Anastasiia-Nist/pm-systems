import '@/styles/components/ui/UiInput.css'

interface UiInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  type?: React.HTMLInputTypeAttribute
  value?: string | number
  checked?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: (e: React.KeyboardEvent) => void
  placeholder?: string
  required?: boolean
  error?: string
}

export default function UiInput({
  label,
  value,
  type = 'text',
  onChange,
  onBlur,
  onKeyDown,
  checked,
  placeholder = 'Введите текст...',
  required,
  error,
  ...commonProps
}: UiInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onKeyDown?.(e)
    }
  }

  return (
    <>
      <div className="input">
        {label && (
          <label className="input__label">
            {required && <span className="input__required">* </span>}
            {label}
          </label>
        )}
        <input
          type={type}
          value={value}
          checked={type === 'radio' ? checked : undefined}
          placeholder={placeholder}
          {...commonProps}
          onChange={onChange}
          onBlur={onBlur}
          onKeyDown={type === 'text' ? handleKeyDown : undefined}
        />
      </div>
      {error && <span className="input__error">{error}</span>}
    </>
  )
}
