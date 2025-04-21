import Footer from '@/components/layout/Footer'
import Header from '@components/layout/Header'
import TaskFormModal from '@/components/pages/issues/TaskFormModal'
import { ToastContainer } from 'react-toastify'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="wrap">{children}</main>
      <Footer />
      <ToastContainer />
      <TaskFormModal />
    </>
  )
}
