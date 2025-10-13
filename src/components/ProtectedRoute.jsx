import { useAppSelector } from '../app/hooks'
import { Navigate, useLocation } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  const { token } = useAppSelector(s => s.auth)
  const loc = useLocation()
  if (!token) return <Navigate to="/login" state={{ from: loc.pathname }} replace />
  return children
}
