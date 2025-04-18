import { useState } from 'react'

type CardProps = {
  title?: string
  size?: 'small' | 'medium' | 'large'
  collaps?: boolean
  children: React.ReactNode
}

export default function Card({ title, size = 'medium', collaps = false, children }: CardProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleClick = () => {
    if (collaps) {
      setIsCollapsed((prev) => !prev)
    }
  }

  return (
    <div className={`card card--${size}`} onClick={handleClick}>
      <h3>{title}</h3>
      {isCollapsed && <div>{children}</div>}
    </div>
  )
}
