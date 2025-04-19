import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'

type ModalAction = 'create' | 'edit' | 'close'

export function useModalNavigation(modalAction: ModalAction) {
  const navigate = useNavigate()

  const handleClick = useCallback(
    (boardId?: number, taskId?: number) => {
      const query = new URLSearchParams()
      if (modalAction === 'create') {
        query.set('modalTypeTask', 'create')
      } else if (modalAction === 'edit' && boardId && taskId) {
        query.set('boardId', `${boardId}`)
        query.set('taskId', `${taskId}`)
        query.set('modalTypeTask', 'edit')
      }

      navigate({ search: query.toString() }, { replace: false })
    },
    [modalAction, navigate]
  )

  const handleClose = useCallback(() => {
    const updatedQuery = new URLSearchParams(window.location.search)
    updatedQuery.delete('boardId')
    updatedQuery.delete('taskId')
    updatedQuery.delete('modalTypeTask')
    navigate({ search: updatedQuery.toString() }, { replace: true })
  }, [navigate])

  return {
    handleClick,
    handleClose,
  }
}
