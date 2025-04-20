import UiButton from '@/components/ui/UiButton'
import '@/styles/components/ui/UiFilter.css'

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
    <form className="filter" onSubmit={onSubmit} onReset={onReset}>
      {groups.map(({ key, title, options }) => (
        <fieldset className="filter__fieldset" key={key as React.Key}>
          <legend>{title}</legend>
          {options.map((option, index) => (
            <label className="filter__checkbox" key={index}>
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
      <div className="filter__buttons">
        {showSubmitButton && <UiButton type="submit">Применить фильтры</UiButton>}
        {showResetButton && <UiButton type="reset">Очистить фильтры</UiButton>}
      </div>
    </form>
  )
}
