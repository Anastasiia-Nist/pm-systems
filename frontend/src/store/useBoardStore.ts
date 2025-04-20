import { create } from 'zustand'
import { getAllBoards } from '@/api'
import { Board } from '@/types/boards'

type BoardStore = {
  boards: Board[]
  currentBoard: Board | null
  setCurrentBoard: (board: Board | null) => void
  isLoadingBoards: boolean
  fetchBoards: () => Promise<void>
}

export const useBoardStore = create<BoardStore>((set) => ({
  boards: [],
  currentBoard: null,
  setCurrentBoard: (board) => set({ currentBoard: board }),
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
}))
