import { useReducer } from 'react';
import { types } from '../types/types';
import { authReducer, AuthContext } from './index';

export const initialState = {
  isAuthenticated: false,
  user: {},
};

export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  const login = (name = '') => {
    dispatch({
      type: types.login,
      payload: {
        name,
      },
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login }}>
      {children}
    </AuthContext.Provider>
  );
};
