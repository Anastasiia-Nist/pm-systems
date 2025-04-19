import { User } from './user'
import { Board } from './boards'

export enum TaskPriority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

export enum TaskStatus {
  Backlog = 'Backlog',
  InProgress = 'InProgress',
  Done = 'Done',
}

export interface Task {
  id: number
  title: string
  description: string
  priority: TaskPriority
  status: TaskStatus
  boardId: number
  boardName: string
  assignee: User
}
export type SelectOption = {
  value: string | number
  label: string
}
export type TaskFormField = {
  name: string
  label: string
  type: string
  options?: SelectOption[]
  required: boolean
  disabled?: boolean
  minLength?: number
  maxLength?: number
  hidden?: (modalType: string) => boolean
  getOptions?: (data: User[] | Board[]) => SelectOption[]
}

export interface TaskFilters {
  boards: Board[]
  statuses: { id: TaskStatus }[]
}

export type FilterKey = 'boards' | 'statuses'
export type FilterValue = Board | { id: TaskStatus }

export type SearchType = 'title' | 'assignee'

export type TaskFormData = {
  [key: string]: string | number | null
  title: string
  description: string
  priority: TaskPriority | null
  status: TaskStatus | null
  boardId: number | null
  assigneeId: number | null
}
