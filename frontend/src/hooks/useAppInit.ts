import { useUserStore } from '@/store/useUserStore'
import { useBoardStore } from '@/store/useBoardStore'
import { toast } from 'react-toastify'
import { requestHelper } from '@/utils/requestHelper'
export function useAppInit() {
  const fetchUsers = useUserStore((state) => state.fetchUsers)
  const fetchBoards = useBoardStore((state) => state.fetchBoards)
  const handleFetchUsers = requestHelper(fetchUsers, () =>
    toast.error('Не удалось загрузить пользователей')
  )

  const handleFetchBoards = requestHelper(fetchBoards, () => toast.error('Ошибка загрузки досок'))
  const initApp = async () => {
    await Promise.all([handleFetchUsers(), handleFetchBoards()])
  }

  return { initApp }
}
