import { useEffect, useMemo, useRef } from 'react'
import { useLocation, Link } from 'react-router-dom'
import UIForm from '@/components/ui/UiForm'
import useForm from '@/hooks/useForm'
import { TASK_FORM_FIELDS } from './constants'
import UiInput from '@components/ui/UiInput'
import UiSelect from '@/components/ui/UiSelect'
import { useUserStore } from '@/store/useUserStore'
import { useBoardStore } from '@/store/useBoardStore'
import { TaskFormData } from '@/types/task'
import UiButton from '@/components/ui/UiButton'
import { BOARD_ID_PATH, ISSUES_PATH } from '@/constants/index'

type TaskFormProps = {
  onSubmit: (values: TaskFormData) => void
  initialData: TaskFormData
  buttonText?: string
}

export default function TaskForm({
  onSubmit,
  initialData,
  buttonText = 'Сохранить',
}: TaskFormProps) {
  const taskFormRef = useRef<HTMLFormElement | null>(null)
  const { values, handleChange, errors, isValid, resetForm, setIsValid, validateFormFields } =
    useForm<TaskFormData>()
  const { users } = useUserStore()
  const { boards } = useBoardStore()

  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const isOnIssuesPage = location.pathname === ISSUES_PATH
  const isOnBoardPage = location.pathname.startsWith(BOARD_ID_PATH)
  const boardId = query.get('boardId')
  const modalType = query.get('modalTypeTask')

  const isShowNavigationToBoard = isOnIssuesPage && boardId

  useEffect(() => {
    resetForm(initialData, {}, false)
    requestAnimationFrame(() => {
      const isFormValid = taskFormRef.current?.checkValidity() ?? false
      setIsValid(isFormValid)
    })
  }, [initialData, resetForm, setIsValid])

  const fieldsWithOptions = useMemo(() => {
    return TASK_FORM_FIELDS.map((field) => {
      if (field.getOptions) {
        const data = field.name === 'assigneeId' ? users : boards
        const disabled = field.name === 'boardId' && isOnBoardPage && modalType === 'edit'
        return {
          ...field,
          options: field.getOptions(data),
          disabled,
        }
      }

      return field
    })
  }, [users, boards])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    validateFormFields(e.currentTarget)
    if (!isValid) {
      return
    }
    onSubmit(values)
  }

  return (
    <UIForm onSubmit={handleSubmit} ref={taskFormRef}>
      {fieldsWithOptions.map((field) => {
        const commonProps = {
          name: field.name,
          value: values[field.name] || '',
          onChange: handleChange,
          required: field.required,
          disabled: field.disabled,
        }

        return (
          <div key={field.name}>
            {field.type === 'select' ? (
              <UiSelect {...commonProps} label={field.label} options={field.options ?? []} />
            ) : (
              <>
                <UiInput
                  type={field.type}
                  label={field.label}
                  {...commonProps}
                  minLength={field.minLength}
                  maxLength={field.maxLength}
                />
              </>
            )}
            {errors[field.name] && <span style={{ color: 'red' }}>{errors[field.name]}</span>}
          </div>
        )
      })}

      {buttonText && <UiButton type="submit">{buttonText}</UiButton>}

      {isShowNavigationToBoard && <Link to={`${BOARD_ID_PATH}/${boardId}`}>Перейти к доске</Link>}
    </UIForm>
  )
}
