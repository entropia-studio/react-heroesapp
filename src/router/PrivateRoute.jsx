import { useContext, useMemo } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../auth';

export const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  const { pathname, search } = useLocation();
  const lastPath = pathname + search;

  useMemo(() => localStorage.setItem('lastPath', lastPath), [lastPath]);

  return isAuthenticated ? children : <Navigate to='/login' />;
};
