import { useEffect, useState } from 'react'
import Card from '@components/common/Card'
import { toast } from 'react-toastify'
import { useUserStore } from '@/store/useUserStore'
import { useTaskStore } from '@/store/useTaskStore'
import { useBoardStore } from '@/store/useBoardStore'
import SearchInput from '@/components/common/Search/SearchInput'
import SearchTypeSelector from '@/components/common/Search/SearchTypeSelector'
import TaskFilter from '@/components/pages/issues/TaskFilter'
import UiButton from '@components/ui/UiButton'
import { searchTypes, clearedTaskFilters } from '@/components/pages/issues/constants'
import { useModalNavigation } from '@/hooks/useModalNavigation'
import { Task, SearchType, TaskFilters, FilterValue } from '@/types/task'

export default function IssuesPage() {
  const { fetchUsers } = useUserStore()
  const { tasks, fetchTasks } = useTaskStore()
  const { fetchBoards } = useBoardStore()

  const [filteredTasks, setFilteredTasks] = useState<Task[]>([])

  const [searchQuery, setSearchQuery] = useState('')
  const [searchType, setSearchType] = useState<SearchType>('title')

  const [filters, setFilters] = useState<TaskFilters>(clearedTaskFilters)

  const { handleClick: handleEditClick } = useModalNavigation('edit')
  const { handleClick: handleCreateClick } = useModalNavigation('create')

  useEffect(() => {
    fetchUsers().catch(() => toast.error('Не удалось загрузить пользователей'))
    fetchBoards().catch(() => toast.error('Ошибка загрузки досок'))
    fetchTasks().catch(() => toast.error('Не удалось загрузить задачи'))
  }, [fetchUsers, fetchBoards, fetchTasks])

  useEffect(() => {
    setFilteredTasks(tasks)
  }, [tasks])

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

  const handleCardClick = (boardId: number, taskId: number) => {
    handleEditClick(boardId, taskId)
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
        filters={filters}
        onToggle={handleToggleFilters}
        onSubmit={handleApplyFilters}
        onReset={handleResetFilters}
      />
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <Card
              title={task.title}
              size="medium"
              onClick={() => handleCardClick(task.boardId, task.id)}
            />
          </li>
        ))}
      </ul>

      <UiButton
        buttonText="Создать задачу"
        onClick={handleCreateClick}
        type="button"
        disabled={false}
      />
    </div>
  )
}
