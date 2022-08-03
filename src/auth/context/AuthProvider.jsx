import { useReducer } from 'react';
import { authReducer, AuthContext } from './index';

export const initialState = {
  isAuthenticated: false,
  user: {},
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};
