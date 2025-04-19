import { FormEvent, ReactNode, forwardRef } from 'react'

type UIFormProps = {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  children: ReactNode
  className?: string
}

const UIForm = forwardRef<HTMLFormElement, UIFormProps>(
  ({ onSubmit, children, className }, ref) => {
    return (
      <form onSubmit={onSubmit} className={className} ref={ref} noValidate>
        {children}
      </form>
    )
  }
)

export default UIForm
