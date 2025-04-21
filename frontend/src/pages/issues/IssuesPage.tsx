import { useEffect, useState } from 'react'
import Card from '@components/common/Card'
import { toast } from 'react-toastify'
import { requestHelper } from '@/utils/requestHelper'
import { useTaskStore } from '@/store/useTaskStore'
import SearchInput from '@/components/common/Search/SearchInput'
import SearchTypeSelector from '@/components/common/Search/SearchTypeSelector'
import TaskFilter from '@/components/pages/issues/TaskFilter'
import UiButton from '@components/ui/UiButton'
import UiLoader from '@components/ui/UiLoader'
import { searchTypes, clearedTaskFilters } from '@/components/pages/issues/constants'
import { useModalNavigation } from '@/hooks/useModalNavigation'
import { Task, SearchType, TaskFilters, FilterValue } from '@/types/task'
import '@/styles/pages/IssuesPage.css'

export default function IssuesPage() {
  const { tasks, isLoadingTasks, fetchTasks } = useTaskStore()

  const [filteredTasks, setFilteredTasks] = useState<Task[]>([])
  const [showFilters, setShowFilters] = useState(false)

  const [searchQuery, setSearchQuery] = useState('')
  const [searchType, setSearchType] = useState<SearchType>('title')

  const [checkedFilters, setCheckedFilters] = useState<TaskFilters>({ ...clearedTaskFilters })
  const [appliedFilters, setAppliedFilters] = useState<TaskFilters>({ ...clearedTaskFilters })

  const { handleClick: handleEditClick } = useModalNavigation('edit')
  const { handleClick: handleCreateClick } = useModalNavigation('create')

  useEffect(() => {
    const handleFetchTasks = requestHelper(fetchTasks, () =>
      toast.error('Не удалось загрузить задачи')
    )

    return () => {
      handleFetchTasks()
    }
  }, [fetchTasks])

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
    filterTasks(query, searchType, appliedFilters)
  }

  const handleSearchTypeChange = (type: string) => {
    const newType = type as SearchType
    setSearchType(newType)
    if (searchQuery === '') return
    filterTasks(searchQuery, newType, appliedFilters)
  }
  const handleToggleFilters = (key: keyof TaskFilters, value: FilterValue) => {
    setCheckedFilters((prev) => {
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
    setAppliedFilters(checkedFilters)
    filterTasks(searchQuery, searchType, checkedFilters)
  }

  const handleResetFilters = () => {
    setCheckedFilters({ ...clearedTaskFilters })
    setAppliedFilters({ ...clearedTaskFilters })
    filterTasks(searchQuery, searchType, { ...clearedTaskFilters })
  }

  const handleCardClick = (boardId: number, taskId: number) => {
    handleEditClick(boardId, taskId)
  }

  const handleToggleShowFilters = () => {
    setShowFilters(!showFilters)
  }
  const appliedFiltersCount = Object.values(appliedFilters).reduce((acc, filterArray) => {
    return acc + (Array.isArray(filterArray) ? filterArray.length : 0)
  }, 0)
  return (
    <>
      <div className="task-toolbar">
        <div className="task-toolbar__search">
          <fieldset>
            <legend>Поиск</legend>
            <SearchInput onSearch={onSearch} placeholder="Поиск" />
            <SearchTypeSelector
              options={searchTypes}
              selectedValue={searchType}
              onChange={handleSearchTypeChange}
            />
          </fieldset>
          <UiButton
            onClick={handleToggleShowFilters}
            className="button--line task-toolbar__button"
            type="button"
          >
            Фильтры
          </UiButton>
          {appliedFiltersCount > 0 && (
            <div className="task-toolbar__button_badge">{appliedFiltersCount}</div>
          )}
        </div>

        {showFilters && (
          <div className="task-toolbar__filter">
            <TaskFilter
              filters={checkedFilters}
              onToggle={handleToggleFilters}
              onSubmit={handleApplyFilters}
              onReset={handleResetFilters}
            />
          </div>
        )}
      </div>
      <section className="tasks">
        <h1 className="title">Задачи</h1>

        <div className="list">
          <ul className="tasks__list">
            {filteredTasks.map((task) => (
              <li className="tasks__item" key={task.id}>
                <Card title={task.title} onClick={() => handleCardClick(task.boardId, task.id)} />
              </li>
            ))}
          </ul>
        </div>

        <UiButton onClick={handleCreateClick} type="button" disabled={false}>
          Создать задачу
        </UiButton>
        <UiLoader isLoading={isLoadingTasks} />
      </section>
    </>
  )
}
