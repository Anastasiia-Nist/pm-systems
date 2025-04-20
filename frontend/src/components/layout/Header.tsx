import { NavLink } from 'react-router-dom'
import UiButton from '@components/ui/UiButton'
import { useModalNavigation } from '@/hooks/useModalNavigation'
import { BOARDS_PATH, ISSUES_PATH } from '@/constants/index'
import '@/styles/components/layout/Header.css'

export default function Header() {
  const { handleClick } = useModalNavigation('create')
  return (
    <header className="header">
      <nav className="header__nav">
        <NavLink to={ISSUES_PATH} className={({ isActive }) => (isActive ? 'active' : '')}>
          Все задачи
        </NavLink>
        <NavLink to={BOARDS_PATH} className={({ isActive }) => (isActive ? 'active' : '')}>
          Проекты
        </NavLink>
      </nav>
      <UiButton className="button--light" onClick={handleClick} type="button" disabled={false}>
        Создать задачу
      </UiButton>
    </header>
  )
}
