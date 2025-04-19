import UiButton from '@/components/ui/UiButton'

export interface UiFilterGroup<T> {
  key: string
  title: string
  options: {
    value: T
    checked: boolean
    label?: string
  }[]
}

interface UiFilterProps<K, T> {
  groups: UiFilterGroup<T>[]
  onToggle: (key: K, value: T) => void
  onSubmit: (e: React.FormEvent) => void
  onReset: () => void
  showSubmitButton?: boolean
  showResetButton?: boolean
}

export default function UiFilter<K, T>({
  groups,
  onToggle,
  onSubmit,
  onReset,
  showSubmitButton = true,
  showResetButton = true,
}: UiFilterProps<K, T>) {
  return (
    <form onSubmit={onSubmit} onReset={onReset}>
      {groups.map(({ key, title, options }) => (
        <fieldset key={key as React.Key}>
          <legend>{title}</legend>
          {options.map((option, index) => (
            <label key={index}>
              <input
                type="checkbox"
                checked={option.checked}
                onChange={() => onToggle(key as K, option.value)}
              />
              {option?.label}
            </label>
          ))}
        </fieldset>
      ))}
      {showSubmitButton && <UiButton buttonText="Применить фильтры" type="submit" />}
      {showResetButton && <UiButton buttonText="Очистить фильтры" type="reset" />}
    </form>
  )
}
