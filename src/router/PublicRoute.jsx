import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../auth';

export const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? <Navigate to='/' /> : children;
};
