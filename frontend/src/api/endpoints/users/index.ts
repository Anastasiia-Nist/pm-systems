import { api } from '@/api/requestManager/requestManager'

export async function getAllUsers(signal?: AbortSignal) {
  try {
    const { data } = await api.get('/users', signal)
    return data
  } catch (error) {
    console.error('requestManager(/users):', error)
    throw error
  }
}
