import { api } from '@/api/requestManager/requestManager'

export async function getAllTasks() {
  try {
    const { data } = await api.get('/tasks')
    return data
  } catch (error) {
    console.error('requestManager(/tasks):', error)
    throw error
  }
}
