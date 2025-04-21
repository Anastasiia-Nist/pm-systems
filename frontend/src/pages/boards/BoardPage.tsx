import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { requestHelper } from '@/utils/requestHelper'
import { useTaskStore } from '@/store/useTaskStore'
import { toast } from 'react-toastify'
import UiDraggable from '@components/ui/UiDraggable'
import Card from '@/components/common/Card'
import UiLoader from '@components/ui/UiLoader'
import { useModalNavigation } from '@/hooks/useModalNavigation'
import { getTasksBoardById, updateTaskStatus } from '@/api'
import { BOARDS_PATH } from '@/constants'
import { useBoardStore } from '@/store/useBoardStore'
import { Board } from '@/types/boards'
import { Task, TaskStatus } from '@/types/task'
import '@/styles/pages/boards/BoardPage.css'

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  UniqueIdentifier,
} from '@dnd-kit/core'

export default function BoardPage() {
  const { boardId } = useParams()
  const navigate = useNavigate()
  const { boards, findBoardById } = useBoardStore()
  const [currentBoard, setCurrentBoard] = useState<Board | undefined | null>(null)
  const { tasks: allTasks } = useTaskStore()
  const [tasks, setTasks] = useState<Task[]>([])
  const { handleClick: handleEditClick } = useModalNavigation('edit')
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const statusLabels: Record<TaskStatus, string> = {
    [TaskStatus.Backlog]: 'Бэклог',
    [TaskStatus.InProgress]: 'В работе',
    [TaskStatus.Done]: 'Готово',
  }

  useEffect(() => {
    const loadBoard = async () => {
      try {
        if (boardId && +boardId) {
          setIsLoading(true)
          const tasks = await getTasksBoardById(+boardId)
          setTasks(tasks)
        } else {
          navigate(BOARDS_PATH)
        }
      } catch (error) {
        console.error('Ошибка при загрузке досок:', error)
        toast.error('Не удалось загрузить доски')
      } finally {
        setIsLoading(false)
      }
    }

    const handleLoad = requestHelper(loadBoard, () => toast.error('Ошибка загрузки доски'))

    return () => {
      handleLoad()
    }
  }, [allTasks, boardId])

  useEffect(() => {
    if (boardId && +boardId) {
      const board = findBoardById(+boardId)
      setCurrentBoard(board)
    }
  }, [boards])

  const handleCardClick = (taskId: number) => {
    handleEditClick(currentBoard?.id, taskId)
  }

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  })

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      distance: 10,
    },
  })

  const keyboardSensor = useSensor(KeyboardSensor)

  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor)

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    const taskId = Number(active.id)
    const newStatus = over?.id as TaskStatus

    const task = tasks.find((task) => task.id === taskId)

    if (!task || task.status === newStatus) {
      return
    }

    try {
      setActiveId(null)
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task))
      )
      await updateTaskStatus(String(active.id), { status: newStatus })
    } catch (error) {
      console.error('Не удалось обновить статус задачи:', error)
      toast.error('Не удалось обновить статус задачи')
      if (boardId && +boardId) {
        await getTasksBoardById(+boardId)
        setTasks(tasks)
      }
    }
  }
  const handleDragStart = (event: DragStartEvent) => {
    const activeId = event.active.id
    setActiveId(activeId)
  }

  return (
    <section className="board">
      <h1 className="title">Проект: {currentBoard?.name}</h1>
      {isLoading ? (
        <UiLoader />
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="board__columns">
            {Object.values(TaskStatus).map((status) => (
              <UiDraggable
                key={status}
                id={status}
                title={statusLabels[status]}
                tasks={tasks.filter((task) => task.status === status)}
                onCardClick={handleCardClick}
              />
            ))}
          </div>
          <DragOverlay dropAnimation={null}>
            {activeId ? <Card title={tasks.find((task) => task.id === activeId)?.title} /> : null}
          </DragOverlay>
        </DndContext>
      )}
    </section>
  )
}
