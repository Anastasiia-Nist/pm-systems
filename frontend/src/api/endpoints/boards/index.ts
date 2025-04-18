import { api } from '@/api/requestManager/requestManager'

export async function getAllBoards() {
  try {
    const { data } = await api.get('/boards')
    return data
  } catch (error) {
    console.error('requestManager(/boards):', error)
    throw error
  }
}
