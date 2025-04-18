import { useEffect, useState } from 'react'
import Card from '@components/common/Card'
import { getAllBoards, getAllTasks } from '@/api'
import { toast } from 'react-toastify'
import SearchInput from '@/components/common/Search/SearchInput'
import SearchTypeSelector from '@/components/common/Search/SearchTypeSelector'
import TaskFilter from '@/components/pages/issues/TaskFilter'
import { searchTypes, clearedTaskFilters } from '@/components/pages/issues/constants'
import { Task, SearchType, TaskFilters, FilterValue } from '@/types/task'
import { Board } from '@/types/boards'

export default function IssuesPage() {
  const [boards, setBoards] = useState<Board[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([])

  const [searchQuery, setSearchQuery] = useState('')
  const [searchType, setSearchType] = useState<SearchType>('title')

  const [filters, setFilters] = useState<TaskFilters>(clearedTaskFilters)

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const boards = await getAllBoards()
        setBoards(boards)
        const tasks = await getAllTasks()
        setTasks(tasks)
        setFilteredTasks(tasks)
        console.log('Проекты успешно загружены:', boards)
        console.log('Задачи успешно загружены:', tasks)
      } catch (error) {
        console.error('Ошибка при загрузке задач:', error)
        toast.error('Не удалось загрузить задачи')
      }
    }

    fetchTasks()
  }, [])

  const filterTasks = (query: string, type: SearchType, filters: TaskFilters) => {
    const normalize = (str: string = '') => str.toLowerCase()

    const filtered = tasks.filter((task) => {
      const searchTarget = type === 'title' ? task.title : task.assignee?.fullName || ''
      const matchesQuery = normalize(searchTarget).includes(normalize(query))

      const matchesStatus =
        filters.statuses.length === 0 || filters.statuses.some((b) => b.id === task.status)

      const matchesBoard =
        filters.boards.length === 0 || filters.boards.some((b) => b.id === task.boardId)

      return matchesQuery && matchesStatus && matchesBoard
    })

    setFilteredTasks(filtered)
  }

  const onSearch = (query: string) => {
    setSearchQuery(query)
    filterTasks(query, searchType, filters)
  }

  const handleSearchTypeChange = (type: string) => {
    const newType = type as SearchType
    setSearchType(newType)
    if (searchQuery === '') return
    filterTasks(searchQuery, newType, filters)
  }
  const handleToggleFilters = (key: keyof TaskFilters, value: FilterValue) => {
    setFilters((prev) => {
      const updated = [...prev[key]]
      const index = updated.findIndex((item) => item.id === value.id)

      if (index > -1) {
        updated.splice(index, 1)
      } else {
        updated.push(value)
      }

      return {
        ...prev,
        [key]: updated,
      }
    })
  }

  const handleApplyFilters = (e: React.FormEvent) => {
    e.preventDefault()
    filterTasks(searchQuery, searchType, filters)
  }

  const handleResetFilters = () => {
    setFilters(clearedTaskFilters)
    filterTasks(searchQuery, searchType, clearedTaskFilters)
  }

  return (
    <div>
      <h1>Задачи</h1>
      <div>
        <SearchTypeSelector
          options={searchTypes}
          selectedValue={searchType}
          onChange={handleSearchTypeChange}
        />
        <SearchInput onSearch={onSearch} placeholder="Поиск" />
      </div>
      <TaskFilter
        boards={boards}
        filters={filters}
        onToggle={handleToggleFilters}
        onSubmit={handleApplyFilters}
        onReset={handleResetFilters}
      />
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <Card title={task.title} size="medium" collaps>
              <p>{task.description}</p>
              <p>Приоритет: {task.priority}</p>
              <p>Статус: {task.status}</p>
              <p>Доска: {task.boardName}</p>
              <p>Исполнитель: {task.assignee.fullName}</p>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  )
}
