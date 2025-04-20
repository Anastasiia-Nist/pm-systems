import UiInput from '@/components/ui/UiInput'
import '@/styles/components/common/Search/SearchTypeSelector.css'

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
    <div className="search__checkbox">
      {options.map(({ value, label }) => (
        <UiInput
          type="radio"
          name="searchType"
          key={value}
          label={label}
          value={value}
          checked={selectedValue === value}
          onChange={handleChange}
        />
      ))}
    </div>
  )
}
