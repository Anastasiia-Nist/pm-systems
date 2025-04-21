import { api } from '@/api/requestManager/requestManager'
import { BOARDS_PATH } from '@/constants/index'

export async function getAllBoards(signal?: AbortSignal) {
  try {
    const { data } = await api.get(BOARDS_PATH, signal)
    return data
  } catch (error) {
    console.error(`requestManager(${BOARDS_PATH}):`, error)
    throw error
  }
}

export async function getTasksBoardById(boardId: number) {
  try {
    const { data } = await api.get(`${BOARDS_PATH}/${boardId}`)
    return data
  } catch (error) {
    console.error(`requestManager(${BOARDS_PATH}/${boardId}):`, error)
    throw error
  }
}
