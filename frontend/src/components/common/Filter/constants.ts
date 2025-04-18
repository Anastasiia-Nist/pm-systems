import { TaskPriority, TaskStatus, TaskFilters } from '@/types/task'

export const clearedTaskFilters: TaskFilters = {
  priorities: [],
  statuses: [],
}

export const filterOptions = {
  priorities: {
    title: 'Приоритет',
    values: Object.values(TaskPriority),
  },
  statuses: {
    title: 'Статус',
    values: Object.values(TaskStatus),
  },
}
