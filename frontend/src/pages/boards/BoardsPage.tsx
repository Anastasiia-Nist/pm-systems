import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useBoardStore } from '@/store/useBoardStore'
import Card from '@components/common/Card'
import UiLoader from '@components/ui/UiLoader'
import { BOARD_ID_PATH } from '@/constants/index'
import { Board } from '@/types/boards'
import '@/styles/pages/boards/BoardsPage.css'

export default function BoardsPage() {
  const navigate = useNavigate()
  const { boards, isLoadingBoards, fetchBoards, setCurrentBoard } = useBoardStore()

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
    <section className="boards">
      <h1 className="title">Проекты</h1>

      {isLoadingBoards ? (
        <UiLoader />
      ) : (
        <div className="list">
          <ul className="boards__list">
            {boards.map((board) => (
              <li className="boards__item" key={board.id}>
                <Card title={board.name} onClick={() => handleClick(board)} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
