import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Card from '@components/common/Card'
import { useModalNavigation } from '@/hooks/useModalNavigation'
import { getBoardById } from '@/api'
import { BOARDS_PATH } from '@/constants'
import { useBoardStore } from '@/store/useBoardStore'
import { Board } from '@/types/boards'
import { Task } from '@/types/task'

export default function BoardPage() {
  const { boardId } = useParams()
  const navigate = useNavigate()
  const { boards, currentBoard, setCurrentBoard, fetchBoards } = useBoardStore()
  const [tasks, setTasks] = useState<Task[]>([])
  const [isBoardsLoaded, setIsBoardsLoaded] = useState(false)
  const { handleClick: handleEditClick } = useModalNavigation('edit')

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

  return (
    <>
      <h1>Проект: {currentBoard?.name}</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <Card title={task.title} size="medium" onClick={() => handleCardClick(task.id)} />
          </li>
        ))}
      </ul>
    </>
  )
}
