import { create } from 'zustand'
import { getAllBoards } from '@/api'
import { Board } from '@/types/boards'

type BoardStore = {
  boards: Board[]
  currentBoard: Board | null
  setCurrentBoard: (board: Board | null) => void
  isLoading: boolean
  fetchBoards: () => Promise<void>
}

export const useBoardStore = create<BoardStore>((set) => ({
  boards: [],
  currentBoard: null,
  setCurrentBoard: (board) => set({ currentBoard: board }),
  isLoading: false,

  fetchBoards: async () => {
    set({ isLoading: true })
    try {
      const data = await getAllBoards()
      set({ boards: data })
    } catch (err) {
      console.error('Стор: Ошибка при загрузке досок:', err)
      throw err
    } finally {
      set({ isLoading: false })
    }
  },
}))
