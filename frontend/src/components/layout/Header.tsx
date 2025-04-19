import { NavLink } from 'react-router-dom'
import UiButton from '@components/ui/UiButton'
import { useModalNavigation } from '@/hooks/useModalNavigation'
import { BOARDS_PATH, ISSUES_PATH } from '@/constants/index'

export default function Header() {
  const { handleClick } = useModalNavigation('create')
  return (
    <header>
      <nav>
        <NavLink to={ISSUES_PATH} className={({ isActive }) => (isActive ? 'active' : '')}>
          Все задачи
        </NavLink>
        <NavLink to={BOARDS_PATH} className={({ isActive }) => (isActive ? 'active' : '')}>
          Проекты
        </NavLink>
      </nav>
      <UiButton buttonText="Создать задачу" onClick={handleClick} type="button" disabled={false} />
    </header>
  )
}
