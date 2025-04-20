import '@/styles/components/common/Card.css'

type CardProps = {
  title?: string
  children?: React.ReactNode
  onClick?: () => void
}

export default function Card({ title, children, onClick }: CardProps) {
  return (
    <article className="card" onClick={onClick}>
      <h3 className="card__title">{title}</h3>
      {children && <div>{children}</div>}
    </article>
  )
}
