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

export async function getTaskById(taskId: number) {
  try {
    const { data } = await api.get(`/tasks/${taskId}`)
    return data
  } catch (error) {
    console.error(`requestManager(/tasks/${taskId}):`, error)
    throw error
  }
}

export async function createTask(taskData: unknown) {
  try {
    const { data } = await api.post('/tasks/create', taskData)
    return data
  } catch (error) {
    console.error('requestManager(/tasks/create):', error)
    throw error
  }
}

export async function updateTask(taskId: string, taskData: unknown) {
  try {
    const { data } = await api.put(`/tasks/update/${taskId}`, taskData)
    return data
  } catch (error) {
    console.error(`requestManager(/tasks/update/${taskId}):`, error)
    throw error
  }
}

export async function updateTaskStatus(taskId: string, taskData: unknown) {
  try {
    const { data } = await api.put(`/tasks/updateStatus/${taskId}`, taskData)
    return data
  } catch (error) {
    console.error(`requestManager(/tasks/updateStatus/${taskId}):`, error)
    throw error
  }
}
