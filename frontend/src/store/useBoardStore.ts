import { create } from 'zustand'
import { getAllBoards } from '@/api'
import { Board } from '@/types/boards'

type BoardStore = {
  boards: Board[]
  isLoadingBoards: boolean
  fetchBoards: () => Promise<void>
  findBoardById: (id: number) => Board | undefined
}

export const useBoardStore = create<BoardStore>((set, get) => ({
  boards: [],
  isLoadingBoards: false,

  fetchBoards: async () => {
    set({ isLoadingBoards: true })
    try {
      const data = await getAllBoards()
      set({ boards: data })
    } catch (err) {
      console.error('Стор: Ошибка при загрузке досок:', err)
      throw err
    } finally {
      set({ isLoadingBoards: false })
    }
  },

  findBoardById: (id) => {
    console.log('findBoardById', get().boards)
    return get().boards.find((board) => board.id === id)
  },
}))
