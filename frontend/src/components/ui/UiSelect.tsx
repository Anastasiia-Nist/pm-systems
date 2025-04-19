export type SelectOption = {
  value: string | number
  label: string
}

interface UiSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string
  value: string | number
  label?: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  options: SelectOption[]
  required?: boolean
}

export default function UiSelect({
  name,
  value,
  label,
  onChange,
  options,
  required,
  ...rest
}: UiSelectProps) {
  return (
    <div className="select">
      {label && <label className="select__label">{label}</label>}
      <select name={name} value={value} onChange={onChange} required={required} {...rest}>
        <option value="">Выберите</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}
