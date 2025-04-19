import { NavLink } from 'react-router-dom'
import UiButton from '@components/ui/UiButton'
import { useModalNavigation } from '@/hooks/useModalNavigation'

export default function Header() {
  const { handleClick } = useModalNavigation('create')
  return (
    <header>
      <nav>
        <NavLink to="/issues" className={({ isActive }) => (isActive ? 'active' : '')}>
          Все задачи
        </NavLink>
        <NavLink to="/boards" className={({ isActive }) => (isActive ? 'active' : '')}>
          Проекты
        </NavLink>
      </nav>
      <UiButton buttonText="Создать задачу" onClick={handleClick} type="button" disabled={false} />
    </header>
  )
}
