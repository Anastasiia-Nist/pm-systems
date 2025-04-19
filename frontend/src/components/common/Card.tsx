type CardProps = {
  title?: string
  size?: 'small' | 'medium' | 'large'
  children?: React.ReactNode
  onClick?: () => void
}

export default function Card({ title, size = 'medium', children, onClick }: CardProps) {
  return (
    <div className={`card card--${size}`} onClick={onClick}>
      <h3>{title}</h3>
      {children && <div>{children}</div>}
    </div>
  )
}
