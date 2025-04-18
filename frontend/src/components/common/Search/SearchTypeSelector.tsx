import UiInput from '@/components/ui/UiInput'

interface Option {
  value: string
  label: string
}

interface SearchTypeSelectorProps {
  options: Option[]
  selectedValue: string
  onChange: (value: string) => void
}

export default function SearchTypeSelector({
  options,
  selectedValue,
  onChange,
}: SearchTypeSelectorProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }

  return (
    <div>
      {options.map(({ value, label }) => (
        <label key={value}>
          <UiInput
            type="radio"
            name="searchType"
            value={value}
            checked={selectedValue === value}
            onChange={handleChange}
          />
          {label}
        </label>
      ))}
    </div>
  )
}
