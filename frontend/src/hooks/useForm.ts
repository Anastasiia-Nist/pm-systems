import { useState, useCallback } from 'react'

type FormErrors = Record<string, string | undefined>
type ChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>

export default function useForm<T>() {
  const [values, setValues] = useState<T>({} as T)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isValid, setIsValid] = useState(false)

  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const validateFormFields = (form: HTMLFormElement) => {
    const inputs = Array.from(form.elements) as HTMLInputElement[]
    const newErrors: FormErrors = {}

    inputs.forEach((input) => {
      if (input.name) {
        newErrors[input.name] = input.validationMessage || undefined
      }
    })

    setErrors(newErrors)
    const formIsValid = form.checkValidity()
    setIsValid(formIsValid)

    return formIsValid
  }

  const handleBlur = (e: ChangeEvent) => {
    const { name, validationMessage } = e.target
    setErrors((prev) => ({ ...prev, [name]: validationMessage }))
    setIsValid(e.target.closest('form')?.checkValidity() ?? false)
  }

  const resetForm = useCallback(
    (newValues = {} as T, newErrors = {}, newIsValid = false) => {
      setValues(newValues)
      setErrors(newErrors)
      setIsValid(newIsValid)
    },
    [setValues, setErrors, setIsValid]
  )

  return {
    values,
    handleChange,
    handleBlur,
    errors,
    isValid,
    resetForm,
    setValues,
    setIsValid,
    validateFormFields,
  }
}
