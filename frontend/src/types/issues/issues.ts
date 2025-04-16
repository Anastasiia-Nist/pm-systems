export interface User {
  id: number
  fullName: string
  email: string
  avatarUrl: string
}

export type TaskPriority = 'Low' | 'Medium' | 'High'
export type TaskStatus = 'Backlog' | 'InProgress' | 'Done'

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
