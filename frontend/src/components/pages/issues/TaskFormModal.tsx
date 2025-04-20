import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getTaskById } from '@/api'
import { useTaskStore } from '@/store/useTaskStore'
import { toast } from 'react-toastify'
import UiModal from '@components/ui/UiModal'
import TaskForm from '@components/pages/issues/TaskForm'
import UiLoader from '@components/ui/UiLoader'
import { defaultTaskForm } from '@components/pages/issues/constants'
import { useModalNavigation } from '@/hooks/useModalNavigation'
import { createTask, updateTask } from '@/api'
import { TaskFormData } from '@/types/task'

export default function TaskFormModal() {
  const [taskData, setTaskData] = useState<TaskFormData>(defaultTaskForm)
  const [isLoading, setIsLoading] = useState(true)
  const { fetchTasks } = useTaskStore()

  const { handleClose } = useModalNavigation('close')

  const { search } = useLocation()
  const query = new URLSearchParams(search)

  const taskId = query.get('taskId')
  const boardId = query.get('boardId')
  const modalType = query.get('modalTypeTask')
  const isOpen = !!modalType

  useEffect(() => {
    const fetchTaskData = async () => {
      if (modalType === 'edit' && taskId) {
        try {
          setIsLoading(true)
          const task = await getTaskById(Number(taskId))
          setTaskData({
            title: task.title,
            description: task.description,
            priority: task.priority,
            status: task.status,
            boardId: boardId ? Number(boardId) : null,
            assigneeId: task.assignee?.id ?? null,
          })
        } catch (error) {
          console.error('Не удалось загрузить данные задачи', error)
          toast.error('Не удалось загрузить данные задачи')
          handleClose()
        } finally {
          setIsLoading(false)
        }
      } else {
        setTaskData(defaultTaskForm)
      }
    }

    fetchTaskData()
  }, [modalType, taskId, handleClose])

  const mapFormDataToApi = (data: TaskFormData) => ({
    title: data.title,
    description: data.description,
    priority: data.priority,
    status: data.status,
    boardId: data.boardId ? Number(boardId) : null,
    assigneeId: data.assigneeId ? Number(data.assigneeId) : null,
  })

  const modalsMap = {
    create: {
      title: 'Создать задачу',
      buttonText: 'Создать',
      onSubmit: (data: TaskFormData) => createTask(data),
      successMessage: 'Задача успешно создана',
      errorMessage: 'Не удалось создать задачу',
    },
    edit: {
      title: 'Редактировать задачу',
      buttonText: 'Обновить',
      onSubmit: (data: TaskFormData, taskId: string) => updateTask(taskId!, data),
      successMessage: 'Задача успешно обновлена',
      errorMessage: 'Не удалось обновить задачу',
    },
  }

  const handleSubmitForm = async (data: TaskFormData) => {
    const apiData = mapFormDataToApi(data)
    const current = modalsMap[modalType as 'create' | 'edit']
    try {
      await current?.onSubmit(apiData, taskId!)
      toast.success(current?.successMessage)
      handleClose()
      await fetchTasks()
    } catch (error) {
      console.error(current?.errorMessage, error)
      toast.error(current?.errorMessage)
    }
  }

  return (
    <UiModal open={isOpen} onClose={handleClose}>
      <div>
        <h2>{modalsMap[modalType as 'create' | 'edit']?.title}</h2>

        {isLoading && <UiLoader />}
        <TaskForm
          onSubmit={(data) => handleSubmitForm(data)}
          initialData={taskData}
          buttonText={modalsMap[modalType as 'create' | 'edit']?.buttonText}
        />
      </div>
    </UiModal>
  )
}
