import { create } from 'zustand'
import { getAllUsers } from '@/api'
import { User } from '@/types/user'

type UserStore = {
  users: User[]
  isLoading: boolean
  fetchUsers: () => Promise<void>
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  isLoading: false,

  fetchUsers: async () => {
    set({ isLoading: true })
    try {
      const data = await getAllUsers()
      set({ users: data })
    } catch (err) {
      console.error('Стор: Ошибка при загрузке пользователей:', err)
      throw err
    } finally {
      set({ isLoading: false })
    }
  },
}))
