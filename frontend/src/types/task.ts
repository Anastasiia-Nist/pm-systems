import { User } from './user'

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

export interface TaskFilters {
  priorities: TaskPriority[]
  statuses: TaskStatus[]
}

export type FilterKey = 'priorities' | 'statuses'
export type FilterValue = TaskPriority | TaskStatus
