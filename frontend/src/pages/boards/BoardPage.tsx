import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import UiDraggable from '@components/ui/UiDraggable'
import { useModalNavigation } from '@/hooks/useModalNavigation'
import { getBoardById, updateTaskStatus } from '@/api'
import { BOARDS_PATH } from '@/constants'
import { useBoardStore } from '@/store/useBoardStore'
import { Board } from '@/types/boards'
import { Task, TaskStatus } from '@/types/task'

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'

export default function BoardPage() {
  const { boardId } = useParams()
  const navigate = useNavigate()
  const { boards, currentBoard, setCurrentBoard, fetchBoards } = useBoardStore()
  const [tasks, setTasks] = useState<Task[]>([])
  const [isBoardsLoaded, setIsBoardsLoaded] = useState(false)
  const { handleClick: handleEditClick } = useModalNavigation('edit')

  const statusLabels: Record<TaskStatus, string> = {
    [TaskStatus.Backlog]: 'Бэклог',
    [TaskStatus.InProgress]: 'В работе',
    [TaskStatus.Done]: 'Готово',
  }

  useEffect(() => {
    const loadBoard = async () => {
      try {
        if (boardId && +boardId) {
          const tasks = await getBoardById(+boardId)
          setTasks(tasks)
          if (currentBoard?.id === Number(boardId)) {
            return
          }
          await fetchBoards()
          setIsBoardsLoaded(true)
        } else {
          navigate(BOARDS_PATH)
        }
      } catch (error) {
        console.error('Ошибка при загрузке досок:', error)
        toast.error('Не удалось загрузить доски')
      }
    }

    loadBoard()

    return () => {
      setCurrentBoard(null)
    }
  }, [boardId])

  useEffect(() => {
    if (isBoardsLoaded) {
      const board = boards?.find((b: Board) => b.id === Number(boardId))
      if (board) {
        setCurrentBoard(board)
      }
    }
  }, [boards, isBoardsLoaded])

  const handleCardClick = (taskId: number) => {
    handleEditClick(currentBoard?.id, taskId)
  }

  const sensors = useSensors(useSensor(PointerSensor))

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    const taskId = Number(active.id)
    const newStatus = over?.id as TaskStatus

    const task = tasks.find((task) => task.id === taskId)

    if (!task || task.status === newStatus) {
      return
    }

    try {
      await updateTaskStatus(String(active.id), { status: newStatus })
    } catch (error) {
      console.error('Не удалось обновить статус задачи:', error)
      toast.error('Не удалось обновить статус задачи')
    }
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task))
    )
  }

  return (
    <>
      <h1>Проект: {currentBoard?.name}</h1>
      <div style={{ display: 'flex', gap: '16px' }}>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <div style={{ display: 'flex', gap: '16px' }}>
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
        </DndContext>
      </div>
    </>
  )
}
