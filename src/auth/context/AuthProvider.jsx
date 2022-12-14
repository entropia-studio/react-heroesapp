import { useReducer } from 'react';
import { types } from '../types/types';
import { authReducer, AuthContext } from './index';

const init = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return {
    isAuthenticated: !!user,
    user,
  };
};

export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {}, init);

  const login = (name = '') => {
    localStorage.setItem('user', JSON.stringify({ name }));
    dispatch({
      type: types.login,
      payload: {
        name,
      },
    });
  };

  const logout = () => {
    localStorage.removeItem('user');
    dispatch({
      type: types.logout,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
