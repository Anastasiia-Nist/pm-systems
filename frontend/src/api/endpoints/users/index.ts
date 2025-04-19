import { api } from '@/api/requestManager/requestManager'

export async function getAllUsers() {
  try {
    const { data } = await api.get('/users')
    return data
  } catch (error) {
    console.error('requestManager(/users):', error)
    throw error
  }
}