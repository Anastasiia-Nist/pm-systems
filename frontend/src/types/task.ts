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

export interface TaskFilters {
  boards: Board[]
  statuses: { id: TaskStatus }[]
}

export type FilterKey = 'boards' | 'statuses'
export type FilterValue = Board | { id: TaskStatus }

export type SearchType = 'title' | 'assignee'
