import { useEffect } from 'react'
import { getAllTasks } from '@/api'
import { toast } from 'react-toastify'

export default function IssuesPage() {
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await getAllTasks()
        console.log(tasks)
      } catch (error) {
        console.error('Ошибка при загрузке задач:', error)
        toast.error('Не удалось загрузить задачи')
      }
    }

    fetchTasks()
  }, [])

  return <h1>Задачи</h1>
}
