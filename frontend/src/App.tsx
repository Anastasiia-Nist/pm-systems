import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import BoardsPage from './pages/boards/BoardsPage'
import BoardPage from './pages/boards/BoardPage'
import IssuesPage from './pages/issues/IssuesPage'
import NotFoundPage from './pages/NotFoundPage'
import './index.css'

const routes = [
  { path: '/', element: <Navigate to="/boards" replace /> },
  { path: '/boards', element: <BoardsPage /> },
  { path: '/board/:id', element: <BoardPage /> },
  { path: '/issues', element: <IssuesPage /> },
  { path: '*', element: <NotFoundPage /> },
]

export default function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </>
  )
}
