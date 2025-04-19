import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useBoardStore } from '@/store/useBoardStore'
import Card from '@components/common/Card'
import { BOARD_ID_PATH } from '@/constants/index'
import { Board } from '@/types/boards'

export default function BoardsPage() {
  const navigate = useNavigate()
  const { boards, isLoading, fetchBoards, setCurrentBoard } = useBoardStore()

  useEffect(() => {
    const loadBoards = async () => {
      try {
        await fetchBoards()
      } catch (error) {
        console.error('Ошибка при загрузке досок:', error)
        toast.error('Не удалось загрузить доски')
      }
    }

    loadBoards()
  }, [fetchBoards])

  const handleClick = (board: Board) => {
    setCurrentBoard(board)
    navigate(`${BOARD_ID_PATH}/${board.id}`)
  }
  return (
    <>
      <h1>Проекты</h1>
      {isLoading ? (
        <p>Загрузка...</p>
      ) : (
        <ul>
          {boards.map((board) => (
            <li key={board.id}>
              <Card title={board.name} size="small" onClick={() => handleClick(board)} />
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
