import { Link } from 'react-router-dom'
import '@/styles/pages/NotFoundPage.css'

export default function NotFoundPage() {
  return (
    <div className="not-found">
      <h1>404 – Страница не найдена</h1>
      <Link to="/" className="not-found__link">
        Вернуться на главную
      </Link>
    </div>
  )
}
