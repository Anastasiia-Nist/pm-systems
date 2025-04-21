import '@/styles/components/ui/UiTextarea.css'

interface UiTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string
  value?: string | number
  label?: string
  placeholder?: string
  required?: boolean
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void
  error?: string
}

export default function UiTextarea({
  name,
  value,
  label,
  placeholder,
  required,
  onChange,
  onBlur,
  error,
  ...commonProps
}: UiTextareaProps) {
  return (
    <div className="textarea">
      {label && (
        <label className="textarea__label">
          {required && <span className="textarea__required">* </span>}
          {label}
        </label>
      )}
      <textarea
        name={name}
        value={value}
        placeholder={placeholder}
        {...commonProps}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <div className="textarea__error">{error}</div>}
    </div>
  )
}
