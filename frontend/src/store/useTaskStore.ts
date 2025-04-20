import { create } from 'zustand'
import { getAllTasks } from '@/api'
import { Task } from '@/types/task'

type TaskStore = {
  tasks: Task[]
  isLoadingTasks: boolean
  fetchTasks: () => Promise<void>
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  isLoadingTasks: false,

  fetchTasks: async () => {
    set({ isLoadingTasks: true })
    try {
      const data = await getAllTasks()
      set({ tasks: data })
    } catch (err) {
      console.error('Стор: Ошибка при загрузке задач:', err)
      throw err
    } finally {
      set({ isLoadingTasks: false })
    }
  },
}))
