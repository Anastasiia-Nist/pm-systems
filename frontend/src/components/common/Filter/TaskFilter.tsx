import { useState } from 'react'
import { TaskFilters, FilterKey, FilterValue } from '@/types/task'
import { filterOptions, clearedTaskFilters } from './constants'
import UiFilter, { UiFilterGroup } from '@/components/ui/UiFilter'

interface TaskFilterProps {
  onApply: (filters: TaskFilters) => void
}

export default function Filter({ onApply }: TaskFilterProps) {
  const [filters, setFilters] = useState<TaskFilters>(clearedTaskFilters)

  const toggleValue = <K extends FilterKey>(key: K, value: FilterValue) => {
    setFilters((prev) => {
      const current = prev[key] as FilterValue[]
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value]

      return {
        ...prev,
        [key]: updated,
      }
    })
  }

  const handleToggle = (key: string, value: string) => {
    toggleValue(key as FilterKey, value as FilterValue)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onApply(filters)
  }

  const handleReset = () => {
    setFilters(clearedTaskFilters)
    onApply(clearedTaskFilters)
  }

  const groups: UiFilterGroup[] = [
    {
      title: filterOptions.priorities.title,
      key: 'priorities',
      options: filterOptions.priorities.values.map((value) => ({
        value,
        checked: filters.priorities.includes(value),
      })),
    },
    {
      title: filterOptions.statuses.title,
      key: 'statuses',
      options: filterOptions.statuses.values.map((value) => ({
        value,
        checked: filters.statuses.includes(value),
      })),
    },
  ]

  return (
    <UiFilter
      groups={groups}
      onToggle={handleToggle}
      onSubmit={handleSubmit}
      onReset={handleReset}
    />
  )
}
