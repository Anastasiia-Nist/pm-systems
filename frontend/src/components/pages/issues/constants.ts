import { Board } from '@/types/boards'
import { User } from '@/types/user'
import { TaskPriority, TaskStatus, TaskFormData, TaskFormField, SelectOption } from '@/types/task'

export const clearedTaskFilters = {
  boards: [],
  statuses: [],
}
export const searchTypes = [
  { value: 'title', label: 'По названию' },
  { value: 'assignee', label: 'По исполнителю' },
]

export const defaultTaskForm = {
  title: '',
  description: '',
  priority: null,
  status: null,
  boardId: null,
  assigneeId: null,
} as TaskFormData

export const TASK_FORM_FIELDS: TaskFormField[] = [
  {
    name: 'title',
    label: 'Название',
    type: 'text',
    required: true,
    minLength: 3,
    maxLength: 100,
  },
  {
    name: 'description',
    label: 'Описание',
    type: 'textarea',
    required: true,
    minLength: 10,
    maxLength: 100,
  },
  {
    name: 'boardId',
    label: 'Доска',
    type: 'select',
    required: true,
    hidden: (modalType: string) => modalType !== 'create',
    getOptions: (boards) => {
      return (boards as Board[]).map(
        (board) =>
          ({
            value: board.id,
            label: board.name,
          }) as SelectOption
      )
    },
  },
  {
    name: 'priority',
    label: 'Приоритет',
    type: 'select',
    options: [
      { value: TaskPriority.Low, label: 'Низкий' },
      { value: TaskPriority.Medium, label: 'Средний' },
      { value: TaskPriority.High, label: 'Высокий' },
    ],
    required: true,
  },
  {
    name: 'status',
    label: 'Статус',
    type: 'select',
    options: [
      { value: TaskStatus.Backlog, label: 'Backlog' },
      { value: TaskStatus.InProgress, label: 'In Progress' },
      { value: TaskStatus.Done, label: 'Done' },
    ],
    required: true,
  },
  {
    name: 'assigneeId',
    label: 'Исполнитель',
    type: 'select',
    options: [],
    required: false,
    getOptions: (users) => {
      return (users as User[]).map((user) => ({
        value: user.id,
        label: user.fullName,
      }))
    },
  },
]
