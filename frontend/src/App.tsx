import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Layout from '@/layout/Layout'
import BoardsPage from './pages/boards/BoardsPage'
import BoardPage from './pages/boards/BoardPage'
import IssuesPage from './pages/issues/IssuesPage'
import NotFoundPage from './pages/NotFoundPage'
import TaskFormModal from '@/components/pages/issues/TaskFormModal'
import { BOARDS_PATH, BOARD_ID_PATH, ISSUES_PATH } from './constants'
import './index.css'

const routes = [
  { path: '/', element: <Navigate to={BOARDS_PATH} replace /> },
  { path: BOARDS_PATH, element: <BoardsPage /> },
  { path: BOARD_ID_PATH + '/:boardId', element: <BoardPage /> },
  { path: ISSUES_PATH, element: <IssuesPage /> },
  { path: '*', element: <NotFoundPage /> },
]

export default function App() {
  return (
    <Layout>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
      <ToastContainer />
      <TaskFormModal />
    </Layout>
  )
}
