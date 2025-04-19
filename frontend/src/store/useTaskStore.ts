import { create } from 'zustand'
import { getAllTasks } from '@/api'
import { Task } from '@/types/task'

type TaskStore = {
  tasks: Task[]
  isLoading: boolean
  fetchTasks: () => Promise<void>
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  isLoading: false,

  fetchTasks: async () => {
    set({ isLoading: true })
    try {
      const data = await getAllTasks()
      set({ tasks: data })
    } catch (err) {
      console.error('Стор: Ошибка при загрузке задач:', err)
      throw err
    } finally {
      set({ isLoading: false })
    }
  },
}))
