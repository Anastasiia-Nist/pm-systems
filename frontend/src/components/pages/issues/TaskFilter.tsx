import { useMemo } from 'react'
import { useBoardStore } from '@/store/useBoardStore'
import UiFilter from '@/components/ui/UiFilter'
import { TaskStatus, TaskFilters, FilterValue } from '@/types/task'
import { Board } from '@/types/boards'

interface TaskFilterProps {
  filters: TaskFilters
  onToggle: (key: keyof TaskFilters, value: FilterValue) => void
  onSubmit: (e: React.FormEvent) => void
  onReset: () => void
}

export default function TaskFilter({ filters, onToggle, onSubmit, onReset }: TaskFilterProps) {
  const boards: Board[] = useBoardStore((state) => state.boards)
  const filterGroups = useMemo(
    () => [
      {
        key: 'statuses',
        title: 'Статус задачи',
        options: Object.values(TaskStatus).map((status) => ({
          value: { id: status },
          label: status,
          checked: filters.statuses.some((b) => b.id === status),
        })),
      },
      {
        key: 'boards',
        title: 'Доска',
        options: boards.map((board) => ({
          value: board,
          label: board.name,
          checked: filters.boards.some((b) => b.id === board.id),
        })),
      },
    ],
    [boards, filters]
  )

  return (
    <UiFilter
      groups={filterGroups}
      onToggle={onToggle}
      onSubmit={onSubmit}
      onReset={onReset}
      showSubmitButton
      showResetButton
    />
  )
}
