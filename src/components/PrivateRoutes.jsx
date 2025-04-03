import { Navigate } from 'react-router-dom';
import { isTokenValid } from '../utils/auth';

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem('accessToken');

  if (!token || !isTokenValid(token)) {
    localStorage.removeItem('accessToken');
    return <Navigate to="/login" replace />;
  }

  return children;
}
