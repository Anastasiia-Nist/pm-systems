import { useEffect, useState } from 'react'
import Card from '@components/common/Card'
import { getAllTasks } from '@/api'
import { toast } from 'react-toastify'
import { Task, TaskFilters } from '@/types/task'
import TaskFilter from '@/components/common/Filter/TaskFilter'
import SearchInput from '@/components/common/SearchInput'
import { clearedTaskFilters } from '@/components/common/Filter/constants'

export default function IssuesPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<TaskFilters>(clearedTaskFilters)

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await getAllTasks()
        setTasks(tasks)
        setFilteredTasks(tasks)
        console.log('Задачи успешно загружены:', tasks)
      } catch (error) {
        console.error('Ошибка при загрузке задач:', error)
        toast.error('Не удалось загрузить задачи')
      }
    }

    fetchTasks()
  }, [])

  const compareFilterTask = (task: Task, query: string, filters: TaskFilters) => {
    const { priorities, statuses } = filters

    const matchesSearch = task.title.toLowerCase().includes(query.toLowerCase())
    const matchesPriority = !priorities.length || priorities.includes(task.priority)
    const matchesStatus = !statuses.length || statuses.includes(task.status)

    return matchesSearch && matchesPriority && matchesStatus
  }

  const filterTasks = (query: string, filters: TaskFilters) => {
    const filtered = tasks.filter((task) => compareFilterTask(task, query, filters))
    setFilteredTasks(filtered)
  }

  const onSearch = (query: string) => {
    setSearchQuery(query)
    filterTasks(query, filters)
  }

  const onFilterApply = (newFilters: TaskFilters) => {
    setFilters(newFilters)
    filterTasks(searchQuery, newFilters)
  }

  return (
    <div>
      <h1>Задачи</h1>
      <SearchInput onSearch={onSearch} placeholder="Поиск по задачам" />
      <TaskFilter onApply={onFilterApply} />
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <Card title={task.title} size="medium" collaps={true}>
              <p>{task.description}</p>
              <p>Приоритет: {task.priority}</p>
              <p>Статус: {task.status}</p>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  )
}
