// src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const isAuthenticated = !!localStorage.getItem('adminToken');

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" />;
  }

  return children;
}

export default ProtectedRoute;
