import { useNews } from '../../context/NewsContext'
import AdminDashboard from '../admin/AdminDashboard'
import AdminLoginPage from '../admin/AdminLoginPage'

export default function AdminPage() {
  const { isAuthenticated } = useNews()

  if (!isAuthenticated) {
    return <AdminLoginPage />
  }

  return <AdminDashboard />
}
