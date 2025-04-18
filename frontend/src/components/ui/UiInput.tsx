interface UiInputProps {
  label?: string
  type?: React.HTMLInputTypeAttribute
  value?: string
  checked?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: () => void
  placeholder?: string
  name?: string
}

export default function UiInput({
  label,
  value,
  type = 'text',
  onChange,
  onKeyDown,
  checked,
  placeholder = 'Введите текст...',
  name = '',
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
        name={name}
        checked={type === 'radio' ? checked : undefined}
        onChange={onChange}
        placeholder={placeholder}
        onKeyDown={type === 'text' ? handleKeyDown : undefined}
      />
    </div>
  )
}
