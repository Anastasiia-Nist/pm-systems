import { create } from 'zustand'
import { getAllUsers } from '@/api'
import { User } from '@/types/user'

type UserStore = {
  users: User[]
  isLoadingUsers: boolean
  fetchUsers: () => Promise<void>
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  isLoadingUsers: false,

  fetchUsers: async () => {
    set({ isLoadingUsers: true })
    try {
      const data = await getAllUsers()
      set({ users: data })
    } catch (err) {
      console.error('Стор: Ошибка при загрузке пользователей:', err)
      throw err
    } finally {
      set({ isLoadingUsers: false })
    }
  },
}))
