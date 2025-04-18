interface UiInputProps {
  label?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown: () => void
  placeholder?: string
}

export default function UiInput({
  label,
  value,
  onChange,
  onKeyDown,
  placeholder = 'Введите текст...',
}: UiInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onKeyDown()
    }
  }

  return (
    <div className="input">
      {label && <label className="input__label">{label}</label>}
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}
