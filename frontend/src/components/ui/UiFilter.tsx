import UiButton from '@/components/ui/UiButton'

export interface UiFilterGroup {
  key: string
  title: string
  options: {
    value: string
    checked: boolean
    label?: string
  }[]
}

interface UiFilterProps {
  groups: UiFilterGroup[]
  onToggle: (key: string, value: string) => void
  onSubmit: (e: React.FormEvent) => void
  onReset: () => void
  showSubmitButton?: boolean
  showResetButton?: boolean
}

export default function UiFilter({
  groups,
  onToggle,
  onSubmit,
  onReset,
  showSubmitButton = true,
  showResetButton = true,
}: UiFilterProps) {
  return (
    <form onSubmit={onSubmit} onReset={onReset}>
      {groups.map(({ key, title, options }) => (
        <fieldset key={key}>
          <legend>{title}</legend>
          {options.map((option, index) => (
            <label key={index}>
              <input
                type="checkbox"
                checked={option.checked}
                onChange={() => onToggle(key, option.value)}
              />
              {option?.label ?? option.value}
            </label>
          ))}
        </fieldset>
      ))}
      {showSubmitButton && <UiButton buttonText="Применить фильтры" type="submit" />}
      {showResetButton && <UiButton buttonText="Очистить фильтры" type="reset" />}
    </form>
  )
}
